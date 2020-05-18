import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import UpdateMovie from './Movies/UpdateMovie';
import axios from 'axios';

const App = () => {
	const [savedList, setSavedList] = useState([]);
	const [movieList, setMovieList] = useState([]);

	const getMovieList = () => {
		axios
			.get('http://localhost:5000/api/movies')
			.then((res) => setMovieList(res.data))
			.catch((err) => console.log(err.response));
	};

	const addToSavedList = (movie) => {
		setSavedList([...savedList, movie]);
	};

	useEffect(() => {
		getMovieList();
	}, []);

	return (
		<>
			<SavedList list={savedList} />
			<Route
				exact
				path="/"
				render={(props) => <MovieList movies={movieList} {...props} />}
			/>
			<Route
				path="/movies/:id"
				render={(props) => (
					<Movie
						addToSavedList={addToSavedList}
						getMovieList={getMovieList}
						{...props}
					/>
				)}
			/>
			<Route
				path="/update-movie/:id"
				render={(props) => <UpdateMovie {...props} getMovieList={getMovieList} />}
			/>
		</>
	);
};

export default App;
