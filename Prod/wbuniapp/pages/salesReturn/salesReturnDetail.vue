<template>
    <div class='salesReturnDetail p15'>
        <u-navbar border :title="query.type=='add'? $t('common.新建中国退货数据') : $t('common.中国退货数据详情') " :leftText="$t('common.返回')" placeholder autoBack>
            <u-button type="success" size="small" :loading="loading" slot="right" :text="$t('common.保存')" @click="save()"></u-button>
        </u-navbar>
        <u-toast ref="uToast"></u-toast>
        <!-- 基本信息 -->
        <uni-card margin="15rpx 0" :title="$t('common.数据录入')">
            <div class="myList">
                <div class="item">
                    <div class="label">PO:</div>
                    <div class="value">
                        <mySelect :disabled="!isAdd" v-model="addForm.POForm" labelName="mer_po" apiName="THSJ_PoGetList" type="scan"></mySelect>
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.鞋型名称')}}:</div>
                    <div class="value">
                        {{addForm.POForm.name_t}}
                    </div>
                </div>
                <div class="item">
                    <div class="label">ART:</div>
                    <div class="value">
                        {{addForm.POForm.prod_no}}
                    </div>
                </div>
                <div class="item">
                    <div class="label">Category:</div>
                    <div class="value">
                        {{addForm.POForm.style_seq}}
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.生产日期')}}:</div>
                    <div class="value">
                        {{addForm.POForm.production_month}}
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.工厂')}}:</div>
                    <div class="value">
                        {{addForm.POForm.factory}}
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.新鞋数量')}}:</div>
                    <div class="value">
                        <u--input type="number" v-model="addForm.newshoes_qty"> </u--input>
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.旧鞋数量')}}:</div>
                    <div class="value">
                        <u--input type="number" v-model="addForm.oldshoes_qty"> </u--input>
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.退货数量')}}:</div>
                    <div class="value">
                        {{sumNum}}
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.国家地区')}}:</div>
                    <div class="value">
                        <mySelect :list="region_no_list" labelName="region_name" valueName="region_no" v-model="addForm.region_noObj" type="picker"></mySelect>
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.主要退货代码')}}:</div>
                    <div class="value">
                        <mySelect @confirm="main_codeConfirm" :list="main_code_list" labelName="content_cn" valueName="main_code" v-model="addForm.main_codeObj" type="picker"></mySelect>
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.次要退货代码')}}:</div>
                    <div class="value">
                        <mySelect :list="main_code_list2" labelName="content_cn" valueName="minor_code" v-model="addForm.main_codeObj2" type="picker"></mySelect>
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.码数')}}:</div>
                    <div class="value">
                        <u--input v-model="addForm.size_no"> </u--input>
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.FOB单价')}}($):</div>
                    <div class="value">
                        <u--input  type="number" v-model="addForm.fob_price"> </u--input>
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.赔偿金额')}}($):</div>
                    <div class="value">
                        <u--input  type="number" v-model="addForm.compensation_amount"> </u--input>
                    </div>
                </div>
                <div class="item2">
                    <div class="label">{{$t('common.问题描述')}}:</div>
                    <div class="value">
                        <u--textarea v-model="addForm.problem_point_desc"></u--textarea>
                    </div>
                </div>
                <div class="item2">
                    <div class="label">{{$t('common.问题图片')}}:</div>
                    <div class="value">
                        <upload :fileList="addForm.file_list"></upload>
                    </div>
                </div>
            </div>
        </uni-card>
    </div>
</template>
<script>
export default {
    name: 'salesReturnDetail',
    data() {
        return {
            loading: false,
            addForm: {
                POForm: {//po相关信息
                    mer_po: "",//PO号
                    name_t: "",//鞋型名称
                    prod_no: "",//ART
                    style_seq: "",//Category
                    production_month: "",//生产日期
                    factory: "",//工厂
                },
                newshoes_qty: "",//新鞋数量
                oldshoes_qty: "",//旧鞋数量
                size_no: "",//码数
                fob_price: "",//FOB单价
                compensation_amount: "",//赔偿金额
                problem_point_desc: "",//问题描述
                file_list: [],//问题图片
                region_noObj: {//国家地区
                    region_no: "",
                    region_name: "",
                },
                main_codeObj: {//主要退货
                    main_code: "",
                    content_cn: "",
                },
                main_codeObj2: {//次要退货
                    minor_code: "",
                    content_cn: "",
                },
            },
            region_no_list: [],//国家下拉
            main_code_list: [],//主要退货下拉
            main_code_list2: [],//次要退货下拉
        }
    },
    computed: {
        sumNum() {
            let sum = 0
            try {
                sum = Number(this.addForm.newshoes_qty) + Number(this.addForm.oldshoes_qty)
                sum = sum.toFixed(2)
            } catch (error) {

            }
            return sum
        },
        isAdd() {
            return this.query.type == 'add'
        }
    },
    methods: {
        save() {//保存
            //表单验证
            if (!this.addForm.POForm.mer_po) return uni.$u.toast(this.$t('common.请获取PO'))
            this.loading = true
            let data = {
                "task_no": this.query.task_no == "undefined" ? "" : this.query.task_no,
                "po": this.addForm.POForm.mer_po,
                "region_no": this.addForm.region_noObj.region_no,
                "production_month": this.addForm.POForm.production_month,
                "size_no": this.addForm.size_no,
                "newshoes_qty": this.addForm.newshoes_qty,
                "oldshoes_qty": this.addForm.oldshoes_qty,
                "main_code": this.addForm.main_codeObj.main_code,
                "minor_code": this.addForm.main_codeObj2.minor_code,
                "factory": this.addForm.POForm.factory,
                "fob_price": this.addForm.fob_price,
                "compensation_amount": this.addForm.compensation_amount,
                "problem_point_desc": this.addForm.problem_point_desc,
                "file_list": this.addForm.file_list
            }
            // for (const key in data) {
            //     data[key] == null && (data[key] = "")
            // }
            this.$apis.THSJ_Commit_Mian(data).then((res) => {
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
            }).finally(() => {
                this.loading = false
            })
        },

        getRegionList() {//获取国家下拉列表
            let data = {
            }
            this.$apis.THSJ_getRegionList(data).then((res) => {
                this.region_no_list = res
            }).catch((err) => {
                console.error(err);
            })

        },
        getMain_codeList() {//获取主要退货下拉列表
            let data = {
            }
            this.$apis.THSJ_GetCode1(data).then((res) => {
                this.main_code_list = res
            }).catch((err) => {
                console.error(err);
            })

        },
        getMain_codeList2() {//获取次要退货下拉列表
            let data = {
                "main_code": this.addForm.main_codeObj.main_code
            }
            this.$apis.THSJ_GetCode2(data).then((res) => {
                this.main_code_list2 = res
            }).catch((err) => {
                console.error(err);
            })

        },
        getBaseData() {//获取基础数据
            let data = {
                "task_no": this.query.task_no//任务编号
            }
            this.$apis.THSJ_Commithisory(data).then((res) => {
                res = res[0]
                this.addForm.POForm.mer_po = res.po
                this.addForm.POForm.name_t = res.name_t
                this.addForm.POForm.prod_no = res.prod_no
                this.addForm.POForm.style_seq = res.style_seq
                this.addForm.POForm.production_month = res.production_month
                this.addForm.POForm.factory = res.factory
                this.addForm.newshoes_qty = res.newshoes_qty
                this.addForm.oldshoes_qty = res.oldshoes_qty
                this.addForm.size_no = res.size_no
                this.addForm.fob_price = res.fob_price
                this.addForm.compensation_amount = res.compensation_amount
                this.addForm.problem_point_desc = res.problem_point_desc
                this.addForm.file_list = res.file_list
                this.addForm.region_noObj.region_no = res.region_no
                this.addForm.region_noObj.region_name = res.region_name
                this.addForm.main_codeObj.main_code = res.main_code
                this.addForm.main_codeObj.content_cn = res.content_cn
                this.addForm.main_codeObj2.minor_code = res.minor_code
                this.addForm.main_codeObj2.content_cn = res.content_cn2
                this.getMain_codeList2()
            }).catch((err) => {
                console.error(err);
            })

        },
        main_codeConfirm() {//确认主要退货
            this.getMain_codeList2()
            this.addForm.main_codeObj2.minor_code = ""
            this.addForm.main_codeObj2.content_cn = ""
        }

    },
    onShow() {
    },
    onLoad(query) {
        this.query = query
        if (this.query.type == 'edit') {
            this.getBaseData()
        }
        this.getMain_codeList()
        this.getRegionList()
    }
}
</script>
<style lang='scss' scoped>
.salesReturnDetail {
}
</style>
