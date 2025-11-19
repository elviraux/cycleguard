import React from 'react';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { theme } from '@/constants/theme';

export function EncryptedBackupIcon({ size = 100 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Phone in center */}
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
      {/* Circular arrows around phone */}
      <Path
        d="M50 20 A20 20 0 0 1 70 40"
        stroke={theme.colors.white}
        strokeWidth="2"
        fill="none"
      />
      <Path
        d="M67 37 L70 40 L73 37"
        stroke={theme.colors.white}
        strokeWidth="2"
        fill="none"
      />
      <Path
        d="M70 60 A20 20 0 0 1 50 80"
        stroke={theme.colors.white}
        strokeWidth="2"
        fill="none"
      />
      <Path
        d="M53 80 L50 80 L50 77"
        stroke={theme.colors.white}
        strokeWidth="2"
        fill="none"
      />
      <Path
        d="M30 60 A20 20 0 0 1 30 40"
        stroke={theme.colors.white}
        strokeWidth="2"
        fill="none"
      />
      <Path
        d="M27 43 L30 40 L33 43"
        stroke={theme.colors.white}
        strokeWidth="2"
        fill="none"
      />
      {/* Icon symbols around */}
      {/* Lock */}
      <Circle cx="25" cy="30" r="3" stroke={theme.colors.white} strokeWidth="1.5" fill="none" />
      {/* Database */}
      <Rect x="72" y="28" width="6" height="8" rx="1" stroke={theme.colors.white} strokeWidth="1.5" fill="none" />
      {/* Shield */}
      <Path d="M20 65 L25 68 L20 71 Z" stroke={theme.colors.white} strokeWidth="1.5" fill="none" />
      {/* Cloud */}
      <Path
        d="M72 65 Q74 65, 74 67 Q76 67, 76 69 Q76 71, 74 71 L70 71 Q68 71, 68 69 Q68 67, 70 65 Q71 65, 72 65"
        stroke={theme.colors.white}
        strokeWidth="1.5"
        fill="none"
      />
    </Svg>
  );
}
