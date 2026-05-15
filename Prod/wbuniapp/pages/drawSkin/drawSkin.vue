<template>
    <div class='drawSkin'>
        <u-toast ref="uToast"></u-toast>
        <u-navbar :title="$t('common.画皮')" border :leftText="$t('common.返回')" placeholder autoBack>
            <u-button type="success" size="small" icon="plus" slot="right" :text="$t('common.新建画皮')" @click="addShow=true"></u-button>
        </u-navbar>
        <u-collapse :value="$t('common.搜索筛选')" accordion>
            <u-collapse-item :title="$t('common.搜索筛选')" :name="$t('common.搜索筛选')">
                <u--form ref="form" labelAlign="right" labelWidth='80'>
                    <u-form-item :label="$t('common.料号')" prop="料号">
                        <scan v-model="search.item_no" @clear="onSearch" @confirm="onSearch"></scan>
                    </u-form-item>
                    <u-form-item :label="$t('common.进仓日期')" prop="料号">
                        <u-cell-group :border="false">
                            <uni-datetime-picker :start-placeholder="$t('common.开始日期')"  :end-placeholder="$t('common.结束日期')"  v-model="search.dateArr" type="daterange" :rangeSeparator="$t('common.至')" @change="dateChange" />
                        </u-cell-group>
                    </u-form-item>
                </u--form>
                <u-search :actionText="$t('common.搜索')" :placeholder="$t('common.搜索')" @search="onSearch" :clearabled="true" v-model="search.keyWord" @clear="onSearch" @custom="onSearch"></u-search>
            </u-collapse-item>
        </u-collapse>
        <div class="listBox">
            <list ref="list" :option="option" :otherData="otherData" :handlerItem="handlerItem">
                <template v-slot="{item}">
                    <div class="box">
                        <div class="content myList" @click="toPage(item,1)">
                            <div class="item">
                                <div class="label">{{$t('common.任务编号')}}:</div>
                                <div class="value">{{item.TASK_NO}}</div>
                            </div>
                            <div class="item">
                                <div class="label">{{$t('common.生产厂商')}}:</div>
                                <div class="value">{{item.VEND_NAME}}</div>
                            </div>
                            <div class="item">
                                <div class="label">{{$t('common.料号')}}:</div>
                                <div class="value">{{item.ITEM_NO}}</div>
                            </div>
                            <div class="item">
                                <div class="label">{{$t('common.材料名称')}}:</div>
                                <div class="value">{{item.ITEM_NAME}}</div>
                            </div>
                            <div class="item">
                                <div class="label">{{$t('common.进仓时间范围')}}:</div>
                                <div class="value">{{item.WH_DATE}}</div>
                            </div>
                            <div class="item">
                                <div class="label">{{$t('common.买进皮料数量')}}:</div>
                                <div class="value">{{item.MTL_QTY}}</div>
                            </div>
                            <div class="item">
                                <div class="label">{{$t('common.已画皮数量')}}:</div>
                                <div class="value">{{item.YHP_QTY}}</div>
                            </div>
                            <div class="item">
                                <div class="label">{{$t('common.状态')}}:</div>
                                <div class="value" :class="traColor(item)">{{item.TASK_STATE}}</div>
                            </div>
                        </div>
                        <div class="btnList">
                            <u-button color="#0ab99c" :text="$t('common.查看进度')" @click="toPage(item,2)"></u-button>
                            <u-button type="primary" v-if="!item.ISBAOGAO" @click="toPage(item,3)" :text="$t('common.SATRA报告')"></u-button>
                        </div>
                    </div>
                </template>
            </list>
        </div>
        <u-popup :show="addShow" @close="addShow=false" round="10">
            <div class="form">
                <u--form :model="addForm" :rules="rules" ref="addForm" labelAlign="right" labelWidth='80'>
                    <u-form-item :label="$t('common.料号')" prop="ITEM_NO">
                        <!-- <u-cell-group :border="false">
                            <u-cell :title="addForm.ITEM_NO" isLink @click="addShow=false,matShow=true"></u-cell>
                        </u-cell-group> -->
                        <mySelect labelName="item_no" valueName="suppliers_name" titleName="name_t" apiName="GetPainted_Skin_Insert_item_PDA" v-model="addForm" type="search"></mySelect>
                    </u-form-item>
                    <u-form-item :label="$t('common.材料名称')" prop="材料名称">
                        <u--textarea v-model="addForm.NAME_T" disabled> </u--textarea>
                    </u-form-item>
                    <u-form-item :label="$t('common.生产厂商')" prop="生产厂商">
                        <u--input v-model="addForm.SUPPLIERS_NAME" disabled> </u--input>
                    </u-form-item>
                    <u-form-item :label="$t('common.进仓日期')" prop="dateArr">
                        <u-cell-group :border="false">
                            <uni-datetime-picker :start-placeholder="$t('common.开始日期')"  :end-placeholder="$t('common.结束日期')" v-model="addForm.dateArr" type="daterange" :rangeSeparator="$t('common.至')" @change="dateChange2" />
                        </u-cell-group>
                    </u-form-item>
                    <u-form-item :label="$t('common.材料数量')" prop="mtl_qty">
                        <u--input type="number" v-model="addForm.mtl_qty"> </u--input>
                    </u-form-item>
                </u--form>
                <u-button type="success" @click="submit">{{$t('common.提交')}}</u-button>
            </div>
        </u-popup>

    </div>
</template>
<script>
export default {
    name: 'drawSkin',
    data() {
        return {
            search: {
                item_no: "",
                keyWord: "",
                dateArr: [],
                page: 1,
                pageRow: 10,
            },
            keyword: '',
            status: 'loadmore',
            addShow: false,
            matShow: false,
            hidden: false,
            drawList: [],
            matList: [],
            addForm: {
                SUPPLIERS_NAME: "",
                ITEM_NO: "",
                NAME_T: "",
                keyWord: "",
                mtl_qty: "",
                dateArr: []
            },
            rules: {
                ITEM_NO: [
                    {
                        required: true,
                        message: this.$t('common.请先选择料号'),
                        trigger: ['blur', 'change']
                    }
                ],
                dateArr: [
                    {
                        type: 'array',
                        required: true,
                        message: this.$t('common.请选择进仓日期'),
                        trigger: ['blur', 'change']
                    }
                ],
                mtl_qty: [
                    {
                        required: true,
                        message: this.$t('common.请填写材料数量'),
                        trigger: ['blur', 'change']
                    }
                ],
            },
            option: {
                getDataName: 'GetPainted_Skin_Main_PDA',//获取列表数据的方法名
                delName: 'GetPainted_Skin_Main_Delete_PDA',//删除数据的方法名
                delData: {//删除数据需要的参数
                    prop: 'task_no',//删除数据的对应字段名
                    value: 'task_no',//删除数据的对应值的字段名
                },
                page: {//page对应的参数
                    page: 'pageIndex',//页码对应字段名
                    pageRow: 'pageSize',//页尺寸的字段名
                },
            },
            handlerItem(arr) {
                arr.forEach((e) => {
                    e.del_show = e.isdelete == 0
                })
            }
        }
    },
    computed: {
        otherData: function () {
            return {
                "item_no": this.search.item_no,
                "wh_date_start": this.search.dateArr[0],
                "wh_date_end": this.search.dateArr[this.search.dateArr.length - 1],
                "keyWord": this.search.keyWord,
            }
        }
    },
    methods: {

        toPage(item, type) {
            uni.navigateTo({ url: `/pages/drawSkin/drawSkinDetail?task_no=${item.TASK_NO}&type=${type}&item=${JSON.stringify(item)}` })
        },
        traColor(item) {
            try {
                return [{ n: 'inf', s: '初始化' }, { n: 'pri', s: '进行中' }, { n: 'suc', s: '已完成' }].find(e => e.s == item.TASK_STATE).n || 'inf'
            } catch (error) {
                return 'inf'
            }
        },
        submit() {
            this.$refs.addForm.validate().then(res => {
                this.$apis.InsertPainted_Skin_Insert_PDA({
                    "item_no": this.addForm.ITEM_NO,
                    "wh_date_start": this.addForm.dateArr[0],
                    "wh_date_end": this.addForm.dateArr[this.addForm.dateArr.length - 1],
                    "mtl_qty": this.addForm.mtl_qty
                }).then((res) => {
                    this.$refs.uToast.show({
                        type: 'success',
                        message: this.$t('common.新建成功'),
                    })
                    this.addShow = false
                    this.addForm = {
                        SUPPLIERS_NAME: "",
                        ITEM_NO: "",
                        NAME_T: "",
                        keyWord: "",
                        mtl_qty: "",
                        dateArr: []
                    }
                    this.onSearch()
                }).catch((err) => {
                    uni.$u.toast(err || '新增失败')
                })

            }).catch(errors => {
                uni.$u.toast(this.$t('common.请确认信息是否填写完整'))
            })

        },
        getMat(item) {
            Object.assign(this.addForm, item)
            this.matShow = false
            this.addShow = true
        },
        dateChange(val) {
            this.search.dateArr = val
            this.onSearch()

        },
        dateChange2(val) {
            this.addForm.dateArr = val
        },
        onSearch() {
            this.$nextTick(() => this.$refs.list.init())
        },
        GetPainted_Skin_Insert_item_PDA() {
            this.$apis.GetPainted_Skin_Insert_item_PDA({
                "keyWord": this.addForm.keyWord,
                "pageSize": "30",
                "pageIndex": "1"
            }).then((res) => {
                console.log(res, '获取物料列表')
                this.matList = res.RetData1.Data
            }).catch((err) => {
            })
        },
    },
    onShow() {
        this.onSearch()
        this.GetPainted_Skin_Insert_item_PDA()
    }
}
</script>
<style lang='scss' scoped>
.drawSkin {
    /deep/ .u-collapse {
        background: #fff;
    }
    .form {
        padding: 15rpx;
    }
    .mat {
        padding: 40rpx 20rpx;
    }
    /deep/ .searchPopup {
        .title {
            color: $u-info;
            font-size: 12px;
            margin-right: 5px;
        }
        .label {
            color: #00a4ff;
            margin-bottom: 5px;
        }
        .value {
        }
    }
    .listBox {
        padding: 15rpx;
        .box {
            border-radius: 5rpx;
            padding: 15rpx;
            display: flex;
            .content {
                flex: 1;
                display: flex;
                flex-wrap: wrap;

                .item {
                    display: flex;
                    align-items: center;
                    width: 50%;
                    // font-size: 14rpx;
                    .label {
                        // width: 100rpx;
                        // text-align: right;
                        // margin-right: 5rpx;
                    }
                    .value {
                        white-space: nowrap;
                        word-break: break-all;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        flex: 1;
                        max-width: 200rpx;
                    }
                }
            }
            .btnList {
                width: 20%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .u-button {
                    margin: 5rpx;
                }
            }
        }
    }
}
</style>