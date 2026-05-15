<template>
    <div class='batchTry'>
        <u-navbar border :title="$t('batchTry.量试')" :leftText="$t('common.返回')" placeholder autoBack>
            <u-button type="success" size="small" icon="plus" slot="right" :text="$t('common.新增')" @click="add()"></u-button>
        </u-navbar>
        <u-collapse :value="$t('common.搜索筛选')" accordion>
            <u-collapse-item :title="$t('common.搜索筛选')" :name="$t('common.搜索筛选')">
                <div class="myList">
                    <div class="item2">
                        <div class="label">{{$t('common.鞋型')}}</div>
                        <div class="value">
                            <u-input v-model="searchForm.shoes_name" clearable> </u-input>
                        </div>
                    </div>
                    <div class="item2">
                        <div class="label">ART</div>
                        <div class="value">
                            <u-input v-model="searchForm.prod_name" clearable> </u-input>
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
        <div class="content">
            <list ref="list" :option="option" :otherData="searchForm">
                <template v-slot="{item}">
                    <div class="myList box" @click="toPage('edit',item)">
                        <div class="item">
                            <div class="label">{{$t('common.鞋型名称')}}:</div>
                            <div class="value">{{item.shoes_name}}</div>
                        </div>
                        <div class="item">
                            <div class="label">ART:</div>
                            <div class="value">{{item.prod_no}}</div>
                        </div>
                    </div>
                </template>
            </list>
        </div>
        <!--新增  -->
        <u-popup :show="addShow" @close="addShow=false" :round="10" closeOnClickOverlay>
            <div class="add">
                <div class="myList">
                    <div class="item2">
                        <div class="label">ART:</div>
                        <div class="value">
                            <mySelect @confirm="prodConfirm" labelName="value" valueName="label" apiName="batchTry_GetPilotRun_Insert_art" v-model="addForm.prodObj" type="search"></mySelect>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">{{$t('common.季度')}}:</div>
                        <div class="value">{{addForm.develop_season}}</div>
                    </div>
                    <div class="item">
                        <div class="label">{{$t('common.鞋型名称')}}:</div>
                        <div class="value">{{addForm.shoe_name}}</div>
                    </div>
                    <div class="item">
                        <div class="label">{{$t('common.开发课')}}:</div>
                        <div class="value">{{addForm.user_section}}</div>
                    </div>
                    <div class="item">
                        <div class="label">category:</div>
                        <div class="value">{{addForm.rule_no}}</div>
                    </div>
                    <div class="item">
                        <div class="label">{{$t('common.鞋型负责人')}}:</div>
                        <div class="value">{{addForm.user_in_shoecharge}}</div>
                    </div>
                    <div class="item">
                        <div class="label">{{$t('common.测试级别')}}:</div>
                        <div class="value">{{addForm.test_level}}</div>
                    </div>
                    <div class="item">
                        <div class="label">{{$t('common.开发技术负责人')}}:</div>
                        <div class="value">{{addForm.user_technical}}</div>
                    </div>
                    <div class="item">
                        <div class="label">PB Type:</div>
                        <div class="value">{{addForm.develop_type}}</div>
                    </div>
                    <div class="item">
                        <div class="label">{{$t('common.DQA鞋型负责人')}}:</div>
                        <div class="value">{{addForm.qa_principal}}</div>
                    </div>
                    <div class="item">
                        <div class="label">{{$t('common.预告订单')}}:</div>
                        <div class="value">{{addForm.col1}}</div>
                    </div>
                    <div class="item2">
                        <div class="value">
                            <div class="btnList">
                                <u-button :disabled="!addForm.prodObj.value" type="success" @click="addConfirm" :text="$t('common.确认新增')"></u-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </u-popup>
    </div>
</template>
<script>
export default {
    name: 'batchTry',
    data() {
        return {
            addShow: false,
            prod_noList: [],//ART数组
            searchForm: {//搜索数据
                shoes_name: '',
                prod_name: '',
            },
            addForm: {//新增数据
                prodObj: {
                    label: '',
                    value: '',
                },

            },
            option: {
                getDataName: 'batchTry_GetPilotRun_Main',//获取列表数据的方法名
                delName: '',//删除数据的方法名
                delData: {//删除数据需要的参数
                    prop: '',//删除数据的对应字段名
                    value: '',//删除数据的对应值的字段名
                },
                page: {//page对应的参数
                    page: 'pageIndex',//页码对应字段名
                    pageRow: 'pageSize',//页尺寸的字段名
                },
            },
        }
    },
    methods: {
        reset() {//重置筛选
            this.searchForm = uni.$u.deepClone(this.oldSearchForm)
            this.onSearch()
        },
        toPage(type, item) {//进入详情
            uni.navigateTo({ url: `/pages/batchTry/batchTryDetail?type=${type}&mid=${item.id}&prod_name=${item.prod_name}&prod_no=${item.prod_no}&shoes_code=${item.shoes_code}` })
            // uni.$emit("updataBatchTryData", item);
        },
        onSearch() {//搜索
            this.$nextTick(() => this.$refs.list.init())
        },
        add() {//新增
            this.addShow = true
            this.addForm = uni.$u.deepClone(this.oldAddForm)
        },
        prodConfirm() {//ART选择事件
            let data = {
                "prod_no": this.addForm.prodObj.value
            }
            this.$apis.batchTry_GetPilotRun_art_Detail(data).then((res) => {
                this.$forceUpdate();
                Object.assign(this.addForm, res)
            }).catch((err) => {
                console.error(err);
            })
        },
        addConfirm() {//确认新增
            let data = {
                "shoes_code": this.addForm.shoe_no,
                "prod_no": this.addForm.prodObj.value
            }
            this.$apis.batchTry_InsertPilotRun_Main(data).then((res) => {
                this.addShow = false
                this.onSearch()
                uni.$u.toast(this.$t('新增成功'))
            }).catch((err) => {
                console.error(err);
            })
        }
    },
    onLoad(query) {
        this.oldSearchForm = uni.$u.deepClone(this.searchForm)
        this.oldAddForm = uni.$u.deepClone(this.addForm)
    },
    onShow() {
        this.onSearch()
    }
}
</script>
<style lang='scss' scoped>
.batchTry {
    .content {
        padding: 15rpx;
    }
    .add {
        padding: 15rpx;
    }
}
</style>