export type CalculatorMode = 'scientific' | 'converter' | 'currency' | 'history';

export interface CalculationResult {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export interface UnitCategory {
  id: string;
  name: string;
  units: string[];
}

export const UNIT_CATEGORIES: UnitCategory[] = [
  {
    id: 'length',
    name: 'Length',
    units: ['Meter (m)', 'Kilometer (km)', 'Centimeter (cm)', 'Millimeter (mm)', 'Mile (mi)', 'Yard (yd)', 'Foot (ft)', 'Inch (in)'],
  },
  {
    id: 'area',
    name: 'Area',
    units: ['Square Meter (m^2)', 'Square Kilometer (km^2)', 'Square Foot (ft^2)', 'Square Mile (mi^2)', 'Acre (acre)', 'Hectare (hectare)'],
  },
  {
    id: 'mass',
    name: 'Mass',
    units: ['Kilogram (kg)', 'Gram (g)', 'Milligram (mg)', 'Metric Ton (tonne)', 'Pound (lb)', 'Ounce (oz)'],
  },
  {
    id: 'temperature',
    name: 'Temperature',
    units: ['Celsius (degC)', 'Fahrenheit (degF)', 'Kelvin (K)'],
  },
  {
    id: 'data',
    name: 'Data',
    units: ['Bit (bit)', 'Byte (byte)', 'Kilobyte (KB)', 'Megabyte (MB)', 'Gigabyte (GB)', 'Terabyte (TB)'],
  },
  {
    id: 'speed',
    name: 'Speed',
    units: ['m/s', 'km/h', 'mph', 'knot'],
  },
  {
    id: 'time',
    name: 'Time',
    units: ['Second (s)', 'Minute (min)', 'Hour (h)', 'Day (day)', 'Week (week)', 'Month (month)', 'Year (year)'],
  },
];

export const CURRENCY_LIST = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
];
