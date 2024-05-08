import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { BASE_URL } from "./utils";

async function loadMovieDetail(request) {
    const movieId = request.params.movieId;

    const response = await fetch(`http://localhost:3001/movie/${movieId}/`);
    const movieData = await response.json();

    const usersResponse = await fetch(`http://localhost:3001/user/`);
    const usersData = await usersResponse.json();

    return { movie: movieData, users: usersData };
}

export default function MovieDetail() {
    const initialFormData = {
        userId: '',
    };

    const { movie, users } = useLoaderData();

     // no message at start
     const initialResultMessage = {
        msg: '',
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
        // post request w/ new project data
        const result = await fetch(`${BASE_URL}/movie/${movie._id}/favorites`, {
            method: "PUT",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        // catch backend failure
        if (result.status === 400) {
            setMessage({ msg: "Failed to add favorite"});
            return;
        } else if (result.status === 406) {
            setMessage({ msg: "Movie already in favorites"});
            return;
        }

        // send msg on success
        setMessage({ msg: "Successfully added!\n"});
        setFormData(initialFormData);
    }

    return (
        <div>
            <div className='movie-id'>
                <h2>Movie {movie._id}</h2>
                <img src={movie.Poster} alt={movie.Title}></img>
                <p>Title: {movie.Title}</p>
                <p>Year: {movie.Year}</p>
                <p>Rated: {movie.Rated}</p>
                <p>Runtime: {movie.Runtime}</p>
                <p>Genre: {movie.Genre}</p>
                <p>Director: {movie.Director}</p>
                <p>Actors: {movie.Actors}</p>
                <p>Plot: {movie.Plot}</p>
                <Link to={`/movies/${movie._id}/reviews`} class="moviecard" id="review">Reviews</Link>
            </div>

            <div class="favorite">
                {message.msg &&
                    <>
                        <label>{message.msg}</label>
                    </>
                }

                <form onSubmit={handleSubmit}>
                    <select name="userId" value={formData.userId} onChange={handleChange}>
                        <option>Select A User</option>
                        {users.map((user) => <option value={user._id}>{user.firstName} {user.lastName}</option>)}
                    </select>

                    <button type="submit">Add Favorite</button>
                </form>
            </div>
        </div>
    );
}

export { loadMovieDetail };