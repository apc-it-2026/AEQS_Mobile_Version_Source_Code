<template>
    <div class='qualityErrorDetail p15'>
        <u-navbar border :title="query.type=='add'? $t('common.新建品质异常') : $t('common.品质异常详情') " :leftText="$t('common.返回')" placeholder autoBack>
            <div class="switch" slot="right">
                <div class="txt" :class="isFinish?'suc':'err'">{{isFinish? $t('common.已结案') : $t('common.未结案') }}</div>
                <u-switch activeColor="#5ac725" inactiveColor="#f56c6c" :loading="loading" v-model="isFinish" asyncChange @change="asyncChange"></u-switch>
            </div>
        </u-navbar>
        <u-toast ref="uToast"></u-toast>
        <!-- 异常信息 -->
        <uni-card margin="15rpx 0" :title=" $t('common.异常信息') ">
            <div class="myList">
                <div class="item2">
                    <div class="label">{{$t('common.异常级别')}}:</div>
                    <div class="value">
                        <mySelect :disabled="top_disabled" :list="abnormal_levelList" v-model="baseData.abnormal_levelObj" type="action"></mySelect>
                    </div>
                </div>
                <div class="item2">
                    <div class="label">{{$t('common.异常类别')}}:</div>
                    <div class="value">
                        <mySelect getFirst :disabled="top_disabled" apiName="qualityError_Get_abnormal_category" labelName="abnormal_category_name" valueName="abnormal_category_no" v-model="baseData.abnormal_categoryObj" type="search"></mySelect>
                    </div>
                </div>
                <div class="item2">
                    <div class="label">{{$t('common.生产月份')}}:</div>
                    <div class="value">
                        <datePicker :disabled="top_disabled" fields="month" v-model="baseData.pro_month"></datePicker>
                    </div>
                </div>
                <div class="item2">
                    <div class="label">ART:</div>
                    <div class="value">
                        <mySelect :disabled="top_disabled" @confirm="confirmART" v-model="baseData.ARTForm" labelName="prod_no" apiName="qualityError_GetArt_List" scanAbled type="scan"></mySelect>
                    </div>
                </div>
                <div class="item">
                    <div class="label" v-show="baseData.ARTForm.prod_no">{{$t('common.季度')}}:</div>
                    <div class="value">
                        {{baseData.ARTForm.develop_season}}
                    </div>
                </div>
                <div class="item">
                    <div class="label" v-show="baseData.ARTForm.prod_no">{{$t('common.鞋型')}}:</div>
                    <div class="value">
                        {{baseData.ARTForm.name_t}}
                    </div>
                </div>
                <div class="item" v-show="baseData.ARTForm.prod_no">
                    <div class="label">{{$t('common.鞋图')}}:</div>
                    <div class="value">
                        <upload :fileList="baseData.ARTForm.file_list" disabled></upload>
                    </div>
                </div>
                <div class="item" v-show="baseData.ARTForm.prod_no">
                    <div class="label">{{$t('common.工段')}}:</div>
                    <div class="value">
                        <mySelect  :disabled="top_disabled" :list="workshop_section_list" labelName="workshop_section_name" valueName="workshop_section_no" v-model="baseData.workshop_sectionObj" type="picker"></mySelect>
                    </div>
                </div>
                <div class="item" v-show="baseData.ARTForm.prod_no">
                    <div class="label">{{$t('common.生产线')}}:</div>
                    <div class="value">
                        <mySelect :disabled="top_disabled" labelName="production_line_name" valueName="production_line_code" apiName="getProduction_lineList3" titleName="plant_area" v-model="baseData.production_lineObj" type="search"></mySelect>
                        <!-- <mySelect getFirst :disabled="top_disabled" :list="production_line_list" labelName="production_line_name" valueName="production_line_code" v-model="baseData.production_lineObj" type="picker"></mySelect> -->
                    </div>
                </div>
                <div class="item" v-show="baseData.ARTForm.prod_no">
                    <div class="label">{{$t('common.厂区')}}:</div>
                    <div class="value">
                        {{baseData.production_lineObj.plant_area}}
                    </div>
                </div>

                <div class="item2" v-show="baseData.ARTForm.prod_no">
                    <div class="label">{{$t('common.PO分组列表')}}:</div>
                    <div class="value">
                        <!-- <mySelect :disabled="top_disabled" :list="po_list" v-model="baseData.poObj" type="checkbox"></mySelect> -->
						 <mySelect2 :disabled="top_disabled||isFinish" :list="po_list" v-model="baseData.poObj" type="checkbox" @confirm="Get_PONUM" @change="pochange"></mySelect2>   <!-- Added for PO change Project -->
                    </div>
                </div>
				
				<div class="item2" v-show="baseData.ARTForm.prod_no">
				    <div class="label">Sales Order:</div>
				  <!--  <div class="value" style="display: flex;">
				        <view v-for="item in baseData.poObj.checkedList">{{item.label}},</view>
				    </div> -->
					<u--textarea v-model="str_se"></u--textarea>
				</div>
				
                <div class="item" v-show="baseData.ARTForm.prod_no">
                    <div class="label">{{$t('common.PO数量')}}:</div>
                    <div class="value">
                        {{baseData.poObj.checkedList.length}}
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.翻箱数量')}}:</div>
                    <div class="value">
                        <u--input :disabled="top_disabled" type="number" v-model="baseData.fx_qty"> </u--input>
                    </div>
                </div>
            </div>
        </uni-card>
        <!-- 问题信息 -->
        <uni-card margin="15rpx 0" :title=" $t('common.问题信息') ">
            <div class="myList">
                <div class="item2">
                    <div class="label">{{$t('common.问题描述')}}:</div>
                    <div class="value">
                        <u--input :disabled="top_disabled" v-model="baseData.problem_desc"> </u--input>
                    </div>
                </div>
                <div class="item2">
                    <div class="label">{{$t('common.问题详情')}}:</div>
                    <div class="value">
                        <u--textarea :disabled="top_disabled" v-model="baseData.department_codecc"></u--textarea>
                    </div>
                </div>
                <div class="item2">
                    <div class="label">{{$t('common.责任部门')}}:</div>
                    <div class="value">
                        <mySelect :disabled="top_disabled" apiName="qualityError_Get_department" labelName="department_name" valueName="department_code" v-model="baseData.departmentObj" type="search"></mySelect>
                    </div>
                </div>
                <div class="item2">
                    <div class="label">{{$t('common.问题图片')}}:</div>
                    <div class="value">
                        <upload :disabled="top_disabled" :fileList="baseData.file_list"></upload>
                    </div>
                </div>
            </div>
        </uni-card>
        <!-- 异常措施 -->
        <uni-card margin="15rpx 0" :title=" $t('common.异常措施') ">
            <div class="myList">
                <div class="item2">
                    <div class="label">{{$t('common.救火措施')}}:</div>
                    <div class="value">
                        <u--textarea v-model="baseData.f_measures"></u--textarea>
                    </div>
                </div>
                <div class="item2">
                    <div class="label">{{$t('common.原因分析')}}:</div>
                    <div class="value">
                        <u--textarea v-model="baseData.cause_analysis"></u--textarea>
                    </div>
                </div>
                <div class="item2">
                    <div class="label">{{$t('common.预防措施')}}:</div>
                    <div class="value">
                        <u--textarea v-model="baseData.preventive_measure"></u--textarea>
                    </div>
                </div>
                <div class="item2">
                    <div class="label">{{$t('common.改善结果')}}:</div>
                    <div class="value">
                        <u--textarea v-model="baseData.improve_results"></u--textarea>
                    </div>
                </div>
                <div class="item2">
                    <div class="label">{{$t('common.解决后图片')}}:</div>
                    <div class="value">
                        <upload :fileList="baseData.yes_file_list"></upload>
                    </div>
                </div>
            </div>
        </uni-card>
        <!-- 品质异常成本 -->
        <uni-card margin="15rpx 0" class="errList" :title=" $t('common.品质异常成本')" :sub-title="`${$t('common.总合计成本')}:${errSum}`">
            <u-button type="success" :loading="loading" icon="plus" :text="$t('common.新增')" @click="addErr()"></u-button>
            <div class="myList u-border p15" v-for='(item,i) in errList' :key='i'>
                <div class="item">
                    <div class="label">{{$t('common.异常成本类别')}}:</div>
                    <div class="value">
                        <mySelect getFirst @confirm="$mergeObj(item, $event)" :list="errTypeList" labelName="qa_cost_cate_name" valueName="qa_cost_cate_no" v-model="item.qa_cost_cateObj" type="picker"></mySelect>
                    </div>
                </div>
                <div class="item">
                    <div class="label"></div>
                    <div class="value">
                        <u-button icon="trash" type="error" :text="$t('common.删除')" @click="delErr(item,i)"></u-button>
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.单价')}}:</div>
                    <div class="value">
                        {{item.unit_price}}
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.单位')}}:</div>
                    <div class="value">
                        {{item.qa_cost_cate_u}}
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.数量')}}:</div>
                    <div class="value">
                        <u--input type="number" v-model="item.qty"> </u--input>
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.合计成本')}}:</div>
                    <div class="value">
                        {{(Number(item.qty||0)*Number(item.unit_price||0)).toFixed(2)}}
                    </div>
                </div>
            </div>
        </uni-card>
        <u-button type="success" :loading="loading" color="#0ab99c" :text="$t('common.立即保存')" @click="save()"></u-button>
    </div>
</template>
<script>
import { handleError } from "vue"
export default {
    name: 'qualityErrorDetail',
    data() {
        return {
			str_se:'',
            isFinish: false,
            loading: false,
            top_disabled: false,
            baseData: {//基本信息
                fx_qty: '',//翻箱数量
                problem_desc: '',//问题描述
                department_codecc: '',//问题详情
                pro_month: '',//生产月份
                f_measures: '',//救火措施
                cause_analysis: '',//原因分析
                preventive_measure: '',//预防措施
                improve_results: '',//改善结果
                abnormal_levelObj: {//异常级别
                    label: this.$t('common.普通品质异常'),
                    value: '0',
                },
                abnormal_categoryObj: {//异常类别
                    abnormal_category_name: "",
                    abnormal_category_no: "",
                },
                ARTForm: {//ART相关
                    "prod_no": "",
                    "develop_season": "",
                    "shoe_no": "",
                    "name_t": "",
                    "file_list": [],
                },
                workshop_sectionObj: {//工段
                    workshop_section_name: '',
                    workshop_section_no: '',
                },
                production_lineObj: {//产线
                    production_line_name: '',
                    production_line_code: '',
                    plant_area: '',
                },
                poObj: {//po列表
                    checkedList: []
                },
                departmentObj: {//责任部门
                    department_code: "",
                    department_name: "",
                },
                file_list: [],//问题图片列表
                yes_file_list: [],//解决后图片列表

            },
            abnormal_levelList: [//异常级别列表
                {
                    label: this.$t('common.普通品质异常'),
                    value: '0',
                },
                {
                    label: this.$t('common.批量品质异常'),
                    value: '1',
                },
                {
                    label: this.$t('common.重大品质异常'),
                    value: '2',
                },
            ],
            abnormal_categoryList: [],//异常类别列表
            production_line_list: [],//产线列表
            workshop_section_list: [],//工段列表
            po_list: [],//po列表
            errList: [],//异常成本列表
            errTypeList: [],//异常成本类别下拉
        }
    },
    computed: {
        errSum: function () {
            return this.errList.reduce((prev, curr) => { return prev + Number(curr.qty || 0) * Number(curr.unit_price || 0) }, 0).toFixed(2)
        }
    },
    methods: {
        productionConfirm(item) {
            console.log(item);

        },
        asyncChange(e) {//结案
            if (e && !this.baseData.cause_analysis) return uni.$u.toast(this.$t('common.请填写原因分析'))
            if (e && !this.baseData.preventive_measure) return uni.$u.toast(this.$t('common.请填写预防措施'))
            if (e && !this.baseData.improve_results) return uni.$u.toast(this.$t('common.请填写改善结果'))
            let _this = this
            uni.showModal({
                confirmText: this.$t('common.确定'),
                cancelText: this.$t('common.取消'),
                content: e ? this.$t('common.是否确认结案') : this.$t('common.是否要取消结案'),
                success: (res) => {
                    if (res.confirm) {
                        _this.save(e)
                    }
                }
            })
        },
        save(e) {//保存
            //表单验证
            if (!this.baseData.ARTForm.prod_no) return uni.$u.toast(this.$t('common.请选择ART'))
            if (!this.baseData.workshop_sectionObj.workshop_section_no) return uni.$u.toast(this.$t('common.请选择工段'))
            this.loading = true
            if (e !== undefined) this.isFinish = e
            this.errList.forEach((e, i) => {
                e.qa_cost_cate_no = e.qa_cost_cateObj.qa_cost_cate_no
                e.qa_cost_cate_name = e.qa_cost_cateObj.qa_cost_cate_name
            })
			
            let data = {
                "closing_status": this.isFinish ? 0 : 1,
                "task_no": this.query.type == 'edit' ? this.query.task_no : "",
                "abnormal_level": this.baseData.abnormal_levelObj.value,
                "abnormal_category_no": this.baseData.abnormal_categoryObj.abnormal_category_no,
                "prod_no": this.baseData.ARTForm.prod_no,
                "develop_season": this.baseData.ARTForm.develop_season,
                "shoe_no": this.baseData.ARTForm.shoe_no,
                "pro_month": this.baseData.pro_month,
                "plant_area": this.baseData.production_lineObj.plant_area,
                "workshop_section_no": this.baseData.workshop_sectionObj.workshop_section_no,
                "production_line_code": this.baseData.production_lineObj.production_line_code,
                "po_list": this.baseData.poObj?.value?.join(',') || "",
				"se_list": this.str_se,
                "fx_qty": this.baseData.fx_qty,
                "problem_desc": this.baseData.problem_desc,
                "department_code": this.baseData.departmentObj.department_code,
                "department_codecc": this.baseData.department_codecc,
                "file_list": this.baseData.file_list,
                "f_measures": this.baseData.f_measures,
                "cause_analysis": this.baseData.cause_analysis,
                "preventive_measure": this.baseData.preventive_measure,
                "improve_results": this.baseData.improve_results,
                "yes_file_list": this.baseData.yes_file_list,
                "bittom_list": this.errList,
                "top_disabled": this.top_disabled,
            }
            for (const key in data) {
                data[key] == null && (data[key] = "")
            }
            this.$apis.qualityError_Input_Main_Data(data).then((res) => {
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
        confirmART(item) {//获取ART带出的信息
		console.log(item)
            this.baseData.workshop_sectionObj = {
                workshop_section_name: '',
                workshop_section_no: '',
            }
            this.baseData.production_lineObj = {//产线
                production_line_name: '',
                production_line_code: '',
                plant_area: '',
            }
            item.top = item.top[0]
            this.$mergeObj(this.baseData.ARTForm, item.top)
            this.production_line_list = item.production_line_list
			this.workshop_section_list = item.top.workshop_section_list
           this.po_list = item.top.po_list2
           this.po_list = this.po_list.map((e, i) => {
               return {
                 label: e.se_id,
                 value: e.po,
               }
           })
            this.baseData.poObj.value = this.baseData.poObj.label = []
            this.baseData.poObj.checkedList = []
        },
        getOtherList() {//获取工段 po 生产线的下拉列表
            let data = {
                "prod_no": this.baseData.ARTForm.prod_no //art编号
            }
            this.$apis.qualityError_GetArt_List(data).then((res) => {
				//debugger;
                let item = res.top[0]
                this.production_line_list = res.production_line_list
                this.workshop_section_list = item.workshop_section_list
                this.po_list = item.po_list
                this.po_list = this.po_list.map((e, i) => {
                    return {
                        label: e,
                        value: e,
                    }
                })
            }).catch((err) => {
                console.error(err);
            })

        },
        addErr() {//新增异常成本
            this.errList.push({
                qa_cost_cateObj: {},
                unit_price: 1,
                qa_cost_cate_u: "",
                qty: 0,
            })
        },
        delErr(item, index) {//删除异常成本
            this.errList.splice(index, 1)
            let data = {
                "id": item.id
            }
            this.$apis.qualityError_deletepzcb(data).then((res) => {
            }).catch((err) => {
                console.error(err);
            })
        },
        getErrTypeList() {//获取异常成本类别列表
            let data = {

            }
            this.$apis.qualityError_Getabnormal_List(data).then((res) => {
                this.errTypeList = res
            }).catch((err) => {
                console.error(err);
            })

        },
		Get_PONUM(e){
			if(e.value==""){
				return;
			}
			let data = {
				"poList":e.value
			}	
			this.$apis.qualityError_Get_PONUM(data).then(res=>{
				//debugger;
				this.baseData.po_num = res[0].ponum;
				console.log("执行了",res)
				
				console.log(this.baseData.poObj.checkedList)
				let se_temp='';
				this.baseData.poObj.checkedList.forEach((item, index) => {
					console.log(item.label)
					se_temp=se_temp+item.label+","
					
				});
				this.str_se=se_temp;
			})
		},
        getBaseData() {//获取基础数据
            let data = {
                "task_no": this.query.task_no//任务编号
            }
            this.$apis.qualityError_GetInput_Datea(data).then((res) => {
				//debugger;
                if (!res.length) return uni.$u.toast(this.$t('common.没有找到对应数据'))
                res = res[0] || res
                this.isFinish = res.closing_status == 0
                this.top_disabled = !!res.top_disabled
                this.baseData.fx_qty = res.fx_qty
                this.baseData.problem_desc = res.problem_desc
                this.baseData.department_codecc = res.department_codecc
                this.baseData.pro_month = res.pro_month
                this.baseData.f_measures = res.f_measures
                this.baseData.cause_analysis = res.cause_analysis
                this.baseData.preventive_measure = res.preventive_measure
                this.baseData.improve_results = res.improve_results
                this.baseData.abnormal_levelObj.value = res.abnormal_level
                this.baseData.abnormal_levelObj.label = this.abnormal_levelList.find(e => e.value == res.abnormal_level).label
                this.baseData.abnormal_categoryObj.abnormal_category_no = res.abnormal_category_no
                this.baseData.abnormal_categoryObj.abnormal_category_name = res.abnormal_category_name
                this.baseData.ARTForm.prod_no = res.prod_no
                this.baseData.ARTForm.shoe_no = res.shoe_no
                this.baseData.ARTForm.develop_season = res.develop_season
                this.baseData.ARTForm.name_t = res.name_t
                this.baseData.ARTForm.file_list = res.art_file_list
                this.baseData.workshop_sectionObj.workshop_section_no = res.workshop_section_no
                this.baseData.workshop_sectionObj.workshop_section_name = res.workshop_section_name
                this.baseData.production_lineObj.plant_area = res.plant_area
                this.baseData.production_lineObj.production_line_code = res.production_line_code
                this.baseData.production_lineObj.production_line_name = res.production_line_name
				if (res.po_list) {
				    this.baseData.poObj.label =this.baseData.poObj.value=res.po_list.split(',');
					// this.baseData.poObj.value = [];
					this.str_se=res.SE_LIST;
					// this.baseData.poObj.value = this.baseData.poObj.label = res.po_list.split(',')
				    this.baseData.poObj.checkedList = res.po_list.split(',').map(e => { return { label: e, value: e } })//已选择列表
				}
				
                // if (res.po_list) {
                //     this.baseData.poObj.value = this.baseData.poObj.label = res.po_list.split(',')
                //     this.baseData.poObj.checkedList = res.po_list.split(',').map(e => { return { label: e, value: e } })//已选择列表
                // }
                this.baseData.departmentObj.department_name = res.department_name
                this.baseData.departmentObj.department_code = res.department_code
                this.baseData.file_list = res.file_list
                this.baseData.yes_file_list = res.yes_file_list
                this.errList = res.bittom_list
                this.errList.forEach((e, i) => {
                    e.qa_cost_cateObj = {
                        qa_cost_cate_no: e.qa_cost_cate_no,
                        qa_cost_cate_name: e.qa_cost_cate_name,
                    }
                })

                this.getOtherList()
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
        }
        this.getErrTypeList()
    }
}
</script>
<style lang='scss' scoped>
.qualityErrorDetail {
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
    .errList {
        .myList {
            margin-top: 15rpx;
        }
    }
}
</style>
