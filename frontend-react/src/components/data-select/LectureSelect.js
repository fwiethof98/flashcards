import React, {useEffect, useState} from 'react';

function LectureSelect(props) {
    const {reference, handleChange, className, lecture} = props
    const lectures = [
      {name: "LinAl", long: "Lineare Algebra"},
      {name: "ERA", long: "Analysis 1"},
      {name: "ERA", long: "Digitaltechnik"},
      {name: "ERA", long: "Computertechnik"},
      {name: "ERA", long: "Schaltungstheorie"},
    ]
    const options = lectures.map((item, index) => {
      return <option key={index} value={item.long}>{item.long}</option>
    })
    return <div>
      <select ref={reference} defaultValue={lecture} onChange={handleChange} className={className}>
        {options}
      </select>
    </div>
}
export default LectureSelect