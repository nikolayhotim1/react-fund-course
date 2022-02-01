import React, { useContext } from 'react';
import MyButton from '../components/UI/button/MyButton';
import MyInput from '../components/UI/input/MyInput';
import { authContext } from '../context/authContext';

const Login = () => {
	const { setIsAuth } = useContext(authContext);

	const login = event => {
		event.preventDefault();
		setIsAuth(true);
		localStorage.setItem('auth', 'true');
	};

	return (
		<div>
			<h1>Login page</h1>

			<form onSubmit={login}>
				<MyInput type="text" placeholder='Enter a login' />
				<MyInput type="password" placeholder='Enter a password' />
				<MyButton>Log in</MyButton>
			</form>
		</div>
	);
};

export default Login;