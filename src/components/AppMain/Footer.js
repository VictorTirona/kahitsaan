import React from 'react'

export default function Footer(props) {   
    return (
        <div className="Footer">
            <div className="Footer--container">
                    <button className="Footer--button-no" onClick={props.handleNo}>No</button>
                    <button className="Footer--button-yes" onClick={props.handleYes}>Yes</button>
            </div>

        </div>
    );
}