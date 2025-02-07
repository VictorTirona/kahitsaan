import React from 'react'
import Stars from '../common/Stars.js'

/*
    1. operating hours when there are two segments, it's too long
    2. when address is too long, card should extend.
        - Also, operatingHours should have your own div
*/

export default function Card(props) {
    return (
        <a className="Card" href={props.cardData.googleMapsUri} target="_blank"><img className="Card--img" src={`${props.cardData.photoURL}`} />
            <div className="Card--info">
                <h3 className="Card--info-title">{props.cardData.displayName.text}</h3>
                <h3 className="Card--info-sub">{<Stars rating={props.cardData.rating} />}</h3>
                <h3 className="Card--info-sub"><img className="Card--info-address" src="./images/dollar-icon.svg" />{props.cardData.priceRange}</h3>
                <h3 className="Card--info-sub"><img className="Card--info-address" src="./images/maps-pin-black-icon.svg" />{props.cardData.shortFormattedAddress}</h3>
                <div className="Card--info-status-container">
                    <h3 className="Main--content-status">{(props.cardData.operatingHours)}</h3> {/*.replace(", ","something") */}
                </div>
            </div>
        </a>
    )
}