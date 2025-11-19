import React from 'react';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { theme } from '@/constants/theme';

export function HandPhoneIcon({ size = 100 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Phone */}
      <Rect
        x="40"
        y="25"
        width="30"
        height="45"
        rx="4"
        stroke={theme.colors.white}
        strokeWidth="2"
        fill="none"
      />
      {/* Hand/palm */}
      <Path
        d="M30 60 L30 75 Q30 80, 35 80 L65 80 Q70 80, 70 75 L70 60"
        stroke={theme.colors.white}
        strokeWidth="2"
        fill="none"
      />
      {/* Fingers */}
      <Path
        d="M35 60 L35 50"
        stroke={theme.colors.white}
        strokeWidth="2"
      />
      <Path
        d="M45 60 L45 45"
        stroke={theme.colors.white}
        strokeWidth="2"
      />
      <Path
        d="M55 60 L55 45"
        stroke={theme.colors.white}
        strokeWidth="2"
      />
      <Path
        d="M65 60 L65 50"
        stroke={theme.colors.white}
        strokeWidth="2"
      />
      {/* Heart on phone */}
      <Circle
        cx="55"
        cy="40"
        r="3"
        stroke={theme.colors.white}
        strokeWidth="1.5"
        fill="none"
      />
    </Svg>
  );
}
