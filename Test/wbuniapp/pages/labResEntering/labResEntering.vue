<template>
    <div class='labResEntering'>
        <u-navbar border :title="$t('common.测试工作清单和结果录入')" :leftText="$t('common.返回')" placeholder autoBack> </u-navbar>
        <uni-card margin=" 0 0 15rpx 0">
            <div class="myList">
                <div class="item item2">
                    <div class="label">{{$t('common.扫描二维码')}}:</div>
                    <div class="value">
                        <scan v-model="searchForm.barcode" @confirm="onSearch"></scan>
                    </div>
                </div>
            </div>
        </uni-card>
        <uni-card :title="$t('common.检验单内容')" v-if="Object.keys(headData).length" margin=" 0 0 15rpx 0">
            <div class="myList">
                <div class="item">
                    <div class="label">{{$t('common.送检类型')}}:</div>
                    <div class="value"> {{headData.TEST_TYPE_NAME}} </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.检验单编号')}}:</div>
                    <div class="value"> {{headData.TASK_NO}} </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.检测提交日期')}}:</div>
                    <div class="value"> {{headData.SUBMISSION_DATE}} </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.检测完成日期')}}:</div>
                    <div class="value"> {{headData.COMPLETION_DATE}} </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.ART')}}:</div>
                    <div class="value"> {{headData.ART_NO}} </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.阶段')}}:</div>
                    <div class="value"> {{headData.PHASE_CREATION_NAME}} </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.送检人员')}}:</div>
                    <div class="value"> {{headData.STAFF_NAME}} </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.厂区厂商')}}:</div>
                    <div class="value"> {{headData.WORKMANSHIP}} </div>
                </div>
                <div class="item item2">
                    <div class="label">{{$t('common.送测原因')}}:</div>
                    <div class="value"> {{headData.TEST_REASON}} </div>
                </div>
            </div>
        </uni-card>
        <div class="listBox" v-show="Object.keys(headData).length">
            <list ref="list" :option="option" :otherData="otherData" @getData="getData">
                <template v-slot="{item}">
                    <div class="myList box" @click="toPage(item)">
                        <div class="item">
                            <div class="label">{{$t('common.测试项内容')}}:</div>
                            <div class="value">{{item.inspection_name}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.检验项编号')}}:</div>
                            <div class="value">{{item.inspection_code}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.判断标准')}}:</div>
                            <div class="value">{{item.judge_mode}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.测量标准')}}:</div>
                            <div class="value">{{item.standard_value}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.试样数量')}}:</div>
                            <div class="value">{{item.sample_qty}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.检验项状态')}}:</div>
                            <div class="value" :class="item.submission_status=='已提交' ?'suc':'inf'">{{item.submission_status}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.检验结果')}}:</div>
                            <div class="value" :class="item.item_test_result=='PASS'?'suc':'err'">{{item.item_test_result}}</div>
                        </div>
                        <div class="item item2">
                            <div class="label">{{$t('common.检测项备注')}}:</div>
                            <div class="value">{{item.art_d_remark}}</div>
                        </div>
                        <div class="item item2">
                            <div class="label">{{$t('common.备注')}}:</div>
                            <div class="value">{{item.item_remark}}</div>
                        </div>
                        <div class="item item2" v-if="item.submission_status=='已提交'">
                            <div class="value">
                                <u-button type="warning" size="small" @click.native.stop="send(item)" :text="$t('common.单项结果推送')"></u-button>
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
    name: 'labResEntering',
    data() {
        return {
            searchForm: {
                barcode: '',
            },
            headData: {},
            option: {
                getDataName: 'GetInspectionOrder',//获取列表数据的方法名
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
    computed: {
        otherData: function () {
            return {
                "barcode": this.searchForm.barcode,
            }
        }
    },
    methods: {
        toPage(row) {
            uni.navigateTo({
                url: `/pages/labResEntering/checkDetail?d_id=${row.d_id}&show=${row.submission_status == '已提交'}`
            });
        },
        send(item) {//发送通知
            let data = item
            this.$apis.SendInspectionDataEmail(data).then((res) => {
                uni.$u.toast(this.$t('common.发送成功'))
            }).catch((err) => {
                console.error(err);
            })

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
        getData(data) {
            console.log('data', data);

            this.headData = data.HeadData
        },
        onSearch() {
            this.$nextTick(() => this.$refs.list.init())
        },
    },
    onShow() {
        this.searchForm.barcode && this.onSearch()
    }
}
</script>
<style lang='scss' scoped>
.labResEntering {
    padding: 15rpx;
}
</style>