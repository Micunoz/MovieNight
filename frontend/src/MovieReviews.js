import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';

async function loadReviews() {
    const response = await fetch('http://localhost:3001/movie/');
    return await response.json();
}

export default function MovieReviews() {
    const movies = useLoaderData();

    console.log(movies);

	return (
		<>
            <h2>List of Movies</h2>
            {/* make article for each movie */}
            <div className='flex-container'>
                {movies.map((item) => (
                    <article className='movie' key={item._id}>
                        <Link to={`/movies/${item._id}`}>
                            <h3>{item.Title}</h3>
                            <h5>({item.Year})</h5>
                        </Link>
                    </article>
                ))}
            </div>
        </>
	);
}

export { loadReviews };