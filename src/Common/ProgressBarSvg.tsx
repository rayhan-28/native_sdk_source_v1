import React from 'react';
import Svg, {Circle,Text } from "react-native-svg";

// Define prop types
interface ProgressBarSvgProps {
  progress?: number;
  progressColor?: string;
  points?: number;
  fromPlayerCard?: boolean;
}

// Helper function to convert hex to rgba
const hexToRgba = (hex: string, opacity: number): string => {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1]! + hex[1], 16);
    g = parseInt(hex[2]! + hex[2], 16);
    b = parseInt(hex[3]! + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1]! + hex[2], 16);
    g = parseInt(hex[3]! + hex[4], 16);
    b = parseInt(hex[5]! + hex[6], 16);
  }
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const ProgressBarSvg: React.FC<ProgressBarSvgProps> = ({ progress, progressColor, points, fromPlayerCard = false }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  console.log("circum",circumference);
  const progressBar = ((progress??0) / 100) * circumference;
  console.log("progressBar",progressBar);
  
  const taskValue = isNaN(parseInt(points?.toString() || '0')) ? 0 : parseInt(points?.toString() || '0');

  
  const textLength = taskValue.toString().length;
  const fontSize = textLength > 5 ? 16 - (textLength - 5) * 2 : 16;

  const insideStroke = fromPlayerCard 
  ? hexToRgba(progressColor ?? '#000000', 0.3)  : "#FFFFFF80";

  return (
    <Svg width="60" height="60" viewBox="0 0 100 100">
      {/* Background Circle */}
      <Circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke={insideStroke}
        strokeWidth="12"
      />

      {/* Progress Circle */}
      <Circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke={progressColor}
        strokeWidth="12"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progressBar}
        strokeLinecap="round"
        transform="rotate(-90 50 50)" // Rotate to start progress from top
      />

      {/* Star Icon */}
      <Text
        x="50%"
        y="43%"
        alignmentBaseline="middle"
        textAnchor="middle"
        fontSize={fontSize}
        fill="#000"
      >
        ★
      </Text>

      {/* Task Value */}
      <Text
        x="50%"
        y="60%"
        alignmentBaseline="middle"
        textAnchor="middle"
        fontSize={fontSize}
        fill="#000"
      >
        {taskValue}
      </Text>
    </Svg>
  );
};

export default ProgressBarSvg;
