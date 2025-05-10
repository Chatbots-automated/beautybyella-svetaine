import { z } from 'zod';

interface Terminal {
  id: string;
  name: string;
  city: string;
  address: string;
  postalCode: string;
}

export async function getTerminals(): Promise<Terminal[]> {
  const response = await fetch('https://beautybella-lpexpress.vercel.app/api/lpexpress.ts');

  if (!response.ok) {
    throw new Error('Failed to fetch terminals');
  }

  const terminals = await response.json();
  return terminals.sort((a: Terminal, b: Terminal) => a.city.localeCompare(b.city));
}

interface CreateParcelParams {
  orderId: string;
  receiverName: string;
  receiverPhone: string;
  receiverEmail: string;
  terminalId: string;
  weight: number;
}

export async function createParcel(params: CreateParcelParams) {
  const response = await fetch('https://beautybella-lpexpress.vercel.app/api/lpexpress.ts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'createParcel',
      idRef: params.orderId,
      plan: {
        planCode: 'TERMINAL',
        size: 'M',
        weight: params.weight
      },
      parcel: {
        type: 'PACKAGE',
        size: 'M',
        weight: params.weight,
        partCount: 1,
        document: false
      },
      receiver: {
        name: params.receiverName,
        phone: params.receiverPhone,
        email: params.receiverEmail,
        terminalId: params.terminalId
      }
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create parcel');
  }

  return response.json();
}

export async function initiateShipping(orderId: string) {
  const response = await fetch('https://beautybella-lpexpress.vercel.app/api/lpexpress.ts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'initiateShipping',
      orderId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to initiate shipping');
  }

  return response.json();
}

export async function getShippingLabel(orderId: string) {
  const response = await fetch('https://beautybella-lpexpress.vercel.app/api/lpexpress.ts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'getShippingLabel',
      orderId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get shipping label');
  }

  return response.blob();
}