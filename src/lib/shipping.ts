import { lpExpressClient } from './lpexpress';

// Default sender address for Beauty by Ella
const DEFAULT_SENDER = {
  name: "Beauty by Ella",
  contacts: {
    phone: "+37064027403",
    email: "info@beautybyella.lt"
  },
  address: {
    street: "Giraitės g.",
    building: "60A",
    postalCode: "21143",
    locality: "Rubežius",
    municipality: "Trakų r. sav.",
    countryCode: "LT"
  }
};

interface ShippingDetails {
  orderId: string;
  receiverName: string;
  receiverPhone: string;
  receiverEmail: string;
  street: string;
  building: string;
  postalCode: string;
  locality: string;
  municipality: string;
  weight: number;
}

export async function createShipment(details: ShippingDetails) {
  try {
    // Step 1: Create or get sender address
    const senderResponse = await lpExpressClient.createSenderAddress(DEFAULT_SENDER);
    const senderAddressId = senderResponse.id;

    // Step 2: Create parcel
    const parcelData = {
      idRef: details.orderId,
      plan: { code: "T2H" }, // Terminal to Home delivery
      parcel: {
        type: "PACKAGE",
        size: "M", // Default size, adjust based on actual needs
        weight: details.weight,
        partCount: 1,
        document: false
      },
      receiver: {
        name: details.receiverName,
        contacts: {
          phone: details.receiverPhone,
          email: details.receiverEmail
        },
        address: {
          street: details.street,
          building: details.building,
          postalCode: details.postalCode,
          locality: details.locality,
          municipality: details.municipality,
          countryCode: "LT"
        }
      },
      senderAddressId
    };

    const parcelResponse = await lpExpressClient.createParcel(parcelData);

    // Step 3: Initiate shipping
    await lpExpressClient.initiateShipping([details.orderId]);

    // Step 4: Get shipping label
    const labelBlob = await lpExpressClient.getShippingLabel(details.orderId);

    // Create URL for the PDF
    const labelUrl = URL.createObjectURL(labelBlob);

    return {
      success: true,
      trackingNumber: parcelResponse.trackingNumber,
      labelUrl
    };
  } catch (error) {
    console.error('Error creating shipment:', error);
    throw error;
  }
}