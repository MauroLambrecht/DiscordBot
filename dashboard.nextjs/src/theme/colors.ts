export const colors = {
  brand: {
    100: '#E9E3FF',
    200: '#9e86ff',
    300: '#422AFB',
    400: '#941bff',
    500: '#AF32E9', // Main color, red/purple theme
    600: '#7A18C8', // Main color, red/purple theme
    700: '#4E0492', // Main color, red/purple theme
    800: '#630A94', // Main color, red/purple theme
    900: '#440670', // Main color, red/purple theme
  },
  brandAlpha: {
    500: '#7451ff9c',
    100: '#7451ff2d',
  },
  secondaryGray: {
    100: '#E0E5F2',
    200: '#E1E9F8',
    300: '#F4F7FE',
    400: '#E9EDF7',
    500: '#8F9BBA',
    600: '#A3AED0',
    700: '#707EAE',
    800: '#707EAE',
    900: '#1B2559',
  },
  red: {
    500: '#EE5D50',
    600: '#E31A1A',
  },
  blue: {
    50: '#EFF4FB',
    500: '#3965FF',
  },
  orange: {
    100: '#FFF6DA',
    500: '#FFB547',
  },
  green: {
    100: '#E6FAF5',
    500: '#01B574',
  },
  navy: {
    50: '#b9bfc7',
    100: '#a5aab2',
    200: '#91979e',
    300: '#7d838a',
    400: '#696e76',
    500: '#555a62',
    600: '#41454d',
    700: '#11326B',
    800: '#0D1D45', // Dark gray color for dark theme
    900: '#040F1F', // Background color for dark theme
  },
  gray: {
    100: '#FAFCFE',
  },
};

export const light = {
  globalBg: 'secondaryGray.300',
  brand: 'brand.500',
  textColorPrimary: 'secondaryGray.900',
  textColorSecondary: 'gray.500',
  cardBg: 'white',
  shadow: '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
};

export const dark = {
  globalBg: 'navy.900',
  brand: 'brand.800', // Main color, red/purple theme for dark theme
  textColorPrimary: 'white',
  textColorSecondary: 'secondaryGray.300', // Light gray for better contrast
  cardBg: 'navy.800',
  shadow: '14px 17px 40px 4px rgba(63, 14, 84, 0.6)', // Red/purple shadow
  guild: '#0D1D45',
  nav: '#070F29',
};
