# Auditoría de macros NutriSport (oct 2026) — evidencia y método

## Fuentes trazables
- USDA SR Legacy estático (sin API): https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_sr_legacy_food_json_2021-10-28.zip
  (índice: https://fdc.nal.usda.gov/fdc-datasets/). Nutrientes por 100g: energía id 1008 (kcal), proteína 1003, carbohidratos 1005, grasa 1004. Cuando falta kcal directo (jamón), energía por Atwater (p*4+c*4+g*9).
- EFSA DRV adultos: grasa 20-35% energía, hidratos 45-60% energía.
  https://www.efsa.europa.eu/en/press/news/nda100326 · https://www.efsa.europa.eu/sites/default/files/2017_09_DRVs_summary_report.pdf
  Referencia poblacional, no objetivo personal del usuario. El umbral de plato 40% grasa es un margen operativo sobre esa banda; no garantiza 35% diario.

## Scripts (node, se concatenan tras data.js: `cat app/src/main/assets/www/data.js <script> > /tmp/run.js && node /tmp/run.js`)
- verify.py + verify-out.txt: mapeo curado de los 83 ING a descripciones SR Legacy y tabla de desviaciones. 61/83 dentro de ±15% kcal; 8 corregidos (crudo/cocido); 10 composites propios sin equivalente directo; 11 variantes de producto documentadas (atún, hummus, merluza (sin hake en SR), muesli, ternera guisar, jamón cocido, leche semi, queso fresco, semillas, maíz, ensaladas).
- dayfit.js: simula 12 meses x 9 combos perfilxobjetivo con el pick por defecto (best-fit) de renderHoy. Métrica UX real.
- perfiles.js: peor plato del catálogo completo por perfil (peor elección manual permitida).
- macros.js: platos con grasa>45% kcal + 1500 combos diarios por objetivo (perfil scaffold 80kg).
- driver.js: dump kcal/prot por plato y objetivo (scaffold).
- pasos-audit.js: coherencia componentes<->pasos (alias conocido: 'Copos de avena' se cita como 'avena').

## Residuos declarados (aceptación pendiente del usuario vía main)
- n24 (wrap de salmón ahumado) en perder: 46% kcal de grasa (suelo de identidad: huevo+salmón+aguacate).
- Exceso de proteína diario ~+15-25g por mínimos de pieza; aviso honesto en perfiles extremos.
- Peor elección manual permitida: c10 +346 kcal (ligera60/perder), r-mar-c -426 (pesada95/ganar), r-abr-c -312 (pesada95/mantener): aviso+sugerencia no lo cubre entero.
- Volumen máximo 1475g solo en el extremo 1480 kcal/franja (tope 1560).
- Foto de r-oct-n no representa pollo ni patata (placeholder de generación nueva NO autorizada).
- Pasos de clásicos (incl. n17-n24 burgers/wraps y d7) existen en datos pero ninguna vista los muestra; n17-n24 sin foto (saldría 'Foto pendiente').
