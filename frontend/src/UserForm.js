import React, { useState } from 'react';
import { BASE_URL } from "./utils";
import { Link } from "react-router-dom";

export default function UserForm() {
    // blank form on load
    const initialFormData = {
        firstName: '',
        lastName: '',
    };

    // no message at start
    const initialResultMessage = {
        msg: '',
        newId: null,
    };

    const [formData, setFormData] = useState(initialFormData);
    const [message, setMessage] = useState(initialResultMessage);

    const handleChange = (event) => {
        const {name, value } = event.target;

        setFormData((formData) => {
            return {
                ...formData,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (event) => {
        // no refresh on submit
        event.preventDefault();
        console.log("formData:", formData);
        // post request w/ new project data
        const result = await fetch(`${BASE_URL}/user`, {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        // catch backend failure
        if (result.status !== 201) {
            setMessage({ msg: "Failed to add new user", newId: null });
            return;
        }

        // send msg on success
        const newId = (await result.json());
        setMessage({ msg: "Successfully added!\n", newId });
        setFormData(initialFormData);
    }

    return (
        <>
            <h2>Add a new user:</h2>
            {message.msg &&
                <>
                    <label>{message.msg}</label>
                    <Link to={`/users/${message.newId}`}>View User</Link>
                </>
            }
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="firstName"
                        onChange={handleChange}
                        value={formData.firstName}
                    />
                </label>
                <label>
                    Last Name:
                    <input 
                        type="text"
                        name="lastName"
                        onChange={handleChange}
                        value={formData.lastName}
                    />
                </label>
                <button type="submit">Add User</button>
            </form>
        </>
    );
}
