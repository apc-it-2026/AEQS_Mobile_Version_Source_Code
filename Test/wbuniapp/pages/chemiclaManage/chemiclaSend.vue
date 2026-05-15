<template>
    <div class='chemiclaSend p15'>
        <u-navbar border :title="$t('common.化学品配送')" :leftText="$t('common.返回')" placeholder autoBack>
            <u-button type="success" size="small" slot="right" :text="$t('common.提交')" :loading="loading" @click="save()"></u-button>
        </u-navbar>
        <!-- 搜索 -->
        <uni-card margin="15rpx 0">
            <div class="myList">
                <div class="item2">
                    <div class="label">{{$t('common.容器条码')}}:</div>
                    <div class="value">
                        <scan v-model="searchForm.container_no" @clear="onSearch('vessel')" @confirm="onSearch('vessel')"></scan>
                    </div>
                </div>
                <div class="item2">
                    <div class="label">{{$t('common.化学品条码')}}:</div>
                    <div class="value">
                        <scan v-model="searchForm.chemical_no" @clear="onSearch('chemicla')" @confirm="onSearch('chemicla')"></scan>
                    </div>
                </div>
            </div>
        </uni-card>
        <!-- 容器信息 -->
        <uni-card margin="15rpx 0" :title="$t('common.容器信息')" v-show="vessel.container_no">
            <div class="myList">
                <div class="item2">
                    <div class="label">{{$t('common.容器编号')}}:</div>
                    <div class="value">
                        {{vessel.container_no}}
                    </div>
                </div>
                <div class="item2">
                    <div class="label">{{$t('common.产线信息')}}:</div>
                    <div class="value">
                        {{vessel.department_name}}
                    </div>
                </div>
                <!-- <div class="item">
                    <div class="label">化学品代号:</div>
                    <div class="value">
                        {{vessel.chemical_no}}
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.化学品名称')}}:</div>
                    <div class="value">
                        {{vessel.chemical_name}}
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.药剂名称')}}:</div>
                    <div class="value">
                        {{vessel.medicament_name}}
                    </div>
                </div> -->
            </div>
        </uni-card>
        <!-- 化学品信息 -->
        <uni-card margin="15rpx 0" :title="$t('common.化学品信息')" v-show="chemicla.chemical_no">
            <div class="myList">
                <div class="item2">
                    <div class="label">{{$t('common.化学品名称')}}:</div>
                    <div class="value">
                        {{chemicla.chemical_name}}
                    </div>
                </div>
                <div class="item2">
                    <div class="label">{{$t('common.药剂名称')}}:</div>
                    <div class="value">
                        {{chemicla.medicament_name}}
                    </div>
                </div>
                <div class="item2">
                    <div class="label">{{$t('common.对应湿度')}}:</div>
                    <div class="value">
                        {{chemicla.corresponding_humidity}}
                    </div>
                </div>
                <div class="item2">
                    <div class="label">{{$t('common.药剂比例')}}(%):</div>
                    <div class="value">
                        {{chemicla.reagent_proportion}}
                    </div>
                </div>
                <div class="item2">
                    <div class="label">{{$t('common.有效时间')}}(h):</div>
                    <div class="value">
                        {{chemicla.effective_time}}
                    </div>
                </div>
                <div class="item2">
                    <div class="label">{{$t('common.调配时间')}}:</div>
                    <div class="value">
                        <uni-datetime-picker :start-placeholder="$t('common.开始日期')"  :end-placeholder="$t('common.结束日期')" type="datetime" :clear-icon="false" v-model="chemicla.g_mixing_time" />
                    </div>
                </div>
            </div>
        </uni-card>
    </div>
</template>
<script>
export default {
    name: 'chemiclaSend',
    data() {
        return {
            loading: false,
            searchForm: {//搜索条件
                container_no: '',
                chemical_no: '',
            },
            vessel: {//容器
            },
            chemicla: {//化学品
            },
        }
    },
    methods: {
        onSearch(name) {//开始搜索
            if (name == 'vessel') {
                if (!this.searchForm.container_no) return
                let data = {
                    "container_no": this.searchForm.container_no
                }
                this.$apis.chemiclaManage_GetContainer_List(data).then((res) => {
                    if (typeof res == 'string') res = JSON.parse(res)
                    this.vessel = res[0]
                }).catch((err) => {
                    console.error(err);
                    this.vessel = {}
                })

            } else {
                if (!this.searchForm.chemical_no) return
                let data = {
                    "id": this.searchForm.chemical_no
                }
                this.$apis.chemiclaManage_GetChemical_List(data).then((res) => {
                    this.chemicla = res[0]
                }).catch((err) => {
                    console.error(err);
                    this.chemicla = {}
                })
            }
        },
        save() {//提交保存
            //先验证信息
            if (!this.vessel.container_no) return uni.$u.toast(this.$t('common.请先获取容器信息'))
            if (!this.chemicla.chemical_no) return uni.$u.toast(this.$t('common.请先获取化学品信息'))
            this.loading = true
            let data = {
                "container_no": this.searchForm.container_no,//容器编号
                "id": this.searchForm.chemical_no,//化学品编号
                "g_mixing_time": this.chemicla.g_mixing_time,//调配时间
            }
            this.$apis.chemiclaManage_Commit_data(data).then((res) => {
                uni.$u.toast(this.$t('common.提交成功'))
                this.init()
            }).catch((err) => {
                console.error(err);
            }).finally(() => {
                this.loading = false
            })
        },
        init() {
            this.chemicla = {}
            this.vessel = {}
            this.searchForm.container_no = this.searchForm.chemical_no = ""
        }
    },
    onShow() {
    },
    onLoad(query) {
    }
}
</script>
<style lang='scss' scoped>
.chemiclaSend {
    .myList {
        .label {
            @media #{$phone} {
                width: 135rpx;
            }
        }
    }
}
</style>