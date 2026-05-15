<template>
    <div class='qualityError'>
        <u-navbar border :title="$t('common.品质异常')" :leftText="$t('common.返回')" placeholder autoBack>
            <u-button type="success" size="small" icon="plus" slot="right" :text="$t('common.新增')" @click="add()"></u-button>
        </u-navbar>
        <u-collapse :value="$t('common.搜索筛选')" accordion>
            <u-collapse-item :title="$t('common.搜索筛选')" :name="$t('common.搜索筛选')">
                <div class="myList">
                    <div class="item2">
                        <div class="label">{{$t('common.搜索关键字')}}</div>
                        <div class="value">
                            <u-input v-model="searchForm.keyword" clearable> </u-input>
                        </div>
                    </div>
                    <div class="item2">
                        <div class="label">{{$t('common.异常级别')}}</div>
                        <div class="value">
                            <mySelect :list="abnormal_levelList" v-model="searchForm.abnormal_levelObj" type="action"></mySelect>
                        </div>
                    </div>
                    <div class="item2">
                        <div class="label">{{$t('common.日期')}}</div>
                        <div class="value">
                            <uni-datetime-picker :start-placeholder="$t('common.开始日期')"  :end-placeholder="$t('common.结束日期')" v-model="searchForm.date" type="daterange" :rangeSeparator="$t('common.至')" @change="val=>searchForm.date=val" />
                        </div>
                    </div>
                    <div class="item2">
                        <div class="label"></div>
                        <div class="value">
                            <u-button type="primary" color="#0ab99c" icon="scan" :text="$t('common.扫码')" @click="scan()"></u-button>
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
                            <div class="label">art:</div>
                            <div class="value">{{item.prod_no}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.责任部门')}}:</div>
                            <div class="value">{{item.department_name}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.问题级别')}}:</div>
                            <div class="value">{{item.abnormal_level_name}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.日期')}}:</div>
                            <div class="value">{{item.createdate}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.问题描述')}}:</div>
                            <div class="value">{{item.problem_desc}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.状态')}}:</div>
                            <div class="value" :class="item.closing_status=='0'?'suc':'err'">{{item.closing_status_name}}</div>
                        </div>
                    </div>
                </template>
            </list>
        </div>
    </div>
</template>
<script>
export default {
    name: 'qualityError',
    data() {
        return {
            searchForm: {//搜索数据
                keyword: '',
                abnormal_levelObj: {
                    label: '',
                    value: '',
                },
                date: []
            },
            abnormal_levelList: [//异常级别列表
                {
                    label: this.$t('common.普通品质异常'),
                    value: '0',
                },
                {
                    label: this.$t('common.批量品质异常'),
                    value: '1',
                },
                {
                    label: this.$t('common.重大品质异常'),
                    value: '2',
                },
            ],
            option: {
                getDataName: 'qualityError_Qualityabnormal_Main_getList',//获取列表数据的方法名
                delName: '',//删除数据的方法名
                delData: {//删除数据需要的参数
                    prop: '',//删除数据的对应字段名
                    value: '',//删除数据的对应值的字段名
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
                "problem_desc": "",
                "prod_no": "",
                "putin_date": this.searchForm.date[0] || '',
                "end_date": this.searchForm.date[1] || '',
                "plant_area": "",
                "abnormal_level": this.searchForm.abnormal_levelObj.value || '',
                "department_code": "",
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
            uni.navigateTo({ url: `/pages/qualityError/qualityErrorDetail?type=${type}&task_no=${item.task_no}` })
        },
        scan() {//扫码
            console.log('扫描');
            // 允许从相机和相册扫码
            let _this = this
            uni.scanCode({
                success: function (res) {
                    console.log('条码类型：' + res.scanType);
                    console.log('条码内容：' + res.result);
                    _this.searchForm.keyword = res.result
                    _this.onSearch()
                }
            });
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
.qualityError {
}
</style>
