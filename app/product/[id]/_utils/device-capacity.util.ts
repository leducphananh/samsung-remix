export const getDeviceCapacity = (deviceName: string) => {
  const capacityMatch = deviceName.match(/(\d+GB\/(?:\d+GB|\d+TB|\d+MB))$/i);

  return capacityMatch?.[1] ?? deviceName;
};
