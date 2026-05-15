<template>
    <div class='seeDownFile' v-if="fileList.length||(!fileList.length&&!hideInNoValue)">
        <u-button type="success" color="#0ab99c" @click="downShow=true" :text="$t('common.查看附件')"></u-button>
        <u-popup :show="downShow" @close="downShow=false" :round="10" closeOnClickOverlay>
            <div class="fileList">
                <u-cell-group :border='false'>
                    <u-cell icon="download" :title="item[title]" @click="Download(item)" isLink v-for="(item,i) in fileList" :key='i'></u-cell>
                </u-cell-group>
            </div>
        </u-popup>
    </div>
</template>
<script>
export default {
    name: 'seeDownFile',
    props: {
        fileList: {//文件列表
            type: Array,
            default: () => []
        },
        title: {//文件名
            type: String,
            default: 'file_name'
        },
        urlName: {//文件路径名
            type: String,
            default: 'file_url'
        },
        hideInNoValue: {//是否没有值的时候隐藏按钮
            type: Boolean,
            default: true
        },

        //@
    },
    data() {
        return {
            downShow: false
        }
    },
    methods: {
        Download(item) {
            uni.showLoading({
                title: this.$t('common.下载中') + '...'
            });
            let _this=this
            uni.downloadFile({
                url: uni.getStorageSync('imgUrl') + item[this.urlName],//下载地址接口返回
                success: (data) => {
                    uni.hideLoading()
                    if (data.statusCode === 200) {
                        //文件保存到本地
                        uni.saveFile({
                            tempFilePath: data.tempFilePath, //临时路径
                            success: function (res) {
                                uni.showToast({
                                    icon: 'none',
                                    mask: true,
                                    title: `${_this.$t('common.正在为您打开中')}... ${_this.$t('common.文件保存路径')}:` + res.savedFilePath, //保存路径
                                    duration: 3000,
                                });
                                //打开文档查看
                                uni.openDocument({
                                    filePath: res.savedFilePath,
                                    success: function (res) {
                                        console.log('打开文档成功');
                                    }
                                });
                            }
                        });
                    } else {
                        console.error(data);
                        uni.hideLoading()
                        uni.showToast({
                            icon: 'none',
                            mask: true,
                            title: _this.$t('common.下载失败')+':' + data.statusCode + data.errMsg,
                        });
                    }
                },
                fail: (err) => {
                    console.error(err);
                    uni.hideLoading()
                    uni.showToast({
                        icon: 'none',
                        mask: true,
                        title: _this.$t('common.失败请重新下载') + err,
                    });
                },
            });
        },
    },
    mounted() {
    }
}
</script>
<style lang='scss' scoped>
.seeDownFile {
    .fileList {
        padding: 15rpx;
    }
}
</style>