<template>
    <div class='shoeConfirm p15'>
        <u-navbar border :title="$t('common.确认鞋库存管理')" :leftText="$t('common.返回')" placeholder autoBack></u-navbar>
        <u-toast ref="uToast"></u-toast>
        <uni-card margin="15rpx 0">
            <div class="myList">
                <div class="item2">
                    <div class="label">{{$t('common.扫描鞋子二维码')}}</div>
                    <div class="value">
                        <scan class="scan" @confirm="scan" v-model="keyword"> </scan>
                    </div>
                </div>
                <div class="item2">
                    <div class="label">{{$t('common.确认人')}}</div>
                    <div class="value">
                        <u--input v-model="confirm_by" @confirm="scan"> </u--input>
                    </div>
                </div>
            </div>
        </uni-card>

    </div>
</template>
<script>
export default {
    name: 'shoeConfirm',
    data() {
        return {
            keyword: "",
            confirm_by: ""
        }
    },
    methods: {
        scan() {
            console.log(this.keyword);
            if (!this.keyword) return this.$refs.uToast.show({
                type: 'error',
                message: this.$t('common.请先扫描二维码'),
                duration: 1000,
                complete() {
                }
            })
            if (!this.confirm_by) return this.$refs.uToast.show({
                type: 'error',
                message: this.$t('common.请先输入确认人'),
                duration: 1000,
                complete() {
                }
            })
            let data = {
                qr_code: this.keyword,
                confirm_by: this.confirm_by,
            }
            this.$apis.QRX_EditConfirmShoes_Store_Confirm(data).then((res) => {
                this.keyword = ""
                this.$refs.uToast.show({
                    type: 'success',
                    message: this.$t('common.确认成功'),
                    duration: 1000,
                    complete() {
                    }
                })
            }).catch((err) => {
                console.error(err);
            })


        }
    },
    mounted() {
    }
}
</script>
<style lang='scss' scoped>
.shoeConfirm {
    .scan {
        background: #fff;
    }
}
</style>