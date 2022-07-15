import React, { useContext } from 'react';
import userContext from '../../actions/Context';
import User from '../user';

const Users = () => {
    const context = useContext(userContext);

    return (
        <div className='users-container'>
            <h2 className="users-title">All User</h2>

            <div className="users">
                {context.users.map((user, index) => <User key={index} user={user} />)}
            </div>

        </div>
    );
}

export default Users;
