import axios from "axios";
import { useEffect, useState } from "react";

type ItemType = {
    name: string;
    latitude: number;
    longitude: number;
};

export const Sidebar = ({ setCord }: any) => {
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
                    console.log(error);
                    setIsLoading(false);
                });
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = async () => {
        setIsLoading(true);
        await axios
            .get(
                `https://api.api-ninjas.com/v1/city?country=ng&limit=20&name=${search}`,
                {
                    headers: {
                        "X-Api-Key": "ARXs7M9sQz29WlNR//iGrA==9Zn6IZcZgFFxIhe9",
                    },
                }
            )
            .then((response) => {
                setCities(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };

    return (
        <div>
            <input
                className="p-2 w-full focus:outline-none rounded-lg bg-gray-300 mb-5"
                onKeyUp={handleSearch}
                value={search}
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
            />

            {isLoading ? (
                <p className="text-sm italic">Please wait...</p>
            ) : cities.length > 0 ? (
                cities.map((item: ItemType, index: number) => (
                    <div key={index}>
                        <button
                            className={`${
                                currentName === item.name
                                    ? "bg-black/30 "
                                    : "bg-gray-300 "
                            }w-full my-1 p-2 rounded-lg font-normal hover:bg-gray-400/60`}
                            onClick={() => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                setCurrentName(item.name);
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
