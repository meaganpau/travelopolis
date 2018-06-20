import React from "react";
import Trip from "./Trip";

const Trips = props => {
    return (
        <ul className="Trips">
            { Object.keys(props.trips).map((trip, i) => (
                <Trip 
                name={props.trips[i].name} 
                id={props.trips[i]._id} 
                key={props.trips[i]._id} 
                />
            )) }
        </ul>
    );
};

export default Trips;
