import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
		paths : {
			base: '/RedSeam-Clothing',
		},
        adapter: adapter({
            fallback: '404.html', 
        }),
    }
};

export default config;