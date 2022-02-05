import React, { useEffect, useRef, useState } from 'react';
import PostService from '../API/PostService';
import PostFilter from '../components/PostFilter';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
import Loader from '../components/UI/Loader/Loader';
import MyModal from '../components/UI/MyModal/MyModal';
import Pagination from '../components/UI/pagination/Pagination';
import MySelect from '../components/UI/select/MySelect';
import { getPagesCount } from '../components/utils/pages';
import { useFetching } from '../hooks/useFetching';
import { useObserver } from '../hooks/useObserver';
import { usePosts } from '../hooks/usePosts';

const Posts = () => {
	const [posts, setPosts] = useState([]);
	const [filter, setFilter] = useState({ sort: '', query: '' });
	const [modal, setModal] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
	const lastElement = useRef();

	const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
		const response = await PostService.getAll(limit, page);
		setPosts([...posts, ...response.data]);
		const totalCount = response.headers['x-total-count'];
		setTotalPages(getPagesCount(totalCount, limit));
	});

	useObserver(lastElement, page < totalPages, isPostLoading, () => {
		setPage(page + 1);
	});

	useEffect(() => {
		fetchPosts(limit, page);
	}, [page, limit]);

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
		setModal(false);
	};

	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id));
	};

	const changePage = (page) => {
		setPage(page);
	};

	return (
		<div className='app'>
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

			<MySelect
				value={limit}
				onChange={value => setLimit(value)}
				defaultValue='Elements count on the page'

				options={[
					{ value: 5, name: '5' },
					{ value: 10, name: '10' },
					{ value: 20, name: '20' },
					{ value: 50, name: '50' },
					{ value: 100, name: 'Show all' }
				]}
			/>

			{postError &&
				<h1>{`An error has occurred. ${postError}`}</h1>
			}

			<PostList
				remove={removePost}
				posts={sortedAndSearchedPosts}
				title='Posts about JS'
			/>

			<div ref={lastElement} />

			{isPostLoading &&
				<div style={{
					display: 'flex',
					justifyContent: 'center',
					marginTop: 50
				}}>
					<Loader />
				</div>
			}

			<Pagination
				page={page}
				changePage={changePage}
				totalPages={totalPages}
			/>
		</div>
	);
};

export default Posts;