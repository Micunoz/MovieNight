import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

async function loadUserDetail(request) {
    const userId = request.params.userId;

    const userResponse = await fetch(`http://localhost:3001/user/${userId}/`);
    const userData = await userResponse.json();

    const favorites = await Promise.all(userData.favorites.map(async (id) => {
        const movieResponse = await fetch(`http://localhost:3001/movie/${id}/`);
        return movieResponse.json();
    }));

    return { user: userData, favorites };
}

export default function UserDetail() {
    const { user, favorites } = useLoaderData();

    console.log("user:", user);
    console.log("favorites:", favorites);

    return (
        <div>
            <div className='user-id'>
                <h2>User {user._id}</h2>
                <p>Name: {user.firstName} {user.lastName}</p>
            </div>
            <h2>Favorite Movies</h2>
            {/* make article for each movie */}
            <div className='flex-container'>
                {favorites.map((item) => (
                    <article className='movie' key={item._id}>
                        <Link to={`/movies/${item._id}`}>
                            <h3>{item.Title}</h3>
                            <h5>({item.Year})</h5>
                        </Link>
                    </article>
                ))}
            </div>
            <h2>Reviews</h2>
            {/* make article for each review */}
            <div className='flex-container'>
                {user.reviews.map((item) => (
                    <article className='movie' key={item._id}>
                        <h3>{item.movieTitle} ({item.movieYear})</h3>
                        <h4>{item.userName}</h4>
                        <h5>({item.review})</h5>
                    </article>
                ))}
            </div>
        </div>
    );
}

export { loadUserDetail };