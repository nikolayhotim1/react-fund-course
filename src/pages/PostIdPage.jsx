import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';

const PostIdPage = () => {
	const params = useParams();
	const [post, setPost] = useState({});
	const [comments, setComments] = useState([]);

	const [fetchPostById, isLoadingPost, errorPost] = useFetching(async (id) => {
		const response = await PostService.getPostById(id);
		setPost(response.data);
	});

	const [fetchComments, isLoadingComments, errorComments] = useFetching(async (id) => {
		const response = await PostService.getCommentsById(id);
		setComments(response.data);
	});

	useEffect(() => {
		fetchPostById(params.id);
		fetchComments(params.id);
	}, []);

	return (
		<div>
			<h1>
				You're open post page with id = {params.id}
			</h1>

			{isLoadingPost
				? <Loader />

				: <div>
					<h3>
						{post.id}. {post.title}
					</h3>

					<div>
						{post.body}
					</div>
				</div>

			}

			<h2 style={{ marginTop: 15 }}>
				Comments:
			</h2>

			{isLoadingComments
				? <Loader />

				: <div>
					{comments.map(comm =>
						<div
							key={comm.id}
							style={{ marginTop: 15 }}
						>
							<h4>{comm.email}</h4>
							<div>{comm.body}</div>
						</div>
					)}
				</div>
			}
		</div>
	);
};

export default PostIdPage;