# Estado de fotos (seguimiento)

Actualizado: 2026-10-23 ~10:55 CEST. Commit base: 4f468b7 (wip-v0.1.5).

## Cobertura
- 50 de 70 recetas con foto verificada (15 IA previas + 35 stock CC).
- 21 recetas pendientes de generación IA (cuota 50/día, reset 00:00 Europe/Madrid).

## Pendientes de generación (manifest: tools/img-prompts.json)
Recetas (21 + 2 por rediseño: c4, r-oct-c): d6, d7, n6, n8, n9, n10, n11, n12, n13, n15, c10, r-ago-c, r-ago-d, r-ene-n, r-feb-d, r-jul-c, r-jun-d, r-jun-n, r-mar-d, r-mar-n, r-nov-d, r-sep-d.
- n6 y n9 están en la rotación de cena de octubre (visibles HOY con icono).
- n10 tiene foto stock APROXIMADA (tabla de embutidos genérica; no muestra queso fresco ni nueces con claridad) - la generación IA debe reemplazarla si sale mejor. No presentar como cobertura estricta.
Ejercicios (28): ex-* (ver manifest). Skills: skill-frontlever-tuck (si falta).

## Rechazadas en QC estricto (2026-10-23, revisión Gabriel)
- n9: stock mostraba tacos; no tostas de atún y aguacate.
- n10: stock mostraba tortitas/chips; sustituida por tabla aproximada (ver arriba).
- n6: stock mostraba fideos; no salteado con arroz.
- c10: stock mostraba dips/crudité; sustituida por hummus en tostada (CC0) - aceptable, plato base correcto.
- n12: stock mostraba dal indio con roti; no ensalada de lentejas.
- n13: huevo crudo en sartén; poco apetecible/poco claro.
- r-ago-c: pollo jerk con arroz; no pollo frío con tomate y maíz.
- n5 (primer stock): bowl de sopa; sustituida por lubina a la plancha con verduritas (CC BY-SA 2.0) - verificada.


## Desajustes por rediseño de platos (2026-10-23 ~12:15 CEST)
Los platos se rediseñaron para cuadrar macros; las fotos existentes ya no muestran el plato actual
(QC estricto: NO cuentan como cobertura hasta regenerar):
- r-oct-c: ahora "Arroz con pollo y calabaza" (antes guiso). VERIFICADA 12:14: la foto actual es un guiso con patata, sin arroz visible - no sirve. Prompt: meal-r-oct-c.
- c4: ahora "Garbanzos con espinacas y pollo" (lleva pollo y patata). VERIFICADA 12:14: la foto actual muestra garbanzos con espinacas y HUEVO, sin pollo - no sirve. Prompt: meal-c4.
- r-abr-d: ahora "Tostada de aguacate y salmón". VERIFICADA 2026-10-23 12:14: la foto stock actual (CC0, Andy Li) muestra exactamente tostada con aguacate y salmón ahumado - sigue valiendo, NO hace falta regenerar.
- d7: ahora "Tortitas de avena y plátano" (antes tostada de pavo). Ya estaba pendiente de generación; prompt corregido (meal-d7).
- 6 platos rápidos usan ahora "Patata cocida" (n9, n13, n14, n15, n16, c10): las fotos pendientes deben mostrar patata cocida, no cruda ni frita.


## Busqueda stock diurna (2026-10-23 ~12:31 CEST, pedido de Gabriel: "busca en internet y las copias")
- r-oct-c CUBIERTA con stock: Arroz-con-Pollo.jpg (Kobako, CC BY-SA 2.5, Wikimedia). Arroz+pollo visibles; calabaza no visible (secundaria). Instalada y en credits.json. Si la IA genera esta noche una con calabaza visible, puede reemplazarla.
- n6: stock rechazado x2 (arroz thai con huevo / plato sizzling con fuente vacia) - sigue pendiente de IA.
- Pipeline corregido: thumb.wikimedia.org bloquea esta IP (403/429); descargar ORIGINALES de upload.wikimedia.org y redimensionar local (PIL, 640px, q82). Openverse API funciona pero con cortes; reintentar.
- Continua la busqueda del resto (d6, d7, n8-n16, c4, c10, r-*) en wakes de continuacion; la generacion IA de 00:20 queda como respaldo para lo que el stock no cubra.

## Reglas
- QC estricto: la foto debe mostrar el plato/ejercicio nombrado; una foto aproximada no cuenta como cobertura si faltan ingredientes característicos (Gabriel, vía Main).
- Gabriel no quiere recetas sin foto: priorizar generación de las visibles en la rotación del mes en curso.
- NO publicar (merge a main / release) sin revisión final y OK explícito de Gabriel.
- Cuota: no asumir que todo cabe en un día; dejar margen para regeneraciones y lo que no quepa pasa a la noche siguiente.


## 2026-10-23 13:00 - Estado tras oleada stock 2
- INSTALADAS stock (en wip-v0.1.5, pusheado cecb8ba): d6, d7, n6 (Unsplash), n9, n13, r-jun-d, r-jun-n, r-mar-n, r-sep-d. 9 platos.
- c4 REVERTIDO a IA antigua: potaje sin pollo != receta (lleva pollo). c4 PENDIENTE. La IA antigua tampoco muestra pollo -> prioridad alta regeneracion IA 00:20 (garbanzos+espinacas+pollo+patata).
- PENDIENTES (13 platos): c4, n8, n10, n11, n12, n15, c10, r-ago-c, r-ago-d, r-ene-n, r-feb-d, r-jul-c, r-mar-d, r-nov-d + 28 ex-* + skill-frontlever-tuck.
- Near-misses: n8 (sin nueces), n15 (sin atun), c10 (deconstruido).
- Textos de procedencia actualizados (index.html footer + app.js creditos) con Unsplash.
- Commons thumbs: usar thumburl EXACTO de la API (960px); reescribir a 640px da 400 (Wikimedia restringe tamanos). upload.wikimedia.org 429 desde sandbox; thumb.wikimedia.org OK con thumburl exacto.


## 2026-10-23 13:03 - Cierre fase stock (acotada por parent)
- n10 INSTALADA (sin commit): "Plato de jamón y queso" Juan Fernández CC BY-SA 2.0 — jamon+queso+almendras visibles (variedad: queso curado/almendras vs queso fresco/nueces; parent puede vetar). En repo assets + credits (53 entradas) + webapp. PENDIENTE DE COMMIT (parent: agrupar pushes).
- STOCK CUBIERTO total fase: r-oct-c + d6, d7, n6, n9, n10, n13, r-jun-d, r-jun-n, r-mar-n, r-sep-d = 11 platos.
- PENDIENTES platos (13, cola IA 00:20): c4 (prioridad, IA antigua sin pollo), n8, n11, n12, n15, c10, r-ago-c, r-ago-d, r-ene-n, r-feb-d, r-jul-c, r-mar-d, r-nov-d.
- ex-* (28) + skill-frontlever-tuck: pase acotado NO hecho aun (busqueda Commons/Unsplash acotada pendiente).
- NUEVA TAREA (prioridad Gabriel 13:02): rehacer Calistenia = sesiones COMPLETAS por skill (front lever lo nombra expresamente), 5-7 bloques con variantes + series/reps/tiempos, ref: 4 pizarras en /downloads/image-*.jpg (2 muscle-up, pierna-movilidad, handstand-straddle planche). Investigar en internet. Ambiguos sin resolver: MT, AF (al fallo), "100 a 200 x1", "10z". Preservar progresiones sin nivel pro. Sin release nueva automatica.


## 2026-10-23 13:04 - VETO parent n10
- n10 REVERTIDA a foto anterior de main (parent: queso curado+almendras != queso fresco+nueces; no acomodar receta a foto). n10 vuelve a PENDIENTES.
- PENDIENTES platos ahora 14: c4, n8, n10, n11, n12, n15, c10, r-ago-c, r-ago-d, r-ene-n, r-feb-d, r-jul-c, r-mar-d, r-nov-d.
- Stock cubierto definitivo fase: 10 platos (r-oct-c, d6, d7, n6, n9, n13, r-jun-d, r-jun-n, r-mar-n, r-sep-d).
- Calistenia: disenar rutina PROPIA contrastada (no transcripcion exacta de pizarras); abreviaturas ambiguas no hace falta preguntar si diseno propio. Pizarras = referencia de estructura/volumen.

- n9: RECHAZADA 13:41 (Main): la tostada Commons es atun CRUDO estilo ceviche, no tostas de atun; preparacion caracteristica distinta. Pasa a pendientes IA.
