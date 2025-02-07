import React from 'react'



export default function Stars(props){
    let numStars = props.rating
    const baseArray = [1, 1, 1, 1, 1]

    const mappedArray = baseArray.map((perItem)=>{
        if (numStars>=perItem){
            numStars = numStars-1;
            return (<img className="Stars--img" src="./images/star-full.png"/>)
        } else if (1>numStars && numStars>0){
            numStars = 0
            return (<img className="Stars--img" src="./images/star-half.png"/>)
        }
    })
    
    return(
        <div className="Stars">
            {mappedArray}
        </div>
    )
}