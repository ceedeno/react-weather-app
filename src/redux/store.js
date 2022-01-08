import {createStore} from "redux";

const UPLOAD_WEATHER = 'UPLOAD_WEATHER';
const SET_CELSIUS = 'SET_CELSIUS';
const SET_FAHRENHEIT = 'SET_FAHRENHEIT';

const initialState = {
    id: 0,
    city: "",
    country: "",
    weather: {
        main: "",
        description: "",
        icon: ""
    },
    main: {
        temp: 0,
        feels_like: 0,
        temp_min: 0,
        temp_max: 0,
        pressure: 0,
        humidity: 0,
        unity: "°C"
    }
}

function weatherStateReducer(state = initialState, action) {
    switch (action.type) {
        case UPLOAD_WEATHER:
            return {
                id: action.newWeather.id,
                city: action.newWeather.name,
                country: action.newWeather.sys.country,
                weather: {
                    main: action.newWeather.weather[0].main,
                    description: action.newWeather.weather[0].description,
                    icon: action.newWeather.weather[0].icon
                },
                main: {
                    temp: Math.round(action.newWeather.main.temp),
                    feels_like: Math.round(action.newWeather.main.feels_like),
                    temp_min: Math.round(action.newWeather.main.temp_min),
                    temp_max: Math.round(action.newWeather.main.temp_max),
                    pressure: Math.round(action.newWeather.main.pressure),
                    humidity: action.newWeather.main.humidity,
                    unity: "°C"
                }
            };
        case SET_CELSIUS:
            console.log("set to C")
            return {
                ...state,
                main: {
                    ...state.main,
                    temp: Math.round((state.main.temp - 32) * 5 / 9),
                    temp_min: Math.round((state.main.temp_min - 32) * 5 / 9),
                    temp_max: Math.round((state.main.temp_max - 32) * 5 / 9),
                    feels_like: Math.round((state.main.feels_like - 32) * 5 / 9),
                    unity: "°C"
                }
            };
        case SET_FAHRENHEIT:
            console.log("set to F")
            return {
                ...state,
                main: {
                    ...state.main,
                    temp: Math.round((state.main.temp * 9/5) + 32),
                    temp_min: Math.round((state.main.temp_min * 9/5) + 32),
                    temp_max: Math.round((state.main.temp_max * 9/5) + 32),
                    feels_like: Math.round((state.main.feels_like * 9/5) + 32),
                    unity: "°F"
                }
            };
        default:
            return state;
    }
}

const store = createStore(weatherStateReducer);

export default store;
