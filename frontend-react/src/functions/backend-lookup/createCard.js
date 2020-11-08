import lookup from './djangoLookup'

function createCard(newCard, edit, card_id, callback){
    if(edit){
      lookup("POST", `/cards/${card_id}/delete/?edit=${edit}`, {}, (response, status) => {
        console.log(response)
      })
    }
    lookup("POST", "/cards/create/", newCard, callback)
}
export default createCard