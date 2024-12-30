import { supabase } from '../lib/supabase/client';

interface CryptoPayment {
  sessionId: string;
  amount: number;
  currency: string;
  walletAddress: string;
}

export const cryptoService = {
  async generatePaymentAddress(payment: CryptoPayment) {
    // In a real implementation, this would integrate with a crypto payment processor
    // to generate a unique wallet address for the payment
    const mockWalletAddress = '0x' + Math.random().toString(36).substring(2, 38);

    const { error } = await supabase
      .from('crypto_payments')
      .insert({
        session_id: payment.sessionId,
        amount: payment.amount,
        currency: payment.currency,
        wallet_address: mockWalletAddress,
        status: 'pending',
        created_at: new Date().toISOString(),
      });

    if (error) throw error;
    return { walletAddress: mockWalletAddress };
  },

  async checkPaymentStatus(sessionId: string) {
    const { data, error } = await supabase
      .from('crypto_payments')
      .select('*')
      .eq('session_id', sessionId)
      .single();

    if (error) throw error;
    return data;
  },
};