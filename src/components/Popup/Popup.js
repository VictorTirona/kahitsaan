import React from 'react'


export default function Popup(props) {
    /*const [currentPage, setCurrentPage] = React.useState(0);
    
    //If I want multiple pages in the pop ups
    const pagesMapped = popupData.starter.map((perPage, id) => {
        const styleActivePage = {backgroundColor: (id==currentPage)?"#282828":"#D9D9D9"}

        return (
            <div className="Popup--page-circle" style={styleActivePage}></div>
        )
    })*/

    return (
        <div className="Popup" onClick={()=> props.handlePopupExit(props.popupData.id)}>
            <div className="Popup--frame">
                <div className="Popup--content-container">
                    <img className="Popup--content-img" src={`${props.popupData.imgURL}`} />
                    <h2 className="Popup--content-title">{props.popupData.title}</h2>
                    <h2 className="Popup--content-subtitle">{props.popupData.subtitle}</h2>
                </div>
            </div>
        </div>
    )
}