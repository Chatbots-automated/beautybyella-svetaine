import { Buffer } from 'buffer';

const MONTONIO_ACCESS_KEY = '1688c380-82b9-4e5d-b1c8-ef455f4539ae';
const MONTONIO_SECRET_KEY = '0gskJDxjtJQnwNDC19Tpp0zEzvxVrEnueFQv76jjcm54';

interface MontonioOrderPayload {
  merchantReference: string;
  amount: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  returnUrl: string;
  notificationUrl: string;
}

function base64url(bytes: Uint8Array) {
  return Buffer.from(bytes)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

async function sign(secret: string, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return base64url(new Uint8Array(signature));
}

async function createJWT(payload: any, secret: string): Promise<string> {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const encoder = new TextEncoder();
  const headerBase64 = base64url(encoder.encode(JSON.stringify(header)));
  const payloadBase64 = base64url(encoder.encode(JSON.stringify(payload)));
  const data = `${headerBase64}.${payloadBase64}`;
  const signatureBase64 = await sign(secret, data);
  
  return `${data}.${signatureBase64}`;
}

export async function createMontonioOrder(orderData: MontonioOrderPayload) {
  try {
    const amount = orderData.amount;

    const [firstName, ...lastNameParts] = (orderData.customerName || 'Customer').split(' ');
    const lastName = lastNameParts.join(' ');

    const payload = {
      accessKey: MONTONIO_ACCESS_KEY,
      merchantReference: orderData.merchantReference,
      grandTotal: amount,
      currency: orderData.currency,
      locale: 'lt',
      returnUrl: orderData.returnUrl,
      notificationUrl: 'https://hook.eu2.make.com/gg74w4qv8l8xhuhavwnmpk2wjxp4khj4',
      customer: {
        email: orderData.customerEmail,
        firstName: firstName || '',
        lastName: lastName || '',
        phone: orderData.customerPhone
      },
      payment: {
        method: "paymentInitiation",
        amount: amount,
        currency: orderData.currency
      },
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 600, // 10 min expiration
    };

    console.log('Creating Montonio order with payload:', payload);

    const jwtToken = await createJWT(payload, MONTONIO_SECRET_KEY);

    const response = await fetch('https://stargate.montonio.com/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: jwtToken }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Montonio API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      throw new Error(Array.isArray(errorData.message) 
        ? errorData.message.join(', ') 
        : errorData.message || 'Failed to create Montonio order');
    }

    const data = await response.json();
    console.log('Montonio order created successfully:', data);
    return data;
  } catch (error) {
    console.error('Error creating Montonio order:', error);
    throw error;
  }
}