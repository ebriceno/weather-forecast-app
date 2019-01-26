import React from 'react';
import { WiCloud, WiDaySunny, WiCloudy, WiRainMix } from "weather-icons-react";

export const forecastIcons = Object.freeze({
  'few clouds': <WiCloud size={128} color='#D5E4F1'/>,
  'scattered clouds': <WiCloudy size={128} color='#D5E4F1'/>,
  'light rain': <WiRainMix size={128} color='#D5E4F1'/>,
  'clear sky': <WiDaySunny size={128} color='#D5E4F1'/>,
});

export const forecastIconsSmall = Object.freeze({
  'few clouds': <WiCloud size={64} color='#000'/>,
  'scattered clouds': <WiCloudy size={64} color='#000'/>,
  'light rain': <WiRainMix size={64} color='#000'/>,
  'clear sky': <WiDaySunny size={64} color='#000'/>,
});
