import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateMovie = (props) => {
	const [movie, setMovie] = useState({});
	const [title, setTitle] = useState('');
	const [director, setDirector] = useState('');
	const [metascore, setMetascore] = useState();
	const [stars, setStars] = useState('');

	const { id } = useParams();
	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/movies/${id}`)
			.then((res) => setMovie(res.data))
			.catch((err) => console.log(err.response));
	}, [id]);

	const onSubmit = (event) => {
		event.preventDefault();
		const data = {
			id: id,
			title: title || movie.title,
			director: director || movie.director,
			metascore: metascore || movie.metascore,
			stars: stars.split(', ').join(', ') || movie.stars,
		};
		axios
			.put(`http://localhost:5000/api/movies/${id}`, data)
			.then((res) => props.getMovieList())
			.catch((err) => console.log(err));

		props.history.push('/');
	};

	return (
		<form onSubmit={onSubmit}>
			<input
				placeholder={movie.title}
				onChange={(event) => setTitle(event.target.value)}
			/>
			<input
				placeholder={movie.director}
				onChange={(event) => setDirector(event.target.value)}
			/>
			<input
				placeholder={movie.metascore}
				onChange={(event) => setMetascore(event.target.value)}
			/>
			<input placeholder="stars" onChange={(event) => setStars(event.target.value)} />
			<button>Update!</button>
		</form>
	);
};
export default UpdateMovie;
