import React, { useState, useEffect } from 'react';
import userContext from '../actions/Context';

// Import Components
import Form from './form';
import Users from './users';

// Import Styles
import './style.css';

// All Other 

const Home = () => {
    const context = userContext;
    const URL = 'https://rest-api-without-db.herokuapp.com/users/';

    // All State
    const [users, setUsers] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState('Loading Users...');
    const [updateSellectedUsers, setUpdateSellectedUsers] = useState(null);
    const [updateFlag, setUpdateFlag] = useState(false);

    // Get Users Methods
    const getUsers = () => {
        fetch(URL)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Data Could Not Fecth');
                }
            })
            .then((data) => setUsers(data.users))
            .catch((error) => setError(error.message))
            .finally(() => {
                setIsLoading(false);
            })
    }

    // Delete Users Methods
    const deleteUsers = (id) => {

        fetch(URL + id, {
            method: "DELETE"
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Could Not Deleted');
                } else {
                    setIsLoading('User Deleted Successfully');
                    getUsers();

                }

            })
            .catch((error) => {
                setError(error.message)
            })
    }

    // Create Users Methods
    const createUsers = (formData) => {
        const { username, email } = formData;

        if (!username || !email) {
            setError('Input Is Empty');
        } else {
            setError(null);

            fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
                .then((res) => {
                    if (res.status === 201) {
                        setIsLoading('User Created Successfully');
                        getUsers();
                    } else {
                        throw new Error('User Not Created');
                    }
                })
                .catch((error) => {
                    setError(error.message);
                });
        }
    }

    // Edit Users Methods / Get User Data
    const editUser = (id) => {
        const filteredUsers = users.filter((user) => user.id === id);

        setUpdateSellectedUsers(filteredUsers[0]);
        setUpdateFlag(true);
    }

    // Update User Method
    const updateUser = (formData) => {
        const { username, email } = formData;
        const { id } = updateSellectedUsers;

        if (!username || !email) {
            setError('Input Is Empty');
        } else {
            setError(null);

            fetch(URL + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('User Not Updated');
                    } else {
                        setIsLoading('User Update Successfully');
                    }
                })
                .catch((error) => {
                    setError(error.message);
                })
                .finally(() => {
                    setUpdateFlag(false);
                    getUsers();
                });
        }
    }

    // useEffect Hooks
    useEffect(() => {
        getUsers();
    }, []);





    return (
        <context.Provider value={{ users, deleteUsers, createUsers, editUser, updateSellectedUsers, updateFlag, updateUser }}>
            <div className='container'>
                <h1 className="main-title">User Menagment App Using React Js</h1>
                {error && <h5 className="message">{error}</h5>}

                {updateFlag ? <Form selectedUsers={updateSellectedUsers} /> : <Form />}

                {isLoading && <h5 className="message">{isLoading}</h5>}
                {users && <Users />}

            </div>
        </context.Provider>

    );
}

export default Home;
