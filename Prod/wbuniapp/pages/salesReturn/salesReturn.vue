<template>
    <div class='salesReturn'>
        <u-navbar border :title="$t('common.中国退货数据录入')" :leftText="$t('common.返回')" placeholder autoBack>
            <u-button type="success" size="small" icon="plus" slot="right" :text="$t('common.新增')" @click="add()"></u-button>
        </u-navbar>
        <u-collapse :value="$t('common.搜索筛选')" accordion>
            <u-collapse-item :title="$t('common.搜索筛选')" :name="$t('common.搜索筛选')">
                <div class="myList">
                    <div class="item2">
                        <div class="label">{{$t('common.搜索关键字')}}</div>
                        <div class="value">
                            <scan @confirm="onSearch" @clear="onSearch" v-model="searchForm.keyword"> </scan>
                        </div>
                    </div>
                    <div class="item2">
                        <div class="label">{{$t('common.生产日期')}}</div>
                        <div class="value">
                            <uni-datetime-picker :start-placeholder="$t('common.开始日期')"  :end-placeholder="$t('common.结束日期')" v-model="searchForm.sc_date" type="daterange" :rangeSeparator="$t('common.至')" @change="val=>searchForm.sc_date=val" />
                        </div>
                    </div>
                    <div class="item2">
                        <div class="label">{{$t('common.录入日期')}}</div>
                        <div class="value">
                            <uni-datetime-picker :start-placeholder="$t('common.开始日期')"  :end-placeholder="$t('common.结束日期')" v-model="searchForm.lr_date" type="daterange" :rangeSeparator="$t('common.至')" @change="val=>searchForm.lr_date=val" />
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
        <!--列表  -->
        <div class="content p15">
            <list ref="list" :option="option" :otherData="otherData">
                <template v-slot="{item}">
                    <div class="myList2 box" @click="toPage('edit',item)">
                        <div class="item">
                            <div class="label">{{$t('common.录入时间')}}:</div>
                            <div class="value">{{item.createdate}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.任务编号')}}:</div>
                            <div class="value">{{item.task_no}}</div>
                        </div>
                        <div class="item">
                            <div class="label">po:</div>
                            <div class="value">{{item.po}}</div>
                        </div>
                        <div class="item">
                            <div class="label">art:</div>
                            <div class="value">{{item.prod_no}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.鞋型名称')}}:</div>
                            <div class="value">{{item.name_t}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.合并退货代码')}}:</div>
                            <div class="value">{{item.codeincode}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.退货数量')}}:</div>
                            <div class="value">{{item.out_qty}}</div>
                        </div>
                    </div>
                </template>
            </list>
        </div>
    </div>
</template>
<script>
export default {
    name: 'salesReturn',
    data() {
        return {
            searchForm: {//搜索数据
                keyword: '',
                sc_date: '',//生产日期
                lr_date: '',//录入日期
            },
            option: {
                getDataName: 'THSJ_PDA_MianGetList',//获取列表数据的方法名
                delName: 'THSJ_Delete_Main',//删除数据的方法名
                delData: {//删除数据需要的参数
                    prop: 'task_no',//删除数据的对应字段名
                    value: 'task_no',//删除数据的对应值的字段名
                },
                page: {//page对应的参数
                    page: 'page',//页码对应字段名
                    pageRow: 'pageRow',//页尺寸的字段名
                },
            },
        }
    },
    computed: {
        otherData: function () {
            return {
                "keyword": this.searchForm.keyword,
                "sc_date_opan": this.searchForm.sc_date[0] || '',
                "sc_date_end": this.searchForm.sc_date[1] || '',
                "lr_date_opan": this.searchForm.lr_date[0] || '',
                "lr_date_end": this.searchForm.lr_date[1] || '',
            }
        }
    },
    methods: {
        reset() {//重置筛选
            this.searchForm = uni.$u.deepClone(this.oldSearchForm)
            this.onSearch()
        },
        onSearch() {//搜索
            this.$nextTick(() => this.$refs.list.init())
        },
        add() {//新增
            this.toPage('add', '')
        },
        toPage(type, item) {
            uni.navigateTo({ url: `/pages/salesReturn/salesReturnDetail?type=${type}&task_no=${item.task_no}` })
        },
    },
    onLoad(query) {
        this.oldSearchForm = uni.$u.deepClone(this.searchForm)
    },
    onShow() {
        this.onSearch()
    }
}
</script>
<style lang='scss' scoped>
.salesReturn {
}
</style>