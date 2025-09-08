export default {
  devmode: process.env.NODE_ENV === 'development',
  paths: {
    root: './',
    source: './src',
    output: './dist',
  },
  port: 3000,
};
