<template>
    <div class='glueHandleDetail p15'>
        <u-navbar border :title="query.type=='add'? $t('common.新建胶水危废处理') :$t('common.胶水危废处理')" :leftText="$t('common.返回')" placeholder autoBack>
        </u-navbar>
        <u-toast ref="uToast"></u-toast>
        <!-- 异常信息 -->
        <uni-card margin="15rpx 0" :title="$t('common.胶水危废信息')">
            <div class="myList">
                <div class="item2">
                    <div class="label">{{$t('common.生产单位')}}:</div>
                    <div class="value">
                        <mySelect apiName="JSWF_GetDEPARTMENT" v-model="baseData.department" type="search"></mySelect>
                    </div>
                </div>
            </div>
            <div class="myList">
                <div class="item2">
                    <div class="label">{{$t('common.报废胶水名称')}}:</div>
                    <div class="value">
                        <mySelect apiName="JSWF_GetScrapGlue" v-model="baseData.scrap_glue" type="search"></mySelect>
                    </div>
                </div>
            </div>
            <div class="myList">
                <div class="item2">
                    <div class="label">{{$t('common.胶水报废原因')}}:</div>
                    <div class="value">
                        <mySelect apiName="JSWF_GetScrapGlueReason" valueName="d" v-model="baseData.reason" type="search"></mySelect>
                    </div>
                </div>
            </div>
            <div class="myList">
                <div class="item2">
                    <div class="label">{{$t('common.胶水报废重量')}}:</div>
                    <div class="value">
                        <u--input type="number" v-model="baseData.scrap_glue_weight">
                            <template slot="suffix">
                                KG
                            </template>
                        </u--input>
                    </div>
                </div>
            </div>
            <div class="myList">
                <div class="item2">
                    <div class="label">{{$t('common.报废单位签名')}}:</div>
                    <div class="value">
                        <u-button :color="baseData.bf_autograph_name?'#0ab99c':'#909399'" :text="baseData.bf_autograph_name?baseData.bf_autograph_name:$t('common.点我签名')" @click="signShow('bf_autograph')"></u-button>
                    </div>
                </div>
            </div>
            <div class="myList">
                <div class="item2">
                    <div class="label">{{$t('common.环保股回收签名')}}:</div>
                    <div class="value">
                        <u-button :color="baseData.hb_autograph_name?'#0ab99c':'#909399'" :text="baseData.hb_autograph_name?baseData.hb_autograph_name:$t('common.点我签名')" @click="signShow('hb_autograph')"></u-button>
                    </div>
                </div>
            </div>
        </uni-card>
        <u-button type="success" :loading="loading" color="#0ab99c" :text="$t('common.立即保存')" @click="save()"></u-button>
        <!--新增  -->
        <u-popup :show="show" @close="show=false" :round="10" closeOnClickOverlay>
            <div class="add p15">
                <div class="myList">
                    <div class="item2">
                        <div class="label">{{$t('common.账号')}}:</div>
                        <div class="value">
                            <u--input prefixIcon="account" clearable v-model="signForm.account"> </u--input>
                        </div>
                    </div>
                    <div class="item2">
                        <div class="label">{{$t('common.密码')}}:</div>
                        <div class="value">
                            <div class="btnList">
                                <u--input prefixIcon="lock" clearable password v-model="signForm.password"> </u--input>
                            </div>
                        </div>
                    </div>
                    <div class="item2">
                        <div class="value">
                            <div class="btnList">
                                <u-button :disabled="!signForm.account||!signForm.password" type="success" color="#0ab99c" :text="$t('common.确认签名')" @click="saveSign()"></u-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </u-popup>
    </div>
</template>
<script>
import md5 from "@/util/md5";
export default {
    name: 'glueHandleDetail',
    data() {
        return {
            prop: '',//当前字段名
            query: {},
            loading: false,
            show: false,
            baseData: {//基本信息
                department: {
                    label: "",
                    value: "",
                },
                scrap_glue: {
                    label: "",
                    value: "",
                },
                reason: {
                    label: "",
                    value: "",
                },
                scrap_glue_weight: '',
                bf_autograph_name: '',
                hb_autograph_name: '',
                bf_autograph: '',
                hb_autograph: '',
            },
            signForm: {
                account: "",
                password: "",
            }
        }
    },
    methods: {
        save() {//保存
            //表单验证
            if (!this.baseData.department.value) return uni.$u.toast(this.$t('common.请选择生产单位'))
            if (!this.baseData.scrap_glue.value) return uni.$u.toast(this.$t('common.请选择胶水名称'))
            if (!this.baseData.reason.value) return uni.$u.toast(this.$t('common.请选择报废原因'))
            if (this.baseData.scrap_glue_weight == '') return uni.$u.toast(this.$t('common.请填写胶水重量'))
            this.loading = true
            let data = {
                "id": this.query.id == "undefined" ? '' : this.query.id,
                "department_code": this.baseData.department.value,
                "scrap_glue_no": this.baseData.scrap_glue.value,
                "scrap_glue_weight": this.baseData.scrap_glue_weight,
                "scrap_glue_reason": this.baseData.reason.value,
                "bf_autograph": this.baseData.bf_autograph,
                "hb_autograph": this.baseData.hb_autograph
            }
            for (const key in data) {
                data[key] == null && (data[key] = "")
            }
            this.$apis.JSWF_AddOrEditScrapGlueMagRecord(data).then((res) => {
                this.$refs.uToast.show({
                    type: 'success',
                    message: this.$t('common.保存成功'),
                    duration: 1000,
                    complete() {
                        uni.navigateBack()//返回上一页
                    }
                })
            }).catch((err) => {
                console.error(err);
                uni.$u.toast(err)
            }).finally(() => {
                this.loading = false
            })
        },
        getBaseData() {//获取基础数据
            let data = {
                "id": this.query.id,//任务编号
            }
            this.$apis.JSWF_GetScrapGlueMagRecordById(data).then((res) => {
                res.scrap_glue_weight = +res.scrap_glue_weight
                Object.assign(this.baseData, res)
                this.baseData.department.label = res.department_name
                this.baseData.department.value = res.department_code
                this.baseData.scrap_glue.label = res.scrap_glue_name
                this.baseData.scrap_glue.value = res.scrap_glue_no
                this.baseData.reason.label = res.scrap_glue_reason
                this.baseData.reason.value = res.scrap_glue_reason
            }).catch((err) => {
                console.error(err);
            })

        },
        signShow(prop) {
            this.prop = prop
            this.signForm = {
                account: "",
                password: "",
            }
            this.show = true
        },
        saveSign() {//确认签名
            this.$apis.JSWF_ScrapGlueMagAutograph({
                "UserCode": this.signForm.account,
                "UserPassword": md5.hex_md5(this.signForm.password).toUpperCase()
            }).then((res) => {
                uni.$u.toast(this.$t('common.签名成功'))
                this.baseData[this.prop] = res.code
                this.baseData[this.prop + '_name'] = res.name
                this.show = false
            }).catch((err) => {
                console.error(err);
            })
        }
    },
    onShow() {
    },
    onLoad(query) {
        this.query = query
        if (this.query.type == 'edit') {
            this.getBaseData()
        }
    }
}
</script>
<style lang='scss' scoped>
.glueHandleDetail {
    .add {
        .label {
            width: 80px;
        }
    }
    /deep/ .u-cell__title {
        .label {
            width: 70%;
        }
    }
}
</style>
