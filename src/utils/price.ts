export function computePrice(originalPrice: number, discount?: number) {
  return (originalPrice - (originalPrice * (discount ?? 0)) / 100).toFixed(2);
}
