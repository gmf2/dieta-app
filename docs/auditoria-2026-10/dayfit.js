function rotPick(pool, m, n) { var start = (m * 2) % pool.length, out = []; for (var i = 0; i < n; i++) out.push(pool[(start + i) % pool.length]); return out; }
function classicsFor(m, slot) {
  var pool = MEALS.filter(function (x) { return x.slot === slot; });
  if (slot === 'cena') {
    var burgers = pool.filter(function (x) { return x.burger; });
    var wraps = pool.filter(function (x) { return x.wrap; });
    if (burgers.length && wraps.length) {
      var rest = pool.filter(function (x) { return !x.burger && !x.wrap; });
      var rq = rest.filter(function (x) { return x.rapida; });
      var rn = rest.filter(function (x) { return !x.rapida; });
      return [burgers[m % burgers.length], wraps[m % wraps.length]].concat(rotPick(rn, m, 1)).concat(rotPick(rq, m, 1));
    }
  }
  var quick = pool.filter(function (x) { return x.rapida; });
  var norm = pool.filter(function (x) { return !x.rapida; });
  if (quick.length < 2) return rotPick(pool, m, 4);
  return rotPick(norm, m, 2).concat(rotPick(quick, m, 2));
}
const AF = d => d<=0?1.2:d<=2?1.375:d<=4?1.55:d<=6?1.725:1.9;
const ADJ = { perder:-500, mantener:0, ganar:300 };
const GKG = { perder:2, mantener:1.6, ganar:1.8 };
const SHARE = { desayuno:0.30, comida:0.40, cena:0.30 };
function targets(p, obj) {
  const bmr = 10*p.peso + 6.25*p.altura - 5*p.edad + (p.sexo==='hombre'?5:-161);
  let t = bmr*AF(p.deporte) + ADJ[obj];
  const floor = p.sexo==='hombre'?1500:1200;
  if (t < floor) t = floor;
  return Math.round(t/10)*10;
}
const PERFILES = {
  'ligera60': { peso:60, altura:165, edad:35, sexo:'mujer', deporte:2 },
  'media80': { peso:80, altura:175, edad:30, sexo:'hombre', deporte:3 },
  'pesada95': { peso:95, altura:185, edad:28, sexo:'hombre', deporte:5 },
};
for (const [pn, p] of Object.entries(PERFILES)) {
  for (const obj of ['perder','mantener','ganar']) {
    const t = targets(p, obj), pg = Math.round(GKG[obj]*p.peso);
    let worstDay = 0, worstM = -1, daysAviso = 0, worstPlate = 0;
    for (let m = 0; m < 12; m++) {
      let dkDay = 0, dpDay = 0, aviso = false;
      for (const slot of ['desayuno','comida','cena']) {
        let opts = classicsFor(m, slot);
        const mr = RECIPES.find(x => x.month === m && x.slot === slot);
        if (mr) opts = opts.concat([mr]);
        const sk = Math.round(t*SHARE[slot]/10)*10, sp = Math.round(pg*SHARE[slot]);
        let bestO = opts[0], bestE = Infinity, bestPl = null;
        for (const o of opts) {
          const pl = computePlan(o, sk, sp);
          const e = Math.abs(pl.dk) + 3*Math.abs(pl.dp);
          if (e < bestE - 1e-9) { bestE = e; bestO = o; bestPl = pl; }
        }
        dkDay += bestPl.dk; dpDay += bestPl.dp;
        if (Math.abs(bestPl.dk) > 60 || Math.abs(bestPl.dp) > 10) aviso = true;
        if (Math.abs(bestPl.dk) > Math.abs(worstPlate)) worstPlate = bestPl.dk;
      }
      if (Math.abs(dkDay) > Math.abs(worstDay)) { worstDay = dkDay; worstM = m; }
      if (aviso) daysAviso++;
    }
    console.log(pn+'/'+obj+' ('+t+' kcal): peor dia dk='+worstDay+' (mes '+worstM+') | dias con aviso: '+daysAviso+'/12 | peor plato elegido dk='+worstPlate);
  }
}
