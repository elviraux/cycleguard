import React from 'react';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { theme } from '@/constants/theme';

export function SecurityIcon({ size = 100 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Phone in center with circular arrangement */}
      <Rect
        x="42"
        y="35"
        width="16"
        height="30"
        rx="2"
        stroke={theme.colors.white}
        strokeWidth="2"
        fill="none"
      />

      {/* Circle around phone */}
      <Circle
        cx="50"
        cy="50"
        r="30"
        stroke={theme.colors.white}
        strokeWidth="2"
        strokeDasharray="5,5"
        fill="none"
      />

      {/* Checkmark in circle (top) */}
      <Circle cx="50" cy="20" r="6" stroke={theme.colors.white} strokeWidth="2" fill="none" />
      <Path d="M47 20 L49 22 L53 18" stroke={theme.colors.white} strokeWidth="1.5" fill="none" />

      {/* Lock (right) */}
      <Circle cx="80" cy="50" r="6" stroke={theme.colors.white} strokeWidth="2" fill="none" />
      <Rect x="77" y="50" width="6" height="5" rx="1" stroke={theme.colors.white} strokeWidth="1.5" fill="none" />
      <Path d="M78 50 L78 48 Q78 47, 80 47 Q82 47, 82 48 L82 50" stroke={theme.colors.white} strokeWidth="1.5" fill="none" />

      {/* Shield (bottom) */}
      <Circle cx="50" cy="80" r="6" stroke={theme.colors.white} strokeWidth="2" fill="none" />
      <Path d="M50 76 L53 78 L53 82 Q53 83, 50 84 Q47 83, 47 82 L47 78 Z" stroke={theme.colors.white} strokeWidth="1.5" fill="none" />

      {/* X mark (left) */}
      <Circle cx="20" cy="50" r="6" stroke={theme.colors.white} strokeWidth="2" fill="none" />
      <Path d="M18 48 L22 52 M22 48 L18 52" stroke={theme.colors.white} strokeWidth="1.5" />
    </Svg>
  );
}
