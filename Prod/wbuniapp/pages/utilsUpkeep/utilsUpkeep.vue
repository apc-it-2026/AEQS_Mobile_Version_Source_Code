<template>
    <div class='utilsUpkeep'>
        <u-navbar border :title="$t('common.检验工具保养')" :leftText="$t('common.返回')" placeholder autoBack>
            <u-button type="success" size="small" slot="right" @click="save" :text="$t('common.保存提交')"></u-button>
        </u-navbar>
        <u-toast ref="uToast"></u-toast>
        <uni-card margin="15px">
            <div class="myList">
                <div class="item2">
                    <div class="label">{{$t('common.扫描工具二维码')}}</div>
                    <div class="value">
                        <scan class="scan" @confirm="scan" v-model="keyword"> </scan>
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.工具编号')}}:</div>
                    <div class="value">
                        {{info.eq_info_no}}
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.工具名称')}}:</div>
                    <div class="value">
                        {{info.eq_info_name}}
                    </div>
                </div>
                <div class="item2">
                    <div class="label">{{$t('common.检验结果')}}:</div>
                    <div class="value">
                        <u--text v-show="info.eq_info_no" :type="result== $t('common.通过') ?'success':'error'" :text="result"></u--text>
                    </div>
                </div>
            </div>
        </uni-card>
        <div class="table p15" v-show="list.length">
            <uni-table border :loading="loading">
                <uni-tr>
                    <uni-th width="80">{{$t('common.序号')}}</uni-th>
                    <uni-th>{{$t('common.检验项目编号')}}</uni-th>
                    <uni-th>{{$t('common.检验项目名称')}}</uni-th>
                    <uni-th>{{$t('common.校验标准')}}</uni-th>
                    <uni-th>{{$t('common.检验结果')}}</uni-th>
                </uni-tr>
                <uni-tbody>
                    <uni-tr v-for='(e,i) in list' :key='i'>
                        <uni-td width="80">{{++i}}</uni-td>
                        <uni-td>{{e.ITEM_CODE}}</uni-td>
                        <uni-td>{{e.ITEM_NAME}}</uni-td>
                        <uni-td>{{e.REMARK}}</uni-td>
                        <uni-td>
                            <mySelect :list="check_resList" labelName="MAINTAIN2" valueName="MAINTAIN" @confirm="confirm($event,e)" v-model="e.check_res" type="picker"></mySelect>
                        </uni-td>
                    </uni-tr>
                </uni-tbody>
            </uni-table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'utilsUpkeep',
    data() {
        return {
            keyword: "",
            loading: false,
            info: {},//工具信息
            list: [],//检验列表
            check_resList: [//检验结果下拉列表
                {
                    MAINTAIN2: 'PASS',
                    MAINTAIN: '1',
                },
                {
                    MAINTAIN2: 'FAIL',
                    MAINTAIN: '0',
                },

            ],
        }
    },

    computed: {
        result() {
            return this.list.some(e => e.MAINTAIN == 0) ? this.$t('common.不通过') : this.$t('common.通过')
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
            this.loading = true
            let data = {
                eq_info_no: this.keyword,

            }
            this.$apis.GJBY_GetList(data).then((res) => {
                this.keyword = ""
                this.info = res
                this.list = res.data
                this.list.forEach((e, i) => {
                    this.$set(e, 'check_res', this.check_resList.find(e2 => e2.MAINTAIN == e.MAINTAIN))
                })
            }).catch((err) => {
                this.info = {}
                this.list = []
                console.error(err);
            }).finally(() => {
                this.loading = false
            })


        },
        save() {//保存提交
            //验证
            if (!this.info.eq_info_no) return uni.$u.toast(this.$t('common.请先扫描工具二维码'))
            let data = {
                data: this.list
            }
            this.$apis.GJBY_Commitdatalv(data).then((res) => {
                let _this = this
                this.$refs.uToast.show({
                    type: 'success',
                    message: this.$t('common.提交成功'),
                    duration: 1000,
                    complete() {
                        _this.init()
                    }
                })
            }).catch((err) => {
                console.error(err);
            })
        },
        init() {//初始化数据
            this.list = []
            this.info = {}
            this.keyword = ""
        },
        confirm(item, e) {
            Object.assign(e, item)
            // e.MAINTAIN = item.MAINTAIN
            // e.MAINTAIN2 = item.MAINTAIN2
            // console.log(item, e);

        }
    },
    onShow() {
    },
    onLoad(query) {
    }
}
</script>
<style lang='scss' scoped>
.utilsUpkeep {
}
</style>