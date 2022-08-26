import { navigate } from '@reach/router';
import 'antd/dist/antd.css';
import React, { useEffect } from 'react';
import Dashboard from './dashboard';

export default function App({ children }) {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (!localStorage.getItem('token')) navigate('/login/');
		}
	}, []);
	return <Dashboard />;
}
