export type StatType = 'addToCart' | 'buyNow' | 'cancel';

export function trackStat(type: StatType, productId: number) {
  if (typeof window === 'undefined') return;
  const stats = JSON.parse(localStorage.getItem('stats') || '{}');
  if (!stats[productId]) stats[productId] = { addToCart: 0, buyNow: 0, cancel: 0 };
  stats[productId][type]++;
  localStorage.setItem('stats', JSON.stringify(stats));
}

export function getStats() {
  if (typeof window === 'undefined') return {};
  return JSON.parse(localStorage.getItem('stats') || '{}');
}

export function getTotalStats() {
  const stats = getStats();
  let total = { addToCart: 0, buyNow: 0, cancel: 0 };
  Object.values(stats).forEach((s: any) => {
    total.addToCart += s.addToCart || 0;
    total.buyNow += s.buyNow || 0;
    total.cancel += s.cancel || 0;
  });
  return total;
}