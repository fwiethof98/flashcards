import React, {useState, useEffect} from 'react';
import LectureSelect from '../data-select/LectureSelect'
import getCookie from '../../functions/backend-lookup/getCookie'

function UploadFile(props) {
    const uploadRef = React.createRef()
    const lectureRef = React.createRef()
    var formData = new FormData()
    const handleUpload = (event) => {
      formData.append("file", event.target.files[0])
    }
  
    const handleFileSubmit = (event) => {
      event.preventDefault()
      formData.append("lecture", lectureRef.current.value)
      const xhr = new XMLHttpRequest()
      const method = "POST"
      const url = `http://${window.location.hostname}:8000/api/cards/upload/`
      xhr.open(method, url)
      // xhr.setRequestHeader("Content-Type", "application/json")
      // xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
      xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'))
      xhr.onload = () => {
        if(xhr.status === 200){
          window.location.href = `http://${window.location.hostname}:8000/`
        } else if(xhr.status === 403){
          window.location.href = `http://${window.location.hostname}:8000/login`
        }
      }
      xhr.send(formData)
    }
  
    return <div className="container my-4">
      <h2>Upload Anki file here</h2>
      <form onSubmit={handleFileSubmit} encType="multipart/form-data">
        <input ref={uploadRef} type="file" name="file" onChange={handleUpload}></input>
        <button type="submit" className="btn btn-primary">Submit</button>
        <LectureSelect reference={lectureRef}/>
      </form>
    </div>
}
export default UploadFile