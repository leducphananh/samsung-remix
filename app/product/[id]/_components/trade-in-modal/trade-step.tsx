'use client';

import Select from '@/components/common/select';
import { formatTradeInValue } from '@/utils/price.util';
import clsx from 'clsx';
import { Smartphone, Tablet, Watch } from 'lucide-react';
import { useTradeIn } from './trade-in-context';

const deviceTypes = [
  {
    id: 'phone',
    label: 'Điện thoại thông minh',
    discount: '19.200.000 ₫',
    icon: Smartphone,
  },
  {
    id: 'tablet',
    label: 'Máy tính bảng',
    discount: '13.490.000 ₫',
    icon: Tablet,
  },
  {
    id: 'watch',
    label: 'Đồng hồ thông minh',
    discount: '2.800.000 ₫',
    icon: Watch,
  },
];

const TradeStep = () => {
  const {
    availableBrands,
    selectedBrand,
    selectedBrandInfo,
    selectedBrandDevices,
    selectedCapacity,
    selectedDevice,
    selectedDeviceId,
    selectedDeviceType,
    selectedDeviceTypeLabel,
    isWatch,
    setSelectedDeviceId,
    handleBrandChange,
    handleDeviceTypeChange,
  } = useTradeIn();
  const deviceOptions = selectedBrandDevices.map(device => ({
    id: device.id,
    label: device.name,
    suffix: (
      <>
        Giảm đến
        <b className="text-[#006bea]">{formatTradeInValue(device.maxValue)}</b>
      </>
    ),
  }));
  const capacityOptions = selectedDevice
    ? isWatch
      ? [
          {
            id: 'N/A',
            label: 'N/A',
          },
        ]
      : selectedCapacity
        ? [
            {
              id: selectedCapacity,
              label: selectedCapacity,
            },
          ]
        : []
    : [];

  return (
    <div className="mx-auto w-full max-w-140">
      <p className="mb-3 text-[12px] font-bold">Chọn loại thiết bị:</p>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {deviceTypes.map(deviceType => {
          const Icon = deviceType.icon;
          const isSelected = selectedDeviceType === deviceType.id;

          return (
            <li key={deviceType.id}>
              <button
                type="button"
                className={clsx(
                  'flex h-33 w-full cursor-pointer flex-col items-center justify-center rounded-md border bg-white px-3 text-center',
                  isSelected
                    ? 'border-[#006bea] ring-1 ring-[#006bea] ring-inset'
                    : 'border-[#ddd] hover:border-[#555]',
                )}
                onClick={() => handleDeviceTypeChange(deviceType.id)}>
                <Icon size={48} strokeWidth={1} />
                <span className="mt-3 text-[14px] leading-tight font-bold">
                  {deviceType.label}
                </span>
                <span className="mt-1 text-[14px] leading-tight">
                  Giảm đến{' '}
                  <b className="text-[#006bea]">{deviceType.discount}</b>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-6">
        <Select
          label="Chọn hãng sản xuất:"
          placeholder="Chọn hãng sản xuất:"
          value={selectedBrand}
          onChange={handleBrandChange}
          defaultOpen
          options={availableBrands.map(brand => ({
            id: brand.id,
            label: brand.label,
            suffix: (
              <>
                Giảm đến <b className="text-[#006bea]">{brand.discount}</b>
              </>
            ),
          }))}
        />
      </div>

      <Select
        className="mt-5"
        label="Chọn tên thiết bị:"
        placeholder="Chọn tên thiết bị:"
        triggerLabel={selectedDevice?.name}
        value={selectedDeviceId}
        onChange={setSelectedDeviceId}
        options={deviceOptions}
        disabled={deviceOptions.length === 0}
        closeOnSelect
        searchable
      />

      <Select
        className="mt-5"
        label="Chọn dung lượng thiết bị:"
        placeholder="Chọn dung lượng thiết bị:"
        triggerLabel={selectedCapacity}
        value={selectedCapacity}
        options={capacityOptions}
        disabled={!selectedDevice}
        closeOnSelect
      />

      {selectedDevice && selectedCapacity && selectedBrandInfo && (
        <div className="mt-5 rounded-[5px] bg-[#f4f4f4] px-6 py-5 text-[14px]">
          <p className="font-bold">
            {selectedDeviceTypeLabel} | {selectedBrandInfo.label} |{' '}
            {selectedDevice.name} | {selectedCapacity}
          </p>
          <div className="my-3 h-px bg-[#9a9a9a]" />
          <div className="flex items-center justify-between gap-4">
            <span>Tổng giá trị chiết khấu tạm tính</span>
            <b className="shrink-0 text-[18px] text-[#006bea]">
              {formatTradeInValue(selectedDevice.maxValue)}
            </b>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradeStep;
