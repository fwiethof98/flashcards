import React, {useEffect, useState} from 'react';
import lookup from '../../functions/backend-lookup/djangoLookup'
import MathJax from 'react-mathjax-preview'

function Card(props) {
    const [display, setDisplay] = useState(true)
    const [displayAnswer, setDisplayAnswer] = useState(false)
    const {card} = props
    const handleClick = id => {
      lookup("DELETE", `/cards/${id}/delete`, {}, (response, status) => {
        if (status===200) {
          setDisplay(false)
        } else if (status===400){

        }
      })
    }
    const handleShowAnswer = id => {
      setDisplayAnswer(!displayAnswer)
    }
  
    const handleClickEdit = (card) => {
      window.location.href = `http://${window.location.hostname}/?edit=true&id=` + card.id
    }
    


    return <div style={display ? {display: "block"} : {display: "none"}} >
      {/* <MathJax math={String.raw`Alles, was hier steht: $\infty$`} /> */}
      <p className="mt-2 text-muted" style={{fontSize: 14, marginBottom: 2}}><a href={`http://${window.location.hostname}/cards/${card.username}`}>@{card.username}</a>, {card.lecture}, {card.time && card.time.split("T")[0]}</p>
      <div className="form-inline">
        <button className="mx-1 btn btn-danger mb-1" onClick={() => handleClick(card.id)}>Delete</button>
        <button className="mx-1 btn btn-primary mb-1" onClick={() => handleShowAnswer(card.id)}>{displayAnswer ? "Hide" : "Show"}</button>
        <button className="mx-1 btn btn-warning mb-1" onClick={() => handleClickEdit(card)}>Edit</button>
      </div>
      <h3 className="mb-4"><MathJax math={String.raw`${card.question}`} /></h3>
      <p style={displayAnswer ? {display: "block"} : {visibility: "hidden"}}><MathJax math={String.raw`${card.answer}`} /></p>
    </div>
}
export default Card