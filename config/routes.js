route = [
    {url: '/', path: 'index/index'},
    {url: '/article/:id.html', path: 'article/article'},
    {url: '/:cate', path: 'cate/cate'},
    {url: '/:cate/list_:page.html', path: 'cate/cate'},
];

module.exports = route;