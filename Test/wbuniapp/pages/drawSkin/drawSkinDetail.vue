<template>
    <div class='drawSkinDetail'>
        <u-navbar border :title="traTitle()" :leftText="$t('common.返回')" placeholder autoBack>
            <u-button type="success" size="small" slot="right" @click="Painted_Skin_List_Complete_PDA" :text="$t('common.完成画皮')" v-if="query.type==2"></u-button>
            <u-button type="success" size="small" slot="right" @click="save" :text="$t('common.保存修改')" v-if="query.type==3"></u-button>
        </u-navbar>
        <u-toast ref="uToast"></u-toast>
        <uni-card :title="$t('common.物料信息')" margin=" 0 0 15rpx 0" v-if="query.type==3">
            <div class="myList">
                <div class="item">
                    <div class="label">{{$t('common.材料料号')}}:</div>
                    <div class="value">{{drawHead.ITEM_NO}}</div>
                </div>
                <div class="item2">
                    <div class="label">{{$t('common.材料名称')}}:</div>
                    <div class="value">{{drawHead.ITEM_NAME}}</div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.日期')}}:</div>
                    <div class="value">{{drawHead.CREATEDATE}}</div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.材料类型')}}:</div>
                    <div class="value">{{drawHead.ITEM_TYPE_NAME}}</div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.画皮数量')}}:</div>
                    <div class="value">{{drawHead.QTY}}</div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.买进皮料数量')}}:</div>
                    <div class="value">
                        {{query.item.mtl_qty}}
                        <!-- <u--input v-model="drawHead.PL_QTY" placeholder="买进皮料数量" type="number"></u--input> -->
                    </div>
                </div>
                <!-- <div class="item">
                    <div class="label">{{$t('common.核准人')}}:</div>
                    <div class="value">
                        <u--input v-model="drawHead.APPROVER" placeholder="核准人"></u--input>
                    </div>
                </div> -->
                <div class="item">
                    <div class="label">{{$t('common.生产厂商')}}:</div>
                    <div class="value">
                        {{query.item.vend_name}}
                        <!-- <u--input v-model="drawHead.SUPPLIER" placeholder="生产厂商"></u--input> -->
                    </div>
                </div>
                <!-- <div class="item">
                    <div class="label">{{$t('common.制表人')}}:</div>
                    <div class="value">
                        <u--input v-model="drawHead.TABULATOR" placeholder="制表人"></u--input>
                    </div>
                </div> -->
            </div>
        </uni-card>
        <uni-card :title="$t('common.物料信息')" margin=" 0 0 15rpx 0" v-else>
            <div class="myList2">
                <div class="item">
                    <div class="label">{{$t('common.生产厂商')}}:</div>
                    <div class="value">{{query.item.VEND_NAME}}</div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.料号')}}:</div>
                    <div class="value">{{query.item.ITEM_NO}}</div>
                </div>
                <div class="item2">
                    <div class="label">{{$t('common.材料名称')}}:</div>
                    <div class="value">{{query.item.ITEM_NAME}}</div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.进仓日期')}}:</div>
                    <div class="value">{{query.item.WH_DATE}}</div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.买进皮料数量')}}:</div>
                    <div class="value">{{query.item.MTL_QTY}}</div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.已画皮数量')}}:</div>
                    <div class="value">{{query.item.YHP_QTY}}</div>
                </div>
            </div>
        </uni-card>

        <u-subsection :list="list" mode="subsection" :current="current" @change="sectionChange"></u-subsection>
        <div class="myDrawLog" v-if="current==0&&query.type==1">
            <div class="add">
                <div class="item">
                    <u--input v-model="addForm.rank" suffixIcon="arrow-down" readonly @click.native="rankShow=true"></u--input>
                </div>
                <div class="item">
                    <u--input v-model="addForm.num" :placeholder="$t('common.数量面积')" type="number"></u--input>
                </div>
                <div class="item">
                    <u-button icon="plus" :loading="loading" type="success" :text="$t('common.增加')" @click="add" :disabled="!addForm.rank|| !addForm.num||query.item.TASK_STATE=='已完成'"></u-button>
                </div>
            </div>
            <div class="table">
                <uni-table border :loading="loading">
                    <uni-tr>
                        <uni-th width="80">{{$t('common.皮料等级')}}</uni-th>
                        <uni-th>{{$t('common.数量面积')}}</uni-th>
                        <uni-th>{{$t('common.操作时间')}}</uni-th>
                        <uni-th>{{$t('common.操作')}}</uni-th>
                    </uni-tr>
                    <uni-tbody height="50vh">
                        <uni-tr v-for='(e,i) in myDrawLogList' :key='i'>
                            <uni-td width="80">{{e.PL_LEVEL}}</uni-td>
                            <uni-td>{{e.QTY}}</uni-td>
                            <uni-td>{{e.CREATEDATE}}</uni-td>
                            <uni-td>
                                <u-button icon="trash" type="error" :disabled="query.item.TASK_STATE=='已完成'" :text="$t('common.删除')" @click="del(e)"></u-button>
                            </uni-td>
                        </uni-tr>
                    </uni-tbody>

                </uni-table>
            </div>
            <uni-pagination show-icon="true" :total="total" v-model="page" @change="GetPainted_Skin_Edit_JL_PDA"></uni-pagination>
            <u-action-sheet :cancelText="$t('common.取消')" @select="selectClick" @close="rankShow=false" closeOnClickOverlay closeOnClickAction :actions="rankList" :title="$t('common.皮料等级选择')" :show="rankShow"></u-action-sheet>
        </div>
        <div class="myDrawAll" v-if="current==1&&query.type==1">
            <div class="table">
                <uni-table border :loading="loading">
                    <uni-tr>
                        <uni-th>{{$t('common.皮料等级')}}</uni-th>
                        <uni-th>{{$t('common.数量面积')}}</uni-th>
                    </uni-tr>
                    <uni-tbody>
                        <uni-tr v-for='(e,i) in myDrawAllList' :key='i'>
                            <uni-td>{{e.ENUM_VALUE}}</uni-td>
                            <uni-td>{{e.QTY}}</uni-td>
                        </uni-tr>
                        <uni-tr>
                            <uni-td>{{$t('common.总和')}}</uni-td>
                            <uni-td>{{sum(myDrawAllList)}}</uni-td>
                        </uni-tr>
                    </uni-tbody>
                </uni-table>
            </div>
        </div>
        <div class="DrawLog" v-if="current==0&&query.type==2">
            <div class="add">
                <div class="item">
                    <mySelect @confirm="confirmPeople" :list="peopleList" labelName="STAFF_NAME" v-model="curPeople" type="picker"></mySelect>
                </div>
            </div>
            <div class="table">
                <uni-table border :loading="loading">
                    <uni-tr>
                        <uni-th width="80">{{$t('common.皮料等级')}}</uni-th>
                        <uni-th>{{$t('common.数量面积')}}</uni-th>
                        <uni-th>{{$t('common.操作时间')}}</uni-th>
                        <uni-th>{{$t('common.操作员')}}</uni-th>
                    </uni-tr>
                    <uni-tbody height="50vh">
                        <uni-tr v-for='(e,i) in DrawLogList' :key='i'>
                            <uni-td width="80">{{e.PL_LEVEL}}</uni-td>
                            <uni-td>{{e.QTY}}</uni-td>
                            <uni-td>{{e.WH_DATE}}</uni-td>
                            <uni-td>{{e.STAFF_NAME}}</uni-td>
                        </uni-tr>
                    </uni-tbody>
                </uni-table>
            </div>
            <uni-pagination @change="GetPainted_Skin_List_task_d_PDA" show-icon="true" :total="total" v-model="page"></uni-pagination>
        </div>
        <div class="DrawAll" v-if="current==1&&query.type==2">
            <div class="table">
                <uni-table border :loading="loading">
                    <uni-tr>
                        <uni-th>{{$t('common.皮料等级')}}</uni-th>
                        <uni-th>{{$t('common.数量面积')}}</uni-th>
                        <uni-th>{{$t('common.系数')}}</uni-th>
                        <uni-th>{{$t('common.倍数')}}</uni-th>
                    </uni-tr>
                    <uni-tbody>
                        <uni-tr v-for='(e,i) in DrawAllList' :key='i'>
                            <uni-td>{{e.ENUM_VALUE}}</uni-td>
                            <uni-td>{{e.QTY}}</uni-td>
                            <uni-td>{{e.COEFFICIENT}}</uni-td>
                            <uni-td>{{e.MULTIPLE}}</uni-td>
                        </uni-tr>
                    </uni-tbody>
                </uni-table>
            </div>
            <div class="tip">{{$t('common.购进质量系数')}}: {{pecft}}</div>
        </div>
        <div class="DrawCheck" v-if="current==0&&query.type==3">
            <div class="table">
                <uni-table border :loading="loading">
                    <uni-tr>
                        <uni-th width='80'>{{$t('common.序号')}}</uni-th>
                        <uni-th>{{$t('common.供应商面积')}}</uni-th>
                        <uni-th>{{$t('common.实际面积')}}</uni-th>
                    </uni-tr>
                    <uni-tbody>
                        <uni-tr v-for='(e,i) in DrawCheckList' :key='i'>
                            <uni-td width='80'>{{e.SORTING==21?$t('common.合计'):e.SORTING}}</uni-td>
                            <uni-td>
                                <u--input type="number" v-model="e.SUPPLIER_AREA" :disabled="e.SORTING==21"></u--input>
                            </uni-td>
                            <uni-td>
                                <u--input type="number" v-model="e.ACTUAL_AREA" :disabled="e.SORTING==21"></u--input>
                            </uni-td>
                        </uni-tr>
                    </uni-tbody>
                </uni-table>
            </div>
            <div class="tip">
                <div class="label">{{$t('common.面积差异系数')}}</div>
                <div class="value">
                    <u--input v-model="drawHead.AREA_DIFF_CFT" disabled :placeholder="$t('common.面积差异系数')"></u--input>
                </div>
            </div>
        </div>
        <div class="DrawCheckAll" v-if="current==1&&query.type==3">
            <div class="table">
                <uni-table border :loading="loading">
                    <uni-tr>
                        <uni-th width="80">{{$t('common.等级')}}</uni-th>
                        <uni-th>{{$t('common.数量尺')}}</uni-th>
                        <uni-th>{{$t('common.系数')}}</uni-th>
                        <uni-th>{{$t('common.倍数')}}</uni-th>
                    </uni-tr>
                    <uni-tbody>
                        <uni-tr v-for='(e,i) in DrawCheckAllList' :key='i'>
                            <uni-td>{{e.ENUM_VALUE}}</uni-td>
                            <uni-td>
                                <div class="input" v-if="e.ISINPUT=='true'">
                                    <u--input v-model="e.QTY" :formatter="e=>+e" type="number"></u--input>
                                </div>
                                <div class="txt" v-else>{{e.QTY}}</div>
                            </uni-td>
                            <uni-td>{{e.COEFFICIENT}}</uni-td>
                            <uni-td>
                                <div class="input" v-if="e.ISINPUT=='true'">
                                    <u--input v-model="e.MULTIPLE" :formatter="e=>+e" type="number"></u--input>
                                </div>
                                <div class="txt" v-else>{{e.MULTIPLE}}</div>
                            </uni-td>
                        </uni-tr>
                        <uni-tr>
                            <uni-td width="80">{{$t('common.总数')}}</uni-td>
                            <uni-td>{{allQTY}}</uni-td>
                            <uni-td>-</uni-td>
                            <uni-td>{{allMULTIPLE}}</uni-td>
                        </uni-tr>
                    </uni-tbody>
                </uni-table>
            </div>
            <div class="tip">
                <div class="label">{{$t('common.购进质量系数')}}</div>
                <div class="value">
                    <u--input v-model="PUR_QTY_CFT" placeholder="购进质量系数" disabled></u--input>
                </div>
            </div>
            <div class="tip">
                <div class="label">{{$t('common.平均使用率')}}</div>
                <div class="value">
                    <u--input v-model="drawHead.AVG_USE_RATE" :placeholder="$t('common.平均使用率')"></u--input>
                </div>
            </div>
            <div class="tip">
                <div class="label">{{$t('common.评估')}}</div>
                <div class="value">
                    <u--textarea v-model="drawHead.ASSESSMENT" :placeholder="$t('common.请输入内容')"></u--textarea>
                </div>
            </div>
        </div>
    </div>
</template>
<script>


export default {
    name: 'drawSkinDetail',
    data() {
        return {
            query: {},//type:1--画皮操作
            list: [this.$t('common.个人画皮记录'), this.$t('common.个人画皮汇总'), this.$t('common.画皮记录'), this.$t('common.画皮汇总'), this.$t('common.画皮抽验数据'), this.$t('common.画皮汇总数据'),],
            current: 0,
            page: 1,
            total: 0,
            loading: false,
            rankShow: false,
            peopleShow: false,
            pecft: 0,
            addForm: {
                rank: this.$t('common.Ⅰ级'),
                rankVal: '0',
                num: '',
            },
            curPeople: {
                STAFF_NAME: this.$t('common.全部'),
                CREATEBY: '',
            },
            rankList: [
                {
                    name: this.$t('common.Ⅰ级'),
                    prop: '0',
                },
                {
                    name: this.$t('common.Ⅱ级'),
                    prop: '1',
                },
                {
                    name: this.$t('common.Ⅲ级'),
                    prop: '2',
                },
                {
                    name: this.$t('common.Ⅳ级'),
                    prop: '3',
                },
                {
                    name: this.$t('common.Ⅴ级'),
                    prop: '4',
                },
                {
                    name: this.$t('common.Ⅵ级'),
                    prop: '5',
                },
                {
                    name: this.$t('common.Ⅵ级以下'),
                    prop: '6',
                },
            ],
            drawHead: {},
            peopleList: [],
            myDrawAllList: [],
            myDrawLogList: [],
            DrawLogList: [],
            DrawAllList: [],
            DrawCheckList: [],
            DrawCheckAllList: [],

        }
    },
    computed: {
        PUR_QTY_CFT: {
            get() {
                let item = this.DrawCheckAllList[5]
                // if (this.allMULTIPLE && this.allQTY == 0) return uni.$u.toast('数量总数不能为0'), sum = this.drawHead.PUR_QTY_CFT || 0
                // let sum = (this.allMULTIPLE / this.allQTY).toFixed(2) * 100 + '%'
                // if (!!!(this.allMULTIPLE / this.allQTY)) sum = this.drawHead.PUR_QTY_CFT || 0
                // return sum;
                if (item.MULTIPLE && item.QTY == 0) return uni.$u.toast(this.$t('common.总和数量不能为0')), sum = this.drawHead.PUR_QTY_CFT || 0
                let sum = ((item.MULTIPLE / item.QTY) * 100).toFixed(2) + '%'
                if (!!!(item.MULTIPLE / item.QTY)) sum = this.drawHead.PUR_QTY_CFT || 0
                return sum;
            },
            set(v) {
                console.log(v);
            }
        },
        allQTY() {
            let sum = 0
            this.DrawCheckAllList.forEach((e, i) => {
                if (e.ISTOTAL == "true") {

                } else {
                    sum = sum + Number(e.QTY) * 100
                }

            })
            return (sum / 100).toFixed(2)
        },
        allMULTIPLE() {
            let sum = 0
            this.DrawCheckAllList.forEach((e, i) => {
                if (e.ISTOTAL == "true") {
                } else {
                    sum = sum + Number(e.MULTIPLE) * 100
                }

            })
            return (sum / 100).toFixed(2)
        },

    },
    watch: {
        DrawCheckList: {
            handler(newARR, oldName) {
                let curArr = newARR.slice(0, 20)
                let sum1 = curArr.reduce((prev, curr) => { return prev + Number(curr.SUPPLIER_AREA) * 100 }, 0) / 100
                let sum2 = curArr.reduce((prev, curr) => { return prev + Number(curr.ACTUAL_AREA) * 100 }, 0) / 100
                sum1 = sum1.toFixed(2)
                sum2 = sum2.toFixed(2)
                if (newARR[20].SUPPLIER_AREA == sum1 && newARR[20].ACTUAL_AREA == sum2) return
                newARR[20].SUPPLIER_AREA = sum1;
                newARR[20].ACTUAL_AREA = sum2
                this.calcSum()
            },
            deep: true,
        }
    },
    methods: {
        sectionChange(index) {
            this.current = index;
            if (this.query.type == 1 && this.current == 0) this.GetPainted_Skin_Edit_JL_PDA()
            if (this.query.type == 1 && this.current == 1) this.GetPainted_Skin_Edit_HZ_PDA()
            if (this.query.type == 2 && this.current == 0) this.GetPainted_Skin_List_task_d_PDA()
            if (this.query.type == 2 && this.current == 1) this.GetPainted_Skin_List_HZ_PDA()
        },
        selectClick(row) {
            console.log(row)
            this.addForm.rank = row.name
            this.addForm.rankVal = row.prop

        },
        calcSum() {
            if (this.DrawCheckList[20].SUPPLIER_AREA == 0) return this.drawHead.AREA_DIFF_CFT = "0%"
            this.drawHead.AREA_DIFF_CFT = (this.DrawCheckList[20].ACTUAL_AREA - this.DrawCheckList[20].SUPPLIER_AREA) / this.DrawCheckList[20].SUPPLIER_AREA
            this.drawHead.AREA_DIFF_CFT = (this.drawHead.AREA_DIFF_CFT * 100).toFixed(2) + '%'
        },
        selectPeopleClick(row) {
            console.log(row)
            this.curPeople = row
        },
        add() {
            this.loading = true
            this.$apis.Painted_Skin_Edit_Insert_PDA({
                "task_no": this.query.task_no,
                "qty": this.addForm.num,
                "pl_level": this.addForm.rankVal
            }).then((res) => {
                console.log(res, '新增个人画皮记录')
                uni.$u.toast(this.$t('common.新增成功'))
                this.addForm.num = ""
                this.GetPainted_Skin_Edit_JL_PDA()
                this.GetPainted_Skin_Main_PDA()
            }).catch((err) => {
                uni.$u.toast(this.$t('common.新增失败'))
            }).finally(() => {
                this.loading = false
            })

        },
        traTitle() {
            try {
                return [{ type: 1, label: this.$t('common.画皮操作') }, { type: 2, label: this.$t('common.查看画皮进度') }, { type: 3, label: this.$t('common.SATRA皮料评估表') },].find(e => e.type == this.query.type).label
            } catch (error) {
                return this.$t('common.画皮详情')
            }
        },
        del(row) {
            let _this = this
            uni.showModal({
                confirmText:this.$t('common.确定'),
                cancelText:this.$t('common.取消'),
                content: this.$t('common.是否确定删除'),
                success(res) {
                    if (res.confirm) {
                        _this.$apis.Painted_Skin_Edit_Delete_PDA({
                            "did": row.DID//当前列id
                        }).then((res) => {
                            _this.GetPainted_Skin_Edit_JL_PDA()
                            _this.$u.toast(_this.$t('common.删除成功'))
                            _this.GetPainted_Skin_Main_PDA()

                        }).catch((err) => {
                            _this.$u.toast('删除失败')
                        })
                    }
                },
                fail() {

                }
            })
        },
        confirmPeople(arr) {
            this.page = 1
            this.GetPainted_Skin_List_task_d_PDA()
        },
        GetPainted_Skin_Edit_HZ_PDA() {
            this.loading = true
            this.$apis.GetPainted_Skin_Edit_HZ_PDA({
                "task_no": this.query.task_no
            }).then((res) => {
                console.log(res, '获取个人画皮汇总')
                this.myDrawAllList = res.RetData1.Data
            }).catch((err) => {
            }).finally(() => {
                this.loading = false
            })
        },
        GetPainted_Skin_Edit_JL_PDA() {
            this.loading = true
            this.$apis.GetPainted_Skin_Edit_JL_PDA({
                "task_no": this.query.task_no,
                "pageSize": 10,
                "pageIndex": this.page
            }).then((res) => {
                console.log(res, '获取个人画皮记录')
                this.myDrawLogList = res.RetData1.Data
                this.total = res.RetData1.rowCount
            }).catch((err) => {
            }).finally(() => {
                this.loading = false
            })
        },
        GetPainted_Skin_List_task_d_PDA() {
            this.loading = true
            this.$apis.GetPainted_Skin_List_task_d_PDA({
                "task_no": this.query.task_no,
                "createby": this.curPeople.CREATEBY,
                "pageIndex": this.page
            }).then((res) => {
                console.log(res, '获取画皮记录')
                this.DrawLogList = res.RetData1.Data
                this.peopleList = res.RetData1.DataStaff
                this.peopleList.unshift({
                    STAFF_NAME: this.$t('common.全部'),
                    CREATEBY: '',
                })

                this.total = res.RetData1.rowCount
            }).catch((err) => {
            }).finally(() => {
                this.loading = false
            })
        },
        GetPainted_Skin_List_HZ_PDA() {
            this.loading = true
            this.$apis.GetPainted_Skin_List_HZ_PDA({
                "task_no": this.query.task_no,
            }).then((res) => {
                console.log(res, '获取画皮汇总')
                this.DrawAllList = [...res.RetData1.Data, ...res.RetData1.Data1]
                this.pecft = res.RetData1.pecft
            }).catch((err) => {

            }).finally(() => {
                this.loading = false
            })
        },
        Painted_Skin_List_Complete_PDA() {
            this.$apis.Painted_Skin_List_Complete_PDA({
                "task_no": this.query.task_no,
            }).then((res) => {
                this.$refs.uToast.show({
                    type: 'success',
                    message: this.$t('common.操作成功'),
                    duration: 1000,
                    complete() {
                        uni.navigateBack()//返回上一页
                    }
                })
            }).catch((err) => {
                uni.$u.toast(err || '操作失败')
            }).finally(() => {
            })
        },
        GetPainted_Skin_Report_task_d_PDA() {
            this.$apis.GetPainted_Skin_Report_task_d_PDA({
                "task_no": this.query.task_no,
            }).then((res) => {
                console.log(res, '获取画皮报告数据')
                if (!res.RetData1.DataHead2.length) res.RetData1.DataHead2 = [{
                    APPROVER: "",
                    AREA_DIFF_CFT: "",
                    ASSESSMENT: "",
                    AVG_USE_RATE: "",
                    PL_QTY: '',
                    PUR_QTY_CFT: "",
                    SUPPLIER: "",
                    TABULATOR: "",
                }]
                this.drawHead = { ...res.RetData1.DataHead1[0], ...res.RetData1.DataHead2[0] }
                this.DrawCheckList = res.RetData1.DataCY
                this.DrawCheckAllList = res.RetData1.DataHZ
                console.log(this.drawHead, '转换后')
            }).catch((err) => {
                console.log(err);

            }).finally(() => {
            })
        },
        save() {
            if (this.allMULTIPLE && this.allQTY == 0) return uni.$u.toast(this.$t('common.画皮汇总数据总数为0时无法计算购进质量系数'))
            this.$apis.Painted_Skin_Report_Edit_PDA({
                "task_no": this.query.task_no,
                "tabHead": {
                    "pl_qty": this.drawHead.PL_QTY,
                    "supplier": this.drawHead.SUPPLIER,
                    "approver": this.drawHead.APPROVER,
                    "tabulator": this.drawHead.TABULATOR,
                    "area_diff_cft": this.drawHead.AREA_DIFF_CFT,
                    "pur_qty_cft": this.PUR_QTY_CFT,
                    "avg_use_rate": this.drawHead.AVG_USE_RATE,
                    "assessment": this.drawHead.ASSESSMENT
                },
                "qcm_hp_task_satra_l": this.DrawCheckList,
                "qcm_hp_task_satra_r": this.DrawCheckAllList
            }).then((res) => {
                console.log(res, '保存报告')
                this.$refs.uToast.show({
                    type: 'success',
                    message: this.$t('common.保存成功'),
                    duration: 1000,
                    complete() {
                        uni.navigateBack()//返回上一页
                    }
                })
            }).catch((err) => {
                uni.$u.toast(err || '操作失败')
            }).finally(() => {
            })

        },
        sum(arr) {
            return eval(arr.map(e => e.QTY * 100).join("+")) / 100
        },
        GetPainted_Skin_Main_PDA() {//获取画皮任务数据
            let data = {
                "item_no": "",
                pageIndex: 1,
                pageSize: 10,
                "keyWord": this.query.task_no,
            }
            this.$apis.GetPainted_Skin_Main_PDA(data).then((res) => {
                this.query.item.YHP_QTY = res.RetData1.data[0].YHP_QTY
            }).catch((err) => {
                console.error(err);
            })

        }
    },
    onLoad(query) {
        this.query = query
    },
    onShow() {
        if (!this.query.task_no) return uni.$u.toast(this.$t('common.没有task_no'))
        if (this.query.type == 1) {

            this.query.item = JSON.parse(this.query.item)
            this.list = [this.$t('common.个人画皮记录'), this.$t('common.个人画皮汇总'),]
            this.GetPainted_Skin_Edit_HZ_PDA()
            this.GetPainted_Skin_Edit_JL_PDA()
        }
        if (this.query.type == 2) {
            this.query.item = JSON.parse(this.query.item)
            this.list = [this.$t('common.画皮记录'), this.$t('common.画皮汇总'),]
            this.GetPainted_Skin_List_task_d_PDA()
            this.GetPainted_Skin_List_HZ_PDA()
        }
        if (this.query.type == 3) {
            try {
                this.query.item = JSON.parse(this.query.item)
            } catch (error) {
            }
            this.list = [this.$t('common.画皮抽验数据'), this.$t('common.画皮汇总数据'),]
            this.GetPainted_Skin_Report_task_d_PDA()
        }
    }
}
</script>
<style lang='scss' scoped>
.drawSkinDetail {
    padding: 15rpx;
    .myDrawLog,
    .DrawLog {
        .add {
            background: #fff;
            display: flex;
            padding: 15rpx;
            margin: 5rpx 0;
            border-radius: 5rpx;
            .item {
                margin-right: 5rpx;
            }
        }
        .table {
            margin-bottom: 5rpx;
        }
    }
    .myDrawAll,
    .DrawAll,
    .DrawCheck,
    .DrawCheckAll {
        .table {
            margin: 5rpx 0;
        }
    }
    .DrawCheck,
    .DrawCheckAll {
        .tip {
            display: flex;
            align-items: center;
            margin-bottom: 5rpx;
            .label {
                margin-right: 10rpx;
                width: 200rpx;
                text-align: right;
                font-size: 18rpx;
            }
            .value {
                background: #fff;
                width: 100%;
            }
        }
    }
}
</style>