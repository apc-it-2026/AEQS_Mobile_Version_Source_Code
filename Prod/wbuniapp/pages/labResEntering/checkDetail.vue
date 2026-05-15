<template>
    <div class='checkDetail'>
        <u-navbar border :title="$t('common.检验项详情')" :leftText="$t('common.返回')" placeholder autoBack>
            <u-button size="small" type="success" slot="right" @click="save" :loading="loading" :text="$t('common.提交结果')"></u-button>
        </u-navbar>
        <u-toast ref="uToast"></u-toast>
        <uni-card :title="$t('common.检验项信息')" margin=" 0 0 15rpx 0">
            <div class="myList">
                <div class="item">
                    <div class="label">{{$t('common.送检类型')}}:</div>
                    <div class="value"> {{HeadData.TEST_TYPE_NAME}} </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.检验单编号')}}:</div>
                    <div class="value"> {{HeadData.TASK_NO}} </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.测试项内容')}}:</div>
                    <div class="value"> {{HeadData.INSPECTION_NAME}} </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.判断标准')}}:</div>
                    <div class="value"> {{HeadData.JUDGE_MODE}} </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.测量标准')}}:</div>
                    <div class="value"> {{HeadData.STANDARD_VALUE}} </div>
                </div>
                <div class="item item2">
                    <div class="label">{{$t('common.检验项备注')}}:</div>
                    <div class="value"> {{HeadData.ART_D_REMARK}} </div>
                </div>
                <div class="item item2">
                    <div class="label">{{$t('common.备注')}}:</div>
                    <div class="value">
                        <u--textarea v-model="HeadData.item_remark" autoHeight></u--textarea>
                    </div>
                </div>
                <div class="item item2" v-if="query.show=='true'">
                    <div class="value">
                        <u-button type="warning" size="small" @click.native.stop="send()" :text="$t('common.单项结果推送')"></u-button>
                    </div>
                </div>
            </div>
        </uni-card>
        <uni-card v-for='(e,i) in list' :key='i' :title="$t('common.试样')+(i+1)" margin=" 0 0 15rpx 0">
            <div class="formulaBox">
                <text class="formula_result" :class="e.result?'suc':'err'">{{e.result||$t('common.未计算')}}</text>
                <text class="tip"> = </text>
                <div class="box" v-for='(e2,i2) in e.CustomFormula' :key='i2'>
                    <u-input class="input" v-if="e2.type==1" v-model="e2.text" type="number"></u-input>
                    <text v-else> {{e2.text}} </text>
                </div>
            </div>
            <div class="other">
                <div class="myList">
                    <div class="item item2">
                        <div class="value">
                            <upload :fileList="e.lstImg" ></upload>
                        </div>
                    </div>
                    <div class="item item2">
                        <div class="value">
                            <mySelect :placeholder="$t('common.请选择设备')" @confirm="eq_infoConfirm(e)" labelName="eq_info_name" valueName="eq_info_no" apiName="GetEquipmentData" v-model="e.eq_infoObj" type="search"></mySelect>
                            <!-- <u-input placeholder="请选择设备" v-model="e.eq_info_name" suffixIcon="arrow-down" readonly @click.native="currentItem=e,devShow=true,GetEquipmentData()"></u-input> -->
                        </div>
                    </div>
                    <div class="item item2">
                        <div class="value">
                            <u--textarea v-model="e.remarks" :placeholder="$t('common.备注')"></u--textarea>
                        </div>
                    </div>

                </div>
            </div>
        </uni-card>
        <u-popup :show="devShow" @close="devShow=false" mode="bottom" round="10">
            <div class="dev">
                <u-search :placeholder="$t('common.请输入设备号或设备名称')" @change="GetEquipmentData" :showAction="false" :clearabled="true" v-model="keyWord"></u-search>
                <u-list height="500">
                    <u-cell-group :border="false">
                        <u-list-item v-for="(item, index) in devList" :key="index">
                            <u-cell clickable @click="getDev(item)">
                                <div class="item" slot="label">{{item.EQ_INFO_NO}}</div>
                                <div class="item" slot="value">{{item.EQ_INFO_NAME}}</div>
                            </u-cell>
                        </u-list-item>
                    </u-cell-group>
                </u-list>
            </div>
        </u-popup>
        <div class="result u-border-top">
            <u-grid border>
                <u-grid-item>
                    <div class="title">{{$t('common.结果')}}</div>
                    <div class="txt">{{Result||$t('common.未计算')}}</div>
                </u-grid-item>
                <u-grid-item>
                    <div class="title">{{$t('common.检测标准')}}</div>
                    <div class="txt">{{StandardValue}}</div>
                </u-grid-item>
                <u-grid-item>
                    <div class="title">{{$t('common.检测结果')}}</div>
                    <div class="txt resTxt" :class="TestResult=='PASS'?'suc':'err'">{{TestResult||$t('common.未计算')}}</div>
                </u-grid-item>
            </u-grid>
            <div class="btnList">
                <u-button color="#0ab99c" @click="formulaShow=true" :text="$t('common.查看公式')"></u-button>
                <u-modal :show="formulaShow" :title="$t('common.公式')" @confirm="formulaShow=false">
                    <view class="slot-content">
                        <div class="myList formulaList">
                            <div class="item item2">
                                <div class="label">{{$t('common.通用公式名称')}}:</div>
                                <div class="value"> {{FormulaContent.g_formula_name}} </div>
                            </div>
                            <div class="item item2">
                                <div class="label">{{$t('common.自定义公式名称')}}:</div>
                                <div class="value"> {{FormulaContent.d_formula_code}} </div>
                            </div>
                            <div class="item item2">
                                <div class="label">{{$t('common.自定义公式内容')}}:</div>
                                <div class="value"> {{FormulaContent.d_formula_content}} </div>
                            </div>
                        </div>
                    </view>
                </u-modal>
                <u-button type="primary" @click="CalculationFormula" :text="$t('common.开始计算')"></u-button>
            </div>
        </div>
    </div>
</template>
<script>
import { uploadFilePromise } from '@/util'
export default {
    name: 'checkDetail',
    data() {
        return {
            query: {},
            currentItem: {},
            formulaShow: false,
            devShow: false,
            loading: false,
            "HeadData": {
            },
            "StandardValue": "",
            "FormulaContent": {},
            list: [],
            devList: [],
            Result: "",
            TestResult: '',
            keyWord: '',
        }
    },
    methods: {
        getDev(item) {
            this.currentItem.eq_info_no = item.EQ_INFO_NO
            this.currentItem.eq_info_name = item.EQ_INFO_NAME
            this.keyWord = ''
            this.devShow = false
        },
        eq_infoConfirm(item) {
            let { eq_infoObj } = item
            item.eq_info_no = eq_infoObj.eq_info_no
            item.eq_info_name = eq_infoObj.eq_info_name
        },
        GetTestItemDetailsData() {
            let data = {
                "d_id": this.query.d_id,
            }
            this.$apis.GetTestItemDetailsData(data).then((res) => {
                console.log(res, data, '获取检验项详情')
                Object.assign(this, res.RetData1)
                this.HeadData.item_remark = res.RetData1.item_remark
                this.list.forEach((e, i) => {
                    // e.eq_infoObj = {
                    //     eq_info_no: e.eq_info_no || "",
                    //     eq_info_name: e.eq_info_name || "",
                    // }.
                    // if (!e.eq_infoObj) return
                    this.$set(e, 'eq_infoObj', {
                        eq_info_no: e.eq_info_no || "",
                        eq_info_name: e.eq_info_name || "",
                    })
                    // e.eq_infoObj = {}
                    // e.eq_infoObj.eq_info_no = e.eq_info_no || ""
                    // e.eq_infoObj.eq_info_name = e.eq_info_name || ""
                })

            }).catch((err) => {
                console.error(err);
            })
        },
        async afterRead(event, row) {
            event.file.forEach((e, i) => {
                uploadFilePromise(e.url).then((res) => {
                    let returnObj = JSON.parse(res.data).returnObj
                    row.lstImg.push({ url: e.url, guid: returnObj.guid })
                    console.log(returnObj, row, '上传')
                }).catch((err) => {
                    console.log(err);
                })
            })

        },
        deletePic(event, row) {
            row.lstImg.splice(event.index, 1)
        },
        GetEquipmentData() {
            let data = {
                keyWord: this.keyWord
            }
            this.$apis.GetEquipmentData(data).then((res) => {
                console.log(data, res, '获取设备列表')
                this.devList = res.RetData1
            }).catch((err) => {
                console.error(err);
            })

        },
        CalculationFormula() {
            //表单验证
            let flag = true
            let LstFormulaParameters = []
            try {
                this.list.forEach((e, i) => {
                    if (e.CustomFormula.some(e => e.type == 1 && !e.text)) throw new Error(++i);
                    LstFormulaParameters.push(e.CustomFormula.filter(e => e.type == 1).map(e => e.text))
                })
            } catch (e) {
                flag = false
                uni.$u.toast(`${this.$t('common.试样')}${e.message}${this.$t('common.未填写完整')}`)
            };
            if (!flag) return
            let data = {
                "d_id": this.query.d_id,
                LstFormulaParameters,
            }
            this.$apis.CalculationFormula(data).then((res) => {
                console.log(data, res, '开始计算')
                this.Result = res.RetData1.Result
                this.TestResult = res.RetData1.TestResult
                this.list.forEach((e, i) => {
                    e.result = res.RetData1.TestItems[i]
                })
                this.$refs.uToast.show({
                    type: 'success',
                    message: this.$t('common.计算成功'),
                })

            }).catch((err) => {
                console.error(err);
            })



        },
        send() {//发送通知
            /* 发送通知 */
            let data = {
                d_id: this.query.d_id,
            }
            this.$apis.SendInspectionDataEmail(data).then((res) => {
                uni.$u.toast(this.$t('common.发送成功'))
            }).catch((err) => {
                console.error(err);
            })

        },
        save() {
            //表单验证
            if (!this.Result) return uni.$u.toast(this.$t('common.请先计算公式'))
            if (this.list.some(e => !e.eq_info_no)) return uni.$u.toast(this.$t('common.未选择设备'))
            this.loading = true
            let data = {
                list: this.list,
                Result: this.Result,
                TestResult: this.TestResult,
                item_remark: this.HeadData.item_remark,
                d_id: this.query.d_id,
            }
            this.$apis.SubimitInspectionData(data).then((res) => {
                console.log(data, res, '提交实验室检验结果')
                this.$refs.uToast.show({
                    type: 'success',
                    message: this.$t('common.提交成功'),
                    duration: 1000,
                    complete() {
                        this.loading = false
                        uni.navigateBack()//返回上一页
                    }
                })
            }).catch((err) => {
                console.error(err);
                this.loading = false

            })

        }
    },
    onShow() {
    },
    onLoad(query) {
        this.query = query
        this.GetTestItemDetailsData()
    }
}
</script>
<style lang='scss' scoped>
.checkDetail {
    padding: 15rpx;
    padding-bottom: 200rpx;

    .formulaBox {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .tip {
            margin: 0 5rpx;
        }
        .input {
            width: 80rpx;
        }
    }
    .formulaList {
        .item {
            font-size: 14px;
            .label {
                width: 200rpx;
            }
        }
    }
    .other {
        margin-top: 20rpx;
    }
    /deep/ .searchPopup {
        .label {
            // color: #00a4ff;
            width: 100%;
            text-align: left;
        }
        .value {
            margin-left: 10px;
        }
    }
    .result {
        position: fixed;
        z-index: 5;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #fff;
        .u-grid {
            .u-grid-item {
                padding: 5rpx;
                .title {
                }
                .txt {
                    margin-top: 15rpx;
                    font-size: 30rpx;
                    font-weight: 600;
                }
            }
        }
        .btnList {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .dev {
        padding: 40rpx 20rpx;
    }
}
</style>