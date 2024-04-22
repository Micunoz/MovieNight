import React, { useState } from 'react';
import { BASE_URL } from "./utils";
import { Link } from "react-router-dom";

export default function ProjectForm() {
    // blank form on load
    const initialFormData = {
        name: '',
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
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        // no refresh on submit
        event.preventDefault();
        // post request w/ new project data
        const result = await fetch(`${BASE_URL}/project`, {
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
                    <Link to={`/project/${message.newId}`}>View Project</Link>
                </>
            }
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Create Project</button>
            </form>
        </>
    );
}
