'use client';

import Modal from '@/components/common/modal';
import { RotateCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type SignatureModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (payload: { name: string; dataUrl: string }) => void;
};

const SignatureModal = ({
  isOpen,
  onClose,
  onConfirm,
}: SignatureModalProps) => {
  const [customerName, setCustomerName] = useState('');
  const [hasSignature, setHasSignature] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const signatureDataUrlRef = useRef<string | null>(null);

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;

    if (!canvas || !container) return;

    const previousSignature = signatureDataUrlRef.current;

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#111111';
    }

    if (ctx && previousSignature) {
      const image = new Image();
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      };
      image.src = previousSignature;
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, [isOpen]);

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

    if (canvas) {
      signatureDataUrlRef.current = canvas.toDataURL('image/png');
    }
  };

  const handleClearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setHasSignature(false);
    signatureDataUrlRef.current = null;
  };

  const handleConfirmSignature = () => {
    if (!hasSignature || customerName.trim().length === 0) return;

    const canvas = canvasRef.current;
    const dataUrl = canvas?.toDataURL('image/png');

    if (dataUrl) {
      signatureDataUrlRef.current = dataUrl;
      onConfirm({ name: customerName.trim(), dataUrl });
      onClose();
    }
  };

  return (
    <Modal
      title="Tổng tiền đơn hàng lớn hơn 5.000.000 đ"
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-sm"
      contentClassName="px-6 pb-6 pt-0">
      <p className="text-left text-xs text-red-500">
        Tổng tiền đơn hàng lớn hơn 5.000.000 đ, vui lòng ký tên trước khi đặt
        hàng.
      </p>

      <label className="mt-4 block text-xs font-semibold">Tên khách hàng</label>
      <input
        type="text"
        value={customerName}
        onChange={event => setCustomerName(event.target.value)}
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
  );
};

export default SignatureModal;
