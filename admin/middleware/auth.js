const {Middleware} = require('jj.js');

class Auth extends Middleware
{
    async index() {
        await this.alias();
    }

    // 后台地址验证
    async alias() {
        const admin_auth = this.$service.cookie.get('admin_auth');
        const admin_alias = await this.$model.site.getConfig('admin_alias');

        if(admin_auth == 1 && this.ctx.params.app == 'admin') {
            await this.login();
        } else if(this.ctx.params.app === admin_alias) {
            admin_auth != 1 && this.$service.cookie.set('admin_auth', 1);
            this.$redirect('index/index');
        } else if(this.ctx.params.app != 'admin') {
            await this.$next();
        }
    }

    // 后台登录验证
    async login() {
        if(this.$service.cookie.get('user')) {
            if(this.ctx.params.controller == 'index' && this.ctx.params.action == 'login') {
                this.$redirect('index/index');
            } else {
                // 重置params
                this.ctx.params = {};
                await this.$next();
            }
        } else {
            if(this.ctx.params.controller == 'index' && this.ctx.params.action == 'login') {
                // 重置params
                this.ctx.params = {};
                await this.$next();
            } else {
                this.$redirect('index/login');
            }
        }
    }
}

module.exports = Auth;