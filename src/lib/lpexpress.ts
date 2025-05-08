import { z } from 'zod';

const API_URL = 'https://api-manosiuntos.post.lt/api/v2';
const ACCESS_TOKEN = 'be572a1e-cf47-3673-b459-5124b5f1ff5a';

// Validation schemas
const addressSchema = z.object({
  street: z.string(),
  building: z.string(),
  flat: z.string().optional(),
  postalCode: z.string(),
  locality: z.string(),
  municipality: z.string(),
  countryCode: z.string(),
});

const contactsSchema = z.object({
  phone: z.string(),
  email: z.string().email(),
});

const senderSchema = z.object({
  name: z.string(),
  contacts: contactsSchema,
  address: addressSchema,
});

const parcelSchema = z.object({
  type: z.enum(['PACKAGE']),
  size: z.enum(['XS', 'S', 'M', 'L', 'XL']),
  weight: z.number(),
  partCount: z.number(),
  document: z.boolean(),
});

const receiverSchema = z.object({
  name: z.string(),
  contacts: contactsSchema,
  address: addressSchema,
});

// API client
class LPExpressClient {
  private headers: HeadersInit;

  constructor() {
    this.headers = {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    };
  }

  async createSenderAddress(data: z.infer<typeof senderSchema>) {
    try {
      const validatedData = senderSchema.parse(data);
      
      const response = await fetch(`${API_URL}/address/sender`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create sender address: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating sender address:', error);
      throw error;
    }
  }

  async createParcel(data: {
    idRef: string;
    plan: { code: string };
    parcel: z.infer<typeof parcelSchema>;
    receiver: z.infer<typeof receiverSchema>;
    senderAddressId: number;
  }) {
    try {
      const response = await fetch(`${API_URL}/parcel`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to create parcel: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating parcel:', error);
      throw error;
    }
  }

  async initiateShipping(idRefs: string[]) {
    try {
      const response = await fetch(`${API_URL}/shipping/initiate`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ idRefs }),
      });

      if (!response.ok) {
        throw new Error(`Failed to initiate shipping: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error initiating shipping:', error);
      throw error;
    }
  }

  async getShippingLabel(idRef: string) {
    try {
      const response = await fetch(
        `${API_URL}/sticker/pdf?idRefs=${idRef}&layout=LAYOUT_10x15`,
        {
          headers: this.headers,
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to get shipping label: ${response.statusText}`);
      }

      return await response.blob();
    } catch (error) {
      console.error('Error getting shipping label:', error);
      throw error;
    }
  }
}

export const lpExpressClient = new LPExpressClient();