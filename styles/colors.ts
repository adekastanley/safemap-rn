// Color system with multiple shades
const colors = {
  // Primary colors - Blue tones for UI elements
  primary: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3', // Main primary color
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1'
  },
  
  // Secondary colors - Teal/Mint tones for secondary elements
  secondary: {
    50: '#e0f2f1',
    100: '#b2dfdb',
    200: '#80cbc4',
    300: '#4db6ac',
    400: '#26a69a',
    500: '#009688', // Main secondary color
    600: '#00897b',
    700: '#00796b',
    800: '#00695c',
    900: '#004d40'
  },
  
  // Accent colors - Orange tones for highlights and CTAs
  accent: {
    50: '#fff3e0',
    100: '#ffe0b2',
    200: '#ffcc80',
    300: '#ffb74d',
    400: '#ffa726',
    500: '#ff9800', // Main accent color
    600: '#fb8c00',
    700: '#f57c00',
    800: '#ef6c00',
    900: '#e65100'
  },
  
  // Alert colors for different alert types
  alert: {
    test: '#2196f3', // Blue for test alerts
    type1: '#ff9800', // Orange for community alerts
    type2: '#e53935', // Red for emergency alerts
  },
  
  // Success colors - Green tones for positive feedback
  success: {
    50: '#e8f5e9',
    100: '#c8e6c9',
    200: '#a5d6a7',
    300: '#81c784',
    400: '#66bb6a',
    500: '#4caf50', // Main success color
    600: '#43a047',
    700: '#388e3c',
    800: '#2e7d32',
    900: '#1b5e20'
  },
  
  // Warning colors - Yellow/Amber tones for warnings
  warning: {
    50: '#fffde7',
    100: '#fff9c4',
    200: '#fff59d',
    300: '#fff176',
    400: '#ffee58',
    500: '#ffeb3b', // Main warning color
    600: '#fdd835',
    700: '#fbc02d',
    800: '#f9a825',
    900: '#f57f17'
  },
  
  // Error colors - Red tones for errors and emergencies
  error: {
    50: '#ffebee',
    100: '#ffcdd2',
    200: '#ef9a9a',
    300: '#e57373',
    400: '#ef5350',
    500: '#f44336', // Main error color
    600: '#e53935',
    700: '#d32f2f',
    800: '#c62828',
    900: '#b71c1c'
  },
  
  // Neutral tones for text, backgrounds, etc.
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121'
  },
  
  // Pure colors
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent'
};

export default colors;