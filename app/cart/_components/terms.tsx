'use client';

import Modal from '@/components/common/modal';
import { ChevronUp, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type TermsProps = {
  onCompletionChange?: (isComplete: boolean) => void;
};

const Terms = ({ onCompletionChange }: TermsProps) => {
  const [isSignatureOpen, setIsSignatureOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [acceptedChecks, setAcceptedChecks] = useState(Array(5).fill(false));
  const [hasSignature, setHasSignature] = useState(false);
  const [signatureConfirmed, setSignatureConfirmed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const allTermsAccepted = acceptedChecks.every(Boolean);
  const signatureReady =
    signatureConfirmed && hasSignature && customerName.trim().length > 0;

  useEffect(() => {
    onCompletionChange?.(allTermsAccepted && signatureReady);
  }, [allTermsAccepted, onCompletionChange, signatureReady]);

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;

    if (!canvas || !container) return;

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#111111';
    }
  };

  useEffect(() => {
    if (!isSignatureOpen) return;

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, [isSignatureOpen]);

  const getCanvasPoint = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const point = getCanvasPoint(event);

    if (!canvas || !ctx || !point) return;

    isDrawingRef.current = true;
    setHasSignature(true);
    lastPointRef.current = point;
    canvas.setPointerCapture(event.pointerId);
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    ctx.lineTo(point.x + 0.1, point.y + 0.1);
    ctx.stroke();
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const point = getCanvasPoint(event);
    const lastPoint = lastPointRef.current;

    if (!canvas || !ctx || !point || !lastPoint) return;

    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    lastPointRef.current = point;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.releasePointerCapture(event.pointerId);
    }
    isDrawingRef.current = false;
    lastPointRef.current = null;
  };

  const handleClearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setHasSignature(false);
    setSignatureConfirmed(false);
  };

  const handleConfirmSignature = () => {
    if (!hasSignature || customerName.trim().length === 0) {
      return;
    }

    const canvas = canvasRef.current;
    const dataUrl = canvas?.toDataURL('image/png');
    // dataUrl là ảnh chữ ký dạng base64
    console.log(dataUrl);

    setSignatureConfirmed(true);
    setIsSignatureOpen(false);
  };

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
            <button
              onClick={() => setIsSignatureOpen(true)}
              className="bg-accent/10 text-accent rounded-md px-2 py-1 text-[10px] font-bold">
              Ký tên
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-0.5"
                checked={acceptedChecks[0]}
                onChange={event => {
                  const next = [...acceptedChecks];
                  next[0] = event.target.checked;
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
              <input
                type="checkbox"
                className="mt-0.5"
                checked={acceptedChecks[1]}
                onChange={event => {
                  const next = [...acceptedChecks];
                  next[1] = event.target.checked;
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
              <input
                type="checkbox"
                className="mt-0.5"
                checked={acceptedChecks[2]}
                onChange={event => {
                  const next = [...acceptedChecks];
                  next[2] = event.target.checked;
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
              <input
                type="checkbox"
                className="mt-0.5"
                checked={acceptedChecks[3]}
                onChange={event => {
                  const next = [...acceptedChecks];
                  next[3] = event.target.checked;
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
            <input
              type="checkbox"
              className="mt-0.5"
              checked={acceptedChecks[4]}
              onChange={event => {
                const next = [...acceptedChecks];
                next[4] = event.target.checked;
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

      <Modal
        title="Tổng tiền đơn hàng lớn hơn 5.000.000 đ"
        isOpen={isSignatureOpen}
        onClose={() => setIsSignatureOpen(false)}
        className="max-w-sm"
        contentClassName="px-6 pb-6 pt-0">
        <p className="text-left text-xs text-red-500">
          Tổng tiền đơn hàng lớn hơn 5.000.000 đ, vui lòng ký tên trước khi đặt
          hàng.
        </p>

        <label className="mt-4 block text-xs font-semibold">
          Tên khách hàng
        </label>
        <input
          type="text"
          value={customerName}
          onChange={event => {
            setCustomerName(event.target.value);
            setSignatureConfirmed(false);
          }}
          className="border-surface-container-highest mt-2 w-full rounded-xl border px-3 py-2 text-sm"
          placeholder=""
        />

        <div className="mt-3">
          <button
            type="button"
            onClick={handleClearSignature}
            className="text-accent flex items-center gap-2 rounded-lg bg-[#ffe9e6] px-3 py-2 text-xs font-bold">
            <RotateCcw className="h-4 w-4" />
            Ký lại
          </button>
        </div>

        <div className="border-surface-container-highest mt-3 h-36 w-full rounded-xl border">
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="h-full w-full touch-none"
          />
        </div>

        <button
          type="button"
          onClick={handleConfirmSignature}
          className="bg-accent mt-5 w-full rounded-xl py-3 text-sm font-bold text-white">
          Xác nhận
        </button>
      </Modal>
    </>
  );
};

export default Terms;
