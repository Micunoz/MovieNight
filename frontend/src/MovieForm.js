import React, { useState } from 'react';
import { BASE_URL } from "./utils";
import { Link } from "react-router-dom";

export default function MovieForm() {
    // blank form on load
    const initialFormData = {
        Title: '',
        Year: null,
    };

    // no message at start
    const initialResultMessage = {
        msg: '',
        newId: null,
    };

    const [formData, setFormData] = useState(initialFormData);
    const [message, setMessage] = useState(initialResultMessage);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        // no refresh on submit
        event.preventDefault();
        // post request w/ new project data
        const result = await fetch(`${BASE_URL}/movie`, {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        // catch backend failure
        if (result.status !== 201) {
            setMessage({ msg: "Failed to create new project", newId: null });
            return;
        }

        // send msg on success
        const newId = (await result.json());
        setMessage({ msg: "Successfully created!\n", newId });
        setFormData(initialFormData);
    }

    return (
        <>
            {message.msg &&
                <>
                    <label>{message.msg}</label>
                    <Link to={`/movie/${message.newId}`}>View Movie</Link>
                </>
            }
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        name="Title"
                        value={formData.Title}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Year:
                    <input 
                        type="text"
                        name="Year"
                        value={formData.Year}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Add Movie</button>
            </form>
        </>
    );
}
