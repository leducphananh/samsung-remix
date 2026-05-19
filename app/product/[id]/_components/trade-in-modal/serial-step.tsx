'use client';

import TextInput from '@/components/common/text-input';
import { Smartphone } from 'lucide-react';

interface SerialStepProps {
  serialValue: string;
  onSerialChange: (value: string) => void;
}

const SerialStep = ({ serialValue, onSerialChange }: SerialStepProps) => {
  return (
    <div className="w-full">
      <div className="mb-9 grid grid-cols-3 gap-1">
        <span className="h-0.5 bg-black" />
        <span className="h-0.5 bg-black" />
        <span className="h-0.5 bg-[#d6d6d6]" />
      </div>

      <div className="space-y-10">
        <section>
          <h3 className="mb-7 text-[12px] font-bold md:text-[15px]">
            Cách tìm số seri/IMEI1
          </h3>
          <div className="flex items-center gap-5">
            <Smartphone size={60} strokeWidth={1} />
            <span className="text-[52px] leading-none font-bold tracking-normal md:text-[65px]">
              *#06#
            </span>
          </div>
          <p className="mt-4 text-[12px] md:text-[15px]">
            Cách tìm thông tin số seri và IMEI1 trên thiết bị?{' '}
            <a href="#" className="text-[#006bea] underline">
              Xem tại đây↗
            </a>
          </p>
        </section>

        <section>
          <TextInput
            id="trade-in-serial"
            label="Nhập số seri/IMEI1"
            value={serialValue}
            onChange={onSerialChange}
            className="max-w-95"
          />
        </section>

        <div className="text-[12px] leading-normal text-[#666]">
          <p>Hướng dẫn tự động sao lưu dữ liệu với thiết bị Samsung Galaxy:</p>
          <p className="mt-5">
            Samsung Cloud:{' '}
            <a href="#" className="text-[#006bea] underline">
              Xem tại đây↗
            </a>{' '}
            hoặc{' '}
            <a href="#" className="text-[#006bea] underline">
              Video hướng dẫn↗
            </a>
          </p>
          <p>
            Smart Switch:{' '}
            <a href="#" className="text-[#006bea] underline">
              Xem tại đây↗
            </a>{' '}
            hoặc{' '}
            <a href="#" className="text-[#006bea] underline">
              Video hướng dẫn↗
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SerialStep;
