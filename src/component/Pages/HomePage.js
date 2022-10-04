import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Poster from "./Poster/Poster";
function HomePage() {
    const [now_playing, setNowPlaying] = useState([]);
    useEffect(() => {
        const requestNowPlaying = async () => {
            const requestedNowPlaying = await axios.get("/movie/now_playing");
            setNowPlaying(requestedNowPlaying.data.results);
        }
        requestNowPlaying();
    }, []);
    return (
        <>
            <div className="flex flex-col gap-y-10">
                <div className="bg-[#2B3148]">
                    <img src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120:q-80/premiere-rupay-banner-web-collection-202104230555.png" className="m-auto w-full md:w-4/5 lg:w-3/4" alt="Poster"/>
                </div>
                <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 lg:w-3/4 md:w-4/5 m-auto gap-y-6 gap-x-6 md:px-0 px-10">
                    {
                        now_playing.map((poster) => (<Poster {...poster} />))
                    }
                </div>
            </div>
        </>
    );
};
export default HomePage;