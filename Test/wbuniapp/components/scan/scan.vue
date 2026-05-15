<template>
    <div class='scan'>
        <u-input :value="value" :disabled="disabled" @input="inputChange($event)" @clear="clear" clearable @confirm="$emit('confirm')">
            <u-icon slot="suffix" name="scan" @click="scan"></u-icon>
        </u-input>
    </div>
</template>
<script>
export default {
    name: 'scan',
    data() {
        return {
        }
    },
    props: {
        value: {//值
            type: String,
            default: ''
        },
        disabled: {//只读
            type: Boolean,
            default: false
        },
        //@clear 清空事件
        //@confirm 回车确认或者扫码确认事件
        //@input 输入事件
        //@scan 扫描事件
    },
    methods: {
        clear() {
            setTimeout(() => { this.$emit('clear') }, 0)
        },
        inputChange(val) {
            this.$emit("input", val);
        },
        scan() {
            if (this.disabled) return
            console.log('扫描');
            // 允许从相机和相册扫码
            let _this = this
            uni.scanCode({
                success: function (res) {
                    console.log('条码类型：' + res.scanType);
                    console.log('条码内容：' + res.result);
                    _this.$emit("input", res.result);
                    _this.$emit('scan', res.result)
                    _this.$emit('confirm', res.result)
                }
            });


        },
    },
    mounted() {
    }
}
</script>
<style lang='scss' scoped>
.scan {
    width: 100%;
}
</style>
