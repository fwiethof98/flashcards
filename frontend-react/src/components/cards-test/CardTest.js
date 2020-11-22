import React, {useState} from 'react';
import lookup from '../../functions/backend-lookup/djangoLookup'
import LectureSelect from '../data-select/LectureSelect'
import Card from '../cards/Card'

function CardTest(props) {
    const {lecture, cardId} = props
    const [cardEl, setCardEl] = useState(false)
    const [status, setStatus] = useState(200)
    const lectureRef = React.createRef
  
    let url = ""
    if(cardId === ""){
      url = "/cards/1/?random=true&lecture=" + lecture
    } else {
      url = "/cards/" + cardId
    }
  
    if(!cardEl){
      lookup("GET", url, {}, (response, status) => {
          setCardEl(response)
          setStatus(status)
      })
    }
  
    const handleNextClick = () => {
      window.location.href = `http://${window.location.hostname}:8000/test/?lecture=` + lecture
    }
    const handleChange = (event) => {
      window.location.href = `http://${window.location.hostname}:8000/test/?lecture=` + event.target.value
    }
  
    return <div className="container">
        {status === 200 ? <div><Card card={cardEl}/> 
        <button className="mx-1 btn btn-secondary mb-1" onClick={handleNextClick}>Next</button></div>
        : <h2 className="my-4">No cards available for this topic.</h2>}
        
        <LectureSelect reference={lectureRef} handleChange={handleChange} lecture={lecture}/>
      </div>
  }
  export default CardTest