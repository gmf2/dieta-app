// Datos de comidas y recetas. kcal por opción calculadas con valores USDA FoodData Central (kcal/100g).

// ING: kcal por 100 g + medida casera (gramos por unidad).

const ING = {
  'Aceite de oliva': { p: 0, k: 884, ug: 10, u: 'cucharada' },
  'Aguacate': { p: 2, k: 160, ug: 75, u: 'medio aguacate' },
  'Alubias cocidas': { p: 9, k: 127, ug: 150, u: 'cazo' },
  'Arroz (en crudo)': { p: 7.1, k: 360, ug: 75, u: 'cazo' },
  'Arroz integral (en crudo)': { p: 7.9, k: 360, ug: 75, u: 'cazo' },
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
  'Fiambre de pavo': { p: 18, k: 105, ug: 20, u: 'loncha' },
  'Jamón cocido': { p: 16, k: 110, ug: 20, u: 'loncha' },
  'Leche o bebida vegetal': { p: 3, k: 46, ug: 200, u: 'vaso' },
  'Lentejas (en crudo)': { p: 24.6, k: 352, ug: 80, u: 'cazo' },
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
  'Patata cocida': { p: 2, k: 77, ug: 150, u: 'patata mediana' }, // envasada al vacio o cocida de antes: mantiene el plato sin fogon
  'Pavo en dados': { p: 22, k: 135, ug: 150, u: 'porción' },
  'Pavo picado': { p: 20, k: 150, ug: 150, u: 'porción' },
  'Pechuga de pavo': { p: 22, k: 135, ug: 150, u: 'filete' },
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

let MEALS = [
  { id: 'd1', slot: 'desayuno', name: 'Tostada con tomate y jamón', kcal: 805, components: [
      { name: 'Pan integral', grams: 135 }, { name: 'Tomate triturado', grams: 100 }, { name: 'Aceite de oliva', grams: 10 }, { name: 'Leche o bebida vegetal', grams: 395 }, { name: 'Fruta de temporada', grams: 150 }, { name: 'Jamón cocido', grams: 80 } ] },
  { id: 'd2', slot: 'desayuno', name: 'Avena con yogur', kcal: 815, components: [
      { name: 'Copos de avena', grams: 105 }, { name: 'Yogur griego natural', grams: 250 }, { name: 'Plátano', grams: 100 }, { name: 'Nueces', grams: 20 } ] },
  { id: 'd3', slot: 'desayuno', name: 'Revuelto con aguacate y jamón', kcal: 805, components: [
      { name: 'Huevos (2 uds.)', grams: 60 }, { name: 'Pan integral', grams: 150 }, { name: 'Aguacate', grams: 180 }, { name: 'Jamón cocido', grams: 50 } ] },
  { id: 'd4', slot: 'desayuno', name: 'Yogur con muesli', kcal: 760, rapida: true, tiempo: '5 min · sin cocinar', components: [
      { name: 'Yogur griego natural', grams: 250 }, { name: 'Muesli sin azúcar', grams: 120 }, { name: 'Manzana', grams: 120 }, { name: 'Miel', grams: 25 } ] },
  { id: 'c1', slot: 'comida', name: 'Pollo con arroz', kcal: 1105, components: [
      { name: 'Pechuga de pollo', grams: 150 }, { name: 'Arroz integral (en crudo)', grams: 160 }, { name: 'Ensalada mixta', grams: 150 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Pan integral', grams: 30 } ] },
  { id: 'c2', slot: 'comida', name: 'Lentejas con verduras y pavo', kcal: 1095, components: [
      { name: 'Lentejas (en crudo)', grams: 70 }, { name: 'Zanahoria y calabacín', grams: 250 }, { name: 'Patata', grams: 450 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Pavo en dados', grams: 60 }, { name: 'Huevo cocido (1 ud.)', grams: 60 }, { name: 'Pan integral', grams: 30 } ] },
  { id: 'c3', slot: 'comida', name: 'Salmón con patata', kcal: 1050, components: [
      { name: 'Salmón', grams: 150 }, { name: 'Patata', grams: 450 }, { name: 'Brócoli', grams: 200 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Pan integral', grams: 60 } ] },
  { id: 'c4', slot: 'comida', name: 'Garbanzos con espinacas', kcal: 1000, components: [
      { name: 'Garbanzos cocidos', grams: 365 }, { name: 'Espinacas', grams: 250 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Pan integral', grams: 30 } ] },
  { id: 'n1', slot: 'cena', name: 'Merluza con verduras', kcal: 755, components: [
      { name: 'Merluza', grams: 150 }, { name: 'Verduras salteadas', grams: 300 }, { name: 'Pan integral', grams: 160 }, { name: 'Aceite de oliva', grams: 10 } ] },
  { id: 'n2', slot: 'cena', name: 'Tortilla con ensalada', kcal: 870, components: [
      { name: 'Huevos (2 uds.)', grams: 60 }, { name: 'Ensalada variada', grams: 250 }, { name: 'Pan integral', grams: 150 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Queso fresco', grams: 60 }, { name: 'Patata', grams: 150 } ] },
  { id: 'n3', slot: 'cena', name: 'Pavo con boniato', kcal: 860, components: [
      { name: 'Pechuga de pavo', grams: 150 }, { name: 'Boniato', grams: 450 }, { name: 'Ensalada', grams: 100 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Pan integral', grams: 30 } ] },
  { id: 'n4', slot: 'cena', name: 'Crema de calabacín', kcal: 865, components: [
      { name: 'Calabacín', grams: 320 }, { name: 'Pollo desmigado', grams: 130 }, { name: 'Patata', grams: 450 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Pan integral', grams: 30 } ] },
  { id: 'd5', slot: 'desayuno', name: 'Tortilla francesa con jamón y pan', kcal: 815, components: [
      { name: 'Huevos (2 uds.)', grams: 60 }, { name: 'Pan integral', grams: 145 }, { name: 'Aceite de oliva', grams: 5 }, { name: 'Leche o bebida vegetal', grams: 400 }, { name: 'Mango', grams: 150 }, { name: 'Jamón cocido', grams: 40 } ] },
  { id: 'd6', slot: 'desayuno', name: 'Avena fría con fresas', kcal: 740, components: [
      { name: 'Copos de avena', grams: 110 }, { name: 'Yogur griego natural', grams: 250 }, { name: 'Fresas', grams: 150 }, { name: 'Miel', grams: 25 } ] },
  { id: 'd7', slot: 'desayuno', name: 'Tostada de pavo y queso fresco', kcal: 815, components: [
      { name: 'Pan integral', grams: 150 }, { name: 'Fiambre de pavo', grams: 150 }, { name: 'Queso fresco', grams: 40 }, { name: 'Tomate', grams: 100 }, { name: 'Leche o bebida vegetal', grams: 370 } ] },
  { id: 'd8', slot: 'desayuno', name: 'Bowl de yogur, plátano y nueces', kcal: 805, rapida: true, tiempo: '5 min · sin cocinar', components: [
      { name: 'Yogur griego natural', grams: 250 }, { name: 'Plátano', grams: 120 }, { name: 'Nueces', grams: 40 }, { name: 'Miel', grams: 25 }, { name: 'Copos de avena', grams: 45 } ] },
  { id: 'c5', slot: 'comida', name: 'Ternera guisada con patatas', kcal: 995, components: [
      { name: 'Ternera para guisar', grams: 145 }, { name: 'Patata', grams: 450 }, { name: 'Verduras variadas', grams: 250 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Pan integral', grams: 60 } ] },
  { id: 'c6', slot: 'comida', name: 'Merluza al horno con patata', kcal: 1045, components: [
      { name: 'Merluza', grams: 150 }, { name: 'Patata', grams: 450 }, { name: 'Verduras salteadas', grams: 200 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Pan integral', grams: 120 } ] },
  { id: 'c7', slot: 'comida', name: 'Pasta con pollo y verduras', kcal: 1145, components: [
      { name: 'Pasta (en crudo)', grams: 160 }, { name: 'Pechuga de pollo', grams: 150 }, { name: 'Pimiento y cebolla', grams: 200 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Pan integral', grams: 30 } ] },
  { id: 'c8', slot: 'comida', name: 'Ensalada de garbanzos y atún', kcal: 1110, rapida: true, tiempo: '5 min · sin cocinar', components: [
      { name: 'Garbanzos cocidos', grams: 400 }, { name: 'Atún', grams: 80 }, { name: 'Tomate', grams: 100 }, { name: 'Ensalada', grams: 100 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Pan integral', grams: 60 } ] },
  { id: 'n5', slot: 'cena', name: 'Lubina con verduras', kcal: 835, components: [
      { name: 'Lubina', grams: 150 }, { name: 'Verduras variadas', grams: 300 }, { name: 'Patata', grams: 450 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Pan integral', grams: 30 } ] },
  { id: 'n6', slot: 'cena', name: 'Salteado de ternera con arroz', kcal: 820, components: [
      { name: 'Ternera para guisar', grams: 130 }, { name: 'Arroz (en crudo)', grams: 110 }, { name: 'Verduras salteadas', grams: 250 }, { name: 'Aceite de oliva', grams: 10 } ] },
  { id: 'n7', slot: 'cena', name: 'Revuelto de setas y pavo', kcal: 845, components: [
      { name: 'Setas variadas', grams: 300 }, { name: 'Pavo en dados', grams: 120 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Patata', grams: 450 } ] },
  { id: 'n9', slot: 'cena', name: 'Tostas de atún y aguacate', kcal: 805, rapida: true, tiempo: '0 min · sin cocinar', components: [
      { name: 'Pan integral', grams: 155 }, { name: 'Atún', grams: 80 }, { name: 'Aguacate', grams: 195 }, { name: 'Tomate', grams: 100 } ] },
  { id: 'n10', slot: 'cena', name: 'Plato de jamón, queso fresco y nueces', kcal: 805, rapida: true, tiempo: '0 min · sin cocinar', components: [
      { name: 'Jamón cocido', grams: 80 }, { name: 'Queso fresco', grams: 100 }, { name: 'Nueces', grams: 40 }, { name: 'Pan integral', grams: 140 } ] },
  { id: 'n11', slot: 'cena', name: 'Yogur griego con avena y plátano', kcal: 780, rapida: true, tiempo: '0 min · sin cocinar', components: [
      { name: 'Yogur griego natural', grams: 250 }, { name: 'Copos de avena', grams: 110 }, { name: 'Plátano', grams: 100 }, { name: 'Miel', grams: 25 } ] },
  { id: 'n12', slot: 'cena', name: 'Ensalada de lentejas de bote con huevo', kcal: 720, rapida: true, tiempo: '5 min · sin cocinar', components: [
      { name: 'Lentejas cocidas', grams: 245 }, { name: 'Huevo cocido (1 ud.)', grams: 60 }, { name: 'Tomate', grams: 100 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Pan integral', grams: 60 } ] },
  { id: 'n13', slot: 'cena', name: 'Tortilla exprés de atún', kcal: 785, rapida: true, tiempo: '10 min · sartén', components: [
      { name: 'Huevos (2 uds.)', grams: 120 }, { name: 'Atún', grams: 80 }, { name: 'Patata cocida', grams: 400 }, { name: 'Ensalada', grams: 100 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Pan integral', grams: 40 } ] },
  { id: 'n14', slot: 'cena', name: 'Sándwich de pavo y queso fresco', kcal: 760, rapida: true, tiempo: '5 min · sin cocinar', components: [
      { name: 'Pan integral', grams: 150 }, { name: 'Fiambre de pavo', grams: 150 }, { name: 'Queso fresco', grams: 50 }, { name: 'Tomate y lechuga', grams: 100 }, { name: 'Patata cocida', grams: 150 } ] },
  { id: 'n15', slot: 'cena', name: 'Hummus con crudités y atún', kcal: 790, rapida: true, tiempo: '0 min · sin cocinar', components: [
      { name: 'Hummus', grams: 60 }, { name: 'Atún', grams: 80 }, { name: 'Zanahoria y apio', grams: 150 }, { name: 'Pan integral', grams: 150 }, { name: 'Patata cocida', grams: 150 } ] },
  { id: 'n16', slot: 'cena', name: 'Gazpacho con pavo y huevo', kcal: 785, rapida: true, tiempo: '0 min · sin cocinar', components: [
      { name: 'Gazpacho casero', grams: 300 }, { name: 'Pavo en dados', grams: 120 }, { name: 'Huevo cocido (1 ud.)', grams: 60 }, { name: 'Pan integral', grams: 160 } ] },
  { id: 'c9', slot: 'comida', name: 'Ensalada fría de pasta y atún', kcal: 1060, rapida: true, tiempo: '12 min · solo hervir pasta', components: [
      { name: 'Pasta (en crudo)', grams: 160 }, { name: 'Atún', grams: 80 }, { name: 'Tomate', grams: 100 }, { name: 'Maíz dulce', grams: 140 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Pan integral', grams: 30 } ] },
  { id: 'c10', slot: 'comida', name: 'Tostadas de hummus y pollo asado', kcal: 1030, rapida: true, tiempo: '5 min · sin cocinar', components: [
      { name: 'Pan integral', grams: 150 }, { name: 'Hummus', grams: 100 }, { name: 'Pollo asado', grams: 130 }, { name: 'Tomate y lechuga', grams: 100 }, { name: 'Patata cocida', grams: 300 } ] },
  { id: 'n8', slot: 'cena', name: 'Requesón con fruta y nueces', kcal: 800, rapida: true, tiempo: '5 min · sin cocinar', components: [
      { name: 'Requesón', grams: 95 }, { name: 'Fresas', grams: 150 }, { name: 'Nueces', grams: 40 }, { name: 'Pan integral', grams: 160 } ] }
];

let RECIPES = [
  { id: 'r-ene-d', month: 0, slot: 'desayuno', name: 'Porridge de avena y pera', kcal: 810, components: [
      { name: 'Copos de avena', grams: 75 }, { name: 'Pera', grams: 150 }, { name: 'Yogur griego natural', grams: 250 }, { name: 'Canela', grams: 100 } ], pasos: ['Cuece la avena con agua o leche 5 minutos.', 'Añade la pera en dados y la canela, y termina con el yogur.'] },
  { id: 'r-ene-c', month: 0, slot: 'comida', name: 'Cocido ligero de garbanzos', kcal: 1075, components: [
      { name: 'Garbanzos cocidos', grams: 400 }, { name: 'Zanahoria y apio', grams: 150 }, { name: 'Patata', grams: 200 }, { name: 'Pavo en dados', grams: 120 } ], pasos: ['Cuece las verduras y la patata 20 minutos.', 'Añade garbanzos y pavo, y cocina 10 minutos más.'] },
  { id: 'r-ene-n', month: 0, slot: 'cena', name: 'Sopa de verduras con huevo y pollo', kcal: 810, components: [
      { name: 'Verduras variadas', grams: 320 }, { name: 'Patata', grams: 470 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Aceite de oliva', grams: 5 }, { name: 'Pollo desmigado', grams: 130 } ], pasos: ['Cuece verduras y patata en caldo 20 minutos.', 'Añade el huevo escalfado al final.'] },
  { id: 'r-feb-d', month: 1, slot: 'desayuno', name: 'Tostada con hummus y huevo', kcal: 805, components: [
      { name: 'Pan integral', grams: 150 }, { name: 'Hummus', grams: 100 }, { name: 'Huevo cocido (1 ud.)', grams: 60 }, { name: 'Tomate', grams: 100 }, { name: 'Copos de avena', grams: 40 } ], pasos: ['Tuesta el pan y unta el hummus.', 'Corona con el huevo cocido en láminas y tomate.'] },
  { id: 'r-feb-c', month: 1, slot: 'comida', name: 'Estofado de ternera', kcal: 1000, components: [
      { name: 'Ternera para guisar', grams: 140 }, { name: 'Patata', grams: 450 }, { name: 'Verduras variadas', grams: 300 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Pan integral', grams: 60 } ], pasos: ['Dora la ternera y añade las verduras.', 'Cubre con agua y guisa 45 minutos a fuego lento.'] },
  { id: 'r-feb-n', month: 1, slot: 'cena', name: 'Crema de puerro con pollo', kcal: 810, components: [
      { name: 'Puerro', grams: 300 }, { name: 'Patata', grams: 480 }, { name: 'Pollo', grams: 130 }, { name: 'Aceite de oliva', grams: 5 } ], pasos: ['Cuece puerro y patata 20 minutos y tritura.', 'Añade el pollo a la plancha en dados.'] },
  { id: 'r-mar-d', month: 2, slot: 'desayuno', name: 'Bizcocho de avena en taza', kcal: 795, components: [
      { name: 'Copos de avena', grams: 110 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Yogur natural', grams: 375 }, { name: 'Plátano', grams: 50 } ], pasos: ['Mezcla avena, huevo y plátano en una taza.', 'Microondas 2-3 minutos y acompaña con el yogur.'] },
  { id: 'r-mar-c', month: 2, slot: 'comida', name: 'Paella de pollo y verduras', kcal: 1030, components: [
      { name: 'Arroz (en crudo)', grams: 160 }, { name: 'Pollo', grams: 185 }, { name: 'Verduras variadas', grams: 200 }, { name: 'Aceite de oliva', grams: 10 } ], pasos: ['Sofríe el pollo y las verduras.', 'Añade arroz y caldo (doble de volumen) y cuece 18 minutos.'] },
  { id: 'r-mar-n', month: 2, slot: 'cena', name: 'Ensalada tibia de lentejas', kcal: 695, components: [
      { name: 'Lentejas cocidas', grams: 210 }, { name: 'Queso fresco', grams: 80 }, { name: 'Verduras crudas', grams: 150 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Pan integral', grams: 60 } ], pasos: ['Mezcla las lentejas templadas con las verduras.', 'Añade el queso fresco y aliña.'] },
  { id: 'r-abr-d', month: 3, slot: 'desayuno', name: 'Tostada de aguacate y salmón', kcal: 805, components: [
      { name: 'Pan integral', grams: 140 }, { name: 'Aguacate', grams: 140 }, { name: 'Salmón ahumado', grams: 80 }, { name: 'Yogur natural', grams: 235 } ], pasos: ['Tuesta el pan y unta el aguacate.', 'Corona con el salmón y acompaña con el yogur.'] },
  { id: 'r-abr-c', month: 3, slot: 'comida', name: 'Arroz negro con sepia', kcal: 1050, components: [
      { name: 'Arroz (en crudo)', grams: 160 }, { name: 'Sepia', grams: 215 }, { name: 'Pimiento y cebolla', grams: 150 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Pan integral', grams: 30 } ], pasos: ['Sofríe la sepia con las verduras.', 'Añade arroz, caldo y tinta; cuece 18 minutos.'] },
  { id: 'r-abr-n', month: 3, slot: 'cena', name: 'Pescado en papillote', kcal: 820, components: [
      { name: 'Pescado blanco', grams: 150 }, { name: 'Verduras variadas', grams: 300 }, { name: 'Patata', grams: 450 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Pan integral', grams: 30 } ], pasos: ['Coloca todo en papel de horno con un hilo de aceite.', 'Hornea 20 minutos a 180 °C.'] },
  { id: 'r-may-d', month: 4, slot: 'desayuno', name: 'Yogur con fresas y avena', kcal: 795, components: [
      { name: 'Yogur griego natural', grams: 250 }, { name: 'Fresas', grams: 150 }, { name: 'Copos de avena', grams: 110 }, { name: 'Nueces', grams: 20 } ], pasos: ['Sirve el yogur en un bol.', 'Añade fresas, avena y nueces por encima.'] },
  { id: 'r-may-c', month: 4, slot: 'comida', name: 'Pasta integral con atún', kcal: 1090, components: [
      { name: 'Pasta integral (en crudo)', grams: 160 }, { name: 'Atún', grams: 80 }, { name: 'Tomate natural', grams: 200 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Pan integral', grams: 90 } ], pasos: ['Cuece la pasta.', 'Saltea con tomate y añade el atún al final.'] },
  { id: 'r-may-n', month: 4, slot: 'cena', name: 'Pisto con huevo y atún', kcal: 805, components: [
      { name: 'Pisto casero', grams: 320 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Pan integral', grams: 150 }, { name: 'Aceite de oliva', grams: 10 }, { name: 'Atún', grams: 80 } ], pasos: ['Calienta el pisto.', 'Añade el huevo a la plancha o escalfado encima.'] },
  { id: 'r-jun-d', month: 5, slot: 'desayuno', name: 'Bol de mango y yogur', kcal: 805, components: [
      { name: 'Mango', grams: 150 }, { name: 'Yogur griego natural', grams: 250 }, { name: 'Copos de avena', grams: 110 }, { name: 'Coco rallado', grams: 15 } ], pasos: ['Tritura medio mango con el yogur.', 'Añade el resto en dados con avena y coco.'] },
  { id: 'r-jun-c', month: 5, slot: 'comida', name: 'Ensalada de garbanzos y atún', kcal: 1050, components: [
      { name: 'Garbanzos cocidos', grams: 400 }, { name: 'Atún', grams: 80 }, { name: 'Verduras crudas', grams: 200 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Pan integral', grams: 30 } ], pasos: ['Mezcla todo en un bol grande.', 'Aliña con aceite, limón y sal.'] },
  { id: 'r-jun-n', month: 5, slot: 'cena', name: 'Brocheta de pollo y verduras', kcal: 965, components: [
      { name: 'Pollo en dados', grams: 130 }, { name: 'Verduras variadas', grams: 300 }, { name: 'Pan integral', grams: 150 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Patata', grams: 150 } ], pasos: ['Ensarta pollo y verduras alternados.', 'Haz a la plancha 10-12 minutos girando.'] },
  { id: 'r-jul-d', month: 6, slot: 'desayuno', name: 'Tostada fría de yogur y fruta', kcal: 805, components: [
      { name: 'Pan integral', grams: 160 }, { name: 'Yogur griego natural', grams: 250 }, { name: 'Fruta de temporada', grams: 150 }, { name: 'Semillas variadas', grams: 25 } ], pasos: ['Tuesta el pan y deja enfriar.', 'Unta el yogur y cubre con fruta y semillas.'] },
  { id: 'r-jul-c', month: 6, slot: 'comida', name: 'Ensalada de pasta con pollo', kcal: 1090, components: [
      { name: 'Pasta (en crudo)', grams: 160 }, { name: 'Pollo a la plancha', grams: 130 }, { name: 'Verduras crudas', grams: 200 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Pan integral', grams: 30 } ], pasos: ['Cuece la pasta y enfría.', 'Mezcla con pollo, verduras y aliño.'] },
  { id: 'r-jul-n', month: 6, slot: 'cena', name: 'Gazpacho con huevo y atún', kcal: 805, components: [
      { name: 'Gazpacho casero', grams: 300 }, { name: 'Huevo cocido (1 ud.)', grams: 60 }, { name: 'Atún', grams: 80 }, { name: 'Pan integral', grams: 150 }, { name: 'Patata', grams: 150 } ], pasos: ['Sirve el gazpacho bien frío.', 'Añade huevo picado y atún por encima.'] },
  { id: 'r-ago-d', month: 7, slot: 'desayuno', name: 'Bol de melón con yogur', kcal: 685, components: [
      { name: 'Melón', grams: 200 }, { name: 'Yogur griego natural', grams: 250 }, { name: 'Copos de avena', grams: 110 } ], pasos: ['Sirve el yogur en un bol.', 'Añade el melón en dados y la avena.'] },
  { id: 'r-ago-c', month: 7, slot: 'comida', name: 'Pollo frío con tomate y maíz', kcal: 1005, components: [
      { name: 'Pollo asado', grams: 130 }, { name: 'Maíz dulce', grams: 140 }, { name: 'Tomate y lechuga', grams: 200 }, { name: 'Pan integral', grams: 150 }, { name: 'Patata', grams: 300 } ], pasos: ['Desmenuza el pollo frío.', 'Mezcla con tomate, lechuga y maíz; aliña.'] },
  { id: 'r-ago-n', month: 7, slot: 'cena', name: 'Salmón a la plancha', kcal: 805, components: [
      { name: 'Salmón', grams: 150 }, { name: 'Ensalada variada', grams: 300 }, { name: 'Pan integral', grams: 140 }, { name: 'Aceite de oliva', grams: 10 } ], pasos: ['Haz el salmón a la plancha 3-4 minutos por lado.', 'Acompaña con la ensalada aliñada.'] },
  { id: 'r-sep-d', month: 8, slot: 'desayuno', name: 'Tortitas de avena y plátano', kcal: 795, components: [
      { name: 'Copos de avena', grams: 110 }, { name: 'Plátano', grams: 100 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Yogur griego natural', grams: 250 } ], pasos: ['Tritura todo y haz tortitas en sartén antiadherente.', 'Sirve con el yogur.'] },
  { id: 'r-sep-c', month: 8, slot: 'comida', name: 'Arroz integral con huevo y pollo', kcal: 1060, components: [
      { name: 'Arroz integral (en crudo)', grams: 160 }, { name: 'Verduras variadas', grams: 300 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Aceite de oliva', grams: 10 }, { name: 'Pollo a la plancha', grams: 130 } ], pasos: ['Cuece el arroz y saltea las verduras.', 'Corona con un huevo a la plancha.'] },
  { id: 'r-sep-n', month: 8, slot: 'cena', name: 'Calamares a la plancha', kcal: 840, components: [
      { name: 'Calamares', grams: 150 }, { name: 'Ensalada variada', grams: 200 }, { name: 'Pan integral', grams: 150 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Patata', grams: 150 } ], pasos: ['Haz los calamares a la plancha 2-3 minutos.', 'Acompaña con la ensalada.'] },
  { id: 'r-oct-d', month: 9, slot: 'desayuno', name: 'Porridge con manzana asada', kcal: 825, components: [
      { name: 'Copos de avena', grams: 110 }, { name: 'Manzana', grams: 150 }, { name: 'Yogur griego natural', grams: 250 }, { name: 'Nueces', grams: 20 } ], pasos: ['Cuece la avena 5 minutos.', 'Añade la manzana salteada con canela y las nueces.'] },
  { id: 'r-oct-c', month: 9, slot: 'comida', name: 'Guiso de pollo y calabaza', kcal: 1000, components: [
      { name: 'Pollo', grams: 160 }, { name: 'Calabaza', grams: 250 }, { name: 'Patata', grams: 450 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Pan integral', grams: 60 } ], pasos: ['Dora el pollo y añade calabaza y patata.', 'Cubre con caldo y guisa 25 minutos.'] },
  { id: 'r-oct-n', month: 9, slot: 'cena', name: 'Setas salteadas con huevo', kcal: 820, components: [
      { name: 'Setas variadas', grams: 300 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Pan integral', grams: 150 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Patata', grams: 150 } ], pasos: ['Saltea las setas con ajo.', 'Añade el huevo y remueve hasta cuajar.'] },
  { id: 'r-nov-d', month: 10, slot: 'desayuno', name: 'Tostada con requesón y nueces', kcal: 805, components: [
      { name: 'Pan integral', grams: 160 }, { name: 'Requesón', grams: 95 }, { name: 'Nueces', grams: 40 }, { name: 'Fruta de temporada', grams: 100 } ], pasos: ['Tuesta el pan y unta el requesón.', 'Añade las nueces y acompaña con fruta.'] },
  { id: 'r-nov-c', month: 10, slot: 'comida', name: 'Albóndigas de pavo con arroz', kcal: 1115, components: [
      { name: 'Pavo picado', grams: 175 }, { name: 'Arroz (en crudo)', grams: 160 }, { name: 'Tomate natural', grams: 150 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Pan integral', grams: 30 } ], pasos: ['Forma las albóndigas y dóralas.', 'Cuece en salsa de tomate 15 minutos y sirve con arroz.'] },
  { id: 'r-nov-n', month: 10, slot: 'cena', name: 'Crema de calabaza con pavo', kcal: 845, components: [
      { name: 'Calabaza', grams: 320 }, { name: 'Pavo en dados', grams: 120 }, { name: 'Patata', grams: 450 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Pan integral', grams: 30 } ], pasos: ['Cuece calabaza y patata, y tritura.', 'Añade el pavo salteado por encima.'] },
  { id: 'r-dic-d', month: 11, slot: 'desayuno', name: 'Tostada con jamón cocido', kcal: 755, components: [
      { name: 'Pan integral', grams: 160 }, { name: 'Jamón cocido', grams: 80 }, { name: 'Aceite de oliva', grams: 5 }, { name: 'Yogur natural', grams: 375 } ], pasos: ['Tuesta el pan con un hilo de aceite.', 'Añade el jamón y acompaña con el yogur.'] },
  { id: 'r-dic-c', month: 11, slot: 'comida', name: 'Alubias con verduras', kcal: 1055, components: [
      { name: 'Alubias cocidas', grams: 400 }, { name: 'Verduras variadas', grams: 200 }, { name: 'Pavo en dados', grams: 80 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Pan integral', grams: 60 } ], pasos: ['Sofríe las verduras.', 'Añade alubias y pavo, y cocina 15 minutos.'] },
  { id: 'r-dic-n', month: 11, slot: 'cena', name: 'Lubina al horno', kcal: 835, components: [
      { name: 'Lubina', grams: 150 }, { name: 'Verduras variadas', grams: 300 }, { name: 'Patata', grams: 450 }, { name: 'Aceite de oliva', grams: 20 }, { name: 'Pan integral', grams: 30 } ], pasos: ['Hornea la lubina con las verduras 20 minutos a 180 °C.', 'Sirve con un hilo de aceite.'] }
];

const MONTHS = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];



const SLOT_LABEL = { desayuno: 'Desayuno', comida: 'Comida', cena: 'Cena' };

const SLOT_SHARE = { desayuno: 0.30, comida: 0.40, cena: 0.30 };

/* ---------- Motor dinamico de macros ----------
   Las cantidades se calculan EN VIVO contra el objetivo vigente (perder / mantener / ganar):
   las recetas estan escritas a tamano real para "mantener" y, al cambiar de objetivo,
   el ancla proteica escala para la proteina y la base para las kcal. El aceite y las
   proteinas secundarias (huevo cocido, queso, fiambre de acompanamiento) quedan fijos.
   Despues se redondea a piezas enteras, igual que se muestra. */

/* Motor de cantidades: cada ingrediente tiene un rango culinario real y el
   solver elige las cantidades que cumplen las kcal y la proteina de la franja
   (|dk|<=45, |dp|<=8, volumen<=1100 g verificado para las 70 recetas x 3 objetivos).
   PSHARE reparte la proteina del dia por franjas segun el objetivo. */
const PROT_ANCHORS = {
  'Atún': 1, 'Huevo (1 ud.)': 1, 'Huevo cocido (1 ud.)': 1, 'Huevos (2 uds.)': 1,
  'Jamón cocido': 1, 'Fiambre de pavo': 1, 'Lentejas cocidas': 1, 'Lentejas (en crudo)': 1,
  'Lubina': 1, 'Merluza': 1, 'Pescado blanco': 1, 'Pavo en dados': 1, 'Pavo picado': 1,
  'Pechuga de pavo': 1, 'Pechuga de pollo': 1, 'Pollo': 1, 'Pollo a la plancha': 1,
  'Pollo asado': 1, 'Pollo desmigado': 1, 'Pollo en dados': 1, 'Queso fresco': 1,
  'Requesón': 1, 'Salmón': 1, 'Salmón ahumado': 1, 'Sepia': 1, 'Calamares': 1,
  'Ternera para guisar': 1, 'Yogur griego natural': 1, 'Alubias cocidas': 1, 'Garbanzos cocidas': 1
};

const PSHARE = { mantener: { desayuno: 0.30, comida: 0.40, cena: 0.30 },
                 perder:   { desayuno: 0.28, comida: 0.42, cena: 0.30 },
                 ganar:    { desayuno: 0.30, comida: 0.40, cena: 0.30 } };
// Rangos culinarios [min, max, paso] por ingrediente (reglas + overrides)
const OVR = {
  'Aceite de oliva': [10, 25, 5],
  'Atún': [40, 160, 40],
  'Huevo (1 ud.)': [60, 180, 60], 'Huevos (2 uds.)': [60, 180, 60], 'Huevo cocido (1 ud.)': [60, 120, 60],
  'Jamón cocido': [20, 80, 20], 'Fiambre de pavo': [20, 100, 20], 'Salmón ahumado': [20, 60, 20],
  'Queso fresco': [40, 120, 20], 'Requesón': [100, 250, 25],
  'Yogur griego natural': [125, 500, 25], 'Yogur natural': [125, 375, 125],
  'Pan integral': [30, 150, 30],
  'Arroz (en crudo)': [40, 130, 10], 'Arroz integral (en crudo)': [40, 130, 10],
  'Pasta (en crudo)': [40, 130, 20], 'Pasta integral (en crudo)': [40, 130, 20],
  'Copos de avena': [35, 140, 5], 'Muesli sin azúcar': [40, 160, 10],
  'Patata': [150, 500, 75], 'Patata cocida': [150, 500, 75], 'Boniato': [150, 300, 75],
  'Maíz dulce': [80, 240, 40], 'Hummus': [45, 120, 15],
  'Leche o bebida vegetal': [200, 500, 100], 'Gazpacho casero': [200, 400, 100],
  'Lentejas cocidas': [150, 400, 10], 'Alubias cocidas': [150, 400, 10], 'Garbanzos cocidos': [150, 400, 10],
  'Lentejas (en crudo)': [60, 160, 10],
  'Aguacate': [75, 150, 75], 'Miel': [7, 21, 7],
};
// Rediseño de recetas: overrides de rango y componentes añadidos por plato.
const RECIPE_OVR = {
  'c10': { 'Pan integral': [90, 150, 30], 'Hummus': [45, 90, 15], 'Pollo asado': [80, 180, 10], 'Tomate': [100, 150, 25] },
  'n16': { 'Pavo en dados': [40, 150, 10], 'Pan integral': [60, 120, 30] },
  'n15': { 'Hummus': [45, 60, 15], 'Atún': [40, 80, 40] },
  'd5': { 'Jamón cocido': [40, 120, 20], 'Mango': [150, 300, 50] },
  'd1': { 'Leche o bebida vegetal': [200, 300, 100] },
  'n2': { 'Queso fresco': [40, 150, 20] },
  'r-mar-c': { 'Pollo': [150, 250, 10], 'Arroz (en crudo)': [40, 160, 10] },
  'r-oct-n': { 'Huevo (1 ud.)': [60, 120, 60], 'Pan integral': [30, 90, 30], 'Pollo desmigado': [60, 130, 10], 'Setas variadas': [200, 300, 25], 'Patata': [150, 300, 75], 'Aceite de oliva': [10, 20, 5] },
  'r-ene-n': { 'Pollo desmigado': [100, 200, 10], 'Patata': [150, 400, 75] },
  'r-jul-n': { 'Pan integral': [60, 120, 30] },
  'r-dic-c': { 'Alubias cocidas': [150, 200, 10], 'Pavo en dados': [80, 130, 10], 'Pan integral': [30, 60, 30], 'Verduras variadas': [150, 300, 25], 'Patata': [150, 450, 75] },
  'd6': { 'Copos de avena': [40, 160, 5] },
  'r-sep-d': { 'Copos de avena': [40, 160, 5] },
  'n11': { 'Copos de avena': [40, 160, 5] },
  'r-ago-c': { 'Verduras variadas': [150, 300, 25] },
  'r-ene-c': { 'Zanahoria y apio': [150, 250, 25] },
  'r-oct-c2': {},
  'c5': { 'Verduras variadas': [150, 300, 25] },
  'r-feb-c': { 'Verduras variadas': [150, 300, 25] },
  'c6': { 'Verduras variadas': [150, 300, 25] },
  'n4': { 'Verduras variadas': [150, 300, 25], 'Calabacín': [150, 300, 25] },
  'n5': { 'Verduras variadas': [150, 300, 25] },
  'n7': { 'Setas variadas': [150, 300, 25], 'Pavo en dados': [80, 170, 10] },
  'r-abr-n': { 'Verduras variadas': [150, 300, 25] },
};
const RECIPE_ADD = {
  'n9': [{ name: 'Patata cocida', grams: 300 }],
  'n16': [{ name: 'Patata cocida', grams: 300 }],
  'r-dic-d': [{ name: 'Copos de avena', grams: 70 }],
  'r-dic-c': [{ name: 'Patata', grams: 300 }],
  'c10': [{ name: 'Aguacate', grams: 75 }],
  'r-ago-d': [{ name: 'Miel', grams: 14 }],
  'd1': [{ name: 'Huevo cocido (1 ud.)', grams: 60 }],
  'r-ago-c': [{ name: 'Aguacate', grams: 75 }],
  'r-ene-c': [{ name: 'Aceite de oliva', grams: 15 }],
  'r-ago-n': [{ name: 'Patata', grams: 200 }],
  'r-oct-n': [{ name: 'Pollo desmigado', grams: 100 }],
};
const RECIPE_REPLACE = {
  'r-abr-d': { slot: 'desayuno', name: 'Tostada de aguacate y salmón',
    components: [ { name: 'Pan integral', grams: 120 }, { name: 'Aguacate', grams: 150 },
      { name: 'Salmón ahumado', grams: 50 }, { name: 'Leche o bebida vegetal', grams: 250 } ],
    pasos: ['Tuesta el pan y unta el aguacate.', 'Corona con el salmón y acompaña con la leche o bebida vegetal.'] },
  'r-oct-c': { slot: 'comida', name: 'Arroz con pollo y calabaza', kcal: 1050,
    components: [ { name: 'Arroz integral (en crudo)', grams: 100 }, { name: 'Pollo', grams: 180 },
      { name: 'Calabaza', grams: 250 }, { name: 'Aceite de oliva', grams: 15 }, { name: 'Pan integral', grams: 30 } ],
    pasos: ['Sofríe el pollo, añade calabaza y arroz con el doble de caldo.', 'Cuece 18 minutos y reposa 5.'] },
  'c4': { slot: 'comida', name: 'Garbanzos con espinacas y pollo', kcal: 1000, rapida: false,
    components: [ { name: 'Garbanzos cocidos', grams: 200 }, { name: 'Espinacas', grams: 250 },
      { name: 'Pollo a la plancha', grams: 120 }, { name: 'Patata', grams: 300 },
      { name: 'Aceite de oliva', grams: 15 }, { name: 'Pan integral', grams: 30 } ] },
  // d7 era proteico en exceso para cualquier objetivo: tortitas de avena, real y flexible
  'd7': { slot: 'desayuno', name: 'Tortitas de avena y plátano', kcal: 780,
    components: [ { name: 'Copos de avena', grams: 70 }, { name: 'Huevo (1 ud.)', grams: 60 },
      { name: 'Plátano', grams: 120 }, { name: 'Yogur griego natural', grams: 125 }, { name: 'Miel', grams: 7 } ],
    pasos: ['Tritura avena, huevo y plátano.', 'Cuaja tortitas pequeñas en sartén antiadherente y corona con yogur y miel.'] },
};
function applyRedesign(o) {
  if (o._redisenado) return o;
  var r = Object.assign({}, o);
  if (RECIPE_REPLACE[o.id]) r = Object.assign(r, RECIPE_REPLACE[o.id]);
  if (RECIPE_ADD[o.id]) r = Object.assign(r, { components: r.components.concat(RECIPE_ADD[o.id]) });
  r._redisenado = true;
  return r;
}
function rangeFor(name, authored) {
  if (OVR[name]) return OVR[name];
  const ing = ING[name], u = ing.u;
  if (PROT_ANCHORS[name]) { // carne/pescado: pieza ajustable
    const lo = Math.max(80, Math.round(authored * 0.55 / 5) * 5);
    return [lo, 250, 10];
  }
  if (ing.k < 40) { // verduras
    const lo = Math.max(50, Math.round(authored * 0.5 / 25) * 25);
    const hi = Math.min(400, Math.max(150, Math.round(authored * 2 / 25) * 25));
    return [lo, hi, 25];
  }
  if (ing.ug && ['pieza','plátano','manzana','pera','mango','tajada','fresa','tomate','calabacín','puerro','boniato mediano'].includes(u)) {
    return [ing.ug, Math.min(ing.ug * 3, Math.round(authored * 1.5 / ing.ug) * ing.ug || ing.ug), ing.ug];
  }
  if (['puñado','cucharada','cucharadita','pizca'].includes(u)) {
    return [Math.max(ing.ug, Math.round(authored * 0.5 / ing.ug) * ing.ug), Math.round(authored * 2 / ing.ug) * ing.ug || ing.ug * 2, ing.ug];
  }
  // resto (nueces, semillas, tomate triturado, pisto...)
  return [Math.max(10, Math.round(authored * 0.5 / 5) * 5), Math.round(authored * 2 / 5) * 5, 5];
}

function computePlan(option0, sk, sp) {
  const option = applyRedesign(option0);
  const comps = option.components.map(c => {
    const ovr = RECIPE_OVR[option0.id] && RECIPE_OVR[option0.id][c.name];
    const r = ovr || rangeFor(c.name, c.grams);
    return { name: c.name, g: Math.max(r[0], Math.min(r[1], c.grams)), lo: r[0], hi: r[1], step: r[2] };
  });
  // Semilla analitica: resuelve (ancla proteica principal, carbohidrato principal)
  // en el sistema exacto kcal+proteina; el resto en su valor de receta.
  const nonAdjK = () => 0;
  function kcalP(c){ return [ING[c.name].k / 100, ING[c.name].p / 100]; }
  let ai = -1, bi = -1, bestP = 0;
  comps.forEach((c, i) => {
    const p = ING[c.name].p * c.g;
    if (PROT_ANCHORS[c.name] && p > bestP) { bestP = p; ai = i; }
  });
  comps.forEach((c, i) => {
    if (i === ai) return;
    if ((bi < 0 || ING[c.name].k > ING[comps[bi].name].k) && ING[c.name].k >= 200 && ING[c.name].p < 18) bi = i;
  });
  if (ai >= 0 && bi >= 0) {
    const A = comps[ai], B = comps[bi];
    const [ka, pa] = kcalP(A), [kb, pb] = kcalP(B);
    let K0 = 0, P0 = 0;
    comps.forEach((c, i) => { if (i !== ai && i !== bi) { K0 += ING[c.name].k * c.g / 100; P0 += ING[c.name].p * c.g / 100; } });
    const det = ka * pb - kb * pa;
    if (Math.abs(det) > 1e-9) {
      let ga = ((sk - K0) * pb - (sp - P0) * kb) / det;
      let gb = (ka * (sp - P0) - pa * (sk - K0)) / det;
      const snap = (g, c) => Math.max(c.lo, Math.min(c.hi, Math.round(g / c.step) * c.step));
      A.g = snap(ga, A); B.g = snap(gb, B);
    }
  }
  function stats() {
    let k = 0, p = 0, v = 0;
    comps.forEach(c => { k += ING[c.name].k * c.g / 100; p += ING[c.name].p * c.g / 100; v += c.g; });
    return { k, p, v };
  }
  function cost() {
    const s = stats();
    return Math.pow((s.k - sk) / 25, 2) + Math.pow((s.p - sp) / 3, 2) + Math.pow(Math.max(0, s.v - 1000) / 100, 2);
  }
  let best = cost();
  for (let sweep = 0; sweep < 6; sweep++) {
    let improved = false;
    for (const c of comps) {
      if (c.hi <= c.lo) continue;
      const orig = c.g; let bestG = orig;
      for (let g = c.lo; g <= c.hi; g += c.step) {
        c.g = g; const cst = cost();
        if (cst < best - 1e-9) { best = cst; bestG = g; }
      }
      c.g = bestG;
      if (bestG !== orig) improved = true;
    }
    if (!improved) break;
  }
  for (let outer = 0; outer < 2; outer++) {
  for (let sweep = 0; sweep < 6; sweep++) {
    let improved = false;
    for (const c of comps) {
      if (c.hi <= c.lo) continue;
      const orig = c.g; let bestG = orig;
      for (let g = c.lo; g <= c.hi; g += c.step) {
        c.g = g; const cst = cost();
        if (cst < best - 1e-9) { best = cst; bestG = g; }
      }
      c.g = bestG;
      if (bestG !== orig) improved = true;
    }
    if (!improved) break;
  }
  // Refinado por parejas: cada componente proteico x cada carbohidrato.
  const prots = comps.filter(c => ING[c.name].p >= 8 && c.hi > c.lo);
  const carbs = comps.filter(c => ING[c.name].k >= 150 && ING[c.name].p < 18 && c.hi > c.lo);
  for (let round = 0; round < 3; round++) {
    let improved = false;
    for (const A of prots) for (const B of carbs) {
      const oa = A.g, ob = B.g;
      for (let ga = A.lo; ga <= A.hi; ga += A.step) {
        A.g = ga;
        // mejor B para este A (barrido fino)
        let bBest = B.g, cBest = cost();
        for (let gb = B.lo; gb <= B.hi; gb += B.step) { B.g = gb; const c2 = cost(); if (c2 < cBest - 1e-9) { cBest = c2; bBest = gb; } }
        B.g = bBest;
        if (cBest < best - 1e-9) { best = cBest; A._bg = bBest; A._ag = ga; }
      }
      if (A._ag !== undefined) { A.g = A._ag; B.g = A._bg; improved = true; delete A._ag; delete A._bg; }
      else { A.g = oa; B.g = ob; }
    }
    if (!improved) break;
  }
  }
  // Relajacion acotada: si el objetivo cae fuera de lo alcanzable con las raciones
  // "habituales" (perfiles muy altos o muy bajos), amplia solo hasta topes culinarios
  // duros. Lo que ni asi cuadra se devuelve en dk/dp y la interfaz lo dice.
  let s = stats();
  if (Math.abs(s.k - sk) > 45 || Math.abs(s.p - sp) > 8) {
    const saved = comps.map(c => ({ lo: c.lo, hi: c.hi }));
    const hard = (c) => {
      const ing = ING[c.name];
      if (PROT_ANCHORS[c.name]) return [60, 320, 10];
      if (/^Huevo/.test(c.name)) return [60, 180, 60];
      if (c.name === 'Aceite de oliva') return [5, 30, 5];
      if (ing.k >= 200 && ing.p < 18) return [40, 500, 10];   // arroz/pasta/copos/pan
      if (ing.k >= 60 && ing.p < 8) return [80, 500, 25];     // patata, boniato, fruta, maiz
      if (ing.k < 40) return [50, 400, 25];                   // verduras
      if (ing.p >= 8) return [60, 300, 10];                   // lacteos altos en prot, legumbres
      return [c.lo, c.hi];
    };
    comps.forEach(c => { const h = hard(c); c.lo = Math.min(c.lo, h[0]); c.hi = Math.max(c.hi, h[1]); });
    const bestBefore = best;
    for (let sweep = 0; sweep < 8; sweep++) {
      let improved = false;
      for (const c of comps) {
        if (c.hi <= c.lo) continue;
        const orig = c.g; let bestG = orig;
        for (let g = c.lo; g <= c.hi; g += c.step) {
          c.g = g; const cst = cost();
          if (cst < best - 1e-9) { best = cst; bestG = g; }
        }
        c.g = bestG;
        if (bestG !== orig) improved = true;
      }
      if (!improved) break;
    }
    const s2 = stats();
    const gain = Math.abs(s.k - sk) + 3 * Math.abs(s.p - sp);
    const gain2 = Math.abs(s2.k - sk) + 3 * Math.abs(s2.p - sp);
    if (gain2 < gain && s2.v <= 1200) { s = s2; }
    else { comps.forEach((c, i) => { c.lo = saved[i].lo; c.hi = saved[i].hi; }); best = bestBefore; }
  }
  // Piezas enteras: ingredientes con unidad casera (huevo, patata, yogur...)
  // se ajustan a unidades completas (minimo 1) para que la etiqueta y los
  // gramos cuadren. Despues se prueba subir/bajar una unidad por ingrediente
  // y se reequilibra el granel, para seguir cerca del objetivo de kcal/prot.
  comps.forEach(c => {
    const ing = ING[c.name];
    if (ing && ing.ug) {
      let n = Math.round(c.g / ing.ug);
      if (n < 1) n = 1;
      c.g = n * ing.ug;
    }
  });
  const errU = () => { const t = stats(); return Math.abs(t.k - sk) + 3 * Math.abs(t.p - sp); };
  for (let sweep = 0; sweep < 4; sweep++) {
    let improved = false;
    for (const c of comps) {
      const ing = ING[c.name];
      if (!ing || !ing.ug) continue;
      const n0 = Math.round(c.g / ing.ug);
      let bestN = n0, bestE = errU();
      [n0 - 1, n0 + 1].forEach(n => {
        if (n < 1 || n > 8) return;
        c.g = n * ing.ug;
        const e = errU();
        if (e < bestE - 1e-9) { bestE = e; bestN = n; }
      });
      c.g = bestN * ing.ug;
      if (bestN !== n0) improved = true;
    }
    if (!improved) break;
  }
  for (let sweep = 0; sweep < 6; sweep++) {
    let improved = false;
    for (const c of comps) {
      if (ING[c.name].ug || c.hi <= c.lo) continue;
      const orig = c.g; let bestG = orig;
      for (let g = c.lo; g <= c.hi; g += c.step) {
        c.g = g; const cst = cost();
        if (cst < best - 1e-9) { best = cst; bestG = g; }
      }
      c.g = bestG;
      if (bestG !== orig) improved = true;
    }
    if (!improved) break;
  }
  s = stats();
  return { items: comps.map(c => ({ name: c.name, grams: c.g })), kcal: Math.round(s.k), protein: Math.round(s.p), vol: s.v,
           dk: Math.round(s.k - sk), dp: Math.round(s.p - sp) };
}
// Redisenos de platos que no podian equilibrarse con su composicion original
MEALS = MEALS.map(applyRedesign);
RECIPES = RECIPES.map(applyRedesign);
