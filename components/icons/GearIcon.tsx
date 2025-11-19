import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { theme } from '@/constants/theme';

interface GearIconProps {
  size?: number;
  color?: string;
}

export function GearIcon({ size = 24, color = theme.colors.deepPlum }: GearIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Center circle */}
      <Circle
        cx="12"
        cy="12"
        r="3"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />

      {/* Outer gear teeth */}
      <Path
        d="M12 1.5V4.5M12 19.5V22.5M4.5 12H1.5M22.5 12H19.5M5.636 5.636L3.515 3.515M20.485 20.485L18.364 18.364M18.364 5.636L20.485 3.515M3.515 20.485L5.636 18.364"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Gear rim */}
      <Path
        d="M12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8Z"
        stroke={color}
        strokeWidth="1.5"
      />
    </Svg>
  );
}
