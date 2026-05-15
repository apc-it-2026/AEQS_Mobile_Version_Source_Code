<template>
    <div class='glueHandle'>
        <u-navbar border :title="$t('common.胶水危废处理')" :leftText="$t('common.返回')" placeholder autoBack>
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
                        <div class="label">{{$t('common.日期')}}</div>
                        <div class="value">
                            <uni-datetime-picker :start-placeholder="$t('common.开始日期')"  :end-placeholder="$t('common.结束日期')" v-model="searchForm.date" type="daterange" :rangeSeparator="$t('common.至')" @change="val=>searchForm.date=val" />
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
                            <div class="label">{{$t('common.日期')}}:</div>
                            <div class="value">{{item.createdate}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.生产单位')}}:</div>
                            <div class="value">{{item.department_name}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.报废胶水名称')}}:</div>
                            <div class="value">{{item.scrap_glue_name}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.报废胶水重量')}}:</div>
                            <div class="value">{{item.scrap_glue_weight}}KG</div>
                        </div>
                        <div class="item2">
                            <div class="label">{{$t('common.报废原因')}}:</div>
                            <div class="value">{{item.scrap_glue_reason}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.报废单位签名')}}:</div>
                            <div class="value">{{item.bf_autograph_name}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.环保股回收签名')}}:</div>
                            <div class="value">{{item.hb_autograph_name}}</div>
                        </div>
                    </div>
                </template>
            </list>
        </div>
    </div>
</template>
<script>
export default {
    name: 'glueHandle',
    data() {
        return {
            searchForm: {//搜索数据
                keyword: '',
                date: []
            },
            option: {
                getDataName: 'JSWF_SearchScrapGlueMagRecord',//获取列表数据的方法名
                delName: 'JSWF_DelScrapGlueMagRecordById',//删除数据的方法名
                delData: {//删除数据需要的参数
                    prop: 'id',//删除数据的对应字段名
                    value: 'id',//删除数据的对应值的字段名
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
                "start_date": this.searchForm.date[0] || '',
                "end_date": this.searchForm.date[1] || '',
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
            uni.navigateTo({ url: `/pages/glueHandle/glueHandleDetail?type=${type}&id=${item.id}` })
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
.glueHandle {
}
</style>
