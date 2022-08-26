module.exports = {
	apps: [
		{
			name: 'gnars-grinderz-backend',
			script: 'npm',
			args: 'start',
			exp_backoff_restart_delay: 100,
			out_file: './logs/gnars-grinderz-backend-out.log',
			error_file: './logs/gnars-grinderz-backend-error.log',
			log_file: './logs/gnars-grinderz-backend-combined.log',
			combine_logs: true,
		},
	],
};
