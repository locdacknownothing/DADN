export function evaluateEnvironment(humidity, temperature, brightness, noise) {
    // Set threshold values for each input parameter
    const humidityThreshold = 60; // %
    const temperatureThreshold = 25; // oC
    const brightnessThreshold = 300; // lux
    const noiseThreshold = 50; // dB
  
    // Evaluate each input parameter against its threshold
    const isHumidityGood = humidity <= humidityThreshold;
    const isTemperatureGood = temperature <= temperatureThreshold;
    const isBrightnessGood = brightness >= brightnessThreshold;
    const isNoiseGood = noise <= noiseThreshold;
  
    // Assign a label based on the overall evaluation
    if (isHumidityGood && isTemperatureGood && isBrightnessGood && isNoiseGood) {
      return "Rất tốt";
    } else if ((isHumidityGood && isTemperatureGood && isBrightnessGood)
            || (isHumidityGood && isTemperatureGood && isNoiseGood)
            || (isHumidityGood && isBrightnessGood && isNoiseGood)
            || (isBrightnessGood && isTemperatureGood && isNoiseGood)) {
      return "Tốt";
    } else {
      return "Không tốt";
    }
  }