<template>
    <div class='matCheck'>
        <u-navbar border :title="$t('common.原材料进仓清单')" :leftText="$t('common.返回')" placeholder autoBack> </u-navbar>
        <div class="search">
            <u--form ref="searchForm" labelAlign="right" labelWidth='80'>
                <u-form-item :label="$t('common.收料单号')" prop="收料单号">
                    <scan v-model="searchForm.CHK_NO" @clear="onSearch" @confirm="onSearch"></scan>
                </u-form-item>
                <u-form-item :label="$t('common.进仓日期')" prop="进仓日期">
                    <u-cell-group :border="false">
                        <uni-datetime-picker :start-placeholder="$t('common.开始日期')"  :end-placeholder="$t('common.结束日期')" v-model="searchForm.dateArr" type="daterange" :rangeSeparator="$t('common.至')" @change="dateChange" />
                    </u-cell-group>
                </u-form-item>
                <u-form-item :label="$t('common.料号')" prop="料号">
                    <u-input v-model="searchForm.ITEM_NO" @clear="searchForm.ITEM_NO='',onSearch()" clearable @confirm="onSearch"> </u-input>
                </u-form-item>
            </u--form>
        </div>
        <div class="table">
            <uni-table border :loading="loading">
                <uni-tr>
                    <uni-th width='80'>{{$t('common.序号')}}</uni-th>
                    <uni-th>{{$t('common.操作')}}</uni-th>
                    <uni-th>{{$t('common.收料单号')}}</uni-th>
                    <uni-th>{{$t('common.料号')}}</uni-th>
                    <uni-th>{{$t('common.进仓日期')}}</uni-th>
                </uni-tr>
                <uni-tbody height="55vh">
                    <uni-tr v-for='(e,i) in tableData' :key='i'>
                        <uni-td width='80'>{{e.RN}}</uni-td>
                        <uni-td>
                            <u-button size="small" @click="toPage(e)" type="primary" :text="$t('common.录入检验结果')"></u-button>
                        </uni-td>
                        <uni-td>{{e.CHK_NO}}</uni-td>
                        <uni-td>{{e.ITEM_NO}}</uni-td>
                        <uni-td>{{e.JCDATE}}</uni-td>
                    </uni-tr>
                </uni-tbody>
            </uni-table>
        </div>
        <uni-pagination @change="getData" show-icon="true" :total="total" v-model="searchForm.page"></uni-pagination>
    </div>
</template>
<script>
export default {
    name: 'matCheck',
    data() {
        return {
            searchForm: {
                CHK_NO: "",
                ITEM_NO: "",
                page: 1,
                dateArr: [],
            },
            loading: false,
            total: 0,
            tableData: []
        }
    },
    methods: {
        getData() {
            this.loading = true
            console.log(this.searchForm.CHK_NO,);
            this.$apis.CheckResultPDAYCLViewA({
                "CHK_NO": this.searchForm.CHK_NO,
                "ITEM_NO": this.searchForm.ITEM_NO,
                "PUTIN_DATE": this.searchForm.dateArr[0],
                "END_DATE": this.searchForm.dateArr[1],
                "pageIndex": this.searchForm.page,
                "pageSize": 10,
            }).then((res) => {
                console.log(res, '获取表格数据')
                this.tableData = res.RetData1.Data
                this.total = res.RetData1.total
            }).catch((err) => {
                this.tableData = []
                this.total = 0
            }).finally(() => {
                this.loading = false
            })
        },
        dateChange(val) {
            this.searchForm.dateArr = val
            this.onSearch()

        },
        toPage(item) {
            uni.navigateTo({ url: `/pages/matCheck/matCheckDetail?CHK_NO=${item.CHK_NO}&ITEM_NO=${item.ITEM_NO}&CHK_SEQ=${item.CHK_SEQ}` })

        },
        onSearch() {
            this.searchForm.page = 1;
            this.tableData = []
            setTimeout(() => {
                this.getData()
            }, 0);
        },
    },
    onShow() {
        this.onSearch()
    }
}
</script>
<style lang='scss' scoped>
.matCheck {
    padding: 15rpx;
    .search {
        /deep/ .u-input {
            background: #fff;
        }
    }
    .table {
        margin-bottom: 5rpx;
    }
}
</style>