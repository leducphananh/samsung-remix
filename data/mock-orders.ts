import { Order, OrderDetail } from '@/types/order.type';

export const mockOrders: Order[] = [
  {
    id: '#ORD-2026-00724',
    date: '13/05/2026',
    status: 'Dự thảo',
    product: {
      name: 'Tủ chăm sóc quần áo thông minh LG Styler 5 móc Màu be | SC5MBR80H',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD3ZmsC7FZ1WjuQZ3PGqK9oGfL69ON2VCWtx6g_vyE4Sw4eZSWmmnvQP4pK6EmiEiTNrckqgZI3T2XfXf-N8PA0hGHRbsDHsREe0hM0gEZOEIMGkIsgDqRWXozzwACZsnLFg5s0Bwf0iknHccaTOmgYNttoz99qN5qSbMHdWeNFMCExfGOJMo0QypWJI9jbDuMa60tRDQ-ttfT4J-ybTzokSNbaa2Mdxa0a12gLycLDO4d3s-Yg1eEP2HMmh-L0j0DSZGLTZTTvsvo',
      quantity: 1,
      duration: '12 tháng',
    },
    total: 49179100,
  },
  {
    id: '#ORD-2026-00718',
    date: '13/05/2026',
    status: 'Dự thảo',
    product: {
      name: 'Điều hòa LG DUALCOOL™ Inverter AI Air 1 chiều 1.5HP IDC12M2',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBP6nzocz3mI5LkYvnfX3rKr7jBcc9WSEeSBZ26iLFz_yTz_Q14hOYajbYQkoEhVbOSxWwhO5qLq55dl-mqB_jfrLu-82zVW3xQM4NyBUlM_cx30RGdt4-WQHAENSBl0Csa9SXXcr3KnmY_mfrH4P2-JrQ6HEmqm7I6ZDGtkHXKXSF2LKBQtnr_KAC-NLuVHcYVMskiyUuNvKYz3QDAzU_D-iEUlKF_Tn36A64QhaGk0r2W7vyXqmDFMq9ZwZjSt9HMqXNFsTIKv3Q',
      quantity: 1,
      duration: '12 tháng',
    },
    total: 13408100,
  },
  {
    id: '#ORD-2026-00717',
    date: '13/05/2026',
    status: 'Dự thảo',
    product: {
      name: 'Điều hòa LG DUALCOOL™ Inverter AI Air 1 chiều 1.5HP IDC12M2',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBP6nzocz3mI5LkYvnfX3rKr7jBcc9WSEeSBZ26iLFz_yTz_Q14hOYajbYQkoEhVbOSxWwhO5qLq55dl-mqB_jfrLu-82zVW3xQM4NyBUlM_cx30RGdt4-WQHAENSBl0Csa9SXXcr3KnmY_mfrH4P2-JrQ6HEmqm7I6ZDGtkHXKXSF2LKBQtnr_KAC-NLuVHcYVMskiyUuNvKYz3QDAzU_D-iEUlKF_Tn36A64QhaGk0r2W7vyXqmDFMq9ZwZjSt9HMqXNFsTIKv3Q',
      quantity: 1,
      duration: '12 tháng',
    },
    total: 13408100,
  },
];

export const mockOrder: OrderDetail = {
  id: '#ORD-2026-00724',
  date: '13/05/2026',
  status: 'Dự thảo',
  customer: {
    name: 'LY DIEU BINH',
    phone: '0988456679',
    email: 'binhld@gmail.com',
  },
  shipping: {
    recipient: 'LY DIEU BINH',
    phone: '0988456679',
    address: '12 pho , P. Nhà Mát, Tỉnh Bạc Liêu',
  },
  products: [
    {
      name: 'Tủ chăm sóc quần áo thông minh LG Styler 5 móc Màu be | SC5MBR80H',
      quantity: 1,
      price: 49179100,
      originalPrice: 49179100,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD3ZmsC7FZ1WjuQZ3PGqK9oGfL69ON2VCWtx6g_vyE4Sw4eZSWmmnvQP4pK6EmiEiTNrckqgZI3T2XfXf-N8PA0hGHRbsDHsREe0hM0gEZOEIMGkIsgDqRWXozzwACZsnLFg5s0Bwf0iknHccaTOmgYNttoz99qN5qSbMHdWeNFMCExfGOJMo0QypWJI9jbDuMa60tRDQ-ttfT4J-ybTzokSNbaa2Mdxa0a12gLycLDO4d3s-Yg1eEP2HMmh-L0j0DSZGLTZTTvsvo',
    },
  ],
};
