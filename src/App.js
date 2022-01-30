import React, { useEffect, useState } from 'react';
import PostService from './API/PostService';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import Loader from './components/UI/Loader/Loader';
import MyModal from './components/UI/MyModal/MyModal';
import { getPagesArray, getPagesCount } from './components/utils/pages';
import { useFetching } from './hooks/useFetching';
import { usePosts } from './hooks/usePosts';
import './styles/App.css';

const App = () => {
	const [posts, setPosts] = useState([]);
	const [filter, setFilter] = useState({ sort: '', query: '' });
	const [modal, setModal] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
	const pagesArray = getPagesArray(totalPages);

	const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
		const response = await PostService.getAll(limit, page);
		setPosts(response.data);
		const totalCount = response.headers['x-total-count'];
		setTotalPages(getPagesCount(totalCount, limit));
	});

	useEffect(() => {
		fetchPosts(limit, page);
	}, []);

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
		setModal(false);
	};

	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id));
	};

	const changePage = (page) => {
		setPage(page);
		fetchPosts(limit, page);
	};

	return (
		<div className='app'>
			<button onClick={fetchPosts}>GET POSTS</button>

			<MyButton
				style={{ marginTop: 30, marginLeft: 30 }}
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

			{postError &&
				<h1>{`An error has occurred. ${postError}`}</h1>
			}

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

			<div className='page-wrapper'>
				{pagesArray.map(p =>
					<span
						onClick={() => changePage(p)}
						key={p}
						className={page === p
							? 'page page-current'
							: 'page'
						}
					>{p}</span>
				)}
			</div>
		</div>
	);
};

export default App;