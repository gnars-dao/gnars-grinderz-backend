import { Button, Card, Col, Layout, notification, Row, Upload } from 'antd';
import { navigate } from 'gatsby-link';
import React, { useEffect, useState } from 'react';
import { axios } from '../config/axios';
const { Header, Footer, Sider, Content } = Layout;

const backendUrl = 'https://leaderboard.gnars.fun';

const instance = axios.create({ baseURL: backendUrl });

export default function Dashboard() {
	const [photos, setPhotos] = useState([]);

	let props = {
		name: 'file',
		action: `${backendUrl}/v1/upload/image`,
		headers: {
			authorization: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
		},
	};

	async function getPhotos() {
		try {
			const response = await instance.get('/v1/leaderboard/images');
			setPhotos(response.data.data);
			console.log('response =>', response.data);
		} catch (err) {
			console.log('err =>', err.response);
		}
	}
	useEffect(() => {
		getPhotos();
	}, []);

	function logout() {
		// typeof window !== 'undefined' ? localStorage.clear() : null
		if (typeof window !== 'undefined') {
			localStorage.clear();
		}
		navigate('login');
	}

	function reloadImages(info) {
		if (info.file.status == 'done') {
			getPhotos();
			notification.success({
				message: 'Upload Successful!',
				duration: 1000,
			});
		}
	}

	async function deletePhoto(item) {
		try {
			console.log('item =>', item);
			const response = await instance.delete(`v1/upload/image/${item['_id']}`, {
				headers: {
					authorization: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
				},
			});
			console.log('response =>', response.data);
			getPhotos();
		} catch (err) {
			notification.error({
				message: 'could not delete photo!',
				duration: 3000,
			});
			console.log('test =>', err);
		}
	}

	return (
		<div>
			<Header
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<p style={{ color: 'white', fontSize: '2rem', margin: 0 }}>Grinderz Ads Panel</p>
				<Button type="ghost" style={{ color: 'white' }} onClick={logout}>
					Logout
				</Button>
			</Header>
			<Content style={{ padding: 50 }}>
				<Row justify="end">
					<Upload {...props} onChange={(info) => reloadImages(info)} multiple>
						<Button type="primary" style={{ borderRadius: 8 }}>
							Add New Photos
						</Button>
					</Upload>
				</Row>
				<Row justify="center" align="middle" gutter={24}>
					{photos.length == 0 ? (
						<h1>There Are No Ads Yet!</h1>
					) : (
						photos.map((item) => (
							<Col key={item.url} xs={24} sm={24} md={12} lg={12} xl={6} style={{ marginTop: 50 }}>
								<Card
									style={{
										width: '100%',
										borderRadius: 8,
										boxShadow:
											'0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)',
									}}
									actions={[
										<Button
											style={{
												borderRadius: 8,
												backgroundColor: '#df4759',
												color: 'white',
											}}
											onClick={() => deletePhoto(item)}
										>
											Delete
										</Button>,
									]}
								>
									<img
										src={item.url}
										style={{
											width: '100%',
											height: 250,
											border: '2px solid #f3f3f3',
											borderRadius: 8,
										}}
									/>
								</Card>
							</Col>
						))
					)}
				</Row>
			</Content>
		</div>
	);
}
