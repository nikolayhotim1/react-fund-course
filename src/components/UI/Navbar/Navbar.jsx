import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../../../context/authContext';
import MyButton from '../button/MyButton';

const Navbar = () => {
	const { setIsAuth } = useContext(authContext);

	const logout = () => {
		setIsAuth(false);
		localStorage.removeItem('auth');
	};

	return (
		<div className='navbar'>
			<div className='navbar-links'>
				<Link to='/about'>About the site</Link>
				<Link to='/posts'>Posts</Link>
			</div>

			<MyButton onClick={logout}>
				Log out
			</MyButton>
		</div>
	);
};

export default Navbar;