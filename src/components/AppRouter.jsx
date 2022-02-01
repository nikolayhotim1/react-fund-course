import React, { useContext } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import { authContext } from '../context/authContext';
import { privateRoutes, publicRoutes } from '../routes/routes';
import Loader from './UI/Loader/Loader';

const AppRouter = () => {
	const { isAuth, isLoading } = useContext(authContext);

	if (isLoading) {
		return <Loader />;
	}

	return (
		isAuth
			? <Routes>
				{privateRoutes.map(route =>
					<Route
						key={route.path}
						element={route.element}
						path={route.path}
					/>
				)}

				<Route
					path='/'
					element={<Navigate to='/posts' />}
				/>

				<Route
					path='/login'
					element={<Navigate to='/posts' />}
				/>

				<Route
					path='/*'
					element={<Navigate to='/error' />}
				/>
			</Routes>

			: <Routes>
				{publicRoutes.map(route =>
					<Route
						key={route.path}
						element={route.element}
						path={route.path}
					/>
				)}

				<Route
					path='*'
					element={<Navigate to='/login' />}
				/>
			</Routes>
	);
};

export default AppRouter;