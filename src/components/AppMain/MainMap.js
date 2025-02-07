import React from 'react'
import {
  GoogleMap
} from '@react-google-maps/api'


/*
[DONE] Connect the content below to the placesData.js and make buttons cycle through the data
[1/2] Connect google maps to the search bar and should load a new object of nearby places
  - take the App.js and integrate it with the Main.js and Header
  - return the old App-real.js
  - replace placesData.js with the nearbyPlaces state
    - make sure the buttons still work with the new stateObject nearbyPlaces

3. Figure out how to load the pictures. Bc getURL isn't part of the object when I copy paste it
4. Create a pop up for yes and no
5. Create a "Saved places" page using a hamburger icon on the top right
6. Style the content and everything

Corner cases:
1. Status: Closed and Open should have different colors
2. Sometimes, there's missing data. How do we make it look good in that case?
*/

export default function MainMap(props) {




  return (
    <div className="Main">
        <div className="Main--map">
          <GoogleMap
            id="circle-example"
            mapContainerStyle={{
              height: "100%",
              width: "100%"
            }}
            zoom={props.placesData.zoom}
            center={{
              lat: props.placesData.lat,
              lng: props.placesData.lng
            }}
            onLoad={(map) => (() => { props.getMap(map) })}
            options={{
              mapTypeControl: false,
              streetViewControl: false,
              zoomControl: false,
              fullscreenControl: false,
              keyboardShortcuts: false
            }}
          />
        </div>
    </div>
  );
}