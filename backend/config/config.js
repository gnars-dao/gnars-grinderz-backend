require('dotenv').config();
const path = require('path');
const env = require('../utils/environment');

const environment = env.str('NODE_ENV', 'development');
const debugStatus = env.bool('DEBUG', false);
const debugPrefix = `crypto-service-${environment} `;

if (debugPrefix) {
	process.env.DEBUG = debugPrefix;
}

module.exports = {
	environment,
	appName: 'crypto-service',
	debug: {
		enabled: debugStatus,
		prefix: debugPrefix,
	},
	logger: {
		level: env.str('LOG_LEVEL', 'silly'),
	},
	rootDir: path.resolve(''),
	mongodb: {
		host: env.str('MONGO_HOST', '127.0.0.1'),
		port: env.num('MONGO_PORT', 27017),
		db: env.str('MONGO_DB', 'crypto'),
		username: env.str('MONGO_USERNAME'),
		password: env.str('MONGO_PASSWORD'),
	},
	server: {
		restApi: {
			host: env.str('REST_HOST', '0.0.0.0'),
			port: env.num('REST_PORT', 3000),
			logger: env.bool('REST_LOGGER', true),
		},
		cors: {
			methods: env.str('CORS_METHODS', '*'),
			headers: env.array('CORS_HEADERS', '*'),
			origin: env.str('CORS_ORIGINS', '*'),
			credentials: env.bool('CORS_CREDENTIALS', true),
			preflightContinue: env.bool('CORS_preflightContinue', false),
		},
	},
	jwt: {
		secretKey: env.str('JWT_SECRET'),
		accessTokenExpiry: env.num('JWT_ACCESS_EXPIRY', 60 * 60 * 1),
	},
	settings: {
		cdn_path: env.str('CDN_PATH', 'http://localhost:3000'),
		upload: {
			uploadDir: env.str('UPLOAD_DIR', '/public/'),
			limits: {
				fieldNameSize: 100, // Max field name size in bytes
				// fieldSize: 2000, // Max field value size in bytes
				fields: 1, // Max number of non-file fields
				fileSize: env.num('USERS_FILE_SIZE_LIMIT', 2 * 1024 * 1024), // For multipart forms, the max file size
				files: 1, // Max number of file fields
				headerPairs: 2000, // Max number of header key=>value pairs
			},
		},
		adminPassword: env.str('ADMIN_PASSWORD'),
	},
};
