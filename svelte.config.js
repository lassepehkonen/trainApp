import adapter from '@sveltejs/adapter-static'; // Riippuen valitsemastasi adapterista

const config = {
	kit: {
	  adapter: adapter({
	  fallback: 'index.html'
	  })
	}
  };
  
  export default config;
