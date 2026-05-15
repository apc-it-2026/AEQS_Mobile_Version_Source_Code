<template>
	<div class='mySelect'>

		<u-input :placeholder="placeholder"
			:value="Array.isArray(value[labelName])?value[labelName].toString():value[labelName] " :disabled="disabled"
			suffixIcon="arrow-down" readonly @click.native="showTpye">
			<!-- <u-icon slot="suffix" name="arrow-down"></u-icon> -->
			<!-- <u-icon slot="prefix" v-show="value[labelName]&&!disabled&&clearabled&&type!=='checkbox'" name="close-circle" @click.stop.native="clear"></u-icon> -->
		</u-input>
		<!-- 操作菜单 -->
		<!-- <u-action-sheet @select="actionConfirm" :actions="list" :cancelText="$t('common.取消')" :show="actionShow" closeOnClickOverlay @close="actionShow=false" :round="10"></u-action-sheet> -->
		<!-- 滚动选择框 -->
		<!-- <u-picker :confirmText="$t('common.确认')" :cancelText="$t('common.取消')" :defaultIndex="[list.findIndex(e=>e[valueName]==value[valueName])==-1?0:list.findIndex(e=>e[valueName]==value[valueName])]" @confirm="pickerConfirm" :show="pickerShow" :keyName="labelName" closeOnClickOverlay @close="pickerShow=false" @cancel="pickerShow=false" :columns="[list]"></u-picker> -->
		<!--搜索选择框-->
		<!-- 多选 -->
		<u-popup :show="checkboxShow" @close="checkboxShow=false" :round="10" closeOnClickOverlay>
			<div class="checkbox">
				<!-- <searchPopup ref="searchPopup" :scanAbled="scanAbled" :getFirst="getFirst" :inputValue="value[labelName]" :show.sync="searchShow" :otherData="otherData" :apiName="type=='search'?apiName:''" :label="labelName" :title="titleName" :value="valueName" @confirm="searchConfirm"></searchPopup>               -->
				<u--input placeholder="Search" suffixIcon="search" suffixIconStyle="color: #909399" :value="selectValue"
					v-model="selectValue">
				</u--input>
				<u-checkbox-group size='27' borderBottom iconSize='18' iconPlacement='right' v-model="checkedList"
					placement="column">
				<!-- 	<u-checkbox :customStyle="{marginBottom: '8px'}"
						@change="checkedChange(checkedList.some(e=>e[valueName]==item[valueName])+'|'+item.value)"
						:checked="checkedList.some(e=>e[valueName]==item[valueName])"
						v-for="(item, index) in filterList" :key="index" :label="item[labelName]" :name="item">
					</u-checkbox> -->
				<u-checkbox :customStyle="{marginBottom: '8px'}"
					@change="checkedChange(checkedList.some(e=>e.value==item.value)+'|'+item.value)"
					:checked="checkedList.some(e=>e.value==item.value)"
					v-for="(item, index) in filterList" :key="index" :label="item.label" :name="item">
				</u-checkbox>
				</u-checkbox-group>
				<!-- <view>{{vau}}</view> -->
				<hr/>
				<view>选中的PO（内容过多可上下滑动）：</view>
				<scroll-view scroll-y="true" class="sv" style="height: 60px">
                <view style="width: 100%;height: 60px;display: flex;flex-wrap: wrap;">
					
					<view v-for="(item, index) in checkedList">{{item.value}}、</view>
					
				</view></scroll-view>
				<div class="btnList">
					<u-button class="btn" type="primary" color="#909399" :text="$t('common.清空选择')"
						@click="clearlist"></u-button>
					<u-button type="primary" color="#0ab99c" :text="$t('common.确定')"
						@click="checkboxConfirm"></u-button>
				</div>
			</div>
		</u-popup>
		<!--扫码验证框-->
		<!--   <u-popup :show="scanShow" @close="scanShow=false" :round="10" closeOnClickOverlay>
            <div class="scan">
                <u-input v-model="scanValue" clearable @confirm="scanConfirm">
                    <u-icon slot="suffix" name="scan" @click="scan()" v-if="scanAbled"></u-icon>
                </u-input>
                <div class="btnList">
                    <u-button type="primary" color="#0ab99c" :text="$t('common.确定')" @click="scanConfirm"></u-button>
                </div>
            </div>
        </u-popup> -->
	</div>
</template>
<script>
	import {
		data
	} from '../../uni_modules/uview-ui/libs/mixin/mixin'
	export default {
		name: 'mySelect2',
		props: {
			disabled: { //是否禁用
				type: Boolean,
				default: false
			},
			scanAbled: { //是否能够扫码
				type: Boolean,
				default: false
			},
			clearabled: { //是否可以清空
				type: Boolean,
				default: false
			},
			getFirst: { //是否得到数据后自动选取第一条
				type: Boolean,
				default: false
			},
			placeholder: { //占位文字
				type: String,
				default: ''
			},
			apiName: { //获取搜索框数据或者验证扫码的方法名
				type: String,
				default: ''
			},
			labelName: { //展示的值对应字段名
				type: String,
				default: 'label'
			},
			valueName: { //唯一值对应字段名
				type: String,
				default: 'value'
			},
			titleName: { //额外值值对应字段名
				type: String,
				default: ''
			},
			type: { //action:操作菜单 picker:滚动选择框 checkbox:多选 search:搜索选择框 scan:扫码验证框
				type: String,
				default: 'action'
			},
			list: { //选项数组
				type: Array,
				default: () => []
			},
			value: { //对应item
				type: Object,
				default: () => {
					return {}
				}
			},
			otherData: { //接口需要的其他数据
				type: Object,
				default: () => {
					return {}
				}
			},
			//@confirm 清空和确认选择事件
			//@clear 清空事件
			//@open 打开事件
			//@close 关闭事件
		},
		data() {
			return {
				actionShow: false,
				pickerShow: false,
				checkboxShow: false,
				searchShow: false,
				scanShow: false,
				IsOne: 1,
				checkedList: [], //已选择列表
				scanValue: '',
				selectValue: "",
				filterList: this.list,
				vau: []
			}
		},
		computed: {
			opened: function() { //判断是否正在显示						
				return this.actionShow || this.pickerShow || this.checkboxShow || this.searchShow || this.scanShow
			},

		},
		watch: {
			// 监听列表的变化，重新整理内部数据
			list: {
				immediate: true,
				deep: true,
				handler() {
					this.filterList = this.list;
				}
			},
			opened: {
				handler() {
					if (!this.opened) this.$emit('close')
				}
			},
			vau:{
				handler(){
					
					this.checkedList=[];
				this.vau.forEach((item, index) => {
					
					 let data = this.list.find(listItem => listItem.value === item);
					console.log(data)
					console.log("40040040404404040")
					
					this.checkedList.push({value:item,label:data.label.split(',')[1]})
				});
				}
			},
			selectValue: {
				handler() {
					this.filterList = this.list.filter(item => item.label.includes(this.selectValue));
					
				}
			}
		},
		methods: {
			init() { //初始化searchPopup数据
				this.$refs.searchPopup.onSearch()
			},
			showTpye() {
				if (this.disabled) return
				if (this.type == 'action') {
					this.list.forEach((e) => {
						if (!e.name) e.name = e[this.labelName]
					})
					this.actionShow = true
				}

				if (this.type == 'picker') this.pickerShow = true
				if (this.type == 'checkbox') {
					this.checkedList = this.value.checkedList || []
					this.checkboxShow = true
				}
				if (this.type == 'search') this.searchShow = true
				if (this.type == 'scan') {
					this.scanValue = this.value[this.labelName]
					this.scanShow = true
				}
				this.$emit('open')
			},
			scan() {
				console.log('扫描');
				// 允许从相机和相册扫码
				let _this = this
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						_this.scanValue = res.result
						_this.scanConfirm()
					}
				});
			},
			clear() {
				let item = {
					...this.value
				}
				for (const key in item) {
					this.$set(item, key, this.type == 'checkbox' ? [] : '');
				}
				this.$emit("input", item);
				this.$emit("clear");
				this.$emit("confirm", item);
			},
			actionConfirm(item) {
				// for (const key in item) {
				//     this.$set(this.value, key, item[key]);
				// }
				// this.value[this.labelName] = item.name
				// this.value[this.valueName] = item[this.valueName]
				// this.$emit("input", this.value);
				// // console.log(this.value[this.labelName], item.name);
				// this.$emit("confirm", item);
			},
			pickerConfirm(item) {
				item = item.value[0]
				this.pickerShow = false
				// Object.assign(this.value, item)
				this.$emit("input", item);
				this.$emit("confirm", item);
			},
			checkboxConfirm() {
				this.value.checkedList = this.checkedList
				console.log(this.checkedList);
				this.value[this.labelName] = this.vau;
				this.value[this.valueName] = this.vau;
				this.checkboxShow = false;
				if(this.vau.length==0){
					this.checkedList.forEach((item, index) => {
						this.vau.push(item.value)
					});
				}
				// this._value= this.value;
				// this.value = [...this._value, ...this.value == "" ? "" : this.value]
				this.$emit("input", this.value);
				this.$emit("confirm", this.value);
			},
			searchConfirm(item) {
				this.searchShow = false
				this.$emit("input", item);
				this.$emit("confirm", this.value);
			},
			scanConfirm() {
				if (!this.scanValue) return uni.$u.toast(this.$t('common.请先输入值'))
				console.log('验证');
				let data = {
					[this.labelName]: this.scanValue
				}
				this.$apis[this.apiName](data).then((res) => {
					console.log(data, res, '验证并带回信息')
					let RetData = res.RetData1 || res.RetData || res
					RetData = Array.isArray(RetData) ? RetData[0] : RetData
					if (!RetData) throw this.$t('common.查无数据')
					if (Object.keys(RetData).length) {
						Object.assign(this.value, RetData)
						this.scanShow = false
						this.$emit("confirm", this.value);
					} else {
						throw this.$t('common.查无数据')
					}
				}).catch((err) => {
					console.error(err);
					uni.$u.toast(err || '查无数据')
				})
			},
			getFirstValue() {
				if (!this.list.length || !this.getFirst || this.value[this.valueName] || this.value[this.labelName]) return
				let item = this.list[0] //自动选取第一条
				this.$emit("input", item);
				this.$emit("confirm", item);
			},
			clearlist() {
				this.checkedList = [];
				this.vau = [];
			},
			checkedChange(n) {
				console.log("88888888888888888")
				let data1 = this.vau;
				let date = n.split('|');
				let ischecked = date[0];
				let Avalue = date[1];
				if(this.vau.length==0){
					this.checkedList.forEach((item, index) => {
						this.vau.push(item.value)
					});
				}
				if (ischecked != "true") {
					data1.push(Avalue)
				} else {
					let dex = data1.indexOf(Avalue);
					if (dex !== -1) {
						data1.splice(dex, 1); // 如果找到了，就移除这个元素
					}
				}
										
			}
		},
		mounted() {
			
		}
	}
</script>
<style lang='scss' scoped>
	.mySelect {
		width: 100%;

		.input {
			display: flex;
		}

		.checkbox {
			padding: 15rpx;

			/deep/.u-checkbox-group {
				max-height: 50vh;
				overflow: scroll;
			}

			.btnList {
				display: flex;

				.btn {
					margin-right: 5rpx;
				}
			}
		}

		.scan {
			padding: 15rpx;

			.btnList {
				margin-top: 5px;
			}
		}
	}
</style>