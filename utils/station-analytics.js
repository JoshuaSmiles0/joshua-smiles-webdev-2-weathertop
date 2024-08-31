

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
      default :weatherIconAddress = "https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/weatherMap.png?v=1724950952749";
      
      
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
  
    currentTempFarenheit(station){
    if(station.reports.length > 0){
    let currentTemp = stationAnalytics.currentTemp(station) ;
    let currentTempFarenheit = Math.round((currentTemp * 1.8) + 32);
    return currentTempFarenheit;
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
      default: iconPath = "https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/celcius.png?v=1724950955411";
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
      let windGroup = null
      
      if((windDirection == 360)||(windDirection ==0)) {
        windGroup = 1
      }
      
      else if((windDirection > 0)&& (windDirection <=22.5)){
        windGroup = 2
      }
      else if((windDirection > 22.5)&& (windDirection <=45.0)){
        windGroup = 3
      }
      else if((windDirection > 45.0)&& (windDirection <=67.5)){
        windGroup = 4
      }
      else if((windDirection > 67.5)&& (windDirection <=90.0)){
        windGroup = 5
      }
      else if((windDirection > 90.0)&& (windDirection <=112.5)){
        windGroup = 6
      }
      else if((windDirection > 112.5)&& (windDirection <=135.0)){
        windGroup = 7
      }
      else if((windDirection > 135.0)&& (windDirection <=157.5)){
        windGroup = 8
      }
      else if((windDirection > 157.5)&& (windDirection <=180.0)){
        windGroup = 9
      }
      else if((windDirection > 180.0)&& (windDirection <=202.5)){
        windGroup = 10
      }
      else if((windDirection > 202.5)&& (windDirection <=225.0)){
        windGroup = 11
      }
      else if((windDirection > 225.0)&& (windDirection <=247.5)){
        windGroup = 12
      }
      else if((windDirection > 247.5)&& (windDirection <=270.0)){
        windGroup = 13
      }
      else if((windDirection > 270.0)&& (windDirection <=292.5)){
        windGroup = 14
      }
      else if((windDirection > 292.5)&& (windDirection <=315.0)){
        windGroup = 15
      }
      else if((windDirection > 315.0)&& (windDirection <=337.5)){
        windGroup = 16
      }
      else if((windDirection > 337.5)&& (windDirection <360.0)){
        windGroup = 17
      }
     
      
      let windDirectionCompass = null;
      
      switch(windGroup){
        default:windDirectionCompass = "N";
          break;
        case 1:windDirectionCompass ="N";
          break;
                  case 2:windDirectionCompass ="NNE";
          break;
                  case 3 :windDirectionCompass ="NE";
          break;
                  case 4:windDirectionCompass ="ENE";
          break;
                  case 5:windDirectionCompass ="E";
          break;
                  case 6:windDirectionCompass ="ESE";
          break;
                  case 7:windDirectionCompass ="SE";
          break;
                  case 8:windDirectionCompass ="SSE";
          break;
                  case 9:windDirectionCompass ="S";
          break;
                  case 10:windDirectionCompass ="SSW";
          break;
                  case 11:windDirectionCompass ="SW";
          break;
                  case 12:windDirectionCompass ="WSW";
          break;
                  case 13:windDirectionCompass ="W";
          break;
                  case 14:windDirectionCompass ="WNW";
          break;
                  case 15:windDirectionCompass ="NW";
          break;
                  case 16:windDirectionCompass ="NNW";
          break;
        
      }
      
      return windDirectionCompass;
      
    }
},
  
  windDirectionIcon(station){
    
    let windDirection = stationAnalytics.windDirection(station);
    let windDirectionPath = null;
    
    switch (windDirection){
        default : windDirectionPath = "https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/wind.png?v=1724950949850"
        break;
      case "N": windDirectionPath = "https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/north.png?v=1723430007196"
        break;
        case "NNE": windDirectionPath = "https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/northEast.png?v=1723430013665"
        break;
        case "NE": windDirectionPath = "https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/northEast.png?v=1723430013665"
        break;
        case "ENE": windDirectionPath = "https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/northEast.png?v=1723430013665"
        break;
        case "E": windDirectionPath = "https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/east.png?v=1723430018894"
        break;
        case "ESE": windDirectionPath = "https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/southEast.png?v=1723430022737"
        break;
        case "SE": windDirectionPath = "https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/southEast.png?v=1723430022737"
        break;
        case "SSE": windDirectionPath = "https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/southEast.png?v=1723430022737"
        break;
        case "S": windDirectionPath = "https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/south.png?v=1723430027719"
        break;
        case "SSW": windDirectionPath = "https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/southWest.png?v=1723430035612"
        break;
        case "SW": windDirectionPath = "https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/southWest.png?v=1723430035612"
        break;
        case "WSW": windDirectionPath = "https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/southWest.png?v=1723430035612"
        break;
        case "W": windDirectionPath = "https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/west.png?v=1723430040489"
        break;
        case "WNW": windDirectionPath = "https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/northWest.png?v=1723430045913"
        break;
        case "NW": windDirectionPath = "https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/northWest.png?v=1723430045913"
        break;
        case "NNW": windDirectionPath = "https://cdn.glitch.global/d6973480-5b8e-463f-a315-d8ad6ba2634d/northWest.png?v=1723430045913"
        break; 
    }
    return windDirectionPath;
  },

currentWind(station){
    if(station.reports.length > 0){
    let latestPosition = (station.reports.length) -1 ;
    let currentWind = station.reports[latestPosition].windSpeed ;
    return currentWind;
    }
  },
  
  currentWindMph(station){
    if(station.reports.length > 0){
    let currentWind = stationAnalytics.currentWind(station) ;
    const currentWindMph = Math.round(currentWind * 0.621371);
    return currentWindMph;
    }
  },
  
  currentWindKnots(station){
    if(station.reports.length > 0){
      let currentWindMph = stationAnalytics.currentWindMph(station);
      const currentWindKnots = currentWindMph / 1.15;

    return currentWindKnots;
          }
  },
  
  
  windType(station){
    if(station.reports.length >0){
      const currentWindKnots = stationAnalytics.currentWindKnots(station);
      let windDescription = null;
      
      if(currentWindKnots <1){
        windDescription = "Calm"
      }
      else if ((currentWindKnots >1) && (currentWindKnots <4)){
               windDescription = "Light air"
               }
            else if ((currentWindKnots >=4) && (currentWindKnots <7)){
               windDescription = "Light breeze"
               }
            else if ((currentWindKnots >=7) && (currentWindKnots <10)){
               windDescription = "Gentle Breeze"
               }
            else if ((currentWindKnots >=10) && (currentWindKnots <16)){
               windDescription = "Moderate Breeze"
               }
            else if ((currentWindKnots >=16) && (currentWindKnots <21)){
               windDescription = "Fresh Breeze"
               }
            else if ((currentWindKnots >=21) && (currentWindKnots <27)){
               windDescription = "Strong Breeze"
               }
            else if ((currentWindKnots >=27) && (currentWindKnots <33)){
               windDescription = "Near Gale"
               }
            else if ((currentWindKnots >=33) && (currentWindKnots <40)){
               windDescription = "Gale"
               }
            else if ((currentWindKnots >=40) && (currentWindKnots <47)){
               windDescription = "Strong Gale"
               }
            else if ((currentWindKnots >=47) && (currentWindKnots <55)){
               windDescription = "Storm"
               }
            else if ((currentWindKnots >=55) && (currentWindKnots <63)){
               windDescription = "Violent Storm"
               }
      else if (currentWindKnots >=63){
               windDescription = "Hurricane"
               }
      
      return windDescription;
      
      
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
            minPressure = station.reports[i].pressure;
          }
      }
    }
    console.log(`min pressure ${minPressure}`);
    return minPressure;
  },
  
    calculateWindChill(station){
    if(station.reports.length >0){
    const currentTemp = stationAnalytics.currentTemp(station);
    const windSpeed = stationAnalytics.currentWindMph(station);
    const windChill = Math.round(13.12 + (0.6215 * currentTemp) - (11.37 * (windSpeed**0.16)) + (0.3965 * currentTemp * (windSpeed**0.16)));
    return windChill;
    }
  },
  
  
}
  