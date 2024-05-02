import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

async function loadUserDetail(request) {
    const userId = request.params.userId;

    const response = await fetch(`http://localhost:3001/users/${userId}/`);
    return await response.json();
}

export default function userDetail() {
    const user = useLoaderData();

    return (
        <div className='user-id'>
            <h2>User {user._id}</h2>
            <p>Name: {user.name}</p>
        </div>
    );
}

export { loadUserDetail };