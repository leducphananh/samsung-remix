export const products = {
  's24-ultra': {
    name: 'Galaxy S24 Ultra',
    price: 33990000,
    rating: 4.7,
    reviews: 1248,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC1tJp-G6ehRlr--Sr4U4Z6wbXU6u5CEjdarbODlnXfH3jo1WZKUeRW5aDkdaGw0zVs9AJbJSMtYi_Ij_satv9N8tgyk8AT1mPCRjG7IY3Au39hheLPBSM5M1oUe-d4ufOTOoa-MMtAk0AFAQc-SSA9DK-p1QcTXLgg7eovnAWa_fazTgSrHwrvQDnzh8w2nmz8PZMNwQqcRy-qO-uop4m0O0XwHRvlJoLyfAqK74EuppjXdXJQ3A7A6a4zljhHIv0_vaWNrxL9rH0',
    colors: [
      { name: 'Xám Titanium', value: '#8E8E8E' },
      { name: 'Đen Titanium', value: '#1A1A1A' },
      { name: 'Tím Titanium', value: '#5C5070' },
      { name: 'Vàng Titanium', value: '#F3E5AB' },
    ],
    storage: [
      { size: '256 GB', price: 33990000 },
      { size: '512 GB', price: 37490000 },
      { size: '1 TB', price: 44490000 },
    ],
    ratingBreakdown: [
      { stars: 5, count: 936 },
      { stars: 4, count: 212 },
      { stars: 3, count: 74 },
      { stars: 2, count: 18 },
      { stars: 1, count: 8 },
    ],
    reviewHighlights: [
      'Camera zoom rất sắc nét',
      'Pin dùng trọn ngày',
      'Màn hình sáng ngoài trời',
      'Galaxy AI hữu ích',
    ],
    customerReviews: [
      {
        name: 'Minh Anh',
        rating: 5,
        date: '12/05/2026',
        title: 'Camera và màn hình đúng chất flagship',
        content:
          'Ảnh zoom xa vẫn chi tiết, màn hình ngoài nắng nhìn rõ. Máy cầm chắc tay hơn mình nghĩ.',
      },
      {
        name: 'Hoàng Nam',
        rating: 4,
        date: '08/05/2026',
        title: 'Hiệu năng mạnh, AI tiện',
        content:
          'Dịch cuộc gọi và tóm tắt ghi chú dùng được ngay trong công việc. Máy hơi lớn nhưng pin rất ổn.',
      },
    ],
  },
} as const;

export const carePlusOptions = [
  {
    id: 'accidental-damage',
    title: 'Gói Rơi vỡ vào nước',
    price: '1.299.000 ₫ hoặc 3.399.000 ₫',
    details: [
      'Bảo vệ thiết bị với các rủi ro liên quan rơi vỡ và vào nước',
      'Thay mới thiết bị khi hư hại trên 85%',
      'Dịch vụ và linh kiện chính hãng',
      'Được sửa chữa và bảo vệ toàn cầu lên đến 55 quốc gia',
    ],
    options: [
      {
        id: 1,
        label: 'Samsung Care+ 6 Tháng',
        price: 1299000,
      },
      {
        id: 2,
        label: 'Samsung Care+ 1 Năm - Giảm 15%',
        price: 1725000,
      },
      {
        id: 3,
        label: 'Samsung Care+ 2 Năm',
        price: 3399000,
      },
    ],
  },
  {
    id: 'extended-warranty',
    title: 'Gói Gia hạn bảo hành',
    price: 'Chỉ từ 499.000 ₫',
    details: ['Gia hạn bảo hành chính hãng với các lỗi liên quan kỹ thuật'],
    options: [
      {
        id: 1,
        label: 'Gói Gia Hạn Bảo Hành 6 Tháng',
        price: 499000,
      },
      {
        id: 2,
        label: 'Gói Gia Hạn Bảo Hành 2 Năm',
        price: 1490000,
      },
      {
        id: 3,
        label: 'Gói Gia Hạn Bảo Hành 1 Năm - Giảm 20%',
        price: 639000,
      },
    ],
  },
  {
    id: 'none',
    title: 'Không, cảm ơn',
  },
] as const;

export const productFeatures = {
  'Tính năng nổi bật': [
    {
      title: 'Quyền năng Galaxy AI',
      desc: 'Mở ra kỷ nguyên trí tuệ mới với Khoanh vùng search đa năng, Phiên dịch trực tiếp cuộc gọi và Trợ lý Note thông minh.',
    },
    {
      title: 'Chipset Snapdragon® 8 Gen 3',
      desc: 'Hiệu năng mạnh mẽ nhất từ trước đến nay trên dòng Galaxy, tối ưu cho chơi game và đa nhiệm mượt mà.',
    },
    {
      title: 'Màn hình 2600 nits',
      desc: 'Màn hình Dynamic AMOLED 2X sáng rõ ngay cả dưới ánh nắng gắt.',
    },
  ],
} as const;

export const accordionItems = [
  'Tính năng nổi bật',
  'Thông số kỹ thuật',
  'Trong hộp có gì',
  'Đánh giá & Xếp hạng',
] as const;

export type Product = (typeof products)[keyof typeof products];
export type ProductColor = Product['colors'][number];
export type ProductStorage = Product['storage'][number];
export interface CarePlusOption {
  id: string;
  title: string;
  price?: string;
  details?: readonly string[];
  options?: readonly {
    id: number;
    label: string;
    price: number;
  }[];
}

export interface CarePlusSelection {
  id: string;
  title: string;
  price: number;
  label?: string;
}
