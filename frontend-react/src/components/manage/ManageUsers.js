import React, {useState} from 'react'
import djangoLookup from '../../functions/backend-lookup/djangoLookup'
import Dropdown from '../data-select/Dropdown'

function ManageUsers(props){
    const [users, setUsers] = useState(false)
    const [display, setDisplay] = useState(false)
    const userRef = React.createRef()
    if(!users){
        const callback = (response, status) => {
            const userList = response.map(item => {
                return <option key={item.username} value={item.username}>{item.username}</option>
            })
            setUsers(userList)
        }
        djangoLookup('GET', '/auth/users/?action=all', '', callback)
    }

    const handleUserDeleteButton = (event) => {
        event.preventDefault()
        setDisplay(true)
    }

    const handleConfirmDeleteButton = (event) => {
        event.preventDefault()
        const callback = (response, status) => {
            console.log(response)
        }
        djangoLookup('DELETE', '/auth/users/delete', {username: userRef.current.value}, callback)
        setDisplay(false)
    }

    return(
        <div>
            <h1 style={{marginTop:50}}>Manage users</h1>
            <div className="row" style={{marginTop:30}}>
                <div className="col-2">
                    <Dropdown pRef={userRef} entries={users}/>
                </div>
                <div className="col-2">
                    <button className="btn btn-danger" type="submit" onClick={handleUserDeleteButton} style={{marginRight:10, width:120}}>Delete user</button>
                    {display && <button className="btn btn-secondary" type="submit" onClick={handleConfirmDeleteButton} style={{marginTop:5, width:120}}>Sure?</button>}
                </div>
            </div>
        </div>
    )
}

export default ManageUsers