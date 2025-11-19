import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { theme } from '@/constants/theme';

export function DataLeakIcon({ size = 100 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Phone */}
      <Rect
        x="35"
        y="20"
        width="30"
        height="50"
        rx="4"
        stroke={theme.colors.white}
        strokeWidth="2"
        fill="none"
      />
      {/* Cloud with X */}
      <Path
        d="M70 25 Q75 25, 75 30 Q80 30, 80 35 Q80 40, 75 40 L65 40 Q60 40, 60 35 Q60 32, 62 30 Q65 25, 70 25"
        stroke={theme.colors.white}
        strokeWidth="2"
        fill="none"
      />
      <Path
        d="M68 32 L72 36 M72 32 L68 36"
        stroke={theme.colors.white}
        strokeWidth="2"
      />
      {/* Lock with X */}
      <Path
        d="M20 55 L30 55 L30 65 L20 65 Z"
        stroke={theme.colors.white}
        strokeWidth="2"
        fill="none"
      />
      <Path
        d="M23 55 L23 50 Q23 47, 25 47 Q27 47, 27 50 L27 55"
        stroke={theme.colors.white}
        strokeWidth="2"
        fill="none"
      />
      <Path
        d="M22 58 L28 63 M28 58 L22 63"
        stroke={theme.colors.white}
        strokeWidth="2"
      />
      {/* Arrow from phone to cloud */}
      <Path
        d="M50 35 L62 32"
        stroke={theme.colors.white}
        strokeWidth="2"
        strokeDasharray="3,3"
      />
    </Svg>
  );
}
