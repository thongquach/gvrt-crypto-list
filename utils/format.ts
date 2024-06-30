export const formatNumber = (num: number) => {
  return Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

export const formatCurrency = (num: number, currency: string) => {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(num);
};
