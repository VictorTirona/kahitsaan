import React from 'react'
import Card from './Card.js'
import favoritesData from '../../favoritesData.js'

export default function FavoritesContent() {

    const localStorageFavorites = { ...localStorage };
    const arrayFavorites = Object.values(localStorageFavorites)
    const favoritesMapped = arrayFavorites.map((perItem) => {
        return (
            <Card cardData={JSON.parse(perItem)}/>
        )
    })

    return (
        <div className="FavoritesContent">
            <h2 className="FavoritesContent--title">My Favorites</h2>
            <div className="FavoritesContent--cards">
                {favoritesMapped}
            </div>

            {/*Add here the google URL should be clickable also and should lead to google maps URL */}
        </div>
    )
}