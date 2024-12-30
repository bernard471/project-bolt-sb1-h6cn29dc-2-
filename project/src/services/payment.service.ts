import { supabase } from '../lib/supabase/client';

interface PaymentDetails {
  cardNumber: string;
  expiry: string;
  cvc: string;
}

interface PaymentRequest {
  sessionId: string;
  amount: number;
  paymentDetails: PaymentDetails;
}

export const paymentService = {
  async processPayment(request: PaymentRequest) {
    // In a real implementation, this would integrate with a payment processor
    // like Stripe and handle the payment securely
    
    const { error } = await supabase
      .from('session_payments')
      .insert({
        session_id: request.sessionId,
        amount: request.amount,
        status: 'completed',
        payment_method: 'card',
        created_at: new Date().toISOString()
      });

    if (error) throw error;
  },

  async getPaymentHistory(userId: string) {
    const { data, error } = await supabase
      .from('session_payments')
      .select(`
        *,
        sessions:session_id (
          topic,
          scheduled_for
        )
      `)
      .eq('user_id', userId);

    if (error) throw error;
    return data;
  }
};