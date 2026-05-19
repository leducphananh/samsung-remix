'use client';

import Modal from '@/components/common/modal';
import clsx from 'clsx';
import { useState } from 'react';
import FinalStep from './final-step';
import SerialStep from './serial-step';
import TradeGuide from './trade-guide';
import { TradeInProvider, useTradeIn } from './trade-in-context';
import TradeStep from './trade-step';

interface TradeInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TradeInModalContent = ({ onClose }: { onClose: () => void }) => {
  const { isSelectionComplete } = useTradeIn();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [serialValue, setSerialValue] = useState('');
  const [isAccepted, setIsAccepted] = useState(false);
  const isSerialComplete = serialValue.trim().length > 0;
  const canContinue =
    step === 1
      ? isSelectionComplete
      : step === 2
        ? isSerialComplete
        : isAccepted;
  const title =
    step === 1
      ? 'Chọn thiết bị của bạn'
      : step === 2
        ? 'Nhập số seri/IMEI'
        : 'Mức chiết khấu thu cũ được áp dụng';

  const handleBack = () => {
    if (step === 3) {
      setStep(2);
      return;
    }

    if (step === 2) {
      setStep(1);
      return;
    }

    onClose();
  };

  const handleContinue = () => {
    if (!canContinue) return;

    if (step === 1) {
      setStep(2);
      return;
    }

    if (step === 2) {
      setStep(3);
      return;
    }

    onClose();
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={title}
      contentClassName="pb-0"
      footer={
        <div className="mx-auto flex max-w-106 gap-3">
          <button
            type="button"
            className="h-10 flex-1 cursor-pointer rounded-full border-2 border-black text-[14px] font-bold md:h-12 md:text-[18px]"
            onClick={handleBack}>
            Trở lại
          </button>
          <button
            type="button"
            disabled={!canContinue}
            className={clsx(
              'h-10 flex-1 rounded-full text-[14px] font-bold text-white md:h-12 md:text-[18px]',
              canContinue
                ? 'cursor-pointer bg-[#2589ff] hover:bg-[#006bea]'
                : 'cursor-not-allowed bg-[#cfe3ff]',
            )}
            onClick={handleContinue}>
            {step === 3 ? 'Tham gia' : 'Tiếp Tục'}
          </button>
        </div>
      }>
      <div className="pb-6 md:pb-25">
        {step === 1 && (
          <>
            <div className="mb-9 grid grid-cols-3 gap-1">
              <span className="h-0.5 bg-black" />
              <span className="h-0.5 bg-[#d6d6d6]" />
              <span className="h-0.5 bg-[#d6d6d6]" />
            </div>

            <div>
              <TradeStep />
              <TradeGuide />
            </div>
          </>
        )}

        {step === 2 && (
          <SerialStep
            serialValue={serialValue}
            onSerialChange={setSerialValue}
          />
        )}

        {step === 3 && (
          <FinalStep
            serialValue={serialValue}
            isAccepted={isAccepted}
            onAcceptedChange={setIsAccepted}
          />
        )}
      </div>
    </Modal>
  );
};

const TradeInModal = ({ isOpen, onClose }: TradeInModalProps) => {
  if (!isOpen) return null;

  return (
    <TradeInProvider>
      <TradeInModalContent onClose={onClose} />
    </TradeInProvider>
  );
};

export default TradeInModal;
