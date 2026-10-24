// Auditoría pasos vs componentes: heurística de sustantivos clave por ingrediente
const KEY = {
  'Aceite de oliva': ['aceite'], 'Aguacate': ['aguacate'], 'Alubias cocidas': ['alubia'],
  'Arroz (en crudo)': ['arroz'], 'Arroz integral (en crudo)': ['arroz'], 'Atún': ['atún'],
  'Boniato': ['boniato'], 'Brócoli': ['brócoli'], 'Calabacín': ['calabacín'], 'Calabaza': ['calabaza'],
  'Calamares': ['calamar'], 'Canela': ['canela'], 'Coco rallado': ['coco'], 'Copos de avena': ['avena'],
  'Ensalada': ['ensalada'], 'Ensalada mixta': ['ensalada'], 'Ensalada variada': ['ensalada'],
  'Espinacas': ['espinaca'], 'Fresas': ['fresa'], 'Fruta de temporada': ['fruta'],
  'Garbanzos cocidos': ['garbanzo'], 'Gazpacho casero': ['gazpacho'], 'Huevo': ['huevo'],
  'Huevo cocido': ['huevo'], 'Huevos (2 uds.)': ['huevo'], 'Hummus': ['hummus'],
  'Fiambre de pavo': ['pavo', 'fiambre'], 'Jamón cocido': ['jamón'], 'Leche o bebida vegetal': ['leche', 'bebida'],
  'Lentejas (en crudo)': ['lenteja'], 'Lentejas cocidas': ['lenteja'], 'Lubina': ['lubina'],
  'Mango': ['mango'], 'Manzana': ['manzana'], 'Maíz dulce': ['maíz'], 'Melón': ['melón'],
  'Merluza': ['merluza'], 'Miel': ['miel'], 'Muesli sin azúcar': ['muesli'], 'Nueces': ['nuez', 'nueces'],
  'Pan integral': ['pan'], 'Pasta (en crudo)': ['pasta'], 'Pasta integral (en crudo)': ['pasta'],
  'Patata': ['patata'], 'Patata cocida': ['patata'], 'Pavo en dados': ['pavo'], 'Pavo picado': ['pavo'],
  'Pechuga de pavo': ['pavo'], 'Pechuga de pollo': ['pollo', 'pechuga'], 'Pera': ['pera'],
  'Pescado blanco': ['pescado'], 'Pimiento y cebolla': ['pimiento', 'cebolla'], 'Pisto casero': ['pisto'],
  'Plátano': ['plátano'], 'Pollo': ['pollo'], 'Pollo a la plancha': ['pollo'], 'Pollo asado': ['pollo'],
  'Pollo desmigado': ['pollo'], 'Pollo en dados': ['pollo'], 'Puerro': ['puerro'],
  'Queso fresco': ['queso'], 'Requesón': ['requesón'], 'Salmón': ['salmón'], 'Salmón ahumado': ['salmón'],
  'Semillas variadas': ['semilla'], 'Sepia': ['sepia'], 'Setas variadas': ['seta'],
  'Ternera para guisar': ['ternera'], 'Tomate': ['tomate'], 'Tomate natural': ['tomate'],
  'Tomate triturado': ['tomate'], 'Tomate y lechuga': ['tomate', 'lechuga'], 'Verduras salteadas': ['verdura', 'saltead'],
  'Verduras variadas': ['verdura'], 'Yogur griego natural': ['yogur'], 'Yogur natural': ['yogur'],
  'Zanahoria y apio': ['zanahoria', 'apio'], 'Zanahoria y calabacín': ['zanahoria', 'calabacín'],
  'Pan de hamburguesa integral': ['pan', 'monta'], 'Tortilla de trigo integral': ['tortilla', 'wrap', 'rellena', 'enrolla'],
  'Carne picada de ternera': ['carne', 'burger', 'hamburguesa'], 'Pollo picado': ['pollo', 'burger', 'hamburguesa'],
};
MEALS.concat(RECIPES).forEach(o => {
  const pasos = (o.pasos || []).join(' ').toLowerCase();
  const missing = o.components.filter(c => {
    const keys = KEY[c.name] || [c.name.toLowerCase().split(' ')[0]];
    return !keys.some(k => pasos.includes(k) || o.name.toLowerCase().includes(k));
  });
  if (missing.length) console.log(o.id, '|', o.name, '| FALTAN en pasos:', missing.map(c => c.name).join(', '), '|| pasos:', (o.pasos || []).join(' / '));
});
