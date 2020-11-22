import React from 'react'
import ManageRoles from './ManageRoles'
import ManageUsers from './ManageUsers'

function ManageArea(props){
    return (
        <div className="container">
            <ManageRoles />
            <ManageUsers />
        </div>
    )
}

export default ManageArea