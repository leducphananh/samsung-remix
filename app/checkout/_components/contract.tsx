'use client';
import FormInput from '@/components/common/form-input';
import { useState } from 'react';

const Contract = () => {
  const [nationality, setNationality] = useState<'local' | 'foreign'>('local');

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <h3 className="text-lg font-bold">Thông tin hợp đồng</h3>
      <p className="text-secondary mt-2 text-sm">
        Vui lòng cung cấp thông tin chính xác để hoàn tất thủ tục đăng ký dịch
        vụ.
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <div className="text-sm font-semibold">
            Giới tính <span className="text-red-500">*</span>
          </div>
          <div className="mt-3 flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" name="gender" defaultChecked />
              Nam
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" name="gender" />
              Nữ
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormInput label="Họ" requiredMark placeholder="Nhập họ" />
          <FormInput label="Tên" requiredMark placeholder="Nhập tên" />
        </div>

        <FormInput label="Email" requiredMark placeholder="name@email.com" />
        <FormInput
          label="Số điện thoại di động"
          requiredMark
          placeholder="Nhập số điện thoại"
        />
        <FormInput
          label="Ngày sinh"
          requiredMark
          placeholder="dd/mm/yyyy"
          type="date"
        />

        <div>
          <div className="text-sm font-semibold">Quốc tịch</div>
          <div className="bg-surface-container mt-3 grid grid-cols-2 gap-3 rounded-md p-1">
            <button
              type="button"
              onClick={() => setNationality('local')}
              className={`rounded-md py-2 text-sm font-semibold ${nationality === 'local' ? 'text-accent bg-white' : 'text-secondary'}`}>
              Nội địa
            </button>
            <button
              type="button"
              onClick={() => setNationality('foreign')}
              className={`rounded-md py-2 text-sm font-semibold ${nationality === 'foreign' ? 'text-accent bg-white' : 'text-secondary'}`}>
              Nước ngoài
            </button>
          </div>
        </div>

        <FormInput
          label={
            nationality === 'foreign' ? 'Số Hộ chiếu (passport)' : 'Số CCCD'
          }
          requiredMark
          placeholder={
            nationality === 'foreign' ? 'Nhập số hộ chiếu' : 'Nhập số CCCD'
          }
        />
      </div>
    </div>
  );
};

export default Contract;
