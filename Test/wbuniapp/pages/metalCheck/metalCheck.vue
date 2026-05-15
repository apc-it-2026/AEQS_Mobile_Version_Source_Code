<template>
    <div class='metalCheck'>
        <u-navbar border :title="$t('common.金属检测')" :leftText="$t('common.返回')" placeholder autoBack>
            <u-button type="success" size="small" icon="plus" slot="right" :text="$t('common.新建任务')" @click="toPage('add','')"></u-button>
        </u-navbar>
        <u-collapse :value="$t('common.搜索筛选')" accordion>
            <u-collapse-item :title="$t('common.搜索筛选')" :name="$t('common.搜索筛选')">
                <div class="search">
                    <u--form ref="searchForm" labelAlign="right" labelWidth='80'>
                        <u-form-item :label="$t('common.扫描任务')" prop="扫描任务">
                            <scan v-model="searchForm.task_no" @clear="onSearch" @confirm="onSearch"></scan>
                        </u-form-item>
                        <u-form-item :label="$t('common.产线代号')" prop="产线代号">
                            <scan v-model="searchForm.line" @clear="onSearch" @confirm="onSearch"></scan>
                        </u-form-item>
                        <u-form-item :label="$t('common.日期时间')" prop="日期时间">
                            <u-cell-group :border="false">
                                <uni-datetime-picker :start-placeholder="$t('common.开始日期')"  :end-placeholder="$t('common.结束日期')" v-model="searchForm.date" type="datetimerange" :rangeSeparator="$t('common.至')" @change="val=>searchForm.date=val" />
                            </u-cell-group>
                        </u-form-item>
                        <u-form-item :label="$t('common.类型')" prop="类型">
                            <u-cell-group :border="false">
                                <mySelect clearabled @confirm="onSearch" :list="searchForm.tpyeArr" v-model="searchForm.tpye" type="action"></mySelect>
                            </u-cell-group>
                        </u-form-item>
                        <u-form-item>
                            <u-cell-group :border="false">
                                <u-search  :showAction="false" @search="onSearch" :placeholder="$t('common.请输入搜索关键字')" :clearabled="true" v-model="searchForm.keyword"></u-search>
                            </u-cell-group>
                        </u-form-item>
                        <u-form-item>
                            <u-cell-group :border="false">
                                <u-button @click="onSearch" type="primary" :text="$t('common.开始搜索筛选')"></u-button>
                            </u-cell-group>
                        </u-form-item>
                    </u--form>
                </div>
            </u-collapse-item>
        </u-collapse>
        <div class="content">
            <list ref="list" :option="option" :otherData="searchForm">
                <template v-slot="{item}">
                    <div class="myList" @click="toPage('edit',item)">
                        <!-- <div class="del">
                            <u-button type="error" v-if="item.del_show" icon="trash" :text="$t('common.删除')" @click.stop.native="del(item,index)"></u-button>
                        </div> -->
                        <div class="item item2">
                            <div class="label">{{$t('common.任务编号')}}:</div>
                            <div class="value">{{item.TASK_NO}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.触发时间')}}:</div>
                            <div class="value">{{item.DETE}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.鞋型')}}:</div>
                            <div class="value">{{item.SHOE_NAME}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.产线名称')}}:</div>
                            <div class="value">{{item.LINE_NAME}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.PO号')}}:</div>
                            <div class="value">{{item.PO}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.码数')}}:</div>
                            <div class="value">{{item.SHOE_NUM}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.ART')}}:</div>
                            <div class="value">{{item.ART}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.任务状态')}}:</div>
                            <div class="value" :class="item.STATUS=='已结案'?'suc':'inf'">{{item.STATUS}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.最终结果')}}:</div>
                            <div class="value" :class="item.RESULT=='PASS'?'suc':'err'">{{item.RESULT}}</div>
                        </div>
                    </div>
                </template>
            </list>
        </div>
    </div>
</template>
<script>
export default {
    name: 'metalCheck',
    data() {
        return {
            animationData: {},
            searchForm: {
                page: 1,//页数 当前页数没有数据时RetData1传空数组
                pageRow: 10,//页尺寸
                date: [],// 日期时间范围 必定有两个值 传空数组则查所有,
                keyword: '',//搜索关键词 可模糊搜索 po号 ART 鞋型 码数
                tpye: {},//类型 2未选择 1人工创建 0机器创建
                tpyeArr: [{ label: this.$t('common.人工创建'), value: 0 }, { label: this.$t('common.机器创建'), value: 1 }],
                line: '',//产线代号
                task_no: '',//任务号 当此字段有值时 忽略其他的搜索筛选条件 
            },
            option: {
                getDataName: 'GetMetalCheckList',//获取列表数据的方法名
                delName: 'DelMetalCheck',//删除数据的方法名
                delData: {//删除数据需要的参数
                    prop: 'task_no',//删除数据的对应字段名
                    value: 'task_no',//删除数据的对应值的字段名
                },
                page: {//page对应的参数
                    page: 'page',//页码对应字段名
                    pageRow: 'pageRow',//页尺寸的字段名
                },
            },
            typeShow: false,
            status: 'loadmore',
            list: [],
        }
    },

    methods: {
        toPage(type, item) {
            uni.navigateTo({ url: `/pages/metalCheck/metalCheckDetail?type=${type}&task_no=${item.TASK_NO}&art=${item.ART}&shoe_type=${item.SHOE_TYPE}&shoe_name=${item.SHOE_NAME}` })
        },
        onSearch() {
            this.$nextTick(() => this.$refs.list.init())
        },
        scan(name) {
            console.log('扫描');
            // 允许从相机和相册扫码
            let _this = this
            uni.scanCode({
                success: function (res) {
                    console.log('条码类型：' + res.scanType);
                    console.log('条码内容：' + res.result);
                    _this.searchForm[name] = res.result
                    _this.onSearch()

                }
            });


        },
    },
    onShow() {
        this.onSearch()

    },
    onLoad(query) {
    }
}
</script>
<style lang='scss' scoped>
.metalCheck {
    /deep/ .u-collapse {
        background: #fff;
    }
    .box {
    }
    .content {
        padding: 15rpx;
    }
}
</style>