import React from 'react';
import PostItem from './PostItem';
import '../styles/PostList.css';

const PostList = ({ posts, title }) => {
	return (
		<div className='post-list'>
			<h1>{title}</h1>
			{posts.map(post =>
				<PostItem post={post} key={post.id} />
			)}
		</div>
	);
};

export default PostList;