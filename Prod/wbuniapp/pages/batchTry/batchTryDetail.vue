<template>
    <div class='batchTryDetail'>
        <u-navbar border :title="$t('batchTry.量试管理')" :leftText="$t('common.返回')" placeholder autoBack>
            <u-button type="success" size="small" icon="plus" slot="right" :text="$t('common.新增')" @click="add()"></u-button>
        </u-navbar>
        <u-collapse ref="Collapse" :value="[$t('common.基本信息')]">
            <u-collapse-item :title="$t('common.基本信息')" :name="$t('common.基本信息')">
                <uni-card margin="0">
                    <div class="myList">
                        <div class="item">
                            <div class="label">ART:</div>
                            <div class="value"> {{prod_no}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.季度')}}:</div>
                            <div class="value">{{baseData.develop_season}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.鞋型名称')}}:</div>
                            <div class="value">{{baseData.shoe_name}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.开发课')}}:</div>
                            <div class="value">{{baseData.user_section}}</div>
                        </div>
                        <div class="item">
                            <div class="label">category:</div>
                            <div class="value">{{baseData.rule_no}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.鞋型负责人')}}:</div>
                            <div class="value">{{baseData.user_in_shoecharge}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.测试级别')}}:</div>
                            <div class="value">{{baseData.test_level}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.开发技术负责人')}}:</div>
                            <div class="value">{{baseData.user_technical}}</div>
                        </div>
                        <div class="item">
                            <div class="label">PB Type:</div>
                            <div class="value">{{baseData.develop_type}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.DQA鞋型负责人')}}:</div>
                            <div class="value">{{baseData.qa_principal}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.预告订单')}}:</div>
                            <div class="value">{{baseData.col1}}</div>
                        </div>
                        <div class="item2">
                            <div class="value">
                                <seeDownFile :fileList="baseData.file_list"></seeDownFile>
                            </div>
                        </div>
                    </div>
                </uni-card>
            </u-collapse-item>
        </u-collapse>
        <!--新增  -->
        <u-popup :show="addShow" @close="addShow=false" :round="10" closeOnClickOverlay>
            <div class="add p15">
                <div class="myList">
                    <div class="item2">
                        <div class="label">{{$t('common.图片')}}:</div>
                        <div class="value">
                            <upload :fileList="addForm.img_list" :maxCount="1"></upload>
                        </div>
                    </div>
                    <div class="item2">
                        <div class="label">{{$t('common.材料部件名称')}}:</div>
                        <div class="value">
                            <mySelect getFirst apiName="batchTry_Getchoice" labelName="choice_name" valueName="choice_no" :otherData="{workshop_section_no:workshop_section.value}" v-model="addForm.choiceObj" type="search"></mySelect>
                        </div>
                    </div>
                    <div class="item2">
                        <div class="label">{{$t('common.检验项目')}}:</div>
                        <div class="value">
                            <mySelect getFirst apiName="batchTry_Getinspection" labelName="inspection_name" valueName="inspection_code" :otherData="{workshop_section_no:workshop_section.value}" v-model="addForm.inspectionObj" type="search"></mySelect>
                        </div>
                    </div>
                    <div class="item2">
                        <div class="label">{{$t('common.备注')}}:</div>
                        <div class="value">
                            <u--textarea v-model="addForm.remark" :placeholder="$t('common.备注')"></u--textarea>
                        </div>
                    </div>
                    <div class="item2">
                        <div class="label">{{$t('common.其他措施')}}:</div>
                        <div class="value">
                            <u--textarea v-model="addForm.other_measures" :placeholder="$t('common.其他措施')"></u--textarea>
                        </div>
                    </div>
                    <div class="item2">
                        <div class="value table">
                            <uni-table border :loading="loading">
                                <uni-tr>
                                    <uni-th width="80">{{$t('common.检验总数')}}</uni-th>
                                    <uni-th>{{$t('common.合格数量')}}</uni-th>
                                    <uni-th>{{$t('common.不良问题描述')}}</uni-th>
                                    <uni-th>{{$t('common.图片')}}</uni-th>
                                    <uni-th>{{$t('common.检验结果')}}</uni-th>
                                </uni-tr>
                                <uni-tbody height="30vh">
                                    <uni-tr>
                                        <uni-td width="80">
                                            <u--input type="number" v-model="addForm.check_qty"> </u--input>
                                        </uni-td>
                                        <uni-td>
                                            <u--input type="number" v-model="addForm.qty"> </u--input>
                                        </uni-td>
                                        <uni-td>
                                            <u--input v-model="addForm.bad_descr"> </u--input>
                                        </uni-td>
                                        <uni-td>
                                            <upload :fileList="addForm.img_list2"></upload>
                                        </uni-td>
                                        <uni-td>
                                            <mySelect :list="check_resList" v-model="addForm.check_resObj" type="action"></mySelect>
                                        </uni-td>

                                    </uni-tr>
                                </uni-tbody>
                            </uni-table>
                        </div>
                    </div>
                    <div class="item2">
                        <div class="value">
                            <div class="btnList">
                                <u-button type="success" @click="addConfirm" :text="$t('common.确认新增')"></u-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </u-popup>
        <!-- 下拉筛选 -->
        <!-- <u-sticky class="p15"> -->
        <div class="p15">
            <mySelect class="search" @confirm="getData" getFirst apiName="batchTry_GetPilotRun_Edit_Workshop" v-model="workshop_section" type="search"></mySelect>
        </div>
        <!-- </u-sticky> -->
        <!-- 列表数据 -->
        <div class="content p15">
            <list noHover ref="list" :handlerItem="handlerItem" :option="option" :otherData="otherData">
                <template v-slot="{item,index}">
                    <div class="myList">
                        <div class="item2">
                            <div class="label">{{$t('common.图片')}}:</div>
                            <div class="value">
                                <upload :fileList="item.img_list" disabled></upload>
                            </div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.材料部件名称')}}:</div>
                            <div class="value">{{item.choice_name}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.检验项目')}}:</div>
                            <div class="value">{{item.inspection_name}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.外观检验')}}:</div>
                            <div class="value">{{item.enum_value}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.标准')}}:</div>
                            <div class="value">{{item.standard_value}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.单位')}}:</div>
                            <div class="value">{{item.unit}}</div>
                        </div>
                        <div class="item2">
                            <div class="label">{{$t('common.备注')}}:</div>
                            <div class="value">{{item.remark}}</div>
                        </div>
                        <div class="item2">
                            <div class="label">{{$t('common.其他措施')}}:</div>
                            <div class="value">{{item.other_measures}}</div>
                        </div>
                        <div class="item2">
                            <div class="value">
                                <u-divider :text="$t('common.检验录入')"></u-divider>
                            </div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.检验总数')}}:</div>
                            <div class="value">
                                <u--input type="number" v-model="item.check_qty"> </u--input>
                            </div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.合格数量')}}:</div>
                            <div class="value">
                                <u--input type="number" v-model="item.qty"> </u--input>
                            </div>
                        </div>
                        <div class="item2">
                            <div class="label">{{$t('common.检验结果')}}:</div>
                            <div class="value">
                                <mySelect :list="check_resList" v-model="item.check_resObj" type="action"></mySelect>
                            </div>
                        </div>
                        <div class="item2">
                            <div class="label">{{$t('common.不良问题描述')}}:</div>
                            <div class="value">
                                <u--input v-model="item.bad_descr"> </u--input>
                            </div>
                        </div>
                        <div class="item2">
                            <div class="label">{{$t('common.检验图片')}}:</div>
                            <div class="value">
                                <upload :fileList="item.img_list2"></upload>
                            </div>
                        </div>
                        <div class="item2">
                            <div class="btnList">
                                <u-button class="btn" type="primary" @click="getHistory(item)" :text="$t('common.查看历史')"></u-button>
                                <seeDownFile class="btn" :fileList="item.file_list"></seeDownFile>
                                <u-button type="success" class="btn" :loading="loading" :text="$t('common.保存')" @click="listSave(item)"></u-button>
                                <u-button type="error" v-if="item.ifls == 'true'" class="btn" :loading="loading" :text="$t('common.删除')" @click="del(item,index)"></u-button>
                            </div>
                        </div>
                    </div>
                </template>
            </list>
        </div>
        <!-- 查看历史 -->
        <u-popup :show="historyShow" @close="historyShow=false" :round="10" closeOnClickOverlay>
            <div class="history">
                <div class="talbe">
                    <uni-table border :loading="loading">
                        <uni-tr>
                            <uni-th width="80">{{$t('common.检验总数')}}</uni-th>
                            <uni-th>{{$t('common.合格数量')}}</uni-th>
                            <uni-th>{{$t('common.不良问题描述')}}</uni-th>
                            <uni-th>{{$t('common.图片')}}</uni-th>
                            <uni-th>{{$t('common.检验结果')}}</uni-th>
                        </uni-tr>
                        <uni-tbody height="80vh">
                            <uni-tr v-for='(item,i) in historyList' :key='i'>
                                <uni-td width="80">
                                    {{item.check_qty}}
                                </uni-td>
                                <uni-td>
                                    {{item.qty}}
                                </uni-td>
                                <uni-td>
                                    {{item.bad_descr}}
                                </uni-td>
                                <uni-td>
                                    <upload :fileList="item.file_list" disabled></upload>
                                </uni-td>
                                <uni-td>
                                    {{item.check_res==0?'pass':'fail'}}
                                </uni-td>
                            </uni-tr>
                        </uni-tbody>
                    </uni-table>
                </div>
            </div>
        </u-popup>
    </div>
</template>
<script>
export default {
    name: 'batchTryDetail',
    computed: {
        otherData: function () {
            return {
                "shoes_code": this.shoes_code,
                "workshop_section_no": this.workshop_section.value,
            }
        }
    },
    data() {
        return {
            loading: false,//加载中
            addShow: false,//新增显示
            historyShow: false,//查看历史
            shoes_code: "",//鞋型代号
            mid: "",//主任务id
            prod_no: "",//ART代号
            prod_name: "",//ART名称
            choiceList: [],//材料列表
            historyList: [],//历史数据
            check_resList: [//检验结果下拉列表
                {
                    label: 'pass',
                    value: '0',
                },
                {
                    label: 'fail',
                    value: '1',
                },

            ],
            baseData: {},//基础数据
            addForm: {//新增数据
                img_list: [],
                img_list2: [],
                choiceObj: {
                    choice_name: '',
                    choice_no: '',
                },
                inspectionObj: {
                    inspection_name: '',
                    inspection_code: '',
                },
                remark: "",
                other_measures: "",
                check_qty: "",
                qty: "",
                bad_descr: "",
                check_resObj: {
                    label: 'pass',
                    value: '0',
                },
            },
            workshop_section: {//工段选择
                label: "",
                value: "",
            },
            option: {//列表数据配置
                getDataName: 'batchTry_GetPilotRun_Edit',//获取列表数据的方法名
                delName: '',//删除数据的方法名
                delData: {//删除数据需要的参数
                    prop: 'lsid',//删除数据的对应字段名
                    value: 'id',//删除数据的对应值的字段名
                },
                page: {//page对应的参数
                    page: 'page',//页码对应字段名
                    pageRow: 'pageRow',//页尺寸的字段名
                },
            },
            handlerItem(arr) {
                arr.forEach((e, i) => {
                    // e.del_show = e.ifls == 'true'
                    e.url && (e.img_list = [{
                        url: uni.getStorageSync('imgUrl') + e.url
                    }])
                    //没返回默认值
                    e.check_resObj = {
                        label: e.check_res == 1 ? 'fail' : 'pass',
                        value: e.check_res || 0,
                    }
                    e.img_list2 = e.img_list2 || []
                })

            }

        }
    },

    methods: {
        getBaseData() {//获取基础信息
            let data = {
                "prod_no": this.prod_no
            }
            this.$apis.batchTry_GetPilotRun_art_Detail(data).then((res) => {
                this.baseData = res.data && res.data[0] || res
                this.$nextTick(() => {
                    this.$refs.Collapse.init()
                })
            }).catch((err) => {
                console.error(err);
            })
        },
        changeFiexd(item, flag) {//切换禁用状态
            item.del_show = flag
        },
        add() {//新增
            this.addShow = true
            this.addForm = uni.$u.deepClone(this.oldAddForm)
        },
        addConfirm() {//确认新增
            //验证
            // if (!this.addForm.img_list.length) return uni.$u.toast('请上传图片')
            if (!this.addForm.check_qty) return uni.$u.toast(this.$t('batchTry.请输入检验总数'))
            if (!this.addForm.qty) return uni.$u.toast(this.$t('batchTry.请输入合格数量'))
            this.loading = true
            let data = {
                "ifls": 'true',
                "mid": this.mid,
                "id": "",
                "shoes_code": this.shoes_code,
                "datahead": {
                    "image_guid": this.addForm.img_list.length ? this.addForm.img_list[0].guid : '',
                    "choice_no": this.addForm.choiceObj.choice_no,
                    "choice_name": this.addForm.choiceObj.choice_name,
                    "inspection_code": this.addForm.inspectionObj.inspection_code,
                    "inspection_type": this.addForm.inspectionObj.inspection_type,
                    "other_measures": this.addForm.other_measures,
                    "workshop_section_no": this.workshop_section.value,
                    "workshop_section_name": this.workshop_section.label,
                    "remark": this.addForm.remark
                },
                "databody": {
                    "check_qty": this.addForm.check_qty,
                    "qty": this.addForm.qty,
                    "bad_descr": this.addForm.bad_descr,
                    "check_res": this.addForm.check_resObj.value
                },
                "dataguid": this.addForm.img_list2 || []
            }
            this.$apis.batchTry_InsertPilotRun_Edit(data).then((res) => {
                uni.$u.toast(this.$t('common.新增成功'))
                this.addShow = false
                this.getData()
            }).catch((err) => {
                console.error(err);
            }).finally(() => {
                this.loading = false
            })
        },
        getData() {
            this.$refs.list.init()
        },
        listSave(item) {//列表数据保存
            //验证
            if (!item.check_qty) return uni.$u.toast(this.$t('batchTry.请输入检验总数'))
            if (!item.qty) return uni.$u.toast(this.$t('batchTry.请输入合格数量'))
            this.loading = true

            let data = {
                "ifls": item.ifls,
                "mid": this.mid,
                "id": item.id,
                "shoes_code": this.shoes_code,
                "datahead": {},
                "databody": {
                    "check_qty": item.check_qty,
                    "qty": item.qty,
                    "bad_descr": item.bad_descr || '',
                    "check_res": item.check_resObj.value
                },
                "dataguid": item.img_list2 || []
            }
            this.$apis.batchTry_InsertPilotRun_Edit(data).then((res) => {
                uni.$u.toast(this.$t('common.保存成功'))
                // this.getData()
            }).catch((err) => {
                console.error(err);
            }).finally(() => {
                this.loading = false
            })
        },
        getHistory(item) {//查看历史记录
            let data = {
                "ifls": item.ifls,
                "id": item.id,
                "keycode": "",
                "pageRow": "9999",
                "page": "1"
            }
            this.$apis.batchTry_GetPilotRun_Edit_History(data).then((res) => {
                this.historyList = res.Data
                this.historyShow = true
            }).catch((err) => {
                this.historyList = []
                console.error(err);
            })
        },
        del(item, index) {//删除
            let _this = this
            uni.showModal({
                confirmText:this.$t('common.确定'),
                cancelText:this.$t('common.取消'),
                content: this.$t('common.是否确定删除'),
                success(res) {
                    if (res.confirm) {
                        _this.$apis['batchTry_DeletePilotRun_Edit']({
                            lsid: item.id//当前列id
                        }).then((res) => {
                            _this.$refs.list.del(index)
                        }).catch((err) => {
                            _this.$u.toast(err || '删除失败')
                        })
                    }
                },
                fail() {
                }
            })


        }

    },
    onShow() {
    },
    onLoad(query) {
        this.shoes_code = query.shoes_code
        this.prod_no = query.prod_no
        this.mid = query.mid
        this.prod_name = query.prod_name
        this.oldAddForm = uni.$u.deepClone(this.addForm)
        this.getBaseData()
    }
}
</script>
<style lang='scss' scoped>
.batchTryDetail {
    .add {
        padding: 15rpx;
        .table {
            width: 100%;
        }
    }
    .search {
        background: #fff;
    }
    // /deep/.ani {
    //     transform: none;
    // }
    .content {
        .label {
            width: 120rpx;
        }
        .btnList {
            display: flex;
            width: 100%;
            .btn {
                margin: 0 5px;
                width: 100%;
            }
        }
    }
    .history {
        padding: 15rpx;
        .myList {
            background: #fff;
            margin-bottom: 15rpx;
            border-radius: 10rpx;
            padding: 15rpx;
            .talbe {
                width: 100%;
            }

            .btnList {
                display: flex;
                width: 100%;
                .btn {
                    margin: 0 5px;
                    width: 100%;
                }
            }
        }
    }
}
</style>