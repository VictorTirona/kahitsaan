import React from 'react'
import './App.css';
import AppMain from './components/AppMain.js'
import AppFavorites from './components/AppFavorites.js'
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";


/*
TO DO:
✓ Figma mock up
DAY 1
2. Entered address should be used as the basis for the 20 restaurants
  ✓ Figure out why "service.nearbySearch" isn't even running
  ✓ Create a useEffect that runs when placesData is updated. This useEffect will trigger nearby search
    ✓ try HTTPS API for nearby search via Postman
    ✓ use nodeJS and the HTTPS API instead
  ✓ After nearbySearch runs, setAllPlaces should be updated
  ✓ Adjust Main.js to use the new data
    ✓ Get Photo
✓ Add the other data points:
  ✓ weekdayDescriptions
  ✓ clickable to googlemaps URL
  ✓ price range
✓ My favorites (no storage, just in the current session. Maybe extract/copy paste Google Maps URLs and names)
  ✓ Most of the UI and the mapping
  ✓ Change button icon
  ✓ Heart icon should change icon depending on the page
  ✓ Heart icon should also be visible (and in the same location) in the Main Map page AND in the Main Tinder page
✓ User should be able to swipe
  ✓ Functions for swiping
  ✓ Animation of cards getting swiped  based on onTouchMove
  ✓ Next card should be behind the current card
✓ Make UI stretch to any mobile screen size(or laptop screen size)
✓ New UI in the maps etc page
  ✓ BUG: Wrong photo is extracted

DAY 4
✓ Filter for range
  ✓ plug the radius state variable into the useEffect for nearbySearch
✓ Apply the (( ) && <>) logic to everything in MainOption.js. If it is not available, do not show!
✓ Swiping right should save items to the my Favorites
  ✓ Store favorites in browser local storage?
  ✓ Favorites page: have it use items in the local storage
  ✓ Adjust favorites components to use the ACTUAL data!!!
✓ Increase the number of places API retrieved
✓ Pop ups
✓ Create pop up component
    ✓Should have a changeable icon (heart or thumbs down, or exclamation point for instructions etc.)
    ✓background should be darker
    ✓ if background is clicked or the "x" button, pop up should disappear
  ✓ At the start: "Phone: swipe left and right. Desktop: left and right arrow keys"
  ✓ After swiping left or right: 
    ✓ Right: "*Heart Icon* Saved restaurant in your favorites! Tap the heart icon on the top right."
    ✓ Left: "Thumbs down. You did not like this restaurant."
    ✓ should show only for the first time swiping right and left
✓ Change logo and title name
✓ Change number of places from 3 to 20
✓ For laptop: user should be able to press right and left to swipe
6. When clicking left and right after the second click, it should save to favorites
5. Local Storage upgrade:
  - Favorites should be ordered by time saaved
  - Store in browser local storage how many times a user has tried LOL. Limit it to 5 searches
  ✓ If restaurant already exists in local storage, do not add
7. No results screens
  - When in the MainOptions screen, if user enters a new radius or address, should load a new set of places.
  - When there are no favorites, should say "No favorite restaurants yet. Start swiping!"
  - When there are no places, should say "No restaurants found. Try increasing the radius or changing places!"
8. [BUG] Swiping left and right is not working properly after the first one
9. [BUG] Steps to reproduce:
  1. select radius
  2. select location
  3. select radius
  4. result: some photos get halved?
  5. this was in 7 peace street!
✓ Deployment and testing
  ✓ Make API keys into ENV variables
  ✓ Push to github
  ✓ Push to vercel
    ✓ App
    ✓ Server
  ✓ Test all features

HIGH PRIORITY -- NICE TO HAVE
13. App should not get reset when changing between pages
Make sure app still looks good in landscape rotation
14. Add the short generated descriptions in the RestaurantCards
15. [BUG] In favorites, operating hours goes beyond length
16. Should be able to delete favorites
17. [BUG] Re-sizing pop up by width makes pop up go down

NICE TO HAVE
14. Button click animations. How do I make them look more like buttons?
15. Change PHP to the peso symbol
11. Select between photos

  */


function App() {
  const [page, setPage] = React.useState('Main')

  function handlePageChange() {
    console.log("Clicked!")
    setPage((oldState) => {
      return ((oldState == "Main") ? "Favorites" : "Main")
    })
  }

  React.useEffect(() => {
    const metaTag = document.querySelector('meta[name="theme-color"]');
    if (metaTag) {
      metaTag.setAttribute('content', (page=="Main")?"#FFFFFF":"#F39600");
    }
  }, [page]);

  //Style based on page
  const stylePage = (page == "Main") ?
    //Style if Main Page
    {
      app: {
        backgroundColor: "white"
      },
      header: {
        backgroundColor: "white"
      },
      headerLogo: {
        color: "#F39600"
      },
      headerIconFile: "./images/heart-icon.svg",
      headerIcon: {
        filter: "invert(48%) sepia(72%) saturate(1848%) hue-rotate(14deg) brightness(111%) contrast(102%)"
      }
    }
    :
    //Style if Favorites Page
    {
      app: {
        backgroundColor: "#F39600"
      },
      header: {
        backgroundColor: "#F39600"
      },
      headerLogo: {
        color: "white"
      },
      headerIconFile: "./images/home-icon.svg",
      headerIcon: {
        filter: "invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%)"
      }
    }

  return (
    <div className="App" style={stylePage.app}>
      {page == 'Main' && <AppMain
        page={page}
        handlePageChange={handlePageChange}
        stylePage={stylePage}
        API_BASE_URL={API_BASE_URL}
      />}
      {page == 'Favorites' && <AppFavorites
        page={page}
        handlePageChange={handlePageChange}
        stylePage={stylePage}
      />}

    </div>
  );
}

export default App;
