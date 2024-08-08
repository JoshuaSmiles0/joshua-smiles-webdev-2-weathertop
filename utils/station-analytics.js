

export const stationAnalytics = {
  
  getWeatherIcon(station){  
    if(station.reports.length > 0){
  let latestReportPosition= (station.reports.length) -1 ;
  let currentWeatherCode = station.reports[latestReportPosition].code;
    
  let weatherGroup = null;
  
  if((currentWeatherCode >= 200 ) && (currentWeatherCode <= 232)){
    weatherGroup = 2
  }
    
    else if ((currentWeatherCode >= 300 ) && (currentWeatherCode <= 321)){
    weatherGroup = 3
  }
    
        else if ((currentWeatherCode >= 500 ) && (currentWeatherCode <= 531)){
    weatherGroup = 5
  }
    
        else if ((currentWeatherCode >= 600 ) && (currentWeatherCode <= 622)){
    weatherGroup = 6
  }
    
        else if ((currentWeatherCode >= 701 ) && (currentWeatherCode <= 781)){
    weatherGroup = 7
  }
    
        else if (currentWeatherCode == 800){
    weatherGroup = 800
  }
    
        else if ((currentWeatherCode > 800 ) && (currentWeatherCode <= 804)){
    weatherGroup = 80
  }
    
  let weatherIconAddress = null;
    
  switch (weatherGroup){
      
      default :
      weatherIconAddress = "https://openweathermap.org/img/wn/10d@2x.png";
      break;
    case 2: weatherIconAddress = "https://openweathermap.org/img/wn/11d@2x.png";
      break;
      case 3: weatherIconAddress = "https://openweathermap.org/img/wn/09d@2x.png";
      break;
      case 5: weatherIconAddress = "https://openweathermap.org/img/wn/10d@2x.png";
      break;
      case 6: weatherIconAddress = "https://openweathermap.org/img/wn/13d@2x.png";
      break;
      case 7: weatherIconAddress = "https://openweathermap.org/img/wn/50d@2x.png";
      break;
      case 800: weatherIconAddress = "https://openweathermap.org/img/wn/01d@2x.png";
      break;
      case 80: weatherIconAddress = "https://openweathermap.org/img/wn/02d@2x.png";
      break;
      
      
  }
    console.log(`${weatherIconAddress}`)
    return weatherIconAddress;
  
  }
},
  
    getLatestWeather(station){
      if(station.reports.length > 0){
  let latestReportPosition= (station.reports.length) -1 ;
  let currentWeatherCode = station.reports[latestReportPosition].code;
    
  let weatherGroup = null;
  
  if((currentWeatherCode >= 200 ) && (currentWeatherCode <= 232)){
    weatherGroup = 2
  }
    
    else if ((currentWeatherCode >= 300 ) && (currentWeatherCode <= 321)){
    weatherGroup = 3
  }
    
        else if ((currentWeatherCode >= 500 ) && (currentWeatherCode <= 531)){
    weatherGroup = 5
  }
    
        else if ((currentWeatherCode >= 600 ) && (currentWeatherCode <= 622)){
    weatherGroup = 6
  }
    
        else if ((currentWeatherCode >= 701 ) && (currentWeatherCode <= 781)){
    weatherGroup = 7
  }
    
        else if (currentWeatherCode == 800){
    weatherGroup = 800
  }
    
        else if ((currentWeatherCode > 800 ) && (currentWeatherCode <= 804)){
    weatherGroup = 80
  }
    
  let weather = null;
    
  switch (weatherGroup){
      
      default :
      weather = "Unknown";
      break;
    case 2: weather = "Thunderstorm";
      break;
      case 3: weather = "Drizzle";
      break;
      case 5: weather = "Rain";
      break;
      case 6: weather = "Snow";
      break;
      case 7: weather = "Atmospheric disturbance";
      break;
      case 800: weather = "Clear";
      break;
      case 80: weather = "Cloudy";
      break;
      
      
  }
    console.log(`${weather}`)
    return weather;
  
      }
},
  
  currentTemp(station){
    if(station.reports.length > 0){
    let latestPosition = (station.reports.length) -1 ;
    let currentTemp = station.reports[latestPosition].temp ;
    return currentTemp;
    }
  },
  
  maxTemp (station){
    let maxTemp = null;
    if(station.reports.length > 0){
      maxTemp = station.reports[0].temp;
      for (let i = 1; i<station.reports.length; i++){
        if(station.reports[i].temp > maxTemp )
          {
            maxTemp = station.reports[i].temp;
          }
      }
    }
    console.log(maxTemp);
    return maxTemp;
  },
  
  minTemp (station){
    let minTemp = null;
    if(station.reports.length > 0){
      minTemp = station.reports[0].temp;
      for (let i = 1; i<station.reports.length; i++){
        if(station.reports[i].temp < minTemp )
          {
            minTemp = station.reports[i].temp;
          }
      }
    }
    console.log(minTemp);
    return minTemp;
  },
  
  tempIcon(station){
   const temp = stationAnalytics.currentTemp(station);
   let icon = null;
   if(temp <= 5){
     
     icon = 1;
     
   }
    
    else if ((temp > 5) && (temp <15))
      {
        icon = 2;
      }
    
    else if (temp>15){
      icon = 3;
    }
    
    let iconPath = null;
   
    switch(icon){
      default: iconPath= "https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/Cold.png?v=1723154498650";
        break;
      case 1: iconPath = "https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/Cold.png?v=1723154498650";
        break;
      case 2: iconPath = "https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/Medium.png?v=1723154494215";
        break;
      case 3: iconPath ="https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/Hot.png?v=1723154489353";
        break;
    }
    
    return iconPath;
    
  },
  
  windDirection(station){
    if(station.reports.length > 0){
      let latestPosition = (station.reports.length) -1 ;
      let windDirection = station.reports[latestPosition].windDirection;
      let windDirectionCompass = null;
      
      switch(windDirection){
        default:windDirectionCompass = "N";
          break;
        case 0.0:windDirectionCompass ="N";
          break;
                  case 22.5:windDirectionCompass ="NNE";
          break;
                  case 45.0 :windDirectionCompass ="NE";
          break;
                  case 67.5:windDirectionCompass ="ENE";
          break;
                  case 90.0:windDirectionCompass ="E";
          break;
                  case 112.5:windDirectionCompass ="ESE";
          break;
                  case 135.0:windDirectionCompass ="SE";
          break;
                  case 157.5:windDirectionCompass ="SSE";
          break;
                  case 180.0:windDirectionCompass ="S";
          break;
                  case 202.5:windDirectionCompass ="SSW";
          break;
                  case 225.0:windDirectionCompass ="SW";
          break;
                  case 247.5:windDirectionCompass ="WSW";
          break;
                  case 270.0:windDirectionCompass ="W";
          break;
                  case 292.5:windDirectionCompass ="WNW";
          break;
                  case 315.0:windDirectionCompass ="NW";
          break;
                  case 337.5:windDirectionCompass ="NNW";
          break;
        
      }
      
      return windDirectionCompass;
      
    }
},

currentWind(station){
    if(station.reports.length > 0){
    let latestPosition = (station.reports.length) -1 ;
    let currentWind = station.reports[latestPosition].windSpeed ;
    return currentWind;
    }
  },
  
  maxWind (station){
    let maxWind = null;
    if(station.reports.length > 0){
      maxWind = station.reports[0].windSpeed;
      for (let i = 1; i<station.reports.length; i++){
        if(station.reports[i].windSpeed > maxWind )
          {
            maxWind = station.reports[i].windSpeed;
          }
      }
    }
    console.log(maxWind);
    return maxWind;
  },
  
  minWind (station){
    let minWind = null;
    if(station.reports.length > 0){
      minWind = station.reports[0].windSpeed;
      for (let i = 1; i<station.reports.length; i++){
        if(station.reports[i].windSpeed < minWind )
          {
            minWind = station.reports[i].windSpeed;
          }
      }
    }
    console.log(minWind);
    return minWind;
  },
  
  currentPressure(station){
    if(station.reports.length > 0){
    let latestPosition = (station.reports.length) -1 ;
    let currentPressure = station.reports[latestPosition].pressure ;
    return currentPressure;
    }
  },
  
  maxPressure (station){
    let maxPressure = null;
    if(station.reports.length > 0){
      maxPressure = station.reports[0].pressure;
      for (let i = 1; i<station.reports.length; i++){
        if(station.reports[i].pressure > maxPressure )
          {
            maxPressure = station.reports[i].pressure;
          }
      }
    }
    console.log(maxPressure);
    return maxPressure;
  },
  
  minPressure (station){
    let minPressure = null;
    if(station.reports.length > 0){
      minPressure = station.reports[0].pressure;
      for (let i = 1; i<station.reports.length; i++){
        if(station.reports[i].pressure < minPressure )
          {
            minPressure = station.reports[i].windPressure;
          }
      }
    }
    console.log(minPressure);
    return minPressure;
  },
  
  
}
  