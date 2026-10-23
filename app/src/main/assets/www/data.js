// Datos de comidas y recetas. kcal por opción calculadas con valores USDA FoodData Central (kcal/100g).

// ING: kcal por 100 g + medida casera (gramos por unidad).

const ING = {
  'Aceite de oliva': { p: 0, k: 884, ug: 9, u: 'cucharada' },
  'Aguacate': { p: 2, k: 160, ug: 75, u: 'medio aguacate' },
  'Alubias cocidas': { p: 9, k: 127, ug: 150, u: 'cazo' },
  'Arroz (en crudo)': { p: 7.1, k: 360, ug: 150, u: 'vaso' },
  'Arroz integral (en crudo)': { p: 7.9, k: 360, ug: 150, u: 'vaso' },
  'Atún': { p: 26, k: 116, ug: 80, u: 'lata' },
  'Boniato': { p: 1.6, k: 86, ug: 150, u: 'boniato mediano' },
  'Brócoli': { p: 2.8, k: 34, ug: 150, u: 'plato' },
  'Calabacín': { p: 1.2, k: 17, ug: 200, u: 'calabacín' },
  'Calabaza': { p: 1, k: 26, ug: 200, u: 'porción' },
  'Calamares': { p: 15.6, k: 92, ug: 150, u: 'porción' },
  'Canela': { p: 4, k: 247, ug: 1, u: 'pizca' },
  'Coco rallado': { p: 6.9, k: 660, ug: 6, u: 'cucharada' },
  'Copos de avena': { p: 16.9, k: 389, ug: 70, u: 'vaso' },
  'Ensalada': { p: 1.2, k: 20, ug: 100, u: 'plato' },
  'Ensalada mixta': { p: 1.2, k: 20, ug: 100, u: 'plato' },
  'Ensalada variada': { p: 1.2, k: 20, ug: 100, u: 'plato' },
  'Espinacas': { p: 2.9, k: 23, ug: 100, u: 'plato' },
  'Fresas': { p: 0.7, k: 32, ug: 12, u: 'fresa' },
  'Fruta de temporada': { p: 0.8, k: 55, ug: 150, u: 'pieza' },
  'Garbanzos cocidos': { p: 8.9, k: 164, ug: 150, u: 'cazo' },
  'Gazpacho casero': { p: 0.9, k: 45, ug: 200, u: 'vaso' },
  'Huevo (1 ud.)': { p: 12.6, k: 155, ug: 60, u: 'huevo' },
  'Huevo cocido (1 ud.)': { p: 12.6, k: 155, ug: 60, u: 'huevo' },
  'Huevos (2 uds.)': { p: 12.6, k: 155, ug: 60, u: 'huevo' },
  'Hummus': { p: 7.9, k: 166, ug: 15, u: 'cucharada' },
  'Jamón cocido': { p: 16, k: 110, ug: 20, u: 'loncha' },
  'Leche o bebida vegetal': { p: 3, k: 46, ug: 200, u: 'vaso' },
  'Lentejas (en crudo)': { p: 24.6, k: 352, ug: 160, u: 'vaso' },
  'Lentejas cocidas': { p: 9, k: 116, ug: 150, u: 'cazo' },
  'Lubina': { p: 18.4, k: 97, ug: 150, u: 'filete' },
  'Mango': { p: 0.8, k: 60, ug: 200, u: 'mango' },
  'Manzana': { p: 0.3, k: 52, ug: 150, u: 'manzana' },
  'Maíz dulce': { p: 3.3, k: 86, ug: 80, u: 'cazo' },
  'Melón': { p: 0.8, k: 34, ug: 150, u: 'tajada' },
  'Merluza': { p: 17, k: 90, ug: 150, u: 'filete' },
  'Miel': { p: 0.3, k: 304, ug: 7, u: 'cucharadita' },
  'Muesli sin azúcar': { p: 10, k: 360, ug: 80, u: 'vaso' },
  'Nueces': { p: 15.2, k: 654, ug: 15, u: 'puñado' },
  'Pan integral': { p: 13, k: 247, ug: 30, u: 'rebanada' },
  'Pasta (en crudo)': { p: 13, k: 360, ug: 40, u: 'puñado' },
  'Pasta integral (en crudo)': { p: 13.9, k: 350, ug: 40, u: 'puñado' },
  'Patata': { p: 2, k: 77, ug: 150, u: 'patata mediana' },
  'Pavo en dados': { p: 22, k: 135, ug: 150, u: 'porción' },
  'Pavo picado': { p: 20, k: 150, ug: 150, u: 'porción' },
  'Pechuga de pavo': { p: 22, k: 135, ug: 150, u: 'filete' },
  'Fiambre de pavo': { p: 21, k: 110, ug: 20, u: 'loncha' },
  'Pechuga de pollo': { p: 22.5, k: 165, ug: 150, u: 'filete' },
  'Pera': { p: 0.4, k: 57, ug: 150, u: 'pera' },
  'Pescado blanco': { p: 17, k: 90, ug: 150, u: 'filete' },
  'Pimiento y cebolla': { p: 1.2, k: 35, ug: 150, u: 'plato' },
  'Pisto casero': { p: 1.2, k: 50, ug: 150, u: 'plato' },
  'Plátano': { p: 1.1, k: 89, ug: 120, u: 'plátano' },
  'Pollo': { p: 20, k: 165, ug: 150, u: 'porción' },
  'Pollo a la plancha': { p: 23, k: 165, ug: 150, u: 'porción' },
  'Pollo asado': { p: 24, k: 190, ug: 150, u: 'porción' },
  'Pollo desmigado': { p: 23, k: 165, ug: 150, u: 'porción' },
  'Pollo en dados': { p: 22, k: 165, ug: 150, u: 'porción' },
  'Puerro': { p: 1.5, k: 61, ug: 150, u: 'puerro' },
  'Queso fresco': { p: 12, k: 110, ug: 40, u: 'porción' },
  'Requesón': { p: 11, k: 98, ug: 100, u: 'cazo' },
  'Salmón': { p: 20, k: 208, ug: 150, u: 'filete' },
  'Salmón ahumado': { p: 18, k: 117, ug: 20, u: 'loncha' },
  'Semillas variadas': { p: 18, k: 550, ug: 10, u: 'cucharada' },
  'Sepia': { p: 16, k: 79, ug: 150, u: 'porción' },
  'Setas variadas': { p: 3, k: 22, ug: 100, u: 'plato' },
  'Ternera para guisar': { p: 21, k: 170, ug: 150, u: 'porción' },
  'Tomate': { p: 0.9, k: 18, ug: 120, u: 'tomate' },
  'Tomate natural': { p: 0.9, k: 18, ug: 120, u: 'tomate' },
  'Tomate triturado': { p: 1.6, k: 32, ug: 100, u: 'cazo' },
  'Tomate y lechuga': { p: 1, k: 17, ug: 150, u: 'plato' },
  'Verduras crudas': { p: 1.5, k: 25, ug: 150, u: 'plato' },
  'Verduras salteadas': { p: 1.5, k: 45, ug: 150, u: 'plato' },
  'Verduras variadas': { p: 1.5, k: 30, ug: 150, u: 'plato' },
  'Yogur griego natural': { p: 10, k: 75, ug: 125, u: 'yogur' },
  'Yogur natural': { p: 5, k: 61, ug: 125, u: 'yogur' },
  'Zanahoria y apio': { p: 1, k: 30, ug: 150, u: 'plato' },
  'Zanahoria y calabacín': { p: 1, k: 30, ug: 150, u: 'plato' }
};

const MEALS = [
  { id: 'd1', slot: 'desayuno', name: 'Tostada con tomate y jamón', kcal: 525, components: [
      { name: 'Pan integral', grams: 100 }, { name: 'Tomate triturado', grams: 60 }, { name: 'Aceite de oliva', grams: 10 }, { name: 'Leche o bebida vegetal', grams: 210 }, { name: 'Fruta de temporada', grams: 70 }, { name: 'Jamón cocido', grams: 30 } ] },
  { id: 'd2', slot: 'desayuno', name: 'Avena con yogur', kcal: 705, components: [
      { name: 'Copos de avena', grams: 120 }, { name: 'Yogur griego natural', grams: 160 }, { name: 'Plátano', grams: 60 }, { name: 'Nueces', grams: 10 } ] },
  { id: 'd3', slot: 'desayuno', name: 'Revuelto con aguacate y jamón', kcal: 620, components: [
      { name: 'Huevos (2 uds.)', grams: 120 }, { name: 'Pan integral', grams: 50 }, { name: 'Aguacate', grams: 60 }, { name: 'Jamón cocido', grams: 35 }, { name: 'Aceite de oliva', grams: 20 } ] },
  { id: 'd4', slot: 'desayuno', name: 'Yogur con muesli', kcal: 440, rapida: true, tiempo: '5 min · sin cocinar', components: [
      { name: 'Yogur griego natural', grams: 130 }, { name: 'Muesli sin azúcar', grams: 70 }, { name: 'Manzana', grams: 120 }, { name: 'Miel', grams: 10 } ] },
  { id: 'c1', slot: 'comida', name: 'Pollo con arroz', kcal: 600, components: [
      { name: 'Pechuga de pollo', grams: 88 }, { name: 'Arroz integral (en crudo)', grams: 110 }, { name: 'Ensalada mixta', grams: 75 }, { name: 'Aceite de oliva', grams: 5 } ] },
  { id: 'c2', slot: 'comida', name: 'Lentejas con verduras y pavo', kcal: 870, components: [
      { name: 'Lentejas (en crudo)', grams: 90 }, { name: 'Zanahoria y calabacín', grams: 235 }, { name: 'Patata', grams: 280 }, { name: 'Aceite de oliva', grams: 15 }, { name: 'Pavo en dados', grams: 30 }, { name: 'Huevo cocido (1 ud.)', grams: 60 } ] },
  { id: 'c3', slot: 'comida', name: 'Salmón con patata', kcal: 610, components: [
      { name: 'Salmón', grams: 80 }, { name: 'Patata', grams: 380 }, { name: 'Brócoli', grams: 190 }, { name: 'Aceite de oliva', grams: 10 } ] },
  { id: 'c4', slot: 'comida', name: 'Garbanzos con espinacas', kcal: 490, components: [
      { name: 'Garbanzos cocidos', grams: 145 }, { name: 'Espinacas', grams: 125 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Aceite de oliva', grams: 15 } ] },
  { id: 'n1', slot: 'cena', name: 'Merluza con verduras', kcal: 360, components: [
      { name: 'Merluza', grams: 94 }, { name: 'Verduras salteadas', grams: 150 }, { name: 'Pan integral', grams: 30 }, { name: 'Aceite de oliva', grams: 15 } ] },
  { id: 'n2', slot: 'cena', name: 'Tortilla con ensalada', kcal: 435, components: [
      { name: 'Huevos (2 uds.)', grams: 65 }, { name: 'Ensalada variada', grams: 225 }, { name: 'Pan integral', grams: 50 }, { name: 'Aceite de oliva', grams: 15 }, { name: 'Queso fresco', grams: 30 } ] },
  { id: 'n3', slot: 'cena', name: 'Pavo con boniato', kcal: 375, components: [
      { name: 'Pechuga de pavo', grams: 88 }, { name: 'Boniato', grams: 130 }, { name: 'Ensalada', grams: 50 }, { name: 'Aceite de oliva', grams: 15 } ] },
  { id: 'n4', slot: 'cena', name: 'Crema de calabacín', kcal: 355, components: [
      { name: 'Calabacín', grams: 305 }, { name: 'Pollo desmigado', grams: 41 }, { name: 'Patata', grams: 190 }, { name: 'Aceite de oliva', grams: 10 } ] },
  { id: 'd5', slot: 'desayuno', name: 'Tortilla francesa con jamón y pan', kcal: 855, components: [
      { name: 'Huevos (2 uds.)', grams: 85 }, { name: 'Pan integral', grams: 80 }, { name: 'Aceite de oliva', grams: 15 }, { name: 'Leche o bebida vegetal', grams: 390 }, { name: 'Mango', grams: 280 }, { name: 'Jamón cocido', grams: 40 } ] },
  { id: 'd6', slot: 'desayuno', name: 'Avena fría con fresas', kcal: 680, components: [
      { name: 'Copos de avena', grams: 120 }, { name: 'Yogur griego natural', grams: 135 }, { name: 'Fresas', grams: 70 }, { name: 'Miel', grams: 30 } ] },
  { id: 'd7', slot: 'desayuno', name: 'Tostada de pavo y queso fresco', kcal: 520, components: [
      { name: 'Pan integral', grams: 92 }, { name: 'Fiambre de pavo', grams: 30 }, { name: 'Queso fresco', grams: 30 }, { name: 'Tomate', grams: 60 }, { name: 'Leche o bebida vegetal', grams: 90 }, { name: 'Aceite de oliva', grams: 20 } ] },
  { id: 'd8', slot: 'desayuno', name: 'Bowl de yogur, plátano y nueces', kcal: 535, rapida: true, tiempo: '5 min · sin cocinar', components: [
      { name: 'Yogur griego natural', grams: 185 }, { name: 'Plátano', grams: 118 }, { name: 'Nueces', grams: 40 }, { name: 'Miel', grams: 10 } ] },
  { id: 'c5', slot: 'comida', name: 'Ternera guisada con patatas', kcal: 410, components: [
      { name: 'Ternera para guisar', grams: 59 }, { name: 'Patata', grams: 220 }, { name: 'Verduras variadas', grams: 165 }, { name: 'Aceite de oliva', grams: 10 } ] },
  { id: 'c6', slot: 'comida', name: 'Merluza al horno con patata', kcal: 485, components: [
      { name: 'Merluza', grams: 100 }, { name: 'Patata', grams: 380 }, { name: 'Verduras salteadas', grams: 230 } ] },
  { id: 'c7', slot: 'comida', name: 'Pasta con pollo y verduras', kcal: 325, components: [
      { name: 'Pasta (en crudo)', grams: 32 }, { name: 'Pechuga de pollo', grams: 50 }, { name: 'Pimiento y cebolla', grams: 110 }, { name: 'Aceite de oliva', grams: 10 } ] },
  { id: 'c8', slot: 'comida', name: 'Ensalada de garbanzos y atún', kcal: 365, rapida: true, tiempo: '5 min · sin cocinar', components: [
      { name: 'Garbanzos cocidos', grams: 100 }, { name: 'Atún', grams: 35 }, { name: 'Tomate', grams: 90 }, { name: 'Ensalada', grams: 50 }, { name: 'Aceite de oliva', grams: 15 } ] },
  { id: 'n5', slot: 'cena', name: 'Lubina con verduras', kcal: 370, components: [
      { name: 'Lubina', grams: 95 }, { name: 'Verduras variadas', grams: 150 }, { name: 'Patata', grams: 130 }, { name: 'Aceite de oliva', grams: 15 } ] },
  { id: 'n6', slot: 'cena', name: 'Salteado de ternera con arroz', kcal: 565, components: [
      { name: 'Ternera para guisar', grams: 90 }, { name: 'Arroz (en crudo)', grams: 60 }, { name: 'Verduras salteadas', grams: 235 }, { name: 'Aceite de oliva', grams: 10 } ] },
  { id: 'n7', slot: 'cena', name: 'Revuelto de setas y pavo', kcal: 355, components: [
      { name: 'Setas variadas', grams: 150 }, { name: 'Pavo en dados', grams: 36 }, { name: 'Huevo (1 ud.)', grams: 90 }, { name: 'Aceite de oliva', grams: 15 } ] },
  { id: 'n9', slot: 'cena', name: 'Tostas de atún y aguacate', kcal: 475, rapida: true, tiempo: '0 min · sin cocinar', components: [
      { name: 'Pan integral', grams: 50 }, { name: 'Atún', grams: 50 }, { name: 'Aguacate', grams: 120 }, { name: 'Tomate', grams: 60 }, { name: 'Aceite de oliva', grams: 10 } ] },
  { id: 'n10', slot: 'cena', name: 'Plato de jamón, queso fresco y nueces', kcal: 385, rapida: true, tiempo: '0 min · sin cocinar', components: [
      { name: 'Jamón cocido', grams: 35 }, { name: 'Queso fresco', grams: 30 }, { name: 'Nueces', grams: 30 }, { name: 'Pan integral', grams: 30 }, { name: 'Aceite de oliva', grams: 5 } ] },
  { id: 'n11', slot: 'cena', name: 'Yogur griego con avena y plátano', kcal: 415, rapida: true, tiempo: '0 min · sin cocinar', components: [
      { name: 'Yogur griego natural', grams: 160 }, { name: 'Copos de avena', grams: 30 }, { name: 'Plátano', grams: 100 }, { name: 'Miel', grams: 30 } ] },
  { id: 'n12', slot: 'cena', name: 'Ensalada de lentejas de bote con huevo', kcal: 370, rapida: true, tiempo: '5 min · sin cocinar', components: [
      { name: 'Lentejas cocidas', grams: 110 }, { name: 'Huevo cocido (1 ud.)', grams: 60 }, { name: 'Tomate', grams: 90 }, { name: 'Aceite de oliva', grams: 15 } ] },
  { id: 'n13', slot: 'cena', name: 'Tortilla exprés de atún', kcal: 430, rapida: true, tiempo: '10 min · sartén', components: [
      { name: 'Huevos (2 uds.)', grams: 75 }, { name: 'Atún', grams: 45 }, { name: 'Pan integral', grams: 30 }, { name: 'Ensalada', grams: 50 }, { name: 'Aceite de oliva', grams: 20 } ] },
  { id: 'n14', slot: 'cena', name: 'Sándwich de pavo y queso fresco', kcal: 360, rapida: true, tiempo: '5 min · sin cocinar', components: [
      { name: 'Pan integral', grams: 42 }, { name: 'Fiambre de pavo', grams: 32 }, { name: 'Queso fresco', grams: 30 }, { name: 'Tomate y lechuga', grams: 60 }, { name: 'Aceite de oliva', grams: 20 } ] },
  { id: 'n15', slot: 'cena', name: 'Hummus con crudités y atún', kcal: 405, rapida: true, tiempo: '0 min · sin cocinar', components: [
      { name: 'Hummus', grams: 52 }, { name: 'Atún', grams: 40 }, { name: 'Zanahoria y apio', grams: 75 }, { name: 'Pan integral', grams: 30 }, { name: 'Aceite de oliva', grams: 20 } ] },
  { id: 'n16', slot: 'cena', name: 'Gazpacho con pavo y huevo', kcal: 575, rapida: true, tiempo: '0 min · sin cocinar', components: [
      { name: 'Gazpacho casero', grams: 360 }, { name: 'Pavo en dados', grams: 35 }, { name: 'Huevo cocido (1 ud.)', grams: 70 }, { name: 'Pan integral', grams: 50 }, { name: 'Aceite de oliva', grams: 15 } ] },
  { id: 'c9', slot: 'comida', name: 'Ensalada fría de pasta y atún', kcal: 770, rapida: true, tiempo: '12 min · solo hervir pasta', components: [
      { name: 'Pasta (en crudo)', grams: 152 }, { name: 'Atún', grams: 80 }, { name: 'Tomate', grams: 50 }, { name: 'Maíz dulce', grams: 40 }, { name: 'Aceite de oliva', grams: 10 } ] },
  { id: 'c10', slot: 'comida', name: 'Tostadas de hummus y pollo asado', kcal: 610, rapida: true, tiempo: '5 min · sin cocinar', components: [
      { name: 'Pan integral', grams: 102 }, { name: 'Hummus', grams: 50 }, { name: 'Pollo asado', grams: 45 }, { name: 'Tomate y lechuga', grams: 80 }, { name: 'Aceite de oliva', grams: 20 } ] },
  { id: 'n8', slot: 'cena', name: 'Requesón con fruta y nueces', kcal: 390, rapida: true, tiempo: '5 min · sin cocinar', components: [
      { name: 'Requesón', grams: 85 }, { name: 'Fresas', grams: 110 }, { name: 'Nueces', grams: 30 }, { name: 'Pan integral', grams: 30 } ] }
];

const RECIPES = [
  { id: 'r-ene-d', month: 0, slot: 'desayuno', name: 'Porridge de avena y pera', kcal: 365, components: [
      { name: 'Copos de avena', grams: 30 }, { name: 'Pera', grams: 240 }, { name: 'Yogur griego natural', grams: 140 }, { name: 'Canela', grams: 2 } ], pasos: ['Cuece la avena con agua o leche 5 minutos.', 'Añade la pera en dados y la canela, y termina con el yogur.'] },
  { id: 'r-ene-c', month: 0, slot: 'comida', name: 'Cocido ligero de garbanzos', kcal: 590, components: [
      { name: 'Garbanzos cocidos', grams: 174 }, { name: 'Zanahoria y apio', grams: 85 }, { name: 'Patata', grams: 250 }, { name: 'Pavo en dados', grams: 30 }, { name: 'Aceite de oliva', grams: 5 } ], pasos: ['Cuece las verduras y la patata 20 minutos.', 'Añade garbanzos y pavo, y cocina 10 minutos más.'] },
  { id: 'r-ene-n', month: 0, slot: 'cena', name: 'Sopa de verduras con huevo y pollo', kcal: 600, components: [
      { name: 'Verduras variadas', grams: 175 }, { name: 'Patata', grams: 290 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Aceite de oliva', grams: 15 }, { name: 'Pollo desmigado', grams: 60 } ], pasos: ['Cuece verduras y patata en caldo 20 minutos.', 'Añade el huevo escalfado al final.'] },
  { id: 'r-feb-d', month: 1, slot: 'desayuno', name: 'Tostada con hummus y huevo', kcal: 585, components: [
      { name: 'Pan integral', grams: 140 }, { name: 'Hummus', grams: 30 }, { name: 'Huevo cocido (1 ud.)', grams: 60 }, { name: 'Tomate', grams: 50 }, { name: 'Aceite de oliva', grams: 10 } ], pasos: ['Tuesta el pan y unta el hummus.', 'Corona con el huevo cocido en láminas y tomate.'] },
  { id: 'r-feb-c', month: 1, slot: 'comida', name: 'Estofado de ternera', kcal: 485, components: [
      { name: 'Ternera para guisar', grams: 60 }, { name: 'Patata', grams: 260 }, { name: 'Verduras variadas', grams: 320 }, { name: 'Aceite de oliva', grams: 10 } ], pasos: ['Dora la ternera y añade las verduras.', 'Cubre con agua y guisa 45 minutos a fuego lento.'] },
  { id: 'r-feb-n', month: 1, slot: 'cena', name: 'Crema de puerro con pollo', kcal: 575, components: [
      { name: 'Puerro', grams: 260 }, { name: 'Patata', grams: 300 }, { name: 'Pollo', grams: 86 }, { name: 'Aceite de oliva', grams: 5 } ], pasos: ['Cuece puerro y patata 20 minutos y tritura.', 'Añade el pollo a la plancha en dados.'] },
  { id: 'r-mar-d', month: 2, slot: 'desayuno', name: 'Bizcocho de avena en taza', kcal: 380, components: [
      { name: 'Copos de avena', grams: 40 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Yogur natural', grams: 80 }, { name: 'Plátano', grams: 90 } ], pasos: ['Mezcla avena, huevo y plátano en una taza.', 'Microondas 2-3 minutos y acompaña con el yogur.'] },
  { id: 'r-mar-c', month: 2, slot: 'comida', name: 'Paella de pollo y verduras', kcal: 900, components: [
      { name: 'Arroz (en crudo)', grams: 142 }, { name: 'Pollo', grams: 150 }, { name: 'Verduras variadas', grams: 180 }, { name: 'Aceite de oliva', grams: 10 } ], pasos: ['Sofríe el pollo y las verduras.', 'Añade arroz y caldo (doble de volumen) y cuece 18 minutos.'] },
  { id: 'r-mar-n', month: 2, slot: 'cena', name: 'Ensalada tibia de lentejas', kcal: 320, components: [
      { name: 'Lentejas cocidas', grams: 116 }, { name: 'Queso fresco', grams: 30 }, { name: 'Verduras crudas', grams: 75 }, { name: 'Aceite de oliva', grams: 15 } ], pasos: ['Mezcla las lentejas templadas con las verduras.', 'Añade el queso fresco y aliña.'] },
  { id: 'r-abr-d', month: 3, slot: 'desayuno', name: 'Tostada de aguacate y salmón', kcal: 520, components: [
      { name: 'Pan integral', grams: 120 }, { name: 'Aguacate', grams: 80 }, { name: 'Salmón ahumado', grams: 30 }, { name: 'Yogur natural', grams: 100 } ], pasos: ['Tuesta el pan y unta el aguacate.', 'Corona con el salmón y acompaña con el yogur.'] },
  { id: 'r-abr-c', month: 3, slot: 'comida', name: 'Arroz negro con sepia', kcal: 710, components: [
      { name: 'Arroz (en crudo)', grams: 132 }, { name: 'Sepia', grams: 145 }, { name: 'Pimiento y cebolla', grams: 95 }, { name: 'Aceite de oliva', grams: 10 } ], pasos: ['Sofríe la sepia con las verduras.', 'Añade arroz, caldo y tinta; cuece 18 minutos.'] },
  { id: 'r-abr-n', month: 3, slot: 'cena', name: 'Pescado en papillote', kcal: 440, components: [
      { name: 'Pescado blanco', grams: 84 }, { name: 'Verduras variadas', grams: 150 }, { name: 'Patata', grams: 240 }, { name: 'Aceite de oliva', grams: 15 } ], pasos: ['Coloca todo en papel de horno con un hilo de aceite.', 'Hornea 20 minutos a 180 °C.'] },
  { id: 'r-may-d', month: 4, slot: 'desayuno', name: 'Yogur con fresas y avena', kcal: 650, components: [
      { name: 'Yogur griego natural', grams: 130 }, { name: 'Fresas', grams: 300 }, { name: 'Copos de avena', grams: 100 }, { name: 'Nueces', grams: 10 } ], pasos: ['Sirve el yogur en un bol.', 'Añade fresas, avena y nueces por encima.'] },
  { id: 'r-may-c', month: 4, slot: 'comida', name: 'Pasta integral con atún', kcal: 700, components: [
      { name: 'Pasta integral (en crudo)', grams: 132 }, { name: 'Atún', grams: 71 }, { name: 'Tomate natural', grams: 140 }, { name: 'Aceite de oliva', grams: 15 } ], pasos: ['Cuece la pasta.', 'Saltea con tomate y añade el atún al final.'] },
  { id: 'r-may-n', month: 4, slot: 'cena', name: 'Pisto con huevo y atún', kcal: 560, components: [
      { name: 'Pisto casero', grams: 285 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Pan integral', grams: 40 }, { name: 'Aceite de oliva', grams: 15 }, { name: 'Atún', grams: 80 } ], pasos: ['Calienta el pisto.', 'Añade el huevo a la plancha o escalfado encima.'] },
  { id: 'r-jun-d', month: 5, slot: 'desayuno', name: 'Bol de mango y yogur', kcal: 510, components: [
      { name: 'Mango', grams: 150 }, { name: 'Yogur griego natural', grams: 140 }, { name: 'Copos de avena', grams: 30 }, { name: 'Coco rallado', grams: 30 } ], pasos: ['Tritura medio mango con el yogur.', 'Añade el resto en dados con avena y coco.'] },
  { id: 'r-jun-c', month: 5, slot: 'comida', name: 'Ensalada de garbanzos y atún', kcal: 340, components: [
      { name: 'Garbanzos cocidos', grams: 90 }, { name: 'Atún', grams: 30 }, { name: 'Verduras crudas', grams: 100 }, { name: 'Aceite de oliva', grams: 15 } ], pasos: ['Mezcla todo en un bol grande.', 'Aliña con aceite, limón y sal.'] },
  { id: 'r-jun-n', month: 5, slot: 'cena', name: 'Brocheta de pollo y verduras', kcal: 505, components: [
      { name: 'Pollo en dados', grams: 45 }, { name: 'Verduras variadas', grams: 330 }, { name: 'Pan integral', grams: 80 }, { name: 'Aceite de oliva', grams: 15 } ], pasos: ['Ensarta pollo y verduras alternados.', 'Haz a la plancha 10-12 minutos girando.'] },
  { id: 'r-jul-d', month: 6, slot: 'desayuno', name: 'Tostada fría de yogur y fruta', kcal: 565, components: [
      { name: 'Pan integral', grams: 80 }, { name: 'Yogur griego natural', grams: 130 }, { name: 'Fruta de temporada', grams: 190 }, { name: 'Semillas variadas', grams: 30 } ], pasos: ['Tuesta el pan y deja enfriar.', 'Unta el yogur y cubre con fruta y semillas.'] },
  { id: 'r-jul-c', month: 6, slot: 'comida', name: 'Ensalada de pasta con pollo', kcal: 790, components: [
      { name: 'Pasta (en crudo)', grams: 152 }, { name: 'Pollo a la plancha', grams: 66 }, { name: 'Verduras crudas', grams: 190 }, { name: 'Aceite de oliva', grams: 10 } ], pasos: ['Cuece la pasta y enfría.', 'Mezcla con pollo, verduras y aliño.'] },
  { id: 'r-jul-n', month: 6, slot: 'cena', name: 'Gazpacho con huevo y atún', kcal: 540, components: [
      { name: 'Gazpacho casero', grams: 240 }, { name: 'Huevo cocido (1 ud.)', grams: 80 }, { name: 'Atún', grams: 65 }, { name: 'Pan integral', grams: 40 }, { name: 'Aceite de oliva', grams: 15 } ], pasos: ['Sirve el gazpacho bien frío.', 'Añade huevo picado y atún por encima.'] },
  { id: 'r-ago-d', month: 7, slot: 'desayuno', name: 'Bol de melón con yogur', kcal: 575, components: [
      { name: 'Melón', grams: 370 }, { name: 'Yogur griego natural', grams: 130 }, { name: 'Copos de avena', grams: 90 } ], pasos: ['Sirve el yogur en un bol.', 'Añade el melón en dados y la avena.'] },
  { id: 'r-ago-c', month: 7, slot: 'comida', name: 'Pollo frío con tomate y maíz', kcal: 560, components: [
      { name: 'Pollo asado', grams: 45 }, { name: 'Maíz dulce', grams: 150 }, { name: 'Tomate y lechuga', grams: 100 }, { name: 'Pan integral', grams: 80 }, { name: 'Aceite de oliva', grams: 15 } ], pasos: ['Desmenuza el pollo frío.', 'Mezcla con tomate, lechuga y maíz; aliña.'] },
  { id: 'r-ago-n', month: 7, slot: 'cena', name: 'Salmón a la plancha', kcal: 440, components: [
      { name: 'Salmón', grams: 97 }, { name: 'Ensalada variada', grams: 150 }, { name: 'Pan integral', grams: 30 }, { name: 'Aceite de oliva', grams: 15 } ], pasos: ['Haz el salmón a la plancha 3-4 minutos por lado.', 'Acompaña con la ensalada aliñada.'] },
  { id: 'r-sep-d', month: 8, slot: 'desayuno', name: 'Tortitas de avena y plátano', kcal: 695, components: [
      { name: 'Copos de avena', grams: 80 }, { name: 'Plátano', grams: 190 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Yogur griego natural', grams: 160 } ], pasos: ['Tritura todo y haz tortitas en sartén antiadherente.', 'Sirve con el yogur.'] },
  { id: 'r-sep-c', month: 8, slot: 'comida', name: 'Arroz integral con huevo y pollo', kcal: 455, components: [
      { name: 'Arroz integral (en crudo)', grams: 72 }, { name: 'Verduras variadas', grams: 180 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Pollo a la plancha', grams: 30 } ], pasos: ['Cuece el arroz y saltea las verduras.', 'Corona con un huevo a la plancha.'] },
  { id: 'r-sep-n', month: 8, slot: 'cena', name: 'Calamares a la plancha', kcal: 295, components: [
      { name: 'Calamares', grams: 45 }, { name: 'Ensalada variada', grams: 100 }, { name: 'Pan integral', grams: 40 }, { name: 'Aceite de oliva', grams: 15 } ], pasos: ['Haz los calamares a la plancha 2-3 minutos.', 'Acompaña con la ensalada.'] },
  { id: 'r-oct-d', month: 9, slot: 'desayuno', name: 'Porridge con manzana asada', kcal: 760, components: [
      { name: 'Copos de avena', grams: 110 }, { name: 'Manzana', grams: 70 }, { name: 'Yogur griego natural', grams: 130 }, { name: 'Nueces', grams: 30 } ], pasos: ['Cuece la avena 5 minutos.', 'Añade la manzana salteada con canela y las nueces.'] },
  { id: 'r-oct-c', month: 9, slot: 'comida', name: 'Guiso de pollo y calabaza', kcal: 355, components: [
      { name: 'Pollo', grams: 58 }, { name: 'Calabaza', grams: 235 }, { name: 'Patata', grams: 140 }, { name: 'Aceite de oliva', grams: 10 } ], pasos: ['Dora el pollo y añade calabaza y patata.', 'Cubre con caldo y guisa 25 minutos.'] },
  { id: 'r-oct-n', month: 9, slot: 'cena', name: 'Setas salteadas con huevo', kcal: 360, components: [
      { name: 'Setas variadas', grams: 170 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Pan integral', grams: 40 }, { name: 'Aceite de oliva', grams: 15 } ], pasos: ['Saltea las setas con ajo.', 'Añade el huevo y remueve hasta cuajar.'] },
  { id: 'r-nov-d', month: 10, slot: 'desayuno', name: 'Tostada con requesón y nueces', kcal: 625, components: [
      { name: 'Pan integral', grams: 120 }, { name: 'Requesón', grams: 80 }, { name: 'Nueces', grams: 30 }, { name: 'Fruta de temporada', grams: 100 } ], pasos: ['Tuesta el pan y unta el requesón.', 'Añade las nueces y acompaña con fruta.'] },
  { id: 'r-nov-c', month: 10, slot: 'comida', name: 'Albóndigas de pavo con arroz', kcal: 495, components: [
      { name: 'Pavo picado', grams: 88 }, { name: 'Arroz (en crudo)', grams: 70 }, { name: 'Tomate natural', grams: 125 }, { name: 'Aceite de oliva', grams: 10 } ], pasos: ['Forma las albóndigas y dóralas.', 'Cuece en salsa de tomate 15 minutos y sirve con arroz.'] },
  { id: 'r-nov-n', month: 10, slot: 'cena', name: 'Crema de calabaza con pavo', kcal: 295, components: [
      { name: 'Calabaza', grams: 275 }, { name: 'Pavo en dados', grams: 36 }, { name: 'Patata', grams: 170 }, { name: 'Aceite de oliva', grams: 5 } ], pasos: ['Cuece calabaza y patata, y tritura.', 'Añade el pavo salteado por encima.'] },
  { id: 'r-dic-d', month: 11, slot: 'desayuno', name: 'Tostada con jamón cocido', kcal: 405, components: [
      { name: 'Pan integral', grams: 70 }, { name: 'Jamón cocido', grams: 40 }, { name: 'Aceite de oliva', grams: 15 }, { name: 'Yogur natural', grams: 90 } ], pasos: ['Tuesta el pan con un hilo de aceite.', 'Añade el jamón y acompaña con el yogur.'] },
  { id: 'r-dic-c', month: 11, slot: 'comida', name: 'Alubias con verduras', kcal: 375, components: [
      { name: 'Alubias cocidas', grams: 104 }, { name: 'Verduras variadas', grams: 230 }, { name: 'Pavo en dados', grams: 30 }, { name: 'Aceite de oliva', grams: 15 } ], pasos: ['Sofríe las verduras.', 'Añade alubias y pavo, y cocina 15 minutos.'] },
  { id: 'r-dic-n', month: 11, slot: 'cena', name: 'Lubina al horno', kcal: 320, components: [
      { name: 'Lubina', grams: 74 }, { name: 'Verduras variadas', grams: 210 }, { name: 'Patata', grams: 70 }, { name: 'Aceite de oliva', grams: 15 } ], pasos: ['Hornea la lubina con las verduras 20 minutos a 180 °C.', 'Sirve con un hilo de aceite.'] }
];

const MONTHS = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

const SLOT_LABEL = { desayuno: 'Desayuno', comida: 'Comida', cena: 'Cena' };

const SLOT_SHARE = { desayuno: 0.30, comida: 0.40, cena: 0.30 };
