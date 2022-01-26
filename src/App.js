import React, { useState } from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import './styles/App.css';

const App = () => {
	const [posts, setPosts] = useState([
		{ id: 1, title: 'JavaScript 1', body: 'Description 1' },
		{ id: 2, title: 'JavaScript 2', body: 'Description 2' },
		{ id: 3, title: 'JavaScript 3', body: 'Description 3' }
	]);

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
	};

	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id));
	};

	return (
		<div className='app'>
			<PostForm create={createPost} />

			{posts.length
				? <PostList
					remove={removePost}
					posts={posts}
					title='Posts list about JS'
				/>

				: <h1>Posts didn't find</h1>
			}
		</div>
	);
};

export default App;