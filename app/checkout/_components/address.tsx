import Checkbox from '@/components/common/checkbox';
import FormInput from '@/components/common/form-input';
import FormSelect from '@/components/common/form-select';

const Address = () => {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <h3 className="text-lg font-bold">Địa chỉ nhận hàng</h3>
      <div className="mt-4 flex items-center gap-3">
        <Checkbox checked={false} onChange={() => {}} />
        <span className="text-secondary text-sm">Sử dụng địa chỉ mặc định</span>
      </div>

      <div className="mt-4 space-y-4">
        <FormInput label="Mã bưu chính" placeholder="Nhập mã bưu chính" />
        <div className="grid grid-cols-2 gap-3">
          <FormSelect label="Tỉnh / TP" requiredMark>
            <option>Chọn Tỉnh/TP</option>
          </FormSelect>
          <FormSelect label="Quận / Huyện" requiredMark>
            <option>Chọn Tỉnh/TP trước</option>
          </FormSelect>
        </div>
        <FormSelect label="Phường / Xã" requiredMark>
          <option>Chọn Quận/Huyện trước</option>
        </FormSelect>
        <FormInput
          label="Địa chỉ (Số nhà, đường)"
          requiredMark
          placeholder="Nhập địa chỉ"
        />
      </div>
    </div>
  );
};

export default Address;
