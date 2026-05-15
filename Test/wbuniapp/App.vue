<script>
export default {
    methods: {
        getLang() {//获取语言包
            this.$apis.SYS_GetAppLanguageTranslate().then((res) => {
                for (const key in res) {
                    this.$i18n.mergeLocaleMessage(key, res[key])
                }
                this.$i18n.locale = uni.getStorageSync('lang') || 'zh'
            }).catch((err) => {
                console.error(err);
            })

        }
    },
    onLaunch: function () {
        // #ifdef APP-PLUS
        plus.screen.lockOrientation('portrait-primary'); //锁定竖屏
        // #endif
        this.getLang()
    },
    onShow: function () {
    },
    onHide: function () {
    },

}
</script>
<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import '@/uni_modules/uview-ui/index.scss';
</style>
<style>
/*每个页面公共css */
@import './static/fonts/iconfont.css';
uni-page-body,
html,
body {
    height: 100%;
}
</style>
