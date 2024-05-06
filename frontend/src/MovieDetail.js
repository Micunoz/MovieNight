import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

async function loadMovieDetail(request) {
    const movieId = request.params.movieId;

    const response = await fetch(`http://localhost:3001/movie/${movieId}/`);
    return await response.json();
}

export default function MovieDetail() {
    const movie = useLoaderData();

    return (
        <div className='movie-id'>
            <h2>Movie {movie._id}</h2>
            <p>Title: {movie.Title}</p>
            <p>Year: {movie.Year}</p>
        </div>
    );
}

export { loadMovieDetail };