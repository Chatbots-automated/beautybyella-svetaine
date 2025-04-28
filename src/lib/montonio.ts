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

// Helper to base64url encode
function base64url(source: string) {
  return btoa(source)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

// Helper to create HMAC SHA256 signature
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
  const bytes = new Uint8Array(signature);
  let binary = '';
  bytes.forEach((b) => binary += String.fromCharCode(b));
  return base64url(binary);
}

// Create JWT manually
async function createJWT(payload: any, secret: string): Promise<string> {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };
  const headerBase64 = base64url(JSON.stringify(header));
  const payloadBase64 = base64url(JSON.stringify(payload));
  const data = `${headerBase64}.${payloadBase64}`;
  const signatureBase64 = await sign(secret, data);
  return `${data}.${signatureBase64}`;
}

// Final function to create Montonio order
export async function createMontonioOrder(orderData: MontonioOrderPayload) {
  try {
    // Convert amount to cents (only multiply once!)
    const amountInCents = Math.round(orderData.amount * 100);

    const [firstName, ...lastNameParts] = (orderData.customerName || 'Customer').split(' ');
    const lastName = lastNameParts.join(' ');

    const payload = {
      accessKey: MONTONIO_ACCESS_KEY,
      merchantReference: orderData.merchantReference,
      grandTotal: amountInCents,
      currency: orderData.currency,
      locale: 'lt',
      returnUrl: orderData.returnUrl,
      notificationUrl: orderData.notificationUrl,
      customer: {
        email: orderData.customerEmail,
        firstName: firstName || '',
        lastName: lastName || '',
        phone: orderData.customerPhone
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
