import { supabase, isSupabaseConfigured } from './supabase';
import { Order } from '@/types';

const LOCAL_STORAGE_ORDERS_KEY = 'shopwitholly_orders';

export async function saveOrderToDatabase(order: Order): Promise<{ success: boolean; error?: string; source: 'supabase' | 'local' }> {
  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase.from('orders').insert([
        {
          id: order.id,
          order_number: order.orderNumber,
          customer_email: order.customer.email,
          customer_name: order.customer.fullName,
          customer_phone: order.customer.phone,
          shipping_address: {
            address: order.customer.address,
            apartment: order.customer.apartment || '',
            city: order.customer.city,
            state: order.customer.state,
            postalCode: order.customer.postalCode,
            country: order.customer.country,
          },
          items: order.items,
          subtotal: order.subtotal,
          discount: order.discount,
          discount_code: order.discountCode || null,
          shipping: order.shipping,
          tax: order.tax,
          total: order.total,
          status: order.status,
          payment_method: order.paymentMethod,
          mailgun_status: order.mailgunStatus || null,
          created_at: order.createdAt,
        },
      ]);

      if (error) {
        console.error('Supabase order insert error, falling back to local store:', error);
        saveOrderLocally(order);
        return { success: true, source: 'local', error: error.message };
      }

      // Also cache locally for immediate offline order history access
      saveOrderLocally(order);
      return { success: true, source: 'supabase' };
    } catch (err: unknown) {
      console.error('Exception writing order to Supabase:', err);
      saveOrderLocally(order);
      return { 
        success: true, 
        source: 'local', 
        error: err instanceof Error ? err.message : 'Unknown database error' 
      };
    }
  } else {
    // Save to local storage for local demo testing
    saveOrderLocally(order);
    return { success: true, source: 'local' };
  }
}

export function saveOrderLocally(order: Order): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getOrdersFromLocal();
    const updated = [order, ...existing.filter(o => o.id !== order.id)];
    localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save order to localStorage:', err);
  }
}

export function getOrdersFromLocal(): Order[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to parse orders from localStorage:', err);
    return [];
  }
}

export async function fetchOrderById(orderId: string): Promise<Order | null> {
  // Check local store first
  const localOrders = getOrdersFromLocal();
  const foundLocal = localOrders.find(o => o.id === orderId || o.orderNumber === orderId);
  if (foundLocal) return foundLocal;

  // If Supabase is active, query remote table
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .or(`id.eq.${orderId},order_number.eq.${orderId}`)
        .single();

      if (error || !data) return null;

      const order: Order = {
        id: data.id,
        orderNumber: data.order_number,
        createdAt: data.created_at,
        customer: {
          fullName: data.customer_name,
          email: data.customer_email,
          phone: data.customer_phone,
          address: data.shipping_address?.address || '',
          apartment: data.shipping_address?.apartment || '',
          city: data.shipping_address?.city || '',
          state: data.shipping_address?.state || '',
          postalCode: data.shipping_address?.postalCode || '',
          country: data.shipping_address?.country || '',
        },
        items: data.items,
        subtotal: Number(data.subtotal),
        discount: Number(data.discount),
        discountCode: data.discount_code,
        shipping: Number(data.shipping),
        tax: Number(data.tax),
        total: Number(data.total),
        status: data.status,
        paymentMethod: data.payment_method,
        mailgunStatus: data.mailgun_status,
      };

      return order;
    } catch (err) {
      console.error('Error fetching order from Supabase:', err);
      return null;
    }
  }

  return null;
}
