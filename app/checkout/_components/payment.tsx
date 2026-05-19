'use client';
import clsx from 'clsx';
import { Check } from 'lucide-react';
import { useState } from 'react';

const Payment = () => {
  const [paymentType, setPaymentType] = useState<'oneTime' | 'installment'>(
    'oneTime',
  );
  const [tenure, setTenure] = useState<'1y' | '2y' | '3y'>('3y');

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <h3 className="text-lg font-bold">Hình thức thanh toán</h3>
      <div className="mt-4 space-y-3">
        <button
          type="button"
          onClick={() => setPaymentType('oneTime')}
          className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold ${paymentType === 'oneTime' ? 'border-accent bg-accent/5 text-accent' : 'border-surface-container-highest text-secondary'}`}>
          <span
            className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${paymentType === 'oneTime' ? 'border-accent bg-accent' : 'border-surface-container-highest'}`}>
            {paymentType === 'oneTime' && (
              <Check className="h-3 w-3 text-white" strokeWidth={3} />
            )}
          </span>
          Thanh toán 1 lần
        </button>
        <button
          type="button"
          onClick={() => setPaymentType('installment')}
          className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold ${paymentType === 'installment' ? 'border-accent bg-accent/5 text-accent' : 'border-surface-container-highest text-secondary'}`}>
          <span
            className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${paymentType === 'installment' ? 'border-accent bg-accent' : 'border-surface-container-highest'}`}>
            {paymentType === 'installment' && (
              <Check className="h-3 w-3 text-white" strokeWidth={3} />
            )}
          </span>
          Trả góp
        </button>
      </div>

      {paymentType === 'installment' && (
        <div className="mt-4 space-y-3">
          <div className="text-sm font-semibold">Thời hạn hợp đồng</div>
          {[
            {
              id: '3y',
              label: '3 năm',
              note: 'Dịch vụ bảo dưỡng',
              months: '12 tháng',
              price: '3.710.000 đ/tháng',
            },
            {
              id: '2y',
              label: '2 năm',
              note: 'Dịch vụ bảo dưỡng',
              months: '12 tháng',
              price: '4.510.000 đ/tháng',
            },
            {
              id: '1y',
              label: '1 năm',
              note: 'Dịch vụ bảo dưỡng',
              months: '12 tháng',
              price: '8.670.000 đ/tháng',
            },
          ].map(option => (
            <button
              key={option.id}
              type="button"
              onClick={() => setTenure(option.id as '1y' | '2y' | '3y')}
              className={clsx(
                'flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left',
                tenure === option.id
                  ? 'border-accent bg-accent/5'
                  : 'border-surface-container-highest',
              )}>
              <div>
                <div className="text-sm font-semibold">{option.label}</div>
                <div className="text-secondary mt-1 text-xs">{option.note}</div>
                <div className="bg-accent/10 text-accent mt-2 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold">
                  {option.months}
                </div>
              </div>
              <div className="text-accent text-sm font-semibold">
                {option.price}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Payment;
