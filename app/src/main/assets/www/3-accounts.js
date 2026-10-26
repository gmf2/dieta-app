(function(){'use strict';
 var config=window.NUTRISPORT_GOOGLE_CONFIG, api=new NutriGoogle.Drive(), store=new NutriGoogle.Store(), head=null, dirty=false, loading=false, viewEpoch=0;
 var $=function(id){return document.getElementById(id);};
 window.NutriPrivateStore=store;
 function status(text){$('status').textContent=text;$('sync').textContent=text;}
 function download(records,name){var blob=new Blob([JSON.stringify({schema:1,records:records},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(function(){URL.revokeObjectURL(url);},1000);}
 function legacy(){return NutriGoogle.legacy(localStorage);}
 function mount(){var frame=$('app');frame.hidden=false;frame.src='private-app.html';}
 function lock(){viewEpoch++;api.close();store.clear();head=null;dirty=false;loading=false;$('upload').disabled=false;$('app').src='about:blank';$('app').hidden=true;$('workspace').hidden=true;$('copies').hidden=true;$('gate').hidden=false;$('exit').hidden=true;$('account').textContent='';}
 async function connected(token,seconds,scopes){
  lock();var epoch=viewEpoch;try{var identity=await api.connect(token,seconds,scopes);if(epoch!==viewEpoch)return;$('account').textContent=identity.email;$('gate').hidden=true;$('workspace').hidden=false;$('exit').hidden=false;loading=true;var files=await api.list();if(epoch!==viewEpoch)return;head=files[0]?files[0].id:null;if(files[0]){var records=await api.read(files[0]);if(epoch!==viewEpoch)return;store.restore(records);}loading=false;mount();status(files.length?'Copia recuperada. Guarda los cambios antes de salir.':'Tu cuenta no tiene todavía una copia de NutriSport.');}
  catch(e){if(epoch===viewEpoch){lock();status(e.message);}}
 }
 window.nutriGoogleNativeResult=function(result){if(result.error){status(result.error);return;}connected(result.accessToken,result.expiresIn,result.scopes);};
 var tokenClient=null;
 function init(){
  if(!config.enabled || !config.webClientId){$('login').disabled=true;return;}
  if(window.NutriAndroid){$('login').disabled=!config.androidConfigured;return;}
  var s=document.createElement('script');s.src='https://accounts.google.com/gsi/client';s.async=true;s.onload=function(){tokenClient=google.accounts.oauth2.initTokenClient({client_id:config.webClientId,scope:config.scopes,callback:function(r){if(r.error){status('No se ha autorizado Google.');return;}connected(r.access_token,Number(r.expires_in),r.scope);},error_callback:function(){status('No se ha completado la autorización.');}});$('login').disabled=false;};s.onerror=function(){status('No se pudo cargar Google. Comprueba la conexión.');};document.head.appendChild(s);
 }
 $('login').onclick=function(){if(window.NutriAndroid){window.NutriAndroid.authorize();}else if(tokenClient){tokenClient.requestAccessToken({prompt:'select_account'});}};
 store.onchange=function(){if(!loading){dirty=true;status('Cambios en esta sesión. Guarda una copia en Drive antes de salir.');}};
 $('backup').onclick=function(){try{var data=legacy();if(!Object.keys(data).length){$('backupStatus').textContent='No hay progreso anterior en este navegador o instalación.';return;}download(data,'nutrisport-copia-local-privada.json');$('backupStatus').textContent='Copia descargada. No se ha borrado ni subido nada.';}catch(e){$('backupStatus').textContent='No se ha podido leer la copia anterior. No se ha modificado nada.';}};
 $('export').onclick=function(){download(store.snapshot(),'nutrisport-sesion-privada.json');};
 $('exit').onclick=function(){if(dirty&&!confirm('Hay cambios sin guardar en Drive. Descarga o guarda una copia antes de salir. ¿Salir y descartar esta sesión?'))return;lock();status('Sesión cerrada. No se conserva el progreso de esa cuenta en esta revisión.');};
 $('import').onclick=async function(){try{if(!api.session)throw Error('Inicia sesión primero.');if(head)throw Error('La cuenta ya tiene datos. No se sustituirá su progreso con una importación automática.');var records=legacy();if(!Object.keys(records).length)throw Error('No hay progreso anterior en este dispositivo.');if(!confirm('¿El progreso anterior pertenece a '+api.session.email+'? Descarga primero una copia local. No se borrarán los datos originales.'))return;store.restore(records);dirty=true;mount();status('Importado solo a esta sesión. Pulsa Guardar copia en Drive para subirlo. El original se conserva.');}catch(e){status(e.message);}};
 $('upload').onclick=async function(){if(loading)return;loading=true;var epoch=viewEpoch;$('upload').disabled=true;try{var snapshot=store.snapshot();var saved=await api.save(snapshot,head);if(epoch!==viewEpoch)return;head=saved.id;dirty=JSON.stringify(snapshot)!==JSON.stringify(store.snapshot());status(dirty?'Copia verificada, pero hay cambios nuevos pendientes.':'Copia guardada y verificada en tu Drive.');}catch(e){if(epoch!==viewEpoch)return;status(e.message+' Tus cambios de esta sesión siguen disponibles para descargar.');}finally{if(epoch===viewEpoch){loading=false;$('upload').disabled=false;}}};
 $('restore').onclick=async function(){var epoch=viewEpoch;try{var files=await api.list();if(epoch!==viewEpoch)return;var box=$('copies');box.replaceChildren();var title=document.createElement('h2');title.textContent='Copias privadas de tu cuenta';box.appendChild(title);if(!files.length){var p=document.createElement('p');p.textContent='No hay copias.';box.appendChild(p);}files.forEach(function(f){var b=document.createElement('button');b.textContent=new Date(f.createdTime).toLocaleString('es-ES');b.onclick=async function(){try{if(dirty&&!confirm('¿Descartar los cambios de esta sesión y abrir esta copia?'))return;var records=await api.read(f);if(epoch!==viewEpoch)return;store.restore(records);head=f.id;dirty=false;mount();status('Copia recuperada. No se ha eliminado ninguna otra copia.');box.hidden=true;}catch(e){if(epoch===viewEpoch)status(e.message);}};box.appendChild(b);});box.hidden=false;}catch(e){if(epoch===viewEpoch)status(e.message);}};
 addEventListener('beforeunload',function(e){if(dirty){e.preventDefault();e.returnValue='';}});
 init();
})();
