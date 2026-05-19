export const formatPrice = (price: number) => `${price.toLocaleString()}₫`;

export const formatVnd = (value: number) =>
  new Intl.NumberFormat('vi-VN').format(value) + ' VND';

export const formatTradeInValue = (value: number) =>
  `${new Intl.NumberFormat('vi-VN').format(value)} ₫`;

export const parsePrice = (priceStr: string) => {
  return parseInt(priceStr.replace(/\D/g, ''));
};
