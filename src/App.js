import React, { useState } from 'react';
import PostList from './components/PostList';
import './styles/App.css';

const App = () => {
	const [posts1, setPosts1] = useState([
		{ id: 1, title: 'JavaScript 1', body: 'Description 1' },
		{ id: 2, title: 'JavaScript 2', body: 'Description 2' },
		{ id: 3, title: 'JavaScript 3', body: 'Description 3' }
	]);

	const [posts2, setPosts2] = useState([
		{ id: 1, title: 'TypeScript 1', body: 'Description 1' },
		{ id: 2, title: 'TypeScript 2', body: 'Description 2' },
		{ id: 3, title: 'TypeScript 3', body: 'Description 3' }
	]);

	return (
		<div className='app'>
			<PostList posts={posts1} title='Posts list 1' />
			<PostList posts={posts2} title='Posts list 2' />
		</div>
	);
};

export default App;