'use client';

import Checkbox from '@/components/common/checkbox';
import { ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type TermsProps = {
  onCompletionChange?: (isComplete: boolean) => void;
};

const Terms = ({ onCompletionChange }: TermsProps) => {
  const [acceptedChecks, setAcceptedChecks] = useState(Array(5).fill(false));

  const allTermsAccepted = acceptedChecks.every(Boolean);

  useEffect(() => {
    onCompletionChange?.(allTermsAccepted);
  }, [allTermsAccepted, onCompletionChange]);

  return (
    <>
      <div className="border-surface-container-highest space-y-3 rounded-2xl border bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold">Điều khoản và Điều kiện</div>
          <ChevronUp className="text-secondary h-4 w-4" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-secondary text-xs font-semibold">
              Điều khoản sử dụng
            </span>
          </div>

          <div className="space-y-2 text-sm">
            <label className="flex items-start gap-2">
              <Checkbox
                className="mt-0.5"
                checked={acceptedChecks[0]}
                ariaLabel="Điều khoản và điều kiện cơ bản Samsung"
                onChange={checked => {
                  const next = [...acceptedChecks];
                  next[0] = checked;
                  setAcceptedChecks(next);
                }}
              />
              <div>
                <div className="font-semibold">
                  Điều khoản và điều kiện cơ bản Samsung
                </div>
                <Link href="#" className="text-accent text-[10px] font-bold">
                  Xem chi tiết
                </Link>
              </div>
            </label>
            <label className="flex items-start gap-2">
              <Checkbox
                className="mt-0.5"
                checked={acceptedChecks[1]}
                ariaLabel="Chương trình bảo hiểm thiết bị điện tử MIC"
                onChange={checked => {
                  const next = [...acceptedChecks];
                  next[1] = checked;
                  setAcceptedChecks(next);
                }}
              />
              <div>
                <div className="font-semibold">
                  Chương trình bảo hiểm thiết bị điện tử MIC
                </div>
                <Link href="#" className="text-accent text-[10px] font-bold">
                  Xem chi tiết
                </Link>
              </div>
            </label>
            <label className="flex items-start gap-2">
              <Checkbox
                className="mt-0.5"
                checked={acceptedChecks[2]}
                ariaLabel="Điều khoản và điều kiện STEC"
                onChange={checked => {
                  const next = [...acceptedChecks];
                  next[2] = checked;
                  setAcceptedChecks(next);
                }}
              />
              <div>
                <div className="font-semibold">
                  Điều khoản và điều kiện STEC
                </div>
                <Link href="#" className="text-accent text-[10px] font-bold">
                  Xem chi tiết
                </Link>
              </div>
            </label>
            <label className="flex items-start gap-2">
              <Checkbox
                className="mt-0.5"
                checked={acceptedChecks[3]}
                ariaLabel="Đã hiểu về số tiền trả góp hằng tháng"
                onChange={checked => {
                  const next = [...acceptedChecks];
                  next[3] = checked;
                  setAcceptedChecks(next);
                }}
              />
              <div className="font-semibold">
                Tôi đã hiểu về số tiền trả góp hằng tháng và ngày thanh toán
                ngày 27 hằng tháng
              </div>
            </label>
          </div>

          <label className="border-surface-container-highest text-secondary flex items-start gap-2 border-t pt-3 text-[11px]">
            <Checkbox
              className="mt-0.5"
              checked={acceptedChecks[4]}
              ariaLabel="Đã đọc và hiểu đầy đủ các điều khoản"
              onChange={checked => {
                const next = [...acceptedChecks];
                next[4] = checked;
                setAcceptedChecks(next);
              }}
            />
            <span>
              Tôi đã đọc và hiểu đầy đủ tất cả các điều khoản, bao gồm cả những
              điều khoản đã xem trước ít nhất ba ngày
            </span>
          </label>
        </div>
      </div>
    </>
  );
};

export default Terms;
