<template>
    <div class='usageControl'>
        <u-navbar border :title="$t('common.容器使用管控')" :leftText="$t('common.返回')" placeholder autoBack>
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
                    <div class="myList2 box">
                        <div class="item">
                            <div class="label">{{$t('common.容器编码')}}:</div>
                            <div class="value">{{item.container_no}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.产线信息')}}:</div>
                            <div class="value">{{item.department_name}}</div>
                        </div>
                        <div class="item2">
                            <div class="label">{{$t('common.是否使用中')}}:</div>
                            <div class="value">
                                <u-switch asyncChange v-model="item.is_use_bool" @change="change($event,item)"></u-switch>
                            </div>
                        </div>
                    </div>
                </template>
            </list>
        </div>
    </div>
</template>
<script>


export default {
    name: 'usageControl',
    data() {
        return {
            searchForm: {//搜索数据
                keyword: '',
            },
            option: {
                getDataName: 'UC_SearchContainerUse',//获取列表数据的方法名
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
        change(val, item) {//切换开关
            let data = {
                ...item,
                is_use_bool: val
            }
            this.$apis.UC_UpdateContainerUse(data).then((res) => {
                item.is_use_bool = val
                uni.$u.toast(this.$t('common.操作成功'))
            }).catch((err) => {
                console.error(err);
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
.usageControl {
}
</style>
