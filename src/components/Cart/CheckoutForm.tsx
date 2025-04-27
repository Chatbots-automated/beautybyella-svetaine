import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { supabase } from '../../lib/supabase';
import { createMontonioOrder } from '../../lib/montonio';
import ErrorToast from '../ErrorToast';
import LoadingSpinner from '../LoadingSpinner';

interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  deliveryMethod: 'shipping' | 'pickup';
  pickupLocation: string;
}

const CheckoutForm = () => {
  const { items, clearCart, closeCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    deliveryMethod: 'shipping',
    pickupLocation: 'trakai',
  });

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Create order in Supabase first
      const orderData = {
        customer_name: formData.fullName,
        customer_email: formData.email,
        delivery_method: formData.deliveryMethod,
        shipping_address: formData.deliveryMethod === 'shipping' ? {
          address: formData.address,
          city: formData.city,
          postal_code: formData.postalCode,
          phone: formData.phone
        } : null,
        total_price: total,
        products: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        status: 'pending',
        payment_reference: null
      };

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create Montonio order
      const montonioPayload = {
        merchantReference: order.id,
        amount: total,
        currency: 'EUR',
        customerEmail: formData.email,
        customerName: formData.fullName,
        customerPhone: formData.phone,
        returnUrl: `${window.location.origin}/order-success`,
        notificationUrl: `${import.meta.env.VITE_API_URL}/webhook/montonio`,
      };

      const montonioOrder = await createMontonioOrder(montonioPayload);

      // Clear cart and redirect to Montonio payment page
      clearCart();
      closeCart();
      window.location.href = montonioOrder.paymentUrl;

    } catch (error) {
      console.error('Error processing order:', error);
      setError('Įvyko klaida apdorojant užsakymą. Prašome bandyti dar kartą.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-serif mb-6">Užsakymo informacija</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-text-secondary mb-2">
              Vardas Pavardė *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
              El. paštas *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-2">
              Telefono numeris *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Pristatymo būdas *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="relative flex cursor-pointer rounded-lg border border-gray-200 p-4 focus:outline-none">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="shipping"
                  className="sr-only"
                  checked={formData.deliveryMethod === 'shipping'}
                  onChange={handleInputChange}
                />
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <span className="block text-sm font-medium text-text-primary">
                      Pristatymas į namus
                    </span>
                  </span>
                </span>
                <span 
                  className={`pointer-events-none absolute -inset-px rounded-lg border-2 ${
                    formData.deliveryMethod === 'shipping' ? 'border-accent' : 'border-transparent'
                  }`} 
                  aria-hidden="true"
                />
              </label>
              <label className="relative flex cursor-pointer rounded-lg border border-gray-200 p-4 focus:outline-none">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="pickup"
                  className="sr-only"
                  checked={formData.deliveryMethod === 'pickup'}
                  onChange={handleInputChange}
                />
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <span className="block text-sm font-medium text-text-primary">
                      Atsiėmimas salone
                    </span>
                  </span>
                </span>
                <span 
                  className={`pointer-events-none absolute -inset-px rounded-lg border-2 ${
                    formData.deliveryMethod === 'pickup' ? 'border-accent' : 'border-transparent'
                  }`} 
                  aria-hidden="true"
                />
              </label>
            </div>
          </div>

          {formData.deliveryMethod === 'shipping' ? (
            <>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-text-secondary mb-2">
                  Pristatymo adresas *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required={formData.deliveryMethod === 'shipping'}
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-text-secondary mb-2">
                    Miestas *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required={formData.deliveryMethod === 'shipping'}
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-text-secondary mb-2">
                    Pašto kodas *
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    required={formData.deliveryMethod === 'shipping'}
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
                  />
                </div>
              </div>
            </>
          ) : (
            <div>
              <label htmlFor="pickupLocation" className="block text-sm font-medium text-text-secondary mb-2">
                Atsiėmimo vieta *
              </label>
              <select
                id="pickupLocation"
                name="pickupLocation"
                required
                value={formData.pickupLocation}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
              >
                <option value="trakai">Trakai - Giraitės g. 60A, Rubežius</option>
              </select>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between mb-4">
            <span className="font-serif text-lg">Bendra suma:</span>
            <span className="font-serif text-xl">€{total.toFixed(2)}</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full btn-primary relative ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <LoadingSpinner />
                <span className="ml-2">Apdorojama...</span>
              </div>
            ) : (
              'Tęsti apmokėjimą'
            )}
          </button>
        </div>
      </form>

      <ErrorToast
        message={error || ''}
        isVisible={!!error}
        onClose={() => setError(null)}
      />
    </div>
  );
};

export default CheckoutForm;