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
            <div className="weather-card">
                <div className="top">
                    <div className="wrapper">
                        <div className="myNav">
                            <a className="lnr lnr-grade"
                               onClick={
                                   () => props.main.unity === '°C' ? props.setOnFahrenheit() : props.setOnCelsius()
                               }>
                                {props.main.unity === '°C' ? "°F" : "°C"}
                            </a>
                        </div>
                        <h1 className="heading">{props.weather.main}</h1>
                        <h3 className="location">{`${props.city}, ${props.country}`}</h3>
                        <p className="temp">
                            <span className="temp-value">{props.main.temp}</span>
                            <span className="temp-type">{props.main.unity}</span>
                        </p>
                        <div className={"img-container"}>
                            <img src={props.weather.icon} alt="#"/>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="wrapper">
                        <ul className="forecast">
                            <li>
                                <span>Feels Like: </span>
                                <span>{props.main.feels_like}</span>
                            </li>
                            <li>
                                <span>Min: </span>
                                <span>{props.main.temp_min}</span>
                            </li>
                            <li>
                                <span>Max: </span>
                                <span>{props.main.temp_max}</span>
                            </li>
                            <li>
                                <span>Humidity: </span>
                                <span>{props.main.humidity}</span>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
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

function AppWrapper() {
    return (
        <Provider store={store}>
            <Container/>
        </Provider>
    );
}

// End of React-Redux Connection

export default AppWrapper;
