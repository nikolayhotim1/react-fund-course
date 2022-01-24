import React from 'react';

const PostItem = (props) => {
	return (
		<div className='post'>
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