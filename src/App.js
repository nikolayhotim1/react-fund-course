import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import AppRouter from './components/AppRouter';
import Navbar from './components/UI/Navbar/Navbar';
import { authContext } from './context/authContext';
import './styles/App.css';

const App = () => {
	const [isAuth, setIsAuth] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (localStorage.getItem('auth')) {
			setIsAuth(true);
		}

		setIsLoading(false);
	}, []);

	return (
		<authContext.Provider value={{
			isAuth,
			setIsAuth,
			isLoading
		}}>
			<BrowserRouter>
				<Navbar />
				<AppRouter />
			</BrowserRouter>
		</authContext.Provider>

	);
};

export default App;