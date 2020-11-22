import React from "react";
import ReactDOM from "react-dom";
import CardTest from './components/cards-test/CardTest'
import CardForm from './components/cards-create/CardForm'
import UploadFile from './components/cards-create/UploadFile'
import ManageArea from './components/manage/ManageArea'
import CardList from './components/cards/CardList'


const e = React.createElement
const cardEl = document.getElementById('card-form')
if(cardEl){
    ReactDOM.render(e(CardForm, cardEl.dataset), cardEl)
}

const cardListEl = document.getElementById("card-list")
if(cardListEl){
    ReactDOM.render(e(CardList, cardListEl.dataset), cardListEl)
}

const cardTestEl = document.getElementsByClassName("card-test")[0]
if(cardTestEl) {
    ReactDOM.render(e(CardTest, cardTestEl.dataset), cardTestEl)
}

const cardUploadEl = document.getElementById("card-upload")
if(cardUploadEl){
    ReactDOM.render(<UploadFile />, cardUploadEl)
}

const manageEl = document.getElementById("manage")
if(manageEl){
    ReactDOM.render(e(ManageArea, manageEl.dataset), manageEl)
}
