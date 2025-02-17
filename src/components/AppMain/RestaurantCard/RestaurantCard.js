import React from 'react'
import Stars from '../../common/Stars.js'


export default function RestaurantCard(props) {
  return (
    <div className="Main--card-container">
      {props.photoURL && <img className="Main--img" src={`${props.photoURL}`} />}
      <div className="Main--img-gradient"></div>
      <div className="Main--content">
        {props.operatingHours && <h3 className="Main--content-status">{props.operatingHours}</h3>}
        {props.displayName && <h2 className="Main--content-title">{props.displayName}</h2>}
        {(props.rating && props.userRatingCount) && <h3 className="Main--content-rating"><Stars rating={props.rating} /> ({props.userRatingCount} reviews)</h3>}
        {(props.getPriceRange) && <h3 className="Main--content-sub Main--content-line">
          <img className="Main--content-icon" src="./images/dollar-icon.svg" />{props.getPriceRange}
        </h3>}
        {(props.shortFormattedAddress) && <h3 className="Main--content-sub Main--content-line"><img className="Main--content-icon" src="./images/maps-pin-black-icon.svg" />{props.shortFormattedAddress}</h3>}
        <div className="Main--gmaps-container">
          {(props.googleMapsUri) && <a href={`${props.googleMapsUri}`} target="_blank" className="Main--gmaps-link">
            <img src="./images/gmaps.png" className="Main--gmaps" />
          </a>}
        </div>
      </div>
    </div>
  )
}