import React, {useEffect, useState} from 'react';
import LectureSelect from '../data-select/LectureSelect';
import CardList from '../cards/CardList'
import lookup from '../../functions/backend-lookup/djangoLookup'
import createCard from '../../functions/backend-lookup/createCard'

function CardForm(props) {
    const questionAreaRef = React.createRef()
    const answerAreaRef = React.createRef()
    const lectureRef = React.createRef()
  
    if(props.edit){
      lookup("GET", `/cards/${props.cardId}`, {}, (response, status) => {
        questionAreaRef.current.value = response.question
        answerAreaRef.current.value = response.answer
        lectureRef.current.value = response.lecture
      })
    }
  
    const [newCard, setNewCard] = useState([])
  
    const handleSubmit = (event) => {
      event.preventDefault()
      const question = questionAreaRef.current.value
      const answer = answerAreaRef.current.value
      const lecture = lectureRef.current.value
  
      let tempNewCard = [...newCard]
      let newCardObj = {
        question: question,
        answer: answer,
        lecture: lecture
      }
      createCard(newCardObj, props.edit, props.cardId, (response, status) => {
        if(status===403) {
          window.location.href=`http://${window.location.hostname}:8000/login`
        } else if(status===200) {
          tempNewCard.unshift(response)
          setNewCard(tempNewCard)
          window.location.href=`http://${window.location.hostname}:8000/`
        }
      })
      questionAreaRef.current.value = ''
      answerAreaRef.current.value = ''
    }
    
    return <div className='container'>
      <form onSubmit={handleSubmit}>
        <textarea ref={questionAreaRef} required={true} className='form-control my-2' placeholder='Question'></textarea>
        <textarea ref={answerAreaRef} required={true} className='form-control my-2' placeholder='Answer'></textarea>
        <div className="form-inline container">
          <LectureSelect reference={lectureRef} className={"selectpicker mx-4"}/>
          <button type='submit' className='btn btn-primary my-3 col-1'>Submit</button>
        </div>
      </form>
      <CardList newCards={newCard} username={props.username} card_id={props.cardId}/>
    </div>
}
export default CardForm