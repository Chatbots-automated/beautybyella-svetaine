import { supabase } from './supabase';

interface MontonioOrderPayload {
  merchantReference: string;
  amount: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  returnUrl: string;
  notificationUrl: string;
  paymentMethods?: string[];
}

export async function createMontonioOrder(orderData: MontonioOrderPayload) {
  try {
    const response = await fetch('https://stargate.montonio.com/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_MONTONIO_ACCESS_KEY}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to create Montonio order');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating Montonio order:', error);
    throw error;
  }
}

export async function handlePaymentWebhook(payload: any) {
  const { merchantReference, status } = payload;

  if (!merchantReference) {
    throw new Error('Missing merchantReference in webhook payload');
  }

  const { error } = await supabase
    .from('orders')
    .update({ status: status === 'paid' ? 'completed' : 'failed' })
    .eq('id', merchantReference);

  if (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}