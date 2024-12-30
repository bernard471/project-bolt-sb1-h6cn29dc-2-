import React from 'react';
import { CreditCard, Paypal, Wallet } from 'lucide-react';

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onSelect: (method: string) => void;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onSelect,
}) => {
  const paymentMethods = [
    { id: 'card', label: 'Credit Card', icon: CreditCard },
    { id: 'paypal', label: 'PayPal', icon: Paypal },
    { id: 'crypto', label: 'Cryptocurrency', icon: Wallet },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {paymentMethods.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 ${
            selectedMethod === id
              ? 'border-cyan-600 bg-cyan-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <Icon className="w-6 h-6 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </button>
      ))}
    </div>
  );
};