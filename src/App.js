import React, { useEffect, useState } from 'react';
import PostService from './API/PostService';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import Loader from './components/UI/Loader/Loader';
import MyModal from './components/UI/MyModal/MyModal';
import { usePosts } from './hooks/usePosts';
import './styles/App.css';

const App = () => {
	const [posts, setPosts] = useState([]);
	const [filter, setFilter] = useState({ sort: '', query: '' });
	const [modal, setModal] = useState(false);
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
	const [isPostLoading, setIsPostLoading] = useState(false);

	useEffect(() => {
		fetchPosts();
	}, [])

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
		setModal(false);
	};

	const fetchPosts = async () => {
		setIsPostLoading(true);
		setTimeout(async () => {
			const posts = await PostService.getAll();
			setPosts(posts);
			setIsPostLoading(false);
		}, 1000);
	};

	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id));
	};

	return (
		<div className='app'>
			<button onClick={fetchPosts}>GET POSTS</button>

			<MyButton
				style={{ marginTop: 30 }}
				onClick={() => setModal(true)}>
				Create post
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>

			<hr />

			<PostFilter
				filter={filter}
				setFilter={setFilter}
			/>

			{isPostLoading
				? <div style={{
					display: 'flex',
					justifyContent: 'center',
					marginTop: 50
				}}>
					<Loader />
				</div>
				: <PostList
					remove={removePost}
					posts={sortedAndSearchedPosts}
					title='Posts about JS'
				/>
			}
		</div>
	);
};

export default App;