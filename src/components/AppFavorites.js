import React from 'react'
import Header from './common/Header.js'
import FavoritesContent from './AppFavorites/FavoritesContent.js'


export default function AppFavorites(props){

    
    return(
        <div className="AppFavorites">
            <Header
                page={props.page}
                handlePageChange={props.handlePageChange}
                stylePage={props.stylePage}
            />
            <FavoritesContent/>
            <h1 className="AppFavorites--logo">Favorites</h1>
        </div>
    )
}