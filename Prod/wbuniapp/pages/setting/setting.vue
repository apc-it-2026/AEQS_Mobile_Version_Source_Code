<template>
    <div class='setting'>
        <u-navbar border :title="$t('setting.设置')" :leftText="$t('common.返回')" placeholder autoBack> </u-navbar>
        <u-cell-group>
            <u-cell clickable icon="chat" @click="show=true" :title="$t('setting.语言切换')"></u-cell>
            <u-cell clickable icon="grid" @click="toPage" :title="$t('setting.打印设置')"></u-cell>
            <u-cell clickable icon="reload" @click="updateVersion" :title="$t('setting.检查更新')" :value="`${$t('setting.当前版本')}:${currentVersion}`"></u-cell>
        </u-cell-group>
        <u-button type="primary" class="btn" @click="loginOut" :text="$t('setting.退出登录')"></u-button>
        <languageSelect v-model="show"></languageSelect>
    </div>
</template>
<script>
import { updateApp } from '@/util'
export default {
    name: 'setting',
    data() {
        return {
            show: false,
            currentVersion: this.$t('setting.获取中'),
        }
    },
    methods: {
        doing() {
            uni.$u.toast('开发中...')
        },
        getVersion() {
            let _this = this
            plus.runtime.getProperty(plus.runtime.appid, function (widgetInfo) {
                // _this.currentVersion = uni.getStorageSync('currentVersion') || widgetInfo.versionCode; //获取当前版本号
                _this.currentVersion = widgetInfo.versionCode; //获取当前版本号
            })
        },
        // 检查是否更新版本
        updateVersion() {
            // #ifdef  H5
            uni.$u.toast( this.$t('setting.网页端无法更新'))
            // #endif
            // #ifdef  APP-PLUS
            uni.showLoading({
                title: this.$t('setting.正在检查更新'),
            })
            // 热更新不会更新app的版本号
            let _this = this
            plus.runtime.getProperty(plus.runtime.appid, function (widgetInfo) {
                // let currentVersion = uni.getStorageSync('currentVersion') || widgetInfo.versionCode; //获取当前版本号
                let currentVersion = widgetInfo.versionCode; //获取当前版本号
                console.log(uni.getStorageSync('org'), '公司信息');
                let data = {
                    "CompanyCode": uni.getStorageSync('org').org,
                    "CompanyName": uni.getStorageSync('org').orgname
                }
                _this.$apis.sys_GetAppVersionInfo(data).then(res => {
                    let newVersion = res.version;
                    let downloadUrl = res.downloadUrl;
                    console.log(currentVersion, newVersion);
                    if (currentVersion < newVersion) {
                        updateApp(downloadUrl, res.updateType, newVersion, currentVersion)
                    } else {
                        uni.$u.toast(`${this.$t('setting.无需更新')}\n ${this.$t('setting.最新版本')}:${newVersion} \n${this.$t('setting.当前版本')}:${currentVersion}`)
                    }
                }).catch(err => {
                    console.log(err);
                }).finally(() => {
                    uni.hideLoading()
                })
            })
            // #endif

        },
        toPage() {
            uni.navigateTo({ url: `/pages/print/print` })

        },
        downDemo() {
            uni.$u.toast('仅开发测试使用...')
            plus.runtime.openURL('https://qr.dingtalk.com/page/yunpan?route=previewDentry&spaceId=6677203456&fileId=57051681852&type=file', (error) => {
                console.log(error);
                uni.$u.toast(JSON.stringify(error))
            })
        },
        loginOut() {
            uni.clearStorageSync();
            uni.reLaunch({ url: '../login/login' })
        }
    },
    onShow() {
        // #ifdef  APP-PLUS
        this.getVersion()
        // #endif

    },
}
</script>
<style lang='scss' scoped>
.setting {
    padding: 15rpx;
    .u-cell-group {
        background: #fff;
    }
    .btn {
        margin-top: 50rpx;
    }
}
</style>