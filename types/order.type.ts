export interface Order {
  id: string;
  date: string;
  status: string;
  product: {
    name: string;
    image: string;
    quantity: number;
    duration: string;
  };
  total: number;
}

export interface OrderDetail {
  id: string;
  date: string;
  status: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  shipping: {
    recipient: string;
    phone: string;
    address: string;
  };
  products: [
    {
      name: string;
      quantity: number;
      price: number;
      originalPrice: number;
      image: string;
    },
  ];
}
