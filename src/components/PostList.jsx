import React from 'react';
import PostItem from './PostItem';
import '../styles/PostList.css';

const PostList = ({ posts, title, remove }) => {
	if (!posts.length) {
		return (
			<h1>Posts didn't find</h1>
		);
	}

	return (
		<div className='post-list'>
			<h1>{title}</h1>

			{posts.map((post, index) =>
				<PostItem
					number={index + 1}
					post={post}
					key={post.id}
					remove={remove}
				/>
			)}
		</div>
	);
};

export default PostList;