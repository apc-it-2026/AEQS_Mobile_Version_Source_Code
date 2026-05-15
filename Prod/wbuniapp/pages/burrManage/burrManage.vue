<template>
    <div class='burrManage'>
        <u-navbar border :title="$t('burrManage.车针管理')" :leftText="$t('common.返回')" placeholder autoBack>
            <u-button type="success" size="small" icon="plus" slot="right" :text="$t('common.新增')" @click="add"></u-button>  
        </u-navbar>
        <u-sticky>
            <div class="search myList u-border-bottom">
                <div class="item">
                    <div class="label">{{$t('common.厂区')}}</div>
                    <div class="value">
                        <u--input v-model="searchForm.org.label" suffixIcon="arrow-down" readonly @click.native="orgShow=true"></u--input>
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.产线')}}</div>
                    <div class="value">
                        <mySelect ref="searchPopup1" :otherData="{ org_code: searchForm.org.value}" @confirm="productionConfirm" apiName="getProduction_lineList" v-model="searchForm.production_line" type="search"></mySelect>
                        <!-- <u--input v-model="searchForm.production_line.label" suffixIcon="arrow-down" readonly @click.native="production_lineShow=true"></u--input> -->
                    </div>
                </div>
                <div class="item">
                    <div class="label">{{$t('common.车针类型')}}</div>
                    <div class="value">
                        <u--input v-model="searchForm.needle_category.label" suffixIcon="arrow-down" readonly @click.native="needle_categoryShow=true"></u--input>
                    </div>
                </div>
				<div class="item">
				    <div class="label">{{$t('common.针号')}}</div>
				    <div class="value">
				        <u--input v-model="searchForm.needle_size.value" suffixIcon="arrow-down" readonly @click.native="needle_sizeShow=true"></u--input>
				    </div>
				</div>
                <div class="item">
                    <div class="label"></div>
                    <div class="value">
                        <u-button type="primary" icon="scan" :text="$t('common.产线扫码')" @click="scan(true)"></u-button>
                    </div>
                </div>
                <div class="item item">
                    <div class="value">
                        <u-button size='small' color="#909399" type="warning" @click="reset('isSearch')" :text="$t('common.重置筛选')"></u-button>
                    </div>
                </div>
            </div>
        </u-sticky>
        <div class="content">
            <list ref="list" :option="option" :otherData="otherData" @listData="getListData">
                <template v-slot="{item}">
                    <div class="myList box" @click="showBurr('0',item)">
                        <div class="item">
                            <div class="label">{{$t('common.厂区')}}:</div>
                            <div class="value">{{item.org_name}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.产线')}}:</div>
                            <div class="value">{{item.production_line_name}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.车针类型')}}:</div>
                            <div class="value">{{item.needle_category_name}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.领用数量')}}:</div>
                            <div class="value">{{item.receive_num}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.发针数量')}}:</div>
                            <div class="value">{{item.send_num}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.在线使用数量')}}:</div>
                            <div class="value">{{item.useing_num}}</div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.断针数量')}}:</div>
                            <div class="value">{{item.bad_num}}</div>
							<div class="btnList" style = "margin-right: 35rpx;">
							 <u-button v-if="item.changeShow"  size="mini" type="warning" :text="$t('common.换针')" @click.stop.native="sendMsg(item,searchForm)"></u-button>
							 </div>
                        </div>
                        <div class="item">
                            <div class="label">{{$t('common.剩余针数')}}:</div>
                            <div class="value">{{item.residue_num}}</div>
                        </div>
                        <div class="item item2">
                            <div class="value">
                                <div class="btnList">
                                    <u-button size="small" type="primary" :text="$t('common.领针')" @click.stop.native="showBurr('0',item)"></u-button>
                                    <u-button size="small" type="success" :text="$t('common.发针')" @click.stop.native="showBurr('1',item)"></u-button>
                                    <u-button size="small" type="warning" :text="$t('common.断针')" @click.stop.native="showBurr('2',item)"></u-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </list>
        </div>
        <u-picker :confirmText="$t('common.确认')" :cancelText="$t('common.取消')" :show="orgShow" closeOnClickOverlay @close="orgShow=false" @cancel="orgShow=false" @confirm="confirm($event,'org')" :columns="[orgList]" keyName="label"></u-picker>
        <u-picker :confirmText="$t('common.确认')" :cancelText="$t('common.取消')" :show="production_lineShow" closeOnClickOverlay @close="production_lineShow=false" @cancel="production_lineShow=false" @confirm="confirm($event,'production_line')" :columns="[production_lineList]" keyName="label"></u-picker>
        <u-picker :confirmText="$t('common.确认')" :cancelText="$t('common.取消')" :show="needle_categoryShow" closeOnClickOverlay @close="needle_categoryShow=false" @cancel="needle_categoryShow=false" @confirm="confirm($event,'needle_category')" :columns="[needle_categoryList]" keyName="label"></u-picker>
		 <u-picker :confirmText="$t('common.确认')" :cancelText="$t('common.取消')" :show="needle_sizeShow" closeOnClickOverlay @close="needle_sizeShow=false" @cancel="needle_sizeShow=false" @confirm="confirm($event,'needle_size')" :columns="[needle_sizeList]" keyName="value"></u-picker>
        <u-popup :show="addShow" safeAreaInsetTop mode="top" :closeOnClickOverlay="false" :round="10" @close="addShow=false">
            <div class="add">
                <u--form labelWidth="auto" :model="addForm" :rules="rules" ref="addForm">
                    <u-form-item :label="$t('common.厂区')" prop="org.value">
                        <u--input v-model="addForm.org.label" suffixIcon="arrow-down" readonly @click.native="orgShow=true,production_lineShow=needle_categoryShow=needle_sizeShow=false"></u--input>
                    </u-form-item>
                    <u-form-item :label="$t('common.产线')" prop="production_line.value">
                        <mySelect ref="searchPopup2" :otherData="{ org_code: addForm.org.value}" apiName="getProduction_lineList" v-model="addForm.production_line" type="search"></mySelect>
                        <!-- <u--input v-model="addForm.production_line.label" suffixIcon="arrow-down" readonly @click.native="production_lineShow=true,orgShow=needle_categoryShow=false"></u--input> -->
                    </u-form-item>
                    <u-form-item :label="$t('common.车针')" prop="needle_category.value">
                        <u--input v-model="addForm.needle_category.label" suffixIcon="arrow-down" readonly @click.native="needle_categoryShow=true,production_lineShow=orgShow=needle_sizeShow=false"></u--input>
                    </u-form-item>
					<!-- <u-form-item :label="$t('common.车针')" prop="needle_size.value">
					    <u--input v-model="addForm.needle_size.label" suffixIcon="arrow-down" readonly @click.native="needle_sizeShow=true,production_lineShow=orgShow=needle_categoryShow=false"></u--input>
					</u-form-item> -->
                    <u-form-item>
                        <u-button type="primary" color="#0ab99c" icon="scan" :text="$t('common.产线扫码')" @click="scan()"></u-button>
                    </u-form-item>
                    <div class="btnList">
                        <u-button type="primary" @click="saveAdd" :loading="loading" :text="$t('common.确认新增')"></u-button>
                        <u-button color="#909399" @click="addShow=needle_categoryShow=production_lineShow=orgShow=false" :text="$t('common.取消')"></u-button>
						
                    </div>
                </u--form>
            </div>
        </u-popup>
        <u-popup :show="burrShow" :round="10" @close="burrShow=false,onSearch()">
            <div class="burr">
                <div class="bTitle">{{burrForm.title+$t('common.管理')}}</div>
                <div class="title">
                    <div class="txt">{{$t('common.厂区')}}:{{burrForm.org_name}}</div>
                    <div class="txt">{{$t('common.产线')}}:{{burrForm.production_line_name}}</div>
                    <div class="txt">{{$t('common.车针')}}:{{burrForm.needle_category_name}}</div>
					 <!-- <div class="txt">{{$t('common.车针')}}:{{burrForm.needle_category_name}}</div> -->
                </div>
                <u-divider></u-divider>
                <div class="burrAdd">
                    <div class="myList  box">
                        <div class="item">
                            <div class="label">{{burrForm.title}}{{$t('common.数量')}}:</div>
                            <div class="value">
                                <u-number-box color="#ffffff" bgColor="#2979ff" iconStyle="color: #fff" :min="1" integer v-model="burrForm.collar_qty"></u-number-box>
                            </div>
                        </div>
                        <div class="item2">
                            <div class="label">{{burrForm.title}}{{$t('common.日期')}}:</div>
                            <div class="value">
                                <uni-datetime-picker :start-placeholder="$t('common.开始日期')" :end-placeholder="$t('common.结束日期')" type="date" :clear-icon="false" v-model="burrForm.collar_date" />
                            </div>
                        </div>
						<div class="item2">
						    <div class="label">{{burrForm.title}}{{$t('common.针号')}}:</div>
							<div class="value">
							    <u--input v-model="burrForm.needle_size" type='number'></u--input>
							</div>
						    <!-- <div class="value">
						        <u--input v-model="searchForm.needle_size.label" suffixIcon="arrow-down" readonly @click.native="needle_sizeShow=true"></u--input>
						    </div> -->
						</div>
                        <div class="item item2">
                            <div class="label">{{burrForm.title}}{{$t('common.备注')}}:</div>
                            <div class="value">
                                <u--textarea v-model="burrForm.remarks" :placeholder="$t('common.备注')"></u--textarea>
                            </div>
                        </div>
                        <div class="item item2" v-if="burrForm.opa_type==2">
                            <div class="label">{{burrForm.title}}{{$t('common.图片')}}:</div>
                            <div class="value">
                                <upload :fileList="burrForm.guid_list"></upload>
                            </div>
                        </div>
                        <div class="item item2">
                            <u-button size="small" icon='plus' type="primary" :loading='loading' :text="$t('common.新增')" @click="addBurrList"></u-button>
                        </div>
                    </div>
                </div>
                <u-divider></u-divider>
                <div class="table">
                    <uni-table border :loading="loading">
                        <uni-tr>
                            <uni-th width="120">{{burrForm.title}}{{$t('common.日期')}}</uni-th>
							<uni-th width="120">{{$t('common.针号')}}</uni-th>
                            <uni-th>{{burrForm.title}}{{$t('common.数量')}}</uni-th> 
                            <uni-th>{{$t('common.操作人')}}</uni-th>
                            <uni-th>{{$t('common.备注')}}</uni-th>
                            <uni-th v-if="burrForm.opa_type==2">{{$t('common.照片')}}</uni-th>
                            <uni-th>{{$t('common.操作')}}</uni-th>
                        </uni-tr>
                        <uni-tbody height="30vh">
                            <uni-tr v-for='(e,i) in burrList' :key='i'>
                                <uni-td width="120">{{e.collar_date}}</uni-td>
								<uni-td width="120">{{e.collar_size}}</uni-td>
                                <uni-td>{{e.collar_qty}}</uni-td>
                                <uni-td>{{e.staff_name}}</uni-td>
                                <uni-td>{{e.remarks}}</uni-td>
                                <uni-td v-if="burrForm.opa_type==2">
                                    <upload :fileList="e.guid_list" disabled></upload>
                                </uni-td>
                                <uni-td>
                                    <u-button icon="trash" type="error" :text="$t('common.删除')" @click="delBurrList(e)"></u-button>
                                </uni-td>
                            </uni-tr>
                        </uni-tbody>
                    </uni-table>
                    <!-- <uni-pagination show-icon="true" :total="total" v-model="page" @change="getBurrDetailList"></uni-pagination> -->
                </div>
            </div>
        </u-popup>
    </div>
</template>
<script>
import { getDate, uploadFilePromise } from '@/util'
import upload from '../../components/upload/upload.vue'
export default {
    components: { upload },
    name: 'burrManage',
    data() {
        return {
            orgObj: {

            },
            addForm: {
                org: {//厂区
                    label: this.$t('common.未选择'),
                    value: '',
                },
                production_line: {//产线
                    label: this.$t('common.未选择'),
                    value: '',
                },
                needle_category: {//车针类型
                    label: this.$t('common.未选择'),
                    value: '',
                },
				needle_size: {//车针类型
				    label: this.$t('common.未选择'),
				    value: '',
				},
            },
            searchForm: {
                org: {//厂区
                    label: this.$t('common.全部'),
                    value: '',
                },
                production_line: {//产线
                    label: this.$t('common.全部'),
                    value: '',
                },
                needle_category: {//车针类型
                    label: this.$t('common.全部'),
                    value: '',
                },
				needle_size: {//车针类型
				    label: this.$t('common.全部'),
				    value: '',
				},
            },
            burrForm: {
                org_name: "",
                production_line_name: "",
                needle_category_name: "",
				
                opa_type: '0',
                remarks: '',
                collar_date: '',
				needle_size: '',
                collar_qty: 1,
                guid_list: [],
                title: this.$t('common.领针记录')
            },
            option: {
                getDataName: 'getBurrList',//获取列表数据的方法名
                delName: 'delBurr',//删除数据的方法名
                delData: {//删除数据需要的参数
                    prop: 'id',//删除数据的对应字段名
                    value: 'id',//删除数据的对应值的字段名
                },
                page: {//page对应的参数
                    page: 'page',//页码对应字段名
                    pageRow: 'pageRow',//页尺寸的字段名
                },
            },
            total: 0,
            page: 1,
            pageRow: 10,
            orgShow: false,
            addShow: false,
            burrShow: false,
            production_lineShow: false,
            needle_categoryShow: false,
			needle_sizeShow: false,
            loading: false,
            orgList: [],
            production_lineList: [],
            needle_categoryList: [],
			needle_sizeList: [],
            burrList: [],
            status: 'loadmore',
            rules: {
                'org.value': {
                    required: true,
                    message: this.$t('common.请选择厂商'),
                    trigger: ['blur', 'change']
                },
                'production_line.value': {
                    required: true,
                    message: this.$t('common.请选择产线'),
                    trigger: ['blur', 'change']
                },
                'needle_category.value': {
                    required: true,
                    message: this.$t('common.请选择车针类型'),
                    trigger: ['blur', 'change']
                },
				'needle_size.value': {
				    required: true,
				    message: this.$t('common.请选择车针类型'),
				    trigger: ['blur', 'change']
				},

            },
        }
    },
    computed: {
        otherData: function () {
			//debugger;
            return {
                org_code: this.searchForm.org.value,
                production_line_code: this.searchForm.production_line.value,
                needle_category_no: this.searchForm.needle_category.value,
				needle_size: this.searchForm.needle_size.value,
            }
        }
    },
    methods: {
        productionConfirm(item) {
            this.onSearch()
            // console.log(item);
            // this[this.addShow ? 'addForm' : 'searchForm'].production_line = val.value[0]
            // this.production_lineShow = false
            // this.addShow || this.onSearch()

        },
        addBurrList() {
			//if (!this.burrForm.needle_size) return uni.$u.toast(this.$t('common.请先输入批次数量'))
			if (!this.burrForm.needle_size) return uni.$u.toast("Enter needle size")
			//debugger;
            this.loading = true
            let data = {
                id: this.burrForm.id,//主页任务id
                opa_type: this.burrForm.opa_type,//操作类型  领用：0；发针：1；断针：2；
                collar_qty: this.burrForm.collar_qty,//数量
				collar_size : this.burrForm.needle_size,
                collar_date: this.burrForm.collar_date,//日期
                remarks: this.burrForm.remarks,//备注
                guid_list: this.burrForm.guid_list,//图片guid
            }
            this.$apis.addBurrList(data).then((res) => {
				
                console.log(data, res, '新增车针记录')
                uni.$u.toast(this.$t('common.新增成功'))
                this.burrForm.collar_qty = 1
				this.burrForm.needle_size=''
                this.burrForm.remarks = ''
                this.burrForm.guid_list = []
                this.page = 1
                this.getBurrDetailList()
            }).catch((err) => { 
                console.error(err);
				this.burrForm.needle_size=''
            }).finally(() => {
                this.loading = false
            })
        },
        delBurrList(row) {
            let _this = this
            uni.showModal({
                confirmText: this.$t('common.确定'),
                cancelText: this.$t('common.取消'),
                content: this.$t('common.是否确定删除'),
                success(res) {
                    if (res.confirm) {
                        _this.$apis.delBurrList({
                            opa_type: _this.burrForm.opa_type,//操作类型  领用：0；发针：1；断针：2；
                            id: row.id,//表对应id
                        }).then((res) => {
                            _this.$u.toast(_this.$t('common.删除成功'))
                            _this.getBurrDetailList()
                        }).catch((err) => {
                        })
                    }
                },
                fail() {

                }
            })
        },
        getBurrDetailList() {
            this.loading = true
            let data = {
                id: this.burrForm.id,//主页任务id
                opa_type: this.burrForm.opa_type,//操作类型  领用：0；发针：1；断针：2；
                page: this.page,
                pageRow: 99999
            }
            this.$apis.getBurrDetailList(data).then((res) => {
				//debugger
                console.log(data, res, '获取车针记录')
                this.burrList = res.RetData1
                this.total = res.RetData1.total
            }).catch((err) => {
                console.error(err);
            }).finally(() => {
                this.loading = false

            })
        },
        async afterRead(event, row) {
            event.file.forEach((e, i) => {
                uploadFilePromise(e.url).then((res) => {
                    let returnObj = JSON.parse(res.data).returnObj
                    console.log(returnObj, row, '上传')
                    row.guid_list.push({ url: e.url, guid: returnObj.guid })
                    console.log(returnObj, row, '上传')
                }).catch((err) => {
                    console.log(err);
                })
            })

        },
        deletePic(event, row) {
            row.guid_list.splice(event.index, 1)
        },
        saveAdd() {
            this.$refs.addForm.validate().then(res => {
                // uni.$u.toast('校验通过')
                let data = {
                    org_code: this.addForm.org.value,
                    production_line_code: this.addForm.production_line.value,
                    needle_category_no: this.addForm.needle_category.value,
					needle_size: this.searchForm.needle_size.value,
                    org_name: this.addForm.org.label,
                    production_line_name: this.addForm.production_line.label,
                    needle_category_name: this.addForm.needle_category.label,
                }
                this.loading = true
                this.$apis.addBurr(data).then((res) => {
                    console.log(data, res, '新增厂区产线车针信息')
                    uni.$u.toast(this.$t('common.新增成功'))
                    this.addShow = false
                    this.onSearch()
                }).catch((err) => {
                    uni.$u.toast(err || '新增失败')
                }).finally(() => {
                    this.loading = false
                })
            }).catch(errors => {
                uni.$u.toast(this.$t('common.请检查是否填写完整'))
            })
        },
        showBurr(opa_type, item) {
            Object.assign(this.burrForm, item)
            this.burrForm.opa_type = opa_type
            this.burrForm.remarks = ''
            this.burrForm.collar_date = getDate()
            this.burrForm.collar_qty = 1
            this.burrForm.guid_list = []
            this.page = 1
            if (this.burrForm.opa_type == '0') {
                this.burrForm.title = this.$t('common.领针')
            }
            if (this.burrForm.opa_type == '1') {
                this.burrForm.title = this.$t('common.发针')
            }
            if (this.burrForm.opa_type == '2') {
                this.burrForm.title = this.$t('common.断针')
            }
            this.burrShow = true
            this.getBurrDetailList()
        },
        add() {
            this.reset()
            this.addShow = true
        },
        reset(isSearch) {
			//debugger
            if (isSearch) {
                this.searchForm = {
                    org: {//厂区
                        label: this.$t('common.全部'),
                        value: '',
                    },
                    production_line: {//产线
                        label: this.$t('common.全部'),
                        value: '',
                    },
                    needle_category: {//车针类型
                        label: this.$t('common.全部'),
                        value: '',
                    },
					needle_size: {//车针类型
					    //label: this.$t('common.全部'),
					    value: '',
					},
                    page: 1,
                    pageRow: 10,
                }
                this.onSearch()
            } else {
                this.addForm = {
                    org: {//厂区
                        label: this.$t('common.未选择'),
                        value: '',
                    },
                    production_line: {//产线
                        label: this.$t('common.未选择'),
                        value: '',
                    },
                    needle_category: {//车针类型
                        label: this.$t('common.未选择'),
                        value: '',
                    },
					needle_size: {//车针类型
					    //label: this.$t('common.全部'),
					    value: '',
					},
                }
            }
        },
        confirm(val, name) {
			//debugger;
            if (name == 'org') {
                this[this.addShow ? 'addForm' : 'searchForm'].org = val.value[0]
                this.orgShow = false
                // this.getProduction_lineList(this.addShow ? val.value[0] : '')
                this.$nextTick(() => {
                    if (this.addShow ) {
                        this.addForm.production_line = {
                            label: this.$t('common.未选择'),
                            value: '',
                        }
                    } else {
                        this.searchForm.production_line = {
                            label: this.$t('common.全部'),
                            value: '',
                        }
                        this.onSearch()
                    }
                    this.addShow ? this.$refs.searchPopup2.init() : this.$refs.searchPopup1.init()

                })
            }
            if (name == 'production_line') {
                this[this.addShow ? 'addForm' : 'searchForm'].production_line = val.value[0]
                this.production_lineShow = false
                this.addShow || this.onSearch()
            }
            if (name == 'needle_category') {
                this[this.addShow ? 'addForm' : 'searchForm'].needle_category = val.value[0]
                this.needle_categoryShow = false
                this.addShow || this.onSearch()
            }
			if (name == 'needle_size') {
			    this[this.addShow ? 'addForm' : 'searchForm'].needle_size = val.value[0]
			    this.needle_sizeShow = false
			    this.addShow || this.onSearch()
			}
        },
        scan(isSearch) {
            console.log('扫描');
            // 允许从相机和相册扫码
            let _this = this
            uni.scanCode({
                success: function (res) {
                    console.log('条码类型：' + res.scanType);
                    console.log('条码内容：' + res.result);
                    _this.getProduction_lineInfoByScan(res.result, isSearch)
                }
            });
        },
        onSearch() {
            this.$nextTick(() => this.$refs.list.init())

        },

        getOrgList() {
            let data = {
            }
            this.$apis.getOrgList(data).then((res) => {
                console.log(data, res, '获取厂区列表')

                this.orgList = res.RetData1
                this.onSearch()

            }).catch((err) => {
                console.error(err);
            })
        },
        getProduction_lineList(val) {
            let data = {
                org_code: val || this.searchForm.org.value //厂区代号
            }
            this.$apis.getProduction_lineList(data).then((res) => {
                console.log(data, res, '获取产线列表')

                this.production_lineList = res.RetData1
                if (val) {
                    this.addForm.production_line = {
                        label: this.$t('common.未选择'),
                        value: '',
                    }
                } else {
                    this.searchForm.production_line = {
                        label: this.$t('common.全部'),
                        value: '',
                    }
                    this.onSearch()
                }
            }).catch((err) => {
                console.error(err);
            })
        },
        getNeedle_categoryList() {
			//debugger;
            let data = {
            }
            this.$apis.getNeedle_categoryList(data).then((res) => {
                console.log(data, res, '获取车针类型列表')

                this.needle_categoryList = res.RetData1
            }).catch((err) => {
                console.error(err);

            })
        },
		getNeedle_sizeList() {
			//debugger;
		    let data = {
		    }
		    this.$apis.getNeedle_sizeList(data).then((res) => {
		        console.log(data, res, '获取车针类型列表')
		
		        this.needle_sizeList = res.RetData1
		    }).catch((err) => {
		        console.error(err);
		
		    })
		},
        getProduction_lineInfoByScan(result, isSearch) {
            let data = {
                production_line_code: result
            }
            this.$apis.getProduction_lineInfoByScan(data).then((res) => {
                console.log(data, res, '扫码获取产线信息')
                if (!res.RetData1.length) return uni.$u.toast(this.$t('common.查无信息'))

                if (isSearch) {
                    this.searchForm.org = {
                        label: res.RetData1[0].org_name || this.$t('common.全部'),
                        value: res.RetData1[0].org_code || '',
                    }
                    this.searchForm.production_line = {
                        label: res.RetData1[0].production_line_name || this.$t('common.全部'),
                        value: res.RetData1[0].production_line_code || "",
                    }
                    this.onSearch()
                } else {
                    this.addForm.org = {
                        label: res.RetData1[0].org_name || this.$t('common.未选择'),
                        value: res.RetData1[0].org_code || "",
                    }
                    this.addForm.production_line = {
                        label: res.RetData1[0].production_line_name || this.$t('common.未选择'),
                        value: res.RetData1[0].production_line_code || "",
                    }
                }
            }).catch((err) => {
                console.error(err);

            })
        },
		//更新数据
		sendMsg(item,searchForm){
			//debugger;
			
			let data = {
				
			    id: item.id,
				collar_size:searchForm.needle_size.value,
				collar_qty:5,
				opa_type:3
			}
		
			this.$apis.NeedleChange(data).then((res) => {
				//debugger
                console.log(data, res, '获取断针信息')
               // item.receive_num -= 10;
               // item.bad_num -= 10;
               // //断针数量小于10，隐藏按钮
               // if(item.bad_num < 10){
               // 	item.changeShow = false
               // }
			   
			   item.receive_num -= 1;
			   item.bad_num -= 1;
			   //断针数量小于10，隐藏按钮
			   if(item.bad_num < 1){
			   	item.changeShow = false
			   }
            }).catch((err) => {
                console.error(err);

            })
		},
		//获取列表的list集合
		getListData(data){
			//debugger
			data.forEach((item ,positon) => {
				console.log(item.bad_num,"getBurrList")
				if(item.bad_num > 1){
					item.changeShow = true
				}else{
					item.changeShow = false
				}
			})
			
		},
    },
    onLoad(query) {
        this.getOrgList()
        // this.getProduction_lineList()
        this.getNeedle_categoryList()
		this.getNeedle_sizeList() 

    }
}
</script>
<style lang='scss' scoped>
.burrManage {
    .search {
        background: #fff;
        padding: 5rpx;
        .item {
            .label {
            }
            .value {
            }
        }
    }
    .btnList {
        display: flex;
        margin-top: 5rpx;
    }
    .content {
        padding: 15rpx;
        .box {
            .item {
                width: 50%;
                .label {
                    width: 140rpx;
                    text-align: left;
                    margin-right: 5rpx;
                }
            }
            .item2 {
                width: 100%;
            }
        }
    }
    .add,
    .burr {
        padding: 15rpx;
    }
    .burr {
        .bTitle {
            font-size: 30rpx;
            font-weight: 600;
            text-align: center;
        }
        .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 24rpx;
        }
        .box {
            margin: 15rpx 0;
            /deep/.u-upload__wrap {
                flex-wrap: nowrap;
                overflow: auto;
                max-width: 80vw;
            }
        }
    }
}
</style>
