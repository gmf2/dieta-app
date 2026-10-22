// Datos de comidas y recetas. Raciones base en kcal; las cantidades se escalan al objetivo.
const MEALS = [
  { id: 'd1', slot: 'desayuno', name: 'Tostada con tomate', kcal: 420, components: [
      { name: 'Pan integral', grams: 70 }, { name: 'Tomate triturado', grams: 100 },
      { name: 'Aceite de oliva', grams: 10 }, { name: 'Leche o bebida vegetal', grams: 200 }, { name: 'Fruta de temporada', grams: 150 }] },
  { id: 'd2', slot: 'desayuno', name: 'Avena con yogur', kcal: 430, components: [
      { name: 'Copos de avena', grams: 60 }, { name: 'Yogur natural', grams: 150 },
      { name: 'Plátano', grams: 100 }, { name: 'Nueces', grams: 10 }] },
  { id: 'd3', slot: 'desayuno', name: 'Revuelto con aguacate', kcal: 410, components: [
      { name: 'Huevos (2 uds.)', grams: 120 }, { name: 'Pan integral', grams: 50 }, { name: 'Aguacate', grams: 60 }] },
  { id: 'd4', slot: 'desayuno', name: 'Yogur con muesli', kcal: 400, components: [
      { name: 'Yogur griego natural', grams: 170 }, { name: 'Muesli sin azúcar', grams: 50 },
      { name: 'Manzana', grams: 120 }, { name: 'Miel', grams: 10 }] },
  { id: 'c1', slot: 'comida', name: 'Pollo con arroz', kcal: 620, components: [
      { name: 'Pechuga de pollo', grams: 160 }, { name: 'Arroz integral (en crudo)', grams: 70 },
      { name: 'Ensalada mixta', grams: 150 }, { name: 'Aceite de oliva', grams: 10 }] },
  { id: 'c2', slot: 'comida', name: 'Lentejas con verduras', kcal: 580, components: [
      { name: 'Lentejas (en crudo)', grams: 80 }, { name: 'Zanahoria y calabacín', grams: 200 },
      { name: 'Patata', grams: 150 }, { name: 'Aceite de oliva', grams: 10 }] },
  { id: 'c3', slot: 'comida', name: 'Salmón con patata', kcal: 640, components: [
      { name: 'Salmón', grams: 150 }, { name: 'Patata', grams: 250 },
      { name: 'Brócoli', grams: 200 }, { name: 'Aceite de oliva', grams: 10 }] },
  { id: 'c4', slot: 'comida', name: 'Garbanzos con espinacas', kcal: 560, components: [
      { name: 'Garbanzos cocidos', grams: 200 }, { name: 'Espinacas', grams: 200 },
      { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Aceite de oliva', grams: 10 }] },
  { id: 'n1', slot: 'cena', name: 'Merluza con verduras', kcal: 420, components: [
      { name: 'Merluza', grams: 180 }, { name: 'Verduras salteadas', grams: 250 },
      { name: 'Pan integral', grams: 40 }, { name: 'Aceite de oliva', grams: 10 }] },
  { id: 'n2', slot: 'cena', name: 'Tortilla con ensalada', kcal: 400, components: [
      { name: 'Huevos (2 uds.)', grams: 120 }, { name: 'Ensalada variada', grams: 200 },
      { name: 'Pan integral', grams: 40 }, { name: 'Aceite de oliva', grams: 10 }] },
  { id: 'n3', slot: 'cena', name: 'Pavo con boniato', kcal: 430, components: [
      { name: 'Pechuga de pavo', grams: 160 }, { name: 'Boniato', grams: 250 },
      { name: 'Ensalada', grams: 100 }, { name: 'Aceite de oliva', grams: 5 }] },
  { id: 'n4', slot: 'cena', name: 'Crema de calabacín', kcal: 380, components: [
      { name: 'Calabacín', grams: 300 }, { name: 'Pollo desmigado', grams: 120 },
      { name: 'Patata', grams: 100 }, { name: 'Aceite de oliva', grams: 5 }] },
];
const RECIPES = [
    { id: 'r-ene-d', month: 0, slot: 'desayuno', name: 'Porridge de avena y pera', kcal: 430, components: [
        { name: 'Copos de avena', grams: 60 }, { name: 'Pera', grams: 150 }, { name: 'Yogur natural', grams: 150 }, { name: 'Canela', grams: 2 }],
        pasos: ['Cuece la avena con agua o leche 5 minutos.', 'Añade la pera en dados y la canela, y termina con el yogur.'] },
    { id: 'r-ene-c', month: 0, slot: 'comida', name: 'Cocido ligero de garbanzos', kcal: 600, components: [
        { name: 'Garbanzos cocidos', grams: 220 }, { name: 'Zanahoria y apio', grams: 150 }, { name: 'Patata', grams: 150 }, { name: 'Pavo en dados', grams: 100 }],
        pasos: ['Cuece las verduras y la patata 20 minutos.', 'Añade garbanzos y pavo, y cocina 10 minutos más.'] },
    { id: 'r-ene-n', month: 0, slot: 'cena', name: 'Sopa de verduras con huevo', kcal: 380, components: [
        { name: 'Verduras variadas', grams: 300 }, { name: 'Patata', grams: 150 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Aceite de oliva', grams: 5 }],
        pasos: ['Cuece verduras y patata en caldo 20 minutos.', 'Añade el huevo escalfado al final.'] },
    { id: 'r-feb-d', month: 1, slot: 'desayuno', name: 'Tostada con hummus y huevo', kcal: 420, components: [
        { name: 'Pan integral', grams: 70 }, { name: 'Hummus', grams: 60 }, { name: 'Huevo cocido (1 ud.)', grams: 60 }, { name: 'Tomate', grams: 50 }],
        pasos: ['Tuesta el pan y unta el hummus.', 'Corona con el huevo cocido en láminas y tomate.'] },
    { id: 'r-feb-c', month: 1, slot: 'comida', name: 'Estofado de ternera', kcal: 640, components: [
        { name: 'Ternera para guisar', grams: 150 }, { name: 'Patata', grams: 200 }, { name: 'Verduras variadas', grams: 200 }, { name: 'Aceite de oliva', grams: 10 }],
        pasos: ['Dora la ternera y añade las verduras.', 'Cubre con agua y guisa 45 minutos a fuego lento.'] },
    { id: 'r-feb-n', month: 1, slot: 'cena', name: 'Crema de puerro con pollo', kcal: 400, components: [
        { name: 'Puerro', grams: 250 }, { name: 'Patata', grams: 150 }, { name: 'Pollo', grams: 120 }, { name: 'Aceite de oliva', grams: 5 }],
        pasos: ['Cuece puerro y patata 20 minutos y tritura.', 'Añade el pollo a la plancha en dados.'] },
    { id: 'r-mar-d', month: 2, slot: 'desayuno', name: 'Bizcocho de avena en taza', kcal: 430, components: [
        { name: 'Copos de avena', grams: 60 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Yogur natural', grams: 150 }, { name: 'Plátano', grams: 50 }],
        pasos: ['Mezcla avena, huevo y plátano en una taza.', 'Microondas 2-3 minutos y acompaña con el yogur.'] },
    { id: 'r-mar-c', month: 2, slot: 'comida', name: 'Paella de pollo y verduras', kcal: 630, components: [
        { name: 'Arroz (en crudo)', grams: 80 }, { name: 'Pollo', grams: 150 }, { name: 'Verduras variadas', grams: 200 }, { name: 'Aceite de oliva', grams: 10 }],
        pasos: ['Sofríe el pollo y las verduras.', 'Añade arroz y caldo (doble de volumen) y cuece 18 minutos.'] },
    { id: 'r-mar-n', month: 2, slot: 'cena', name: 'Ensalada tibia de lentejas', kcal: 400, components: [
        { name: 'Lentejas cocidas', grams: 180 }, { name: 'Queso fresco', grams: 80 }, { name: 'Verduras crudas', grams: 150 }, { name: 'Aceite de oliva', grams: 10 }],
        pasos: ['Mezcla las lentejas templadas con las verduras.', 'Añade el queso fresco y aliña.'] },
    { id: 'r-abr-d', month: 3, slot: 'desayuno', name: 'Tostada de aguacate y salmón', kcal: 430, components: [
        { name: 'Pan integral', grams: 60 }, { name: 'Aguacate', grams: 60 }, { name: 'Salmón ahumado', grams: 40 }, { name: 'Yogur natural', grams: 100 }],
        pasos: ['Tuesta el pan y unta el aguacate.', 'Corona con el salmón y acompaña con el yogur.'] },
    { id: 'r-abr-c', month: 3, slot: 'comida', name: 'Arroz negro con sepia', kcal: 620, components: [
        { name: 'Arroz (en crudo)', grams: 80 }, { name: 'Sepia', grams: 150 }, { name: 'Pimiento y cebolla', grams: 150 }, { name: 'Aceite de oliva', grams: 10 }],
        pasos: ['Sofríe la sepia con las verduras.', 'Añade arroz, caldo y tinta; cuece 18 minutos.'] },
    { id: 'r-abr-n', month: 3, slot: 'cena', name: 'Pescado en papillote', kcal: 400, components: [
        { name: 'Pescado blanco', grams: 180 }, { name: 'Verduras variadas', grams: 250 }, { name: 'Patata', grams: 150 }, { name: 'Aceite de oliva', grams: 10 }],
        pasos: ['Coloca todo en papel de horno con un hilo de aceite.', 'Hornea 20 minutos a 180 °C.'] },
    { id: 'r-may-d', month: 4, slot: 'desayuno', name: 'Yogur con fresas y avena', kcal: 400, components: [
        { name: 'Yogur natural', grams: 170 }, { name: 'Fresas', grams: 150 }, { name: 'Copos de avena', grams: 50 }, { name: 'Nueces', grams: 10 }],
        pasos: ['Sirve el yogur en un bol.', 'Añade fresas, avena y nueces por encima.'] },
    { id: 'r-may-c', month: 4, slot: 'comida', name: 'Pasta integral con atún', kcal: 630, components: [
        { name: 'Pasta integral (en crudo)', grams: 80 }, { name: 'Atún', grams: 120 }, { name: 'Tomate natural', grams: 200 }, { name: 'Aceite de oliva', grams: 10 }],
        pasos: ['Cuece la pasta.', 'Saltea con tomate y añade el atún al final.'] },
    { id: 'r-may-n', month: 4, slot: 'cena', name: 'Pisto con huevo', kcal: 380, components: [
        { name: 'Pisto casero', grams: 300 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Pan integral', grams: 40 }, { name: 'Aceite de oliva', grams: 10 }],
        pasos: ['Calienta el pisto.', 'Añade el huevo a la plancha o escalfado encima.'] },
    { id: 'r-jun-d', month: 5, slot: 'desayuno', name: 'Bol de mango y yogur', kcal: 410, components: [
        { name: 'Mango', grams: 150 }, { name: 'Yogur natural', grams: 170 }, { name: 'Copos de avena', grams: 40 }, { name: 'Coco rallado', grams: 10 }],
        pasos: ['Tritura medio mango con el yogur.', 'Añade el resto en dados con avena y coco.'] },
    { id: 'r-jun-c', month: 5, slot: 'comida', name: 'Ensalada de garbanzos y atún', kcal: 560, components: [
        { name: 'Garbanzos cocidos', grams: 200 }, { name: 'Atún', grams: 80 }, { name: 'Verduras crudas', grams: 200 }, { name: 'Aceite de oliva', grams: 10 }],
        pasos: ['Mezcla todo en un bol grande.', 'Aliña con aceite, limón y sal.'] },
    { id: 'r-jun-n', month: 5, slot: 'cena', name: 'Brocheta de pollo y verduras', kcal: 400, components: [
        { name: 'Pollo en dados', grams: 150 }, { name: 'Verduras variadas', grams: 250 }, { name: 'Pan integral', grams: 40 }, { name: 'Aceite de oliva', grams: 5 }],
        pasos: ['Ensarta pollo y verduras alternados.', 'Haz a la plancha 10-12 minutos girando.'] },
    { id: 'r-jul-d', month: 6, slot: 'desayuno', name: 'Tostada fría de yogur y fruta', kcal: 400, components: [
        { name: 'Pan integral', grams: 60 }, { name: 'Yogur natural', grams: 150 }, { name: 'Fruta de temporada', grams: 150 }, { name: 'Semillas variadas', grams: 10 }],
        pasos: ['Tuesta el pan y deja enfriar.', 'Unta el yogur y cubre con fruta y semillas.'] },
    { id: 'r-jul-c', month: 6, slot: 'comida', name: 'Ensalada de pasta con pollo', kcal: 620, components: [
        { name: 'Pasta (en crudo)', grams: 80 }, { name: 'Pollo a la plancha', grams: 120 }, { name: 'Verduras crudas', grams: 200 }, { name: 'Aceite de oliva', grams: 10 }],
        pasos: ['Cuece la pasta y enfría.', 'Mezcla con pollo, verduras y aliño.'] },
    { id: 'r-jul-n', month: 6, slot: 'cena', name: 'Gazpacho con huevo y atún', kcal: 380, components: [
        { name: 'Gazpacho casero', grams: 300 }, { name: 'Huevo cocido (1 ud.)', grams: 60 }, { name: 'Atún', grams: 60 }, { name: 'Pan integral', grams: 40 }],
        pasos: ['Sirve el gazpacho bien frío.', 'Añade huevo picado y atún por encima.'] },
    { id: 'r-ago-d', month: 7, slot: 'desayuno', name: 'Bol de melón con yogur', kcal: 400, components: [
        { name: 'Melón', grams: 200 }, { name: 'Yogur natural', grams: 170 }, { name: 'Copos de avena', grams: 50 }],
        pasos: ['Sirve el yogur en un bol.', 'Añade el melón en dados y la avena.'] },
    { id: 'r-ago-c', month: 7, slot: 'comida', name: 'Pollo frío con tomate y maíz', kcal: 600, components: [
        { name: 'Pollo asado', grams: 150 }, { name: 'Maíz dulce', grams: 100 }, { name: 'Tomate y lechuga', grams: 200 }, { name: 'Pan integral', grams: 60 }],
        pasos: ['Desmenuza el pollo frío.', 'Mezcla con tomate, lechuga y maíz; aliña.'] },
    { id: 'r-ago-n', month: 7, slot: 'cena', name: 'Salmón a la plancha', kcal: 450, components: [
        { name: 'Salmón', grams: 140 }, { name: 'Ensalada variada', grams: 250 }, { name: 'Pan integral', grams: 40 }, { name: 'Aceite de oliva', grams: 10 }],
        pasos: ['Haz el salmón a la plancha 3-4 minutos por lado.', 'Acompaña con la ensalada aliñada.'] },
    { id: 'r-sep-d', month: 8, slot: 'desayuno', name: 'Tortitas de avena y plátano', kcal: 430, components: [
        { name: 'Copos de avena', grams: 60 }, { name: 'Plátano', grams: 100 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Yogur natural', grams: 100 }],
        pasos: ['Tritura todo y haz tortitas en sartén antiadherente.', 'Sirve con el yogur.'] },
    { id: 'r-sep-c', month: 8, slot: 'comida', name: 'Arroz integral con huevo', kcal: 600, components: [
        { name: 'Arroz integral (en crudo)', grams: 80 }, { name: 'Verduras variadas', grams: 250 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Aceite de oliva', grams: 10 }],
        pasos: ['Cuece el arroz y saltea las verduras.', 'Corona con un huevo a la plancha.'] },
    { id: 'r-sep-n', month: 8, slot: 'cena', name: 'Calamares a la plancha', kcal: 400, components: [
        { name: 'Calamares', grams: 150 }, { name: 'Ensalada variada', grams: 200 }, { name: 'Pan integral', grams: 50 }, { name: 'Aceite de oliva', grams: 10 }],
        pasos: ['Haz los calamares a la plancha 2-3 minutos.', 'Acompaña con la ensalada.'] },
    { id: 'r-oct-d', month: 9, slot: 'desayuno', name: 'Porridge con manzana asada', kcal: 430, components: [
        { name: 'Copos de avena', grams: 60 }, { name: 'Manzana', grams: 150 }, { name: 'Yogur natural', grams: 150 }, { name: 'Nueces', grams: 10 }],
        pasos: ['Cuece la avena 5 minutos.', 'Añade la manzana salteada con canela y las nueces.'] },
    { id: 'r-oct-c', month: 9, slot: 'comida', name: 'Guiso de pollo y calabaza', kcal: 620, components: [
        { name: 'Pollo', grams: 160 }, { name: 'Calabaza', grams: 250 }, { name: 'Patata', grams: 150 }, { name: 'Aceite de oliva', grams: 10 }],
        pasos: ['Dora el pollo y añade calabaza y patata.', 'Cubre con caldo y guisa 25 minutos.'] },
    { id: 'r-oct-n', month: 9, slot: 'cena', name: 'Setas salteadas con huevo', kcal: 390, components: [
        { name: 'Setas variadas', grams: 250 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Pan integral', grams: 40 }, { name: 'Aceite de oliva', grams: 10 }],
        pasos: ['Saltea las setas con ajo.', 'Añade el huevo y remueve hasta cuajar.'] },
    { id: 'r-nov-d', month: 10, slot: 'desayuno', name: 'Tostada con requesón y nueces', kcal: 420, components: [
        { name: 'Pan integral', grams: 70 }, { name: 'Requesón', grams: 100 }, { name: 'Nueces', grams: 15 }, { name: 'Fruta de temporada', grams: 100 }],
        pasos: ['Tuesta el pan y unta el requesón.', 'Añade las nueces y acompaña con fruta.'] },
    { id: 'r-nov-c', month: 10, slot: 'comida', name: 'Albóndigas de pavo con arroz', kcal: 640, components: [
        { name: 'Pavo picado', grams: 160 }, { name: 'Arroz (en crudo)', grams: 70 }, { name: 'Tomate natural', grams: 150 }, { name: 'Aceite de oliva', grams: 10 }],
        pasos: ['Forma las albóndigas y dóralas.', 'Cuece en salsa de tomate 15 minutos y sirve con arroz.'] },
    { id: 'r-nov-n', month: 10, slot: 'cena', name: 'Crema de calabaza con pavo', kcal: 390, components: [
        { name: 'Calabaza', grams: 300 }, { name: 'Pavo en dados', grams: 120 }, { name: 'Patata', grams: 100 }, { name: 'Aceite de oliva', grams: 5 }],
        pasos: ['Cuece calabaza y patata, y tritura.', 'Añade el pavo salteado por encima.'] },
    { id: 'r-dic-d', month: 11, slot: 'desayuno', name: 'Tostada con jamón cocido', kcal: 430, components: [
        { name: 'Pan integral', grams: 70 }, { name: 'Jamón cocido', grams: 60 }, { name: 'Aceite de oliva', grams: 5 }, { name: 'Yogur natural', grams: 150 }],
        pasos: ['Tuesta el pan con un hilo de aceite.', 'Añade el jamón y acompaña con el yogur.'] },
    { id: 'r-dic-c', month: 11, slot: 'comida', name: 'Alubias con verduras', kcal: 620, components: [
        { name: 'Alubias cocidas', grams: 220 }, { name: 'Verduras variadas', grams: 200 }, { name: 'Pavo en dados', grams: 100 }, { name: 'Aceite de oliva', grams: 5 }],
        pasos: ['Sofríe las verduras.', 'Añade alubias y pavo, y cocina 15 minutos.'] },
    { id: 'r-dic-n', month: 11, slot: 'cena', name: 'Lubina al horno', kcal: 420, components: [
        { name: 'Lubina', grams: 180 }, { name: 'Verduras variadas', grams: 250 }, { name: 'Patata', grams: 150 }, { name: 'Aceite de oliva', grams: 10 }],
        pasos: ['Hornea la lubina con las verduras 20 minutos a 180 °C.', 'Sirve con un hilo de aceite.'] },
];

const MONTHS = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const SLOT_LABEL = { desayuno: 'Desayuno', comida: 'Comida', cena: 'Cena' };
const SLOT_SHARE = { desayuno: 0.30, comida: 0.40, cena: 0.30 };
const SLOT_EMOJI = { desayuno: '🥣', comida: '🍲', cena: '🍽️' };
