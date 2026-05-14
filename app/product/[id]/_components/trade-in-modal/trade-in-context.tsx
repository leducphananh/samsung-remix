'use client';

import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import {
  appleTradeInDevices,
  oppoTradeInDevices,
  realmeTradeInDevices,
  samsungTabletTradeInDevices,
  samsungTradeInDevices,
  samsungWatchTradeInDevices,
} from '../../_data/trade.data';
import { getDeviceCapacity } from '../../_utils/device-capacity.util';

const brands = [
  { id: 'samsung', label: 'SAMSUNG', discount: '19.200.000 ₫' },
  { id: 'apple', label: 'APPLE', discount: '15.900.000 ₫' },
  { id: 'oppo', label: 'OPPO', discount: '11.750.000 ₫' },
  { id: 'realme', label: 'REALME', discount: '3.340.000 ₫' },
  { id: 'vivo', label: 'VIVO', discount: '13.690.000 ₫' },
  { id: 'xiaomi', label: 'XIAOMI', discount: '5.820.000 ₫' },
];

const deviceTypeLabels = {
  phone: 'Điện thoại thông minh',
  tablet: 'Máy tính bảng',
  watch: 'Đồng hồ thông minh',
};

const phoneDevicesByBrand = {
  samsung: samsungTradeInDevices,
  apple: appleTradeInDevices,
  oppo: oppoTradeInDevices,
  realme: realmeTradeInDevices,
  vivo: [],
  xiaomi: [],
};

const tabletDevicesByBrand = {
  samsung: samsungTabletTradeInDevices,
  apple: [],
  oppo: [],
  realme: [],
  vivo: [],
  xiaomi: [],
};

const watchDevicesByBrand = {
  samsung: samsungWatchTradeInDevices,
  apple: [],
  oppo: [],
  realme: [],
  vivo: [],
  xiaomi: [],
};

export type BrandId = keyof typeof phoneDevicesByBrand;
export type DeviceTypeId = keyof typeof deviceTypeLabels;

interface TradeInContextValue {
  brands: typeof brands;
  availableBrands: typeof brands;
  selectedDeviceType: DeviceTypeId;
  selectedDeviceTypeLabel: string;
  selectedBrand: BrandId;
  selectedBrandInfo?: (typeof brands)[number];
  selectedDeviceId?: string;
  selectedDevice?: (typeof samsungTradeInDevices)[number];
  selectedCapacity?: string;
  selectedBrandDevices: typeof samsungTradeInDevices;
  isWatch: boolean;
  isSelectionComplete: boolean;
  setSelectedDeviceId: (deviceId: string) => void;
  handleBrandChange: (brandId: string) => void;
  handleDeviceTypeChange: (deviceTypeId: string) => void;
}

const TradeInContext = createContext<TradeInContextValue | null>(null);

export const TradeInProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDeviceType, setSelectedDeviceType] =
    useState<DeviceTypeId>('phone');
  const [selectedBrand, setSelectedBrand] = useState<BrandId>('samsung');
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>();
  const isTablet = selectedDeviceType === 'tablet';
  const isWatch = selectedDeviceType === 'watch';
  const devicesByBrand = isTablet
    ? tabletDevicesByBrand
    : isWatch
      ? watchDevicesByBrand
      : phoneDevicesByBrand;
  const availableBrands =
    isTablet || isWatch
      ? brands.filter(brand => brand.id === 'samsung')
      : brands;
  const selectedBrandDevices = devicesByBrand[selectedBrand];
  const selectedDevice = selectedBrandDevices.find(
    device => device.id === selectedDeviceId,
  );
  const selectedBrandInfo = availableBrands.find(
    brand => brand.id === selectedBrand,
  );
  const selectedCapacity = selectedDevice
    ? isWatch
      ? 'N/A'
      : getDeviceCapacity(selectedDevice.name)
    : undefined;
  const selectedDeviceTypeLabel = deviceTypeLabels[selectedDeviceType];
  const isSelectionComplete = Boolean(
    selectedBrand && selectedDevice && selectedCapacity,
  );

  const handleBrandChange = (brandId: string) => {
    setSelectedBrand(brandId as BrandId);
    setSelectedDeviceId(undefined);
  };

  const handleDeviceTypeChange = (deviceTypeId: string) => {
    const nextDeviceType = deviceTypeId as DeviceTypeId;
    const nextBrands =
      nextDeviceType === 'tablet' || nextDeviceType === 'watch'
        ? brands.filter(brand => brand.id === 'samsung')
        : brands;

    setSelectedDeviceType(nextDeviceType);
    setSelectedBrand(nextBrands[0].id as BrandId);
    setSelectedDeviceId(undefined);
  };

  const value = useMemo(
    () => ({
      brands,
      availableBrands,
      selectedDeviceType,
      selectedDeviceTypeLabel,
      selectedBrand,
      selectedBrandInfo,
      selectedDeviceId,
      selectedDevice,
      selectedCapacity,
      selectedBrandDevices,
      isWatch,
      isSelectionComplete,
      setSelectedDeviceId,
      handleBrandChange,
      handleDeviceTypeChange,
    }),
    [
      availableBrands,
      isSelectionComplete,
      isWatch,
      selectedBrand,
      selectedBrandDevices,
      selectedBrandInfo,
      selectedCapacity,
      selectedDevice,
      selectedDeviceId,
      selectedDeviceType,
      selectedDeviceTypeLabel,
    ],
  );

  return (
    <TradeInContext.Provider value={value}>{children}</TradeInContext.Provider>
  );
};

export const useTradeIn = () => {
  const context = useContext(TradeInContext);

  if (!context) {
    throw new Error('useTradeIn must be used within TradeInProvider');
  }

  return context;
};
