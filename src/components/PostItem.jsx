import React from 'react';
import '../styles/PostItem.css';

const PostItem = (props) => {
	return (
		<div className='post-item'>
			<div className='post-content'>
				<strong>{props.post.id}. {props.post.title}</strong>

				<div>
					{props.post.body}
				</div>
			</div>

			<div className='post-buttons'>
				<button>Delete</button>
			</div>
		</div>
	);
};

export default PostItem;