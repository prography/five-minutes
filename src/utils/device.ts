export type DeviceType = 'mobile' | 'tablet' | 'laptop';

export const size = {
  mobile: 425,
  tablet: 768,
  laptop: 1024,
};
export const checkSize = (width: number): DeviceType => {
  return window.innerWidth >= size.laptop ? 'laptop' : window.innerWidth ? 'tablet' : 'mobile';
};

export type MinMaxDevice = Record<DeviceType, string>;

const [minDevice, maxDevice] = Object.entries(size).reduce((acc, [key, value]) => {
  acc[0][key as DeviceType] = `(min-width: ${value}px)`;
  acc[1][key as DeviceType] = `(max-width: ${value}px)`;
  return acc;
}, [{}, {}] as [MinMaxDevice, MinMaxDevice]);

export {
  minDevice,
  maxDevice
};