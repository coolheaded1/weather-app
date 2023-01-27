import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import { Sidebar } from "./components";
import Map from "react-map-gl";
import { envConfig } from "./keys";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

function App() {
    const [degree, setDegree] = useState("");
    const [humidity, setHumidity] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [icon, setIcon] = useState("");
    const [weather, setWeather] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const [cord, setCord] = useState({
        longitude: 0,
        latitude: 0,
        name: "",
    });

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(
                `${baseUrl}?q=${cord.name}&units=metric&appid=${envConfig.API_KEY}`
            )
            .then((response) => {
                setDegree(response.data.main.feels_like);
                setDegree(response.data.main.feels_like);
                setHumidity(response.data.main.humidity);
                setWeather(response.data.weather[0].main);
                setDescription(response.data.weather[0].description);
                setName(response.data.name);
                setIcon(response.data.weather[0].icon);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }, [cord.name]);

    return (
        <div className="bg-gray-50 overflow-x-none app">
            <div className="grid drig-cols-1 md:grid-cols-3">
                {/* menu */}
                <button
                    className="p-3 border text-sm font-bold shadow-xl rounded-md bg-white block md:hidden absolute top-10 left-5 z-50"
                    onClick={() => setShowSidebar(!showSidebar)}
                >
                    {showSidebar ? "Close" : "Menu"}
                </button>

                <div
                    className={`p-3 ${
                        showSidebar ? "block" : "hidden"
                    } md:block order-last bg-gray-50 z-10 h-screen overflow-y-auto`}
                >
                    <Sidebar setCord={setCord} />
                </div>

                <div className="md:col-span-2 w-[100vw] md:w-[65vw]">
                    <Map
                        mapboxAccessToken={envConfig.MAPBOX_API_KEY}
                        initialViewState={{
                            zoom: 12,
                            longitude: cord.longitude,
                            latitude: cord.latitude,
                        }}
                        longitude={cord.longitude}
                        latitude={cord.latitude}
                        style={{ height: "100vh" }}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                    >
                        {/* <Marker
                            latitude={cord.latitude}
                            longitude={cord.longitude}
                            style={{ height: 20, width: 20, cursor: "pointer" }}
                            // onClick={() => setShowPopup(!showPopup)}
                        ></Marker> */}

                        <div className="bg-black/60 p-5 py-7 flex flex-col justify-center absolute bottom-10 left-0 right-0 m-auto md:w-[50vw]">
                            {isLoading ? (
                                <p className="text-sm text-white italic">
                                    Please wait...
                                </p>
                            ) : (
                                <div className="text-white">
                                    <h2 className="text-sm mb-5">
                                        Weather in{" "}
                                        <span className="capitalize">
                                            {name}
                                        </span>
                                    </h2>

                                    <div className="flex items-center">
                                        <img
                                            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                                            alt="icon"
                                            className="w-7 h-7"
                                        />
                                        <p className="font-bold">{weather}</p>
                                    </div>
                                    <h1 className="font-bold text-[3rem]">
                                        {degree} °C
                                    </h1>

                                    <div className="text-sm">
                                        <p className="capitalize">
                                            {description}
                                        </p>
                                        <span>Humidity: {humidity}%</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Map>
                </div>
            </div>
        </div>
    );
}

export default App;
