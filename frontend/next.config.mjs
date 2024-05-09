/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: '127.0.0.1',
				port: '8000'
			},
			{
				protocol: 'http',
				hostname: 'web',
				port: '8000'
			}
		]
	}
};

export default nextConfig;
