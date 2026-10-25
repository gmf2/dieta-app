/* Prototipo LOCAL de ajuste a nivel de dia (no lo usa la UI).
   Compensacion de CANTIDADES entre franjas: los platos elegidos (picks) nunca
   se cambian; solo se re-resuelven sus cantidades buscando el mejor DIA.
   Las porciones se acotan con una tabla explicita de racion razonable
   (documentada en el informe; cualquier tope es revisable). */
'use strict';

// Porcion razonable por componente (gramos). Lo que no esta en la tabla
// mantiene los topes propios del solver por franja.
const RACION_MAX = {
  // grasas
  'Aceite de oliva': 20,            // 2 cucharadas
  // proteinas ancla (carne/pescado/huevo/quesos): pieza grande
  'Atún': 160,                      // 2 latas
  'Huevo': 180, 'Huevo cocido': 180, // 3 huevos
  'Fiambre de pavo': 100, 'Jamón cocido': 80, 'Salmón ahumado': 160,
  'Queso fresco': 100, 'Requesón': 200,   // 2 cazos
  'Yogur natural': 250, 'Yogur griego natural': 250, // 2 yogures
  // pan y cereales
  'Pan integral': 90,               // 3 rebanadas
  'Pan de hamburguesa integral': 65, // 1 pan
  'Tortilla de trigo integral': 180, // 3 tortillas
  'Copos de avena': 140, 'Muesli sin azúcar': 160, // 2 vasos
  'Arroz (en crudo)': 160, 'Arroz integral (en crudo)': 160,
  'Pasta (en crudo)': 160, 'Pasta integral (en crudo)': 160,
  // legumbres
  'Garbanzos cocidos': 400, 'Lentejas cocidas': 400, 'Alubias cocidas': 400,
  'Lentejas (en crudo)': 160, 'Hummus': 90,
  // tuberculos
  'Patata': 450, 'Patata cocida': 450,   // 3 medianas
  'Boniato': 300,                        // 2 boniatos
  // fruta (2 piezas/tajadas)
  'Fruta de temporada': 300, 'Manzana': 300, 'Pera': 300, 'Mango': 400,
  'Plátano': 240, 'Melón': 300, 'Fresas': 200,
  // frutos secos y semillas
  'Nueces': 30, 'Semillas variadas': 30, 'Coco rallado': 30,
  // verduras y hortalizas (2 platos / 2 unidades)
  'Ensalada': 300, 'Ensalada mixta': 300, 'Ensalada variada': 300,
  'Espinacas': 200, 'Brócoli': 300, 'Setas variadas': 200,
  'Verduras crudas': 300, 'Verduras salteadas': 300, 'Verduras variadas': 300,
  'Pimiento y cebolla': 300, 'Pisto casero': 300,
  'Zanahoria y apio': 300, 'Zanahoria y calabacín': 300,
  'Calabacín': 400, 'Calabaza': 400, 'Puerro': 300,
  'Tomate': 240, 'Tomate natural': 240,     // 2 tomates
  'Tomate triturado': 150,                  // 7-8 cucharadas
  'Tomate y lechuga': 300,
  'Maíz dulce': 240,                        // 3 cazos
  'Aguacate': 150,                          // 2 medios
  // bebidas y otros
  'Leche o bebida vegetal': 400,            // 2 vasos
  'Gazpacho casero': 400,                   // 2 vasos
  'Miel': 21,                               // 3 cucharaditas
  'Canela': 3, 'Tinta de sepia': 8
};
const PROT_ANCHOR_MAX = 250;      // pieza grande de carne/pescado

function clampPlan(plan, ING, PROT_ANCHORS) {
  // Acota cantidades a la tabla y recalcula totales. Devuelve plan clamped + flag.
  let clamped = false;
  const items = plan.items.map(it => {
    let max = RACION_MAX[it.name];
    if (max === undefined && PROT_ANCHORS[it.name]) max = PROT_ANCHOR_MAX;
    if (max !== undefined && it.grams > max) { clamped = true; return { name: it.name, grams: max }; }
    return it;
  });
  let k = 0, p = 0, v = 0;
  items.forEach(it => { k += ING[it.name].k * it.grams / 100; p += ING[it.name].p * it.grams / 100; v += it.grams; });
  return { items, kcal: Math.round(k), protein: Math.round(p), kcalRaw: k, proteinRaw: p, vol: v, clamped };
}

/* Candidatos por franja: el plato elegido resuelto a distintos objetivos
   (barrido alrededor del reparto), acotados a racion razonable. */
function slotCandidates(option, ING, PROT_ANCHORS, computePlan, skBase, spBase) {
  const seen = new Map();
  for (let dsk = -150; dsk <= 150; dsk += 15) {
    for (let sp = Math.round(spBase * 0.35); sp <= Math.round(spBase * 2.2); sp += 2) {
      const raw = computePlan(option, skBase + dsk, sp);
      const pl = clampPlan(raw, ING, PROT_ANCHORS);
      const key = pl.items.map(i => i.grams).join(',');
      if (!seen.has(key)) seen.set(key, pl);
    }
  }
  return [...seen.values()];
}

/* Ajuste de dia: elige la combinacion de planes (uno por franja, siempre del
   plato elegido) que minimiza la desviacion del DIA (kcal + 3*proteina). */
function dayPlan(picks, optionsById, ctx) {
  const { ING, PROT_ANCHORS, computePlan, dayTarget, proteinTarget } = ctx;
  const KSH = { desayuno: 0.30, comida: 0.40, cena: 0.30 };
  const cand = {};
  ['desayuno', 'comida', 'cena'].forEach(slot => {
    const o = optionsById(picks[slot]);
    cand[slot] = slotCandidates(o, ING, PROT_ANCHORS, computePlan,
      Math.round(dayTarget * KSH[slot] / 10) * 10, Math.round(proteinTarget * KSH[slot]));
  });
  let best = null, combos = 0;
  for (const d of cand.desayuno) for (const c of cand.comida) for (const n of cand.cena) {
    combos++;
    const dk = d.kcal + c.kcal + n.kcal - dayTarget;
    const dp = d.protein + c.protein + n.protein - proteinTarget;
    const e = Math.abs(dk) + 3 * Math.abs(dp);
    if (!best || e < best.e - 1e-9) best = { e, dk, dp, dkRaw: d.kcalRaw + c.kcalRaw + n.kcalRaw - dayTarget, dpRaw: d.proteinRaw + c.proteinRaw + n.proteinRaw - proteinTarget, desayuno: d, comida: c, cena: n };
  }
  return { dayTarget, proteinTarget, best, combos };
}

module.exports = { dayPlan, slotCandidates, clampPlan, RACION_MAX };
