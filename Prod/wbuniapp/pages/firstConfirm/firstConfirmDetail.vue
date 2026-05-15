<template>
    <div class='firstConfirmDetail'>
        <u-navbar border :title="query.type=='add'?$t('common.新建首件确认'):$t('common.首件确认详情')" :leftText="$t('common.返回')" placeholder autoBack>
            <div class="switch" slot="right" v-if="query.type=='edit'">
                <u-button size='small' :type="isSuc?'success':'error'" :loading="loading" :text="isSuc?$t('common.检验通过'):$t('common.检验未通过')" @click="asyncChange()"></u-button>
            </div>
        </u-navbar>
        <!-- 基本信息 -->
        <u-collapse ref="Collapse" :value="[$t('common.基本信息')]">
            <u-collapse-item :title="$t('common.基本信息')" :name="$t('common.基本信息')">
                <uni-card margin="0">
                    <div class="myList">
                        <div class="item2">
                            <div class="label">{{$t('common.实验室样品编号')}}:</div>
                            <div class="value">
                                <scan v-model="addForm.ex_task_no" @confirm="bindEx_task_no"></scan>
                            </div>
                        </div>
                        <div class="item2">
                            <div class="label">{{$t('common.首件类型')}}:</div>
                            <div class="value">
                                <mySelect :disabled="query.type!='add'" :list="f_typeList" v-model="addForm.f_typeObj" type="action"></mySelect>
                            </div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.首件位置产线')}}:</div>
                            <div class="value">
                                <scan :disabled="query.type!='add'" v-model="addForm.production_line_code"></scan>
                            </div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.首件位置设备')}}:</div>
                            <div class="value">
                                <scan :disabled="query.type!='add'" v-model="addForm.eq_info_no"></scan>
                            </div>
                        </div>
                        <div class="item2">
                            <div class="label">Sales Order:</div>  <!-- PO changed to SO for PO change project -->
                            <div class="value">
                                <mySelect @confirm="confirmPo" :disabled="query.type!='add'" v-model="addForm.POForm" labelName="so_num" apiName="firstConfirm_Outmer_po_getlist" scanAbled type="scan"></mySelect> <!-- mer_po is changed to so_num for PO change Project -->
                            </div>
                        </div>
						<div class="item2">
						    <div class="label">Group PO Number:</div>  <!-- Added for PO change project -->
						    <div class="value">
						        {{addForm.POForm.mer_po}}
						    </div>
						</div>
                        <div class="item">
                            <div class="label">ART:</div>
                            <div class="value">
                                {{addForm.POForm.prod_no}}
                            </div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.模号')}}:</div>
                            <div class="value">
                                {{addForm.POForm.mold_no}}
                            </div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.鞋型名称')}}:</div>
                            <div class="value">
                                {{addForm.POForm.name_t}}
                            </div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.鞋图')}}:</div>
                            <div class="value">
                                <upload :fileList="addForm.POForm.imgs" disabled></upload>
                            </div>
                        </div>
                        <div class="item2">
                            <div class="label">{{$t('common.工段')}}:</div>
                            <div class="value">
                                <mySelect @confirm="confirmWorkshop_section" :disabled="query.type!='add'" :list="workshop_sectionList" labelName="workshop_section_name" valueName="workshop_section_no" v-model="addForm.workshop_sectionObj" type="picker"></mySelect>
                            </div>
                        </div>
                        <div class="item2">
                            <div class="label">{{$t('common.工艺材料种类')}}:</div>
                            <div class="value">
                                <mySelect :disabled="query.type!='add'" :list="addForm.workshop_sectionObj.bottom" labelName="workmanship_name" valueName="workmanship_code" v-model="addForm.workmanshipObj" type="picker"></mySelect>
                            </div>
                        </div>
                        <div class="item2">
                            <div class="label">{{$t('common.实物名称')}}:</div>
                            <div class="value">
                                <u--textarea v-model="addForm.physical_name"></u--textarea>
                            </div>
                        </div>
                        <div class="item2">
                            <div class="label">{{$t('common.备注')}}:</div>
                            <div class="value">
                                <u--textarea v-model="addForm.remark"></u--textarea>
                            </div>
                        </div>
                    </div>
                    <div class="addSave">
                        <u-button type="success" :loading="loading" :text="$t('common.保存')" @click="addSave()"></u-button>
                    </div>
                </uni-card>
            </u-collapse-item>
        </u-collapse>
        <u-subsection v-if="query.type=='edit'" mode="subsection" :list="subsection" :current="current" @change="e=>current=e"></u-subsection>
        <!-- DQA -->
        <div class="DQA" v-if="query.type=='edit'&&current==0">
            <div class="myList2 u-border" v-for='(item,i) in DQAList' :key='i'>
                <div class="item2">
                    <div class="label">{{$t('common.图片')}}:</div>
                    <div class="value">
                        <upload :fileList="item.imgs" disabled></upload>
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.材料部件名称')}}:</div>
                    <div class="value">{{item.choice_name}}</div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.检验项目')}}:</div>
                    <div class="value">{{item.inspection_name}}</div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.外观检验')}}:</div>
                    <div class="value">{{item.enum_value}}</div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.标准')}}:</div>
                    <div class="value">{{item.standard_value}}</div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.单位')}}:</div>
                    <div class="value">{{item.unit}}</div>
                </div>
                <div class="item2">
                    <div class="label">{{$t('common.备注')}}:</div>
                    <div class="value">{{item.remark}}</div>
                </div>
                <div class="item2">
                    <div class="label">{{$t('common.其他措施')}}:</div>
                    <div class="value">{{item.other_measures}}</div>
                </div>
                <div class="item2">
                    <div class="talbe">
                        <uni-table border :loading="loading">
                            <uni-tr>
                                <uni-th width="80">{{$t('common.检验总数')}}</uni-th>
                                <uni-th>{{$t('common.合格数量')}}</uni-th>
                                <uni-th>{{$t('common.不良问题描述')}}</uni-th>
                                <uni-th>{{$t('common.图片')}}</uni-th>
                                <uni-th>{{$t('common.检验结果')}}</uni-th>
                                <uni-th>{{$t('common.操作')}}</uni-th>
                            </uni-tr>
                            <uni-tbody>
                                <uni-tr>
                                    <uni-td width="80">
                                        <u--input type="number" v-model="item.history.qty"> </u--input>
                                    </uni-td>
                                    <uni-td>
                                        <u--input type="number" v-model="item.history.q_qty"> </u--input>
                                    </uni-td>
                                    <uni-td>
                                        <u--input v-model="item.history.bad_desc"> </u--input>
                                    </uni-td>
                                    <uni-td>
                                        <upload :fileList="item.history.file_list"></upload>
                                    </uni-td>
                                    <uni-td>
                                        <mySelect :list="check_resList" v-model="item.history.check_resObj" type="action"></mySelect>
                                    </uni-td>
                                    <uni-td>
                                        <u-button type="success" :loading="loading" :text="$t('common.保存')" @click="DQASave(item)"></u-button>
                                    </uni-td>
                                </uni-tr>
                            </uni-tbody>
                        </uni-table>
                    </div>
                </div>
                <div class="item2">
                    <div class="btnList">
                        <u-button class="btn" type="success" @click="getDQAHistory(item)" :text="$t('common.查看历史')"></u-button>
                        <seeDownFile class="btn" :fileList="item.top_file_list"></seeDownFile>
                    </div>
                </div>
            </div>
        </div>
        <!-- 常规 -->
        <div class="check p15" v-if="query.type=='edit'&&current==1">
            <div class="btnList">
                <u-button type="primary" @click="addCheck()" :text="$t('common.新增')"></u-button>
                <u-button type="success" color="#0ab99c" @click="getCheckHistory()" :text="$t('common.首件记录')"></u-button>
            </div>
            <div class="table">
                <uni-table border :loading="loading">
                    <uni-tr>
                        <!-- <uni-th width="50">序号</uni-th> -->
                        <uni-th>{{$t('common.检验项目')}}</uni-th>
                        <uni-th>{{$t('common.判断')}}</uni-th>
                        <uni-th>{{$t('common.备注')}}</uni-th>
                        <uni-th>{{$t('common.图片')}}</uni-th>
                        <uni-th>{{$t('common.操作')}}</uni-th>
                    </uni-tr>
                    <uni-tbody>
                        <uni-tr v-for='(item,i) in checkList' :key='i'>
                            <!-- <uni-td width="50">
                                {{++i}}
                            </uni-td> -->
                            <uni-td>
                                <span v-if="item.commit_inspection!=1"> {{item.inspection_name}}</span>
                                <u--textarea v-else v-model="item.inspection_name"></u--textarea>
                            </uni-td>
                            <uni-td>
                                <span class="p15">{{item.commit_type?'PASS':'FAIL'}}</span>
                                <u-switch inactiveColor="#f56c6c" activeColor="#5ac725" v-model="item.commit_type"></u-switch>
                            </uni-td>
                            <uni-td>
                                <u--textarea v-model="item.remark"></u--textarea>
                            </uni-td>
                            <uni-td>
                                <upload :fileList="item.file_list"></upload>
                            </uni-td>
                            <uni-td>
                                <u-button :disabled="item.commit_inspection!=1" icon="trash" type="error" :text="$t('common.删除')" @click="delCheck(i,item.id)"></u-button>
                            </uni-td>
                        </uni-tr>
                    </uni-tbody>
                </uni-table>
            </div>
        </div>
        <!-- 拍照上传 -->
        <div class="photo p15" v-if="query.type=='edit'&&current==2">
            <div class="tip">{{$t('common.拍照要求首次检验结束后请上传标准件与检验件并列照片')}}</div>
            <div class="table">
                <uni-table border :loading="loading">
                    <uni-tr>
                        <uni-th>{{$t('common.日期')}}</uni-th>
                        <uni-th>{{$t('common.图片')}}</uni-th>
                        <uni-th>{{$t('common.操作')}}</uni-th>
                    </uni-tr>
                    <uni-tbody>
                        <uni-tr v-for='(item,i) in photoList' :key='i'>
                            <uni-td>
                                {{item.data}}
                            </uni-td>
                            <uni-td>
                                <upload :fileList="item.file_list" disabled></upload>
                            </uni-td>
                            <uni-td>
                                <u-button icon="trash" type="error" :text="$t('common.删除')" @click="delPhoto(item)"></u-button>
                            </uni-td>
                        </uni-tr>
                        <uni-tr>
                            <uni-td>
                                <upload :fileList="currentPhotoList" @afterRead="uploadPhoto" :maxCount="1"></upload>
                            </uni-td>
                        </uni-tr>
                    </uni-tbody>
                </uni-table>
            </div>
        </div>
        <!-- 签名 -->
        <div class="writeName p15" v-if="query.type=='edit'&&current==3">
            <uni-card margin="0">
                <div class="myList">
                    <div class="item2">
                        <div class="label">{{$t('common.账号')}}:</div>
                        <div class="value">
                            <u-input v-model="nameFrom.staff_no" clearable @confirm="getNameByNo"> </u-input>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">{{$t('common.姓名')}}:</div>
                        <div class="value">
                            {{nameFrom.staff_name}}
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">{{$t('common.签核结果')}}:</div>
                        <div class="value result">
                            <u-switch inactiveColor="#f56c6c" activeColor="#5ac725" v-model="nameFrom.sign_res"></u-switch>
                            <span style="margin-left: 5px;"> {{nameFrom.sign_res? this.$t('common.同意'): this.$t('common.不同意')}}</span>
                        </div>
                    </div>
                    <div class="item2">
                        <div class="label">{{$t('common.签核意见')}}:</div>
                        <div class="value">
                            <u--textarea v-model="nameFrom.sign_idea" clearable></u--textarea>
                        </div>
                    </div>
                </div>
                <div class="addSave">
                    <u-button type="success" :loading="loading" color="#0ab99c" :text="this.$t('common.确认签名')" @click="writeNameSave()"></u-button>
                </div>
            </uni-card>
            <div class="table">
                <uni-table border :loading="loading">
                    <uni-tr>
                        <uni-th>{{$t('common.姓名')}}</uni-th>
                        <uni-th>{{$t('common.职位')}}</uni-th>
                        <uni-th>{{$t('common.签核结果')}}</uni-th>
                        <uni-th>{{$t('common.签核意见')}}</uni-th>
                        <uni-th>{{$t('common.日期')}}</uni-th>
                    </uni-tr>
                    <uni-tbody>
                        <uni-tr v-for='(item,i) in nameList' :key='i'>
                            <uni-td>
                                {{item.staff_name}}
                            </uni-td>
                            <uni-td>

                                {{item.jobtitle}}
                            </uni-td>
                            <uni-td :class="item.sign_res ==0?'suc':'err'">
                                {{item.sign_res_name}}
                            </uni-td>
                            <uni-td>
                                {{item.sign_idea}}
                            </uni-td>
                            <uni-td>
                                {{item.createdate}}
                            </uni-td>
                        </uni-tr>
                    </uni-tbody>
                </uni-table>
            </div>
        </div>
        <!-- DQA历史记录 -->
        <u-popup :show=" historyShow" @close="historyShow=false" :round="10" closeOnClickOverlay>
            <div class="history p15">
                <div class="table">
                    <uni-table border :loading="loading">
                        <uni-tr>
                            <uni-th width="80">{{$t('common.检验总数')}}</uni-th>
                            <uni-th>{{$t('common.合格数量')}}</uni-th>
                            <uni-th>{{$t('common.不良问题描述')}}</uni-th>
                            <uni-th>{{$t('common.图片')}}</uni-th>
                            <uni-th>{{$t('common.检验结果')}}</uni-th>
                        </uni-tr>
                        <uni-tbody height="80vh">
                            <uni-tr v-for='(item,i) in DQAhistoryList' :key='i'>
                                <uni-td width="80">
                                    {{item.qty}}
                                </uni-td>
                                <uni-td>
                                    {{item.q_qty}}
                                </uni-td>
                                <uni-td>
                                    {{item.bad_desc}}
                                </uni-td>
                                <uni-td>
                                    <upload :fileList="item.file_list" disabled></upload>
                                </uni-td>
                                <uni-td>
                                    {{item.check_res==0?'pass':'fail'}}
                                </uni-td>
                            </uni-tr>
                        </uni-tbody>
                    </uni-table>
                </div>
            </div>
        </u-popup>
        <!-- 首件记录 -->
        <u-popup :show="checkHistoryShow" @close="checkHistoryShow=false" :round="10" closeOnClickOverlay>
            <div class="checkHistory p15">
                <div class="table">
                    <uni-table border :loading="loading">
                        <uni-tr>
                            <uni-th width="80">{{$t('common.首检次数')}}</uni-th>
                            <uni-th>{{$t('common.日期')}}</uni-th>
                            <uni-th>{{$t('common.不良项明细')}}</uni-th>
                            <uni-th>{{$t('common.照片')}}</uni-th>
                            <uni-th>{{$t('common.明细查看')}}</uni-th>
                        </uni-tr>
                        <uni-tbody height="80vh">
                            <uni-tr v-for='(item,i) in checkHistoryList' :key='i'>
                                <uni-td width="80">
                                    {{item.sorting}}
                                </uni-td>
                                <uni-td>
                                    {{item.createdate}}
                                </uni-td>
                                <uni-td>
                                    {{item.inspection_name}}
                                </uni-td>
                                <uni-td>
                                    <upload :fileList="item.file_list" disabled></upload>
                                </uni-td>
                                <uni-td>
                                    <u-button type="primary" :loading="loading" :text="$t('common.查看')" @click="getCheckHistoryDetail(item)"></u-button>
                                </uni-td>
                            </uni-tr>
                        </uni-tbody>
                    </uni-table>
                </div>
            </div>
        </u-popup>
        <!-- 首件记录明细 -->
        <u-popup :show="checkHistoryDetailShow" @close="checkHistoryDetailShow=false,checkHistoryShow=true" :round="10" closeOnClickOverlay>
            <div class="checkHistory p15">
                <div class="table">
                    <uni-table border :loading="loading">
                        <uni-tr>
                            <uni-th width="120">{{$t('common.不良项目')}}</uni-th>
                            <uni-th>{{$t('common.备注')}}</uni-th>
                        </uni-tr>
                        <uni-tbody height="80vh">
                            <uni-tr v-for='(item,i) in checkHistoryDetailList' :key='i'>
                                <uni-td width="120">
                                    {{item.inspection_name}}
                                </uni-td>
                                <uni-td>
                                    {{item.remark}}
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
    name: 'firstConfirmDetail',
    data() {
        return {
            isSuc: false,
            loading: false,
            historyShow: false,
            checkHistoryShow: false,
            checkHistoryDetailShow: false,
            current: 0,
            query: {},
            addForm: {//基本信息
                ex_task_no: "",
                production_line_code: "",
                remark: "",
                physical_name: "",
                eq_info_no: "",
                f_typeObj: {//首件类型
                    label: this.$t('common.常规'),
                    value: '0',
                },
                workshop_sectionObj: {//工段
                    workshop_section_no: "",
                    workshop_section_name: "",
                    bottom: [],
                },
                workmanshipObj: {//工艺
                    "config_no": "",
                    "workmanship_name": "",
                    "workmanship_code": ""
                },
                POForm: {//po相关信息
                    file_url: "",
                    mer_po: "",
					so_num: "",             
                    mold_no: "",
                    name_t: "",
                    prod_no: "",
                    prod_name: "",
                    shoe_no: "",
                    imgs: [],
                },  
				// se_id Added for PO change Project
            },
            nameFrom: {//签名信息
                staff_no: '',
                staff_name: '',
                sign_res: true,
                sign_idea: this.$t('common.同意'),
            },
            f_typeList: [//首件类型下拉
                {
                    label: this.$t('common.常规'),
                    value: '0',
                },
                {
                    label: this.$t('common.新上线'),
                    value: '1',
                },
                {
                    label: this.$t('common.变更'),
                    value: '2',
                },
            ],
            workshop_sectionList: [//工段和工艺下拉列表
            ],
            subsection: ['DQA/MQA', this.$t('common.常规'), this.$t('common.拍照上传'), this.$t('common.签名确认')],//tab栏
            DQAList: [],//DQA列表
            check_resList: [//DQA检验结果下拉
                {
                    label: 'pass',
                    value: '0',
                },
                {
                    label: 'fail',
                    value: '1',
                },

            ],
            DQAhistoryList: [],//DQA历史记录
            checkList: [],//常规检验项目列表
            checkHistoryList: [],//常规检验历史列表
            photoList: [],//拍照列表
            currentPhotoList: [],//当前上传图片
            nameList: [],//签名记录
            checkHistoryDetailList: [],//首件记录明细
        }
    },
    watch: {
        DQAList: {
            handler: function (newVal, oldVal) {
                this.calcIsSuc()
            },
            deep: true
        },
        checkList: {
            handler: function (newVal, oldVal) {
                this.calcIsSuc()
            },
            deep: true
        },
    },
    methods: {
        asyncChange() {//切换通过状态
            let _this = this
            uni.showModal({
                confirmText:this.$t('common.确定'),
                cancelText:this.$t('common.取消'),
                content: this.$t('common.是否确认操作'),
                success: (res) => {
                    if (res.confirm) {
                        _this.finish()
                    }
                }
            })
        },
        finish() {//确认切换通过状态
            this.loading = true
            let qcm_f_art_cfm_cc_d = uni.$u.deepClone(this.checkList)
            qcm_f_art_cfm_cc_d.forEach((e, i) => {
                e.sign_res = this.isSuc ? 0 : 1
                e.commit_type = e.commit_type ? 0 : 1
                if (e.checkeds == 2) return
                if (e.remark || e.file_list.length || e.commit_type == 1) e.checkeds = 1
            })
            let data = {
                "task_no": this.query.task_no,
                "sign_res": this.isSuc ? 0 : 1,
                qcm_f_art_cfm_cc_d,

            }
            this.$apis.firstConfirm_Commitinspectionitem(data).then((res) => {
                uni.$u.toast(this.$t('common.操作成功'))
                // this.isSuc = !this.isSuc
                this.getBaseData()
                this.getCheckList()
            }).catch((err) => {
                console.error(err);
            }).finally(() => {
                this.loading = false
            })
        },
        addSave() {//保存新增
            //表单验证
			//debugger;
            if (!this.addForm.POForm.so_num) return uni.$u.toast(this.$t('common.请填入PO'))
            this.loading = true
			//debugger;
            let data = {
                "workshop_section_no": this.addForm.workshop_sectionObj.workshop_section_no,
                "config_no": this.addForm.workmanshipObj.config_no,
                "shoe_no": this.addForm.POForm.shoe_no,
                "prod_no": this.addForm.POForm.prod_no,
                "mer_po": this.addForm.POForm.mer_po,
				"so_num": this.addForm.POForm.so_num,
                "mold_no": this.addForm.POForm.mold_no,
                "ex_task_no": this.addForm.ex_task_no,
                "physical_name": this.addForm.physical_name,
                "eq_info_no": this.addForm.eq_info_no,
                "production_line_code": this.addForm.production_line_code,
                "f_type": this.addForm.f_typeObj.value,
                "remark": this.addForm.remark,
                "task_no": this.query.task_no,
            }
            this.$apis.firstConfirm_InputMain_add_task(data).then((res) => {
                uni.$u.toast(this.$t('common.生成任务成功'))
                let task_no = res
                setTimeout(() => {
                    uni.redirectTo({ url: `/pages/firstConfirm/firstConfirmDetail?type=edit&task_no=${task_no}` })
                }, 1000);
            }).catch((err) => {
                console.error(err);
                this.loading = false
            }).finally(() => {
            })
        },
        bindEx_task_no() {//绑定实验室编号
            if (this.query.type == 'add') return
            if (!this.addForm.ex_task_no) return uni.$u.toast(this.$t('common.请输入实验室编号'))
            let data = {
                "task_no": this.query.task_no,
                "ex_task_no": this.addForm.ex_task_no,
            }
            this.$apis.Rqc_taskBase_ex_taskadd(data).then((res) => {
                console.log(data, res, '绑定实验室样品编号')
                uni.$u.toast(this.$t('common.绑定实验室编号成功'))
            }).catch((err) => {
                console.error(err);
            })
        },
        confirmPo() {//扫描PO得到数据
		//debugger
            this.addForm.POForm.imgs = [
                {
                    url: this.addForm.POForm.file_url,
                    guid: '',
                }
            ]
            this.getWorkshopList()
            this.$nextTick(() => {
                this.$refs.Collapse.init()
            })
        },
        getWorkshopList() {//获取工段和工艺下拉
            let data = {
                "shoe_no": this.addForm.POForm.shoe_no
            }
            this.$apis.firstConfirm_Getworkshop_list(data).then((res) => {
                this.workshop_sectionList = res
                this.addForm.workshop_sectionObj = this.workshop_sectionList[0]
                this.addForm.workmanshipObj = this.addForm.workshop_sectionObj.bottom[0]
            }).catch((err) => {
                console.error(err);
            })
        },
        confirmWorkshop_section() {//选择工段
            this.addForm.workmanshipObj = this.addForm.workshop_sectionObj.bottom[0]
        },
        getBaseData() {//获取基本信息
            let data = {
                "task_no": this.query.task_no
            }
            this.$apis.firstConfirm_OutMain_tack_no_list(data).then((res) => {
                res = res[0]
                this.$mergeObj(this.addForm, res)
                this.$mergeObj(this.addForm.POForm, res)
                this.addForm.POForm.imgs = [
                    {
                        url: this.addForm.POForm.file_url,
                        guid: '',
                    }
                ]
                this.addForm.f_typeObj = this.f_typeList.find(e => e.value == res.f_type)
                this.addForm.workshop_sectionObj.workshop_section_no = res.workshop_section_no
                this.addForm.workshop_sectionObj.workshop_section_name = res.workshop_section_name
                this.addForm.workmanshipObj.workmanship_no = res.workmanship_no
                this.addForm.workmanshipObj.workmanship_name = res.workmanship_name
                this.isSuc = res.issuc
                this.getDQAList()
                this.$nextTick(() => {
                    this.$refs.Collapse.init()
                })
            }).catch((err) => {
                console.error(err);
            })
        },
        getDQAList() {//获取DQA列表
            let data = {
                "shoe_no": this.addForm.POForm.shoe_no,
                "task_no": this.query.task_no,
                "workshop_section_no": this.addForm.workshop_sectionObj.workshop_section_no
            }
            this.$apis.firstConfirm_Outhistory_getList(data).then((res) => {
                this.DQAList = res
                this.DQAList.forEach((e, i) => {
                    e.imgs = [
                        {
                            url: e.file_url,
                            guid: '',
                        }
                    ]
                    e.history = e.history[0] || {}
                    e.history.file_list = e.history.file_list || []
                    e.history.check_resObj = {
                        label: e.history.check_res == 1 ? 'fail' : 'pass',
                        value: e.history.check_res || 0,
                    }


                })
            }).catch((err) => {
                console.error(err);
            })
        },
        DQASave(item) {//保存DQA
            this.loading = true
			//debugger;
            let data = {
                "task_no": this.query.task_no,
                "union_id": item.id,
                "source_type": item.source,
                "qty": item.history.qty,
                "q_qty": item.history.q_qty,
                "bad_desc": item.history.bad_desc,
                "check_res": item.history.check_resObj.value,
                "file_list": item.history.file_list || []
            }
            this.$apis.firstConfirm_Div_input(data).then((res) => {
                uni.$u.toast(this.$t('common.保存成功'))
                this.calcIsSuc()
            }).catch((err) => {
                console.error(err);
            }).finally(() => {
                this.loading = false
            })
        },
        getDQAHistory(item) {//获取DQA历史记录
		//debugger;
            let data = {
                "id": item.id,
                "source_type": item.source,
                "task_no": this.query.task_no
            }
            this.$apis.firstConfirm_Outhistory_getList2(data).then((res) => {
                this.DQAhistoryList = res
                this.historyShow = true
            }).catch((err) => {
                console.error(err);
            })
        },
        getCheckList() {//获取常规检验项目列表
            let data = {
                "task_no": this.query.task_no//任务编号
            }
            this.$apis.firstConfirm_Getinspectionitem_list(data).then((res) => {
                this.checkList = res.qcm_f_art_cfm_cc_d
                this.checkList.forEach((e, i) => {
                    e.file_list = e.file_list || []
                    e.remark = e.remark || ''
                })
            }).catch((err) => {
                console.error(err);
            })

        },
        addCheck() {//新增常规检验
            this.checkList.unshift({
                checkeds: 2,
                commit_inspection: 1,
                commit_type: true,
                inspection_code: "",
                "sign_res": 0,
                inspection_name: "",
                inspection_type: "",
                task_no: this.query.task_no,
                file_list: [],
                remark: '',
            })
        },
        delCheck(i, id) {//删除常规检验
            this.checkList.splice(i, 1)
            if (!id) return
            let data = {
                id,
            }
            this.$apis.firstConfirm_delete_inspectionitem(data).then((res) => {
            }).catch((err) => {
                console.error(err);
            })
        },
        calcIsSuc() {//自动计算检验通过状态
            this.isSuc = this.checkList.every(e => e.commit_type) && this.DQAList.every(e => e.history.check_resObj.value == 0)
        },
        getCheckHistory() {//获取常规首件历史
            let data = {
                "task_no": this.query.task_no//任务编号
            }
            this.$apis.firstConfirm_Getinspectionitem_record(data).then((res) => {
                this.checkHistoryList = res
                this.checkHistoryShow = true
            }).catch((err) => {
                this.checkHistoryList = []
                console.error(err);
            })
        },
        getPhotoList() {//获取拍照历史记录
            this.loading = true
            let data = {
                "task_no": this.query.task_no//任务编号
            }
            this.$apis.firstConfirm_Out_file_list(data).then((res) => {
                this.photoList = res
                this.currentPhotoList = []
            }).catch((err) => {
                this.photoList = []
                console.error(err);
            }).finally(() => {
                this.loading = false
            })
        },
        delPhoto(item) {//删除拍照
            let _this = this
            uni.showModal({
                confirmText:this.$t('common.确定'),
                cancelText:this.$t('common.取消'),
                content: this.$t('common.是否确认删除'),
                success: (res) => {
                    if (res.confirm) {
                        let data = {
                            id: item.id,
                            "task_no": this.query.task_no//任务编号
                        }
                        _this.$apis.firstConfirm_delete_file(data).then((res) => {
                            uni.$u.toast(_this.$t('common.删除成功'))
                            _this.getPhotoList()
                        }).catch((err) => {
                            console.error(err);
                        })
                    }
                }
            })
        },
        uploadPhoto() {//上传拍照
            this.loading = true
            let data = {
                "task_no": this.query.task_no,//任务编号
                "file_list": this.currentPhotoList,
            }
            this.$apis.firstConfirm_Input_file_list(data).then((res) => {
                uni.$u.toast(this.$t('common.上传成功'))
                this.getPhotoList()
            }).catch((err) => {
                console.error(err);
                this.loading = false

            })
        },
        getNameList() {//获取签名历史
            this.loading = true
            let data = {
                "task_no": this.query.task_no,//任务编号
            }
            this.$apis.firstConfirm_Get_Thesignaturerecord(data).then((res) => {
                this.nameList = res
            }).catch((err) => {
                this.nameList = []
                console.error(err);
            }).finally(() => {
                this.loading = false
            })
        },
        getNameByNo() {//获取姓名通过账号
            let data = {
                ...this.nameFrom
            }
            this.$apis.firstConfirm_Get_staff_name(data).then((res) => {
                this.nameFrom.staff_name = res
            }).catch((err) => {
                console.error(err);
            })

        },
        writeNameSave() {//保存签名
            //表单验证
            if (!this.nameFrom.staff_no) return uni.$u.toast(this.$t('common.请输入账号'))
            if (!this.nameFrom.staff_name) return uni.$u.toast(this.$t('common.请获取姓名'))
            this.loading = true
            let data = {
                "task_no": this.query.task_no,//任务编号
                ...this.nameFrom,
                "sign_res": this.nameFrom.sign_res ? 0 : 1,
            }
            this.$apis.firstConfirm_Commit_Signature(data).then((res) => {
                uni.$u.toast(this.$t('common.签名成功'))
                this.getNameList()
                this.nameFrom = {
                    staff_no: '',
                    staff_name: '',
                    sign_res: true,
                    sign_idea: this.$t('common.同意'),
                }
            }).catch((err) => {
                console.error(err);
                this.loading = false
            })

        },
        getCheckHistoryDetail(row) {//获取首检记录明细
            let data = {
                "id": row.id//id字符串（直接拿首件记录id即可）
            }
            this.$apis.firstConfirm_Getinspectionitem_recordhois(data).then((res) => {
                this.checkHistoryDetailList = res
                this.checkHistoryShow = false
                this.checkHistoryDetailShow = true
            }).catch((err) => {
                console.error(err);
            })

        }

    },
    onShow() {
    },
    onLoad(query) {
        this.query = query
        if (this.query.type == 'edit') {
            this.getBaseData()
            this.getCheckList()
            this.getPhotoList()
            this.getNameList()
        }
    }
}
</script>
<style lang='scss' scoped>
.firstConfirmDetail {
    .switch {
    }
    .btnList {
        display: flex;
        .u-button {
            margin: 5rpx;
        }
    }
    .DQA {
        padding: 15rpx;
        .myList,
        .myList2 {
            background: #fff;
            margin-bottom: 15rpx;
            border-radius: 10rpx;
            padding: 15rpx;
            .talbe {
                width: 100%;
            }

            .btnList {
                display: flex;
                width: 100%;
                .btn {
                    margin: 0 5px;
                    width: 100%;
                }
            }
        }
    }
    .writeName {
        .table {
            margin-top: 15rpx;
        }
        .result {
            display: flex;
            align-items: center;
        }
    }
}
</style>