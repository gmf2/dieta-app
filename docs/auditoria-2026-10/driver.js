const PLURAL_IRREG = { yogur: 'yogures', 'calabacín': 'calabacines', 'porción': 'porciones', puerro: 'puerros',
  'medio aguacate': 'medios aguacates', 'patata mediana': 'patatas medianas', 'boniato mediano': 'boniatos medianos' };
function plural(label, n) {
  if (n === 1) return label;
  if (PLURAL_IRREG[label]) return PLURAL_IRREG[label];
  if (/s$/.test(label)) return label;
  if (/[aeiouáéíóú]$/.test(label)) return label + 's';
  return label + 'es';
}
function household(name, grams) {
  var ing = ING[name]; if (!ing) return '';
  var n = Math.round(grams / ing.ug);
  return n + ' ' + plural(ing.u, n);
}
const OBJS = {
  mantener: { desayuno: [810, 38], comida: [1080, 51], cena: [810, 38] },
  perder:   { desayuno: [663, 45], comida: [884, 67], cena: [663, 48] },
  ganar:    { desayuno: [903, 43], comida: [1204, 58], cena: [903, 43] },
};
const all = MEALS.concat(RECIPES);
for (const obj of Object.keys(OBJS)) {
  console.log('===== ' + obj + ' =====');
  let worst = [];
  all.forEach(o => {
    const [sk, sp] = OBJS[obj][o.slot];
    const plan = computePlan(o, sk, sp);
    if (Math.abs(plan.dk) > 45 || Math.abs(plan.dp) > 8) worst.push(o.id + ':' + o.slot + ' dk=' + plan.dk + ' dp=' + plan.dp);
    if (obj === 'mantener') {
      const parts = plan.items.map(it => it.name + ' ' + it.grams + 'g (' + household(it.name, it.grams) + ')');
      console.log('\n[' + o.id + '] ' + o.slot + ' · ' + o.name + ' → ~' + plan.kcal + ' kcal ~' + plan.protein + 'g prot (dk=' + plan.dk + ' dp=' + plan.dp + ')');
      console.log('   ' + parts.join(' | '));
    }
  });
  console.log('\n[' + obj + '] fuera de tolerancia (|dk|>45 o |dp|>8): ' + (worst.length ? worst.join(' ; ') : 'ninguna'));
}
