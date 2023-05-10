export function evaluateEnvironment(humidity, temperature, brightness, noise) {
    // Set threshold values for each input parameter
    const min_humidityThreshold = 40; // %
    const min_temperatureThreshold = 25; // oC
    const min_brightnessThreshold = 300; // lux
    const min_noiseThreshold = 50; // dB
    const max_humidityThreshold = 60; // %
    const max_temperatureThreshold = 33; // oC
    const max_brightnessThreshold = 500; // lux
    const max_noiseThreshold = 45; // dB
    
    // Evaluate each input parameter against its threshold
    const isHumidityGood = humidity <= max_humidityThreshold && humidity >= min_humidityThreshold;
    const isTemperatureGood = temperature <= max_temperatureThreshold && temperature >= min_humidityThreshold;
    const isBrightnessGood = brightness >= min_brightnessThreshold && brightness <= max_brightnessThreshold;
    const isNoiseGood = noise <= max_noiseThreshold;
  
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