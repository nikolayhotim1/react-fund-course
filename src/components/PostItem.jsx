import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PostItem.css';
import MyButton from './UI/button/MyButton';

const PostItem = (props) => {
	const navigate = useNavigate();

	return (
		<div className='post-item'>
			<div className='post-content'>
				<strong>{props.number}. {props.post.title}</strong>

				<div>
					{props.post.body}
				</div>
			</div>

			<div className='post-buttons'>
				<MyButton onClick={() => navigate(`/posts/${props.post.id}`)}>
					Open
				</MyButton>

				<MyButton onClick={() => props.remove(props.post)}>
					Delete
				</MyButton>
			</div>
		</div>
	);
};

export default PostItem;