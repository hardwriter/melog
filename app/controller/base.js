const {Controller, utils} = require('iijs');

class Base extends Controller {
    async _init() {
        const nav = await this.ctx.$ii.app.model.cate.getNav();
        const model_article = this.ctx.$ii.app.model.article;
        const latest = await model_article.getNew();
        const hot = await model_article.getHot();

        this.view.art.renderFile.defaults.imports.dateFormat = function(value, format) {return utils.date.format(format, value);}
        this.assign('nav', nav);
        this.assign('latest', latest);
        this.assign('hot', hot);
    }
}

module.exports = Base;