import React from 'react'
import SearchBar from './AppMain/SearchBar.js'
import MainMap from './AppMain/MainMap.js'
import MainOption from './AppMain/MainOption.js'
import Footer from './AppMain/Footer.js'
import places from '../placesData.js'
import Header from './common/Header.js'


import {
  useJsApiLoader,
} from '@react-google-maps/api'

export default function AppMain(props) {
  //State for what options are shown
  const [allPlaces, setAllPlaces] = React.useState(places)

  //State for saving the nearby options
  const [nearbyPlaces, setNearbyPlaces] = React.useState([]);

  //State that's toggled after the user selects an address
  const [hasPicked, setHasPicked] = React.useState(false)

  //Default map view address
  const [placesData, setPlacesData] = React.useState({
    lat: 14.4894032,
    lng: 121.0092694,
    zoom: 10,
    chosenAddress: {},
    locationSelected: false,
    radius: 500
  })



  //Loading of the Google Maps Script
  const inputref = React.useRef(null)
  const mapRef = React.useRef(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
    libraries: ["places"]
  })

  function getMap(map) {
    mapRef.current = map;
  }

  //Function for when the user enters an address
  function handleOnPlacesChanged() {
    setPlacesData(function (oldState) {
      console.log("Chosen place is getting updated...")
      return ({
        ...oldState,
        lat: inputref.current.getPlaces()[0].geometry.location.lat(),
        lng: inputref.current.getPlaces()[0].geometry.location.lng(),
        zoom: 15,
        locationSelected: true,
        chosenAddress: inputref.current.getPlaces()
      })
    })
  }

  function handleSelectChange(event) {
    const { name, value} = event.target
      setPlacesData(function (oldState) {
        return ({
          ...oldState,
          [name]: value
        })
      })
  }

  //State to prevent useEffect from running for nearbySearch
  const [appInitialized, setAppInitialized] = React.useState(false)

  React.useEffect(() => {
    if (!appInitialized) {
      console.log("EXPECTED: App is initialized. Nearby Search not run for now.")
      setAppInitialized(true)
    } else if (placesData.locationSelected == true) {
      //If Radius is selected first... do not run.
      //If location is selected first... run

      console.log(`Nearby Search (Part 1/2) using lat: ${placesData.lat} and ${placesData.lng}`)
      //Fetch nearby search data
      fetch(`${props.API_BASE_URL}/api/v1/nearbySearch`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          latitude: placesData.lat,
          longitude: placesData.lng,
          radius: placesData.radius
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log("NearbySearch Results:", data.places)
          setAllPlaces(data.places)
        })
        .then(() => {
          setHasPicked(function () {
            console.log("PlacesData:", placesData)
            return (true)
          })
        })
    }

  }, [placesData])

  React.useEffect(() => {
    console.log("hasPicked updated:", hasPicked);
  }, [hasPicked]);








  return (
    <div className="AppMain">
      <Header
        page={props.page}
        handlePageChange={props.handlePageChange}
        stylePage={props.stylePage}
      />
      {isLoaded &&
        <div className="App--picked">
          <SearchBar
            hasPicked={hasPicked}
            handleOnPlacesChanged={handleOnPlacesChanged}
            handleSelectChange={handleSelectChange}
            placesData={placesData}
            inputref={inputref}
          />
          {//can be made more efficient with the number of props being passed
            (hasPicked) ? <MainOption
              allPlaces={allPlaces}
              placesData={placesData}
              hasPicked={hasPicked}
              API_BASE_URL={props.API_BASE_URL}
            /> :
              <MainMap
                allPlaces={allPlaces}
                placesData={placesData}
                mapRef={mapRef}
                getMap={getMap}
              />
          }
        </div>}
      {/*<Footer
        handleNo={handleNo}
        handleYes={handleYes}
      />*/}
    </div>
  );
}