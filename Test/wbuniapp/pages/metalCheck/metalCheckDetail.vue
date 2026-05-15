<template>
    <div class='metalCheckDetail'>
        <u-navbar border :title="query.type=='add'? $t('common.新建金属检测任务'):$t('common.金属检测任务详情')" :leftText="$t('common.返回')" placeholder autoBack>
            <div class="switch" slot="right">
                <div class="txt" :class="isFinish?'suc':'err'">{{isFinish? $t('common.已结案') :$t('common.未结案')}}</div>
                <u-switch activeColor="#5ac725" inactiveColor="#f56c6c" :loading="loading" v-model="isFinish" asyncChange @change="asyncChange"></u-switch>
            </div>
        </u-navbar>
        <u-toast ref="uToast"></u-toast>
        <uni-card :title="$t('common.数据录入')" :sub-title="headData.task_no||''" :extra="headData.date">
            <div class="myList">
                <div class="item item2" v-show="headData.imgs.length">
                    <div class="label">{{$t('common.鞋图')}}:</div>
                    <upload :fileList="headData.imgs" disabled></upload>
                </div>
                <div class="item item2">
                    <div class="label">{{$t('common.PO号')}}:</div>
                    <div class="value">
                        <u-input @confirm="getPoInfo" :disabled="query.type=='edit'" :placeholder="$t('common.请选择PO号')" v-model="headData.po" suffixIcon="arrow-down" readonly @click.native="query.type=='edit'||(poShow=!isFinish)"></u-input>
                    </div>
                </div>
                <div class="item">
                    <div class="label">ART:</div>
                    <div class="value">
                        <u--input v-model="headData.art" disabled></u--input>
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.鞋型')}}:</div>
                    <div class="value">
                        <u--input v-model="headData.shoe_name" disabled></u--input>
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.码数')}}:</div>
                    <div class="value">
                        <u--input :disabled="query.type=='edit'" type='number' v-model="headData.shoe_num"></u--input>
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.产线')}}:</div>
                    <div class="value">
                        <mySelect scanAbled :disabled="query.type=='edit'" apiName="getProduction_lineList2" v-model="headData.lineObj" type="search"></mySelect>
                    </div>
                </div>
            </div>
        </uni-card>
        <uni-card :title="$t('common.问题点录入')">
            <div class="myList">
                <div class="item item2">
                    <u--textarea :disabled="isFinish" v-model="issue.remark" :placeholder="$t('common.请输入内容')"></u--textarea>
                </div>
                <div class="item item2">
                    <upload :fileList="issue.imgs" :disabled="isFinish" :maxCount="3"></upload>
                </div>
            </div>
        </uni-card>
        <uni-card :title="$t('common.X光机复核反馈')">
            <div class="myList">
                <div class="item item2" :class="headData.x_result=='PASS'?'suc':'err'" style="font-weight: bolder;">
                    {{headData.x_result}}
                </div>
                <div class="item item2">
                    <upload :fileList="x.imgs" :disabled="isFinish" :maxCount="3"></upload>
                </div>
            </div>
        </uni-card>
        <uni-card :title="$t('common.最终处理结果')">
            <div class="myList">
                <div class="item item2">
                    <div class="label">{{$t('common.原因分析')}}:</div>
                    <div class="value">
                        <u--input :disabled="isFinish" clearable v-model="result.reason"></u--input>
                    </div>
                </div>
                <div class="item item2">
                    <div class="label">{{$t('common.处理方式')}}:</div>
                    <div class="value">
                        <u--input :disabled="isFinish" clearable v-model="result.handle_way"></u--input>
                    </div>
                </div>
                <div class="item item2">
                    <div class="label">{{$t('common.责任单位')}}:</div>
                    <div class="value">
                        <u-input :disabled="isFinish" :placeholder="$t('common.请选择责任单位')" v-model="result.supplier.label" suffixIcon="arrow-down" readonly @click.native="supplierShow=!isFinish"></u-input>
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.处理结果')}}:</div>
                    <div class="value">
                        <mySelect clearabled :list="handle_resultArr" :disabled="isFinish" v-model="result.handle_result" type="action"></mySelect>
                    </div>
                </div>
                <div class="item">
                    <div class="label">R/L:</div>
                    <div class="value">
                        <mySelect clearabled :list="RLArr" :disabled="isFinish" v-model="result.RL" type="action"></mySelect>
                    </div>
                </div>
                <div class="item item2">
                    <upload :fileList="result.imgs" :disabled="isFinish" :maxCount="3"></upload>
                </div>
            </div>
        </uni-card>
        <searchPopup :show.sync="supplierShow" apiName="getSupplierList" :currentItem.sync="result.supplier"></searchPopup>
        <searchPopup :show.sync="poShow" apiName="GetMER_PO" @confirm="e=>{headData.po=e.value,getPoInfo()}"></searchPopup>
        <div class="btn" v-if="!isFinish">
            <u-button type="success" :loading="loading" @click="save" :text="$t('common.保存')"></u-button>
        </div>
    </div>
</template>
<script>
import { uploadFilePromise } from '@/util'
export default {
    name: 'metalCheckDetail',
    data() {
        return {
            query: {},
            headData: { //数据录入信息
                imgs: [],
                po: '', //po号
                lineObj: {//产线代号
                    label: '',
                    value: '',
                },
                shoe_num: '', //码数
                art: "", //ART
                shoe_type: "", //鞋型
                shoe_name: "", //鞋型名称
            },
            poObj: {},
            isFinish: false,
            loading: false,
            supplierShow: false,
            poShow: false,
            issue: {
                remark: '', //问题点说明
                imgs: []
            },
            x: { //x光机
                imgs: []
            },
            handle_resultArr: [
                { //处理结果
                    label: "FAIL", //处理结果名称 空值 FAIL PASS 
                    value: '0', //处理结果代号            0   1
                },
                { //处理结果
                    label: "PASS", //处理结果名称 空值 FAIL PASS 
                    value: '1', //处理结果代号  0     1    2
                },
            ],
            RLArr: [
                { //R/L
                    label: "R", //rl名称 空值   R    L  R&L
                    value: '0', //rl代号  0     1    2  3
                },
                { //R/L
                    label: "L", //rl名称 空值   R    L  R&L
                    value: '1', //rl代号  0     1    2  3
                },
                { //R/L
                    label: "R&L", //rl名称 空值   R    L  R&L
                    value: '2', //rl代号  0     1    2  3
                },
            ],
            result: { //最终结果
                reason: "", //原因分析
                handle_way: "", //处理方式
                supplier: { //责任单位
                    label: "", //供应商名称
                    value: "", //供应商代号
                    responsible_type: "", //类型
                },
                handle_result: { //处理结果
                    label: "", //处理结果名称 空值 FAIL PASS 
                    value: '', //处理结果代号  ''     1    2
                },
                RL: { //R/L
                    label: "", //rl名称 空值   R    L  R&L
                    value: '', //rl代号  ''     1    2  3
                },
                imgs: [
                ]
            },
        }
    },
    methods: {
        asyncChange(e) {
            let _this = this
            uni.showModal({
                confirmText:this.$t('common.确定'),
                cancelText:this.$t('common.取消'),
                content: e ? this.$t('common.是否确认结案') : this.$t('common.是否要取消结案'),
                success: (res) => {
                    if (res.confirm) {
                        _this.save(e)
                    }
                }
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
                    _this.headData[name] = res.result
                }
            });
        },
        save(e) {
            //表单验证
            if (!this.headData.po) return uni.$u.toast(this.$t('common.请填写po号'))
            if (!this.headData.lineObj.value) return uni.$u.toast(this.$t('common.请填写产线'))
            if (!this.headData.shoe_num) return uni.$u.toast(this.$t('common.请填写码数'))
            if (e && !this.issue.remark) return uni.$u.toast(this.$t('common.请填写问题点录入'))
            if (e && !this.result.reason) return uni.$u.toast(this.$t('common.请填写原因分析'))
            if (e && !this.result.handle_way) return uni.$u.toast(this.$t('common.请填写处理方式'))
            if (e && !this.result.supplier.value) return uni.$u.toast(this.$t('common.请选择责任单位'))
            if (e && !this.result.handle_result.value) return uni.$u.toast(this.$t('common.请选择处理结果'))
            if (e && !this.result.RL.value) return uni.$u.toast(this.$t('common.请选择RL'))
            this.loading = true
            if (e !== undefined) this.isFinish = e
            let data = {
                "task_no": this.query.task_no,
                "po": this.headData.po,//PO号
                "shoe_no": this.headData.shoe_type,//鞋型
                "shoe_name": this.headData.shoe_name,//鞋型名称
                "art_no": this.headData.art,//ART
                "line_no": this.headData.lineObj.value,//产线代号
                "shoe_num": this.headData.shoe_num,//码数
                "remark": this.issue.remark,//问题点说明
                "reason": this.result.reason,//原因分析
                "handle_way": this.result.handle_way,//处理方式
                "isFinish": this.isFinish ? '1' : '0',//是否已结案 1已结案 0未结案
                "handle_result": this.result.handle_result.value,//处理结果 0 FAIL    1 PASS
                "rl": this.result.RL.value,//处理结果 0 r 1 l
                "suppliertype": this.result.supplier.responsible_type,//责任单位//0 供应商 1 部门
                "suppliervalue": this.result.supplier.value,//处理结果 供应商or部门代号
                "imgs_wt": this.issue.imgs,//问题点录入图片
                "imgs_x": this.x.imgs,//X光机复核反馈图片
                "imgs_end": this.result.imgs,//最终处理结果图片

            }
            for (const key in data) {
                data[key] == null && (data[key] = "")
            }
            this.$apis[this.query.type == 'add' ? 'AddMetalCheck' : 'EditMetalCheck'](data).then((res) => {
                console.log(data, res, '保存任务详情')
                this.$refs.uToast.show({
                    type: 'success',
                    message: this.$t('common.操作成功'),
                    duration: 1000,
                    complete() {
                        if (e == undefined || e == true) uni.navigateBack()//返回上一页
                    }
                })
            }).catch((err) => {
                console.error(err);
                if (e !== undefined) this.isFinish = !e
                uni.$u.toast(err)
            }).finally(() => {
                this.loading = false
            })
        },
        getPoInfo() {
            let data = {
                po: this.headData.po,//po信息
            }
            this.$apis.getPoInfo(data).then((res) => {
                console.log(data, res, '获取po信息')
                if (!res.RetData1.length) throw this.$t('common.查无数据')
                res.RetData1 = res.RetData1[0]
                if (res.RetData1.url) this.headData.imgs.push({
                    url: res.RetData1.url,
                    guid: res.RetData1.guid,
                })
                this.headData.art = res.RetData1.art
                this.headData.shoe_type = res.RetData1.shoe_type
                this.headData.shoe_name = res.RetData1.shoe_name

            }).catch((err) => {
                console.error(err);
                this.headData.art = ''
                this.headData.shoe_type = ''
                this.headData.shoe_name = ''
                uni.$u.toast(err || this.$t('common.查无数据'))
            })
        },
        async afterRead(event, item) {
            event.file.forEach((e, i) => {
                uploadFilePromise(e.url).then((res) => {
                    let returnObj = JSON.parse(res.data).returnObj
                    item.push({ url: e.url, guid: returnObj.guid })
                    console.log(returnObj, item, '上传')
                }).catch((err) => {
                    console.log(err);
                })
            })

        },
        deletePic(event, item) {
            item.splice(event.index, 1)
        },
        getData() {
            let data = {
                task_no: this.query.task_no,//任务代号
            }
            this.$apis.GetMetalCheckDetail(data).then((res) => {
                console.log(data, res, '获取任务详情')
                res.RetData1.RetData1 = Array.isArray(res.RetData1.RetData1) ? res.RetData1.RetData1[0] : res.RetData1.RetData1
                res.RetData1.imgs_head = [{
                    url: res.RetData1.RetData1.url,
                    guid: res.RetData1.guid,
                }]
                res.RetData1.imgs_wt.forEach((e, i) => {
                    e.url = e.URL
                    e.guid = e.GUID
                })
                res.RetData1.imgs_x.forEach((e, i) => {
                    e.url = e.URL
                    e.guid = e.GUID
                })
                res.RetData1.imgs_end.forEach((e, i) => {
                    e.url = e.URL
                    e.guid = e.GUID
                })
                this.headData.imgs = res.RetData1.imgs_head
                this.headData.po = res.RetData1.RetData1.po
                this.headData.x_result = res.RetData1.RetData1.x_result
                this.headData.lineObj.label = res.RetData1.RetData1.line_name
                this.headData.lineObj.value = res.RetData1.RetData1.line_no
                this.headData.shoe_num = res.RetData1.RetData1.shoe_num
                this.headData.art = res.RetData1.RetData1.art || this.query.art || ''
                this.headData.shoe_type = res.RetData1.RetData1.shoe_type || this.query.shoe_type || ''
                this.headData.shoe_name = res.RetData1.RetData1.shoe_name || this.query.shoe_name || ''
                if (this.headData.art == 'null') this.headData.art = ''
                if (this.headData.shoe_type == 'null') this.headData.shoe_type = ''
                if (this.headData.shoe_name == 'null') this.headData.shoe_name = ''
                this.issue.remark = res.RetData1.RetData1.remark
                this.issue.imgs = res.RetData1.imgs_wt
                this.x.imgs = res.RetData1.imgs_x
                this.result.reason = res.RetData1.RetData1.reason
                this.result.handle_way = res.RetData1.RetData1.handle_way
                this.result.imgs = res.RetData1.imgs_end
                this.result.supplier = {
                    label: res.RetData1.RetData1.supplierlabel,
                    value: res.RetData1.RetData1.responsible_unit,
                    responsible_type: res.RetData1.RetData1.responsible_type,
                }
                this.result.handle_result = {
                    label: this.handle_resultArr.find(e => e.value == res.RetData1.RetData1.handle_result).label || '',
                    value: res.RetData1.RetData1.handle_result,
                }
                this.result.RL = {
                    label: this.RLArr.find(e => e.value == res.RetData1.RetData1.rl).label || '',
                    value: res.RetData1.RetData1.rl,
                }
                this.isFinish = res.RetData1.RetData1.ISFINISH == 1
            }).catch((err) => {
                console.error(err);
            })
        }

    },
    onShow() {

    },
    onLoad(query) {
        this.query = query
        this.query.type == 'edit' && this.getData()
    }
}
</script>
<style lang='scss' scoped>
.metalCheckDetail {
    .switch {
        display: flex;
        align-items: center;
        .txt {
            font-size: 16px;
            margin-right: 5rpx;
        }
        .suc {
            color: #bcffe3 !important;
        }
        .err {
            color: #ffb1ad !important;
        }
    }
    .btn {
        padding: 15rpx;
    }
}
</style>