import React from 'react'
import RestaurantCard from './RestaurantCard/RestaurantCard.js'
import Popup from '../Popup/Popup.js'
import popupData from '../../popupData.js'

/*
SWIPING Feature
STATES
  ✓ Below threshold
    ✓ card should be moving with the user's input
      ✓ just connect it
    ✓ if user lets go, card goes back to normal
      ✓ transform: translate (0px) rotate (0deg)
      ✓ transition: transform 0.3s
  ✓ Beyond threshold AND touch ends
    ✓ transform out of screen + animation
    ✓ move to next card
    - last card should unload
        PROBLEM STATEMENT: The card remains SWIPED AWAY. Because of that, when it iterates to the next chosenPlace, the "next place" is in the swiped away part
    ✓ next card should already be under the last card
    
*/

export default function MainOption(props) {
  /* -----------------------SWIPING-----------------------------------  */
  //on touchStart, collect the x and y coordinates of the touch
  const [touchStart, setTouchStart] = React.useState({
    clientX: 0,
    clientY: 0,
  })


  function handleTouchStart(e) {
    //e.preventDefault()

    setTouchStart({
      clientX: e.changedTouches[0].clientX,
      clientY: e.changedTouches[0].clientY,
    })
  }


  //on touchMove, collect the x and y values

  function handleTouchMove(e) {
    //e.preventDefault()
    const offsetX = e.changedTouches[0].clientX - touchStart.clientX

    setTouchEnd({
      clientX: e.changedTouches[0].clientX,
      clientY: e.changedTouches[0].clientY,
      cardPosition: `translate(${offsetX}px) rotate(${offsetX / 10}deg)`,
      transitionStyle: `transform 0.05s ease-out`
    })
  }
  //on touchEnd, compare start and end coordinates. If it moved to the right
  const [touchEnd, setTouchEnd] = React.useState({
    clientX: 0,
    clientY: 0,
  })

  function handleTouchEnd(e) {



    /*Swiping animation. Here's how it works
      1. WHILE swiping, it's translated based on the offsetX
      2. AFTER touchEnd, if below threshold, it translates back to 0
      3. AFTER touchEnd, if higher than threshold, it translates OUT of the screen
    */
    const offsetX = e.changedTouches[0].clientX - touchStart.clientX
    const threshold = 150;

    //e.preventDefault()
    //Here we use e.changedTouches[0].clientX instead of the ReactState because we need it to be the MOST updated.
    //if we use the reactState it gets complicated after the first touchEnd. The state is saved. 
    if ((Math.abs(offsetX) >= threshold) && (offsetX > 0)) {
      console.log("Swiped to the right")
      handleSwipe("right")
    } else if ((Math.abs(offsetX) >= threshold) && (offsetX < 0)) {
      console.log("Swiped to the left")
      handleSwipe("left")
    } else {
      console.log("Touch did nothing")
    }


    setTouchEnd({
      clientX: e.changedTouches[0].clientX,
      clientY: e.changedTouches[0].clientY,
      cardPosition: (Math.abs(offsetX) >= threshold) ? `translate(${(offsetX >= 0) ? 600 : -600}px) rotate(${(offsetX / 10)}deg)` : `translate(${0}px) rotate(${0}deg)`,
      transitionStyle: `transform 0.3s ease-out`
    })
  }

  //State that counts which option we're supposed to be in
  const [chosenPlace, setChosenPlace] = React.useState(0)

  //Function for when user swipes
  function handleSwipe(direction) {
    if (direction == "right") {
      localStorage.setItem(currentPlace.name, JSON.stringify(
        {
          ...currentPlace,
          photoURL: photoURL.firstPhoto,
          priceRange: currentPriceRange,
          operatingHours: currentPlaceOperatingHours
        }))
      setPopupStatus((oldState) => {
        return ({
          ...oldState,
          userHasSwipedRight: true,
        })
      })
    } else if (direction == "left") {
      setPopupStatus((oldState) => {
        return ({
          ...oldState,
          userHasSwipedLeft: true,
        })
      })
    }

    //Resets this back to 0
    setTouchStart({
      clientX: 0,
      clientY: 0,
    })

    //

    setChosenPlace(function (oldState) {
      return (oldState + 1)
    })
  }

  /* -----------------------CONTENT GENERATION-----------------------------------  */
  const [photoURL, setPhotoURL] = React.useState({
    firstPhoto: "",
    secondPhoto: ""
  })

  //for first photo
  React.useEffect(() => {
    try {
      console.log("Getting the photo for:", props.allPlaces[chosenPlace].photos[0].name)
      fetch(`${props.API_BASE_URL}/api/v1/photo`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: props.allPlaces[chosenPlace].photos[0].name
        })
      }).then(response => response.json())
        .then(data => {
          console.log(data.photoUri)
          setPhotoURL((oldState) => {
            return ({
              ...oldState,
              firstPhoto: data.photoUri
            })
          })
        })
        .then(() =>
          setTouchEnd({
            clientX: 0,
            clientY: 0,
            cardPosition: `translate(${0}px) rotate(${0}deg)`,
            transitionStyle: `none`
          }))
    } catch (err) {
      console.error(err.message);
    }

  }, [props.allPlaces, chosenPlace])

  //for second photo
  React.useEffect(() => {
    try {
      if (props.allPlaces[chosenPlace + 1]) {//if statement to check if the next place even exists
        console.log("Getting the photo for:", props.allPlaces[chosenPlace + 1].photos[0].name)
        fetch(`${props.API_BASE_URL}/api/v1/photo`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: props.allPlaces[chosenPlace + 1].photos[0].name
          })
        }).then(response => response.json())
          .then(data => {
            console.log(data.photoUri)
            setPhotoURL((oldState) => {
              return ({
                ...oldState,
                secondPhoto: data.photoUri
              })
            })
          })
      }
    } catch (err) {
      console.error(err.message);
    }

  }, [props.allPlaces, chosenPlace])

  //Created this variable just so that the JSX is easier to read
  const currentPlace = props.allPlaces[chosenPlace]
  const nextPlace = (props.allPlaces[chosenPlace + 1])
  const currentPlaceOperatingHours = getTodayOperatingHours(currentPlace)
  const nextPlaceOperatingHours = getTodayOperatingHours(nextPlace)
  const currentPriceRange = getPriceRange(currentPlace)
  const nextPriceRange = getPriceRange(nextPlace)



  function getTodayOperatingHours(thisPlace) {
    const selectedDate = new Date();
    const currentDay = selectedDate.getDay();
    //current day needs to be adjusted because getDay()'s starting day or [0] in the array is Sunday. While in our Places Data, [0] is Monday
    const currentDayAdjusted = currentDay == 0 ? 6 : currentDay - 1

    const delimitedTime = thisPlace.regularOpeningHours.weekdayDescriptions[currentDayAdjusted].split(": ")
    return delimitedTime[1];
  }

  function getPriceRange(thisPlace) {
    const priceRangeString = (thisPlace.priceRange) ? `${thisPlace.priceRange.startPrice.units}${thisPlace.priceRange.startPrice.currencyCode} - ${thisPlace.priceRange.endPrice.units}${thisPlace.priceRange.endPrice.currencyCode}` : ""
    return (priceRangeString)
  }

  //--------------------------------------START: DESKTOP CONTROLS------------------------------

  //Listener for keypresses
  React.useEffect(() => {
    function handleKeyDown(event) {

      //!document.activeElement.className.includes("SearchBar") is to check if the searchbar is in focus during the keypress. We do not want it to trigger
      if (event.key === "ArrowLeft" && !document.activeElement.className.includes("SearchBar")) {
        console.log("ArrowLeft")
        setTouchEnd((oldState) => {
          return ({
            ...oldState,
            cardPosition: `translate(-700px) rotate(-70deg)`,
            transitionStyle: `transform 0.3s ease-out`
          })
        })
        setTimeout(() => {
          handleSwipe("left");
        }, 300);
      } else if (event.key === "ArrowRight" && !document.activeElement.className.includes("SearchBar")) {
        console.log("ArrowRight")
        setTouchEnd((oldState) => {
          return ({
            ...oldState,
            cardPosition: `translate(700px) rotate(70deg)`,
            transitionStyle: `transform 0.3s ease-out`
          })
        })
        setTimeout(() => {
          handleSwipe("right");
        }, 300);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])
  //--------------------------------------END: DESKTOP CONTROLS------------------------------

  //---------------------------------------START: POPUP----------------------------------------

  const [popupStatus, setPopupStatus] = React.useState({
    startOptions: true,
    firstSwipeRight: true,
    firstSwipeLeft: true,
    userHasSwipedRight: false, //tracks if user has EVER swiped right
    userHasSwipedLeft: false //tracks if user has EVER swiped left
  })

  function handlePopupExit(name) {
    //name in this function is what popupStatus key we're trying to change: expected keys are startOptions, firstSwipeRight, firstSwipeLeft
    setPopupStatus((oldState) => {
      return ({
        ...oldState,
        [name]: false,
      })
    })
  }
  //---------------------------------------END: POPUP----------------------------------------




  return (
    <div className="Main">
      {popupStatus.startOptions &&
        <Popup
          handlePopupExit={handlePopupExit}
          popupData={popupData.startOptions}
        />
      }
      {(popupStatus.firstSwipeLeft && popupStatus.userHasSwipedLeft) &&
        <Popup
          handlePopupExit={handlePopupExit}
          popupData={popupData.firstSwipeLeft}
        />
      }
      {(popupStatus.firstSwipeRight && popupStatus.userHasSwipedRight) &&
        <Popup
          handlePopupExit={handlePopupExit}
          popupData={popupData.firstSwipeRight}
        />
      }
      <div className="Main--container">
        {/*the under card is first so that we can make sure it gets rendered before the over card */}
        <div className="Main--RestaurantCard-over"
          onTouchStart={e => handleTouchStart(e)}
          onTouchMove={e => handleTouchMove(e)}
          onTouchEnd={e => handleTouchEnd(e)}
          style={{
            //Swiping animation
            transform: `${touchEnd.cardPosition}`,
            transition: `${touchEnd.transitionStyle}`
          }}
        >
          <RestaurantCard
            photoURL={photoURL.firstPhoto}
            operatingHours={nextPlaceOperatingHours}
            displayName={currentPlace.displayName.text}
            rating={currentPlace.rating}
            userRatingCount={currentPlace.userRatingCount}
            getPriceRange={currentPriceRange}
            shortFormattedAddress={currentPlace.shortFormattedAddress}
            googleMapsUri={currentPlace.googleMapsUri}
            editorialSummary={currentPlace.editorialSummary}
          />
        </div>
        <div className="Main--RestaurantCard-under">
          <RestaurantCard
            photoURL={photoURL.secondPhoto}
            operatingHours={currentPlaceOperatingHours}
            displayName={nextPlace.displayName.text}
            rating={nextPlace.rating}
            userRatingCount={nextPlace.userRatingCount}
            getPriceRange={nextPriceRange}
            shortFormattedAddress={nextPlace.shortFormattedAddress}
            googleMapsUri={nextPlace.googleMapsUri}
            editorialSummary={currentPlace.editorialSummary}
          />
        </div>


      </div>
    </div>
  );
}