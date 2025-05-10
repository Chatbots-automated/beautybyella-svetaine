import { CartItem } from '../store/cartStore';

export const fbq = (window as any).fbq;

export const FB_PIXEL_ID = '1348334939623316';

export const pageView = () => {
  fbq('track', 'PageView');
};

export const addToCart = (item: CartItem) => {
  fbq('track', 'AddToCart', {
    content_ids: [item.id],
    content_name: item.name,
    value: item.price * item.quantity,
    currency: 'EUR',
    contents: [{
      id: item.id,
      quantity: item.quantity,
      price: item.price
    }],
    content_type: 'product'
  });
};

export const initiateCheckout = (items: CartItem[]) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  fbq('track', 'InitiateCheckout', {
    content_ids: items.map(item => item.id),
    value: total,
    currency: 'EUR',
    contents: items.map(item => ({
      id: item.id,
      quantity: item.quantity,
      price: item.price
    })),
    num_items: items.length
  });
};

export const purchase = (orderId: string, total: number, items: CartItem[]) => {
  fbq('track', 'Purchase', {
    content_ids: items.map(item => item.id),
    content_type: 'product',
    value: total,
    currency: 'EUR',
    contents: items.map(item => ({
      id: item.id,
      quantity: item.quantity,
      price: item.price
    })),
    num_items: items.length,
    order_id: orderId
  });
};