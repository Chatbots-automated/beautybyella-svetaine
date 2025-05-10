import { z } from 'zod';

interface Terminal {
  id: string;
  name: string;
  city: string;
  address: string;
  postalCode: string;
}

export async function getTerminals(): Promise<Terminal[]> {
  const response = await fetch('https://beautybella-lpexpress.vercel.app/api/lpexpress');

  if (!response.ok) {
    throw new Error('Failed to fetch terminals');
  }

  const terminals = await response.json();
  return terminals.sort((a: Terminal, b: Terminal) => a.city.localeCompare(b.city));
}

interface CreateParcelParams {
  idRef: string;
  plan: {
    code: string;
    size: string;
    weight: number;
  };
  parcel: {
    type: string;
    size: string;
    weight: number;
    partCount: number;
    document: boolean;
  };
  receiver: {
    name: string;
    phone: string;
    email: string;
    terminalId: string;
    address: {
      countryCode: string;
      postalCode: string;
      street: string;
      locality: string;
    };
  };
  senderAddressId: string;
}

export async function createParcel(params: CreateParcelParams) {
  const response = await fetch('https://beautybella-lpexpress.vercel.app/api/lpexpress', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'createParcel',
      ...params
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create parcel');
  }

  return response.json();
}

export async function initiateShipping(orderId: string) {
  const response = await fetch('https://beautybella-lpexpress.vercel.app/api/lpexpress', {
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
  const response = await fetch('https://beautybella-lpexpress.vercel.app/api/lpexpress', {
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