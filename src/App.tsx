import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { Sidebar } from "./components";
import Map, { Marker, Popup } from "react-map-gl";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, @typescript-eslint/no-unused-vars
import mapboxgl from "!mapbox-gl";
// import { envConfig } from "./keys";
import "mapbox-gl/dist/mapbox-gl.css";

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
    const [showPopup, setShowPopup] = useState(false);

    const [cord, setCord] = useState({
        longitude: 3.4,
        latitude: 6.45,
        name: "Lagos",
    });

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(
                `${baseUrl}?q=${cord.name}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
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
                    className="p-3 border text-sm font-bold shadow-xl rounded-md bg-white block md:hidden absolute top-10 right-5 z-50"
                    onClick={() => setShowSidebar(!showSidebar)}
                >
                    {showSidebar ? "Close" : "Menu"}
                </button>

                <div
                    className={`p-3 ${
                        showSidebar ? "block absolute top-0" : "hidden relative"
                    } md:block order-last bg-gray-50 z-10 h-screen overflow-y-auto`}
                >
                    <Sidebar
                        setCord={setCord}
                        setShowSidebar={setShowSidebar}
                    />
                </div>

                <div className="md:col-span-2 w-[100vw] md:w-[65vw]">
                    <Map
                        mapboxAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
                        initialViewState={{
                            zoom: 10,
                        }}
                        longitude={cord.longitude}
                        latitude={cord.latitude}
                        style={{ height: "100vh" }}
                        dragRotate={true}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                    >
                        <Marker
                            anchor="top"
                            color="red"
                            latitude={cord.latitude}
                            longitude={cord.longitude}
                            style={{ height: 20, width: 20, cursor: "pointer" }}
                            onClick={() => setShowPopup(!showPopup)}
                        />

                        {showPopup && (
                            <Popup
                                anchor="bottom"
                                latitude={cord.latitude}
                                longitude={cord.longitude}
                                onClose={() => setShowPopup(!showPopup)}
                                closeOnClick={false}
                                className="w-full"
                            >
                                <div className="text-black p-5">
                                    {isLoading ? (
                                        <p className="text-sm italic">
                                            Please wait...
                                        </p>
                                    ) : (
                                        <div className="">
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
                                                <p className="font-bold">
                                                    {weather}
                                                </p>
                                            </div>
                                            <h1 className="font-bold text-[2rem] my-5">
                                                {degree} °C
                                            </h1>

                                            <div className="text-sm">
                                                <p className="capitalize">
                                                    {description}
                                                </p>
                                                <span>
                                                    Humidity: {humidity}%
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Popup>
                        )}
                    </Map>
                </div>
            </div>
        </div>
    );
}

export default App;
