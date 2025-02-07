import React from 'react'

export default function Header(props) {

    return (
        <div className="Header" style={props.stylePage.header}>
            <h1 className="Header--logo" style={props.stylePage.headerLogo}>KahitSaan</h1>
            <button className="Header--button" onClick={props.handlePageChange}><img className="Header--button-img" src={props.stylePage.headerIconFile} style={props.stylePage.headerIcon}/></button>
        </div>
    )
}