/* Mi Dieta - app local, sin conexión. Datos en localStorage del dispositivo. */
(function () {
  'use strict';

  var DEFAULT_PROFILE = { peso: 80, altura: 175, edad: 30, sexo: 'hombre', deporte: 3, objetivo: 'mantener' };
  var DEFAULT_PICKS = { desayuno: 'd1', comida: 'c1', cena: 'n1' };
  var GOAL_ADJUST = { perder: -500, mantener: 0, ganar: 300 };
  var GOAL_LABEL = { perder: 'Perder grasa', mantener: 'Mantener', ganar: 'Ganar músculo' };
  var ACTIVITY_LABEL = ['Sedentario', 'Actividad ligera', 'Actividad ligera', 'Actividad moderada',
    'Actividad moderada', 'Actividad alta', 'Actividad alta', 'Actividad muy alta'];
  var PHOTO_IDS = { d1:1, d2:1, d3:1, d4:1, c1:1, c2:1, c3:1, c4:1, n1:1, n2:1, n3:1, n4:1,
    'r-oct-d':1, 'r-oct-c':1, 'r-oct-n':1 };


  var ICONS = {
    perfil: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>',
    hoy: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><path d="M4 3v7a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V3M6 3v18M15 3c3 0 5 3 5 7s-2 5-5 5v6"/></svg>',
    recetas: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    bowl: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><path d="M4 12h16a8 8 0 0 1-16 0z"/><path d="M9 8c0-2 2-2 2-4M13 8c0-2 2-2 2-4"/></svg>',
    pot: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M2 10h20M8 6c1-2 7-2 8 0"/></svg>',
    plate: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>'
  };
  var SLOT_ICON = { desayuno: 'bowl', comida: 'pot', cena: 'plate' };
  function load(key, fallback) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : JSON.parse(JSON.stringify(fallback)); }
    catch (e) { return JSON.parse(JSON.stringify(fallback)); }
  }
  function save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }

  var profile = load('dieta.perfil.v1', DEFAULT_PROFILE);
  var picks = load('dieta.picks.v1', DEFAULT_PICKS);
  var checkins = load('dieta.revisiones.v1', []);
  var month = new Date().getMonth();

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
  function findOption(id) {
    return MEALS.concat(RECIPES).find(function (o) { return o.id === id; });
  }
  function slotTarget(r, slot) { return Math.round(r.target * SLOT_SHARE[slot] / 10) * 10; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function photoFor(o) { return PHOTO_IDS[o.id] ? 'assets/' + o.id + '.jpg' : null; }

  function ingredientHTML(option, targetKcal) {
    var factor = targetKcal / option.kcal;
    var rows = option.components.map(function (c) {
      return '<div class="ing-row"><span>' + esc(c.name) + '</span><b>' + round5(c.grams * factor) + ' g</b></div>';
    }).join('');
    return '<div class="ing">' + rows +
      '<div class="cap">Cantidades ajustadas a tu objetivo (' + Math.round(targetKcal / 10) * 10 +
      ' kcal en esta comida, aprox.).</div></div>';
  }

  /* ---------- Hero ---------- */
  function renderHero() {
    var r = compute(profile);
    document.getElementById('ringNum').textContent = r.target;
    document.getElementById('ringFill').style.strokeDashoffset = (251.3 * 0.25).toFixed(1);
    var colors = { desayuno: '#ffd166', comida: '#ff9f5a', cena: '#a7f3d0' };
    document.getElementById('heroSplit').innerHTML = ['desayuno', 'comida', 'cena'].map(function (s) {
      return '<div class="split-row"><span><span class="dot" style="background:' + colors[s] + '"></span>' +
        SLOT_LABEL[s] + '</span><b>' + slotTarget(r, s) + '</b></div>';
    }).join('');
  }

  /* ---------- Perfil ---------- */
  function sliderField(label, key, min, max, unit) {
    return '<div class="field"><div class="f-top"><span>' + label + '</span><span class="f-val" id="v-' + key + '">' +
      profile[key] + ' ' + unit + '</span></div>' +
      '<input type="range" min="' + min + '" max="' + max + '" value="' + profile[key] + '" data-key="' + key + '" data-unit="' + unit + '"></div>';
  }
  function segField(key, options) {
    return '<div class="seg" data-seg="' + key + '">' + options.map(function (o) {
      return '<button data-v="' + o.v + '" class="' + (profile[key] === o.v ? 'active' : '') + '">' + o.l + '</button>';
    }).join('') + '</div>';
  }

  function chartSVG() {
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
    var labels = '<text x="' + pad + '" y="' + (h - 6) + '" font-size="8.5" fill="#6b7d70">' + data[0].fecha.slice(5).split('-').reverse().join('/') + '</text>' +
      '<text x="' + (w - pad) + '" y="' + (h - 6) + '" font-size="8.5" fill="#6b7d70" text-anchor="end">' + data[data.length - 1].fecha.slice(5).split('-').reverse().join('/') + '</text>';
    return '<div class="chart-wrap"><svg viewBox="0 0 ' + w + ' ' + h + '" width="100%">' +
      '<path d="' + line + '" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round"/>' + dots + labels + '</svg></div>';
  }

  function renderPerfil() {
    var r = compute(profile);
    var today = new Date(), todayIso = today.toISOString().slice(0, 10);
    var last = checkins[checkins.length - 1];
    var daysSince = last ? Math.floor((today - new Date(last.fecha)) / 86400000) : null;
    var nextIn = daysSince == null ? null : Math.max(0, 14 - daysSince);

    var html = '';
    html += '<div class="card"><h2>Tus datos</h2><div class="sub">Cambia lo que necesites; todo se recalcula solo.</div>' +
      sliderField('Peso', 'peso', 40, 150, 'kg') +
      sliderField('Altura', 'altura', 140, 210, 'cm') +
      sliderField('Edad', 'edad', 16, 90, 'años') +
      '<div class="f-top" style="font-size:.88rem;font-weight:600;margin-bottom:6px"><span>Sexo (para la fórmula)</span></div>' +
      segField('sexo', [{ v: 'hombre', l: 'Hombre' }, { v: 'mujer', l: 'Mujer' }]) +
      sliderField('Días de deporte a la semana', 'deporte', 0, 7, profile.deporte === 1 ? 'día' : 'días') +
      '<div class="f-top" style="font-size:.88rem;font-weight:600;margin-bottom:6px"><span>Tu objetivo</span></div>' +
      segField('objetivo', [{ v: 'perder', l: 'Perder grasa' }, { v: 'mantener', l: 'Mantener' }, { v: 'ganar', l: 'Ganar músculo' }]) +
      '</div>';

    html += '<div class="card"><h2>Tu objetivo de calorías</h2><div class="sub">Fórmula de Mifflin-St Jeor + tu actividad + tu objetivo.</div>' +
      '<div class="fact"><span>Metabolismo basal (TMB)</span><b>' + r.bmr + ' kcal</b></div>' +
      '<div class="fact"><span>Gasto con actividad (' + ACTIVITY_LABEL[profile.deporte].toLowerCase() + ')</span><b>' + r.tdee + ' kcal</b></div>' +
      '<div class="fact"><span>Objetivo diario (' + GOAL_LABEL[profile.objetivo].toLowerCase() + ')</span><b>' + r.target + ' kcal</b></div>' +
      (r.floored ? '<div class="note">Con ese objetivo saldrían menos de ' + r.floor + ' kcal, así que lo he dejado en ' + r.floor + '. Bajar más no es recomendable sin supervisión.</div>' : '') +
      '<div class="note green">Ajuste por objetivo: -500 kcal para perder, +300 para ganar. Es orientación general, no consejo médico.</div></div>';

    html += '<div class="card"><h2>Revisión quincenal</h2><div class="sub">Anota tu peso cada dos semanas para ver tu evolución.</div>' +
      '<button class="btn primary" id="btnCheckin">' +
      (last && last.fecha === todayIso ? 'Actualizar revisión de hoy (' + profile.peso + ' kg)' : 'Anotar revisión de hoy (' + profile.peso + ' kg)') + '</button>' +
      (last ? '<div class="muted mt8">Última revisión: ' + last.fecha.split('-').reverse().join('/') + ' con ' + last.peso + ' kg' +
        (nextIn != null ? (nextIn === 0 ? ' · ya toca la siguiente' : ' · la siguiente en unos ' + nextIn + ' días') : '') + '.</div>' : '') +
      chartSVG() +
      (checkins.length ? '<button class="btn ghost" id="btnUndoCheckin">Borrar la última revisión</button>' : '') + '</div>';

    document.getElementById('tab-perfil').innerHTML = html;
  }

  /* ---------- Hoy ---------- */
  function renderHoy() {
    var r = compute(profile);
    var html = '<div class="card"><h2>Tu dieta de hoy</h2>' +
      '<div class="sub">Elige una opción en cada comida. Las cantidades se ajustan solas para sumar tu objetivo de ' + r.target + ' kcal.</div></div>';

    ['desayuno', 'comida', 'cena'].forEach(function (slot) {
      var target = slotTarget(r, slot);
      var monthRecipe = RECIPES.find(function (x) { return x.month === month && x.slot === slot; });
      var options = MEALS.filter(function (m) { return m.slot === slot; });
      if (monthRecipe) options = options.concat([monthRecipe]);
      if (!findOption(picks[slot]) || findOption(picks[slot]).slot !== slot) picks[slot] = options[0].id;
      var selected = findOption(picks[slot]) || options[0];

      html += '<div class="slot-head">' + ICONS[SLOT_ICON[slot]] + '<h3>' + SLOT_LABEL[slot] + '</h3>' +
        '<span class="kcal">' + target + ' kcal</span></div>';
      html += '<div class="meal-grid">' + options.map(function (o) {
        var ph = photoFor(o);
        var isRecipe = o.recipeOfMonth || (monthRecipe && monthRecipe.id === o.id) || o.pasos;
        return '<button class="meal-card' + (o.id === selected.id ? ' selected' : '') + '" data-slot="' + slot + '" data-id="' + o.id + '">' +
          '<span class="check">✓</span>' +
          (ph ? '<img src="' + ph + '" alt="' + esc(o.name) + '" loading="lazy">'
              : '<div class="svg-cover">' + ICONS[SLOT_ICON[slot]] + '</div>') +
          '<div class="m-body"><div class="m-name">' + esc(o.name) + '</div>' +
          (isRecipe ? '<div class="m-tag recipe-of">Receta de ' + MONTHS[month] + '</div>' : '<div class="m-tag">Clásico</div>') +
          '</div></button>';
      }).join('') + '</div>';
      html += ingredientHTML(selected, target);
    });

    html += '<div class="card mt12"><div class="fact"><span>Desayuno</span><b>' + slotTarget(r, 'desayuno') + ' kcal</b></div>' +
      '<div class="fact"><span>Comida</span><b>' + slotTarget(r, 'comida') + ' kcal</b></div>' +
      '<div class="fact"><span>Cena</span><b>' + slotTarget(r, 'cena') + ' kcal</b></div>' +
      '<div class="fact"><span>Total del día</span><b>' + r.target + ' kcal</b></div>' +
      '<div class="muted mt8">Si cambias tu peso u objetivo en Perfil, estas cantidades se recalculan solas.</div></div>';

    document.getElementById('tab-hoy').innerHTML = html;
  }

  /* ---------- Recetas ---------- */
  function renderRecetas() {
    var r = compute(profile);
    var recipes = RECIPES.filter(function (x) { return x.month === month; });
    var html = '<div class="card"><h2>Recetas de temporada</h2>' +
      '<div class="sub">Tres recetas nuevas cada mes para sustituir cualquier plato de tu dieta.</div></div>';
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

  function renderAll() { renderHero(); renderPerfil(); renderHoy(); renderRecetas(); }

  /* ---------- Eventos ---------- */
  document.addEventListener('input', function (e) {
    var key = e.target.getAttribute && e.target.getAttribute('data-key');
    if (!key) return;
    profile[key] = parseInt(e.target.value, 10);
    save('dieta.perfil.v1', profile);
    var unit = e.target.getAttribute('data-unit');
    document.getElementById('v-' + key).textContent = profile[key] + ' ' + (key === 'deporte' ? (profile.deporte === 1 ? 'día' : 'días') : unit);
    renderHero();
    clearTimeout(window.__rt);
    window.__rt = setTimeout(function () { renderPerfil(); renderHoy(); renderRecetas(); }, 350);
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
    var seg = t.closest && t.closest('.seg button');
    if (seg) {
      var key = seg.parentElement.getAttribute('data-seg');
      profile[key] = seg.getAttribute('data-v');
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
    var use = t.closest && t.closest('[data-use]');
    if (use) {
      picks[use.getAttribute('data-slot')] = use.getAttribute('data-use');
      save('dieta.picks.v1', picks);
      renderHoy(); renderRecetas();
      return;
    }
    if (t.id === 'mPrev') { month = (month + 11) % 12; renderRecetas(); renderHoy(); return; }
    if (t.id === 'mNext') { month = (month + 1) % 12; renderRecetas(); renderHoy(); return; }
    if (t.id === 'btnCheckin') {
      var todayIso = new Date().toISOString().slice(0, 10);
      checkins = checkins.filter(function (c) { return c.fecha !== todayIso; });
      checkins.push({ fecha: todayIso, peso: profile.peso });
      save('dieta.revisiones.v1', checkins);
      renderPerfil();
      return;
    }
    if (t.id === 'btnUndoCheckin') { checkins.pop(); save('dieta.revisiones.v1', checkins); renderPerfil(); return; }
  });

  var initial = (location.hash || '').replace('#', '');
  if (['perfil', 'hoy', 'recetas'].indexOf(initial) >= 0) {
    document.querySelectorAll('nav.tabs button').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-tab') === initial); });
    document.querySelectorAll('section.tab').forEach(function (s) { s.classList.remove('active'); });
    document.getElementById('tab-' + initial).classList.add('active');
  }
  renderAll();
})();
