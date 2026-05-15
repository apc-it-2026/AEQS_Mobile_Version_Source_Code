<template>
    <div class='languageSelect'>
        <u-action-sheet @select="select" :actions="list" :show="value" closeOnClickOverlay @close="close"></u-action-sheet>
    </div>
</template>
<script>
export default {
    name: 'languageSelect',
    props: {
        value: {//对应show
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            list: [],
        }
    },
    methods: {
        getLangList() {//获取语言列表
            this.$apis.SYS_GetAppLanguageType().then((res) => {
                this.list = res
            }).catch((err) => {
                console.error(err);
            })
        },
        close() {//关闭弹窗
            this.$emit("input", false);
        },
        select(item) {
            let _this = this
            uni.showModal({
                confirmText:this.$t('common.确定'),
                cancelText:this.$t('common.取消'),
                title: this.$t('common.提示'),
                content: this.$t('common.切换语言将自动重启应用'),
                success: function (res) {
                    if (res.confirm) {
                        _this.$i18n.locale = item.prop
                        uni.setStorageSync('lang', item.prop)
                        _this.$emit('confirm', item)
                        // #ifdef APP-PLUS  
                        plus.runtime.restart();
                        // #endif
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });


        }
    },
    mounted() {
        this.getLangList()
    }
}
</script>
<style lang='scss' scoped>
.languageSelect {
}
</style>