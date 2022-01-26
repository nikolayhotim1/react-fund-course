import React, { useState } from 'react';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import './styles/App.css';

const App = () => {
	const [posts, setPosts] = useState([
		{ id: 1, title: 'JavaScript 1', body: 'Description 1' },
		{ id: 2, title: 'JavaScript 2', body: 'Description 2' },
		{ id: 3, title: 'JavaScript 3', body: 'Description 3' }
	]);

	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	const addNewPost = (e) => {
		e.preventDefault();

		const newPost = {
			id: Date.now(),
			title,
			body
		};

		setPosts([...posts, newPost]);
		setTitle('');
		setBody('');
	};

	return (
		<div className='app'>
			<form>
				<MyInput
					autoFocus
					value={title}
					onChange={e => setTitle(e.target.value)}
					type='text'
					placeholder='Post title'
				/>

				<MyInput
					value={body}
					onChange={e => setBody(e.target.value)}
					type='text'
					placeholder='Post description'
				/>

				<MyButton onClick={addNewPost}>Create post</MyButton>
			</form>

			<PostList posts={posts} title='Posts list about JS' />
		</div>
	);
};

export default App;