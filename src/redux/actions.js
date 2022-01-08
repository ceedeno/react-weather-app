const UPLOAD_WEATHER = 'UPLOAD_WEATHER';
const SET_CELSIUS = 'SET_CELSIUS';
const SET_FAHRENHEIT = 'SET_FAHRENHEIT';

const uploadWeather = (newWeather) => {
    return {
        type: UPLOAD_WEATHER,
        newWeather: newWeather
    }
}

const setCelsius = () => {
    return {
        type: SET_CELSIUS
    }
}

const setFahrenheit = () => {
   return {
       type: SET_FAHRENHEIT
   }
}

export {uploadWeather, setFahrenheit, setCelsius}
