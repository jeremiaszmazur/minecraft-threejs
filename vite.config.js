/**
* @type {import('vite').UserConfig}
*/
export default {
  base: '/minecraft-threejs-clone/',
  optimizeDeps: {
    include: ['eslint'],
  },
  build: {
    sourcemap: true,
    target: 'esnext',
  }
}