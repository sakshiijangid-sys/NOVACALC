import * as math from 'mathjs';

export class MathService {
  static evaluate(expression: string): string {
    try {
      // Basic sanitization
      const cleaned = expression.replace(/[^-+*/%0-9().^a-z]/gi, '');
      const result = math.evaluate(cleaned);
      
      if (typeof result === 'number') {
        // Handle precision issues
        return Number(result.toPrecision(12)).toString();
      }
      return result.toString();
    } catch (error) {
      console.error('Calculation error:', error);
      return 'Error';
    }
  }

  static formatValue(value: string | number): string {
    if (typeof value === 'number') {
      return value.toLocaleString(undefined, { maximumFractionDigits: 10 });
    }
    return value;
  }
}
