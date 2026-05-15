<template>
    <view class="index">
        <u-navbar :title="show?curItem.title:'AEQS'" placeholder @leftClick="back" @rightClick="toSet">
            <div class="left" slot="left" v-if="!show"></div>
            <div slot="right" v-if="!show">
                <u-icon name="setting" color="#FFF" size='30'></u-icon>
            </div>
        </u-navbar>
        <u-grid border @click="toPage" col="3">
            <template v-for="(baseListItem,baseListIndex) in show?curItem.children:navs">
                <u-grid-item bgColor="#FFF" v-if="env=='dev'|| env=='test'|| !baseListItem.hidden" class="gridItem" :key="baseListIndex">
                    <u--image class="img" width="30" height="30" mode="aspectFit" :src="require(`../../static/indexIcons/${baseListItem.icon}.png`)"></u--image>
                    <text class="grid-text">{{baseListItem.title}}</text>
                </u-grid-item>
            </template>
        </u-grid>
    </view>
</template>
<script>
import { updateApp } from '@/util'
export default {
    data() {
        return {
            navs: [
                {
                    icon: 'test',
                    title: this.$t('home.测试'),
                    children: [
                        {
                            icon: 'labResEntering',
                            title: this.$t('home.测试工作清单和结果录入'),
                            path: '../labResEntering/labResEntering',
                        },

                    ]
                },
                {
                    icon: 'check',
                    title: this.$t('home.抽验'),
                    children: [

                        {
                            icon: 'drawSkin',
                            title: this.$t('home.画皮'),
                            path: '../drawSkin/drawSkin',
                        },
                        {
                            icon: 'matCheck',
                            title: this.$t('home.原材料检验'),
                            path: '../matCheck/matCheck',
                        },
                        {
                            icon: 'RQC',
                            title: "RQC",
                            path: '../RQC/RQC',
                        },
                        {
                            icon: 'RQCcheck',
                            title: this.$t('home.RQC审核'),
                            path: '../RQCcheck/RQCcheck',
                        },
                        {
                            icon: 'RQCcheck',
                            title: this.$t('home.RQC审核工厂端'),
                            path: '../RQCcheck/RQCcheck?fac=true',
                        },

                    ]
                },

                {
                    icon: 'metal',
                    title: this.$t('home.金属管控'),
                    children: [
                        {
                            icon: 'burrManage',
                            title: this.$t('home.车针管理'),
                            path: '../burrManage/burrManage',
                        },
                        {
                            icon: 'metalCheck',
                            title: this.$t('home.金属检测'),
                            path: '../metalCheck/metalCheck',
                        },

                    ]
                },
                {
                    icon: 'batchTry',
                    title: this.$t('home.量试'),
                    path: '../batchTry/batchTry',


                },
                {
                    icon: 'firstConfirm',
                    title: this.$t('home.首件确认'),
                    path: '../firstConfirm/firstConfirm',


                },
                {
                    icon: 'qualityError',
                    title: this.$t('home.品质异常'),
                    path: '../qualityError/qualityError',

                },
                {
                    icon: 'chemiclaManage',
                    title: this.$t('home.化学品管理'),
                    children: [
                        {
                            icon: 'chemiclaQRcode',
                            title: this.$t('home.化学品条码打印'),
                            path: '../chemiclaManage/chemiclaQRcode',
                        },
                        {
                            icon: 'chemiclaSend',
                            title: this.$t('home.化学品配送'),
                            path: '../chemiclaManage/chemiclaSend',
                        },
                        {
                            icon: 'usageControl',
                            title: this.$t('common.容器使用管控'),
                            path: '../usageControl/usageControl',
                        },

                    ],
                },
                {
                    icon: 'salesReturn',
                    title: this.$t('home.中国退货数据录入'),
                    path: '../salesReturn/salesReturn',
                },
                {
                    icon: 'shoeConfirm',
                    title: this.$t('home.确认鞋库存管理'),
                    path: '../shoeConfirm/shoeConfirm',
                    hidden: false,
                },
                {
                    icon: 'utilsUpkeep',
                    title: this.$t('home.检验工具保养'),
                    path: '../utilsUpkeep/utilsUpkeep',
                },
                {
                    icon: 'glueHandle',
                    title: this.$t('home.胶水危废处理'),
                    path: '../glueHandle/glueHandle',
                },
            ],
            curItem: {},
            show: false,
        }
    },
    computed: {
        env: function () {
            return process.uniEnv.name
        }
    },
    methods: {
        toPage(index) {
            this.curItem = this.show ? this.curItem.children[index] : this.navs[index]
            this.show = !this.curItem.path
            if (!this.show) {
                uni.navigateTo({ url: this.curItem.path })
            } else {
                uni.setStorageSync('curItem', this.curItem || {})
            }
        },
        toSet() {
            uni.navigateTo({ url: '/pages/setting/setting' })
        },
        back() {
            this.show = false
            this.curItem = {}
            uni.removeStorageSync('curItem')
        },
        // 检查是否更新版本
        updateVersion() {
            let _this = this
            plus.runtime.getProperty(plus.runtime.appid, function (widgetInfo) {
                // let currentVersion = uni.getStorageSync('currentVersion') || widgetInfo.versionCode; //获取当前版本号
                let currentVersion = widgetInfo.versionCode; //获取当前版本号
                console.log(uni.getStorageSync('org'), '公司信息');
                let data = {
                    "CompanyCode": uni.getStorageSync('org').org || '',
                    "CompanyName": uni.getStorageSync('org').orgname || ''
                }
                _this.$apis.sys_GetAppVersionInfo(data).then(res => {
                    let newVersion = res.version;
                    let downloadUrl = res.downloadUrl;
                    console.log(currentVersion, newVersion);
                    if (currentVersion < newVersion) {
                        updateApp(downloadUrl, res.updateType, newVersion, currentVersion)
                    }
                }).catch(err => {
                    console.error(err);
                }).finally(() => {
                })

            })
        },
    },
    onShow() {
        this.curItem = uni.getStorageSync('curItem') || {}
        this.show = !!Object.keys(this.curItem).length || false
        // #ifdef  APP-PLUS
        this.updateVersion()
        // #endif
    },
    onLoad() {
        uni.removeStorageSync('curItem')

    }

}
</script>

<style lang="scss">
.index {
    padding: 15rpx;
    .img {
        margin-top: 20rpx;
    }
    .grid-text {
        // font-size: 14px;
        color: #909399;
        padding: 10rpx 5rpx 20rpx 5rpx;
        /* #ifndef APP-PLUS */
        box-sizing: border-box;
        /* #endif */
    }
    .u-grid {
        align-items: stretch; // 拉伸
    }
}
</style>
