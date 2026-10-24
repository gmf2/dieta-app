function rotPick(pool, m, n) { var start = (m * 2) % pool.length, out = []; for (var i = 0; i < n; i++) out.push(pool[(start + i) % pool.length]); return out; }
function classicsFor(m, slot) {
  var pool = MEALS.filter(function (x) { return x.slot === slot; });
  if (slot === 'cena') {
    var burgers = pool.filter(function (x) { return x.burger; }), wraps = pool.filter(function (x) { return x.wrap; });
    if (burgers.length && wraps.length) {
      var rest = pool.filter(function (x) { return !x.burger && !x.wrap; });
      var rq = rest.filter(function (x) { return x.rapida; }), rn = rest.filter(function (x) { return !x.rapida; });
      return [burgers[m % burgers.length], wraps[m % wraps.length]].concat(rotPick(rn, m, 1)).concat(rotPick(rq, m, 1));
    }
  }
  var quick = pool.filter(function (x) { return x.rapida; }), norm = pool.filter(function (x) { return !x.rapida; });
  if (quick.length < 2) return rotPick(pool, m, 4);
  return rotPick(norm, m, 2).concat(rotPick(quick, m, 2));
}
const OBJS = {
  mantener: { desayuno: [810, 38], comida: [1080, 51], cena: [810, 38] },
  perder:   { desayuno: [663, 45], comida: [884, 67], cena: [663, 48] },
  ganar:    { desayuno: [903, 43], comida: [1204, 58], cena: [903, 43] },
};
const all = MEALS.concat(RECIPES);
function macros(plan) {
  let k=0,p=0,c=0,g=0;
  for (const it of plan.items) { const ing=ING[it.name]; k+=ing.k*it.grams/100; p+=ing.p*it.grams/100; c+=ing.c*it.grams/100; g+=ing.g*it.grams/100; }
  return {k,p,c,g};
}
const pct = (x,k)=>Math.round(x*4/k*100); // c o p
const pg  = (x,k)=>Math.round(x*9/k*100); // g

// A) Platos con reparto extremo (grasa >45% kcal o hidratos <10% kcal) por objetivo
console.log('=== PLATOS CON REPARTO EXTREMO (grasa>45% kcal o hidratos<10% kcal) ===');
for (const obj of Object.keys(OBJS)) {
  const flags=[];
  for (const o of all) {
    const plan = computePlan(o, ...OBJS[obj][o.slot]);
    const m = macros(plan);
    const gPct = m.g*9/m.k*100, cPct = m.c*4/m.k*100;
    if (gPct > 45) flags.push(o.id+' grasa '+Math.round(gPct)+'%');
    if (cPct < 10) flags.push(o.id+' hidratos '+Math.round(cPct)+'%');
  }
  console.log(obj+': '+(flags.length?flags.join(' ; '):'ninguno'));
}

// B) Totales diarios: 125 combos x 12 meses x 3 objetivos
console.log('\n=== TOTALES DIARIOS (1500 combos por objetivo; perfil reproduccion 80kg) ===');
for (const obj of Object.keys(OBJS)) {
  let sumK=0,sumP=0,sumC=0,sumG=0,n=0;
  let outFat=0, outCarb=0, worstFat=0, worstFatM='', lowCarb=0;
  let minFatPct=100, maxFatPct=0, minCarbPct=100, maxCarbPct=0;
  for (let m=0;m<12;m++) {
    const per={};
    for (const slot of ['desayuno','comida','cena']) {
      const opts = classicsFor(m, slot).concat(RECIPES.filter(r=>r.month===m&&r.slot===slot));
      per[slot]=opts.map(o=>macros(computePlan(o, ...OBJS[obj][slot])));
    }
    for (const a of per.desayuno) for (const b of per.comida) for (const c of per.cena) {
      const K=a.k+b.k+c.k, P=a.p+b.p+c.p, C=a.c+b.c+c.c, G=a.g+b.g+c.g;
      n++; sumK+=K; sumP+=P; sumC+=C; sumG+=G;
      const fPct=G*9/K*100, cPct=C*4/K*100;
      if (fPct<20||fPct>35) outFat++;
      if (cPct<35||cPct>60) outCarb++;
      if (fPct<minFatPct) minFatPct=fPct; if (fPct>maxFatPct) maxFatPct=fPct;
      if (cPct<minCarbPct) minCarbPct=cPct; if (cPct>maxCarbPct) maxCarbPct=cPct;
    }
  }
  console.log(obj+': media diaria '+Math.round(sumK/n)+' kcal | P '+Math.round(sumP/n)+'g ('+Math.round(sumP/n/80*100)/100+' g/kg) | C '+Math.round(sumC/n)+'g ('+Math.round(sumC/n*4/(sumK/n)*100)+'% kcal) | G '+Math.round(sumG/n)+'g ('+Math.round(sumG/n*9/(sumK/n)*100)+'% kcal, '+Math.round(sumG/n/80*100)/100+' g/kg)');
  console.log('  dias grasa fuera [20-35%]: '+outFat+' ('+Math.round(outFat/n*100)+'%) | dias hidratos fuera [35-60%]: '+outCarb+' ('+Math.round(outCarb/n*100)+'%) | rangos: grasa '+Math.round(minFatPct)+'-'+Math.round(maxFatPct)+'%, hidratos '+Math.round(minCarbPct)+'-'+Math.round(maxCarbPct)+'%');
}

// C) Desglose por slot (media de todos los platos visibles, mantener)
console.log('\n=== MEDIA POR SLOT (todos los platos, por objetivo) ===');
for (const obj of Object.keys(OBJS)) {
  for (const slot of ['desayuno','comida','cena']) {
    let sK=0,sP=0,sC=0,sG=0,n=0;
    for (const o of all.filter(x=>x.slot===slot)) {
      const m=macros(computePlan(o, ...OBJS[obj][slot]));
      sK+=m.k; sP+=m.p; sC+=m.c; sG+=m.g; n++;
    }
    console.log(obj+' '+slot+': '+Math.round(sK/n)+' kcal, P'+Math.round(sP/n)+' C'+Math.round(sC/n)+' G'+Math.round(sG/n)+' (grasa '+Math.round(sG/n*9/(sK/n)*100)+'%)');
  }
}
