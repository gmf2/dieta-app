/* Google Drive adapter. Tokens stay in memory. No private data in localStorage. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.NutriGoogle = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  var APPDATA = 'https://www.googleapis.com/auth/drive.appdata';
  var LEGACY = ['perfil','picks','revisiones','registro','objetivos','fotos','equipo','calisnivel','sesiones','hoyopen','sesopen'];
  function copy(x) { return JSON.parse(JSON.stringify(x)); }
  function ownKey(key) { return /^dieta\.([a-z]+)\.v1$/.test(key) && LEGACY.indexOf(key.split('.')[1]) >= 0; }
  function Store() { this.data = {}; this.onchange = function () {}; }
  Store.prototype.getItem = function (key) { return Object.prototype.hasOwnProperty.call(this.data,key) ? this.data[key] : null; };
  Store.prototype.setItem = function (key,value) { if (!ownKey(key)) throw Error('Clave no admitida'); JSON.parse(value); this.data[key] = value; this.onchange(); };
  Store.prototype.restore = function (records) {
    if (!records || typeof records !== 'object' || Array.isArray(records)) throw Error('Copia no válida');
    var next = {};
    Object.keys(records).forEach(function (k) { if (!ownKey(k) || typeof records[k] !== 'string') throw Error('Contenido no válido'); JSON.parse(records[k]); next[k] = records[k]; });
    this.data = next;
  };
  Store.prototype.clear = function () { this.data = {}; };
  Store.prototype.snapshot = function () { return copy(this.data); };
  function legacy(storage) {
    var records = {};
    LEGACY.forEach(function (n) { var k='dieta.'+n+'.v1',v=storage.getItem(k); if(v!==null){JSON.parse(v);records[k]=v;} });
    return records;
  }
  function Drive(opts) {
    opts = opts || {}; this.fetch = opts.fetch || fetch.bind(globalThis); this.now = opts.now || Date.now;
    this.session = null; this.epoch = 0; this.controllers = new Set(); this.baseline = null;
  }
  Drive.prototype.close = function () { this.epoch++; this.controllers.forEach(function(c){c.abort();});this.controllers.clear();this.session=null;this.baseline=null; };
  Drive.prototype.request = async function (url, options, epoch) {
    if (!this.session || this.session.expiresAt <= this.now()) { this.close(); throw Error('El acceso ha caducado. Vuelve a autorizar Google.'); }
    var expected = epoch === undefined ? this.epoch : epoch;
    if(expected!==this.epoch) throw Error('La cuenta ha cambiado.');
    if (!url.startsWith('https://www.googleapis.com/drive/v3/') && !url.startsWith('https://www.googleapis.com/upload/drive/v3/') && url!=='https://openidconnect.googleapis.com/v1/userinfo') throw Error('Destino no permitido');
    var controller = new AbortController(); this.controllers.add(controller);
    var headers = Object.assign({},options && options.headers,{Authorization:'Bearer '+this.session.token});
    try {
      var r=await this.fetch(url,Object.assign({},options,{headers:headers,signal:controller.signal,cache:'no-store'}));
      if(expected!==this.epoch) throw Error('La cuenta ha cambiado.');
      if(r.status===401){this.close();throw Error('Vuelve a autorizar Google.');}
      if(!r.ok) throw Error(r.status===403?'Google no permite esta operación. Revisa el permiso o el espacio disponible.':r.status===429?'Google limita las peticiones. Inténtalo más tarde.':'Google no ha podido completar la operación ('+r.status+').');
      var data=await r.json(); if(expected!==this.epoch)throw Error('La cuenta ha cambiado.'); return data;
    } finally {this.controllers.delete(controller);}
  };
  Drive.prototype.connect = async function (token, expiresIn, scopes) {
    this.close(); var epoch=this.epoch;
    if(!token || typeof expiresIn!=='number' || expiresIn<=0 || typeof scopes!=='string' || !scopes.split(/\s+/).includes(APPDATA)) throw Error('Falta autorización para el espacio de NutriSport en Drive.');
    this.session={token:token,expiresAt:this.now()+Math.min(expiresIn,3600)*1000,subject:null,email:null};
    try {
      var info=await this.request('https://openidconnect.googleapis.com/v1/userinfo',{},epoch);
      if(!info.sub || !info.email || info.email_verified!==true) throw Error('Google no ha confirmado la identidad de la cuenta.');
      this.session.subject=info.sub;this.session.email=info.email;return {subject:info.sub,email:info.email};
    } catch(e) { if(epoch===this.epoch)this.close();throw e; }
  };
  Drive.prototype.list = async function () {
    var epoch=this.epoch, files=[], page='';
    do {
      var q="trashed = false and appProperties has { key='nutrisport' and value='snapshot-v1' }";
      var url='https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q='+encodeURIComponent(q)+'&fields=nextPageToken,files(id,name,createdTime,appProperties)&pageSize=1000'+(page?'&pageToken='+encodeURIComponent(page):'');
      var result=await this.request(url,{},epoch);
      files=files.concat(result.files||[]);page=result.nextPageToken||'';
      if(files.length>10000)throw Error('Demasiadas copias para cargar sin revisión.');
    } while(page);
    return files.sort(function(a,b){return (b.createdTime||'').localeCompare(a.createdTime||'') || b.id.localeCompare(a.id);});
  };
  Drive.prototype.read = async function (file) {
    if(!file || !/^[A-Za-z0-9_-]+$/.test(file.id))throw Error('Archivo no válido');
    var epoch=this.epoch, data=await this.request('https://www.googleapis.com/drive/v3/files/'+file.id+'?alt=media',{},epoch);
    if(data.schema!==1 || data.subject!==this.session.subject || !data.records)throw Error('La copia no corresponde a esta cuenta o versión.');
    var validator=new Store();validator.restore(data.records);return validator.snapshot();
  };
  Drive.prototype.save = async function (records, expectedHead) {
    if(!this.session || !this.session.subject)throw Error('Inicia sesión primero.');
    var validator=new Store();validator.restore(records);
    var epoch=this.epoch, subject=this.session.subject, before=await this.list();
    if((before[0]&&before[0].id||null)!==expectedHead)throw Error('Hay cambios de otro dispositivo. No se ha sobrescrito nada. Revisa la copia de Drive antes de guardar.');
    var nonce=globalThis.crypto.randomUUID(), boundary='nutrisport_'+nonce.replace(/-/g,'');
    var payload=JSON.stringify({schema:1,subject:subject,createdAt:new Date(this.now()).toISOString(),parent:expectedHead,records:validator.snapshot()});
    if(new TextEncoder().encode(payload).length>20000000)throw Error('Copia demasiado grande. No se ha borrado ninguna foto.');
    var metadata={name:'nutrisport-'+nonce+'.json',parents:['appDataFolder'],mimeType:'application/json',appProperties:{nutrisport:'snapshot-v1'}};
    var body='--'+boundary+'\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n'+JSON.stringify(metadata)+'\r\n--'+boundary+'\r\nContent-Type: application/json\r\n\r\n'+payload+'\r\n--'+boundary+'--';
    var saved=await this.request('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,createdTime', {method:'POST',headers:{'Content-Type':'multipart/related; boundary='+boundary},body:body},epoch);
    // Immutable snapshots: concurrent creation never destroys the other device's copy.
    var verified=await this.read(saved);
    if(JSON.stringify(verified)!==JSON.stringify(validator.snapshot()))throw Error('No se ha podido verificar la copia. Conserva los datos locales.');
    return saved;
  };
  return {Drive:Drive,Store:Store,legacy:legacy,APPDATA:APPDATA};
});
