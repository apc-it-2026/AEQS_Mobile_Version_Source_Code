<template>
    <div class='chemiclaQrcode'>
        <u-navbar border :title="$t('common.化学品条码打印')" :leftText="$t('common.返回')" placeholder autoBack>
        </u-navbar>
        <u-modal :show="show" :content="$t('common.未连接打印机')" :confirmText="$t('common.前往连接')" @confirm="toPrintPage" closeOnClickOverlay @close="show=false"></u-modal>
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
                        <div class="label">{{$t('common.类别')}}</div>
                        <div class="value">
                            <mySelect :list="typeList" v-model="searchForm.typeObj" type="action"></mySelect>
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
                    <div class="myList2 box">
                        <div class="item2">
                            <div class="label">{{$t('common.化学品名称')}}:</div>
                            <div class="value">{{item.chemical_name}}</div>
                        </div>
                        <div class="item2">
                            <div class="label">{{$t('common.药剂名称')}}:</div>
                            <div class="value">{{item.medicament_name}}</div>
                        </div>
                        <div class="item2">
                            <div class="label">{{$t('common.对应湿度')}}:</div>
                            <div class="value">{{item.corresponding_humidity}}</div>
                        </div>
                        <div class="item2">
                            <div class="label">{{$t('common.药剂比例')}}(%):</div>
                            <div class="value">{{item.reagent_proportion}}</div>
                        </div>
                        <div class="item2">
                            <div class="label">{{$t('common.有效时间')}}(h):</div>
                            <div class="value">{{item.effective_time}}</div>
                        </div>
                        <div class="item2">
                            <div class="value">
                                <u-button type="success" color="#0ab99c" size="small" :text="$t('common.打印')" :loading="loading" @click="print(item)"></u-button>
                            </div>
                        </div>
                    </div>
                </template>
            </list>
        </div>
    </div>
</template>
<script>
import print from '@/util/ble/print.js'
export default {
    name: 'chemiclaQrcode',
    data() {
        return {
            loading: false,
            show: false,
            searchForm: {//搜索数据
                keyword: '',
                typeObj: {
                    label: '',
                    value: '',
                },
            },
            typeList: [//类别列表
                {
                    label: this.$t('common.胶水类'),
                    value: '0',
                },
                {
                    label: this.$t('common.处理剂类'),
                    value: '1',
                },
                {
                    label: this.$t('common.其他类'),
                    value: '2',
                },
            ],
            option: {
                getDataName: 'chemiclaManage_GetPrMain_list',//获取列表数据的方法名
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
                "chemical_category": this.searchForm.typeObj.value,
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
        print(item) {//点击打印按钮
            // 先校验是否连接了打印机
            print.isPrintConnectIng().then((isPrintConnectIng) => {
                if (isPrintConnectIng) {
                    //已连接
                    this.loading = true
                    uni.$u.toast(this.$t('common.开始打印'))
                    let data = {
                        "chemical_no": item.chemical_no,
                        "effective_time": item.effective_time
                    }
                    this.$apis.chemiclaManage_Commit_Printdata(data).then((res) => {
                        item.id = res.id
                        item.g_mixing_time = res.g_mixing_time
                        item.effective_time2 = res.effective_time
                        // 先将非中文语言切换到英语
                        let old = this.$i18n.locale
                        this.$i18n.locale = this.$i18n.locale == 'zh' ? 'zh' : "en"
                        //开始打印
                        var command = print.jpPrinter.createNew()
                        command.init()
                        command.bold(1);//加粗
                        command.setFontSize(12);//字体大小
                        // command.rowSpace(10);//行间距
                        command.setLeftMargin(20)//左边距
                        command.setText(`${this.$t('common.胶水名称')}:` + item.chemical_name);//文字
                        command.setPrint();//打印并换行
                        command.setText(`${this.$t('common.药剂名称')}:` + item.medicament_name);//文字
                        command.setPrint();//打印并换行
                        command.setText(`${this.$t('common.药剂比例')}(%):` + item.reagent_proportion);//文字
                        command.setPrint();//打印并换行
                        command.setText(`${this.$t('common.对应湿度')}:` + item.corresponding_humidity);//文字
                        command.setPrint();//打印并换行
                        command.setText(`${this.$t('common.调胶时间')}:` + item.g_mixing_time);//文字
                        command.setPrint();//打印并换行
                        command.setText(`${this.$t('common.有效期')}:` + item.effective_time2);//文字
                        command.setPrint();//打印并换行
                        command.setSelectJustification(49)//居中
                        command.setStoreQRCodeData(item.id);//二维码内容
                        command.setSelectSizeOfModuleForQRCode(6);//二维码大小
                        command.setSelectErrorCorrectionLevelForQRCode(48);//二维码纠错等级
                        command.setPrintQRCode();//打印二维码
                        // command.setPrintAndFeed(100);//打印并换行
                        command.printToLine();//打印到分割线
                        print.starPrint(command.getData())
                        // 语言切换回来
                        this.$i18n.locale = old

                    }).catch((err) => {
                        console.error(err);
                    }).finally(() => {
                        this.loading = false
                    })

                } else {
                    //未连接
                    this.show = true
                }
            })


        },
        toPrintPage() {//前往打印页
            uni.navigateTo({ url: `/pages/print/print` })
            this.show = false
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
.chemiclaQrcode {
    .myList2 {
        .label {
            @media #{$phone} {
                width: 140rpx;
            }
        }
    }
}
</style>
