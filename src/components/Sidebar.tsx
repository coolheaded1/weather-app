import axios from "axios";
import { useEffect, useState } from "react";
import { CityItemType } from "../types";

export const Sidebar = ({ setCord, setShowSidebar }: any) => {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [currentName, setCurrentName] = useState("");

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            await axios
                .get("https://api.api-ninjas.com/v1/city?country=ng&limit=20", {
                    headers: {
                        "X-Api-Key": "ARXs7M9sQz29WlNR//iGrA==9Zn6IZcZgFFxIhe9",
                    },
                })
                .then((response) => {
                    setCities(response.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                });
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            await axios
                .get(
                    `https://api.api-ninjas.com/v1/city?country=ng&limit=20&name=${search}`,
                    {
                        headers: {
                            "X-Api-Key":
                                "ARXs7M9sQz29WlNR//iGrA==9Zn6IZcZgFFxIhe9",
                        },
                    }
                )
                .then((response) => {
                    setCities(response.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                });
        })();
    }, [search]);

    return (
        <div>
            <input
                className="p-2 w-full focus:outline-none rounded-lg bg-gray-200 mb-5"
                value={search}
                type="search"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
            />

            {isLoading ? (
                <p className="text-sm italic">Please wait...</p>
            ) : cities.length > 0 ? (
                cities.map((item: CityItemType, index: number) => (
                    <div key={index}>
                        <button
                            className={`${
                                currentName === item.name
                                    ? "bg-gray-400/60 "
                                    : "bg-gray-200 "
                            }w-full my-1 p-2 rounded-lg font-normal hover:bg-gray-400/60`}
                            onClick={() => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                setCurrentName(item.name);
                                setShowSidebar(false);
                                setCord({
                                    longitude: item.longitude,
                                    latitude: item.latitude,
                                    name: item.name,
                                });
                            }}
                        >
                            {item.name}
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-sm">No data available</p>
            )}
        </div>
    );
};
