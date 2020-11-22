import React, {useState} from 'react'
import djangoLookup from '../../functions/backend-lookup/djangoLookup'
import Dropdown from '../data-select/Dropdown'

function ManageRoles(props){
    const [roles, setRoles] = useState(false)
    const [users, setUsers] = useState(false)
    const [delUsers, setDelUsers] = useState(false)
    const roleRef = React.createRef()
    const userRef = React.createRef()
    const delUserRef = React.createRef()

    const inputRef = React.createRef()

    const userUpdate = (role) => {
        let userCallback = (response, status) => {
            let users = response.map(item => {
            return <option key={item.username} value={item.username}>{item.username}</option>
            })
            setUsers(users)
        }
        djangoLookup('GET', `/auth/users/?role=${role}&action=exclude`, '', userCallback)

        userCallback = (response, status) => {
            let users = response.map(item => {
            return <option key={item.username} value={item.username}>{item.username}</option>
            })
            setDelUsers(users)
        }
        djangoLookup('GET', `/auth/users/?role=${role}&action=include`, '', userCallback)
    }

    if(!roles){
        const roleCallback = (response, status) => {
            let roles = response.map(item => {
                return <option key={item.name} value={item.name}>{item.name}</option>
            })
            setRoles(roles)
        }
        djangoLookup('GET', '/auth/roles', '', roleCallback)
    }
    if(!users){
        userUpdate("admin")
    }

    const handleCreateRoleButton = (event) => {
        event.preventDefault()
        const callback = (response, status) => {
            setRoles(false)
        }
        djangoLookup('POST', '/auth/roles/create', inputRef.current.value, callback)
    } 

    const handleAssignRoleButton = (event) => {
        event.preventDefault()
        const callback = (response, status) => {
            userUpdate(roleRef.current.value)
        }
        djangoLookup('POST', '/auth/roles/assign', {username: userRef.current.value, role: roleRef.current.value, action: "assign"}, callback)
    }

    const handleDeleteRoleButton = (event) => {
        event.preventDefault()
        const callback = (response, status) => {
            userUpdate(roleRef.current.value)
        }
        djangoLookup('POST', '/auth/roles/assign', {username: delUserRef.current.value, role: roleRef.current.value, action: "delete"}, callback)
    }

    const handleRoleSelectChange = (event) => {
        userUpdate(roleRef.current.value)
    }

    return (
        <div>
            <h1 style={{marginTop:20}}>Manage roles</h1>
            <div className="row" style={{marginTop:30}}>
                <div className="col-2">
                    <Dropdown pRef={roleRef} onChange={handleRoleSelectChange} entries={roles} />
                </div>
                <div className="col-2">
                    <Dropdown pRef={userRef} entries={users} />
                </div>
                <button className="btn btn-primary" type="submit" onClick={handleAssignRoleButton} style={{width:120}}>Assign Role</button>
            </div>
            <div className="row" style={{marginTop:20}}>
                <div className="col-2"></div>
                <div className="col-2">
                    <Dropdown pRef={delUserRef} entries={delUsers} />
                </div>
                <button className="btn btn-danger" type="submit" onClick={handleDeleteRoleButton} style={{width:120}}>Remove Role</button>
            </div>

            <div className="row" style={{marginTop:50}}>
                <div className="col-3">
                    <input ref={inputRef} type="text" placeholder=" Role name" style={{marginRight:10, height:40, width:200}} />
                </div>
                <div className="col-2">
                <button className="btn btn-success" type="submit" onClick={handleCreateRoleButton} style={{width:120}}>Create Role</button>
                </div>
            </div>
        </div>
    )
} 

export default ManageRoles