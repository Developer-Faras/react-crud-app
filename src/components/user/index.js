import React, { useContext } from 'react';
import userContext from './../../actions/Context';

const User = (props) => {
    const context = useContext(userContext);


    const { id, username, email } = props.user;

    return (
        <div className='user-card'>
            <h4 className="name">Username: {username}</h4>
            <h4 className="email">UserEmail: {email}</h4>

            <div className="btn-box">
                <button onClick={() => context.editUser(id)} className="edit">Edit</button>
                <button onClick={() => context.deleteUsers(id)} className="delete">Delete</button>
            </div>

        </div>
    );
}

export default User;
