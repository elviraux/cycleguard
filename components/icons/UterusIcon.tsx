import React from 'react';
import Svg, { Path, G } from 'react-native-svg';
import { theme } from '@/constants/theme';

export function UterusIcon({ size = 100 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <G>
        {/* Shield outline */}
        <Path
          d="M50 10 L75 20 L80 50 Q80 75, 50 90 Q20 75, 20 50 L25 20 Z"
          stroke={theme.colors.white}
          strokeWidth="2"
          fill="none"
        />
        {/* Uterus shape */}
        <Path
          d="M40 35 Q35 40, 35 45 L35 55 Q35 65, 50 70 Q65 65, 65 55 L65 45 Q65 40, 60 35"
          stroke={theme.colors.white}
          strokeWidth="2"
          fill="none"
        />
        {/* Fallopian tubes */}
        <Path
          d="M35 45 Q30 40, 25 40"
          stroke={theme.colors.white}
          strokeWidth="2"
          fill="none"
        />
        <Path
          d="M65 45 Q70 40, 75 40"
          stroke={theme.colors.white}
          strokeWidth="2"
          fill="none"
        />
        {/* Ovaries */}
        <Path
          d="M25 40 A3 3 0 1 1 25 40.1"
          stroke={theme.colors.white}
          strokeWidth="2"
          fill="none"
        />
        <Path
          d="M75 40 A3 3 0 1 1 75 40.1"
          stroke={theme.colors.white}
          strokeWidth="2"
          fill="none"
        />
      </G>
    </Svg>
  );
}
