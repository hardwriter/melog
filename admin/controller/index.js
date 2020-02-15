const Base = require('./base');

class Index extends Base {
    async index() {
        await this.fetch();
    }

    async login() {
        if(this.ctx.method == 'POST'){
            const email = this.ctx.request.body.email;
            const password = this.ctx.request.body.password;
            if(!email) {
                this.error('邮箱不能为空！');
            } else if(!this.ctx.request.body.password) {
                this.error('密码不能为空！');
            }

            const user = await this.$model.user.getOne({email});
            if(!user || (user.password != this.$model.user.passmd5(password, user.salt))) {
                this.error('账号或密码错误！');
            } else {
                this.$service.cookie.set('user', user.id);
                this.success('登录成功！', 'index');
            }
        } else {
            this.assign('title', '登录');
            await this.fetch();
        }
    }

    async logout() {
        this.$service.cookie.delete('user');
        this.success('退出成功！', 'index')
    }

    async register() {
        this.error('注册功能未开放！');
    }
}

module.exports = Index;