export const EMISSION_FACTORS = {
  publicTransportMix: {
    value: 0.02,
    unit: 'kg CO₂/person km',
    description: 'Public transportation including buses and trains'
  },
  cyclingAndWorking: {
    value: 0,
    unit: 'kg CO₂/km',
    description: 'Cycling and walking activities'
  },
  passengerCar: {
    value: 0.193,
    unit: 'kg CO₂/km',
    description: 'Regular passenger vehicles'
  },
  gasolineCar: {
    value: 0.204,
    unit: 'kg CO₂/km',
    description: 'Gasoline-powered vehicles'
  },
  dieselCar: {
    value: 0.18,
    unit: 'kg CO₂/km',
    description: 'Diesel-powered vehicles'
  },
  hybridCar: {
    value: 0.137,
    unit: 'kg CO₂/km',
    description: 'Hybrid electric vehicles'
  },
  electricCar: {
    value: 0.069,
    unit: 'kg CO₂/km',
    description: 'Fully electric vehicles'
  },
  airplaneEurope: {
    value: 0.022,
    unit: 'kg CO₂/km',
    description: 'European air travel'
  }
};

export type TransportMode = keyof typeof EMISSION_FACTORS;

export function formatUnit(unit: string): string {
  return unit.replace('CO2', 'CO₂');
}

export function calculateEmissions(mode: TransportMode, distance: number): number {
  return Math.round(EMISSION_FACTORS[mode].value * distance * 1000) / 1000;
}
