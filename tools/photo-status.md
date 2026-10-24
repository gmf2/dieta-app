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

## 2026-10-24 00:40 CEST - Oleada IA nocturna (agente nuevo, retoma trabajo perdido)
- GENERADAS E INSTALADAS 15 platos (IA, QC visual estricto, componentes verificados contra data.js RECIPE_REPLACE/RECIPE_ADD): n8, n9 (con patata cocida), n10 (jamón cocido+queso fresco+nueces+pan; reemplaza stock aproximado), n11, n12, n15 (con patata cocida), c4 (garbanzos+espinacas+pollo+patata; reemplaza IA antigua sin pollo), c10 (hummus+pollo asado+patata), r-ago-c, r-ago-d, r-ene-n, r-feb-d, r-jul-c, r-mar-d, r-nov-d. PHOTO_IDS actualizado.
- RECUPERADAS 3 fotos Commons perdidas con el agente anterior (re-descargadas y verificadas): ex-cal-flexiones (Girl doing push-ups on a rock, CC BY 2.0 PTPioneer), ex-cal-sentadilla (Stay fit anywhere anytime 6186146, PD USAF; SENALADA EN REVISION: es una sentadilla LASTRADA con mochila - NO es imagen exacta de sentadilla a peso corporal; mismo patron de movimiento. Pendiente decision parent/Gabriel: mantener o sustituir), ex-skill-pino-flexiones (Handstand pushup, PD USAF). credits.json 54 entradas.
- GENERADOS E INSTALADOS 12 ejercicios (IA, postura contrastada y verificable): cal-pike, cal-remo-mesa, manc-fondos-banco, skill-dominada-explosiva, skill-fondos-barra, skill-kipping, skill-frontlever-tuck, skill-frontlever-advtuck, skill-frontlever-subidas, skill-pino-caminata, skill-planche-lean, skill-pseudo-pushup.
- PENDIENTES DECLARADOS 2 (fallback SVG): skill-frontlever-negativa (generada: palanca extendida estática; RETENIDA por precedente parent: no usar foto estática de posición como demostración de negativa - imagen disponible si parent decide), skill-muscleup-negativo (veto parent a transición estática; sin generar).
- 0 platos pendientes. Sin merge a main ni release: pendiente OK explícito de Gabriel.

## 2026-10-24 00:43 CEST - FIX CRITICO
- Corregida coma que faltaba en PHOTO_IDS (app.js:19) introducida en ff3f798: el literal quedaba como `'r-sep-d':1  'n8':1` (SyntaxError que rompia TODA la app, pantallas vacias). Detectado al preparar capturas en navegador headless. Verificado con node --check y render real en Chrome: app vuelve a renderizar.

## 2026-10-24 00:52 CEST - Correcciones de revision parent (fotos heredadas + sentadilla)
- RECHAZADA r-ene-c "Cocido ligero de garbanzos" (heredada, stock): mostraba una rodaja de CHORIZO y la receta lleva PAVO (confirmado visualmente). SUSTITUIDA por IA: cocido ligero de garbanzos con pavo, zanahoria, apio y patata, caldo claro.
- SUSTITUIDA r-nov-c "Albondigas de pavo con arroz" (heredada: arroz sin albondigas) por IA: 5 albondigas en salsa de tomate con arroz.
- SUSTITUIDA r-jul-d "Tostada fria de yogur y fruta" (heredada: mesa de brunch generica) por IA: tostada integral con yogur griego, fresas, arandanos, kiwi y semillas.
- SUSTITUIDA r-mar-c "Paella de pollo y verduras" (heredada: pixelada/oscura) por IA: paella de pollo y verduras nitida.
- SUSTITUIDA ex-cal-sentadilla (Commons USAF, sentadilla LASTRADA con mochila) por IA de sentadilla a peso corporal exacta (sin carga), por decision de parent sin necesidad de consultar. Credito Commons eliminado de credits.json (53 entradas); la foto Commons ya no se usa.
- Estado platos: 0 pendientes salvo nueva revision. Ejercicios pendientes: skill-frontlever-negativa y skill-muscleup-negativo (fallback SVG, decision cerrada).

## 2026-10-24 00:54 CEST - QC tecnico parent: 5 ejercicios retirados a fallback
- RETIRADAS a fallback SVG (onerror automatico, archivos eliminados) por no superar QC tecnico de postura en revision de parent: skill-frontlever-tuck (tronco diagonal), skill-frontlever-advtuck (caderas bajas/rodillas muy flexionadas), skill-frontlever-subidas (parece elevacion de rodillas colgado), skill-planche-lean (sin inclinacion caracteristica suficiente), skill-dominada-explosiva (solo barbilla cerca de barra, no pecho a barra). Sin nueva ronda de generacion por decision de parent.
- APROBADA ex-cal-sentadilla (IA peso corporal).
- El resto de fotos IA de ejercicios instaladas quedan como ILUSTRACION, no demostracion tecnica certificada.
- Ejercicios pendientes con fallback SVG (7): skill-frontlever-tuck, skill-frontlever-advtuck, skill-frontlever-subidas, skill-planche-lean, skill-dominada-explosiva, skill-frontlever-negativa, skill-muscleup-negativo.


## 2026-10-24 10:10 - Auditoría completa por variante y plato
El estado vigente es tools/photo-audit-2026-10-24.md y su inventario JSON. 53/70 platos con imagen, 17 pendientes. Calistenia: 54/108 filas con ilustración, 54 pendientes. Total ejercicios: 128/184 con imagen, 56 pendientes. Ningún dato de receta o rutina cambiado. Sin publicar. Se retiran aproximaciones heredadas, no se declara cobertura por mera existencia del archivo.

### Actualización 10:14: fuentes reales
Dos archivos Commons CC BY-SA 4.0 añadidos, tres filas. Calistenia 57 con ilustración / 51 pendientes; total ejercicios 131 con ilustración / 53 pendientes. 17 comidas ABIERTAS. No importar imágenes de free-exercise-db: derechos no acreditados según su mantenedor. Detalles y procedencia en photo-audit-2026-10-24.md/json.
