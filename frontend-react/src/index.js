import React from "react";
import ReactDOM from "react-dom";
import CardTest from './components/cards-test/CardTest'
import CardForm from './components/cards-create/CardForm'
import UploadFile from './components/cards-create/UploadFile'

const e = React.createElement
const cardEl = document.getElementById('card-form')
if(cardEl){
    ReactDOM.render(e(CardForm, cardEl.dataset), cardEl)
}

const cardTestEl = document.getElementsByClassName("card-test")[0]
if(cardTestEl) {
    console.log(cardTestEl.dataset)
    ReactDOM.render(e(CardTest, cardTestEl.dataset), cardTestEl)
}

const cardUploadEl = document.getElementById("card-upload")
if(cardUploadEl){
    ReactDOM.render(<UploadFile />, cardUploadEl)
}
