import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList, getMovieList, history }) {
	const [movie, setMovie] = useState(null);
	const params = useParams();

	const fetchMovie = (id) => {
		axios
			.get(`http://localhost:5000/api/movies/${id}`)
			.then((res) => setMovie(res.data))
			.catch((err) => console.log(err.response));
	};

	const saveMovie = () => {
		addToSavedList(movie);
	};
	const updateMovie = () => {
		// updateMovieList(movie);
	};
	const deleteMovie = () => {
		axios
			.delete(`http://localhost:5000/api/movies/${params.id}`)
			.then((res) => getMovieList())
			.catch((err) => console.log(err.response));

		history.push('/');
	};

	useEffect(() => {
		fetchMovie(params.id);
	}, [params.id]);

	if (!movie) {
		return <div>Loading movie information...</div>;
	}

	return (
		<div className="save-wrapper">
			<MovieCard movie={movie} />

			<div className="save-button" onClick={saveMovie}>
				Save
			</div>
			<Link className="save-button update" to={`/update-movie/${params.id}`}>
				Update
			</Link>
			<div className="save-button delete" onClick={deleteMovie}>
				Delete
			</div>
		</div>
	);
}

export default Movie;
