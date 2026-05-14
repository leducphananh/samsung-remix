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
    id: 'none',
    name: 'Không thêm Samsung Care+',
    term: 'Bảo hành tiêu chuẩn',
    price: 0,
    desc: 'Vẫn áp dụng bảo hành chính hãng theo điều kiện của Samsung.',
  },
  {
    id: '6m',
    name: 'Samsung Care+ 6 tháng',
    term: 'Bảo vệ rơi vỡ và vào nước',
    price: 1299000,
    desc: 'Phù hợp khi bạn muốn bảo vệ máy trong giai đoạn sử dụng đầu tiên.',
  },
  {
    id: '12m',
    name: 'Samsung Care+ 12 tháng',
    term: 'Bảo vệ toàn diện hơn',
    price: 2199000,
    desc: 'Khuyến nghị cho người dùng thường xuyên di chuyển hoặc làm việc ngoài trời.',
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
export type CarePlusOption = (typeof carePlusOptions)[number];
