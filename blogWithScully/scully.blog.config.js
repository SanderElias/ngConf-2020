exports.config = {
  projectRoot: "./projects/blog/src",
  projectName: "blog",
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./blog-content"
      }
    },
    '/authors/:id': {
      type: 'json',
      'id': {
        url: 'http://localhost:8200/users',
        property:'id'
      }
    }
  }
};