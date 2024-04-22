import React, { useState } from 'react';
import { BASE_URL } from "./utils";
import { Link, useParams } from "react-router-dom";

export default function TodoForm() {
    const { projectId } = useParams();

    // blank form on load
    const initialFormData = {
        name: '',
        description: '',
        completed: false,
        project_id: projectId,
    };

    // no message at start
    const initialResultMessage = {
        msg: '',
        newId: null,
    };

    const [formData, setFormData] = useState(initialFormData);
    const [message, setMessage] = useState(initialResultMessage);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (event) => {
        // no refresh on submit
        event.preventDefault();
        // post request w/ new todo data
        const result = await fetch(`${BASE_URL}/project/${projectId}/todo`, {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        // catch backend failure
        if (result.status !== 201) {
            setMessage({ msg: "Failed to create new todo", newId: null });
            return;
        }

        // send msg on success
        const newId = (await result.json())._id;
        setMessage({ msg: "Successfully created!\n", newId });
        setFormData(initialFormData);
    }

    return (
        <>
            {message.msg &&
                <>
                    <label>{message.msg}</label>
                    <Link to={`/project/${projectId}/todo/${message.newId}`}>View Todo</Link>
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
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Completed:
                    <input
                        type="checkbox"
                        name="completed"
                        checked={formData.completed}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Create Todo</button>
            </form>
        </>
    );
}