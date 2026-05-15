<template>
    <div class='datePicker'>
        <!-- <picker mode="date" :fields="fields" :value="value" @change="bindDateChange" :disabled="disabled"> -->
        <u-input :value="value" @click.native="show=!disabled" suffixIcon="arrow-down" readonly :disabled="disabled"> </u-input>
        <!-- </picker> -->
        <u-datetime-picker :defaultIndex="[10,0]" :show="show" @confirm="confirm" @close="show=false" :cancelText="$t('common.取消')" :confirmText="$t('common.确认')" closeOnClickOverlay v-model="date" mode="year-month"></u-datetime-picker>
    </div>
</template>
<script>
export default {
    name: 'datePicker',
    props: {
        fields: {//选择器种类
            type: String,
            default: 'day'
        },
        value: {//对应值
            type: String,
            default: ""
        },
        disabled: {//是否禁用
            type: Boolean,
            default: false
        },
        //@confirm 确认选择事件
    },
    data() {
        return {
            show: false,
            date: "",
        }
    },
    methods: {

        bindDateChange: function (e) {//选择月份
            // this.value = e.target.value
            this.$emit("input", e.target.value);
            this.$emit("confirm", e.target.value);
        },
        getCurrentMonth() {//获取当前月份
            const date = new Date()
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            month = month > 9 ? month : '0' + month
            return `${year}-${month}`
        },
        getMonth(date) {//获取年月
            date = new Date(date)
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            month = month > 9 ? month : '0' + month
            return `${year}-${month}`
        },
        confirm(value) {
            console.log(value);
            this.$emit("input", this.getMonth(value.value));
            this.$emit("confirm", this.getMonth(value.value));
            this.show = false

        }
    },
    mounted() {
        if (!this.value && this.fields == 'month') {//自动获取月份
            this.$emit("input", this.getCurrentMonth());
            this.$emit("confirm", this.getCurrentMonth());
            this.date = new Date(this.getCurrentMonth()).getTime()
        }
    }
}
</script>
<style lang='scss' scoped>
.datePicker {
}
</style>