'use client';

import { formatTradeInValue } from '@/utils/price.format';
import { CircleAlert } from 'lucide-react';
import { useTradeIn } from './trade-in-context';

interface FinalStepProps {
  serialValue: string;
  isAccepted: boolean;
  onAcceptedChange: (value: boolean) => void;
}

const FinalStep = ({
  serialValue,
  isAccepted,
  onAcceptedChange,
}: FinalStepProps) => {
  const {
    selectedBrandInfo,
    selectedCapacity,
    selectedDevice,
    selectedDeviceTypeLabel,
  } = useTradeIn();

  if (!selectedDevice || !selectedBrandInfo || !selectedCapacity) return null;

  return (
    <div className="w-full">
      <div className="mb-7 grid grid-cols-3 gap-1">
        <span className="h-0.5 bg-black" />
        <span className="h-0.5 bg-black" />
        <span className="h-0.5 bg-black" />
      </div>

      <div className="space-y-7">
        <p className="text-[14px] leading-normal font-bold md:text-[18px]">
          Khi sử dụng mức chiết khấu thu cũ đổi mới, bạn đồng ý với các Điều
          khoản và Điều kiện của chương trình
        </p>

        <div>
          <div className="mb-2 grid overflow-hidden rounded-[5px] border border-[#9a9a9a] md:grid-cols-[1fr_1fr]">
            <div className="p-5 text-[13px] leading-normal font-bold md:text-[15px]">
              <p>{selectedDeviceTypeLabel}</p>
              <p>
                {selectedBrandInfo.label} {selectedDevice.name}
              </p>
              <p>{selectedCapacity}</p>
              <p className="font-normal text-[#666]">{serialValue}</p>
            </div>
            <div className="border-t border-[#9a9a9a] p-5 md:border-t-0 md:border-l">
              <p className="mb-7 text-[13px] font-bold md:text-[15px]">
                Tổng giá trị chiết khấu tạm tính
              </p>
              <p className="text-right text-[13px] font-bold text-[#006bea] md:text-[15px]">
                {formatTradeInValue(selectedDevice.maxValue)}
              </p>
            </div>
          </div>
          <p className="text-[12px] text-[#757575]">
            Mức chiết khấu thu cũ đổi mới thật có thể khác với mức chiết khấu
            tạm tính
          </p>
        </div>

        <div className="flex gap-6 rounded-[5px] bg-[#f5f7fe] px-6 py-7">
          <CircleAlert size={36} strokeWidth={1.5} className="shrink-0" />
          <p className="text-[13px] leading-normal font-bold md:text-[15px]">
            Rất tiếc, đối tác thu cũ của Samsung chỉ hỗ trợ các thiết bị có lên
            nguồn, hiển thị hình ảnh, khung viền và màn hình còn nguyên vẹn,
            không bị bể vỡ, có các phụ kiện kèm theo (remote, dây nguồn, …),
            đồng thời thiết bị đã được tắt/ ngắt hoạt động và đăng xuất khỏi tất
            cả tính năng bảo mật và tài khoản
          </p>
        </div>

        <section>
          <p className="mb-5 text-[13px] font-bold md:text-[15px]">
            Xác nhận Điều khoản & Điều kiện chương trình
          </p>
          <label className="flex cursor-pointer items-start gap-3 text-[13px] md:text-[15px]">
            <span className="text-[#ef3434]">*</span>
            <input
              type="checkbox"
              checked={isAccepted}
              className="mt-0.5 size-4 shrink-0 accent-[#006bea]"
              onChange={event => onAcceptedChange(event.target.checked)}
            />
            <span>
              Tôi đã đọc và đồng ý với các{' '}
              <a href="#" className="text-[#006bea] underline">
                Điều khoản và Điều kiện↗
              </a>{' '}
              của chương trình.
              {!isAccepted && (
                <span className="mt-3 block text-[#ef3434]">
                  * Trường bắt buộc
                </span>
              )}
            </span>
          </label>
        </section>

        <div className="text-[12px] leading-normal font-bold md:text-[14px]">
          <p>
            Lưu ý: Khách hàng vui lòng mang theo CCCD để điền thông tin cá nhân
            và đối chiếu trên hợp đồng mua bán thiết bị cũ.
          </p>
          <p>
            Thông tin CCCD trên hợp đồng và người ký phải trùng khớp với nhau,
            nếu khách hàng không đồng ý cung cấp thông tin để ký hợp đồng mua
            bán hoặc thông tin trên CCCD và hợp đồng mua bán khác nhau, đơn hàng
            sẽ bị huỷ.
          </p>
          <p>
            CCCD có thể ở dạng bản cứng hoặc hình ảnh mà khách hàng tự chụp lại
            trên thiết bị cá nhân.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinalStep;
