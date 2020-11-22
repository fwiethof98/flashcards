import React, {useState} from 'react';
import LectureSelect from '../data-select/LectureSelect';
import lookup from '../../functions/backend-lookup/djangoLookup'
import createCard from '../../functions/backend-lookup/createCard'
import Card from '../cards/Card'
import useWindowDimension from '../../functions/useWindowDimension'

function CardForm(props) {
    const questionAreaRef = React.createRef()
    const answerAreaRef = React.createRef()
    const lectureRef = React.createRef()

    const [question, setQuestion] = useState([])
    const [answer, setAnswer] = useState([])

    if(props.edit){
      lookup("GET", `/cards/${props.cardId}`, {}, (response, status) => {
        questionAreaRef.current.value = response.question
        answerAreaRef.current.value = response.answer
        lectureRef.current.value = response.lecture
      })
    }
  
    const handleSubmit = (event) => {
      event.preventDefault()
      const question = questionAreaRef.current.value
      const answer = answerAreaRef.current.value
      const lecture = lectureRef.current.value
  
      let newCardObj = {
        question: question,
        answer: answer,
        lecture: lecture
      }
      createCard(newCardObj, props.edit, props.cardId, (response, status) => {
        if(status===403) {
          window.location.href=`http://${window.location.hostname}/login`
        }
      })
      questionAreaRef.current.value = ''
      answerAreaRef.current.value = ''
      setQuestion([])
      setAnswer([])
    }

    const handleQuestionChange = () => {
      setQuestion(questionAreaRef.current.value)
    }
    
    const handleAnswerChange = () => { 
      setAnswer(answerAreaRef.current.value)
    }

    const handleKeyDown = (event) => {
      if(event.key === 'Enter') {
        event.target.value += " <br />"
      }
    }
    
    return <div>
      <div style={{margin:"0 auto", textAlign: "center", marginTop:80}}>
        <h1 mar>Create a flashcard!</h1>
      </div>
      <div style={{marginLeft: useWindowDimension().width*0.15, marginRight: useWindowDimension().width*0.15, marginTop:50}}>
        
        <form onSubmit={handleSubmit}>
          <div className="form-inline">
            <textarea style={{width: useWindowDimension().width*0.32, margin: "auto", height:100}} ref={questionAreaRef} required={true} className='form-control my-2' placeholder='Question' onChange={handleQuestionChange} onKeyDown={handleKeyDown}></textarea>
            <textarea style={{width: useWindowDimension().width*0.32, margin: "auto", height:100}} ref={answerAreaRef} required={true} className='form-control my-2' placeholder='Answer' onChange={handleAnswerChange} onKeyDown={handleKeyDown}></textarea>
          </div>
          <div className="form-inline" style={{marginTop:20, marginBottom: 20}}>
            <LectureSelect reference={lectureRef} className={"selectpicker mx-4"}/>
            <button type='submit' style={{width:80}}className='btn btn-primary my-3'>Submit</button>
          </div>
        </form>
        <Card card={{question: question, answer:answer}} create={true} />
      </div>
    </div>
}
export default CardForm