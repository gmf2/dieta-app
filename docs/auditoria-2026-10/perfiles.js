const AF = d => d<=0?1.2:d<=2?1.375:d<=4?1.55:d<=6?1.725:1.9;
const ADJ = { perder:-500, mantener:0, ganar:300 };
const GKG = { perder:2, mantener:1.6, ganar:1.8 };
const SHARE = { desayuno:0.30, comida:0.40, cena:0.30 };
function targets(p, obj) {
  const bmr = 10*p.peso + 6.25*p.altura - 5*p.edad + (p.sexo==='hombre'?5:-161);
  let t = bmr*AF(p.deporte) + ADJ[obj];
  const floor = p.sexo==='hombre'?1500:1200;
  if (t < floor) t = floor;
  t = Math.round(t/10)*10;
  const pg = Math.round(GKG[obj]*p.peso);
  const o = {};
  for (const s of ['desayuno','comida','cena']) o[s] = [Math.round(t*SHARE[s]/10)*10, Math.round(pg*SHARE[s])];
  return { t, o };
}
const PERFILES = {
  'ligera 60kg mujer 165cm 35a dep2': { peso:60, altura:165, edad:35, sexo:'mujer', deporte:2 },
  'scaffold 80kg hombre 175cm 30a dep3': { peso:80, altura:175, edad:30, sexo:'hombre', deporte:3 },
  'pesada 95kg hombre 185cm 28a dep5': { peso:95, altura:185, edad:28, sexo:'hombre', deporte:5 },
};
const all = MEALS.concat(RECIPES);
for (const [pn, p] of Object.entries(PERFILES)) {
  for (const obj of ['perder','mantener','ganar']) {
    const { t, o } = targets(p, obj);
    let worstK = 0, worstKid = '', worstP = 0, worstPid = '', nAviso = 0, nFat = 0;
    for (const op of all) {
      const plan = computePlan(op, ...o[op.slot]);
      let k=0,f=0;
      for (const it of plan.items) { const ing=ING[it.name]; k+=ing.k*it.grams/100; f+=ing.g*it.grams/100; }
      if (Math.abs(plan.dk) > Math.abs(worstK)) { worstK = plan.dk; worstKid = op.id; }
      if (Math.abs(plan.dp) > Math.abs(worstP)) { worstP = plan.dp; worstPid = op.id; }
      if (Math.abs(plan.dk) > 60 || Math.abs(plan.dp) > 10) nAviso++;
      if (k > 0 && f*9/k*100 > 45) nFat++;
    }
    console.log(pn+' / '+obj+': '+t+' kcal-dia | peor dk='+worstK+' ('+worstKid+'), peor dp='+worstP+' ('+worstPid+') | platos con aviso: '+nAviso+'/78 | platos grasa>45%: '+nFat+'/78');
  }
}
