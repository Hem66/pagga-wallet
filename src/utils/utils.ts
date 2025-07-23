export const formatDecimals = (value: string): string => {
    const num = Number(value);
    if (num === 0) return '0';
    
    // Remove trailing zeros after decimal point
    const formatted = num.toString();
    if (!formatted.includes('.')) return formatted;
    
    // Limit to 6 decimals max and remove trailing zeros
    const [whole, decimal] = formatted.split('.');
    if (!decimal) return whole;
    
    const trimmed = decimal.slice(0, 6).replace(/0+$/, '');
    return trimmed ? `${whole}.${trimmed}` : whole;
  };