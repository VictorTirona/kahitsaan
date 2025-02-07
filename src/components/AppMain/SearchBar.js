import React from 'react'

import {
    StandaloneSearchBox
} from '@react-google-maps/api'

export default function SearchBar(props) {
    //function not yet in use. This will be used once the input is working. Expected is that -- once user picks an address, the input bar will disappear. 
    // Instead, it'll display the address the user selected. 
    //if the user clicks the displayed address, the search bar will appear again 

    //Style because I want the default of the Select input to be gray!
    const styleRadius = {
        color: (props.placesData.radius=="") ? "#858585":"#232323"
    }

    return (
        <div className="SearchBar">
            <StandaloneSearchBox
                onLoad={(ref) => props.inputref.current = ref}
                onPlacesChanged={props.handleOnPlacesChanged}
            >
                <input className="SearchBar--input" type="text" placeholder="Enter address..."></input>
            </StandaloneSearchBox>
            <select
                className="SearchBar--radius-input"
                name="radius"
                id="radius"
                onChange={props.handleSelectChange}
                value={props.placesData.radius}
                style={styleRadius}
            >
                <option value="" disabled selected>radius</option>
                <option value="500">500m</option>
                <option value="2000">2km</option>
                <option value="5000">5km</option>
                <option value="10000">10km</option>
            </select>
        </div>
    );
}