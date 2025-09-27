import serach_icon from '../assets/search.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'
import { useRef, useState } from 'react'
function Weather() {
    const [weatherData, setWeatherData] = useState(false);
    const [welcome, setWelcome] = useState(true);
    const [noData, setNoData] = useState(true);
    const [cityError, setCityError] = useState(true);
    const inputRef = useRef()
    const [bgColorFm, setBgColorFm] = useState("linear-gradient(45deg, #2762f7, #733de6)");
    const [bgColorBy, setBgColorBy] = useState("linear-gradient(to right, #e7ecec, #fafeff)");
    const updateBgcolor = (name) => {
        switch (name) {
            case "clear":
                setBgColorFm("rgb(181 188 61)");
                setBgColorBy("linear-gradient(to bottom, #56CCF2, #2F80ED)");
                break;
            case "rain":
                setBgColorFm("rgb(125 193 178 / 85%)");
                setBgColorBy("linear-gradient(to bottom, #000046, #1CB5E0)");
                break;
            case "clouds":
                setBgColorFm("rgb(119 119 119)");
                setBgColorBy("linear-gradient(to bottom, #bdc3c7, #2c3e50)");
                break;
            case "snow":
                setBgColorFm("rgb(182 179 179)");
                setBgColorBy("linear-gradient(to bottom, #E0EAFC, #CFDEF3)");
                break;
            case "thunderstorm":
                setBgColorFm("#1c1c1c");
                setBgColorBy("linear-gradient(to bottom, #0f2027, #203a43, #2c5364)");
                break;
            case "drizzle":
                setBgColorFm("rgb(17 122 161)");
                setBgColorBy("linear-gradient(rgb(84 106 116), rgb(106 111 112), rgb(138 149 154))");
                break;
            default:
                setBgColorFm("#8d8a8aff");
                setBgColorBy("linear-gradient(to bottom, #56CCF2, #2F80ED)");
                break;
        }
    }
    const search = async (city) => {
        try {
            if (city === "") {
                setNoData(false)
                setWelcome(false)
                setCityError(true)
            }
            else {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
                const response = await fetch(url);
                const data = await response.json()
                console.log(data);
                setWeatherData({
                    location: data.name,
                    temperature: Math.floor(data.main.temp),
                    humidity: data.main.humidity,
                    wind: data.wind.speed,
                    image: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                })
                updateBgcolor(data.weather[0].main.toLowerCase())
                setNoData(true)
                setCityError(true)
                setWelcome(false)
                inputRef.current.value = ""
            }
        } catch (error) {
            setNoData(true)
            setCityError(false)
            inputRef.current.value = ""
        }
    }
    return (
        <div className="weather" style={{ background: bgColorBy ,transitionProperty:'background',transitionDuration:'0.5s'}}>
            {welcome ? <h1 style={{ color: '#003cff', fontSize: '30px', textTransform: 'capitalize', fontFamily: 'Poppins', textAlign: 'center', paddingTop: '30px' }}>Welcome to Mani's Weather App</h1 > : <h1 style={{ color: '#003cff', fontSize: '30px', textTransform: 'capitalize', fontFamily: 'Poppins', textAlign: 'center', paddingTop: '30px' }}>Weather App</h1>}
            <div className='weather-pt'>
                <div className="weather-box" style={{ background: bgColorFm,transitionProperty:'background',transitionDuration:'0.5s' }}>
                    <div className='weather-boxs'>
                        <input ref={inputRef} type="text" placeholder="Search" />
                        <img src={serach_icon} onClick={() => search(inputRef.current.value)} />
                    </div>
                    {noData ? "" : <h3 style={{ color: 'red', textAlign: 'center', paddingTop: '5px' }}>City name is required</h3>}
                    {cityError? "" : <h3 style={{ color: 'red', textAlign: 'center', paddingTop: '5px' }}>City not found</h3>}
                    {weatherData && cityError  && noData? <>
                        <div className='weather-results'>
                            <img src={weatherData.image} className='weather-img' />
                            <h1>{weatherData.temperature}°c</h1>
                            <h2>{weatherData.location}</h2>
                        </div>
                        <div className='weather-ct'>
                            <div className='weather-content'>
                                <img src={humidity_icon} />
                                <div>
                                    <p>{weatherData.humidity}%</p>
                                    <p>Humidity</p>
                                </div>
                            </div>
                            <div className='weather-content'>
                                <img src={wind_icon} />
                                <div>
                                    <p>{weatherData.wind} km/h</p>
                                    <p>Wind Speed</p>
                                </div>
                            </div>
                        </div>
                    </> : ""}
                </div>
            </div>
        </div>
    );
}
export default Weather;