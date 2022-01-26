import React from 'react';
import '../styles/PostItem.css';
import MyButton from './UI/button/MyButton';

const PostItem = (props) => {
	return (
		<div className='post-item'>
			<div className='post-content'>
				<strong>{props.number}. {props.post.title}</strong>

				<div>
					{props.post.body}
				</div>
			</div>

			<div className='post-buttons'>
				<MyButton onClick={() => props.remove(props.post)}>
					Delete
				</MyButton>
			</div>
		</div>
	);
};

export default PostItem;