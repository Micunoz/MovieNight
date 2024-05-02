import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';

async function loadMovies() {
    const response = await fetch('http://localhost:3001/movies/');
    return await response.json();
}

export default function MovieList() {
    const movies = useLoaderData();

	return (
		<>
            <h2>List of Movies</h2>
            {/* make article for each movie */}
            <div className='flex-container'>
                {movies.map((item) => (
                    <article className='movie' key={item._id}>
                        <Link to={`/movies/${item._id}`}>
                            <h3>{item.name}</h3>
                        </Link>
                    </article>
                ))}
            </div>
        </>
	);
}

export { loadMovies };