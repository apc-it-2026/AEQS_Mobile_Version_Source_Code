<template>
    <div class='RQC'>
        <u-navbar border title="RQC" :leftText="$t('common.返回')" placeholder autoBack>
            <u-button type="success" size="small" icon="plus" slot="right" :text="$t('common.新增')" @click="toPage('add','')"></u-button>
        </u-navbar>
        <u-collapse :value="$t('common.搜索筛选')" accordion>
            <u-collapse-item :title="$t('common.搜索筛选')" :name="$t('common.搜索筛选')">
                <div class="search myList">
                    <div class="item2">
                        <div class="label">{{$t('common.日期')}}</div>
                        <div class="value">
                            <uni-datetime-picker :start-placeholder="$t('common.开始日期')"  :end-placeholder="$t('common.结束日期')" v-model="searchForm.date" type="daterange" :rangeSeparator="$t('common.至')" />
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">{{$t('common.组别')}}</div>
                        <div class="value">
                            <scan v-model="searchForm.production_line_code"></scan>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">{{$t('common.鞋型')}}</div>
                        <div class="value">
                            <u-input v-model="searchForm.shoe_no" clearable> </u-input>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">ART</div>
                        <div class="value">
                            <u-input v-model="searchForm.prod_no" clearable> </u-input>
                            <!-- <mySelect :list="artList" v-model="searchForm.art" valueName="prod_no" labelName="prod_no" type="checkbox"></mySelect> -->
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">PO</div>
                        <div class="value">
                            <u-input v-model="searchForm.po" clearable> </u-input>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">{{$t('common.工段')}}</div>
                        <div class="value">
                            <mySelect :list="workshop_sectionList" v-model="searchForm.workshop_section" valueName="workshop_section_no" labelName="workshop_section_name" type="checkbox"></mySelect>
                        </div>
                    </div>

                    <div class="item">
                        <div class="label">{{$t('common.部门')}}</div>
                        <div class="value">
                            <mySelect :list="departmentList" labelName="department" valueName="department" v-model="searchForm.department" type="checkbox"></mySelect>
                        </div>
                    </div>
                    <div class="item2">
                        <div class="label"></div>
                        <div class="value btnList">
                            <u-button class="btn" size='small' color="#909399" type="warning" @click="reset" :text="$t('common.重置筛选')"></u-button>
                            <u-button class="btn" size='small' type="primary" @click="onSearch" :text="$t('common.搜索')"></u-button>
                        </div>
                    </div>
                </div>
            </u-collapse-item>
        </u-collapse>
        <div class="content">
            <list ref="list" :handlerItem="handlerItem" :option="option" :otherData="otherData">
                <template v-slot="{item}">
                    <div class="myList box" @click="toPage('edit',item)">
                        <div class="item2">
                            <div class="label">{{$t('common.日期')}}:</div>
                            <div class="value">{{item.createdate}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.部门')}}:</div>
                            <div class="value">{{item.department}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.组别')}}:</div>
                            <div class="value">{{item.production_line_code}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.鞋型')}}:</div>
                            <div class="value">{{item.shoe_name}}</div>
                        </div>
                        <div class="item">
                            <div class="label">ART:</div>
                            <div class="value">{{item.prod_no}}</div>
                        </div>
                        <div class="item">
                            <div class="label">PO:</div>
                            <div class="value">{{item.mer_po}}</div>
                        </div>
                        <!-- <div class="item">
                            <div class="label">检验类型:</div>
                            <div class="value">{{item.check_type}}</div>
                        </div> -->
                        <div class="item">
                            <div class="label">{{$t('common.抽验数量')}}:</div>
                            <div class="value">{{item.aql_qty}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.合格数量')}}:</div>
                            <div class="value">{{item.qty}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.合格率')}}:</div>
                            <div class="value">{{item.qty_percent}}</div>
                        </div>
                        <!-- <div class="item">
                            <div class="label">判定结果:</div>
                            <div class="value" :class="item.result=='pass'?'suc':'err'">{{item.result}}</div>
                        </div> -->
                        <div class="item">
                            <div class="label">{{$t('common.备注')}}:</div>
                            <div class="value">{{item.res_remark}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.状态')}}:</div>
                            <div class="value" :class="item.task_state=='进行中'?'suc':''">{{item.task_state}}</div>
                        </div>
                    </div>
                </template>
            </list>
        </div>
    </div>
</template>
<script>
export default {
    name: 'RQC',
    data() {
        return {
            searchForm: {
                date: [],
                production_line_code: '',
                shoe_no: '',
                prod_no: "",
                po: '',
                workshop_section: {
                    workshop_section_name: [],
                    workshop_section_no: [],
                    checkedList: []
                },
                department: {
                    department: [],
                    checkedList: []
                },
            },
            // artList: [],
            workshop_sectionList: [],
            departmentList: [],
            option: {
                getDataName: 'Rqc_taskBase_Main_view',//获取列表数据的方法名
                delName: 'Rqc_taskBase_Main_delete_task_no',//删除数据的方法名
                delData: {//删除数据需要的参数
                    prop: 'task_no',//删除数据的对应字段名
                    value: 'task_no',//删除数据的对应值的字段名
                },
                page: {//page对应的参数
                    page: 'page',//页码对应字段名
                    pageRow: 'pageRow',//页尺寸的字段名
                },
            },
            handlerItem(arr) {
                arr.forEach((e, i) => {
                    e.del_show = e.task_state != '已结束'
                })
            }
        }
    },
    computed: {
        otherData: function () {
            return {
                "putin_date": this.searchForm.date[0] || '',
                "end_date": this.searchForm.date[1] || '',
                "shoe_no": this.searchForm.shoe_no,
                "mer_po": this.searchForm.po,
                "prod_no": this.searchForm.prod_no ? [this.searchForm.prod_no] : [],
                "workshop_section_no": this.searchForm.workshop_section.workshop_section_no,
                "department": this.searchForm.department.department,
                "production_line_code": this.searchForm.production_line_code,
            }
        }
    },
    methods: {
        reset() {
            this.searchForm = uni.$u.deepClone(this.oldSearchForm)
            this.onSearch()
        },
        toPage(type, item) {
            if (item.task_state == '已结束') type = 'see'
            uni.navigateTo({ url: `/pages/RQC/RQCDetail?type=${type}&task_no=${item.task_no}` })
        },

        onSearch() {
            this.$nextTick(() => this.$refs.list.init())
        },
        Rqc_taskBase_getworkshop_mainlist() {
            let data = {
                "shoe_no": ""
            }
            this.$apis.Rqc_taskBase_getworkshop_mainlist(data).then((res) => {
                console.log(data, res, 'RQC获取主页工段列表')
                this.workshop_sectionList = res.RetData1
            }).catch((err) => {
                console.error(err);
            })

        },
        Rqc_taskBase_production_branch_list() {
            let data = {
                "value": "",//没值带全部，有值带查询
                production_line_code: ''
            }
            this.$apis.Rqc_taskBase_production_branch_list(data).then((res) => {
                console.log(data, res, 'RQC获取部门列表')
                this.departmentList = res.RetData1
            }).catch((err) => {
                console.error(err);
            })
        },
        // Rqc_taskBase_getart_mainlist() {
        //     let data = {
        //         "prod_no": "",//没值带全部，有值带查询
        //     }
        //     this.$apis.Rqc_taskBase_getart_mainlist(data).then((res) => {
        //         console.log(data, res, 'RQC获取主页art列表')
        //         this.artList = res.RetData1
        //     }).catch((err) => {
        //         console.error(err);
        //     })
        // },
    },
    onLoad(query) {
        this.oldSearchForm = uni.$u.deepClone(this.searchForm)
        this.Rqc_taskBase_getworkshop_mainlist()
        this.Rqc_taskBase_production_branch_list()
        // this.Rqc_taskBase_getart_mainlist()
    },
    onShow() {
        this.onSearch()
    }

}
</script>
<style lang='scss' scoped>
.RQC {
    /deep/ .u-collapse {
        background: #fff;
    }
    .myList {
        .label {
            width: 120rpx;
        }
    }
    .btnList {
        display: flex;
        .btn {
            margin-right: 10rpx;
            &:last-child {
                margin: 0;
            }
        }
    }
    .content {
        padding: 15rpx;
        .box {
            // .item {
            //     width: 25%;
            // }
            // .item2 {
            //     width: 50%;
            // }
        }
    }
}
</style>