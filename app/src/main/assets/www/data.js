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
  { id: 'd1', slot: 'desayuno', name: 'Tostada con tomate y jamón', kcal: 555, components: [
      { name: 'Pan integral', grams: 70 }, { name: 'Tomate triturado', grams: 100 }, { name: 'Aceite de oliva', grams: 10 }, { name: 'Leche o bebida vegetal', grams: 200 }, { name: 'Fruta de temporada', grams: 150 }, { name: 'Jamón cocido', grams: 80 } ] },
  { id: 'd2', slot: 'desayuno', name: 'Avena con yogur', kcal: 575, components: [
      { name: 'Copos de avena', grams: 60 }, { name: 'Yogur griego natural', grams: 250 }, { name: 'Plátano', grams: 100 }, { name: 'Nueces', grams: 10 } ] },
  { id: 'd3', slot: 'desayuno', name: 'Revuelto con aguacate y jamón', kcal: 460, components: [
      { name: 'Huevos (2 uds.)', grams: 120 }, { name: 'Pan integral', grams: 50 }, { name: 'Aguacate', grams: 60 }, { name: 'Jamón cocido', grams: 50 } ] },
  { id: 'd4', slot: 'desayuno', name: 'Yogur con muesli', kcal: 425, rapida: true, tiempo: '5 min · sin cocinar', components: [
      { name: 'Yogur griego natural', grams: 250 }, { name: 'Muesli sin azúcar', grams: 40 }, { name: 'Manzana', grams: 120 }, { name: 'Miel', grams: 10 } ] },
  { id: 'c1', slot: 'comida', name: 'Pollo con arroz', kcal: 635, components: [
      { name: 'Pechuga de pollo', grams: 160 }, { name: 'Arroz integral (en crudo)', grams: 70 }, { name: 'Ensalada mixta', grams: 150 }, { name: 'Aceite de oliva', grams: 10 } ] },
  { id: 'c2', slot: 'comida', name: 'Lentejas con verduras y pavo', kcal: 735, components: [
      { name: 'Lentejas (en crudo)', grams: 80 }, { name: 'Zanahoria y calabacín', grams: 250 }, { name: 'Patata', grams: 150 }, { name: 'Aceite de oliva', grams: 10 }, { name: 'Pavo en dados', grams: 60 }, { name: 'Huevo cocido (1 ud.)', grams: 60 } ] },
  { id: 'c3', slot: 'comida', name: 'Salmón con patata', kcal: 660, components: [
      { name: 'Salmón', grams: 150 }, { name: 'Patata', grams: 250 }, { name: 'Brócoli', grams: 200 }, { name: 'Aceite de oliva', grams: 10 } ] },
  { id: 'c4', slot: 'comida', name: 'Garbanzos con espinacas', kcal: 565, components: [
      { name: 'Garbanzos cocidos', grams: 200 }, { name: 'Espinacas', grams: 250 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Aceite de oliva', grams: 10 } ] },
  { id: 'n1', slot: 'cena', name: 'Merluza con verduras', kcal: 485, components: [
      { name: 'Merluza', grams: 180 }, { name: 'Verduras salteadas', grams: 300 }, { name: 'Pan integral', grams: 40 }, { name: 'Aceite de oliva', grams: 10 } ] },
  { id: 'n2', slot: 'cena', name: 'Tortilla con ensalada', kcal: 490, components: [
      { name: 'Huevos (2 uds.)', grams: 120 }, { name: 'Ensalada variada', grams: 250 }, { name: 'Pan integral', grams: 40 }, { name: 'Aceite de oliva', grams: 10 }, { name: 'Queso fresco', grams: 60 } ] },
  { id: 'n3', slot: 'cena', name: 'Pavo con boniato', kcal: 495, components: [
      { name: 'Pechuga de pavo', grams: 160 }, { name: 'Boniato', grams: 250 }, { name: 'Ensalada', grams: 100 }, { name: 'Aceite de oliva', grams: 5 } ] },
  { id: 'n4', slot: 'cena', name: 'Crema de calabacín', kcal: 380, components: [
      { name: 'Calabacín', grams: 350 }, { name: 'Pollo desmigado', grams: 120 }, { name: 'Patata', grams: 100 }, { name: 'Aceite de oliva', grams: 5 } ] },
  { id: 'd5', slot: 'desayuno', name: 'Tortilla francesa con jamón y pan', kcal: 605, components: [
      { name: 'Huevos (2 uds.)', grams: 120 }, { name: 'Pan integral', grams: 60 }, { name: 'Aceite de oliva', grams: 5 }, { name: 'Leche o bebida vegetal', grams: 200 }, { name: 'Mango', grams: 150 }, { name: 'Jamón cocido', grams: 40 } ] },
  { id: 'd6', slot: 'desayuno', name: 'Avena fría con fresas', kcal: 460, components: [
      { name: 'Copos de avena', grams: 60 }, { name: 'Yogur griego natural', grams: 200 }, { name: 'Fresas', grams: 150 }, { name: 'Miel', grams: 10 } ] },
  { id: 'd7', slot: 'desayuno', name: 'Tostada de pavo y queso fresco', kcal: 435, components: [
      { name: 'Pan integral', grams: 80 }, { name: 'Pechuga de pavo', grams: 60 }, { name: 'Queso fresco', grams: 50 }, { name: 'Tomate', grams: 50 }, { name: 'Leche o bebida vegetal', grams: 200 } ] },
  { id: 'd8', slot: 'desayuno', name: 'Bowl de yogur, plátano y nueces', kcal: 455, rapida: true, tiempo: '5 min · sin cocinar', components: [
      { name: 'Yogur griego natural', grams: 250 }, { name: 'Plátano', grams: 120 }, { name: 'Nueces', grams: 20 }, { name: 'Miel', grams: 10 } ] },
  { id: 'c5', slot: 'comida', name: 'Ternera guisada con patatas', kcal: 660, components: [
      { name: 'Ternera para guisar', grams: 180 }, { name: 'Patata', grams: 250 }, { name: 'Verduras variadas', grams: 250 }, { name: 'Aceite de oliva', grams: 10 } ] },
  { id: 'c6', slot: 'comida', name: 'Merluza al horno con patata', kcal: 510, components: [
      { name: 'Merluza', grams: 200 }, { name: 'Patata', grams: 200 }, { name: 'Verduras salteadas', grams: 200 }, { name: 'Aceite de oliva', grams: 10 } ] },
  { id: 'c7', slot: 'comida', name: 'Pasta con pollo y verduras', kcal: 695, components: [
      { name: 'Pasta (en crudo)', grams: 80 }, { name: 'Pechuga de pollo', grams: 150 }, { name: 'Pimiento y cebolla', grams: 200 }, { name: 'Aceite de oliva', grams: 10 } ] },
  { id: 'c8', slot: 'comida', name: 'Ensalada de garbanzos y atún', kcal: 545, rapida: true, tiempo: '5 min · sin cocinar', components: [
      { name: 'Garbanzos cocidos', grams: 200 }, { name: 'Atún', grams: 80 }, { name: 'Tomate', grams: 100 }, { name: 'Ensalada', grams: 100 }, { name: 'Aceite de oliva', grams: 10 } ] },
  { id: 'n5', slot: 'cena', name: 'Lubina con verduras', kcal: 490, components: [
      { name: 'Lubina', grams: 200 }, { name: 'Verduras variadas', grams: 300 }, { name: 'Patata', grams: 150 }, { name: 'Aceite de oliva', grams: 10 } ] },
  { id: 'n6', slot: 'cena', name: 'Salteado de ternera con arroz', kcal: 670, components: [
      { name: 'Ternera para guisar', grams: 150 }, { name: 'Arroz (en crudo)', grams: 60 }, { name: 'Verduras salteadas', grams: 250 }, { name: 'Aceite de oliva', grams: 10 } ] },
  { id: 'n7', slot: 'cena', name: 'Revuelto de setas y pavo', kcal: 410, components: [
      { name: 'Setas variadas', grams: 300 }, { name: 'Pavo en dados', grams: 120 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Aceite de oliva', grams: 10 } ] },
  { id: 'n9', slot: 'cena', name: 'Tostas de atún y aguacate', kcal: 370, rapida: true, tiempo: '0 min · sin cocinar', components: [
      { name: 'Pan integral', grams: 60 }, { name: 'Atún', grams: 80 }, { name: 'Aguacate', grams: 75 }, { name: 'Tomate', grams: 50 } ] },
  { id: 'n10', slot: 'cena', name: 'Plato de jamón, queso fresco y nueces', kcal: 485, rapida: true, tiempo: '0 min · sin cocinar', components: [
      { name: 'Jamón cocido', grams: 80 }, { name: 'Queso fresco', grams: 100 }, { name: 'Nueces', grams: 25 }, { name: 'Pan integral', grams: 50 } ] },
  { id: 'n11', slot: 'cena', name: 'Yogur griego con avena y plátano', kcal: 460, rapida: true, tiempo: '0 min · sin cocinar', components: [
      { name: 'Yogur griego natural', grams: 250 }, { name: 'Copos de avena', grams: 40 }, { name: 'Plátano', grams: 100 }, { name: 'Miel', grams: 10 } ] },
  { id: 'n12', slot: 'cena', name: 'Ensalada de lentejas de bote con huevo', kcal: 430, rapida: true, tiempo: '5 min · sin cocinar', components: [
      { name: 'Lentejas cocidas', grams: 200 }, { name: 'Huevo cocido (1 ud.)', grams: 60 }, { name: 'Tomate', grams: 100 }, { name: 'Aceite de oliva', grams: 10 } ] },
  { id: 'n13', slot: 'cena', name: 'Tortilla exprés de atún', kcal: 400, rapida: true, tiempo: '10 min · sartén', components: [
      { name: 'Huevos (2 uds.)', grams: 120 }, { name: 'Atún', grams: 80 }, { name: 'Pan integral', grams: 40 }, { name: 'Ensalada', grams: 100 } ] },
  { id: 'n14', slot: 'cena', name: 'Sándwich de pavo y queso fresco', kcal: 370, rapida: true, tiempo: '5 min · sin cocinar', components: [
      { name: 'Pan integral', grams: 80 }, { name: 'Pechuga de pavo', grams: 80 }, { name: 'Queso fresco', grams: 50 }, { name: 'Tomate y lechuga', grams: 50 } ] },
  { id: 'n15', slot: 'cena', name: 'Hummus con crudités y atún', kcal: 370, rapida: true, tiempo: '0 min · sin cocinar', components: [
      { name: 'Hummus', grams: 80 }, { name: 'Atún', grams: 60 }, { name: 'Zanahoria y apio', grams: 150 }, { name: 'Pan integral', grams: 50 } ] },
  { id: 'n16', slot: 'cena', name: 'Gazpacho con pavo y huevo', kcal: 435, rapida: true, tiempo: '0 min · sin cocinar', components: [
      { name: 'Gazpacho casero', grams: 300 }, { name: 'Pavo en dados', grams: 80 }, { name: 'Huevo cocido (1 ud.)', grams: 60 }, { name: 'Pan integral', grams: 40 } ] },
  { id: 'c9', slot: 'comida', name: 'Ensalada fría de pasta y atún', kcal: 540, rapida: true, tiempo: '12 min · solo hervir pasta', components: [
      { name: 'Pasta (en crudo)', grams: 80 }, { name: 'Atún', grams: 80 }, { name: 'Tomate', grams: 100 }, { name: 'Maíz dulce', grams: 60 }, { name: 'Aceite de oliva', grams: 10 } ] },
  { id: 'c10', slot: 'comida', name: 'Tostadas de hummus y pollo asado', kcal: 505, rapida: true, tiempo: '5 min · sin cocinar', components: [
      { name: 'Pan integral', grams: 80 }, { name: 'Hummus', grams: 60 }, { name: 'Pollo asado', grams: 100 }, { name: 'Tomate y lechuga', grams: 100 } ] } ,
  { id: 'n8', slot: 'cena', name: 'Requesón con fruta y nueces', kcal: 475, rapida: true, tiempo: '5 min · sin cocinar', components: [
      { name: 'Requesón', grams: 200 }, { name: 'Fresas', grams: 150 }, { name: 'Nueces', grams: 20 }, { name: 'Pan integral', grams: 40 } ] } 
];

const RECIPES = [
  { id: 'r-ene-d', month: 0, slot: 'desayuno', name: 'Porridge de avena y pera', kcal: 510, components: [
      { name: 'Copos de avena', grams: 60 }, { name: 'Pera', grams: 150 }, { name: 'Yogur griego natural', grams: 250 }, { name: 'Canela', grams: 2 } ], pasos: ['Cuece la avena con agua o leche 5 minutos.', 'Añade la pera en dados y la canela, y termina con el yogur.'] },
  { id: 'r-ene-c', month: 0, slot: 'comida', name: 'Cocido ligero de garbanzos', kcal: 655, components: [
      { name: 'Garbanzos cocidos', grams: 220 }, { name: 'Zanahoria y apio', grams: 150 }, { name: 'Patata', grams: 150 }, { name: 'Pavo en dados', grams: 100 } ], pasos: ['Cuece las verduras y la patata 20 minutos.', 'Añade garbanzos y pavo, y cocina 10 minutos más.'] },
  { id: 'r-ene-n', month: 0, slot: 'cena', name: 'Sopa de verduras con huevo y pollo', kcal: 490, components: [
      { name: 'Verduras variadas', grams: 350 }, { name: 'Patata', grams: 150 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Aceite de oliva', grams: 5 }, { name: 'Pollo desmigado', grams: 80 } ], pasos: ['Cuece verduras y patata en caldo 20 minutos.', 'Añade el huevo escalfado al final.'] },
  { id: 'r-feb-d', month: 1, slot: 'desayuno', name: 'Tostada con hummus y huevo', kcal: 375, components: [
      { name: 'Pan integral', grams: 70 }, { name: 'Hummus', grams: 60 }, { name: 'Huevo cocido (1 ud.)', grams: 60 }, { name: 'Tomate', grams: 50 } ], pasos: ['Tuesta el pan y unta el hummus.', 'Corona con el huevo cocido en láminas y tomate.'] },
  { id: 'r-feb-c', month: 1, slot: 'comida', name: 'Estofado de ternera', kcal: 585, components: [
      { name: 'Ternera para guisar', grams: 150 }, { name: 'Patata', grams: 200 }, { name: 'Verduras variadas', grams: 300 }, { name: 'Aceite de oliva', grams: 10 } ], pasos: ['Dora la ternera y añade las verduras.', 'Cubre con agua y guisa 45 minutos a fuego lento.'] },
  { id: 'r-feb-n', month: 1, slot: 'cena', name: 'Crema de puerro con pollo', kcal: 540, components: [
      { name: 'Puerro', grams: 300 }, { name: 'Patata', grams: 150 }, { name: 'Pollo', grams: 120 }, { name: 'Aceite de oliva', grams: 5 } ], pasos: ['Cuece puerro y patata 20 minutos y tritura.', 'Añade el pollo a la plancha en dados.'] },
  { id: 'r-mar-d', month: 2, slot: 'desayuno', name: 'Bizcocho de avena en taza', kcal: 460, components: [
      { name: 'Copos de avena', grams: 60 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Yogur natural', grams: 150 }, { name: 'Plátano', grams: 50 } ], pasos: ['Mezcla avena, huevo y plátano en una taza.', 'Microondas 2-3 minutos y acompaña con el yogur.'] },
  { id: 'r-mar-c', month: 2, slot: 'comida', name: 'Paella de pollo y verduras', kcal: 685, components: [
      { name: 'Arroz (en crudo)', grams: 80 }, { name: 'Pollo', grams: 150 }, { name: 'Verduras variadas', grams: 200 }, { name: 'Aceite de oliva', grams: 10 } ], pasos: ['Sofríe el pollo y las verduras.', 'Añade arroz y caldo (doble de volumen) y cuece 18 minutos.'] },
  { id: 'r-mar-n', month: 2, slot: 'cena', name: 'Ensalada tibia de lentejas', kcal: 425, components: [
      { name: 'Lentejas cocidas', grams: 180 }, { name: 'Queso fresco', grams: 80 }, { name: 'Verduras crudas', grams: 150 }, { name: 'Aceite de oliva', grams: 10 } ], pasos: ['Mezcla las lentejas templadas con las verduras.', 'Añade el queso fresco y aliña.'] },
  { id: 'r-abr-d', month: 3, slot: 'desayuno', name: 'Tostada de aguacate y salmón', kcal: 350, components: [
      { name: 'Pan integral', grams: 60 }, { name: 'Aguacate', grams: 60 }, { name: 'Salmón ahumado', grams: 40 }, { name: 'Yogur natural', grams: 100 } ], pasos: ['Tuesta el pan y unta el aguacate.', 'Corona con el salmón y acompaña con el yogur.'] },
  { id: 'r-abr-c', month: 3, slot: 'comida', name: 'Arroz negro con sepia', kcal: 545, components: [
      { name: 'Arroz (en crudo)', grams: 80 }, { name: 'Sepia', grams: 150 }, { name: 'Pimiento y cebolla', grams: 150 }, { name: 'Aceite de oliva', grams: 10 } ], pasos: ['Sofríe la sepia con las verduras.', 'Añade arroz, caldo y tinta; cuece 18 minutos.'] },
  { id: 'r-abr-n', month: 3, slot: 'cena', name: 'Pescado en papillote', kcal: 455, components: [
      { name: 'Pescado blanco', grams: 180 }, { name: 'Verduras variadas', grams: 300 }, { name: 'Patata', grams: 150 }, { name: 'Aceite de oliva', grams: 10 } ], pasos: ['Coloca todo en papel de horno con un hilo de aceite.', 'Hornea 20 minutos a 180 °C.'] },
  { id: 'r-may-d', month: 4, slot: 'desayuno', name: 'Yogur con fresas y avena', kcal: 495, components: [
      { name: 'Yogur griego natural', grams: 250 }, { name: 'Fresas', grams: 150 }, { name: 'Copos de avena', grams: 50 }, { name: 'Nueces', grams: 10 } ], pasos: ['Sirve el yogur en un bol.', 'Añade fresas, avena y nueces por encima.'] },
  { id: 'r-may-c', month: 4, slot: 'comida', name: 'Pasta integral con atún', kcal: 545, components: [
      { name: 'Pasta integral (en crudo)', grams: 80 }, { name: 'Atún', grams: 120 }, { name: 'Tomate natural', grams: 200 }, { name: 'Aceite de oliva', grams: 10 } ], pasos: ['Cuece la pasta.', 'Saltea con tomate y añade el atún al final.'] },
  { id: 'r-may-n', month: 4, slot: 'cena', name: 'Pisto con huevo y atún', kcal: 550, components: [
      { name: 'Pisto casero', grams: 350 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Pan integral', grams: 40 }, { name: 'Aceite de oliva', grams: 10 }, { name: 'Atún', grams: 80 } ], pasos: ['Calienta el pisto.', 'Añade el huevo a la plancha o escalfado encima.'] },
  { id: 'r-jun-d', month: 5, slot: 'desayuno', name: 'Bol de mango y yogur', kcal: 500, components: [
      { name: 'Mango', grams: 150 }, { name: 'Yogur griego natural', grams: 250 }, { name: 'Copos de avena', grams: 40 }, { name: 'Coco rallado', grams: 10 } ], pasos: ['Tritura medio mango con el yogur.', 'Añade el resto en dados con avena y coco.'] },
  { id: 'r-jun-c', month: 5, slot: 'comida', name: 'Ensalada de garbanzos y atún', kcal: 560, components: [
      { name: 'Garbanzos cocidos', grams: 200 }, { name: 'Atún', grams: 80 }, { name: 'Verduras crudas', grams: 200 }, { name: 'Aceite de oliva', grams: 10 } ], pasos: ['Mezcla todo en un bol grande.', 'Aliña con aceite, limón y sal.'] },
  { id: 'r-jun-n', month: 5, slot: 'cena', name: 'Brocheta de pollo y verduras', kcal: 480, components: [
      { name: 'Pollo en dados', grams: 150 }, { name: 'Verduras variadas', grams: 300 }, { name: 'Pan integral', grams: 40 }, { name: 'Aceite de oliva', grams: 5 } ], pasos: ['Ensarta pollo y verduras alternados.', 'Haz a la plancha 10-12 minutos girando.'] },
  { id: 'r-jul-d', month: 6, slot: 'desayuno', name: 'Tostada fría de yogur y fruta', kcal: 475, components: [
      { name: 'Pan integral', grams: 60 }, { name: 'Yogur griego natural', grams: 250 }, { name: 'Fruta de temporada', grams: 150 }, { name: 'Semillas variadas', grams: 10 } ], pasos: ['Tuesta el pan y deja enfriar.', 'Unta el yogur y cubre con fruta y semillas.'] },
  { id: 'r-jul-c', month: 6, slot: 'comida', name: 'Ensalada de pasta con pollo', kcal: 625, components: [
      { name: 'Pasta (en crudo)', grams: 80 }, { name: 'Pollo a la plancha', grams: 120 }, { name: 'Verduras crudas', grams: 200 }, { name: 'Aceite de oliva', grams: 10 } ], pasos: ['Cuece la pasta y enfría.', 'Mezcla con pollo, verduras y aliño.'] },
  { id: 'r-jul-n', month: 6, slot: 'cena', name: 'Gazpacho con huevo y atún', kcal: 395, components: [
      { name: 'Gazpacho casero', grams: 300 }, { name: 'Huevo cocido (1 ud.)', grams: 60 }, { name: 'Atún', grams: 60 }, { name: 'Pan integral', grams: 40 } ], pasos: ['Sirve el gazpacho bien frío.', 'Añade huevo picado y atún por encima.'] },
  { id: 'r-ago-d', month: 7, slot: 'desayuno', name: 'Bol de melón con yogur', kcal: 450, components: [
      { name: 'Melón', grams: 200 }, { name: 'Yogur griego natural', grams: 250 }, { name: 'Copos de avena', grams: 50 } ], pasos: ['Sirve el yogur en un bol.', 'Añade el melón en dados y la avena.'] },
  { id: 'r-ago-c', month: 7, slot: 'comida', name: 'Pollo frío con tomate y maíz', kcal: 555, components: [
      { name: 'Pollo asado', grams: 150 }, { name: 'Maíz dulce', grams: 100 }, { name: 'Tomate y lechuga', grams: 200 }, { name: 'Pan integral', grams: 60 } ], pasos: ['Desmenuza el pollo frío.', 'Mezcla con tomate, lechuga y maíz; aliña.'] },
  { id: 'r-ago-n', month: 7, slot: 'cena', name: 'Salmón a la plancha', kcal: 540, components: [
      { name: 'Salmón', grams: 140 }, { name: 'Ensalada variada', grams: 300 }, { name: 'Pan integral', grams: 40 }, { name: 'Aceite de oliva', grams: 10 } ], pasos: ['Haz el salmón a la plancha 3-4 minutos por lado.', 'Acompaña con la ensalada aliñada.'] },
  { id: 'r-sep-d', month: 8, slot: 'desayuno', name: 'Tortitas de avena y plátano', kcal: 565, components: [
      { name: 'Copos de avena', grams: 60 }, { name: 'Plátano', grams: 100 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Yogur griego natural', grams: 200 } ], pasos: ['Tritura todo y haz tortitas en sartén antiadherente.', 'Sirve con el yogur.'] },
  { id: 'r-sep-c', month: 8, slot: 'comida', name: 'Arroz integral con huevo y pollo', kcal: 725, components: [
      { name: 'Arroz integral (en crudo)', grams: 80 }, { name: 'Verduras variadas', grams: 300 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Aceite de oliva', grams: 10 }, { name: 'Pollo a la plancha', grams: 100 } ], pasos: ['Cuece el arroz y saltea las verduras.', 'Corona con un huevo a la plancha.'] },
  { id: 'r-sep-n', month: 8, slot: 'cena', name: 'Calamares a la plancha', kcal: 390, components: [
      { name: 'Calamares', grams: 150 }, { name: 'Ensalada variada', grams: 200 }, { name: 'Pan integral', grams: 50 }, { name: 'Aceite de oliva', grams: 10 } ], pasos: ['Haz los calamares a la plancha 2-3 minutos.', 'Acompaña con la ensalada.'] },
  { id: 'r-oct-d', month: 9, slot: 'desayuno', name: 'Porridge con manzana asada', kcal: 565, components: [
      { name: 'Copos de avena', grams: 60 }, { name: 'Manzana', grams: 150 }, { name: 'Yogur griego natural', grams: 250 }, { name: 'Nueces', grams: 10 } ], pasos: ['Cuece la avena 5 minutos.', 'Añade la manzana salteada con canela y las nueces.'] },
  { id: 'r-oct-c', month: 9, slot: 'comida', name: 'Guiso de pollo y calabaza', kcal: 535, components: [
      { name: 'Pollo', grams: 160 }, { name: 'Calabaza', grams: 250 }, { name: 'Patata', grams: 150 }, { name: 'Aceite de oliva', grams: 10 } ], pasos: ['Dora el pollo y añade calabaza y patata.', 'Cubre con caldo y guisa 25 minutos.'] },
  { id: 'r-oct-n', month: 9, slot: 'cena', name: 'Setas salteadas con huevo', kcal: 345, components: [
      { name: 'Setas variadas', grams: 300 }, { name: 'Huevo (1 ud.)', grams: 60 }, { name: 'Pan integral', grams: 40 }, { name: 'Aceite de oliva', grams: 10 } ], pasos: ['Saltea las setas con ajo.', 'Añade el huevo y remueve hasta cuajar.'] },
  { id: 'r-nov-d', month: 10, slot: 'desayuno', name: 'Tostada con requesón y nueces', kcal: 475, components: [
      { name: 'Pan integral', grams: 70 }, { name: 'Requesón', grams: 150 }, { name: 'Nueces', grams: 15 }, { name: 'Fruta de temporada', grams: 100 } ], pasos: ['Tuesta el pan y unta el requesón.', 'Añade las nueces y acompaña con fruta.'] },
  { id: 'r-nov-c', month: 10, slot: 'comida', name: 'Albóndigas de pavo con arroz', kcal: 605, components: [
      { name: 'Pavo picado', grams: 160 }, { name: 'Arroz (en crudo)', grams: 70 }, { name: 'Tomate natural', grams: 150 }, { name: 'Aceite de oliva', grams: 10 } ], pasos: ['Forma las albóndigas y dóralas.', 'Cuece en salsa de tomate 15 minutos y sirve con arroz.'] },
  { id: 'r-nov-n', month: 10, slot: 'cena', name: 'Crema de calabaza con pavo', kcal: 375, components: [
      { name: 'Calabaza', grams: 350 }, { name: 'Pavo en dados', grams: 120 }, { name: 'Patata', grams: 100 }, { name: 'Aceite de oliva', grams: 5 } ], pasos: ['Cuece calabaza y patata, y tritura.', 'Añade el pavo salteado por encima.'] },
  { id: 'r-dic-d', month: 11, slot: 'desayuno', name: 'Tostada con jamón cocido', kcal: 375, components: [
      { name: 'Pan integral', grams: 70 }, { name: 'Jamón cocido', grams: 60 }, { name: 'Aceite de oliva', grams: 5 }, { name: 'Yogur natural', grams: 150 } ], pasos: ['Tuesta el pan con un hilo de aceite.', 'Añade el jamón y acompaña con el yogur.'] },
  { id: 'r-dic-c', month: 11, slot: 'comida', name: 'Alubias con verduras', kcal: 520, components: [
      { name: 'Alubias cocidas', grams: 220 }, { name: 'Verduras variadas', grams: 200 }, { name: 'Pavo en dados', grams: 100 }, { name: 'Aceite de oliva', grams: 5 } ], pasos: ['Sofríe las verduras.', 'Añade alubias y pavo, y cocina 15 minutos.'] },
  { id: 'r-dic-n', month: 11, slot: 'cena', name: 'Lubina al horno', kcal: 470, components: [
      { name: 'Lubina', grams: 180 }, { name: 'Verduras variadas', grams: 300 }, { name: 'Patata', grams: 150 }, { name: 'Aceite de oliva', grams: 10 } ], pasos: ['Hornea la lubina con las verduras 20 minutos a 180 °C.', 'Sirve con un hilo de aceite.'] }
];

const MONTHS = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

const SLOT_LABEL = { desayuno: 'Desayuno', comida: 'Comida', cena: 'Cena' };

const SLOT_SHARE = { desayuno: 0.30, comida: 0.40, cena: 0.30 };
