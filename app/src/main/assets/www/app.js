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
  var PHOTO_IDS = { 'd1':1, 'd3':1, 'c2':1, 'd5':1, 'd8':1, 'n7':1, 'n13':1, 'n14':1, 'n16':1, 'r-feb-n':1, 'r-mar-n':1, 'r-may-n':1, 'r-jul-n':1, 'r-oct-c':1, 'r-nov-n':1, 'r-dic-d':1, 'r-dic-c':1,  'c1':1, 'c10':1, 'c3':1, 'c4':1, 'c5':1, 'c6':1, 'c7':1, 'c8':1, 'c9':1, 'd2':1, 'd4':1, 'n1':1, 'n10':1, 'n2':1, 'n3':1, 'n4':1, 'n5':1, 'r-abr-c':1, 'r-abr-d':1, 'r-abr-n':1, 'r-ago-n':1, 'r-dic-n':1, 'r-ene-c':1, 'r-ene-d':1, 'r-feb-c':1, 'r-jul-d':1, 'r-jun-c':1, 'r-mar-c':1, 'r-may-c':1, 'r-may-d':1, 'r-nov-c':1, 'r-oct-d':1, 'r-oct-n':1, 'r-sep-c':1, 'r-sep-n':1, 'd6':1, 'd7':1, 'n6':1, 'r-jun-d':1, 'r-jun-n':1, 'r-sep-d':1, 'n8':1, 'n9':1, 'n11':1, 'n12':1, 'n15':1, 'r-ago-c':1, 'r-ago-d':1, 'r-ene-n':1, 'r-feb-d':1, 'r-jul-c':1, 'r-mar-d':1, 'r-nov-d':1, };
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
    var n = Math.round(grams / ing.ug);
    if (n < 1) n = 1;
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
  var calisNivel = load('dieta.calisnivel.v1', 1);
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
  function regKcal(v) { return (v && typeof v === 'object') ? v.kcal : v; }
  function quickTag(o) {
    var tp = (o.tiempo || '').split(' · ');
    return 'Rápida · ' + (tp[0] === '0 min' ? (tp[1] || 'exprés') : tp[0]);
  }
  function todayIso() { return new Date().toISOString().slice(0, 10); }
  function fmtDate(iso) { return iso.slice(5).split('-').reverse().join('/'); }

  /* Ingredientes: nombre + medida casera | gramos + kcal (valores USDA) */
  function ingredientHTML(option, targetKcal, dayTarget, protOverride) {
    var protSlot = protOverride || Math.round(proteinGoal(profile) * targetKcal / (dayTarget || 1));
    var plan = computePlan(option, targetKcal, protSlot);
    var rows = plan.items.map(function (it) {
      var g = it.grams;
      var kcal = Math.round(ING[it.name].k * g / 100);
      var prot = Math.round(ING[it.name].p * g / 100);
      return '<div class="ing-row"><div><div class="ing-name">' + esc(it.name) + '</div>' +
        '<div class="ing-sub">' + household(it.name, g) + '</div></div>' +
        '<div class="ing-right"><b>' + g + ' g</b><span>' + kcal + ' kcal · ' + prot + ' g prot</span></div></div>';
    }).join('');
    return '<div class="ing">' + rows +
      '<div class="cap">Cantidades calculadas para tu objetivo actual: este plato suma ~' + plan.kcal +
      ' kcal y ~' + plan.protein + ' g de proteína. Las piezas van enteras.' +
      (Math.abs(plan.dk) > 60 || Math.abs(plan.dp) > 10
        ? ' <b>Aviso:</b> no hay combinación de cantidades razonables que acerque más este plato a tu objetivo: queda a ' + (plan.dk > 0 ? '+' : '') + plan.dk + ' kcal y ' + (plan.dp > 0 ? '+' : '') + plan.dp + ' g de proteína de lo ideal.'
        : '') +
      ' Pesos en crudo salvo que ponga «cocido»: el arroz y las legumbres secas casi triplican su volumen al cocerse. Valores de composición del USDA.</div></div>';
  }

  function optionProtein(option, targetKcal, dayTarget) {
    var protSlot = Math.round(proteinGoal(profile) * targetKcal / (dayTarget || 1));
    return computePlan(option, targetKcal, protSlot).protein;
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
        SLOT_LABEL[s] + '</span><b>' + slotTarget(r, s) + ' kcal · ' + Math.round(proteinGoal(profile) * PSHARE[profile.objetivo][s]) + ' g prot</b></div>';
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
      var byIds = Object.keys(cr).filter(function (k) { return /CC BY/.test(cr[k].license) || cr[k].generated_ai; });
      if (Object.keys(cr).length) {
        html += '<div class="card"><h2>Créditos de fotos</h2>' +
          '<div class="sub">Fotos de platos y ejercicios de Wikimedia Commons y Unsplash con licencia libre (CC0 / dominio público / CC BY / CC BY-SA / Unsplash License) y fotos generadas por IA. Cada foto con atribución obligatoria lleva su autor y licencia:</div>' +
          byIds.map(function (k) {
            var c = cr[k];
            return '<div class="rev-row" style="font-size:.72rem"><b>' + esc(c.title || k) + '</b> - ' + esc(c.artist || 'desconocido') +
              (c.url ? ' · <a href="' + c.url + '" target="_blank" rel="noopener">Fuente: ' + esc(c.license) + '</a>' : ' · ' + esc(c.license)) +
              (c.license_url ? ' · <a href="' + c.license_url + '" target="_blank" rel="noopener">Licencia</a>' : '') +
              (c.changes ? '<br>' + esc(c.changes) : '') + '</div>';
          }).join('') + '</div>';
      }
    } catch (e) {}
    var creditsHtml = html;
    html = '';
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
    html += '<div class="note green"><b>Proteína para tu objetivo</b> (' + GOAL_LABEL[profile.objetivo].toLowerCase() + ', a tu peso actual de ' + profile.peso + ' kg): ' +
      String(pkg).replace('.', ',') + ' g/kg → <b>' + pg + ' g al día</b>' +
      (profile.objetivo === 'perder' ? ', para proteger el músculo mientras bajas' : '') +
      '. Rangos habituales de nutrición deportiva, orientativos.</div>';

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
    html += '</div>';

    html += '<div class="card"><h2>Revisión quincenal</h2><div class="sub">Cada revisión guarda TODO: peso, altura, edad, deporte, objetivo y tus calorías calculadas. El historial está en Progreso.</div>' +
      '<button class="btn primary" id="btnCheckin">' +
      (last && last.fecha === tIso ? 'Actualizar revisión de hoy (' + profile.peso + ' kg)' : 'Anotar revisión de hoy (' + profile.peso + ' kg)') + '</button>' +
      (last ? '<div class="muted mt8">Última revisión: ' + fmtDate(last.fecha) + ' con ' + last.peso + ' kg' +
        (nextIn != null ? (nextIn === 0 ? ' · ya toca la siguiente' : ' · la siguiente en unos ' + nextIn + ' días') : '') + '.</div>' : '') +
      (checkins.length ? '<button class="btn ghost" id="btnUndoCheckin">Borrar la última revisión</button>' : '') + '</div>';

    document.getElementById('tab-perfil').innerHTML = html + creditsHtml;
  }

  /* ---------- Hoy ---------- */
  function renderHoy() {
    var r = compute(profile);
    var tIso = todayIso();
    var dayLog = registro[tIso] || {};
    var html = '<div class="card"><h2>Tu dieta de hoy</h2>' +
      '<div class="sub">Elige una opción en cada comida. Las cantidades se ajustan solas para sumar tu objetivo de ' + r.target + ' kcal.</div></div>';

    /* Plan del día con compensación: la comida absorbe la mitad del desvío del desayuno
       y la cena absorbe el resto, para que el DÍA completo quede cerca del objetivo
       con cualquier combinación de platos. */
    var pgoal = proteinGoal(profile);
    var psh = PSHARE[profile.objetivo] || PSHARE.mantener;
    // Validar picks ANTES de precomputar planes: un pick obsoleto (otro mes)
    // dibujaba la ficha de un plato y el detalle de otro.
    ['desayuno', 'comida', 'cena'].forEach(function (slot) {
      var opts0 = classicsFor(month, slot);
      var mr0 = RECIPES.find(function (x) { return x.month === month && x.slot === slot; });
      if (mr0) opts0 = opts0.concat([mr0]);
      if (!opts0.some(function (o) { return o.id === picks[slot]; })) picks[slot] = opts0[0].id;
    });
    // Cada plato se resuelve contra el objetivo de su franja (sin compensacion
    // entre comidas): el solver garantiza las cantidades por plato.
    var dayPlans = {};
    ['desayuno', 'comida', 'cena'].forEach(function (slot) {
      var o0 = findOption(picks[slot]);
      if (!o0) return;
      var sk = slotTarget(r, slot);
      var sp = Math.round(pgoal * psh[slot]);
      var pl = computePlan(o0, sk, sp);
      dayPlans[slot] = { kcal: sk, prot: sp, plan: pl };
    });
    window.__dayPlans = dayPlans;

    ['desayuno', 'comida', 'cena'].forEach(function (slot) {
      var target = slotTarget(r, slot);
      var monthRecipe = RECIPES.find(function (x) { return x.month === month && x.slot === slot; });
      var options = classicsFor(month, slot);
      if (monthRecipe) options = options.concat([monthRecipe]);
      if (!options.some(function (o) { return o.id === picks[slot]; })) picks[slot] = options[0].id;
      var selected = findOption(picks[slot]) || options[0];
      var done = !!dayLog[slot];

      var hOpen = !!hoyOpen[slot];
      html += '<div class="slot-head" data-hoy-toggle="' + slot + '">' + ICONS[SLOT_ICON[slot]] + '<h3>' + SLOT_LABEL[slot] + '</h3>' +
        '<span class="kcal">' + target + ' kcal · ' + Math.round(pgoal * psh[slot]) + ' g prot</span>' +
        '<span class="ses-chevron' + (hOpen ? ' open' : '') + '"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg></span></div>';
      html += hOpen ? '<div>' : '<div hidden>';
      html += '<div class="meal-grid">' + options.map(function (o) {
        var ph = photoFor(o);
        var isRecipe = o.recipeOfMonth || (monthRecipe && monthRecipe.id === o.id) || o.pasos;
        return '<button class="meal-card' + (o.id === selected.id ? ' selected' : '') + '" data-slot="' + slot + '" data-id="' + o.id + '">' +
          '<span class="check">✓</span>' +
          (ph ? '<img src="' + ph + '" alt="' + esc(o.name) + '" loading="lazy">'
              : '<div class="svg-cover photo-pending">' + ICONS[SLOT_ICON[o.slot]] + '<small>Foto pendiente</small></div>') +
          '<div class="m-body"><div class="m-name">' + esc(o.name) + '</div>' +
          (isRecipe ? '<div class="m-tag recipe-of">Receta de ' + MONTHS[month] + '</div>' :
            (o.rapida ? '<div class="m-tag quick">' + quickTag(o) + '</div>' : '<div class="m-tag">Clásico</div>')) +
          '</div></button>';
      }).join('') + '</div>';
      var dp = window.__dayPlans && window.__dayPlans[slot];
      html += (dp && dp.plan ? (function () {
        var plan = dp.plan;
        var rows = plan.items.map(function (it) {
          var g = it.grams;
          var kcal = Math.round(ING[it.name].k * g / 100);
          var prot = Math.round(ING[it.name].p * g / 100);
          return '<div class="ing-row"><div><div class="ing-name">' + esc(it.name) + '</div>' +
            '<div class="ing-sub">' + household(it.name, g) + '</div></div>' +
            '<div class="ing-right"><b>' + g + ' g</b><span>' + kcal + ' kcal · ' + prot + ' g prot</span></div></div>';
        }).join('');
        return '<div class="ing">' + rows +
          '<div class="cap">Cantidades calculadas para tu objetivo actual: este plato suma ~' + plan.kcal +
          ' kcal y ~' + plan.protein + ' g de proteína. Las piezas van enteras.' +
          (Math.abs(plan.dk) > 60 || Math.abs(plan.dp) > 10
            ? ' <b>Aviso:</b> no hay combinación de cantidades razonables que acerque más este plato a tu objetivo: queda a ' + (plan.dk > 0 ? '+' : '') + plan.dk + ' kcal y ' + (plan.dp > 0 ? '+' : '') + plan.dp + ' g de proteína de lo ideal.'
            : '') +
          ' Pesos en crudo salvo que ponga «cocido»: el arroz y las legumbres secas casi triplican su volumen al cocerse. Valores de composición del USDA.</div></div>';
      })() : ingredientHTML(selected, target, r.target));
      html += '<button class="btn ' + (done ? 'done' : 'soft') + '" data-done="' + slot + '">' +
        (done ? '✓ ' + SLOT_LABEL[slot] + ' hecha (' + regKcal(dayLog[slot]) + ' kcal)' : 'Marcar ' + SLOT_LABEL[slot].toLowerCase() + ' como hecha') + '</button>';
      html += '</div>';
    });

    var dayPlans2 = window.__dayPlans || {};
    var dayProt = ['desayuno', 'comida', 'cena'].reduce(function (acc, s) {
      return acc + (dayPlans2[s] ? dayPlans2[s].plan.protein : 0);
    }, 0);
    var dayKcal = ['desayuno', 'comida', 'cena'].reduce(function (acc, s) {
      return acc + (dayPlans2[s] ? dayPlans2[s].plan.kcal : 0);
    }, 0);
    var protGoal = proteinGoal(profile);
    var offNotes = ['desayuno', 'comida', 'cena'].map(function (s) {
      var d = dayPlans2[s];
      if (!d || !d.plan) return null;
      if (Math.abs(d.plan.dk) <= 60 && Math.abs(d.plan.dp) <= 10) return null;
      var o = findOption(picks[s]);
      return (o ? o.name : s) + ' queda a ' + (d.plan.dk > 0 ? '+' : '') + d.plan.dk + ' kcal (' + (d.plan.dp > 0 ? '+' : '') + d.plan.dp + ' g prot) de lo ideal';
    }).filter(Boolean);
    html += '<div class="card mt12"><div class="fact"><span>Objetivo del día</span><b>' + r.target + ' kcal · ' + protGoal + ' g proteína</b></div>' +
      '<div class="fact"><span>Menú elegido</span><b>~' + dayKcal + ' kcal · ~' + dayProt + ' g</b></div>' +
      '<div class="fact"><span>Desayuno / Comida / Cena</span><b>' + slotTarget(r, 'desayuno') + ' / ' + slotTarget(r, 'comida') + ' / ' + slotTarget(r, 'cena') + ' kcal · ' +
      Math.round(pgoal * psh.desayuno) + ' / ' + Math.round(pgoal * psh.comida) + ' / ' + Math.round(pgoal * psh.cena) + ' g prot</b></div>' +
      (dayProt >= protGoal * 0.9
        ? '<div class="note green">Proteína cubierta con estas elecciones.</div>'
        : '<div class="note">Con estas elecciones llegas a ~' + dayProt + ' g de proteína, por debajo de tu objetivo de ' + protGoal + ' g. Elige opciones con huevo, pavo, pollo, pescado o legumbres para subirla.</div>') +
      (offNotes.length
        ? '<div class="note">Ajuste aproximado: ' + offNotes.join('; ') + '. No existen cantidades razonables que lo acerquen más a tu objetivo, y el resto del día no se retoca para compensar.</div>'
        : '') +
      '<div class="muted mt8">Las cantidades de cada plato se calculan para tu objetivo actual, de modo que el día queda cerca del objetivo con cualquier combinación. Si cambias tu peso u objetivo en Perfil, todo se recalcula solo. Las cantidades son en peso crudo salvo que ponga «cocido».</div></div>';

    document.getElementById('tab-hoy').innerHTML = html;
  }

  /* ---------- Recetas e historial (vista unificada por mes) ---------- */
  var viewY = new Date().getFullYear(), viewM = new Date().getMonth();
  function normName(s2) { return String(s2).toLowerCase().replace(/\s+/g, ' ').trim(); }
  function baseHTML(option) {
    var rows = option.components.map(function (c) {
      var kcal = Math.round(ING[c.name].k * c.grams / 100);
      var prot = Math.round(ING[c.name].p * c.grams / 100);
      return '<div class="ing-row"><div><div class="ing-name">' + esc(c.name) + '</div>' +
        '<div class="ing-sub">' + household(c.name, c.grams) + '</div></div>' +
        '<div class="ing-right"><b>' + c.grams + ' g</b><span>' + kcal + ' kcal · ' + prot + ' g prot</span></div></div>';
    }).join('');
    var tk = 0, tp = 0;
    option.components.forEach(function (c) { tk += ING[c.name].k * c.grams / 100; tp += ING[c.name].p * c.grams / 100; });
    return '<div class="ing">' + rows +
      '<div class="cap">Cantidades base de la dieta (~' + Math.round(tk) +
      ' kcal · ~' + Math.round(tp) + ' g de proteína), sin ajuste a objetivo.</div></div>';
  }
  function renderRecetas() {
    var r = compute(profile);
    var nowD = new Date();
    var curKey = nowD.getFullYear() + '-' + String(nowD.getMonth() + 1).padStart(2, '0');
    var key = viewY + '-' + String(viewM + 1).padStart(2, '0');
    var isCurrent = key === curKey, isPast = key < curKey;
    var savedGoal = objetivos[key];
    var g = isPast ? 0 : r.target;
    var recipes = RECIPES.filter(function (x) { return x.month === viewM; });
    var mLabel = MONTHS[viewM].charAt(0).toUpperCase() + MONTHS[viewM].slice(1);
    var html = '<div class="card"><h2>Recetas y comidas del mes</h2>' +
      '<div class="sub">Tres recetas nuevas cada mes para sustituir cualquier plato de tu dieta, junto a las comidas clásicas de ese mes. El mes actual y los futuros usan tu objetivo de ahora; los pasados muestran solo lo registrado entonces.</div></div>';
    html += '<div class="month-nav"><button id="mPrev">← Anterior</button><h2>' + mLabel + ' ' + viewY + '</h2><button id="mNext">Siguiente →</button></div>';

    if (isCurrent) {
      html += '<div class="card"><div class="fact"><span>Este mes</span><b>Objetivo actual: ' + r.target + ' kcal/día · ' + proteinGoal(profile) + ' g proteína</b></div></div>';
    } else if (!isPast) {
      html += '<div class="card"><div class="fact"><span>Mes futuro</span><b>Cantidades con tu objetivo actual: ' + r.target + ' kcal/día</b></div>' +
        '<div class="muted">Varían si tu perfil cambia: se recalculan solas.</div></div>';
    } else {
      /* Mes pasado: solo hechos registrados entonces. Nada de recalcular la dieta de hoy con un objetivo viejo. */
      html += '<div class="card"><h2>Lo registrado en ' + mLabel + '</h2>';
      html += savedGoal
        ? '<div class="fact"><span>Objetivo que tenías guardado</span><b>' + savedGoal + ' kcal/día</b></div>'
        : '<div class="fact"><span>Objetivo</span><b>Sin objetivo guardado</b></div>';
      var days = Object.keys(registro).filter(function (k) { return k.slice(0, 7) === key; });
      var consumed = 0, counted = 0;
      days.forEach(function (k) {
        var slots = registro[k], sum = 0, n = 0;
        ['desayuno', 'comida', 'cena'].forEach(function (sl) { if (slots[sl]) { sum += regKcal(slots[sl]); n++; } });
        if (n) { consumed += sum; counted++; }
      });
      if (counted) {
        html += '<div class="fact"><span>Comidas marcadas</span><b>' + counted + (counted === 1 ? ' día' : ' días') + ' · media de ' + Math.round(consumed / counted) + ' kcal/día</b></div>';
        days.sort().reverse().forEach(function (k) {
          var slots = registro[k];
          var rows = '';
          ['desayuno', 'comida', 'cena'].forEach(function (sl) {
            var v = slots[sl];
            if (!v) return;
            if (typeof v === 'object') {
              rows += '<div class="ing-row"><div><div class="ing-name">' + esc(v.name) + '</div>' +
                '<div class="ing-sub">' + v.items.map(function (it) { return it.g + ' g ' + it.n; }).join(' · ') + '</div></div>' +
                '<div class="ing-right"><b>' + v.kcal + ' kcal</b><span>' + v.prot + ' g prot</span></div></div>';
            } else {
              rows += '<div class="ing-row"><div><div class="ing-name">' + SLOT_LABEL[sl] + ' marcada</div>' +
                '<div class="ing-sub">Registro antiguo: solo se guardaron las kcal, sin ingredientes</div></div>' +
                '<div class="ing-right"><b>' + v + ' kcal</b></div></div>';
            }
          });
          if (rows) html += '<div class="hist-slot-h">' + fmtDate(k) + '</div><div class="ing">' + rows + '</div>';
        });
      } else {
        html += '<div class="muted">Sin comidas marcadas en este mes.</div>';
      }
      if (!savedGoal && !counted) html += '<div class="muted">No hay registro de este mes: solo se muestra el catálogo base debajo.</div>';
      html += '</div>';
    }

    if (isPast && recipes.length) html += '<div class="hist-slot-h" style="margin:10px 4px 8px">Recetas de ' + MONTHS[viewM] + ' · catálogo base de referencia, no es lo que comiste</div>';
    recipes.forEach(function (rec) {
      var inUse = picks[rec.slot] === rec.id;
      var ph = photoFor(rec);
      html += '<div class="recipe-card">' +
        (ph ? '<img src="' + ph + '" alt="' + esc(rec.name) + '" loading="lazy">'
            : '<div class="emoji-cover photo-pending">' + ICONS[SLOT_ICON[rec.slot]] + '<small>Foto pendiente</small></div>') +
        '<div class="r-body"><span class="pill orange">Receta de ' + MONTHS[viewM] + ' · sustituye a: ' + SLOT_LABEL[rec.slot].toLowerCase() + '</span>' +
        '<h3 class="mt8">' + esc(rec.name) + '</h3>' +
        (g ? ingredientHTML(rec, Math.round(g * SLOT_SHARE[rec.slot] / 10) * 10, g) : baseHTML(rec)) +
        '<ol class="steps">' + rec.pasos.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ol>' +
        (isCurrent ? (inUse ? '<div class="inuse">✓ Ya está en tu dieta de hoy</div>'
               : '<button class="btn primary small" data-use="' + rec.id + '" data-slot="' + rec.slot + '">Usarla hoy como ' + SLOT_LABEL[rec.slot].toLowerCase() + '</button>') : '') +
        '</div></div>';
    });

    html += '<div class="card"><h2>' + (isPast ? 'Catálogo de ' + mLabel + ' (referencia)' : 'Comidas clásicas de ' + mLabel) + '</h2>' +
      (isPast ? '<div class="sub">Cantidades base de la dieta, sin ajuste: es el catálogo de ese mes, no un registro de lo que comiste.</div>' : '');
    ['desayuno', 'comida', 'cena'].forEach(function (slot) {
      var slotK = g ? Math.round(g * SLOT_SHARE[slot] / 10) * 10 : 0;
      html += '<div class="hist-slot-h">' + SLOT_LABEL[slot] + (slotK ? ' · ' + slotK + ' kcal' : '') + '</div>';
      var opts = classicsFor(viewM, slot).filter(function (o) {
        return !recipes.some(function (rr) { return rr.slot === slot && normName(rr.name) === normName(o.name); });
      });
      opts.forEach(function (o) {
        var did = key + '-' + o.id;
        html += '<button class="hist-meal" data-hmeal="' + did + '">' + esc(o.name) + '</button>' +
          '<div class="hist-meal-detail" id="hmd-' + did + '" hidden>' +
          (g ? ingredientHTML(o, slotK, g) : baseHTML(o)) + '</div>';
      });
    });
    html += '</div>';
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
        { n: 'Press inclinado con goma', s: '4 x 12', g: 'Pecho', p: 'press', img: null },
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
        { n: 'Jalón agarre estrecho en polea', s: '4 x 12', g: 'Espalda', p: 'row', img: 'manc-jalon-estrecho' },
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
        { id: 'b1', nombre: 'Básicos de barra (empieza aquí)', nota: 'Sin nivel previo: no hace falta ni una dominada. Elige UNA variante por bloque: la que te salga limpia y cómoda. Las variantes de un mismo bloque no se hacen seguidas. Cuando las dominadas, las flexiones y los fondos te salgan con técnica limpia, puedes empezar a probar las skills poco a poco.', ej: [
          { n: 'Flexiones de rodillas', s: '3 x 8-12', b: 1, lvl: 1, g: 'Pecho', p: 'pushup', img: "cal-flexiones-rodillas" },
          { n: 'Flexiones', s: '3 x 8-12', b: 1, lvl: 2, g: 'Pecho', p: 'pushup', img: "cal-flexiones" },
          { n: 'Flexiones diamante o declinadas', s: '3 x 8-10', b: 1, lvl: 3, g: 'Pecho', p: 'pushup', img: "cal-flexiones-diamante" },
          { n: 'Remo invertido en mesa o barra baja', s: '4 x 8', b: 2, lvl: 1, g: 'Espalda', p: 'row', img: 'cal-remo-barra-real' },
          { n: 'Remo invertido con pies elevados', s: '4 x 8', b: 2, lvl: 2, g: 'Espalda', p: 'row', img: "cal-remo-elevado" },
          { n: 'Australianas 3 posiciones', s: '3 x 10 s por posición', b: 2, lvl: 3, g: 'Espalda', p: 'row', img: 'cal-australianas-3pos-ia' },
          { n: 'Sentadilla al aire', s: '3 x 15', b: 3, lvl: 1, g: 'Pierna', p: 'squat', img: "cal-sentadilla" },
          { n: 'Sentadilla profunda con pausa abajo', s: '3 x 12', b: 3, lvl: 2, g: 'Pierna', p: 'squat', img: "cal-sentadilla" },
          { n: 'Zancadas', s: '3 x 10 por pierna', b: 3, lvl: 3, g: 'Pierna', p: 'squat', img: "cal-zancadas" },
          { n: 'Plancha', s: '3 x 20-30 s', b: 4, lvl: 1, g: 'Core', p: 'plank', img: "core-plancha" },
          { n: 'Plancha con toques de hombro', s: '3 x 20', b: 4, lvl: 2, g: 'Core', p: 'plank', img: "core-plancha-toques" },
          { n: 'Hollow body hold', s: '3 x 15 s', b: 4, lvl: 3, g: 'Core', p: 'plank', img: "skill-hollow" },
          { n: 'Negativas de dominada (baja en 3-4 s)', s: '4 x 4', b: 5, lvl: 1, g: 'Espalda', p: 'pullup', img: 'cal-negativa-secuencia' },
          { n: 'Dominadas', s: '4 x 4-6', b: 5, lvl: 2, g: 'Espalda', p: 'pullup', img: "skill-dominadas" },
          { n: 'Dominadas arqueras o con lastre', s: '4 x 3-5', b: 5, lvl: 3, g: 'Espalda', p: 'pullup', img: "skill-dominada-lastre" },
          { n: 'Fondos asistidos (banco o goma)', s: '3 x 8', b: 6, lvl: 1, g: 'Pecho · Tríceps', p: 'dip', img: "cal-fondos-asistidos" },
          { n: 'Fondos en paralelas', s: '3 x 8-12', b: 6, lvl: 2, g: 'Pecho · Tríceps', p: 'dip', img: "skill-fondos" },
          { n: 'Fondos con pausa abajo', s: '3 x 6-8', b: 6, lvl: 3, g: 'Pecho · Tríceps', p: 'dip', img: "skill-fondos" } ] },
        { id: 'b2', nombre: 'Meta: Muscle up', nota: 'El muscle up es la META, no el punto de partida: empieza cuando las dominadas estrictas te resulten cómodas. Sesión completa por bloques: elige UNA variante por bloque (la que te salga limpia) y haz sus series. Las variantes de un bloque no se encadenan.', ej: [
          { n: 'Muscle up en barra baja', s: '3 x 5-8', b: 1, lvl: 1, g: 'Técnica', p: 'pullup', img: null },
          { n: 'Muscle up con goma', s: '3 x 2-4', b: 1, lvl: 2, g: 'Técnica', p: 'pullup', img: null },
          { n: 'Muscle up con parada abajo', s: '3 x 2-3', b: 1, lvl: 3, g: 'Técnica', p: 'pullup', img: null },
          { n: 'Dominadas', s: '3 x 4-8', b: 2, lvl: 1, g: 'Tirón', p: 'pullup', img: "skill-dominadas" },
          { n: 'Dominadas rápidas subiendo, bajada lenta', s: '3 x 4-6', b: 2, lvl: 2, g: 'Tirón', p: 'pullup', img: 'cal-dominadas-tempo-secuencia' },
          { n: 'Dominada explosiva al pecho', s: '4 x 3-4', b: 2, lvl: 3, g: 'Tirón', p: 'pullup', img: 'cal-dominada-pecho-real' },
          { n: 'Australianas cerradas', s: '3 x 6-12', b: 3, lvl: 1, g: 'Espalda', p: 'row', img: "cal-remo-cerrado" },
          { n: 'Australianas mixtas', s: '3 x 6-12', b: 3, lvl: 2, g: 'Espalda', p: 'row', img: null },
          { n: 'Dominadas comando', s: '3 x 4-8', b: 3, lvl: 3, g: 'Espalda', p: 'pullup', img: null },
          { n: 'Transición con pies apoyados', s: '3 x 4-6', b: 4, lvl: 1, g: 'Técnica', p: 'pullup', img: null },
          { n: 'Transición con goma', s: '3 x 4-5', b: 4, lvl: 2, g: 'Técnica', p: 'pullup', img: null },
          { n: 'Muscle up negativo (bajada lenta)', s: '3 x 3', b: 4, lvl: 3, g: 'Técnica', p: 'pullup', img: null },
          { n: 'Flexiones con parada abajo 2-3 s', s: '3 x 6-10', b: 5, lvl: 1, g: 'Empuje', p: 'pushup', img: "cal-flexiones" },
          { n: 'Fondos en paralelas', s: '3 x 8-12', b: 5, lvl: 2, g: 'Empuje', p: 'dip', img: "skill-fondos" },
          { n: 'Fondos en barra recta', s: '3 x 5-8', b: 5, lvl: 3, g: 'Empuje', p: 'dip', img: "skill-fondos-barra" },
          { n: 'Dominada alta con balanceo controlado', s: '3 x 4', b: 6, lvl: 1, g: 'Skill', p: 'pullup', img: null },
          { n: 'Balanceo kipping controlado', s: '3 x 6', b: 6, lvl: 2, g: 'Skill', p: 'pullup', img: "skill-kipping" },
          { n: 'Muscle up (intentos)', s: '5 intentos', b: 6, lvl: 3, g: 'Skill', p: 'pullup', img: "skill-muscleup-real" } ] },
        { id: 'b3', nombre: 'Meta: Front lever', nota: 'El front lever es la META: empieza con soltura en dominadas. Sesión completa por bloques: elige UNA variante por bloque. El trabajo de brazo recto carga tendones más que músculos y los tendones adaptan lento: quédate siempre a 1-2 segundos o reps de tu máximo, y sube de variante solo cuando la actual salga limpia.', ej: [
          { n: 'Colgado de barra con escápulas activas', s: '4 x 8-10 s', b: 1, lvl: 1, g: 'Base', p: 'pullup', img: "skill-colgado-activo" },
          { n: 'Colgado en arco (arch hang)', s: '3 x 10-15 s', b: 1, lvl: 2, g: 'Base', p: 'pullup', img: null },
          { n: 'Retracciones escapulares en barra', s: '3 x 6-8', b: 1, lvl: 3, g: 'Base', p: 'pullup', img: null },
          { n: 'Tuck front lever (rodillas al pecho)', s: '4 x 8-10 s', b: 2, lvl: 1, g: 'Estático', p: 'pullup', img: 'cal-tuck-frontlever-ia' },
          { n: 'Advanced tuck (espalda plana)', s: '3 x 8-15 s', b: 2, lvl: 2, g: 'Estático', p: 'pullup', img: null },
          { n: 'Front lever a una pierna', s: '3 x 5-10 s', b: 2, lvl: 3, g: 'Estático', p: 'pullup', img: null },
          { n: 'Subidas a tuck front lever', s: '3 x 3-4', b: 3, lvl: 1, g: 'Fuerza', p: 'pullup', img: null },
          { n: 'Subidas a advanced tuck', s: '3 x 3-5', b: 3, lvl: 2, g: 'Fuerza', p: 'pullup', img: null },
          { n: 'Negativa de dominada a front lever', s: '3 x 3', b: 3, lvl: 3, g: 'Fuerza', p: 'pullup', img: null },
          { n: 'Dominadas', s: '3 x 4-8', b: 4, lvl: 1, g: 'Tirón', p: 'pullup', img: "skill-dominadas" },
          { n: 'Dominadas (volumen)', s: '4 x 5-8', b: 4, lvl: 2, g: 'Tirón', p: 'pullup', img: "skill-dominadas" },
          { n: 'Dominadas arqueras o con lastre', s: '4 x 3-5', b: 4, lvl: 3, g: 'Tirón', p: 'pullup', img: "skill-dominada-lastre" },
          { n: 'Remo invertido en barra baja', s: '4 x 8', b: 5, lvl: 1, g: 'Espalda', p: 'row', img: 'cal-remo-barra-real' },
          { n: 'Remo en tuck front lever', s: '3 x 5-8', b: 5, lvl: 2, g: 'Espalda', p: 'row', img: null },
          { n: 'Remo en advanced tuck', s: '3 x 5', b: 5, lvl: 3, g: 'Espalda', p: 'row', img: null },
          { n: 'Negativa lenta de tuck a colgado (3-4 s)', s: '3 x 3', b: 6, lvl: 1, g: 'Excéntrico', p: 'pullup', img: null },
          { n: 'Negativa de front lever (unos 5 s)', s: '3 x 3', b: 6, lvl: 2, g: 'Excéntrico', p: 'pullup', img: null },
          { n: 'Negativa de front lever (8-10 s)', s: '3 x 3', b: 6, lvl: 3, g: 'Excéntrico', p: 'pullup', img: null } ] },
        { id: 'b4', nombre: 'Meta: Straddle planche', nota: 'La straddle planche es la META: empieza cuando las flexiones te resulten fáciles. Sesión completa por bloques: elige UNA variante por bloque. Aquí la unidad es el mes, no la semana: paciencia, y cuida las muñecas (calienta antes).', ej: [
          { n: 'Planche lean (peso al frente, brazos rectos)', s: '4 x 15 s', b: 1, lvl: 1, g: 'Empuje', p: 'plank', img: 'cal-planchelean-real' },
          { n: 'Planche lean con pies elevados', s: '4 x 15-20 s', b: 1, lvl: 2, g: 'Empuje', p: 'plank', img: null },
          { n: 'Planche lean máximo controlado', s: '4 x 15 s', b: 1, lvl: 3, g: 'Empuje', p: 'plank', img: null },
          { n: 'Frog stand (equilibrio de rana)', s: '4 x 10-15 s', b: 2, lvl: 1, g: 'Equilibrio', p: 'plank', img: "skill-frog-stand" },
          { n: 'Crow pose (cuervo)', s: '3 x 15-20 s', b: 2, lvl: 2, g: 'Equilibrio', p: 'plank', img: "skill-frog-stand" },
          { n: 'Tuck planche hold', s: '3 x 8-12 s', b: 2, lvl: 3, g: 'Estático', p: 'plank', img: 'cal-tuckplanche-real' },
          { n: 'Subidas a tuck planche', s: '3 x 3', b: 3, lvl: 1, g: 'Fuerza', p: 'plank', img: null },
          { n: 'Advanced tuck planche', s: '3 x 5-8 s', b: 3, lvl: 2, g: 'Estático', p: 'plank', img: null },
          { n: 'Straddle planche (intentos)', s: '5 intentos cortos', b: 3, lvl: 3, g: 'Skill', p: 'plank', img: null },
          { n: 'Flexiones', s: '3 x 10-15', b: 4, lvl: 1, g: 'Empuje', p: 'pushup', img: "cal-flexiones" },
          { n: 'Flexiones pseudo-planche', s: '3 x 6-8', b: 4, lvl: 2, g: 'Empuje', p: 'pushup', img: "skill-pseudo-pushup" },
          { n: 'Flexiones pseudo-planche con pies elevados', s: '3 x 5-8', b: 4, lvl: 3, g: 'Empuje', p: 'pushup', img: null },
          { n: 'Fondos asistidos', s: '3 x 8', b: 5, lvl: 1, g: 'Empuje', p: 'dip', img: "cal-fondos-asistidos" },
          { n: 'Fondos lean planche', s: '3 x 6-8', b: 5, lvl: 2, g: 'Empuje', p: 'dip', img: null },
          { n: 'Fondos lean planche con piernas elevadas', s: '4 x 6-8', b: 5, lvl: 3, g: 'Empuje', p: 'dip', img: null },
          { n: 'Movilidad y carga de muñecas', s: '2 x 30 s', b: 6, lvl: 1, g: 'Preparación', p: 'plank', img: "cal-movilidad-munecas" },
          { n: 'L-sit', s: '3 x 10 s', b: 6, lvl: 2, g: 'Core', p: 'plank', img: "skill-lsit" },
          { n: 'De L-sit a tuck planche', s: '3 x 3', b: 6, lvl: 3, g: 'Core · Skill', p: 'plank', img: null } ] },
        { id: 'b5', nombre: 'Meta: Pino (handstand)', nota: 'El pino libre es la META. Sesión completa por bloques: elige UNA variante por bloque. Poco y a menudo: 10 minutos al día valen más que una hora el fin de semana. Calienta muñecas antes de empezar.', ej: [
          { n: 'Under switch (cambio de apoyo)', s: '3 x 10-20', b: 1, lvl: 1, g: 'Entrada', p: 'pushup', img: null },
          { n: 'Wall climb (caminata de pared)', s: '4 x 20 s', b: 1, lvl: 2, g: 'Entrada', p: 'pushup', img: "skill-pino-caminata" },
          { n: 'Caminata de pared hasta pino', s: '3 x 3', b: 1, lvl: 3, g: 'Entrada', p: 'pushup', img: "skill-pino-caminata" },
          { n: 'Pino contra pared (de espaldas)', s: '4 x 20-30 s', b: 2, lvl: 1, g: 'Equilibrio', p: 'plank', img: "skill-pino-pared-espaldas" },
          { n: 'Pino de cara a la pared', s: '4 x 20-30 s', b: 2, lvl: 2, g: 'Equilibrio', p: 'plank', img: "skill-pino-pared-cara" },
          { n: 'Pino de cara a la pared, con salidas', s: '4 x 10-20 s', b: 2, lvl: 3, g: 'Equilibrio', p: 'plank', img: null },
          { n: 'Pino contra pared, una pierna despegada', s: '3 x 10 s por lado', b: 3, lvl: 1, g: 'Skill', p: 'plank', img: "skill-pino-una-pierna" },
          { n: 'Salidas de pino (práctica 5 min)', s: '5 min', b: 3, lvl: 2, g: 'Skill', p: 'plank', img: null },
          { n: 'Pino libre o con compañero (intentos)', s: '5-8 intentos', b: 3, lvl: 3, g: 'Skill', p: 'plank', img: "skill-pino-libre" },
          { n: 'Flexiones (con o sin rodillas)', s: '3 x 10-15', b: 4, lvl: 1, g: 'Hombro', p: 'pushup', img: "cal-flexiones" },
          { n: 'Flexiones pike', s: '3 x 8', b: 4, lvl: 2, g: 'Hombro', p: 'pushup', img: "cal-pike" },
          { n: 'Flexiones en pino contra pared', s: '3 x 5', b: 4, lvl: 3, g: 'Hombro', p: 'pushup', img: "skill-pino-flexiones" },
          { n: 'Hollow body hold', s: '3 x 15 s', b: 5, lvl: 1, g: 'Core', p: 'plank', img: "skill-hollow" },
          { n: 'Hollow body con balanceo', s: '3 x 15 s', b: 5, lvl: 2, g: 'Core', p: 'plank', img: 'cal-hollow-balanceo-ia' },
          { n: 'De L-sit a pino', s: '3 x 3-4', b: 5, lvl: 3, g: 'Core · Skill', p: 'plank', img: 'cal-lsit-pino-secuencia' },
          { n: 'Movilidad de muñecas y hombros', s: '2-3 min', b: 6, lvl: 1, g: 'Preparación', p: 'plank', img: null },
          { n: 'Estiramiento de hombros en pared', s: '2 x 30 s', b: 6, lvl: 2, g: 'Preparación', p: 'plank', img: "cal-hombros-pared" },
          { n: 'Puente (progresión suave)', s: '3 x 10 s', b: 6, lvl: 3, g: 'Preparación', p: 'plank', img: "cal-puente" } ] },
        { id: 'b6', nombre: 'Pierna y movilidad', nota: 'Sesión completa de pierna con calistenia. Elige UNA variante por bloque. Si tienes alguna lesión: limita el recorrido en sentadillas profundas y paso mono, y cambia las explosivas por la versión sin impacto (rápidas sin salto).', ej: [
          { n: 'Sentadillas sumo con contracción activa', s: '3 x 15-25', b: 1, lvl: 1, g: 'Pierna', p: 'squat', img: "cal-sumo" },
          { n: 'Sentadillas profundas con pausa de 1 s abajo', s: '3 x 15-20', b: 1, lvl: 2, g: 'Pierna', p: 'squat', img: "cal-sentadilla" },
          { n: 'Sentadillas explosivas', s: '3 x 15-20', b: 1, lvl: 3, g: 'Pierna', p: 'squat', img: "cal-sentadilla-salto" },
          { n: 'Zancadas', s: '3 x 10 por pierna', b: 2, lvl: 1, g: 'Pierna', p: 'squat', img: "cal-zancadas" },
          { n: 'Pistols asistidas (agarrándote)', s: '3 x 6 por pierna', b: 2, lvl: 2, g: 'Pierna', p: 'squat', img: "cal-pistol-asistida" },
          { n: 'Pistol squat a cajón o silla', s: '3 x 4-6 por pierna', b: 2, lvl: 3, g: 'Pierna', p: 'squat', img: "cal-pistol-silla" },
          { n: 'Marcha alta con patada frontal', s: '3 x 20', b: 3, lvl: 1, g: 'Pierna · Movilidad', p: 'squat', img: 'cal-marcha-patada-secuencia' },
          { n: 'Front step + patada frontal', s: '3 x 20', b: 3, lvl: 2, g: 'Pierna · Movilidad', p: 'squat', img: null },
          { n: 'Front step con salto', s: '3 x 15', b: 3, lvl: 3, g: 'Pierna · Movilidad', p: 'squat', img: null },
          { n: 'Zancada lateral estática', s: '3 x 20-30 s por lado', b: 4, lvl: 1, g: 'Pierna · Isométrico', p: 'squat', img: "cal-zancada-lateral" },
          { n: 'Paso mono lateral', s: '3 x 30-45 s por lado', b: 4, lvl: 2, g: 'Pierna · Isométrico', p: 'squat', img: null },
          { n: 'Paso mono lateral con salto', s: '3 x 20', b: 4, lvl: 3, g: 'Pierna', p: 'squat', img: null },
          { n: 'Elevaciones de gemelos', s: '3 x 15', b: 5, lvl: 1, g: 'Gemelo', p: 'squat', img: "cal-gemelos" },
          { n: 'Gemelos a una pierna', s: '3 x 12 por pierna', b: 5, lvl: 2, g: 'Gemelo', p: 'squat', img: "cal-gemelos-1p" },
          { n: 'Gemelos a una pierna en escalón', s: '3 x 10 por pierna', b: 5, lvl: 3, g: 'Gemelo', p: 'squat', img: "cal-gemelos-escalon" },
          { n: 'Movilidad de tobillo y cadera', s: '2-3 min', b: 6, lvl: 1, g: 'Movilidad', p: 'squat', img: 'cal-movilidad-tobillo-cadera' },
          { n: 'Movilidad de cadera + isquiotibiales', s: '2-3 min', b: 6, lvl: 2, g: 'Movilidad', p: 'squat', img: 'cal-cadera-isquio-secuencia' },
          { n: 'Movilidad global (flujo completo)', s: '5 min', b: 6, lvl: 3, g: 'Movilidad', p: 'squat', img: null } ] }
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
    var svg = '<div class="ex-svg" role="img" aria-label="Foto pendiente de verificación">' + exSVG(x.p) + '</div>';
    if (!x.img) return '<div class="ex-photo-pending">' + svg + '<small>Foto pendiente</small></div>';
    return '<img class="ex-thumb" src="assets/ex-' + x.img + '.jpg" alt="' + esc(x.n) + '" loading="lazy" onerror="this.outerHTML=this.dataset.fb" data-fb="' + svg.replace(/"/g, '&quot;') + '">';
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


    var LVL_LBL = ['', 'BÁSICO', 'MEDIA', 'AVANZADA'];
    function sesEx(s) { return s.ej; }
    function sesBlocks(s) { var b = {}; s.ej.forEach(function (x) { if (x.b) b[x.b] = 1; }); return Object.keys(b); }
    ses.forEach(function (s, i) {
      var ej = sesEx(s);
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
        '<div class="sub">' + (eq.skills ? sesBlocks(s).length + ' bloques · elige 1 variante por bloque' : ej.length + ' ejercicios') + '</div>' +
        (open ? '<div class="ses-body">' : '<div class="ses-body" hidden>') +
        (eq.skills ? '' :
        '<div class="tut-chips"><span class="chip">TUT 2-1</span><span class="chip">RIR 2</span>' +
        '<button class="chip link" data-tut>¿Qué es?</button></div>' +
        (tutOpen ? '<div class="note green" style="margin-top:8px"><b>TUT 2-1:</b> baja el peso en 2 segundos y sube en 1, sin pausas. <b>RIR 2:</b> termina cada serie pudiendo haber hecho unas 2 repeticiones más. Así progresas sin lesionarte.</div>' : '')) +
        (s.nota ? '<div class="note green" style="margin-top:8px">' + s.nota + '</div>' : '') +
        ej.map(function (x, j) {
          var lvlTag = x.g;
          var row = '<div class="ex-row' + (eq.skills ? ' var-row lvl' + x.lvl : '') + (active && checked[j] ? ' ex-done' : '') + '"' + (active ? ' data-ex-check="' + j + '"' : '') + '>' +
            (active ? '<div class="ex-check">' + (checked[j] ? '✓' : '') + '</div>' : '<div class="ex-num">' + (eq.skills ? '' : (j + 1)) + '</div>') +
            exThumb(x) +
            '<div class="ex-info"><div class="ex-name">' + x.n + '</div>' +
            '<div class="ex-sets">' + x.s + ' · ' + lvlTag + (eq.skills ? ' <span class="lvl-pill lvl' + x.lvl + '">' + LVL_LBL[x.lvl] + '</span>' : '') + '</div></div></div>';
          if (x.ss && j > 0 && !ej[j - 1].ss) row = row; // isolated ss handled below
          var ss = (x.ss && (j === 0 || !ej[j - 1].ss) ? '<div class="ss-label">Superserie: una detrás de otra, descansa al final</div>' : '');
          var blk = (eq.skills && x.b && (j === 0 || ej[j - 1].b !== x.b) ? '<div class="blk-label">Bloque ' + x.b + '</div>' : '');
          return ss + blk + row;
        }).join('');
      if (active) {
        var req = ej.length, ok = nChecked;
        if (eq.skills) {
          req = sesBlocks(s).length;
          ok = sesBlocks(s).filter(function (bn) { return ej.some(function (x, j) { return String(x.b) === String(bn) && checked[j]; }); }).length;
        }
        html += '<button class="btn primary" data-complete-session="' + key + '"' + (ok < req ? ' style="opacity:.55"' : '') + '>Completar sesión (' + (eq.skills ? 'bloques ' : '') + ok + '/' + req + ')</button>' +
          '<button class="btn ghost" data-cancel-session>Cancelar</button>';
      } else if (!doneThisWeek) {
        html += '<button class="btn primary" data-start-session="' + key + '">Empezar entreno</button>';
      }
      html += '</div></div>';
    });

    document.getElementById('tab-entreno').innerHTML = html;
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
        ['desayuno', 'comida', 'cena'].forEach(function (sl) { if (slots[sl]) sum += regKcal(slots[sl]); });
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

  function renderAll() { renderHero(); renderPerfil(); renderHoy(); renderRecetas(); renderProgreso(); renderEntreno(); }

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
    window.__rt = setTimeout(function () { renderPerfil(); renderHoy(); renderRecetas(); renderProgreso(); renderEntreno(); }, 400);
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

  function openLightbox(src, alt) {
    var ov = document.createElement('div');
    ov.className = 'lb-overlay';
    var photoKey = src.split('/').pop().replace(/\.jpg$/, '');
    var credit = PHOTO_CREDITS[photoKey];
    var mealIllustration = ["d1", "d3", "c2", "d5", "d8", "n7", "n13", "n14", "n16", "r-feb-n", "r-mar-n", "r-may-n", "r-jul-n", "r-oct-c", "r-nov-n", "r-dic-d", "r-dic-c"].indexOf(photoKey) !== -1;
    var creditHtml = credit ? '<div class="lb-credit">' + esc(credit.artist || '') + (credit.url ? ' · <a href="' + credit.url + '" target="_blank" rel="noopener">' + esc(credit.license || '') + '</a>' : ' · ' + esc(credit.license || '')) + (credit.license_url ? ' · <a href="' + credit.license_url + '" target="_blank" rel="noopener">Licencia</a>' : '') + (credit.changes ? '<br>' + esc(credit.changes) : '') + '</div>' : (mealIllustration ? '<div class="lb-credit">Imagen ilustrativa generada. Ingredientes según la receta; cantidades de la foto no equivalen a la ración calculada.</div>' : '');
    ov.innerHTML = '<span class="lb-close">×</span><figure><img src="' + src + '" alt="' + esc(alt || '') + '"><figcaption>' + esc(alt || '') + '</figcaption>' + creditHtml + '</figure>';
    ov.addEventListener('click', function (e) { if (!e.target.closest('a')) ov.remove(); });
    document.body.appendChild(ov);
  }

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
    if (t.tagName === 'IMG' && (t.classList.contains('ex-thumb') || (t.closest && (t.closest('.recipe-card') || t.closest('.meal-card'))))) {
      if (t.closest && t.closest('.meal-card')) { e.preventDefault(); e.stopPropagation(); }
      openLightbox(t.src, t.alt);
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
        var dp2 = window.__dayPlans && window.__dayPlans[slot];
        var opt2 = findOption(picks[slot]);
        if (dp2 && dp2.plan && opt2) {
          dayLog[slot] = { kcal: dp2.plan.kcal, prot: dp2.plan.protein, id: opt2.id, name: opt2.name,
            items: dp2.plan.items.map(function (it) { return { n: it.name, g: it.grams }; }) };
        } else {
          dayLog[slot] = slotTarget(rr, slot);
        }
      }
      registro[tIso] = dayLog;
      save('dieta.registro.v1', registro);
      renderHoy(); renderRecetas(); renderProgreso();
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
    if (t.id === 'mPrev') { viewM--; if (viewM < 0) { viewM = 11; viewY--; } renderRecetas(); return; }
    if (t.id === 'mNext') { viewM++; if (viewM > 11) { viewM = 0; viewY++; } renderRecetas(); return; }
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
