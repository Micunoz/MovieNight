import React, { useState, useEffect } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { BASE_URL } from "./utils";

async function loadReviews(req) {
    const response = await fetch(`http://localhost:3001/movie/${req.params.movieId}/reviews`);
    const reviewData = await response.json();

    const movieResponse = await fetch(`http://localhost:3001/movie/${req.params.movieId}`);
    const movieData = await movieResponse.json();

    const userResponse = await fetch(`http://localhost:3001/user`);
    const userData = await userResponse.json();

    return { reviews: reviewData, movie: movieData, users: userData };
}

export default function MovieReviews() {
    const { reviews, movie, users } = useLoaderData();

    const initialFormData = {
        userId: '',
        userName: '',
        review: '',
    };

    // no message at start
    const initialResultMessage = {
        msg: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [message, setMessage] = useState(initialResultMessage);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((formData) => {
            return {
                ...formData,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (event) => {
        // post request w/ new project data
        const result = await fetch(`${BASE_URL}/movie/${movie._id}/reviews`, {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        console.log(result.status);

        // catch backend failure
        if (result.status !== 201) {
            setMessage({ msg: "Failed to add review" });
            return;
        }

        // send msg on success
        setMessage({ msg: "Successfully added!\n" });
        setFormData(initialFormData);
    }

    return (
        <>

            <img src={movie.Poster} alt={movie.Title} class="reviewposter" id="poster"></img>
            <h2>Reviews for {movie.Title}</h2>
            {/* make article for each review */}
            <div className='flex-container'>
                {reviews.map((item) => (
                    <article className='review' key={item._id}>
                        <h3>{item.userName}</h3>
                        <h5>"{item.review}"</h5>
                    </article>
                ))}
            </div>
            <br/>
            <br/>
            <br/>
            <br/>

            <div className="reviewbox">
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
                    <br></br>
                    <br/>
                    <label>
                        Review:
                        <br></br>
                        <textarea
                            type="text"
                            name="review"
                            onChange={handleChange}
                            value={formData.review}
                            style={{ width:"500px", height: "150px", }}
                        />
                    </label>
                    <br></br>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}

export { loadReviews };