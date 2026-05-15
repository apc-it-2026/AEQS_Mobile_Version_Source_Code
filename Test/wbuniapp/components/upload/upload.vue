<template>
    <div class='upload'>
        <u-upload ref="upload" :deletable="!disabled" :disabled="disabled" :maxCount="disabled?0:maxCount" :fileList="fileList" @delete="deletePic" multiple @afterRead="afterRead" previewFullImage></u-upload>
    </div>
</template>
<script>
import { uploadFilePromise } from '@/util'

export default {
    name: 'upload',
    props: {
        fileList: {//图片列表
            type: Array,
            default: () => []
        },
        disabled: {//只读
            type: Boolean,
            default: false
        },
        maxCount: {//最大数量
            type: Number,
            default: 52
        }
        //@change 改变事件
        //@deletePic 图片删除
        //@afterRead 读取完本地图片
    },
    computed: {},
    watch: {
        // 监听文件列表的变化，重新整理内部数据
        fileList: {
            immediate: true,
            deep: true,
            handler() {
                if (this.fileList.length) this.init()
            }
        },
    },
    data() {
        return {
        }
    },
    methods: {
        addImgUrl(url) {
            if (!url) return "" //空值
            if (url.includes('http')) return url //已经是完整地址了
            return uni.getStorageSync('imgUrl') + url //添加完整地址
        },
        deletePic(event) {
            this.fileList.splice(event.index, 1)
            this.$refs.upload.formatFileList()
            this.$emit('change', this.fileList)
            this.$emit('deletePic', event)
        },
        async afterRead(event) {
            event.file.forEach((e, i) => {
                uploadFilePromise(e.url).then((res) => {
                    let returnObj = JSON.parse(res.data).returnObj
                    this.fileList.push({ url: uni.getStorageSync('imgUrl') + returnObj.url, guid: returnObj.guid })
                    this.$refs.upload.formatFileList()
                    this.$emit('change', this.fileList)
                    this.$emit('afterRead', this.fileList)
                }).catch((err) => {
                    console.log(err);
                })
            })

        },
        init() {
            this.fileList.forEach((e, i) => {
                let currentUrl = e.url || e.image_url || e.file_url || e.URL || e.IMAGE_URL || e.FILE_URL
                e.url = this.addImgUrl(currentUrl) || ''
            })
        }
    },
    mounted() {
    }
}
</script>
<style lang='scss' scoped>
.upload {
}
</style>