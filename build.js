import { build } from 'vite';

const viteBuild = async (params) => {
  // console.log('');
  // console.log(params);
  await build({
    build: {
      ...params,
    },
  });
};

// entry-server
await viteBuild({
  minify: false,
  ssr: true,
  rollupOptions: {
    input: 'src/entry-server.jsx',
    output: {
      dir: 'netlify/functions',
    },
  },
});
