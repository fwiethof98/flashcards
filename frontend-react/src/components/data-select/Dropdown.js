import React from 'react'

function Dropdown(props){
    const {pRef, onChange, entries} = props
    return (
        <select ref={pRef} style={{marginRight:10, width:120, height:40, padding:5}} onChange={onChange}>
            {entries}
        </select>
    )
}

export default Dropdown