import fs from 'fs';

const imagesDir = 'public/images/parts';
const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.png'));

const imagesMap = {
  "Air filter": files.find(f => f.startsWith('air_filter')),
  "Cabin air filter": files.find(f => f.startsWith('air_filter')),
  "Oil filter": files.find(f => f.startsWith('oil_filter')),
  "Brake pads (front)": files.find(f => f.startsWith('brake_pads')),
  "Brake pads (rear)": files.find(f => f.startsWith('brake_pads')),
  "Brake discs (front pair)": files.find(f => f.startsWith('brake_discs')),
  "Headlight assembly (left)": files.find(f => f.startsWith('headlight')),
  "Tail light (right)": files.find(f => f.startsWith('tail_light')),
  "Car battery 70Ah": files.find(f => f.startsWith('car_battery')),
  "Spark plugs (set of 4)": files.find(f => f.startsWith('spark_plugs')),
  "Radiator": files.find(f => f.startsWith('radiator')),
  "Water pump": files.find(f => f.startsWith('water_pump')),
  "Timing belt kit": files.find(f => f.startsWith('timing_belt')),
  "Alternator": files.find(f => f.startsWith('alternator')),
  "Shock absorbers (front pair)": files.find(f => f.startsWith('shock_absorbers')),
  "Shock absorbers (rear pair)": files.find(f => f.startsWith('shock_absorbers')),
  "CV joint (outer)": files.find(f => f.startsWith('cv_joint')),
  "CV joint (inner)": files.find(f => f.startsWith('cv_joint')),
  "Turbocharger": files.find(f => f.startsWith('turbocharger')),
  "Intercooler": files.find(f => f.startsWith('intercooler')),
  "Fuel pump assembly": files.find(f => f.startsWith('fuel_pump')),
  "Thermostat": files.find(f => f.startsWith('radiator')), // fallback
  "Clutch kit (3-piece)": files.find(f => f.startsWith('brake_discs')), // fallback
  "AC compressor": files.find(f => f.startsWith('alternator')), // fallback
  "LED fog light kit": files.find(f => f.startsWith('headlight')), // fallback
  "Radiator hose kit": files.find(f => f.startsWith('radiator')), // fallback
  "Ignition coil": files.find(f => f.startsWith('spark_plugs')), // fallback
  "Radiator fan motor": files.find(f => f.startsWith('alternator')), // fallback
  "Starter motor": files.find(f => f.startsWith('alternator')), // fallback
  "Headlight bulb H7 (pair)": files.find(f => f.startsWith('headlight')) // fallback
};

const partsPath = 'data/parts.json';
const parts = JSON.parse(fs.readFileSync(partsPath, 'utf8'));

parts.forEach(part => {
  const imageName = imagesMap[part.name];
  if (imageName) {
    part.image = `/images/parts/${imageName}`;
  }
});

fs.writeFileSync(partsPath, JSON.stringify(parts, null, 2));
console.log('Successfully updated parts.json with new AI generated local images!');
