import React, { useMemo, useState } from 'react';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import './styles/App.css';

const App = () => {
	const [posts, setPosts] = useState([
		{ id: 1, title: '3', body: '2' },
		{ id: 2, title: '1', body: '3' },
		{ id: 3, title: '2', body: '1' }
	]);

	const [filter, setFilter] = useState({ sort: '', query: '' })

	const sortedPosts = useMemo(() => {
		if (filter.sort) {
			return [...posts].sort((a, b) =>
				a[filter.sort].localeCompare(b[filter.sort])
			);
		}

		return posts;
	}, [filter.sort, posts]);

	const sortedAndSearchedPosts = useMemo(() => {
		return sortedPosts.filter(post =>
			post.title.toLowerCase().includes(filter.query.toLowerCase())
		);
	}, [filter.query, sortedPosts]);

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
	};

	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id));
	};

	return (
		<div className='app'>
			<PostForm create={createPost} />
			<hr />

			<PostFilter
				filter={filter}
				setFilter={setFilter}
			/>

			<PostList
				remove={removePost}
				posts={sortedAndSearchedPosts}
				title='Posts about JS'
			/>
		</div>
	);
};

export default App;