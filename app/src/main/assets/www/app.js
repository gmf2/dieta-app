/* Kalia - app local, sin conexión. Datos en localStorage del dispositivo. */
(function () {
  'use strict';

  var PHOTO_CREDITS = {};
  fetch('assets/credits.json').then(function (r) { return r.ok ? r.json() : {}; }).then(function (j) {
    PHOTO_CREDITS = j;
    if (location.hash === '#perfil' || !location.hash) { try { renderPerfil(); } catch (e) {} }
  }).catch(function () {});

  var DEFAULT_PROFILE = { peso: 80, altura: 175, edad: 30, sexo: 'hombre', deporte: 3, objetivo: 'mantener' };
  var DEFAULT_PICKS = { desayuno: 'd1', comida: 'c1', cena: 'n1' };
  var GOAL_ADJUST = { perder: -500, mantener: 0, ganar: 300 };
  var PROTEIN_GKG = { perder: 2, mantener: 1.6, ganar: 1.8 };  // g/kg de peso, rangos habituales de nutrición deportiva
  function proteinGoal(p) { return Math.round(PROTEIN_GKG[p.objetivo] * p.peso); }
  var GOAL_LABEL = { perder: 'Perder grasa', mantener: 'Mantener', ganar: 'Ganar músculo' };
  var ACTIVITY_LABEL = ['Sedentario', 'Actividad ligera', 'Actividad ligera', 'Actividad moderada',
    'Actividad moderada', 'Actividad alta', 'Actividad alta', 'Actividad muy alta'];
  var PHOTO_IDS = { 'c1':1, 'c10':1, 'c2':1, 'c3':1, 'c4':1, 'c5':1, 'c6':1, 'c7':1, 'c8':1, 'c9':1, 'd1':1, 'd2':1, 'd3':1, 'd4':1, 'd5':1, 'd8':1, 'n1':1, 'n10':1, 'n12':1, 'n13':1, 'n14':1, 'n16':1, 'n2':1, 'n3':1, 'n4':1, 'n5':1, 'n6':1, 'n7':1, 'n9':1, 'r-abr-c':1, 'r-abr-d':1, 'r-abr-n':1, 'r-ago-c':1, 'r-ago-n':1, 'r-dic-c':1, 'r-dic-d':1, 'r-dic-n':1, 'r-ene-c':1, 'r-ene-d':1, 'r-feb-c':1, 'r-feb-n':1, 'r-jul-d':1, 'r-jul-n':1, 'r-jun-c':1, 'r-mar-c':1, 'r-may-c':1, 'r-may-d':1, 'r-may-n':1, 'r-nov-c':1, 'r-nov-n':1, 'r-oct-c':1, 'r-oct-d':1, 'r-oct-n':1, 'r-sep-c':1, 'r-sep-n':1 };
  var ICONS = {
    bowl: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><path d="M4 12h16a8 8 0 0 1-16 0z"/><path d="M9 8c0-2 2-2 2-4M13 8c0-2 2-2 2-4"/></svg>',
    pot: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M2 10h20M8 6c1-2 7-2 8 0"/></svg>',
    plate: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>'
  };
  var SLOT_ICON = { desayuno: 'bowl', comida: 'pot', cena: 'plate' };
  var PLURAL_IRREG = { yogur: 'yogures', 'calabacín': 'calabacines', 'porción': 'porciones', puerro: 'puerros',
    'medio aguacate': 'medios aguacates', 'patata mediana': 'patatas medianas', 'boniato mediano': 'boniatos medianos' };

  function plural(label, n) {
    if (n === 1) return label;
    if (PLURAL_IRREG[label]) return PLURAL_IRREG[label];
    if (/s$/.test(label)) return label;
    if (/[aeiouáéíóú]$/.test(label)) return label + 's';
    return label + 'es';
  }
  function household(name, grams) {
    var ing = ING[name];
    if (!ing || !ing.ug) return '';
    var n = Math.round((grams / ing.ug) * 2) / 2;
    if (n < 0.5) n = 0.5;
    var num = (n % 1 === 0) ? String(n) : String(n).replace('.', ',');
    return num + ' ' + plural(ing.u, n);
  }

  function load(key, fallback) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : JSON.parse(JSON.stringify(fallback)); }
    catch (e) { return JSON.parse(JSON.stringify(fallback)); }
  }
  function save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }

  var profile = load('dieta.perfil.v1', DEFAULT_PROFILE);
  var picks = load('dieta.picks.v1', DEFAULT_PICKS);
  var checkins = load('dieta.revisiones.v1', []);
  var registro = load('dieta.registro.v1', {});
  var objetivos = load('dieta.objetivos.v1', {});
  var month = new Date().getMonth();
  var fotos = load('dieta.fotos.v1', {});
  var equipo = load('dieta.equipo.v1', 'gomas');
  var pendingPhoto = null;

  /* Clásicos rotan: 8 por comida, se muestran 4 cada mes (ciclo de 4 meses) */
  function rotPick(pool, m, n) {
    var start = (m * 2) % pool.length, out = [];
    for (var i = 0; i < n; i++) out.push(pool[(start + i) % pool.length]);
    return out;
  }
  function classicsFor(m, slot) {
    var pool = MEALS.filter(function (x) { return x.slot === slot; });
    var quick = pool.filter(function (x) { return x.rapida; });
    var norm = pool.filter(function (x) { return !x.rapida; });
    if (quick.length < 2) return rotPick(pool, m, 4);
    return rotPick(norm, m, 2).concat(rotPick(quick, m, 2));
  }

  function activityFactor(days) {
    if (days <= 0) return 1.2; if (days <= 2) return 1.375; if (days <= 4) return 1.55;
    if (days <= 6) return 1.725; return 1.9;
  }
  function compute(p) {
    var bmr = 10 * p.peso + 6.25 * p.altura - 5 * p.edad + (p.sexo === 'hombre' ? 5 : -161);
    var tdee = bmr * activityFactor(p.deporte);
    var target = tdee + GOAL_ADJUST[p.objetivo], floored = false;
    var floor = p.sexo === 'hombre' ? 1500 : 1200;
    if (target < floor) { target = floor; floored = true; }
    return { bmr: Math.round(bmr / 10) * 10, tdee: Math.round(tdee / 10) * 10,
             target: Math.round(target / 10) * 10, floored: floored, floor: floor };
  }
  function round5(n) { return Math.max(5, Math.round(n / 5) * 5); }
  function findOption(id) { return MEALS.concat(RECIPES).find(function (o) { return o.id === id; }); }
  function slotTarget(r, slot) { return Math.round(r.target * SLOT_SHARE[slot] / 10) * 10; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function photoFor(o) { return PHOTO_IDS[o.id] ? 'assets/' + o.id + '.jpg' : null; }
  function quickTag(o) {
    var tp = (o.tiempo || '').split(' · ');
    return 'Rápida · ' + (tp[0] === '0 min' ? (tp[1] || 'exprés') : tp[0]);
  }
  function todayIso() { return new Date().toISOString().slice(0, 10); }
  function fmtDate(iso) { return iso.slice(5).split('-').reverse().join('/'); }

  /* Ingredientes: nombre + medida casera | gramos + kcal (valores USDA) */
  function ingredientHTML(option, targetKcal) {
    var factor = targetKcal / option.kcal;
    var totalProt = 0;
    var WHOLE = { pieza: 1, huevo: 1, rebanada: 1, 'medio aguacate': 1, 'boniato mediano': 1, 'calabacín': 1, lata: 1, fresa: 1, manzana: 1, pera: 1, 'plátano': 1, mango: 1, filete: 1, loncha: 1, 'patata mediana': 1, yogur: 1, tajada: 1 };
    var rows = option.components.map(function (c) {
      var g = round5(c.grams * factor);
      if (WHOLE[ING[c.name].u]) g = Math.max(1, Math.round(g / ING[c.name].ug)) * ING[c.name].ug;
      var kcal = Math.round(ING[c.name].k * g / 100);
      var prot = Math.round(ING[c.name].p * g / 100);
      totalProt += prot;
      return '<div class="ing-row"><div><div class="ing-name">' + esc(c.name) + '</div>' +
        '<div class="ing-sub">' + household(c.name, g) + '</div></div>' +
        '<div class="ing-right"><b>' + g + ' g</b><span>' + kcal + ' kcal · ' + prot + ' g prot</span></div></div>';
    }).join('');
    return '<div class="ing">' + rows +
      '<div class="cap">Cantidades ajustadas a tu objetivo (' + Math.round(targetKcal / 10) * 10 +
      ' kcal en esta comida, aprox.; las piezas van enteras). Proteína del plato: ~' + totalProt + ' g. Valores de composición del USDA.</div></div>';
  }

  function optionProtein(option, targetKcal) {
    var WHOLE = { pieza: 1, huevo: 1, rebanada: 1, 'medio aguacate': 1, 'boniato mediano': 1, 'calabacín': 1, lata: 1, fresa: 1, manzana: 1, pera: 1, 'plátano': 1, mango: 1, filete: 1, loncha: 1, 'patata mediana': 1, yogur: 1, tajada: 1 };
    var factor = targetKcal / option.kcal, tot = 0;
    option.components.forEach(function (c) {
      var g = round5(c.grams * factor);
      if (WHOLE[ING[c.name].u]) g = Math.max(1, Math.round(g / ING[c.name].ug)) * ING[c.name].ug;
      tot += Math.round(ING[c.name].p * g / 100);
    });
    return tot;
  }

  /* ---------- Hero ---------- */
  function renderHero() {
    var r = compute(profile);
    objetivos[todayIso().slice(0, 7)] = r.target; save('dieta.objetivos.v1', objetivos);
    document.getElementById('ringNum').textContent = r.target;
    document.getElementById('ringFill').style.strokeDashoffset = (251.3 * 0.25).toFixed(1);
    var colors = { desayuno: '#ffd166', comida: '#ff9f5a', cena: '#a7f3d0' };
    document.getElementById('heroSplit').innerHTML = ['desayuno', 'comida', 'cena'].map(function (s) {
      return '<div class="split-row"><span><span class="dot" style="background:' + colors[s] + '"></span>' +
        SLOT_LABEL[s] + '</span><b>' + slotTarget(r, s) + '</b></div>';
    }).join('');
  }

  /* ---------- Perfil ---------- */
  function numField(label, key, min, max, unit) {
    return '<div class="field"><div class="f-top"><span>' + label + '</span>' +
      '<span class="num-wrap"><input class="num-input" type="number" inputmode="numeric" pattern="[0-9]*" min="' + min + '" max="' + max +
      '" value="' + profile[key] + '" data-key="' + key + '" data-unit="' + unit + '"><span class="num-unit">' + unit + '</span></span></div>' +
      '<input type="range" min="' + min + '" max="' + max + '" value="' + profile[key] + '" data-key="' + key + '" data-unit="' + unit + '"></div>';
  }
  function segField(key, options) {
    return '<div class="seg" data-seg="' + key + '">' + options.map(function (o) {
      return '<button data-v="' + o.v + '" class="' + (profile[key] === o.v ? 'active' : '') + '">' + o.l + '</button>';
    }).join('') + '</div>';
  }

  function renderPerfil() {
    var r = compute(profile);
    var today = new Date(), tIso = todayIso();
    var last = checkins[checkins.length - 1];
    var daysSince = last ? Math.floor((today - new Date(last.fecha)) / 86400000) : null;
    var nextIn = daysSince == null ? null : Math.max(0, 14 - daysSince);

    var html = '';
    try {
      var cr = PHOTO_CREDITS || {};
      var byIds = Object.keys(cr).filter(function (k) { return /CC BY/.test(cr[k].license); });
      if (Object.keys(cr).length) {
        html += '<div class="card"><h2>Créditos de fotos</h2>' +
          '<div class="sub">Fotos de platos de Wikimedia Commons con licencia libre (CC0 / dominio público / CC BY / CC BY-SA) y fotos generadas por IA. Las CC BY / CC BY-SA llevan atribución:</div>' +
          byIds.map(function (k) {
            var c = cr[k];
            return '<div class="rev-row" style="font-size:.72rem"><b>' + (c.title || k) + '</b> — ' + (c.artist || 'desconocido') +
              ' · <a href="' + c.url + '" target="_blank" rel="noopener">' + c.license + '</a></div>';
          }).join('') + '</div>';
      }
    } catch (e) {}
    var html = '';
    html += '<div class="card"><h2>Tus datos</h2><div class="sub">Escríbelos a mano o usa la barra; todo se recalcula solo.</div>' +
      numField('Peso', 'peso', 40, 150, 'kg') +
      numField('Altura', 'altura', 140, 210, 'cm') +
      numField('Edad', 'edad', 16, 90, 'años') +
      '<div class="f-top" style="font-size:.88rem;font-weight:600;margin-bottom:6px"><span>Sexo (para la fórmula)</span></div>' +
      segField('sexo', [{ v: 'hombre', l: 'Hombre' }, { v: 'mujer', l: 'Mujer' }]) +
      numField('Días de deporte a la semana', 'deporte', 0, 7, 'días') +
      '<div class="f-top" style="font-size:.88rem;font-weight:600;margin-bottom:6px"><span>Tu objetivo</span></div>' +
      segField('objetivo', [{ v: 'perder', l: 'Perder grasa' }, { v: 'mantener', l: 'Mantener' }, { v: 'ganar', l: 'Ganar músculo' }]) +
      '</div>';

    html += '<div class="card"><h2>Tu objetivo de calorías</h2><div class="sub">Fórmula de Mifflin-St Jeor + tu actividad + tu objetivo.</div>' +
      '<div class="fact"><span>Metabolismo basal (TMB)</span><b>' + r.bmr + ' kcal</b></div>' +
      '<div class="fact"><span>Gasto con actividad (' + ACTIVITY_LABEL[profile.deporte].toLowerCase() + ')</span><b>' + r.tdee + ' kcal</b></div>' +
      '<div class="fact"><span>Objetivo diario (' + GOAL_LABEL[profile.objetivo].toLowerCase() + ')</span><b>' + r.target + ' kcal</b></div>';
    var pkg = PROTEIN_GKG[profile.objetivo], pg = proteinGoal(profile);
    html += '<div class="fact"><span>Proteína diaria (' + GOAL_LABEL[profile.objetivo].toLowerCase() + ', ' + String(pkg).replace('.', ',') + ' g/kg)</span><b>' + pg + ' g</b></div>';
    html += '<div class="note green"><b>Proteína según objetivo</b> (a tu peso actual de ' + profile.peso + ' kg): ' +
      'perder grasa = 2 g/kg, <b>' + Math.round(2 * profile.peso) + ' g</b> al día (protege el músculo al bajar); ' +
      'mantener = 1,6 g/kg, <b>' + Math.round(1.6 * profile.peso) + ' g</b>; ' +
      'ganar músculo = 1,8 g/kg, <b>' + Math.round(1.8 * profile.peso) + ' g</b>. Rangos habituales de nutrición deportiva, orientativos.</div>';

    if (profile.objetivo !== 'mantener') {
      var diff = GOAL_ADJUST[profile.objetivo];
      var kgWeek = Math.abs(diff * 7 / 7700);
      html += '<div class="note green"><b>Resumen de tu meta:</b> ' +
        (diff < 0 ? 'unas <b>' + Math.abs(diff) + ' kcal menos</b> al día que para mantenerte' :
                    'unas <b>' + diff + ' kcal más</b> al día que para mantenerte') +
        ', lo que sale a unas <b>' + String(kgWeek.toFixed(2)).replace('.', ',') + ' kg por semana</b> ' +
        (diff < 0 ? 'de menos' : 'de más') + '. Estimación aproximada (7700 kcal ≈ 1 kg); el ritmo real varía.</div>';
    } else {
      html += '<div class="note green">Objetivo de mantenimiento: comes lo que gastas, sin déficit ni superávit.</div>';
    }
    if (r.floored) html += '<div class="note">Con ese objetivo saldrían menos de ' + r.floor + ' kcal, así que lo he dejado en ' + r.floor + '. Bajar más no es recomendable sin supervisión.</div>';
    html += '<div class="note green">Ajuste por objetivo: -500 kcal para perder, +300 para ganar. Es orientación general, no consejo médico.</div></div>';

    html += '<div class="card"><h2>Revisión quincenal</h2><div class="sub">Cada revisión guarda TODO: peso, altura, edad, deporte, objetivo y tus calorías calculadas. El historial está en Progreso.</div>' +
      '<button class="btn primary" id="btnCheckin">' +
      (last && last.fecha === tIso ? 'Actualizar revisión de hoy (' + profile.peso + ' kg)' : 'Anotar revisión de hoy (' + profile.peso + ' kg)') + '</button>' +
      (last ? '<div class="muted mt8">Última revisión: ' + fmtDate(last.fecha) + ' con ' + last.peso + ' kg' +
        (nextIn != null ? (nextIn === 0 ? ' · ya toca la siguiente' : ' · la siguiente en unos ' + nextIn + ' días') : '') + '.</div>' : '') +
      (checkins.length ? '<button class="btn ghost" id="btnUndoCheckin">Borrar la última revisión</button>' : '') + '</div>';

    document.getElementById('tab-perfil').innerHTML = html;
  }

  /* ---------- Hoy ---------- */
  function renderHoy() {
    var r = compute(profile);
    var tIso = todayIso();
    var dayLog = registro[tIso] || {};
    var html = '<div class="card"><h2>Tu dieta de hoy</h2>' +
      '<div class="sub">Elige una opción en cada comida. Las cantidades se ajustan solas para sumar tu objetivo de ' + r.target + ' kcal.</div></div>';

    ['desayuno', 'comida', 'cena'].forEach(function (slot) {
      var target = slotTarget(r, slot);
      var monthRecipe = RECIPES.find(function (x) { return x.month === month && x.slot === slot; });
      var options = classicsFor(month, slot);
      if (monthRecipe) options = options.concat([monthRecipe]);
      if (!findOption(picks[slot]) || findOption(picks[slot]).slot !== slot) picks[slot] = options[0].id;
      var selected = findOption(picks[slot]) || options[0];
      var done = !!dayLog[slot];

      var hOpen = !!hoyOpen[slot];
      html += '<div class="slot-head" data-hoy-toggle="' + slot + '">' + ICONS[SLOT_ICON[slot]] + '<h3>' + SLOT_LABEL[slot] + '</h3>' +
        '<span class="kcal">' + target + ' kcal</span>' +
        '<span class="ses-chevron' + (hOpen ? ' open' : '') + '"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg></span></div>';
      html += hOpen ? '<div>' : '<div hidden>';
      html += '<div class="meal-grid">' + options.map(function (o) {
        var ph = photoFor(o);
        var isRecipe = o.recipeOfMonth || (monthRecipe && monthRecipe.id === o.id) || o.pasos;
        return '<button class="meal-card' + (o.id === selected.id ? ' selected' : '') + '" data-slot="' + slot + '" data-id="' + o.id + '">' +
          '<span class="check">✓</span>' +
          (ph ? '<img src="' + ph + '" alt="' + esc(o.name) + '" loading="lazy">'
              : '<div class="svg-cover">' + ICONS[SLOT_ICON[o.slot]] + '</div>') +
          '<div class="m-body"><div class="m-name">' + esc(o.name) + '</div>' +
          (isRecipe ? '<div class="m-tag recipe-of">Receta de ' + MONTHS[month] + '</div>' :
            (o.rapida ? '<div class="m-tag quick">' + quickTag(o) + '</div>' : '<div class="m-tag">Clásico</div>')) +
          '</div></button>';
      }).join('') + '</div>';
      html += ingredientHTML(selected, target);
      html += '<button class="btn ' + (done ? 'done' : 'soft') + '" data-done="' + slot + '">' +
        (done ? '✓ ' + SLOT_LABEL[slot] + ' hecha (' + dayLog[slot] + ' kcal)' : 'Marcar ' + SLOT_LABEL[slot].toLowerCase() + ' como hecha') + '</button>';
      html += '</div>';
    });

    var dayProt = ['desayuno', 'comida', 'cena'].reduce(function (acc, s) {
      var o = findOption(picks[s]);
      return acc + (o ? optionProtein(o, slotTarget(r, s)) : 0);
    }, 0);
    var protGoal = proteinGoal(profile);
    html += '<div class="card mt12"><div class="fact"><span>Desayuno</span><b>' + slotTarget(r, 'desayuno') + ' kcal</b></div>' +
      '<div class="fact"><span>Comida</span><b>' + slotTarget(r, 'comida') + ' kcal</b></div>' +
      '<div class="fact"><span>Cena</span><b>' + slotTarget(r, 'cena') + ' kcal</b></div>' +
      '<div class="fact"><span>Total del día</span><b>' + r.target + ' kcal</b></div>' +
      '<div class="fact"><span>Proteína del día (con lo elegido)</span><b>~' + dayProt + ' g de ' + protGoal + ' g</b></div>' +
      (dayProt >= protGoal * 0.9
        ? '<div class="note green">Proteína cubierta con estas elecciones.</div>'
        : '<div class="note">Con estas elecciones llegas a ~' + dayProt + ' g de proteína, por debajo de tu objetivo de ' + protGoal + ' g. Elige opciones con huevo, pavo, pollo, pescado o legumbres para subirla.</div>') +
      '<div class="muted mt8">Si cambias tu peso u objetivo en Perfil, estas cantidades se recalculan solas.</div></div>';

    document.getElementById('tab-hoy').innerHTML = html;
  }

  /* ---------- Recetas ---------- */
  function renderRecetas() {
    var r = compute(profile);
    var recipes = RECIPES.filter(function (x) { return x.month === month; });
    var html = '<div class="card"><h2>Recetas de temporada</h2>' +
      '<div class="sub">Tres recetas nuevas cada mes para sustituir cualquier plato de tu dieta. Saciantes y ligeras: mucho volumen, fibra y proteína.</div></div>';
    html += '<div class="month-nav"><button id="mPrev">← Anterior</button><h2>' + MONTHS[month] + '</h2><button id="mNext">Siguiente →</button></div>';

    recipes.forEach(function (rec) {
      var target = slotTarget(r, rec.slot);
      var inUse = picks[rec.slot] === rec.id;
      var ph = photoFor(rec);
      html += '<div class="recipe-card">' +
        (ph ? '<img src="' + ph + '" alt="' + esc(rec.name) + '" loading="lazy">'
            : '<div class="emoji-cover">' + ICONS[SLOT_ICON[rec.slot]] + '</div>') +
        '<div class="r-body"><span class="pill orange">Sustituye a: ' + SLOT_LABEL[rec.slot].toLowerCase() + '</span>' +
        '<h3 class="mt8">' + esc(rec.name) + '</h3>' +
        ingredientHTML(rec, target) +
        '<ol class="steps">' + rec.pasos.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ol>' +
        (inUse ? '<div class="inuse">✓ Ya está en tu dieta de hoy</div>'
               : '<button class="btn primary small" data-use="' + rec.id + '" data-slot="' + rec.slot + '">Usarla hoy como ' + SLOT_LABEL[rec.slot].toLowerCase() + '</button>') +
        '</div></div>';
    });

    document.getElementById('tab-recetas').innerHTML = html;
  }

  /* ---------- Entrenamiento ---------- */
  var RUTINAS = {
    gomas: { nombre: 'Gomas (casa)',
      A: [
      { id: 'T1', nombre: 'Fullbody Torso', ej: [
        { n: 'Jalón al pecho con goma', s: '4 x 12', g: 'Espalda', p: 'row', img: 'gomas-jalon-pecho' },
        { n: 'Remo a 2 manos con goma', s: '4 x 12', g: 'Espalda', p: 'row', img: 'gomas-remo-2m' },
        { n: 'Curl de bíceps a 1 mano con goma', s: '3 x 15', g: 'Bíceps', p: 'curl', img: 'gomas-curl-1m' },
        { n: 'Flexiones con goma', s: '4 x 12', g: 'Pecho', p: 'pushup', img: 'gomas-flexiones' },
        { n: 'Press militar a 1 mano con goma', s: '4 x 15', g: 'Hombro', p: 'press', img: 'gomas-press-militar-1m' },
        { n: 'Plancha', s: '3 x 40 s', g: 'Core', p: 'plank', img: 'core-plancha' } ] },
      { id: 'P', nombre: 'Pierna', ej: [
        { n: 'Peso muerto B-stance con goma', s: '4 x 10', g: 'Pierna', p: 'hinge', img: 'gomas-rdl-bstance' },
        { n: 'Subidas al cajón con goma', s: '3 x 10 por pierna', g: 'Pierna', p: 'lunge', img: 'gomas-subidas-cajon' },
        { n: 'Sentadilla con goma', s: '4 x 12', g: 'Pierna', p: 'squat', img: 'gomas-sentadilla' },
        { n: 'Zancada atrás con goma', s: '3 x 10 por pierna', g: 'Pierna', p: 'lunge', img: 'gomas-zancada' },
        { n: 'Puente de glúteo con goma', s: '3 x 15', g: 'Glúteo', p: 'bridge', img: 'gomas-puente' },
        { n: 'Gemelos con goma', s: '4 x 15', g: 'Pierna', p: 'squat', img: 'gomas-gemelos' },
        { n: 'Plancha lateral', s: '3 x 30 s por lado', g: 'Core', p: 'plank', img: 'core-plancha-lateral' } ] },
      { id: 'T2', nombre: 'Fullbody Torso', ej: [
        { n: 'Press de pecho a 1 mano con goma', s: '4 x 12', g: 'Pecho', p: 'press', img: 'gomas-press-pecho-1m' },
        { n: 'Jalón a 1 mano con goma', s: '4 x 12', g: 'Espalda', p: 'row', img: 'gomas-jalon-1m' },
        { n: 'Press militar con goma', s: '4 x 15', g: 'Hombro', p: 'press', img: 'gomas-press-militar' },
        { n: 'Remo sentado con goma', s: '4 x 12', g: 'Espalda', p: 'row', img: 'gomas-remo-sentado' },
        { n: 'Curl martillo con goma', s: '3 x 15', g: 'Bíceps', p: 'curl', img: 'gomas-curl-martillo', ss: 1 },
        { n: 'Extensión de tríceps con goma', s: '3 x 12', g: 'Tríceps', p: 'curl', img: 'gomas-triceps', ss: 1 } ] } ],
      B: [
      { id: 'T1', nombre: 'Fullbody Torso', ej: [
        { n: 'Jalón agarre estrecho con goma', s: '4 x 12', g: 'Espalda', p: 'row', img: 'gomas-jalon-estrecho' },
        { n: 'Remo a 1 mano con goma', s: '4 x 10 por brazo', g: 'Espalda', p: 'row', img: 'gomas-remo-1m' },
        { n: 'Curl de bíceps con goma', s: '3 x 12', g: 'Bíceps', p: 'curl', img: 'gomas-curl' },
        { n: 'Flexiones con goma y pausa', s: '4 x 8', g: 'Pecho', p: 'pushup', img: 'gomas-flexiones' },
        { n: 'Press Arnold con goma', s: '3 x 12', g: 'Hombro', p: 'press', img: 'gomas-press-arnold' },
        { n: 'Escaladores', s: '3 x 20', g: 'Core', p: 'plank', img: 'core-escaladores' } ] },
      { id: 'P', nombre: 'Pierna', ej: [
        { n: 'Peso muerto rumano con goma', s: '4 x 12', g: 'Pierna', p: 'hinge', img: 'gomas-rdl' },
        { n: 'Sentadilla búlgara con goma', s: '3 x 10 por pierna', g: 'Pierna', p: 'lunge', img: 'gomas-bulgara' },
        { n: 'Sentadilla con goma y pausa', s: '4 x 10', g: 'Pierna', p: 'squat', img: 'gomas-sentadilla' },
        { n: 'Zancada lateral con goma', s: '3 x 10 por pierna', g: 'Pierna', p: 'lunge', img: 'gomas-zancada-lateral' },
        { n: 'Puente de glúteo a 1 pierna con goma', s: '3 x 12 por pierna', g: 'Glúteo', p: 'bridge', img: 'gomas-puente-1p' },
        { n: 'Gemelos con goma', s: '4 x 15', g: 'Pierna', p: 'squat', img: 'gomas-gemelos' },
        { n: 'Plancha con toques de hombro', s: '3 x 20', g: 'Core', p: 'plank', img: 'core-plancha-toques' } ] },
      { id: 'T2', nombre: 'Fullbody Torso', ej: [
        { n: 'Press inclinado con goma', s: '4 x 12', g: 'Pecho', p: 'press', img: 'gomas-press-inclinado' },
        { n: 'Jalón al pecho con goma', s: '4 x 12', g: 'Espalda', p: 'row', img: 'gomas-jalon-pecho' },
        { n: 'Elevaciones laterales con goma', s: '3 x 15', g: 'Hombro', p: 'curl', img: 'gomas-elev-laterales' },
        { n: 'Face pull con goma', s: '3 x 15', g: 'Espalda', p: 'row', img: 'gomas-face-pull' },
        { n: 'Curl de bíceps con goma', s: '3 x 12', g: 'Bíceps', p: 'curl', img: 'gomas-curl', ss: 1 },
        { n: 'Extensión tras nuca con goma', s: '3 x 12', g: 'Tríceps', p: 'press', img: 'gomas-triceps-nuca', ss: 1 } ] } ] },
    mancuernas: { nombre: 'Mancuernas (gym)',
      A: [
      { id: 'T1', nombre: 'Fullbody Torso', ej: [
        { n: 'Jalón al pecho en polea', s: '4 x 12', g: 'Espalda', p: 'row', img: 'manc-jalon-pecho' },
        { n: 'Remo a 2 manos con mancuernas', s: '4 x 12', g: 'Espalda', p: 'row', img: 'manc-remo-2m' },
        { n: 'Curl de bíceps a 1 mano', s: '3 x 15', g: 'Bíceps', p: 'curl', img: 'manc-curl-1m' },
        { n: 'Flexiones sobre mancuernas', s: '4 x 12', g: 'Pecho', p: 'pushup', img: 'manc-flexiones' },
        { n: 'Press militar a 1 mano', s: '4 x 15', g: 'Hombro', p: 'press', img: 'manc-press-militar-1m' },
        { n: 'Plancha', s: '3 x 40 s', g: 'Core', p: 'plank', img: 'core-plancha' } ] },
      { id: 'P', nombre: 'Pierna', ej: [
        { n: 'Peso muerto B-stance con mancuernas', s: '4 x 10', g: 'Pierna', p: 'hinge', img: 'manc-rdl-bstance' },
        { n: 'Subidas al cajón con mancuernas', s: '3 x 10 por pierna', g: 'Pierna', p: 'lunge', img: 'manc-subidas-cajon' },
        { n: 'Sentadilla goblet', s: '4 x 12', g: 'Pierna', p: 'squat', img: 'manc-sentadilla-goblet' },
        { n: 'Zancada atrás con mancuernas', s: '3 x 10 por pierna', g: 'Pierna', p: 'lunge', img: 'manc-zancada' },
        { n: 'Puente de glúteo con mancuerna', s: '3 x 15', g: 'Glúteo', p: 'bridge', img: 'manc-puente' },
        { n: 'Gemelos con mancuernas', s: '4 x 15', g: 'Pierna', p: 'squat', img: 'manc-gemelos' },
        { n: 'Plancha lateral', s: '3 x 30 s por lado', g: 'Core', p: 'plank', img: 'core-plancha-lateral' } ] },
      { id: 'T2', nombre: 'Fullbody Torso', ej: [
        { n: 'Press de pecho a 1 mano con mancuerna', s: '4 x 12', g: 'Pecho', p: 'press', img: 'manc-press-pecho-1m' },
        { n: 'Jalón a 1 mano en polea', s: '4 x 12', g: 'Espalda', p: 'row', img: 'manc-jalon-1m' },
        { n: 'Press militar con mancuernas', s: '4 x 15', g: 'Hombro', p: 'press', img: 'manc-press-militar' },
        { n: 'Remo sentado en polea', s: '4 x 12', g: 'Espalda', p: 'row', img: 'manc-remo-sentado' },
        { n: 'Curl martillo', s: '3 x 15', g: 'Bíceps', p: 'curl', img: 'manc-curl-martillo', ss: 1 },
        { n: 'Extensión de tríceps a 2 manos', s: '3 x 12', g: 'Tríceps', p: 'press', img: 'manc-triceps', ss: 1 } ] } ],
      B: [
      { id: 'T1', nombre: 'Fullbody Torso', ej: [
        { n: 'Jalón agarre estrecho en polea', s: '4 x 12', g: 'Espalda', p: 'row', img: 'manc-jalon-pecho' },
        { n: 'Remo a 1 mano con mancuerna', s: '4 x 10 por brazo', g: 'Espalda', p: 'row', img: 'manc-remo-1m' },
        { n: 'Curl de bíceps con mancuernas', s: '3 x 12', g: 'Bíceps', p: 'curl', img: 'manc-curl' },
        { n: 'Flexiones sobre mancuernas con pausa', s: '4 x 8', g: 'Pecho', p: 'pushup', img: 'manc-flexiones' },
        { n: 'Press Arnold con mancuernas', s: '3 x 12', g: 'Hombro', p: 'press', img: 'manc-press-arnold' },
        { n: 'Escaladores', s: '3 x 20', g: 'Core', p: 'plank', img: 'core-escaladores' } ] },
      { id: 'P', nombre: 'Pierna', ej: [
        { n: 'Peso muerto con mancuernas', s: '4 x 10', g: 'Pierna', p: 'hinge', img: 'manc-rdl' },
        { n: 'Sentadilla búlgara con mancuernas', s: '3 x 10 por pierna', g: 'Pierna', p: 'lunge', img: 'manc-bulgara' },
        { n: 'Sentadilla goblet con pausa', s: '4 x 8', g: 'Pierna', p: 'squat', img: 'manc-sentadilla-goblet' },
        { n: 'Zancada lateral con mancuerna', s: '3 x 10 por pierna', g: 'Pierna', p: 'lunge', img: 'manc-zancada-lateral' },
        { n: 'Puente de glúteo a 1 pierna con mancuerna', s: '3 x 12 por pierna', g: 'Glúteo', p: 'bridge', img: 'manc-puente-1p' },
        { n: 'Gemelos con mancuernas', s: '4 x 15', g: 'Pierna', p: 'squat', img: 'manc-gemelos' },
        { n: 'Plancha con toques de hombro', s: '3 x 20', g: 'Core', p: 'plank', img: 'core-plancha-toques' } ] },
      { id: 'T2', nombre: 'Fullbody Torso', ej: [
        { n: 'Press banca con mancuernas', s: '4 x 10', g: 'Pecho', p: 'press', img: 'manc-press-banca' },
        { n: 'Remo a 2 manos agarre ancho', s: '4 x 10', g: 'Espalda', p: 'row', img: 'manc-remo-2m-ancho' },
        { n: 'Elevaciones laterales', s: '3 x 15', g: 'Hombro', p: 'curl', img: 'manc-elev-laterales' },
        { n: 'Pájaros con mancuernas', s: '3 x 15', g: 'Espalda', p: 'row', img: 'manc-pajaros' },
        { n: 'Curl concentrado', s: '3 x 10 por brazo', g: 'Bíceps', p: 'curl', img: 'manc-curl-concentrado', ss: 1 },
        { n: 'Fondos asistidos en banco', s: '3 x 12', g: 'Tríceps', p: 'dip', img: 'manc-fondos-banco', ss: 1 } ] } ] },
    calistenia: {
      nombre: 'Calistenia',
      skills: true,
      A: [
        { id: 'b1', nombre: 'Básicos de barra', nota: 'Base para todo lo demás: antes de ir a por skills necesitas unas 8 dominadas y 15 fondos limpios. Si no te salen las dominadas, haz negativas: sube como puedas y baja en 3-4 segundos.', ej: [
          { n: 'Dominadas', s: '4 x 6 (o negativas 4 x 4)', g: 'Espalda', p: 'pullup', img: 'skill-dominadas' },
          { n: 'Fondos en paralelas o entre sillas', s: '3 x 8', g: 'Pecho · Tríceps', p: 'dip', img: 'skill-fondos' },
          { n: 'Flexiones', s: '3 x 12', g: 'Pecho', p: 'pushup', img: 'cal-flexiones' },
          { n: 'Remo invertido en mesa o barra baja', s: '4 x 8', g: 'Espalda', p: 'row', img: 'cal-remo-mesa' },
          { n: 'Sentadilla al aire', s: '3 x 15', g: 'Pierna', p: 'squat', img: 'cal-sentadilla' },
          { n: 'Plancha', s: '3 x 30 s', g: 'Core', p: 'plank', img: 'core-plancha' } ] },
        { id: 'b2', nombre: 'Skill: Muscle up', nota: 'Progresión: 1) 8 dominadas limpias, 2) dominada explosiva al pecho, 3) transición con goma, 4) primer muscle up. Domina cada paso unas 2 semanas antes de subir.', ej: [
          { n: 'Dominada explosiva al pecho', s: '4 x 5', g: 'Tirón', p: 'pullup', img: 'skill-dominada-explosiva' },
          { n: 'Fondos en barra alta (o entre sillas)', s: '3 x 6', g: 'Empuje', p: 'dip', img: 'skill-fondos-barra' },
          { n: 'Transición con goma', s: '3 x 5', g: 'Técnica', p: 'pullup', img: 'skill-muscleup-transicion' },
          { n: 'Muscle up negativo (bajada lenta)', s: '3 x 3', g: 'Técnica', p: 'pullup', img: 'skill-muscleup-negativo' },
          { n: 'Balanceo kipping controlado', s: '3 x 8', g: 'Técnica', p: 'pullup', img: 'skill-kipping' } ] },
        { id: 'b3', nombre: 'Skill: Front lever', nota: 'Progresión: tuck → advanced tuck → una pierna → straddle → front lever completo. Aguanta 15 s limpios en un nivel antes de subir al siguiente.', ej: [
          { n: 'Tuck front lever (rodillas al pecho)', s: '4 x 10 s', g: 'Estático', p: 'pullup', img: 'skill-frontlever-tuck' },
          { n: 'Subidas a tuck front lever', s: '3 x 4', g: 'Fuerza', p: 'pullup', img: 'skill-frontlever-subidas' },
          { n: 'Negativa de dominada a front lever', s: '3 x 3', g: 'Fuerza', p: 'pullup', img: 'skill-frontlever-negativa' },
          { n: 'Advanced tuck front lever (espalda plana)', s: '3 x 8 s', g: 'Estático', p: 'pullup', img: 'skill-frontlever-advtuck' },
          { n: 'Remo en tuck front lever', s: '3 x 4', g: 'Fuerza', p: 'row', img: 'skill-frontlever-remo' } ] },
        { id: 'b4', nombre: 'Skill: Straddle planche', nota: 'Lo de "straddle" lo tomo como straddle planche: plancha en el suelo/barras con las piernas abiertas. Progresión: frog stand → tuck → advanced tuck → straddle. Aquí la unidad es el mes, no la semana: paciencia.', ej: [
          { n: 'Planche lean (peso al frente, brazos rectos)', s: '4 x 15 s', g: 'Empuje estático', p: 'plank', img: 'skill-planche-lean' },
          { n: 'Frog stand (equilibrio de rana)', s: '4 x 15 s', g: 'Equilibrio', p: 'plank', img: 'skill-frog-stand' },
          { n: 'Tuck planche hold', s: '3 x 10 s', g: 'Estático', p: 'plank', img: 'skill-planche-tuck' },
          { n: 'Flexiones pseudo-planche', s: '3 x 6', g: 'Empuje', p: 'pushup', img: 'skill-pseudo-pushup' },
          { n: 'Flexiones pike', s: '3 x 8', g: 'Hombro', p: 'pushup', img: 'cal-pike' } ] },
        { id: 'b5', nombre: 'Skill: Pino (handstand)', nota: 'Progresión: pared → salidas controladas → pino libre 10 s → flexiones en pino. Poco y a menudo: 10 minutos al día valen más que una hora el fin de semana.', ej: [
          { n: 'Pino contra pared (de espaldas a la pared)', s: '4 x 20-30 s', g: 'Equilibrio', p: 'plank', img: 'skill-pino-pared' },
          { n: 'Caminata de pared hasta pino', s: '3 x 3', g: 'Técnica', p: 'pushup', img: 'skill-pino-caminata' },
          { n: 'Pino libre (intentos con salida)', s: '5 intentos', g: 'Equilibrio', p: 'plank', img: 'skill-pino-libre' },
          { n: 'Flexiones en pino contra pared (o pike)', s: '3 x 5', g: 'Hombro', p: 'pushup', img: 'skill-pino-flexiones' },
          { n: 'Hollow body hold', s: '3 x 15 s', g: 'Core', p: 'plank', img: 'skill-hollow' } ] }
      ],
      B: null
    }
  };
  RUTINAS.calistenia.B = RUTINAS.calistenia.A;

  function exSVG(p) {
    var P = {
      squat: '<circle cx="50" cy="10" r="6"/><path d="M50 16v18M50 34l-11 9 2 15M50 34l11 9-2 15M50 21l-14 8M50 21l14 8"/>',
      lunge: '<circle cx="55" cy="9" r="6"/><path d="M55 15v17M55 32l-11 11v15M55 32l13 11 4 13M55 19l-10 15M55 19l10 15"/>',
      press: '<circle cx="50" cy="10" r="6"/><path d="M50 16v24M50 40l-8 20M50 40l8 20M50 20L37 7M50 20l13-13M32 4h10M58 4h10"/>',
      row: '<circle cx="30" cy="17" r="6"/><path d="M36 21l22 8M58 29l-6 20 2 13M58 29l7 19-3 14M42 24l7 18"/>',
      hinge: '<circle cx="27" cy="21" r="6"/><path d="M33 25l27 6M60 31l-2 31M60 31l6 31M40 27l3 21"/>',
      bridge: '<circle cx="19" cy="44" r="6"/><path d="M25 45l27-9M52 36l14 8v16M25 47l20 5"/>',
      plank: '<circle cx="23" cy="28" r="6"/><path d="M29 32l37 2M32 34l-2 16M66 34l16 16"/>',
      pushup: '<circle cx="23" cy="25" r="6"/><path d="M29 29l37 3M31 31l1 21M66 32l16 16"/>',
      pullup: '<path d="M18 7h64"/><circle cx="50" cy="19" r="6"/><path d="M50 25v19M50 27L37 7M50 27l13-20M50 44l-6 14 6 6M50 44l6 14 2 6"/>',
      dip: '<path d="M28 16v38M72 16v38"/><circle cx="50" cy="15" r="6"/><path d="M50 21v19M50 25L28 32M50 25l22 7M50 40l-4 14 6 6M50 40l4 14 0 8"/>',
      curl: '<circle cx="50" cy="10" r="6"/><path d="M50 16v24M50 40l-6 20M50 40l6 20M50 20l-6 14 6-6M50 20l6 14-6-6"/>'
    };
    return '<svg viewBox="0 0 100 70" width="100%" height="100%" fill="none" stroke="#15803d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' + (P[p] || P.squat) + '</svg>';
  }
  var sesiones = load('dieta.sesiones.v1', {});
  var entrenoActivo = null, tutOpen = false;
  var hoyOpen = load('dieta.hoyopen.v1', {});
  var sesOpen = load('dieta.sesopen.v1', {});

  function mondayIso() {
    var d = new Date();
    var dow = (d.getDay() + 6) % 7;
    d.setDate(d.getDate() - dow);
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function exThumb(x) {
    var svg = '<div class="ex-svg">' + exSVG(x.p) + '</div>';
    return '<img class="ex-thumb" src="assets/ex-' + x.img + '.jpg" alt="" loading="lazy" onerror="this.outerHTML=this.dataset.fb" data-fb="' + svg.replace(/"/g, '&quot;') + '">';
  }
  function renderEntreno() {
    var mIdx = new Date().getMonth();
    var rutKey = (mIdx % 2 === 0) ? 'A' : 'B';
    var eq = RUTINAS[equipo] || RUTINAS.gomas;
    var monday = mondayIso(), monthKey = todayIso().slice(0, 7);
    var doneKeys = Object.keys(sesiones);
    var weekDone = doneKeys.filter(function (k) { return k >= monday; }).map(function (k) { return sesiones[k]; });
    var monthCount = doneKeys.filter(function (k) { return k.slice(0, 7) === monthKey; }).length;
    var ses = eq[rutKey];
    var nextSes = ses.find(function (s) { return weekDone.indexOf(rutKey + '-' + s.id) < 0; });

    var html = '<div class="card"><h2>Tu plan de fuerza</h2>' +
      '<div class="sub">' + (eq.skills ? 'Calistenia con barra y skills estáticos: básicos, muscle up, front lever, straddle planche y pino. Elige 3 días por semana y ve rotando las sesiones.' : 'Full body, 3 días por semana (por ejemplo lunes, miércoles y viernes). Dos sesiones de torso y una de pierna, y la rutina cambia sola cada mes.') + '</div>' +
      '<div class="seg" style="margin-top:12px">' + Object.keys(RUTINAS).map(function (k) {
        return '<button data-equipo="' + k + '"' + (k === equipo ? ' class="active"' : '') + '>' + RUTINAS[k].nombre + '</button>';
      }).join('') + '</div></div>';

    html += '<div class="card"><div class="hist-head"><h2>' + (eq.skills ? 'Plan de skills (todo el año)' : MONTHS[mIdx].charAt(0).toUpperCase() + MONTHS[mIdx].slice(1) + ': rutina ' + rutKey) + '</h2>' +
      '<span class="pill">' + eq.nombre + '</span></div>' +
      '<div class="fact"><span>Esta semana</span><b>' + weekDone.length + ' de 3 sesiones</b></div>' +
      '<div class="fact"><span>Este mes</span><b>' + monthCount + ' / 12</b></div>' +
      '<div class="prog-track"><div class="prog-fill" style="width:' + Math.min(100, Math.round(monthCount / 12 * 100)) + '%"></div></div></div>';

    ses.forEach(function (s, i) {
      var key = rutKey + '-' + s.id;
      var doneThisWeek = weekDone.indexOf(key) >= 0;
      var isNext = nextSes && nextSes.id === s.id;
      var active = entrenoActivo === key;
      var checked = active ? (window.__exChecks || {}) : {};
      var nChecked = Object.keys(checked).filter(function (k) { return checked[k]; }).length;
      var open = !!sesOpen[key] || active;
      html += '<div class="card"><div class="hist-head ses-head" data-ses-toggle="' + key + '"><h2 class="ex-day">Día ' + (i + 1) + '/' + ses.length + ' · ' + s.nombre + '</h2>' +
        (doneThisWeek ? '<span class="pill done-pill">✓ hecha esta semana</span>' : (isNext ? '<span class="pill orange">Próximo entreno</span>' : '')) +
        '<span class="ses-chevron' + (open ? ' open' : '') + '"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg></span></div>' +
        '<div class="sub">' + s.ej.length + ' ejercicios</div>' +
        (open ? '<div class="ses-body">' : '<div class="ses-body" hidden>') +
        (eq.skills ? '' :
        '<div class="tut-chips"><span class="chip">TUT 2-1</span><span class="chip">RIR 2</span>' +
        '<button class="chip link" data-tut>¿Qué es?</button></div>' +
        (tutOpen ? '<div class="note green" style="margin-top:8px"><b>TUT 2-1:</b> baja el peso en 2 segundos y sube en 1, sin pausas. <b>RIR 2:</b> termina cada serie pudiendo haber hecho unas 2 repeticiones más. Así progresas sin lesionarte.</div>' : '')) +
        (s.nota ? '<div class="note green" style="margin-top:8px">' + s.nota + '</div>' : '') +
        s.ej.map(function (x, j) {
          var row = '<div class="ex-row' + (active && checked[j] ? ' ex-done' : '') + '"' + (active ? ' data-ex-check="' + j + '"' : '') + '>' +
            (active ? '<div class="ex-check">' + (checked[j] ? '✓' : '') + '</div>' : '<div class="ex-num">' + (j + 1) + '</div>') +
            exThumb(x) +
            '<div class="ex-info"><div class="ex-name">' + x.n + '</div>' +
            '<div class="ex-sets">' + x.s + ' · ' + x.g + '</div></div></div>';
          if (x.ss && j > 0 && !s.ej[j - 1].ss) row = row; // isolated ss handled below
          return (x.ss && (j === 0 || !s.ej[j - 1].ss) ? '<div class="ss-label">Superserie: una detrás de otra, descansa al final</div>' : '') + row;
        }).join('');
      if (active) {
        html += '<button class="btn primary" data-complete-session="' + key + '"' + (nChecked < s.ej.length ? ' style="opacity:.55"' : '') + '>Completar sesión (' + nChecked + '/' + s.ej.length + ')</button>' +
          '<button class="btn ghost" data-cancel-session>Cancelar</button>';
      } else if (!doneThisWeek) {
        html += '<button class="btn primary" data-start-session="' + key + '">Empezar entreno</button>';
      }
      html += '</div></div>';
    });

    var history = doneKeys.sort().reverse().slice(0, 10);
    if (history.length) {
      var names = {};
      Object.keys(RUTINAS).forEach(function (m) { ['A', 'B'].forEach(function (rk) { RUTINAS[m][rk].forEach(function (s) { names[rk + '-' + s.id] = s.nombre; }); }); });
      html += '<div class="card"><h2>Registro de sesiones</h2>' + history.map(function (k) {
        return '<div class="rev-row"><b>' + fmtDate(k) + '</b> · ' + (names[sesiones[k]] || 'Sesión') + '</div>';
      }).join('') + '</div>';
    }
    document.getElementById('tab-entreno').innerHTML = html;
  }

  /* ---------- Historial por mes ---------- */
  function renderHistorial() {
    var now = new Date();
    var r = compute(profile);
    var html = '<div class="card"><h2>Historial por mes</h2>' +
      '<div class="sub">Pulsa un mes para ver TODAS sus comidas (clásicas de ese mes + la receta de temporada), con ingredientes en gramos, kcal y proteína, ajustadas al objetivo que tenías entonces.</div></div>';
    for (var i = 0; i < 6; i++) {
      var d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      var m = d.getMonth(), key = d.getFullYear() + '-' + String(m + 1).padStart(2, '0');
      var goal = objetivos[key];
      var days = Object.keys(registro).filter(function (k) { return k.slice(0, 7) === key; });
      var consumed = 0, counted = 0;
      days.forEach(function (k) {
        var slots = registro[k], sum = 0, n = 0;
        ['desayuno', 'comida', 'cena'].forEach(function (s) { if (slots[s]) { sum += slots[s]; n++; } });
        if (n) { consumed += sum; counted++; }
      });
      html += '<div class="card hist-month"><div class="hist-head" data-hm="' + key + '" style="cursor:pointer"><h3>' +
        MONTHS[m].charAt(0).toUpperCase() + MONTHS[m].slice(1) + (i === 0 ? ' <span style="text-transform:none;font-weight:600;color:var(--muted);font-size:.78rem">(este mes)</span>' : '') + '</h3>' +
        (goal ? '<span class="pill">Objetivo: ' + goal + ' kcal/día</span>' : '<span class="pill">Sin objetivo guardado</span>') + '</div>' +
        (counted ? '<div class="muted">Marcadas ' + counted + (counted === 1 ? ' día' : ' días') +
          ' · media de ' + Math.round(consumed / counted) + ' kcal/día registradas' +
          (goal ? ' frente a ' + goal + ' de objetivo' : '') + '.</div>'
               : '<div class="muted">Sin comidas marcadas este mes.</div>') +
        '<div class="hist-detail" hidden>';
      var g = goal || r.target;
      ['desayuno', 'comida', 'cena'].forEach(function (slot) {
        var slotK = Math.round(g * SLOT_SHARE[slot] / 10) * 10;
        html += '<div class="hist-slot-h">' + SLOT_LABEL[slot] + ' · ' + slotK + ' kcal</div>';
        var monthRecipe = RECIPES.find(function (x) { return x.month === m && x.slot === slot; });
        var opts = classicsFor(m, slot).concat(monthRecipe ? [monthRecipe] : []);
        opts.forEach(function (o) {
          var did = key + '-' + o.id;
          html += '<button class="hist-meal" data-hmeal="' + did + '">' + esc(o.name) +
            (o.pasos ? ' <span style="color:#b45309;font-weight:600">· receta del mes</span>' : '') + '</button>' +
            '<div class="hist-meal-detail" id="hmd-' + did + '" hidden>' + ingredientHTML(o, slotK) + '</div>';
        });
      });
      html += '</div><div class="muted" style="margin-top:6px;font-size:.72rem">Toca el mes para abrir o cerrar.</div></div>';
    }
    document.getElementById('tab-historial').innerHTML = html;
  }

  /* ---------- Progreso ---------- */
  function weightChart() {
    if (checkins.length < 2) return '';
    var data = checkins.slice(-12);
    var w = 320, h = 110, pad = 24;
    var vals = data.map(function (c) { return c.peso; });
    var min = Math.min.apply(null, vals) - 1, max = Math.max.apply(null, vals) + 1;
    var pts = data.map(function (c, i) {
      var x = pad + (w - 2 * pad) * (data.length === 1 ? 0 : i / (data.length - 1));
      var y = h - pad - (h - 2 * pad) * ((c.peso - min) / (max - min || 1));
      return [x, y];
    });
    var line = pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ');
    var dots = pts.map(function (p, i) {
      return '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="4" fill="#16a34a"/>' +
        '<text x="' + p[0].toFixed(1) + '" y="' + (p[1] - 9).toFixed(1) + '" font-size="9" font-weight="700" fill="#15803d" text-anchor="middle">' + data[i].peso + '</text>';
    }).join('');
    return '<div class="chart-wrap"><svg viewBox="0 0 ' + w + ' ' + h + '" width="100%">' +
      '<path d="' + line + '" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round"/>' + dots + '</svg></div>';
  }

  function renderProgreso() {
    var r = compute(profile);
    var html = '<div class="card"><h2>Tu progreso</h2><div class="sub">Revisiones quincenales completas y calorías marcadas frente a tu objetivo.</div></div>';

    var fKey = todayIso().slice(0, 7);
    var POSES = [['frontal', 'Frontal'], ['perfil', 'De perfil'], ['espalda', 'De espaldas']];
    function photoBtn(key, pose, label) {
      var url = (fotos[key] || {})[pose];
      return '<button class="photo-slot" data-photo="' + pose + '" data-pmonth="' + key + '">' +
        (url ? '<img src="' + url + '" alt="' + label + '">' : '<span class="photo-empty">+ ' + label + '</span>') + '</button>';
    }
    html += '<div class="card"><h2>Fotos de progreso</h2><div class="sub">Una frontal, una de perfil y una de espaldas cada mes para verte cambiar. Solo se guardan en tu móvil.</div>' +
      '<div class="photo-grid">' + POSES.map(function (pz) { return photoBtn(fKey, pz[0], pz[1]); }).join('') + '</div>';
    var pastMonths = Object.keys(fotos).filter(function (k) { return k !== fKey && fotos[k] && Object.keys(fotos[k]).length; }).sort().reverse();
    pastMonths.forEach(function (k) {
      var lbl = MONTHS[parseInt(k.slice(5, 7), 10) - 1] + ' ' + k.slice(0, 4);
      html += '<div class="photo-month-lbl">' + lbl.charAt(0).toUpperCase() + lbl.slice(1) + '</div>' +
        '<div class="photo-grid">' + POSES.map(function (pz) {
          var url = fotos[k][pz[0]];
          return '<div class="photo-slot ro">' + (url ? '<img src="' + url + '" alt="' + pz[1] + '">' : '<span class="photo-empty">-</span>') + '</div>';
        }).join('') + '</div>';
    });
    html += '</div>';

    html += '<div class="card"><h2>Revisiones</h2>';
    if (!checkins.length) {
      html += '<div class="sub">Aún no hay revisiones. Anota la primera en Perfil.</div>';
    } else {
      html += weightChart();
      html += checkins.slice().reverse().map(function (c, idx) {
        var prev = checkins[checkins.length - 2 - idx];
        var delta = prev ? (c.peso - prev.peso) : null;
        var deltaTxt = delta == null ? '' :
          (delta === 0 ? ' (=)' : ' (' + (delta > 0 ? '+' : '−') + String(Math.abs(delta)).replace('.', ',') + ' kg)');
        var det = '';
        if (c.target) det = '<div class="rev-sub">' + c.target + ' kcal/día · ' + (GOAL_LABEL[c.objetivo] || 'Mantener').toLowerCase() +
          (c.altura ? ' · ' + c.altura + ' cm' : '') + (c.edad ? ' · ' + c.edad + ' años' : '') +
          (c.deporte != null ? ' · deporte ' + c.deporte + ' d/sem' : '') + (c.bmr ? ' · TMB ' + c.bmr : '') + (c.prot ? ' · proteína ' + c.prot + ' g/día' : '') + '</div>';
        return '<div class="rev-row"><div><b>' + fmtDate(c.fecha) + '</b> · ' + c.peso + ' kg' + deltaTxt + '</div>' + det + '</div>';
      }).join('');
    }
    html += '</div>';

    var days = Object.keys(registro).sort().slice(-14);
    html += '<div class="card"><h2>Calorías: objetivo vs real</h2>';
    if (!days.length) {
      html += '<div class="sub">Marca comidas como hechas en la pestaña Hoy y aquí verás la comparación con tu objetivo (' + r.target + ' kcal).</div>';
    } else {
      var maxV = r.target * 1.25;
      html += '<div class="bars">' + days.map(function (k) {
        var slots = registro[k], sum = 0;
        ['desayuno', 'comida', 'cena'].forEach(function (s) { if (slots[s]) sum += slots[s]; });
        var pct = Math.min(100, Math.round(sum / maxV * 100));
        var tpct = Math.round(r.target / maxV * 100);
        var over = sum > r.target * 1.05;
        return '<div class="bar-col"><div class="bar-val">' + (sum || '') + '</div>' +
          '<div class="bar-track"><div class="bar-tline" style="bottom:' + tpct + '%"></div>' +
          '<div class="bar-fill' + (over ? ' over' : '') + '" style="height:' + pct + '%"></div></div>' +
          '<div class="bar-lbl">' + k.slice(8) + '</div></div>';
      }).join('') + '</div><div class="muted mt8">La línea marca tu objetivo (' + r.target + ' kcal). Días: ' + days.length + '.</div>';
    }
    html += '</div>';

    document.getElementById('tab-progreso').innerHTML = html;
  }

  function renderAll() { renderHero(); renderPerfil(); renderHoy(); renderRecetas(); renderHistorial(); renderProgreso(); renderEntreno(); }

  /* ---------- Eventos ---------- */
  function onProfileChange(key, val) {
    val = parseInt(val, 10);
    if (isNaN(val)) return;
    var lim = { peso: [40, 150], altura: [140, 210], edad: [16, 90], deporte: [0, 7] }[key];
    if (lim) val = Math.min(lim[1], Math.max(lim[0], val));
    profile[key] = val;
    save('dieta.perfil.v1', profile);
    renderHero();
    clearTimeout(window.__rt);
    window.__rt = setTimeout(function () { renderPerfil(); renderHoy(); renderRecetas(); renderHistorial(); renderProgreso(); renderEntreno(); }, 400);
  }

  document.addEventListener('input', function (e) {
    var key = e.target.getAttribute && e.target.getAttribute('data-key');
    if (!key) return;
    onProfileChange(key, e.target.value);
    if (e.target.type === 'range') {
      var inp = document.querySelector('.num-input[data-key="' + key + '"]');
      if (inp) inp.value = e.target.value;
    } else {
      var rng = document.querySelector('input[type=range][data-key="' + key + '"]');
      if (rng) rng.value = e.target.value;
    }
  });

  document.addEventListener('click', function (e) {
    var t = e.target;
    var nav = t.closest && t.closest('nav.tabs button');
    if (nav) {
      document.querySelectorAll('nav.tabs button').forEach(function (b) { b.classList.toggle('active', b === nav); });
      document.querySelectorAll('section.tab').forEach(function (s) { s.classList.remove('active'); });
      document.getElementById('tab-' + nav.getAttribute('data-tab')).classList.add('active');
      window.scrollTo(0, 0);
      return;
    }
    var eqBtn = t.closest && t.closest('[data-equipo]');
    if (eqBtn) {
      equipo = eqBtn.getAttribute('data-equipo');
      save('dieta.equipo.v1', equipo);
      renderEntreno();
      return;
    }
    if (t.closest && t.closest('[data-tut]')) { tutOpen = !tutOpen; renderEntreno(); return; }
    var hoyT = t.closest && t.closest('[data-hoy-toggle]');
    if (hoyT) {
      var hs = hoyT.getAttribute('data-hoy-toggle');
      hoyOpen[hs] = !hoyOpen[hs];
      save('dieta.hoyopen.v1', hoyOpen);
      renderHoy();
      return;
    }
    var sesT = t.closest && t.closest('[data-ses-toggle]');
    if (sesT) {
      var sk = sesT.getAttribute('data-ses-toggle');
      sesOpen[sk] = !sesOpen[sk];
      save('dieta.sesopen.v1', sesOpen);
      renderEntreno();
      return;
    }
    var startS = t.closest && t.closest('[data-start-session]');
    if (startS) { entrenoActivo = startS.getAttribute('data-start-session'); window.__exChecks = {}; renderEntreno(); return; }
    var cancelS = t.closest && t.closest('[data-cancel-session]');
    if (cancelS) { entrenoActivo = null; renderEntreno(); return; }
    var exChk = t.closest && t.closest('[data-ex-check]');
    if (exChk) {
      var j = exChk.getAttribute('data-ex-check');
      window.__exChecks[j] = !window.__exChecks[j];
      renderEntreno();
      return;
    }
    var compS = t.closest && t.closest('[data-complete-session]');
    if (compS) {
      sesiones[todayIso()] = compS.getAttribute('data-complete-session');
      save('dieta.sesiones.v1', sesiones);
      entrenoActivo = null;
      renderEntreno();
      return;
    }
    var seg = t.closest && t.closest('.seg button');
    if (seg && seg.parentElement.getAttribute('data-seg')) {
      profile[seg.parentElement.getAttribute('data-seg')] = seg.getAttribute('data-v');
      save('dieta.perfil.v1', profile);
      renderAll();
      return;
    }
    var card = t.closest && t.closest('.meal-card');
    if (card) {
      picks[card.getAttribute('data-slot')] = card.getAttribute('data-id');
      save('dieta.picks.v1', picks);
      renderHoy();
      return;
    }
    var doneBtn = t.closest && t.closest('[data-done]');
    if (doneBtn) {
      var slot = doneBtn.getAttribute('data-done');
      var tIso = todayIso();
      var dayLog = registro[tIso] || {};
      if (dayLog[slot]) { delete dayLog[slot]; }
      else {
        var rr = compute(profile);
        dayLog[slot] = slotTarget(rr, slot);
      }
      registro[tIso] = dayLog;
      save('dieta.registro.v1', registro);
      renderHoy(); renderHistorial(); renderProgreso();
      return;
    }
    var use = t.closest && t.closest('[data-use]');
    if (use) {
      picks[use.getAttribute('data-slot')] = use.getAttribute('data-use');
      save('dieta.picks.v1', picks);
      renderHoy(); renderRecetas();
      return;
    }
    var hm = t.closest && t.closest('[data-hm]');
    if (hm) {
      var card0 = hm.parentElement, det0 = card0.querySelector('.hist-detail');
      if (det0) det0.hidden = !det0.hidden;
      return;
    }
    var hmeal = t.closest && t.closest('[data-hmeal]');
    if (hmeal) {
      var dd = document.getElementById('hmd-' + hmeal.getAttribute('data-hmeal'));
      if (dd) dd.hidden = !dd.hidden;
      return;
    }
    var photoBtn2 = t.closest && t.closest('[data-photo]');
    if (photoBtn2) {
      pendingPhoto = photoBtn2.getAttribute('data-photo');
      document.getElementById('photoInput').click();
      return;
    }
    if (t.id === 'mPrev') { month = (month + 11) % 12; renderRecetas(); renderHoy(); return; }
    if (t.id === 'mNext') { month = (month + 1) % 12; renderRecetas(); renderHoy(); return; }
    if (t.id === 'btnCheckin') {
      var iso = todayIso();
      var rr2 = compute(profile);
      checkins = checkins.filter(function (c) { return c.fecha !== iso; });
      checkins.push({ fecha: iso, peso: profile.peso, altura: profile.altura, edad: profile.edad,
        deporte: profile.deporte, objetivo: profile.objetivo, sexo: profile.sexo,
        target: rr2.target, bmr: rr2.bmr, tdee: rr2.tdee, prot: proteinGoal(profile) });
      save('dieta.revisiones.v1', checkins);
      renderPerfil(); renderProgreso();
      return;
    }
    if (t.id === 'btnUndoCheckin') { checkins.pop(); save('dieta.revisiones.v1', checkins); renderPerfil(); renderProgreso(); return; }
  });

  document.getElementById('photoInput').addEventListener('change', function (e) {
    var f = e.target.files && e.target.files[0];
    if (!f || !pendingPhoto) { e.target.value = ''; return; }
    var rd = new FileReader();
    rd.onload = function () {
      var img = new Image();
      img.onload = function () {
        var sc = Math.min(1, 640 / Math.max(img.width, img.height));
        var cv = document.createElement('canvas');
        cv.width = Math.max(1, Math.round(img.width * sc));
        cv.height = Math.max(1, Math.round(img.height * sc));
        cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
        var url = cv.toDataURL('image/jpeg', 0.62);
        var key = todayIso().slice(0, 7);
        if (!fotos[key]) fotos[key] = {};
        fotos[key][pendingPhoto] = url;
        var tries = 0;
        while (tries++ < 8) {
          try { localStorage.setItem('dieta.fotos.v1', JSON.stringify(fotos)); break; }
          catch (err) {
            var ks = Object.keys(fotos).sort();
            if (ks.length <= 1) { delete fotos[key][pendingPhoto]; break; }
            delete fotos[ks[0]];
          }
        }
        renderProgreso();
      };
      img.src = rd.result;
    };
    rd.readAsDataURL(f);
    e.target.value = '';
  });

  var initial = (location.hash || '').replace('#', '');
  if (['perfil', 'hoy', 'recetas', 'historial', 'progreso', 'entreno'].indexOf(initial) >= 0) {
    document.querySelectorAll('nav.tabs button').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-tab') === initial); });
    document.querySelectorAll('section.tab').forEach(function (s) { s.classList.remove('active'); });
    document.getElementById('tab-' + initial).classList.add('active');
  }
  renderAll();
})();
