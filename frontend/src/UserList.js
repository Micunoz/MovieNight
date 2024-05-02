import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';

async function loadUsers() {
    const response = await fetch('http://localhost:3001/users/');
    return await response.json();
}

export default function UserList() {
    const users = useLoaderData();

	return (
		<>
            <h2>List of Users</h2>
            {/* make article for each user */}
            <div className='flex-container'>
                {users.map((item) => (
                    <article className='user' key={item._id}>
                        <Link to={`/users/${item._id}`}>
                            <h3>{item.name}</h3>
                        </Link>
                    </article>
                ))}
            </div>
        </>
	);
}

export { loadUsers };