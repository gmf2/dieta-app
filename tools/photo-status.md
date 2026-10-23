# Estado de fotos (seguimiento)

Actualizado: 2026-10-23 ~10:55 CEST. Commit base: 4f468b7 (wip-v0.1.5).

## Cobertura
- 50 de 70 recetas con foto verificada (15 IA previas + 35 stock CC).
- 21 recetas pendientes de generación IA (cuota 50/día, reset 00:00 Europe/Madrid).

## Pendientes de generación (manifest: tools/img-prompts.json)
Recetas (21): d6, d7, n6, n8, n9, n10, n11, n12, n13, n15, c10, r-ago-c, r-ago-d, r-ene-n, r-feb-d, r-jul-c, r-jun-d, r-jun-n, r-mar-d, r-mar-n, r-nov-d, r-sep-d.
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

## Reglas
- QC estricto: la foto debe mostrar el plato/ejercicio nombrado; una foto aproximada no cuenta como cobertura si faltan ingredientes característicos (Gabriel, vía Main).
- Gabriel no quiere recetas sin foto: priorizar generación de las visibles en la rotación del mes en curso.
- NO publicar (merge a main / release) sin revisión final y OK explícito de Gabriel.
- Cuota: no asumir que todo cabe en un día; dejar margen para regeneraciones y lo que no quepa pasa a la noche siguiente.
