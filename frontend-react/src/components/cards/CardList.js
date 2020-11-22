import React, {useState} from 'react';
import Card from './Card'
import lookup from '../../functions/backend-lookup/djangoLookup'

function CardList(props) {
    const [cards, setCards] = useState(false)
    const {username, card_id, currentUser} = props
    
    let url = "/cards/list/"
  
    if(username) {
      url = `/cards/list/?username=${username}`
    } else if (card_id) {
      url = "/cards/" + card_id
    }
  
    if(!cards){
      const callback = (response, status) => {
        setCards(response)
      }
      lookup("GET", url, {}, callback)
    }
  
  
    return (
      <div style={{marginTop: 50}}>
        {cards && cards.map((card, index) => {
          return <div key={index} className="container"><Card card={card} key={card.id} username={currentUser} create={true} />
          </div>
        })}
        
      </div>
    )
}
export default CardList