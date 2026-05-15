<template>
    <div class='firstConfirm'>
        <u-navbar border :title="$t('common.首件确认')" :leftText="$t('common.返回')" placeholder autoBack>
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
                        <div class="label"> {{$t('common.首件类型')}}</div>
                        <div class="value">
                            <mySelect :list="f_typeList" v-model="searchForm.f_typeObj" type="action"></mySelect>
                        </div>
                    </div>
                    <div class="item2">
                        <div class="label"> {{$t('common.日期')}}</div>
                        <div class="value">
                            <uni-datetime-picker :start-placeholder="$t('common.开始日期')"  :end-placeholder="$t('common.结束日期')" v-model="searchForm.date" type="datetimerange" :rangeSeparator="$t('common.至')" @change="val=>searchForm.date=val" />
                        </div>
                    </div>
                    <div class="item2">
                        <div class="label"></div>
                        <div class="value">
                            <u-button type="primary" color="#0ab99c" icon="scan" :text="$t('common.扫码')" @click="scan(true)"></u-button>
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
            <list ref="list" :option="option" :handlerItem="handlerItem" :otherData="otherData">
                <template v-slot="{item}">
                    <div class="myList2 box" @click="toPage('edit',item)">
                        <div class="item">
                            <div class="label"> {{$t('common.首件类型')}}:</div>
                            <div class="value">{{item.f_type_name}}</div>
                        </div>
                        <div class="item">
                            <div class="label"> {{$t('common.首件位置产线')}}:</div>
                            <div class="value">{{item.production_line_name}}</div>
                        </div>
                        <div class="item">
                            <div class="label"> {{$t('common.首件位置设备')}}:</div>
                            <div class="value">{{item.eq_info_name}}</div>
                        </div>
                        <div class="item">
                            <div class="label"> {{$t('common.工段')}}:</div>
                            <div class="value">{{item.workshop_section_name}}</div>
                        </div>
                        <div class="item">
                            <div class="label"> ART:</div>
                            <div class="value">{{item.prod_no}}</div>
                        </div>
                        <div class="item">
                            <div class="label"> {{$t('common.工艺材料种类')}}:</div>
                            <div class="value">{{item.workmanship_name}}</div>
                        </div>
                        <div class="item">
                            <div class="label"> {{$t('common.实物名称')}}:</div>
                            <div class="value">{{item.physical_name}}</div>
                        </div>
                        <div class="item">
                            <div class="label"> {{$t('common.日期')}}:</div>
                            <div class="value">{{item.datas}}</div>
                        </div>
                        <div class="item">
                            <div class="label"> {{$t('common.结果')}}:</div>
                            <div class="value" :class="item.sign_res=='0'?'suc':'err'">{{item.sign_res_name}}</div>
                        </div>
                        <div class="item">
                            <div class="label"> {{$t('common.签核意见')}}:</div>
                            <div class="value" :class="item.sign_idea=='0'?'suc':'err'">{{item.sign_idea_name}}</div>
                        </div>
                    </div>
                </template>
            </list>
        </div>
    </div>
</template>
<script>
export default {
    name: 'firstConfirm',
    data() {
        return {
            searchForm: {//搜索数据
                keyword: '',
                f_typeObj: {
                    label: '',
                    value: '',
                },
                date: []
            },
            f_typeList: [
                {
                    label: this.$t('common.常规'),
                    value: '0',
                },
                {
                    label: this.$t('common.新上线'),
                    value: '1',
                },
                {
                    label: this.$t('common.变更'),
                    value: '2',
                },
            ],
            option: {
                getDataName: 'firstConfirm_OutMaingetlist',//获取列表数据的方法名
                delName: 'firstConfirm_Main_task_no_delete',//删除数据的方法名
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
                "workshop_section_name": "",
                "keyword": this.searchForm.keyword,
                "prod_no": "",
                "eq_info_no": "",
                "production_line_code": "",
                "workmanship_name": "",
                "putin_date": this.searchForm.date[0] || '',
                "end_date": this.searchForm.date[1] || '',
                "name_t": "",
                "f_type": this.searchForm.f_typeObj.value || '',
                "ex_task_no": "",
                "physical_name": ""
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
            uni.navigateTo({ url: `/pages/firstConfirm/firstConfirmDetail?type=${type}&task_no=${item.task_no}` })
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
        handlerItem(arr) {//处理返回数据
            arr.forEach((e, i) => {
                e.del_show = !e.sign_idea
                // e.f_typeName = this.f_typeList.find(item => item.value == e.f_type)
            })
        }
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
.firstConfirm {
    .content {
    }
}
</style>