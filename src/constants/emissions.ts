export const EMISSION_FACTORS = {
  publicTransport: {
    value: 0.02,
    unit: 'kg CO₂/person km'
  },
  cycling: {
    value: 0,
    unit: 'kg CO₂/km'
  },
  passengerCar: {
    value: 0.193,
    unit: 'kg CO₂/km'
  },
  gasolineCar: {
    value: 0.204,
    unit: 'kg CO₂/km'
  },
  dieselCar: {
    value: 0.18,
    unit: 'kg CO₂/km'
  },
  hybridCar: {
    value: 0.137,
    unit: 'kg CO₂/km'
  },
  electricCar: {
    value: 0.069,
    unit: 'kg CO₂/km'
  },
  airplaneEurope: {
    value: 0.022,
    unit: 'kg CO₂/km'
  }
};

export type TransportMode = keyof typeof EMISSION_FACTORS;

export function formatUnit(unit: string): string {
  return unit.replace('CO2', 'CO₂');
}

export function calculateEmissions(mode: TransportMode, distance: number): number {
  return Math.round(EMISSION_FACTORS[mode].value * distance * 1000) / 1000;
}
