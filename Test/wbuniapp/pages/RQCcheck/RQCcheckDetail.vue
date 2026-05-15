<template>
    <div class='RQCcheckDetail p15'>
        <u-navbar ref="navbar" border fixed :title="$t('common.RQC审核详情')" :leftText="$t('common.返回')" placeholder autoBack>
            <u-button type="success" v-if="isEdit&&!isFac" size="small" :loading="loading" slot="right" :text="$t('common.提交报告')" @click="editSave(true)"></u-button>
        </u-navbar>
        <u-toast ref="uToast"></u-toast>
        <u-button class="buttonFix" v-if="!isFac&&isEdit" color="#0ab99c" type="success" :loading="loading" :text="$t('common.保存修改')" @click="editSave()"></u-button>
        <!-- 新增信息 -->
        <uni-card margin="15rpx 0">
            <div class="myList">
                <div class="item">
                    <div class="label">{{$t('common.供应商')}}:</div>
                    <div class="value">
                        <mySelect getFirst :disabled="isEdit" apiName="RQCcheck_GetRQCAudit_Edit_suppliers" v-model="addForm.suppliers" type="search"></mySelect>
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.审核类型')}}:</div>
                    <div class="value">
                        <mySelect getFirst :disabled="isEdit" apiName="RQCcheck_GetRQCAudit_Edit_audit_type" v-model="addForm.audit_type" type="search"></mySelect>
                    </div>
                </div>
                <div class="item2">
                    <div class="label">{{$t('common.整体描述')}}:</div>
                    <div class="value">
                        <u--textarea :disabled="isFac" v-model="addForm.overall_desc"></u--textarea>
                    </div>
                </div>
                <div class="item2">
                    <div class="label">{{$t('common.改善建议')}}:</div>
                    <div class="value">
                        <u--textarea :disabled="isFac" v-model="addForm.imp_suggest"></u--textarea>
                    </div>
                </div>
                <div class="item2" v-if="!isEdit">
                    <div class="value">
                        <u-button type="primary" :loading="loading" @click="add()" :text="$t('common.生成任务')"></u-button>
                    </div>
                </div>
            </div>
        </uni-card>
        <!-- 审核项目 -->
        <uni-card margin="15rpx 0" v-if="isEdit">
            <div class=" myList">
                <!-- <div class="item">
                    <div class="label">审核项目分类:</div>
                    <div class="value">
                        <mySelect clearabled @confirm="getBaseData(true)" apiName="RQCcheck_GetRQCAudit_Edit_audit_item_cate" v-model="audit_item_cate" type="search"></mySelect>
                    </div>
                </div> -->
                <div class="item">
                    <div class="label">{{$t('common.项目总分')}}:</div>
                    <div class="value">
                        {{item_total}}
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.审核评分')}}:</div>
                    <div class="value">
                        {{audit_score}}
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.审核状态')}}:</div>
                    <div class="value">
                        {{audit_state}}
                    </div>
                </div>
            </div>
        </uni-card>
        <u-collapse accordion @open="open" ref="Collapse" :value="activeNames">
            <u-collapse-item v-for='(item2,i) in list' :ref="item2.audit_type_f_code" :name="item2.audit_type_f_code" :key='i' :title="item2.audit_type_f_name">
                <!-- 列表 -->
                <block v-for="(item,i) in item2.status=='loadmore'?item2.details.slice(0,5):item2.details" :key='i'>
                    <div class="myList box p15 u-border" v-if="item2.audit_type_f_code==activeNames">
                        <div class="item">
                            <div class="label">{{$t('common.序号')}}:</div>
                            <div class="value">
                                {{item.index}}
                            </div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.审核项目分类')}}:</div>
                            <div class="value">
                                {{item.audit_item_cate_code}}
                            </div>
                        </div>
                        <div class="item2">
                            <div class="label">{{$t('common.审核项目内容')}}:</div>
                            <div class="value">
                                {{item.audit_item_cate_content}}
                            </div>
                        </div>
                        <div class="item2">
                            <div class="label">{{$t('common.备注')}}:</div>
                            <div class="value">
                                {{item.remarks}}
                            </div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.分数上限')}}:</div>
                            <div class="value">
                                {{item.score_limit}}
                            </div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.评分')}}:</div>
                            <div class="value">
                                <span v-if="isFinish||isFac">{{item.score}}</span>
                                <u-number-box v-else :disabled="isFinish||isFac" color="#ffffff" bgColor="#2979ff" iconStyle="color: #fff" :min="0" :max="+item.score_limit" v-model="item.score"></u-number-box>
                            </div>
                        </div>
                        <div class="item2">
                            <div class="label">{{$t('common.审核结果')}}:</div>
                            <div class="value">
                                <span v-if="isFinish||isFac">{{item.examine_resObj.label}}</span>
                                <mySelect v-else :disabled="isFinish ||isFac" :list="examine_resList" v-model="item.examine_resObj" type="action"></mySelect>
                            </div>
                        </div>
                        <div class="item2">
                            <div class="label">{{$t('common.问题点')}}:</div>
                            <div class="value">
                                <span v-if="isFinish||isFac">{{item.pb_point}}</span>
                                <u--textarea v-else :disabled="isFinish ||isFac" v-model="item.pb_point"></u--textarea>
                            </div>
                        </div>
                        <div class="item2">
                            <div class="label">{{$t('common.问题图片')}}:</div>
                            <div class="value">
                                <upload :disabled="isFinish ||isFac" :fileList="item.file_list_wtd"></upload>
                            </div>
                        </div>
                        <div class="item2">
                            <div class="label">{{$t('common.改善结果')}}:</div>
                            <div class="value">
                                <u--textarea v-model="item.improve_res"></u--textarea>
                            </div>
                        </div>
                        <div class="item2">
                            <div class="label">{{$t('common.改善图片')}}:</div>
                            <div class="value">
                                <upload :disabled="!isFac" :fileList="item.file_list_gsjg"></upload>
                            </div>
                        </div>
                        <div class="item2">
                            <div class="btnList value">
                                <u-button color="#767a82" type="primary" @click="getHistory(item)" :text="$t('common.查看历史')"></u-button>
                                <u-button type="success" v-if="!isFac" :loading="loading" :text="$t('common.更新改善结果')" @click="updateSave(item)"></u-button>
                                <u-button type="success" v-if="isFac" :loading="loading" :text="$t('common.提交')" @click="facSave(item)"></u-button>
                                <u-button color="#0ab99c" type="success" v-if="item.is_end==0&&!isFac" :loading="loading" :text="$t('common.结案')" @click="endSave(item)"></u-button>
                                <u-button type="error" :loading="loading" v-if="item.is_end==1&&!isFac" :text="$t('common.取消结案')" @click="endSave(item)"></u-button>
                            </div>
                        </div>
                    </div>
                </block>
                <u-loadmore line :status="item2.status" fontSize="22" iconSize="24" color="#42b983" @loadmore="()=>{initCollapse(item2)}" :loadmoreText="$t('common.点击加载更多')" :nomoreText="$t('common.没有更多了')" :loadingText="$t('common.加载中')+'...'" />
            </u-collapse-item>
        </u-collapse>
        <!-- <div class="tip inf" v-if="more&&isEdit">加载中...</div>
        <div class="tip inf" v-if="!more&&isEdit">没有更多了...</div> -->
        <!-- <div class="toTop"  v-if="more&&isEdit">
            <u-icon name="arrow-up-fill" color="#2979ff" size="28" @click=""></u-icon>
        </div> -->
        <zero-back-top :scrollTop='scrollTop'></zero-back-top>
        <!-- 查看历史 -->
        <u-popup :show="historyShow" @close="historyShow=false" :round="10" closeOnClickOverlay>
            <div class="history p15">
                <div class="talbe">
                    <uni-table border :loading="loading">
                        <uni-tr>
                            <uni-th>{{$t('common.日期')}}</uni-th>
                            <uni-th>{{$t('common.修改前')}}</uni-th>
                            <uni-th>{{$t('common.修改后')}}</uni-th>
                            <uni-th>{{$t('common.操作员')}}</uni-th>
                        </uni-tr>
                        <uni-tbody height="80vh">
                            <uni-tr v-for='(item,i) in historyList' :key='i'>
                                <uni-td>
                                    {{item.createdate}}
                                </uni-td>
                                <uni-td>
                                    {{item.old_val}}
                                </uni-td>
                                <uni-td>
                                    {{item.new_val}}
                                </uni-td>
                                <uni-td>
                                    {{item.createby}}
                                </uni-td>
                            </uni-tr>
                        </uni-tbody>
                    </uni-table>
                </div>
            </div>
        </u-popup>
    </div>
</template>
<script>
export default {
    name: 'RQCcheckDetail',
    data() {
        return {
            isFinish: false,//是否已提交报告
            scrollTop: 0,
            // more: true,
            loading: false,
            historyShow: false,
            addForm: {
                suppliers: {//供应商
                    label: '',
                    value: '',
                },
                audit_type: {//审核类型
                    label: '',
                    value: '',
                },
                overall_desc: "",//整体描述
                imp_suggest: "",//盖上建议
            },
            audit_item_cate: {//审核项目分类
                label: '',
                value: '',
            },
            item_total: '',//项目总分
            allList: [],//总列表数据
            list: [],//列表数据
            historyList: [],//历史列表数据
            examine_resList: [//审核结果下拉列表
                {
                    label: 'pass',
                    value: '0',
                },
                {
                    label: 'fail',
                    value: '1',
                },

            ],
            activeNames: '',
        }
    },
    computed: {
        isEdit: function () {//是否为编辑
            return this.query.type == 'edit'
        },
        isFac: function () {//是否工厂端
            return this.query.fac == 'true'
        },
        audit_score: {//审核评分
            get() {
                let arr = []
                this.list.forEach((e, i) => {
                    arr.push(...e.details)
                })
                return arr.reduce((prev, curr) => { return prev + Number(curr.score || 0) }, 0).toFixed(2)
            },
            set(val) {
                return val
            },
        },
        audit_state: {//审核状态
            get() {
                let arr = []
                this.list.forEach((e, i) => {
                    arr.push(...e.details)
                })
                return arr.every(e => e.is_end == 1) ? this.$t('common.已结案') : this.$t('common.待改善')
            },
            set(val) {
                return val
            },
        },

    },
    methods: {
        add() {//生成任务
            this.loading = true
            let data = {
                ...this.addForm,
                "suppliers_code": this.addForm.suppliers.value,//供应商代号
                "audit_type_code": this.addForm.audit_type.value,//审核类型代号
            }
            this.$apis.RQCcheck_InsertRQCAudit_Edit(data).then((res) => {
                let task_no = res
                uni.redirectTo({ url: `/pages/RQCcheck/RQCcheckDetail?type=edit&task_no=${task_no}` })
            }).catch((err) => {
                console.error(err);
            }).finally(() => {
                this.loading = false
            })
        },
        initCollapse(item) {
            if (item) item.status = 'loading'
            this.$nextTick(() => {
                this.$refs.Collapse.init()
                uni.hideLoading();
                if (item) item.status = 'nomore'
            })
        },
        open(activeNames) {
            uni.showLoading({
                title: this.$t('common.正在努力加载中')
            });
            this.activeNames = activeNames

            this.initCollapse()

            // setTimeout(() => {
            //     this.$nextTick(() => {
            //         this.$refs.Collapse.init()
            //         // this.$refs[activeNames][0].init()
            //     })
            // }, 500);


        },
        getBaseData(isSearch) {//获取详情页信息
            let data = {
                "task_no": this.query.task_no,//任务编号
                "audit_item_cate_code": this.audit_item_cate.value//审核项目分类
            }
            this.$apis.RQCcheck_GetRQCAudit_Edit(data).then((res) => {
                let { datahead, databody } = res
                this.isFinish = datahead.sub_state == 1
                this.addForm.suppliers.label = datahead.suppliers_name
                this.addForm.suppliers.value = datahead.suppliers_code
                this.addForm.audit_type.value = datahead.audit_type_code
                this.addForm.audit_type.label = datahead.audit_type_name
                isSearch || (this.addForm.overall_desc = datahead.overall_desc)
                isSearch || (this.addForm.imp_suggest = datahead.imp_suggest)
                this.item_total = datahead.item_total
                this.audit_score = datahead.audit_score
                this.audit_state = datahead.audit_state
                this.list = databody
                this.list.forEach((e, i) => {
                    this.$set(e, 'status', e.details.length > 5 ? 'loadmore' : 'nomore')
                    e.details.forEach((e2, i2) => {
                        e2.index = i2 + 1
                        this.$set(e2, 'examine_resObj', {
                            label: e2.examine_res == 1 ? 'fail' : 'pass',
                            value: e2.examine_res || 0,
                        })
                    })

                })
                // this.list = []
                // this.list.push(...this.allList.splice(0, 10))
                // if (!this.allList.length) this.more = false
                this.$nextTick(() => {
                    uni.hideLoading();
                })
                // setTimeout(() => {
                //     uni.hideLoading();
                // }, 2000);
            }).catch((err) => {
                console.error(err);
            })
        },
        getHistory(item) {//获取历史记录
            let data = {
                "id": item.id,
                "keyword": "",
                "pageRow": "9999",
                "page": "1"
            }
            this.$apis.RQCcheck_GetRQCAudit_Edit_history(data).then((res) => {
                this.historyList = res.Data
                this.historyShow = true
            }).catch((err) => {
                this.historyList = []
                console.error(err);
            })
        },
        updateSave(item) {//更新改善结果
            this.loading = true
            let data = {
                ...item
            }
            this.$apis.RQCcheck_EditRQCAudit_Edit_gsjg(data).then((res) => {
                uni.$u.toast(this.$t('common.更新成功'))
            }).catch((err) => {
                console.error(err);
            }).finally(() => {
                this.loading = false
            })
        },
        endSave(item) {//结案/取消结案
            this.loading = true
            let data = {
                "id": item.id//工厂审核卡片id
            }
            this.$apis[item.is_end == 1 ? 'RQCcheck_EditRQCAudit_Edit_cancel_over' : 'RQCcheck_EditRQCAudit_Edit_over'](data).then((res) => {
                item.is_end = item.is_end == 1 ? 0 : 1
                this.editSave(false, true,)
            }).catch((err) => {
                console.error(err);
            }).finally(() => {
                this.loading = false
            })
        },
        facSave(item) {//工厂端提交
            this.loading = true
            let data = {
                "id": item.id,//工厂审核卡片id
                "improve_res": item.improve_res,//改善结果
                "gsjgguid": item.file_list_gsjg
            }
            this.$apis.RQCcheck_EditRQCAudit_Edit_factory_gsjg(data).then((res) => {
                uni.$u.toast(this.$t('common.更改成功'))
                // this.getBaseData()
            }).catch((err) => {
                console.error(err);
            }).finally(() => {
                this.loading = false
            })
        },
        editSave(isAll, isItem,) {//保存修改 isAll 是否为提交报告  isItem 是否为保存单个结案 item 项
            this.loading = true
            let newArr = []
            this.list.forEach((item, i) => {
                item.details.forEach((e, i) => {
                    e.score = e.score || 0
                    e.examine_res = e.examine_resObj.value
                    e.wtdguid = e.file_list_wtd
                    e.gsjgguid = e.file_list_gsjg
                })
                // newArr.push({
                //     "id": e.id,//审核项目详情id
                //     "score": e.score || 0,//评分
                //     "examine_res": e.examine_resObj.value,//审核结果 0:pass;1:fail
                //     "pb_point": e.pb_point,//问题点
                //     "improve_res": e.improve_res,//改善结果
                //     "wtdguid": e.file_list_wtd,
                //     "gsjgguid": e.file_list_gsjg,
                // })
            })
            // if (this.allList.length) {
            //     this.allList.forEach((e, i) => {
            //         newArr.push({
            //             "id": e.id,//审核项目详情id
            //             "score": e.score || 0,//评分
            //             "examine_res": e.examine_resObj.value,//审核结果 0:pass;1:fail
            //             "pb_point": e.pb_point,//问题点
            //             "improve_res": e.improve_res,//改善结果
            //             "wtdguid": e.file_list_wtd,
            //             "gsjgguid": e.file_list_gsjg,
            //         })
            //     })
            // }
            let data = {
                "task_no": this.query.task_no,//任务编号
                "overall_desc": this.addForm.overall_desc,//整体描述
                "imp_suggest": this.addForm.imp_suggest,//改善建议
                "datahead": this.list,
            }
            this.$apis[isAll ? 'RQCcheck_EditRQCAudit_Edit_sub' : 'RQCcheck_EditRQCAudit_Edit'](data).then((res) => {
                if (!isItem) this.getBaseData()
                this.$refs.uToast.show({
                    type: 'success',
                    message: this.$t('common.操作成功'),
                    duration: 1000,
                    complete() {
                        isAll && uni.navigateBack()//返回上一页
                    }
                })
            }).catch((err) => {
                console.error(err);
            }).finally(() => {
                this.loading = false
            })


        }
    },
    onReady() {
        // uni.hideLoading();
    },
    onShow() {
    },
    onLoad(query) {
        this.query = query
        if (this.query.type == 'edit') {
            this.getBaseData()
            uni.showLoading({
                title: this.$t('common.正在努力加载中')
            });
        }

    },
    onReachBottom() {
        // let arr = this.allList.splice(0, 10)
        // if (!arr.length) return this.more = false
        // this.list.push(...arr)

    },
    onPageScroll(e) {
        this.scrollTop = e.scrollTop;
    }
}
</script>
<style lang='scss' scoped>
.RQCcheckDetail {
    .toTop {
        position: fixed;
        right: 20px;
        bottom: 20px;
    }
    .box {
        background: #fff;
        margin-top: 5rpx;
    }
    .tip {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 20px;
    }
}
</style>