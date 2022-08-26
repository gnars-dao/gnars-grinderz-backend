import { Button, Card, Input } from 'antd';
import 'antd/dist/antd.css';
import { navigate } from 'gatsby-link';
import React, { useState } from 'react';
import { axios } from '../config/axios';

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	async function loginReq() {
		try {
			const response = await axios.post('auth/login', {
				username,
				password,
			});
			localStorage.setItem('token', response.data.token);
			navigate('/');
			console.log('response =>', response.data);
		} catch (err) {
			console.log('err =>', err.response);
		}
	}

	return (
		<div style={{ height: '100vh', backgroundColor: '#f3f3f3' }}>
			<div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
				<Card
					title="Login"
					style={{
						height: '40%',
						width: '40%',
						borderRadius: '8px',
					}}
					bodyStyle={{
						display: 'flex',
						flex: 1,
						justifyContent: 'space-between',
						flexDirection: 'column',
						height: '100%',
					}}
				>
					<Input
						placeholder="username"
						style={{ borderRadius: '8px', height: '40px' }}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<Input
						placeholder="password"
						style={{ borderRadius: '8px', height: '40px' }}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button
						type="primary"
						style={{ width: '100px', alignSelf: 'flex-end', borderRadius: '8px' }}
						onClick={loginReq}
					>
						Login
					</Button>
				</Card>
			</div>
		</div>
	);
}
