import React from 'react';
import PostItem from './PostItem';
import '../styles/PostList.css';
import { TransitionGroup } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';

const PostList = ({ posts, title, remove }) => {
	if (!posts.length) {
		return (
			<h1>Posts didn't find</h1>
		);
	}

	return (
		<div className='post-list'>
			<h1>{title}</h1>

			<TransitionGroup>
				{posts.map((post, index) =>
					<CSSTransition
						key={post.id}
						timeout={500}
						classNames='post'
					>
						<PostItem
							number={index + 1}
							post={post}
							remove={remove}
						/>
					</CSSTransition>
				)}
			</TransitionGroup>
		</div>
	);
};

export default PostList;