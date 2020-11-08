import React, {useEffect, useState} from 'react';
import Card from './Card'
import lookup from '../../functions/backend-lookup/djangoLookup'

function CardList(props) {
    const [cards, setCards] = useState([])
    const [cardsInit, setCardsInit] = useState([])
    const {username, card_id} = props
    
    let url = "/cards/list/"
  
    if(username) {
      url = `/cards/list/?username=${username}`
    } else if (card_id) {
      url = "/cards/" + card_id
    }
  
    useEffect(() =>{
      let final = [...props.newCards].concat(cardsInit)
      if (final.length !== cards.length) {
        setCards(final)
      }
    }, [props.newCards, cards, cardsInit])
    useEffect(() => {
      const callback = (response, status) => {
        setCardsInit(response)
      }
      lookup("GET", url, {}, callback)
    }, [url])
  
  
    return (
      <div style={{marginTop: 50}}>
        {cards.map((card, index) => {
          return <div key={index} className="container"><Card card={card} key={card.id} />
          </div>
        })}
        
      </div>
    )
}
export default CardList