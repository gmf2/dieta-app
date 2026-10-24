import json, re
d = json.load(open('/tmp/FoodData_Central_sr_legacy_food_json_2021-10-28.json'))
foods = []
for f in d['SRLegacyFoods']:
    vals = {}
    for n in f['foodNutrients']:
        nid = n['nutrient']['id']
        if nid in (1008, 1003, 1005, 1004) and n['nutrient']['unitName'].lower() in ('kcal','g'):
            vals[nid] = n.get('amount', 0)
    foods.append((f['description'], vals.get(1003,0), vals.get(1008,0), vals.get(1005,0), vals.get(1004,0)))

def find(*patterns):
    for pat in patterns:
        rx = re.compile(pat, re.I)
        for f in foods:
            if rx.match(f[0]):
                return f
    return None

M = {
 'Aceite de oliva': [r'Oil, olive, salad or cooking'],
 'Aguacate': [r'Avocados, raw, all commercial varieties'],
 'Alubias cocidas': [r'Beans, white, mature seeds, cooked, boiled, without salt'],
 'Arroz (en crudo)': [r'Rice, white, long-grain, regular, raw, unenriched'],
 'Arroz integral (en crudo)': [r'Rice, brown, long-grain, raw'],
 'Atún': [r'Fish, tuna, light, canned in water, drained solids'],
 'Boniato': [r'Sweet potato, raw, unprepared'],
 'Brócoli': [r'Broccoli, raw'],
 'Calabacín': [r'Squash, summer, zucchini, includes skin, raw'],
 'Calabaza': [r'Pumpkin, raw'],
 'Calamares': [r'Mollusks, squid, mixed species, raw'],
 'Canela': [r'Spices, cinnamon, ground'],
 'Coco rallado': [r'Nuts, coconut meat, dried \(desiccated\), not sweetened'],
 'Copos de avena': [r'Cereals, oats, regular and quick, not fortified, dry'],
 'Ensalada': [r'Lettuce, cos or romaine, raw'],
 'Ensalada mixta': [r'Lettuce, cos or romaine, raw'],
 'Ensalada variada': [r'Lettuce, cos or romaine, raw'],
 'Espinacas': [r'Spinach, raw'],
 'Fresas': [r'Strawberries, raw'],
 'Fruta de temporada': [r'Apples, raw, with skin'],
 'Garbanzos cocidos': [r'Chickpeas \(garbanzo beans, bengal gram\), mature seeds, cooked, boiled, without salt'],
 'Gazpacho casero': None,
 'Huevo': [r'Egg, whole, cooked, hard-boiled'],
 'Huevo cocido': [r'Egg, whole, cooked, hard-boiled'],
 'Hummus': [r'Hummus, commercial'],
 'Fiambre de pavo': [r'Turkey breast, sliced, prepackaged'],
 'Jamón cocido': [r'Ham, sliced, pre-packaged, deli meat \(96% fat free, water added\)', r'Ham, sliced, regular \(approximately 11% fat\)'],
 'Leche o bebida vegetal': [r'Milk, lowfat, fluid, 1% milkfat'],
 'Lentejas (en crudo)': [r'Lentils, raw'],
 'Lentejas cocidas': [r'Lentils, mature seeds, cooked, boiled, without salt'],
 'Lubina': [r'Fish, sea bass, mixed species, raw'],
 'Mango': [r'Mangos, raw'],
 'Manzana': [r'Apples, raw, with skin'],
 'Maíz dulce': [r'Corn, sweet, yellow, raw'],
 'Melón': [r'Melons, cantaloupe, raw'],
 'Merluza': [r'Fish, pollock, Alaska, raw$'],
 'Miel': [r'Honey'],
 'Muesli sin azúcar': [r'Cereals ready-to-eat, granola, homemade'],
 'Nueces': [r'Nuts, walnuts, english'],
 'Pan integral': [r'Bread, whole-wheat, commercially prepared'],
 'Pan de hamburguesa integral': [r'Rolls, hamburger or hot dog, whole wheat'],
 'Tortilla de trigo integral': [r'Tortillas, ready-to-bake or -fry, whole wheat'],
 'Carne picada de ternera': [r'Beef, ground, 90% lean meat / 10% fat, raw'],
 'Pollo picado': [r'Chicken, ground, raw'],
 'Pasta (en crudo)': [r'Pasta, dry, unenriched'],
 'Pasta integral (en crudo)': [r'Pasta, whole-wheat, dry'],
 'Patata': [r'Potatoes, flesh and skin, raw'],
 'Patata cocida': [r'Potatoes, boiled, cooked in skin, flesh, without salt'],
 'Pavo en dados': [r'Turkey, breast, from whole bird, meat only, with added solution, roasted'],
 'Pavo picado': [r'Turkey, ground, 93% lean, 7% fat, raw'],
 'Pechuga de pavo': [r'Turkey, breast, from whole bird, meat only, with added solution, roasted'],
 'Pechuga de pollo': [r'Chicken, broiler or fryers, breast, skinless, boneless, meat only, raw'],
 'Pera': [r'Pears, raw'],
 'Pescado blanco': [r'Fish, haddock, raw'],
 'Pimiento y cebolla': None,
 'Pisto casero': None,
 'Plátano': [r'Bananas, raw'],
 'Pollo': [r'Chicken, broilers or fryers, breast, meat and skin, raw'],
 'Pollo a la plancha': [r'Chicken, broilers or fryers, breast, meat only, cooked, roasted'],
 'Pollo asado': [r'Chicken, broilers or fryers, breast, meat and skin, cooked, roasted'],
 'Pollo desmigado': [r'Chicken, broilers or fryers, breast, meat only, cooked, roasted'],
 'Pollo en dados': [r'Chicken, broiler or fryers, breast, skinless, boneless, meat only, raw'],
 'Puerro': [r'Leeks, \(bulb and lower leaf-portion\), raw'],
 'Queso fresco': [r'Cheese, cottage, creamed, large or small curd'],
 'Requesón': [r'Cheese, cottage, creamed, large or small curd'],
 'Salmón': [r'Fish, salmon, Atlantic, farmed, raw'],
 'Salmón ahumado': [r'Fish, salmon, chinook, smoked'],
 'Semillas variadas': [r'Seeds, chia seeds, dried'],
 'Sepia': [r'Mollusks, cuttlefish, mixed species, raw'],
 'Setas variadas': [r'Mushrooms, white, raw'],
 'Tinta de sepia': None,
 'Ternera para guisar': [r'Beef, chuck for stew, separable lean and fat, select, raw'],
 'Tomate': [r'Tomatoes, red, ripe, raw, year round average'],
 'Tomate natural': [r'Tomatoes, red, ripe, raw, year round average'],
 'Tomate triturado': [r'Tomatoes, crushed, canned'],
 'Tomate y lechuga': None,
 'Verduras crudas': None,
 'Verduras salteadas': None,
 'Verduras variadas': None,
 'Yogur griego natural': [r'Yogurt, Greek, plain, lowfat'],
 'Yogur natural': [r'Yogurt, plain, whole milk'],
 'Zanahoria y apio': None,
 'Zanahoria y calabacín': None,
}

comp = []
print(f"{'INGREDIENTE':28} {'app p/k/c/g':22} {'USDA p/k/c/g':22} {'desv kcal':>9}  FUENTE")
nok = 0; comp_n = 0; missing = []
for line in open('/tmp/ing-list.txt'):
    line = line.strip()
    if not line or line.startswith('TOTAL'): continue
    name, p, k, c, g = line.split('|')
    p, k, c, g = float(p), float(k), float(c), float(g)
    pats = M.get(name, 'NO-MAP')
    if pats is None:
        comp.append(name); comp_n += 1
        print(f'{name:28} {p}/{k}/{c}/{g}'.ljust(52) + ' COMPOSITE (mezcla propia, sin equivalente directo)')
        continue
    if pats == 'NO-MAP':
        missing.append(name)
        print(f'{name:28} SIN MAPEO'); continue
    f = find(*pats)
    if not f:
        missing.append(name)
        print(f'{name:28} NO ENCONTRADO: {pats[0]}'); continue
    dv = (k - f[2]) / f[2] * 100 if f[2] else 0
    flag = ' <<< REVISAR' if abs(dv) > 15 else ''
    if flag: nok += 1
    print(f'{name:28} {str(p)+"/"+str(k)+"/"+str(c)+"/"+str(g):22} {str(round(f[1],1))+"/"+str(round(f[2]))+"/"+str(round(f[3],1))+"/"+str(round(f[4],1)):22} {dv:8.0f}%  {f[0][:60]}{flag}')
print()
print('REVISAR:', nok, '| COMPOSITES:', comp_n, '| SIN MAPEO:', len(missing), missing)
