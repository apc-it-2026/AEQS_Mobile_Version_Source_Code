<template>
    <div class='matCheckDetail'>
        <u-navbar border :title="$t('common.原材料检验')" :leftText="$t('common.返回')" placeholder autoBack> </u-navbar>
        <u-toast ref="uToast"></u-toast>
        <div class="content">
            <uni-card :title="$t('common.物料信息')" margin=" 0 0 15rpx 0">
                <div class="myList2">
                    <div class="item">
                        <div class="label">{{$t('common.生产厂商')}}:</div>
                        <div class="value">{{matFrom.SUPPLIERS_NAME}}</div>
                    </div>
                    <div class="item">
                        <div class="label">{{$t('common.料号')}}:</div>
                        <div class="value">{{matFrom.ITEM_NO }}</div>
                    </div>
                    <div class="item ">
                        <div class="label">{{$t('common.进仓数量')}}:</div>
                        <div class="value">{{matFrom.RCPT_QTY}}</div>
                    </div>
                    <div class="item ">
                        <div class="label">{{$t('common.鞋型')}}:</div>
                        <div class="value">{{matFrom.SHOE_NO_LS}}</div>
                    </div>
                    <div class="item ">
                        <div class="label">ART:</div>
                        <div class="value">{{matFrom.PROD_NO_LS}}</div>
                    </div>
                    <div class="item ">
                        <div class="label">{{$t('common.部位')}} :</div>
                        <div class="value">{{matFrom.BW}}</div>
                    </div>
                    <div class="item item2">
                        <div class="label">{{$t('common.材料名称')}} :</div>
                        <div class="value">{{matFrom.NAME_T}}</div>
                    </div>
                    <div class="item item2">
                        <div class="label">{{$t('common.进仓日期')}} :</div>
                        <div class="value">{{matFrom.JCDATE}}</div>
                    </div>
                </div>
            </uni-card>
            <uni-card margin=" 0 0 15rpx 0">
                <div class="myList">
                    <div class="item">
                        <div class="label">{{$t('common.检验员编号')}} :</div>
                        <div class="value">
                            <u--input v-model="checkForm.STAFF_NO" @confirm="CheckResultBadproblems"></u--input>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">{{$t('common.姓名')}} :</div>
                        <div class="value">
                            {{checkForm.STAFF_NAME}}
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">{{$t('common.检验日期')}} :</div>
                        <div class="value">
                            {{checkForm.MODIFYDATE}}
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">{{$t('common.检验数')}} :</div>
                        <div class="value">
                            {{matFrom.RCPT_QTY}}
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">{{$t('common.合格数')}} :</div>
                        <div class="value">
                            <u--input v-model="checkForm.PASS_QTY" type="number" @blur="checkForm.PASS_QTY=checkForm.PASS_QTY||0" :formatter="formatter"></u--input>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">{{$t('common.不合格数')}} :</div>
                        <div class="value">
                            {{badNum}}
                        </div>
                    </div>
                    <div class="item item2">
                        <div class="value">
                            <u--textarea v-model="checkForm.REMARK" :placeholder="$t('common.备注')"></u--textarea>
                        </div>
                    </div>

                </div>
            </uni-card>
            <uni-card margin=" 0 0 15rpx 0">
                <div class="myList">
                    <div class="item item2">
                        <div class="label">{{$t('common.检验水平')}} :</div>
                        <div class="value">
                            <mySelect @confirm="confirmRankShow" :list="rankList" labelName="ENUM_VALUE" valueName="ENUM_CODE" v-model="checkForm.curRank" type="picker"></mySelect>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">{{$t('common.AQL级别')}} :</div>
                        <div class="value">
                            <mySelect @confirm="confirmaqlShow" :list="AQLList" labelName="ENUM_VALUE" valueName="ENUM_CODE" v-model="checkForm.curRankAQL" type="picker"></mySelect>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">AC,RE:</div>
                        <div class="value">
                            <u--input v-model="checkForm.AC_RE" disabled></u--input>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">{{$t('common.抽样数量')}}:</div>
                        <div class="value">
                            <u--input v-model="checkForm.SAMPLE_QTY" disabled></u--input>
                        </div>
                    </div>
                </div>
            </uni-card>
            <div class="list">
                <div class="item u-border" v-for='(e,i) in testList' :key='i'>
                    <div class="itemBox">{{e.INSPECTION_NAME }}</div>
                    <div class="itemBox inf">{{e.INSPECTION_STANDARD}}</div>
                    <div class="itemBox checkResult">
                        <div class="label">{{$t('common.检验结果')}}:</div>
                        <div class="value">
                            <u-radio-group v-model="e.DETERMINE" placement="row">
                                <u-radio :customStyle="{margin: '10rpx'}" v-for="(item, index) in radiolist" :key="index" :label="item.name" :name="item.prop"></u-radio>
                            </u-radio-group>
                        </div>
                    </div>
                    <div class="itemBox img">
                        <upload :fileList="e.imgList" :maxCount="3"></upload>
                    </div>
                    <div class="itemBox remark">
                        <u-input :placeholder="$t('common.请选择不良代码')" v-model="e.BADPROBLEM_CODE" suffixIcon="arrow-down" readonly @click.native="currentItem=e,badShow=true"></u-input>
                    </div>
                    <div class="itemBox remark">
                        <u--textarea v-model="e.REMARKS" disabled :placeholder="$t('common.不良原因')"></u--textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="hand">
            <div class="result">{{$t('common.判定')}}: <span :class="checkForm.DETERMINE==1?'err':'suc'">{{checkForm.DETERMINE==1?'FAIL':'PASS'}}</span></div>
            <div class="btn">
                <u-button @click="submit" :loading="loading" type="primary" :text="$t('common.提交')"></u-button>
            </div>
        </div>
        <searchPopup :show.sync="badShow" apiName="CheckResultBadproblems" label="BADPROBLEM_CODE" value="BADPROBLEM_NAME" @confirm="badConfirm"></searchPopup>
    </div>
</template>
<script>
import { uploadFilePromise } from '@/util'
export default {
    name: 'matCheckDetail',
    data() {
        return {
            matFrom: {
                RCPT_QTY: 0

            },
            checkForm: {
                curRank: {},
                curRankAQL: {},
                RCPT_QTY: 0,
                PASS_QTY: 0,
                DETERMINE: '',
                STAFF_NAME: '',
                STAFF_NO: '',
                AC_RE: "",
                AQL_LEVEL: 13,
                BAD_QTY: "",
                CHK_NO: "",
                CHK_SEQ: '',
                CLOSING_STATUS: '',
                ITEM_NO: "",
                MODIFYDATE: "",
                REMARK: '',
                SAMPLE_QTY: '',
                TESTLEVEL: 2,

            },
            radiolist: [
                {
                    name: 'PASS',
                    prop: '0'
                },
                {
                    name: 'FAIL',
                    prop: '1'
                },
            ],
            testList: [],
            rankList: [
            ],
            AQLList: [],
            rankShow: false,
            aqlShow: false,
            badShow: false,
            loading: false,
            currentItem: {},
            query: {},
            curSTAFF_NO: '',
        }
    },
    watch: {
        testList: {
            deep: true,
            handler(newValue, oldValue) {
                this.checkForm.DETERMINE = newValue.some(e => e.DETERMINE == 1) ? 1 : 0
            },
        }
    },
    computed: {
        badNum() {
            return Math.round((this.matFrom.RCPT_QTY - this.checkForm.PASS_QTY) * 100) / 100
        }

    },
    methods: {
        badConfirm(item) {
            Object.assign(this.currentItem, item)
            this.currentItem.REMARKS = this.currentItem.BADPROBLEM_NAME
        },
        formatter(val) {
            if (!val) return val
            val < 0 && val != '' && (val = 0)
            val > +this.matFrom.RCPT_QTY && (val = +this.matFrom.RCPT_QTY)
            return val || 0
        },
        CheckResultBadproblems() {
            let data = {
                STAFF_NO: this.checkForm.STAFF_NO
            }
            this.$apis.CheckResultPDAYCLViewUser(data).then((res) => {
                console.log(data, res, '获取检验员详情')
                this.curSTAFF_NO = res.RetData1.USER_SYS[0].STAFF_NO
                Object.assign(this.checkForm, res.RetData1.USER_SYS[0])
            }).catch((err) => {
                console.error(err);
            })
        },
        getData() {
            this.$apis.CheckResultPDAYCLViewB({
                "CHK_NO": this.query.CHK_NO,
                "ITEM_NO": this.query.ITEM_NO,
                "CHK_SEQ": this.query.CHK_SEQ
            }).then((res) => {
                console.log(res, '获取原材料详情')
                try {
                    Object.assign(this.matFrom, res.RetData1.top[0])
                    Object.assign(this.checkForm, res.RetData1.center[0])

                    res.RetData1.center.length || (this.checkForm.PASS_QTY = this.matFrom.RCPT_QTY)
                    this.testList = res.RetData1.bottom
                    this.curSTAFF_NO = this.checkForm.STAFF_NO,
                        this.getList()
                    this.testList.forEach((e, i) => {
                        e.imgList = e.IMAGE_LIST
                        e.DETERMINE = e.DETERMINE || '0'
                    })
                } catch (error) {
                    console.error(error);
                }

            }).catch((err) => {
            })
        },
        submit() {
            //先验证数据是否填写
            if (!this.checkForm.STAFF_NO) return uni.$u.toast(this.$t('common.请填写检验员编号'))
            if (this.checkForm.STAFF_NO !== this.curSTAFF_NO) return uni.$u.toast(this.$t('common.检验员编号和姓名不匹配'))
            // if (!this.checkForm.AC_RE || this.checkForm.SAMPLE_QTY == "") return uni.$u.toast(this.$t('common.请确认信息是否填写完整'))
            if (!this.checkForm.AC_RE) return uni.$u.toast(this.$t('common.请确认信息是否填写完整'))
            if (this.testList.some(e => !e.DETERMINE)) return uni.$u.toast(this.$t('common.请确认检验项是否填写完整'))
            this.checkForm.CHK_NO = this.query.CHK_NO
            this.checkForm.RCPT_QTY = this.matFrom.RCPT_QTY
            this.loading = true
            this.$apis.CheckResultPDAYCLAdd({
                bottom: this.testList,
                center: this.checkForm
            }).then((res) => {
                console.log(res, '保存')
                this.$refs.uToast.show({
                    type: 'success',
                    message: this.$t('common.操作成功'),
                    duration: 1000,
                    complete() {
                        this.loading = false
                        uni.navigateBack()//返回上一页
                    }
                })
            }).catch((err) => {
                // uni.$u.toast('提交失败')
                this.loading = false
            })


        },
        groupChange(n) {

        },
        confirmRankShow(obj) {
            this.checkForm.TESTLEVEL = obj.ENUM_CODE
            this.checkForm.curRankAQL.ENUM_CODE && this.getAc()
        },
        confirmaqlShow(obj) {
            this.checkForm.AQL_LEVEL = obj.ENUM_CODE
            this.checkForm.curRank.ENUM_CODE && this.getAc()
        },
        getList() {
            this.$apis.GetAQLEnum().then((res) => {
                console.log(res, '获取下拉列表')
                this.rankList = res.RetData.AQL_Level
                this.AQLList = res.RetData.AQL_Rank
                this.checkForm.TESTLEVEL && (this.checkForm.curRank = this.rankList.find(e => e.ENUM_CODE == this.checkForm.TESTLEVEL))
                this.checkForm.AQL_LEVEL && (this.checkForm.curRankAQL = this.AQLList.find(e => e.ENUM_CODE == this.checkForm.AQL_LEVEL))
                this.getAc()
            }).catch((err) => {
            })
        },
        getAc() {
            this.$apis.GetAQLAcRe({
                "level_code": this.checkForm.curRank.ENUM_CODE,
                "rank_code": this.checkForm.curRankAQL.ENUM_CODE,
                "qty": this.matFrom.RCPT_QTY
            }).then((res) => {
                console.log(res, '获取ac值')
                this.checkForm.SAMPLE_QTY = res.RetData1.sample_qty
                this.checkForm.AC_RE = res.RetData1.AC_RE
            }).catch((err) => {
            })
        },
        async afterRead(event, row) {
            this.show = false
            event.file.forEach((e, i) => {
                uploadFilePromise(e.url).then((res) => {
                    let returnObj = JSON.parse(res.data).returnObj
                    row.imgList.push({ image_url: returnObj.url, url: e.url, guid: returnObj.guid })
                    this.show = true
                    console.log(returnObj, row, '上传')
                }).catch((err) => {
                    console.log(err);
                })
            })

        },

        deletePic(event, row) {
            row.imgList.splice(event.index, 1)
        },
    },
    onShow() {

    },
    onLoad(query) {
        this.query = query
        this.checkForm.ITEM_NO = this.query.ITEM_NO
        this.checkForm.CHK_SEQ = this.query.CHK_SEQ
        this.getData()

    }
}
</script>
<style lang='scss' scoped>
.matCheckDetail {
    padding-bottom: 50rpx;
    .content {
        padding: 15rpx;
        .list {
            .item {
                background: #fff;
                border-radius: 5rpx;
                padding: 15rpx;
                margin-bottom: 15rpx;
                .itemBox {
                    margin-bottom: 10rpx;
                }
                .checkResult {
                    display: flex;
                    align-items: center;
                    .label {
                        margin-right: 5rpx;
                    }
                }
            }
        }
    }

    .hand {
        z-index: 5;
        position: fixed;
        bottom: 0;
        width: 100%;
        padding-left: 15rpx;
        background: #fff;
        display: flex;
        align-items: center;
        .result {
            width: 30%;
            font-size: 14px;
            span {
                font-size: 30px;
                margin-left: 10rpx;
                font-weight: 600;
            }
        }
        .btn {
            flex: 1;
        }
    }
}
</style>