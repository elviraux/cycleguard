export const theme = {
  colors: {
    dustyRose: '#D4A5A5',
    softMauve: '#C8B5C8',
    deepPlum: '#6B4C6B',
    cream: '#F5F1ED',
    white: '#FFFFFF',
    periodPink: '#E8B4B8',
    fertileGlow: 'rgba(200, 181, 200, 0.35)',
    // Enhanced glass colors for liquid glass effect
    glassBg: 'rgba(255, 255, 255, 0.25)',
    glassBorder: 'rgba(255, 255, 255, 0.5)',
    glassInner: 'rgba(255, 255, 255, 0.15)',
    text: {
      primary: '#2D2D2D',
      secondary: '#6B4C6B',
      light: 'rgba(45, 45, 45, 0.6)',
    },
  },
  gradients: {
    background: ['#F5E6E8', '#E8D5E8', '#D4C5D4'] as const,
    glass: ['rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)'] as const,
    button: ['rgba(107, 76, 107, 0.95)', 'rgba(107, 76, 107, 0.85)'] as const,
  },
  // Enhanced blur intensity for liquid glass
  blur: {
    light: 40,
    medium: 60,
    strong: 80,
    ultraStrong: 100,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    round: 999,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 28,
    xxl: 36,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};
