import './App.css';
import {useEffect} from "react";
import axios from "axios";
import {setCelsius, setFahrenheit, uploadWeather} from "./redux/actions";
import * as ReactRedux from "react-redux";
import store from "./redux/store";


function App(props) {

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            requestPromise(position.coords.latitude, position.coords.longitude);
        });

    }, [])

    const requestPromise = async (lat, lon) => {
        try {
            const result = await axios.get(`https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${lon}`)
            props.displayNewWeather(result.data);
        } catch (e) {
            console.log(e);
        }

    };

    return (
        <div className="App">
            <h1>Weather App</h1>
                <h2>{`City: ${props.city}`}</h2>
                <div className={"img-container"}>
                    <label>{props.weather.main}</label>
                    <img src={props.weather.icon} alt="#"/>
                </div>
                <ul style={{listStyleType: "none"}}>
                    <li>{`Temperature: ${props.main.temp}`}</li>
                    <li>{`Feels Like: ${props.main.feels_like}`}</li>
                    <li>{`Unity: ${props.main.unity}`}</li>
                    <li>{}</li>
                    <li>{}</li>
                    <li>{}</li>
                </ul>
            <button onClick={
                () => props.main.unity === '°C' ? props.setOnFahrenheit() : props.setOnCelsius()
            }>
                {props.main.unity === '°C' ? "to °F" : "to °C"}
            </button>
        </div>
    );
}

// React-Redux Connexion

const mapStateToProps = (state) => {
    return {
        id: state.id,
        city: state.city,
        country: state.country,
        weather: {
            main: state.weather.main,
            description: state.weather.description,
            icon: state.weather.icon
        },
        main: {
            temp: state.main.temp,
            feels_like: state.main.feels_like,
            temp_min: state.main.temp_min,
            temp_max: state.main.temp_max,
            pressure: state.main.pressure,
            humidity: state.main.humidity,
            unity: state.main.unity
        }
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        displayNewWeather: (newWeather) => {
            dispatch(uploadWeather(newWeather))
        },
        setOnCelsius: () => {
            dispatch(setCelsius())
        },
        setOnFahrenheit: () => {
            dispatch(setFahrenheit())
        }
    }
};

const Provider = ReactRedux.Provider;
const Container = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);

function AppWrapper(){
        return (
            <Provider store={store}>
                <Container/>
            </Provider>
        );
}

// End of React-Redux Connection

export default AppWrapper;
