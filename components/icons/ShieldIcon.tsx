import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { theme } from '@/constants/theme';

export function ShieldIcon({ size = 100 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Shield outline */}
      <Path
        d="M50 10 L75 20 L80 50 Q80 75, 50 90 Q20 75, 20 50 L25 20 Z"
        stroke={theme.colors.white}
        strokeWidth="2.5"
        fill="none"
      />
      {/* Checkmark */}
      <Path
        d="M35 50 L45 60 L65 35"
        stroke={theme.colors.white}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}
