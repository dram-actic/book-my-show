import React from "react";
import { Link } from "react-router-dom";
function Poster(props) {
    return (
        <>

            <Link to={`/bookingPage/${props.id}`}>
                <div className="flex flex-col rounded-b-lg hover:shadow-xl hover:shadow-slate-600 pb-1 hover:scale-105 transition-all duration-250">
                    <div className="">
                        <img className="rounded-t-lg " src={`https://image.tmdb.org/t/p/original${props.poster_path}`} alt={props.title} />
                    </div>
                    <div className="font-semibold md:text-lg text-sm px-2 text-center">
                        {props.title}
                    </div>
                    <div className="md:text-base text-xs px-2 text-center">
                        {props.release_date}
                    </div>
                </div>
            </Link>
        </>
    );
};
export default Poster;