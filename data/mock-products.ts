import { Product } from '@/types/product.type';

export const mockProducts: Product[] = [
  {
    id: 's26-ultra',
    name: 'Galaxy S26 Ultra',
    price: '33.990.000 VNĐ',
    rating: 4.8,
    reviews: 2342,
    variants: [
      {
        id: 1,
        name: 'Trắng Classic',
        hex: '#f3f4f5',
        img: 'https://images.samsung.com/is/image/samsung/p6pim/vn/s2602/gallery/vn-galaxy-s26-ultra-s948-sm-s948bzwcxxv-thumb-550804953?$Q90_330_330_F_PNG$',
      },
      {
        id: 2,
        name: 'Xanh Sky Blue',
        hex: '#b3cbd9',
        img: 'https://images.samsung.com/is/image/samsung/p6pim/vn/s2602/gallery/vn-galaxy-s26-ultra-s948-sm-s948blbcxxv-thumb-550804058?$Q90_330_330_F_PNG$',
      },
      {
        id: 3,
        name: 'Đen Classic',
        hex: '#494d53',
        img: 'https://images.samsung.com/is/image/samsung/p6pim/vn/s2602/gallery/vn-galaxy-s26-ultra-s948-sm-s948bzkcxxv-thumb-550804317?$Q90_330_330_F_PNG$',
      },
      {
        id: 4,
        name: 'Tím Cobalt',
        hex: '#686884',
        img: 'https://images.samsung.com/is/image/samsung/p6pim/vn/s2602/gallery/vn-galaxy-s26-ultra-s948-sm-s948bzvcxxv-thumb-550804756?$Q90_330_330_F_PNG$',
        default: true,
      },
    ],
    storage: ['256GB', '512GB', '1TB'],
    isNew: true,
  },
  {
    id: 's26-plus',
    name: 'Galaxy S26+',
    price: '26.990.000 VNĐ',
    rating: 4.7,
    reviews: 1215,
    variants: [
      {
        id: 1,
        name: 'Trắng Classic',
        hex: '#f3f4f5',
        img: 'https://images.samsung.com/is/image/samsung/p6pim/vn/s2602/gallery/vn-galaxy-s26-s947-578558-sm-s947bzwcxxv-thumb-551023857?$Q90_330_330_F_PNG$',
      },
      {
        id: 2,
        name: 'Xanh Sky Blue',
        hex: '#b3cbd9',
        img: 'https://images.samsung.com/is/image/samsung/p6pim/vn/s2602/gallery/vn-galaxy-s26-s947-578558-sm-s947blbcxxv-thumb-551023800?$Q90_330_330_F_PNG$',
      },
      {
        id: 3,
        name: 'Đen Classic',
        hex: '#494d53',
        img: 'https://images.samsung.com/is/image/samsung/p6pim/vn/s2602/gallery/vn-galaxy-s26-s947-578558-sm-s947bzkcxxv-thumb-551023819?$Q90_330_330_F_PNG$',
      },
      {
        id: 4,
        name: 'Tím Cobalt',
        hex: '#686884',
        img: 'https://images.samsung.com/is/image/samsung/p6pim/vn/s2602/gallery/vn-galaxy-s26-s947-578558-sm-s947bzvcxxv-thumb-551023838?$Q90_330_330_F_PNG$',
        default: true,
      },
    ],
    storage: ['256GB', '512GB'],
    isNew: false,
  },
  {
    id: 's26',
    name: 'Galaxy S26',
    price: '10.490.000 VNĐ',
    rating: 4.5,
    reviews: 876,
    variants: [
      {
        id: 1,
        name: 'Trắng Classic',
        hex: '#f3f4f5',
        img: 'https://images.samsung.com/is/image/samsung/p6pim/vn/s2602/gallery/vn-galaxy-s26-s942-sm-s942bzwqxxv-thumb-550887061?$Q90_330_330_F_PNG$',
      },
      {
        id: 2,
        name: 'Xanh Sky Blue',
        hex: '#b3cbd9',
        img: 'https://images.samsung.com/is/image/samsung/p6pim/vn/s2602/gallery/vn-galaxy-s26-s942-sm-s942blbqxxv-thumb-550886945?$Q90_330_330_F_PNG$',
      },
      {
        id: 3,
        name: 'Đen Classic',
        hex: '#494d53',
        img: 'https://images.samsung.com/is/image/samsung/p6pim/vn/s2602/gallery/vn-galaxy-s26-s942-sm-s942bzkqxxv-thumb-550886984?$Q90_330_330_F_PNG$',
      },
      {
        id: 4,
        name: 'Tím Cobalt',
        hex: '#686884',
        img: 'https://images.samsung.com/is/image/samsung/p6pim/vn/s2602/gallery/vn-galaxy-s26-s942-sm-s942bzvqxxv-thumb-550887023?$Q90_330_330_F_PNG$',
        default: true,
      },
    ],
    storage: ['128GB', '256GB'],
    isNew: false,
  },
];
