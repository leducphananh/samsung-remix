'use client';
import BottomSheet from '@/components/common/bottom-sheet';
import Checkbox from '@/components/common/checkbox';
import FormInput from '@/components/common/form-input';
import FormSelect from '@/components/common/form-select';
import Radio from '@/components/common/radio';
import { useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddEditAddressSheet = ({ open, onClose }: Props) => {
  const [isOrderAddress, setIsOrderAddress] = useState(true);
  const [isInvoiceAddress, setIsInvoiceAddress] = useState(false);
  const [addressType, setAddressType] = useState<'personal' | 'company'>(
    'personal',
  );
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');

  return (
    <BottomSheet
      isOpen={open}
      onClose={onClose}
      title="Thêm địa chỉ"
      className="max-w-none rounded-t-[34px]"
      contentClassName="max-h-[72vh] overflow-y-auto px-5 pb-6"
      footer={
        <button
          type="button"
          className="bg-accent w-full rounded-full py-4 text-sm font-semibold text-white">
          Lưu địa chỉ
        </button>
      }>
      <form className="space-y-5">
        <div className="flex flex-wrap items-center gap-x-9 gap-y-3">
          <label className="flex items-center gap-3 text-sm">
            <Checkbox checked={isOrderAddress} onChange={setIsOrderAddress} />
            <span>Địa chỉ đơn hàng</span>
          </label>
          <label className="flex items-center gap-3 text-sm">
            <Checkbox
              checked={isInvoiceAddress}
              onChange={setIsInvoiceAddress}
            />
            <span>Địa chỉ xuất hóa đơn</span>
          </label>
        </div>

        <div className="flex items-center gap-8">
          <label className="flex items-center gap-3 text-sm">
            <Radio
              name="addressType"
              checked={addressType === 'personal'}
              onChange={() => setAddressType('personal')}
            />
            <span>Cá nhân</span>
          </label>
          <label className="flex items-center gap-3 text-sm">
            <Radio
              name="addressType"
              checked={addressType === 'company'}
              onChange={() => setAddressType('company')}
            />
            <span>Công ty</span>
          </label>
        </div>

        <FormInput
          label="Tên địa chỉ"
          requiredMark
          placeholder="Ví dụ: Nhà riêng, văn phòng"
        />

        <FormInput label="Họ tên" requiredMark placeholder="Nhập họ tên" />

        <FormInput
          label="Số điện thoại"
          requiredMark
          placeholder="Nhập số điện thoại"
        />

        <FormInput label="Email" placeholder="Nhập email" />

        <FormSelect
          label="Tỉnh / TP"
          requiredMark
          value={city}
          onChange={event => {
            setCity(event.target.value);
            setDistrict('');
          }}>
          <option value="">Chọn Tỉnh/TP</option>
          <option value="hanoi">Thành phố Hà Nội</option>
          <option value="hcm">Thành phố Hồ Chí Minh</option>
        </FormSelect>

        <FormSelect
          label="Quận / Huyện"
          requiredMark
          value={district}
          disabled={!city}
          onChange={event => setDistrict(event.target.value)}>
          <option value="">
            {city ? 'Chọn Quận/Huyện' : 'Chọn Tỉnh/TP trước'}
          </option>
          {city === 'hanoi' && <option value="hoaiduc">Huyện Hoài Đức</option>}
          {city === 'hanoi' && <option value="dongda">Quận Đống Đa</option>}
          {city === 'hcm' && <option value="q1">Quận 1</option>}
          {city === 'hcm' && <option value="thuduc">TP Thủ Đức</option>}
        </FormSelect>

        <FormSelect label="Phường / Xã" requiredMark disabled={!district}>
          <option value="">
            {district ? 'Chọn Phường/Xã' : 'Chọn Quận/Huyện trước'}
          </option>
          {district === 'hoaiduc' && (
            <option value="vancanh">Xã Vân Canh</option>
          )}
          {district === 'dongda' && (
            <option value="langha">Phường Láng Hạ</option>
          )}
          {district === 'q1' && (
            <option value="benthanh">Phường Bến Thành</option>
          )}
          {district === 'thuduc' && (
            <option value="linhtrung">Phường Linh Trung</option>
          )}
        </FormSelect>

        <FormInput
          label="Số nhà, tên đường"
          requiredMark
          placeholder="Nhập số nhà, tên đường"
        />

        <label className="flex items-center gap-3 pt-1 text-sm">
          <Checkbox checked={isDefaultAddress} onChange={setIsDefaultAddress} />
          <span>Đặt làm mặc định</span>
        </label>
      </form>
    </BottomSheet>
  );
};

export default AddEditAddressSheet;
