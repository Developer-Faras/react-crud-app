import React, { useState, useContext, useEffect } from 'react';
import userContext from '../../actions/Context';

const Form = () => {
    const context = useContext(userContext);
    const updateFlag = context.updateFlag;
    const UserData = context.updateSellectedUsers;

    const [user, setUser] = useState({
        username: "",
        email: ""
    });

    useEffect(() => {
        if (UserData) {
            setUser((prevState) => {
                return {
                    ...prevState,
                    username: UserData.username,
                    email: UserData.email
                }
            });
        }
    }, [UserData]);

    const handleInputChange = (e) => {
        const targetName = e.target.name;
        const tragetValue = e.target.value;

        setUser((prevState) => {
            return { ...prevState, [targetName]: tragetValue }
        })
    }

    const handleCreateSubmit = (e) => {
        e.preventDefault();

        context.createUsers(user);

        if (!username == '' && !email == '') {
            setUser({
                username: "",
                email: ""
            });
        }
    }

    const updateFormSubmit = (e) => {
        e.preventDefault();

        context.updateUser(user);
        if (!username == '' && !email == '') {
            setUser({
                username: "",
                email: ""
            });
        }
    }

    const { username, email } = user;

    return (
        <div className='form-container'>
            <h3 className="form-title">Add User</h3>

            <form action="" onSubmit={updateFlag ? updateFormSubmit : handleCreateSubmit}>

                <div className="input-box">
                    <label htmlFor="name">User Name</label>
                    <input type="text" name="username" onChange={handleInputChange} value={username} id="name" placeholder='Enter Name...' />
                </div>


                <div className="input-box">
                    <label htmlFor="email">User Email</label>
                    <input type="text" name="email" onChange={handleInputChange} value={email} id="email" placeholder='Enter Email...' />
                </div>

                <button type="submit">{updateFlag ? "Update" : "Add User"}</button>
            </form>
        </div>
    );
}

export default Form;
