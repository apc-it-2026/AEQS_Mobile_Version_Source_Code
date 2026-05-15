<template>
	<div class='RQCDetail'>
		<u-navbar border :title="query.type == 'add' ? $t('common.新建RQC任务') : $t('common.RQC任务详情')"
			:leftText="$t('common.返回')" placeholder autoBack>
			<div class="switch" slot="right" v-if="query.type !== 'add'">
				<div class="txt" :class="isFinish ? 'suc' : 'err'">{{ isFinish ? $t('common.已结束') : $t('common.未结束') }}</div>
				<u-switch activeColor="#5ac725" inactiveColor="#f56c6c" :loading="loading" v-model="isFinish" asyncChange
					@change="asyncChange"></u-switch>
			</div>
		</u-navbar>
		<u-collapse ref="Collapse" :value="[$t('common.基本信息'), $t('common.鞋型信息')]">
			<u-collapse-item :title="$t('common.基本信息')" :name="$t('common.基本信息')">
				<uni-card margin="0">
					<div class="myList">
						<div class="item2">
							<div class="label">{{ $t('common.实验室样品编号') }}:</div>
							<div class="value">
								<scan :disabled="isFinish" v-model="headFrom.ex_task_no" @confirm="bindEx_task_no"></scan>
							</div>
						</div>

						<div class="item">
							<div class="label">Sales Order</div>
							<div class="value">
								<mySelect @confirm="confirmPo" :disabled="query.type != 'add'" v-model="headFrom.POForm"
									labelName="se_id" apiName="Rqc_taskBase_getpoview" scanAbled type="scan"></mySelect> <!-- label name changed from mer_po to se_id for PO change Project -->
							</div>
						</div>
						<div class="item">
							<div class="label">{{ $t('common.季度') }}:</div>
							<div class="value">
								{{ headFrom.POForm.develop_season }}
							</div>
						</div>
						<div class="item">
							<div class="label">{{ $t('common.鞋型') }}:</div>
							<div class="value">
								{{ headFrom.POForm.name_t }}
							</div>
						</div>
						<div class="item">
							<div class="label">ART:</div>
							<div class="value">
								{{ headFrom.POForm.prod_no }}
							</div>
						</div>
						<div class="item">
							<div class="label">{{ $t('common.制令') }}:</div>
							<div class="value">
								{{ headFrom.POForm.workorder_no }}
							</div>
						</div>
						<div class="item">
							<div class="label">{{ $t('common.PO分组列表') }}:</div>
							<div class="value">
								{{ headFrom.POForm.mer_po }}
							</div>
						</div>
						<div class="item">
							<div class="label">{{ $t('common.工段') }}:</div>
							<div class="value">
								<mySelect @confirm="confirmWorkshop_section" :disabled="query.type != 'add'"
									:list="workshop_sectionList" labelName="workshop_section_name" valueName="workshop_section_no"
									v-model="headFrom.workshop_section" type="picker"></mySelect>
							</div>
						</div>
						<div class="item">
							<div class="label">{{ $t('common.工艺材料种类') }}:</div>
							<div class="value">
								<mySelect :disabled="query.type != 'add'" :list="headFrom.workshop_section.bottom"
									labelName="workmanship_name" valueName="workmanship_code" v-model="headFrom.workmanship"
									type="picker"></mySelect>
							</div>
						</div>
						<div class="item">
							<div class="label">{{ $t('common.机台') }}:</div>
							<div class="value">
								<u-input v-model="headFrom.eq_info_no" :disabled="query.type != 'add'" clearable> </u-input>
							</div>
						</div>
						<div class="item2">
							<div class="label">{{ $t('common.组别') }}:</div>
							<div class="value">
								<scan :disabled="query.type != 'add'" v-model="headFrom.production_line_code"
									@confirm="Rqc_taskBase_production_branch_list"></scan>
							</div>
						</div>
						<div class="item">
							<div class="label">{{ $t('common.部门') }}:</div>
							<div class="value">
								<mySelect :disabled="query.type != 'add'" :list="departmentList" labelName="department"
									valueName="department" v-model="headFrom.department" type="picker"></mySelect>
							</div>
						</div>
						<div class="item">
							<div class="label">{{ $t('common.模号') }}:</div>
							<div class="value">
								<u-input v-model="headFrom.mold_no" :disabled="query.type != 'add'" clearable> </u-input>
							</div>
						</div>
						<div class="item">
							<div class="label">{{ $t('common.厂商') }}:</div>
							<div class="value">
								<mySelect :disabled="query.type != 'add'" apiName="RQCcheck_GetRQCAudit_Edit_suppliers"
									v-model="headFrom.suppliers" type="search" valueName="value"></mySelect>
							</div>
						</div>
					</div>
				</uni-card>
			</u-collapse-item>
			<u-collapse-item :title="$t('common.鞋型信息')" :name="$t('common.鞋型信息')">
				<uni-card :title="$t('common.鞋型信息')" margin="0">
					<div class="myList">
						<div class="item">
							<div class="label">{{ $t('common.鞋图') }}:</div>
							<div class="value">
								<upload :fileList="headFrom.POForm.imgs" disabled></upload>
							</div>
						</div>
						<div class="item">
							<div class="label">{{ $t('common.开发课') }}:</div>
							<div class="value"> {{ headFrom.POForm.user_section }} </div>
						</div>
						<div class="item">
							<div class="label">Category:</div>
							<div class="value"> {{ headFrom.POForm.style_seq }} </div>
						</div>
						<div class="item">
							<div class="label">{{ $t('common.鞋型负责人') }}:</div>
							<div class="value"> {{ headFrom.POForm.user_in_shoecharge }} </div>
						</div>
						<div class="item">
							<div class="label">{{ $t('common.开发技术负责人') }}:</div>
							<div class="value"> {{ headFrom.POForm.user_technical }} </div>
						</div>
						<div class="item">
							<div class="label">PB Type:</div>
							<div class="value"> {{ headFrom.POForm.develop_type }} </div>
						</div>
						<div class="item">
							<div class="label">{{ $t('common.DQA负责人') }}:</div>
							<div class="value"> {{ headFrom.POForm.qa_principal }} </div>
						</div>
					</div>
				</uni-card>
			</u-collapse-item>
		</u-collapse>
		<u-subsection v-if="query.type != 'add'" mode="subsection" :list="subsection" :current="current"
			@change="e => current = e"></u-subsection>
		<div class="DQA" v-if="query.type != 'add' && current == 0">
			<div class="myList myList2 u-border" v-for='(item, i) in DQAList' :key='i'>
				<div class="item2">
					<div class="label">{{ $t('common.图片') }}:</div>
					<div class="value">
						<upload :fileList="item.imgs" disabled></upload>
					</div>
				</div>
				<div class="item">
					<div class="label">{{ $t('common.材料部件名称') }}:</div>
					<div class="value">{{ item.choice_name }}</div>
				</div>
				<div class="item">
					<div class="label">{{ $t('common.检验项目') }}:</div>
					<div class="value">{{ item.inspection_name }}</div>
				</div>
				<div class="item">
					<div class="label">{{ $t('common.外观检验') }}:</div>
					<div class="value">{{ item.enum_value }}</div>
				</div>
				<div class="item">
					<div class="label">{{ $t('common.标准') }}:</div>
					<div class="value">{{ item.standard_value }}</div>
				</div>
				<div class="item">
					<div class="label">{{ $t('common.单位') }}:</div>
					<div class="value">{{ item.unit }}</div>
				</div>
				<div class="item2">
					<div class="label">{{ $t('common.备注') }}:</div>
					<div class="value">{{ item.remark }}</div>
				</div>
				<div class="item2">
					<div class="label">{{ $t('common.其他措施') }}:</div>
					<div class="value">{{ item.other_measures }}</div>
				</div>
				<div class="item2">
					<div class="talbe">
						<uni-table border :loading="loading">
							<uni-tr>
								<uni-th width="80">{{ $t('common.检验总数') }}</uni-th>
								<uni-th>{{ $t('common.合格数量') }}</uni-th>
								<uni-th>{{ $t('common.不良问题描述') }}</uni-th>
								<uni-th>{{ $t('common.图片') }}</uni-th>
								<uni-th>{{ $t('common.检验结果') }}</uni-th>
								<uni-th v-if="!isFinish">{{ $t('common.操作') }}</uni-th>
							</uni-tr>
							<uni-tbody>
								<uni-tr>
									<uni-td width="80">
										<u--input :disabled="isFinish" type="number" v-model="item.history.qty"> </u--input>
									</uni-td>
									<uni-td>
										<u--input :disabled="isFinish" type="number" v-model="item.history.q_qty"> </u--input>
									</uni-td>
									<uni-td>
										<u--input :disabled="isFinish" v-model="item.history.bad_desc"> </u--input>
									</uni-td>
									<uni-td>
										<upload :fileList="item.history.imginfo_list" :disabled="isFinish"></upload>
									</uni-td>
									<uni-td>
										<mySelect :disabled="isFinish" :list="check_resList" v-model="item.history.check_resObj"
											type="action"></mySelect>
									</uni-td>
									<uni-td v-if="!isFinish">
										<u-button type="success" :loading="loading" :text="$t('common.保存')" @click="DQASave(item)">
										</u-button>
									</uni-td>
								</uni-tr>
							</uni-tbody>
						</uni-table>
					</div>
				</div>
				<div class="item2">
					<div class="btnList">
						<u-button class="btn" type="success" @click="getHistory(item)" :text="$t('common.查看历史')"></u-button>
						<seeDownFile class="btn" :fileList="item.top_imginfo_list"></seeDownFile>
					</div>
				</div>
			</div>
		</div>
		<!-- <div class="sample" v-if="query.type!='add'&&current==1">
            <uni-card margin="5">
                <div class="myList">
                    <div class="item2">
                        <div class="label">批次数量:</div>
                        <div class="value">
                            <u--input @confirm="getAc" :disabled="isFinish" type="number" v-model="sampleForm.lot_qty"> </u--input>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">检验水平:</div>
                        <div class="value">
                            <mySelect @confirm="getAc" :disabled="isFinish" :list="rankList" labelName="enum_value" valueName="enum_code" v-model="sampleForm.level_code" type="picker"></mySelect>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">AQL级别:</div>
                        <div class="value">
                            <mySelect @confirm="getAc" :disabled="isFinish" :list="AQLList" labelName="enum_value" valueName="enum_code" v-model="sampleForm.level_type" type="picker"></mySelect>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">AC,RE:</div>
                        <div class="value">
                            {{sampleForm.acre}}
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">抽样数量:</div>
                        <div class="value">
                            {{sampleForm.aql_qty}}
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">{{$t('common.合格数量')}}:</div>
                        <div class="value resultTxt suc">
                            {{sampleForm.qty}}
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">不合格数量:</div>
                        <div class="value resultTxt err">
                            {{sampleForm.bad_qty}}
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">合格率:</div>
                        <div class="value">
                            {{sampleForm.qty_percent}}%
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">结果判定:</div>
                        <div class="value resultTxt" :class="sampleForm.result=='0'?'suc':'err'">
                            {{sampleForm.result==0?'pass':'fail'}}
                        </div>
                    </div>
                    <div class="item2">
                        <div class="label">结果备注:</div>
                        <div class="value">
                            <u--textarea v-model="sampleForm.res_remark" :disabled="isFinish"></u--textarea>
                        </div>
                    </div>
                    <div class="item2">
                        <u-button type="success" v-if="!isFinish" :loading="loading" @click="saveSample" text="提交结果"></u-button>
                    </div>
                </div>
            </uni-card>
            <uni-card margin="5">
                <div class="btnList">
                    <u-button type="warning" v-if="!isFinish" :loading="loading" @click="Rqc_taskBase_recall" text="撤销一次"></u-button>
                    <u-button type="success" v-if="!isFinish" :loading="loading" @click="submitPass(0)" text="合格提交"></u-button>
                    <u-button type="error" v-if="!isFinish" :loading="loading" @click="submitPass(1)" text="不合格提交"></u-button>
                </div>
                <div class="table">
                    <uni-table border :loading="loading">
                        <uni-tr>
                            <uni-th width="50">序号</uni-th>
                            <uni-th width="150">检验项目</uni-th>
                            <uni-th>数量</uni-th>
                            <uni-th>拍照</uni-th>
                        </uni-tr>
                        <uni-tbody>
                            <uni-tr v-for='(item,i) in sampleList' :key='i'>
                                <uni-td width="50">
                                    {{i+1}}
                                </uni-td>
                                <uni-td width="150">
                                    {{item.INSPECTION_NAME}}
                                </uni-td>
                                <uni-td>
                                    <u-number-box @change="numberChange($event,item)" integer :disabled="isFinish" :min="item.oldNum" :max="item.oldNum+1" v-model="item.num"></u-number-box>
                                </uni-td>
                                <uni-td>
                                    <upload v-if="item.imginfo_list" @change="item.lock=item.checkeds=1" :fileList="item.imginfo_list" :disabled="isFinish" @deletePic="deletePic"></upload>
                                </uni-td>
                            </uni-tr>
                        </uni-tbody>
                    </uni-table>
                </div>
            </uni-card>
        </div> -->
		<div class="sample" v-if="query.type != 'add' && current == 1">
			<uni-card margin="5">
				<div class="myList">
					<!-- <div class="item">
                        <div class="label">批次数量:</div>
                        <div class="value">
                            <u--input :disabled="isFinish" type="number" v-model="sampleForm.lot_qty"> </u--input>
                        </div>
                    </div> -->
					<div class="item">
						<div class="label">{{ $t('common.目标检验数量') }}:</div>
						<div class="value">
							<u--input :disabled="isFinish" type="number" v-model="sampleForm.lot_qty"> </u--input>
						</div>
					</div>

					<div class="item">
						<div class="label">{{ $t('common.已检验数量') }}:</div>
						<div class="value resultTxt">
							{{ sampleForm.test_qty }}
						</div>
					</div>
					<div class="item">
						<div class="label">{{ $t('common.合格数量') }}:</div>
						<div class="value resultTxt suc">
							{{ sampleForm.qty }}
						</div>
					</div>
					<div class="item">
						<div class="label">{{ $t('common.不合格数量') }}:</div>
						<div class="value resultTxt err">
							{{ sampleForm.bad_qty }}
						</div>
					</div>
					<div class="item">
						<div class="label">RFT:</div>
						<div class="value resultTxt">
							{{ sampleForm.qty_percent }}
						</div>
					</div>
					<div class="item">
						<div class="label">{{ $t('common.问题点总数') }}:</div>
						<div class="value resultTxt">
							{{ sampleForm.commit_remark_qty }}
						</div>
					</div>
					<div class="item2">
						<div class="label">{{ $t('common.判定结果') }}:</div>
						<u-radio-group  v-model="sampleForm.result" placement="row"  @change="groupChange"  >
							<u-radio  label="PASS" name="0" :customStyle="{marginBottom: '8px',width:'50%',}" labelSize="12"></u-radio>
							<u-radio  label="FAIL" name="1" :customStyle="{marginBottom: '8px',width:'40%',}" labelSize="12"></u-radio>
						</u-radio-group>
					</div>
					<div class="item2">
						<div class="label">{{ $t('common.结果备注') }}:</div>
						<div class="value">
							<u--textarea v-model="sampleForm.res_remark" :disabled="isFinish"></u--textarea>
						</div>
					</div>
					<div class="item2">
						<u-button type="success" v-if="!isFinish" :loading="loading" @click="saveSample" :text="$t('common.提交结果')">
						</u-button>
					</div>
				</div>
			</uni-card>
			<uni-card margin="5" :title="$t('common.问题点触发数量Top3')">
				<div class="myList">
					<div class="item2" v-for='(item, i) in sampleForm.top_test' :key='i'>
						<div class="label">Top{{ ++i }}: </div>
						<div class="value">
							{{ item.inspection_name }}
							<span class="resultTxt num">{{ $t('common.数量') }}:{{ item.qty }}</span>
						</div>
					</div>
				</div>
			</uni-card>
			<uni-card margin="5">
				<div class="btnList">
					<u-button type="warning" v-if="!isFinish" :loading="loading" @click="Rqc_taskBase_recall"
						:text="$t('common.撤销一次')"></u-button>
					<u-button type="success" v-if="!isFinish && sampleList.every(e => e.num == e.oldNum)" :loading="loading"
						@click="submitPass(0)" :text="$t('common.合格提交')"></u-button>
					<u-button type="error" v-if="!isFinish && sampleList.some(e => e.num != e.oldNum)" :loading="loading"
						@click="submitPass(1)" :text="$t('common.不合格提交')"></u-button>
				</div>
				<div class="table">
					<uni-table border :loading="loading">
						<uni-tr>
							<uni-th width="50">{{ $t('common.序号') }}</uni-th>
							<uni-th width="150">{{ $t('common.检验项目') }}</uni-th>
							<uni-th>{{ $t('common.数量') }}</uni-th>
							<uni-th>{{ $t('common.拍照') }}</uni-th>
						</uni-tr>
						<uni-tbody>
							<uni-tr v-for='(item, i) in sampleList' :key='i'>
								<uni-td width="50">
									{{ i + 1 }}
								</uni-td>
								<uni-td width="150">
									{{ item.INSPECTION_NAME }}
								</uni-td>
								<uni-td>
									<u-number-box @change="numberChange($event, item)" integer :disabled="isFinish" :min="item.oldNum"
										:max="item.oldNum + 1" v-model="item.num"></u-number-box>
								</uni-td>
								<uni-td>
									<upload v-if="item.imginfo_list" @change="item.lock = item.checkeds = 1" :fileList="item.imginfo_list"
										:disabled="isFinish" @deletePic="deletePic"></upload>
								</uni-td>
							</uni-tr>
						</uni-tbody>
					</uni-table>
				</div>
			</uni-card>
		</div>
		<div class="runCheck" v-if="query.type != 'add' && current == 2">
			<u-button type="success" v-if="!isFinish" :loading="loading" @click="getNewShow = true"
				:text="$t('common.录入机台参数')">
			</u-button>
			<div class="myList u-border" :class="{ noData: item.status == '未录入' }" v-for='(item, i) in runCheckList'
				@click="showRunHistory(item)" :key='i'>
				<div class="item2">
					<div class="label">{{ $t('common.参数项目') }}:</div>
					<div class="value">{{ item.param_item_name }}</div>
				</div>
				<div class="item">
					<div class="label">{{ $t('common.巡检状态') }}:</div>
					<div class="value">{{ item.status }}</div>
				</div>
				<div class="item">
					<div class="label">{{ $t('common.采集次数') }}:</div>
					<div class="value">{{ item.num }}</div>
				</div>
				<div class="item">
					<div class="label">{{ $t('common.SOP标准') }}:</div>
					<div class="value">{{ item.sop_standard }}</div>
				</div>
				<div class="item">
					<div class="label">{{ $t('common.实际数据') }}:</div>
					<div class="value">{{ item.actual_standard }}</div>
				</div>
			</div>
		</div>
		<u-popup :show="historyShow" @close="historyShow = false" :round="10" closeOnClickOverlay>
			<div class="history">
				<div class="talbe">
					<uni-table border :loading="loading">
						<uni-tr>
							<uni-th width="80">{{ $t('common.检验总数') }}</uni-th>
							<uni-th>{{ $t('common.合格数量') }}</uni-th>
							<uni-th>{{ $t('common.不良问题描述') }}</uni-th>
							<uni-th>{{ $t('common.图片') }}</uni-th>
							<uni-th>{{ $t('common.检验结果') }}</uni-th>
						</uni-tr>
						<uni-tbody height="80vh">
							<uni-tr v-for='(item, i) in historyList' :key='i'>
								<uni-td width="80">
									{{ item.qty }}
								</uni-td>
								<uni-td>
									{{ item.q_qty }}
								</uni-td>
								<uni-td>
									{{ item.bad_desc }}
								</uni-td>
								<uni-td>
									<upload :fileList="item.imginfo_list" disabled></upload>
								</uni-td>
								<uni-td>
									{{ item.check_res == 0 ? 'pass' : 'fail' }}
								</uni-td>
							</uni-tr>
						</uni-tbody>
					</uni-table>
				</div>
			</div>
		</u-popup>
		<div class="saveBtn u-border-top">
			<u-button type="success" v-if="query.type == 'add'" :loading="loading" @click="add" :text="$t('common.生成任务')">
			</u-button>
		</div>
		<u-popup :show="runCheckHistoryShow" @close="runCheckHistoryShow = false" :round="10" closeOnClickOverlay>
			<div class="runCheckHistory">
				<div class="myList">
					<div class="item2">
						<div class="label">{{ $t('common.日期') }}</div>
						<div class="value">
							<uni-datetime-picker :start-placeholder="$t('common.开始日期')" :end-placeholder="$t('common.结束日期')"
								@change="dateChange" v-model="runSearchForm.date" type="datetimerange"
								:rangeSeparator="$t('common.至')" />
						</div>
					</div>
					<div class="item2">
						<div class="label">{{ $t('common.机台序列号') }}</div>
						<div class="value">
							<scan @confirm="getRunCheckHistory" @clear="getRunCheckHistory" v-model="runSearchForm.eq_info_no"></scan>
						</div>
					</div>
				</div>
				<div class="talbe">
					<uni-table border :loading="loading">
						<uni-tr>
							<uni-th width="150">{{ $t('common.参数项目名称') }}</uni-th>
							<uni-th>{{ $t('common.机台序列号') }}</uni-th>
							<uni-th>{{ $t('common.采集时间') }}</uni-th>
							<uni-th>{{ $t('common.SOP数据') }}</uni-th>
							<uni-th>{{ $t('common.参数实际数据') }}</uni-th>
							<uni-th>{{ $t('common.图片') }}</uni-th>
						</uni-tr>
						<uni-tbody height="50vh">
							<uni-tr v-for='(item, i) in runCheckHistoryList' :key='i'>
								<uni-td width="150">
									{{ item.param_item_name }}
								</uni-td>
								<uni-td>
									{{ item.eq_info_no }}
								</uni-td>
								<uni-td>
									{{ item.createdate }}
								</uni-td>
								<uni-td>
									{{ item.sop_standard }}
								</uni-td>
								<uni-td>
									{{ item.actual_standard }}
								</uni-td>
								<uni-td>
									<upload :fileList="item.imginfo_list" disabled></upload>
								</uni-td>
							</uni-tr>
						</uni-tbody>
					</uni-table>
				</div>
				<uni-pagination show-icon="true" :total="runSearchForm.total" v-model="runSearchForm.page"
					@change="getRunCheckHistory"></uni-pagination>
			</div>
		</u-popup>
		<u-popup :show="getNewShow" @close="getNewShow = false" :round="10" closeOnClickOverlay>
			<div class="runCheckHistory">
				<div class="myList">
					<div class="item2">
						<div class="label">{{ $t('common.机台序列号') }}</div>
						<div class="value yyds">
							<scan @confirm="getNewList" @clear="getNewList" v-model="getNewForm.eq_no"></scan>
							<u-button v-show="NewList.length" type="success" :loading="loading" @click="saveNew"
								:text="$t('common.保存')"></u-button>
						</div>
					</div>
				</div>
				<div class="talbe" v-show="NewList.length">
					<uni-table border :loading="loading">
						<uni-tr>
							<uni-th width="130">{{ $t('common.参数项目名称') }}</uni-th>
							<uni-th width="400">{{ $t('common.SOP标准') }}</uni-th>
							<uni-th width="100">{{ $t('common.是否使用时间控件') }}</uni-th>
							<uni-th width="150">{{ $t('common.实际数据') }}</uni-th>
							<uni-th>{{ $t('common.图片') }}</uni-th>
						</uni-tr>
						<uni-tbody height="50vh">
							<uni-tr v-for='(item, i) in NewList' :key='i'>
								<uni-td width="130">
									{{ item.param_item_name }}
								</uni-td>
								<uni-td width="400">
									<div class="inputList">
										<u-input v-model="item.sop_standard" @click.native="item.isTime && (item.show1 = !item.show1)"
											v-if="item.isTime" :readonly="item.isTime"> </u-input>
										<u-input v-model="item.sop_standard" @click.native="item.isTime && (item.show1 = !item.show1)"
											v-else type="number" :readonly="item.isTime"> </u-input>
										<div class="line">
											—
										</div>
										<u-input v-model="item.sop_standard2" @click.native="item.isTime && (item.show2 = !item.show2)"
											v-if="item.isTime" :readonly="item.isTime"> </u-input>
										<u-input v-model="item.sop_standard2" @click.native="item.isTime && (item.show2 = !item.show2)"
											v-else type="number" :readonly="item.isTime"> </u-input>
									</div>
								</uni-td>
								<uni-td width="100">
									<div class="inputList">
										<!-- <u-datetime-picker :confirmText="$t('common.确认')" :cancelText="$t('common.取消')"
											@cancel="item.show1 = false" @confirm="timeConfirm($event, item, 'sop_standard', 'show1')"
											:show="item.show1" v-model="item.sop_standard" mode="time"></u-datetime-picker>
										<u-switch v-model="item.isTime"></u-switch>
										<u-datetime-picker :confirmText="$t('common.确认')" :cancelText="$t('common.取消')"
											@cancel="item.show2 = false" @confirm="timeConfirm($event, item, 'sop_standard2', 'show2')"
											:show="item.show2" v-model="item.sop_standard2" mode="time"></u-datetime-picker> -->
										<mx-date-picker :show="item.show1" :type="type" :show-seconds="true" :value="[0, 0, 0]"
											@confirm="timeConfirm($event, item, 'sop_standard1', 'show1')" @cancel="item.show1 = false" />
										<u-switch v-model="item.isTime"></u-switch>
										<mx-date-picker :show="item.show2" :type="type" :show-seconds="true" :value="[0, 0, 0]"
											@confirm="timeConfirm($event, item, 'sop_standard2', 'show2')" @cancel="item.show2 = false" />
										<mx-date-picker :show="item.show3" :type="type" :show-seconds="true"
											@confirm="timeConfirm($event, item, 'sop_standard3', 'show3')" @cancel="item.show3 = false"
											:value="[0, 0, 0]" />
									</div>
								</uni-td>
								<uni-td width="150">
									<!-- <u-input v-model="item.actual_standard" clearable> </u-input> -->
									<u-input v-model="item.actual_standard" @click.native="item.isTime && (item.show3 = !item.show3)"
										v-if="item.isTime" :readonly="item.isTime"> </u-input>
									<u-input v-model="item.actual_standard" @click.native="item.isTime && (item.show3 = !item.show3)"
										v-else type="number" :readonly="item.isTime"> </u-input>
								</uni-td>
								<uni-td>
									<upload :fileList="item.imginfo_list"></upload>
								</uni-td>
							</uni-tr>
						</uni-tbody>
					</uni-table>
				</div>
				<!-- <uni-pagination v-show="NewList.length"  show-icon="true" :total="runSearchForm.total" v-model="runSearchForm.page" @change="getRunCheckHistory"></uni-pagination> -->
			</div>
		</u-popup>
	</div>
</template>
<script>
import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
export default {
	components: {
		MxDatePicker
	},
	name: 'RQCDetail',
	data() {
		return {
			showPicker: false,
			type: 'time',
			value: '',
			start: ["00", '00', "00"],

			loading: false,
			Show: false,
			historyShow: false,
			runCheckHistoryShow: false,
			isFinish: false,
			getNewShow: false,
			downShow: false,
			subsection: ['DQA/MQA', this.$t('common.数据录入'),],
			current: 0,
			query: {},
			headFrom: {
				check_type: {
					label: this.$t('common.抽检'),
					value: '0',
				},
				POForm: {
					"se_id": "",
					"mer_po": "",
					"workorder_no": "",
					"prod_no": "",
					"shoe_no": "",
					"name_t": "",
					"develop_season": ""
				},
				workshop_section: {
					workshop_section_name: '',
					workshop_section_no: '',
				},
				workmanship: {
					workmanship_name: '',
					workmanship_code: '',
				},
				department: {
					department: '',
				},
				production_line_code: '',
				eq_info_no: '',
				config_no: '',
				mold_no: '',
				ex_task_no: '',
				suppliers: {
					label: '',
					value: '',
				}
			},
			sampleForm: {
				"lot_qty": "",//目标检验数量
				"level_code": {
					enum_value: '',
					enum_code: '',
				},
				"level_type": {
					enum_value: '',
					enum_code: '',
				},
				"aql_qty": 0,
				"acre": "",
				"qty": 0,
				"bad_qty": 0,
				"result": "",
				"res_remark": "",//备注
				"test_qty": "",//已检验数量
				"qty": 0,//合格数量
				"bad_qty": 0,//不合格数量
				"qty_percent": "",//RFT数量
				"commit_remark_qty": "",//问题点数量
				"result":"",
			},
			getNewForm: {
				eq_no: '',
			},
			check_typeList: [
				{
					label: this.$t('common.抽检'),
					value: '0',
				},
				{
					label: this.$t('common.巡检'),
					value: '1',
				},

			],
			check_resList: [
				{
					label: 'pass',
					value: '0',
				},
				{
					label: 'fail',
					value: '1',
				},

			],
			workshop_sectionList: [],
			departmentList: [],
			DQAList: [],
			historyList: [],
			rankList: [],
			AQLList: [],
			sampleList: [],
			NewList: [],
			runCheckList: [],
			downList: [],
			runCheckHistoryList: [],
			runSearchForm: {
				param_item_no: '',
				eq_info_no: '',
				date: [],
				page: 1,
				pageRow: 10,
				total: 0,
			}
		}
	},
	computed: {

	},
	methods: {
		groupChange(n){
			console.log('groupChange', n);
		},
		onShowDatePicker(type) {//显示
			this.type = type;
			this.showPicker = true;
			console.log(type, this.value, '00000')
		},
		onSelected(e) {//选择
			this.showPicker = false;
			console.log(e)
			if (e) {
				this.value = e.value;
				//选择的值
				console.log('value => ' + e.value);
				//原始的Date对象
				console.log('date => ' + e.date);
			}
		},

		asyncChange(e) {
			let _this = this
            if (this.isFinish) return uni.$u.toast(this.$t('common.不允许取消结案'))
			if (!this.sampleForm.lot_qty) return uni.$u.toast(this.$t('common.请填入目标检验双数'))
		    if (this.sampleForm.test_qty != this.sampleForm.lot_qty) return uni.$u.toast(this.$t('common.已检验数量必须要大于或等于目标检验数量'))
			uni.showModal({
				confirmText: this.$t('common.确定'),
				cancelText: this.$t('common.取消'),
				content: e ? this.$t('common.是否结束检验') : this.$t('common.是否要取消结束检验'),
				success: (res) => {
					if (res.confirm) {
						_this.finish(e)
                        if(_this.headFrom.workshop_section.workshop_section_name == 'Assembly')
												{
													//Synchronize data to pivot88 (need to wait for the function to be officially launched before updating)
													_this.transferData()
												}
					}
				}
			})
		},
		Rqc_taskBase_getworkshop_list() {
			let data = {
				"shoe_no": this.headFrom.POForm.shoe_no
			}
			this.$apis.Rqc_taskBase_getworkshop_list(data).then((res) => {
				console.log(data, res, 'RQC根据鞋型带回工段工艺')
				this.workshop_sectionList = res.RetData1
				this.headFrom.workshop_section = this.workshop_sectionList[0]
				this.headFrom.workmanship = this.headFrom.workshop_section.bottom[0]
			}).catch((err) => {
				console.error(err);
			})
		},
		confirmPo() {
			this.headFrom.POForm.imgs = [
				{
					url: this.headFrom.POForm.file_url,
					guid: '',
				}
			]
			this.Rqc_taskBase_getworkshop_list()
			this.$nextTick(() => {
				this.$refs.Collapse.init()
			})
		},
		confirmWorkshop_section() {
			this.headFrom.workmanship = this.headFrom.workshop_section.bottom[0]
		},
		Rqc_taskBase_production_branch_list() {
			let data = {
				"value": "",//没值带全部，有值带查询
				production_line_code: this.headFrom.production_line_code
			}
			this.$apis.Rqc_taskBase_production_branch_list(data).then((res) => {
				console.log(data, res, 'RQC获取部门列表')
				if (!res.RetData1.length) throw '查无数据'
				this.departmentList = res.RetData1
				this.headFrom.department = this.departmentList[0]
			}).catch((err) => {
				uni.$u.toast(err)
				console.error(err);
			})
		},
		add() {
			//表单验证
			if (!this.headFrom.POForm.mer_po) return uni.$u.toast(this.$t('common.请填入PO'))
			if (!this.headFrom.production_line_code) return uni.$u.toast(this.$t('common.请填写组别'))
			if (!this.headFrom.department.department) return uni.$u.toast(this.$t('common.请选择部门'))
			this.loading = true
			debugger
			let data = { 
				"check_type": this.headFrom.check_type.value,
				"workshop_section_no": this.headFrom.workshop_section.workshop_section_no,
				"develop_season": this.headFrom.POForm.develop_season,
				"shoe_no": this.headFrom.POForm.shoe_no,
				"prod_no": this.headFrom.POForm.prod_no,
				"mer_po": this.headFrom.POForm.mer_po,
				"se_id": this.headFrom.POForm.se_id,  //Added for POChange Project
				"production_line_code": this.headFrom.production_line_code,
				// "se_id": this.headFrom.se_id,
				"eq_info_no": this.headFrom.eq_info_no,
				"workorder_no": this.headFrom.POForm.workorder_no,
				"department": this.headFrom.department.department,
				"ex_task_no": this.headFrom.ex_task_no,
				"config_no": this.headFrom.workmanship.config_no,
				"mold_no": this.headFrom.mold_no,
				"suppliers_code": this.headFrom.suppliers.value,
				"suppliers_name": this.headFrom.suppliers.label
			}
			this.$apis.Rqc_taskBase_Main_Insert(data).then((res) => {
				console.log(data, res, 'RQC生产任务')
				uni.$u.toast(this.$t('common.生成任务成功'))
				let task_no = res.RetData1
				setTimeout(() => {
					console.log(task_no);
					uni.redirectTo({ url: `/pages/RQC/RQCDetail?type=edit&task_no=${task_no}` })
				}, 1000);

			}).catch((err) => {
				console.error(err);
				this.loading = false
			}).finally(() => {
			})
		},
		bindEx_task_no() {
			if (this.query.type == 'add') return
			if (!this.headFrom.ex_task_no) return uni.$u.toast(this.$t('common.请输入实验室编号'))
			let data = {
				"task_no": this.query.task_no,
				"ex_task_no": this.headFrom.ex_task_no,
			}
			this.$apis.Rqc_taskBase_ex_taskadd(data).then((res) => {
				console.log(data, res, '绑定实验室样品编号')
				uni.$u.toast(this.$t('common.绑定实验室编号成功'))
			}).catch((err) => {
				console.error(err);
			})
		},
		Rqc_taskBase_Main_task_no_list() {
			let data = {
				"task_no": this.query.task_no
			}
			this.$apis.Rqc_taskBase_Main_task_no_list(data).then((res) => {
				console.log(data, res, 'RQC获取任务详情')
				let RetData = res.RetData1[0]
				this.headFrom.ex_task_no = RetData.ex_task_no
				this.headFrom.check_type.label = RetData.check_type == 0 ? this.$t('common.抽检') : this.$t('common.巡检')//0000000
				this.headFrom.check_type.value = RetData.check_type
				this.headFrom.POForm.mer_po = RetData.mer_po
				this.headFrom.POForm.develop_season = RetData.develop_season
				this.headFrom.POForm.name_t = RetData.name_t
				this.headFrom.POForm.prod_no = RetData.prod_no
				this.headFrom.POForm.shoe_no = RetData.shoe_no
				this.headFrom.POForm.se_id = RetData.se_id
				this.headFrom.POForm.workorder_no = RetData.workorder_no
				this.headFrom.workshop_section.workshop_section_name = RetData.workshop_section_name
				this.headFrom.workshop_section.workshop_section_no = RetData.workshop_section_no
				this.headFrom.workmanship.workmanship_code = RetData.workmanship_code
				this.headFrom.workmanship.workmanship_name = RetData.workmanship_name
				this.headFrom.eq_info_no = RetData.eq_info_no
				this.headFrom.config_no = RetData.config_no
				this.headFrom.mold_no = RetData.mold_no
				this.headFrom.production_line_code = RetData.production_line_code
				this.headFrom.department.department = RetData.department
				// this.headFrom.suppliers.value = RetData.suppliers_code
				// this.headFrom.suppliers.label = RetData.suppliers_name
				this.$set(this.headFrom.suppliers, "label", RetData.suppliers_name)
				this.$set(this.headFrom.suppliers, "value", RetData.suppliers_code)
				console.log(this.headFrom.suppliers.value, "headFrom.suppliers.value")
				this.headFrom.POForm.imgs = [
					{
						url: RetData.file_url,
						guid: '',
					}
				]
				this.headFrom.POForm.user_section = RetData.user_section
				this.headFrom.POForm.style_seq = RetData.style_seq
				this.headFrom.POForm.user_in_shoecharge = RetData.user_in_shoecharge
				this.headFrom.POForm.user_technical = RetData.user_technical
				this.headFrom.POForm.develop_type = RetData.develop_type
				this.headFrom.POForm.qa_principal = RetData.qa_principal
				this.subsection = this.headFrom.check_type.value == 0 ? ['DQA/MQA', this.$t('common.抽检数据录入'), this.$t('common.巡检数据录入')] : ['DQA/MQA', this.$t('common.抽检数据录入'), this.$t('common.巡检数据录入')]
				this.sampleForm.lot_qty = RetData.lot_qty

				this.sampleForm.aql_qty = RetData.aql_qty
				this.sampleForm.acre = RetData.acre

				this.sampleForm.res_remark = RetData.res_remark
				this.sampleForm.result = RetData.result
				this.$nextTick(() => {
					this.$refs.Collapse.init()
				})
				this.Rqc_taskBase_getdiv_list()

				this.sampleForm.level_code.enum_code = RetData.level_code || 2
				this.sampleForm.level_code.enum_value = this.rankList.find(e => e.enum_code == this.sampleForm.level_code.enum_code).enum_value
				this.sampleForm.level_type.enum_code = RetData.level_type || 13
				this.sampleForm.level_type.enum_value = this.AQLList.find(e => e.enum_code == this.sampleForm.level_type.enum_code).enum_value
				// this.getAc(true)
			}).catch((err) => {
				console.error(err);

			})
		},
		Rqc_taskBase_getdiv_list() {
			let data = {
				"shoe_no": this.headFrom.POForm.shoe_no,
				"task_no": this.query.task_no,
				"workshop_section_no": this.headFrom.workshop_section.workshop_section_no
			}
			this.$apis.Rqc_taskBase_getdiv_list(data).then((res) => {
				console.log(data, res, 'RQC获取盒子详情')
				this.DQAList = res.RetData1
				this.DQAList.forEach((e, i) => {
					e.imgs = [
						{
							url: e.file_url,
							guid: '',
						}
					]
					e.history = e.history[0] || {}
					e.history.imginfo_list = e.history.imginfo_list || []
					e.history.check_resObj = {
						label: e.history.check_res == 1 ? 'fail' : 'pass',
						value: e.history.check_res || 0,
					}
				})
			}).catch((err) => {
				console.error(err);
			})
		},
		Rqc_taskBase_jyxm_list() {//获取抽检
			let data = {
				"task_no": this.query.task_no
			}
			this.$apis.Rqc_taskBase_jyxm_list(data).then((res) => {
				console.log(data, res, 'RQC获取抽检项目数据')
				this.sampleList = res.RetData1.rqc_task_detail_t
				let { center_list, top_test } = res.RetData1
				center_list = center_list[0]
				this.sampleForm.qty = center_list.qty
				this.sampleForm.bad_qty = center_list.bad_qty
				this.sampleForm.qty_percent = center_list.qty_percent
				this.sampleForm.test_qty = center_list.test_qty
				this.sampleForm.commit_remark_qty = center_list.commit_remark_qty
				this.sampleForm.top_test = top_test
				this.sampleForm.result = center_list.result


				this.sampleList.forEach((e, i) => {
					e.oldNum = e.num || 0
					e.checkeds = 0
					e.imginfo_list = e.imginfo_list || []
				})
				this.getResult()
			}).catch((err) => {
				console.error(err);
			}).finally(() => {
				this.loading = false
			})
		},
		DQASave(item) {
			this.loading = true
			let data = {
				"task_no": this.query.task_no,
				"union_id": item.id,
				"source_type": item.source,
				"qty": item.history.qty,
				"q_qty": item.history.q_qty,
				"bad_desc": item.history.bad_desc,
				"check_res": item.history.check_resObj.value,
				"imginfo_list": item.history.imginfo_list || []
			}
			this.$apis.Rqc_taskBase_Main_Insert2(data).then((res) => {
				console.log(data, res, 'RQC保存卡片')
				uni.$u.toast(this.$t('common.保存成功'))
			}).catch((err) => {
				console.error(err);
			}).finally(() => {
				this.loading = false
			})
		},
		getHistory(item) {
			let data = {
				"id": item.id,
				"source_type": item.source,
				"task_no": this.query.task_no
			}
			this.$apis.Rqc_taskBasediv_mx(data).then((res) => {
				console.log(data, res, '卡片表头之盒子录入的最近信息')
				this.historyList = res.RetData1
				this.historyShow = true
			}).catch((err) => {
				console.error(err);
			})
		},
		finish(isFinish) {
			this.loading = true
			let data = {
				"task_no": this.query.task_no,
				isFinish,
			}
			this.$apis.over_inspection(data).then((res) => {
				console.log(data, res, 'RQC切换检验任务状态')
				uni.$u.toast(this.$t('common.切换成功'))
				this.isFinish = isFinish
				setTimeout(() => {
					uni.redirectTo({ url: `/pages/RQC/RQCDetail?type=${isFinish ? 'see' : 'edit'}&task_no=${this.query.task_no}` })
				}, 1000);
			}).catch((err) => {
				console.error(err);
				this.loading = false
			})

		},
		
	transferData() {
					this.loading = true
					let data = {
						"task_no": this.query.task_no,
						"po":this.headFrom.POForm.mer_po,
						"test_qty":this.sampleForm.test_qty,//已检验数量
						"group":this.headFrom.production_line_code,
						"rqc_task_detail_t": this.sampleList,
						"commit_remark_qty":this.sampleForm.commit_remark_qty 
					}
					this.$apis.TransferDataToPivot88(data).then((res) => {
						uni.$u.toast(this.$t('common.同步Pivot88成功'))
					}).catch((err) => {
						console.error(err);
						this.loading = false
					})
				
				},
		GetAQLEnum() {
			this.$apis.GetAQLEnum().then((res) => {
				console.log(res, '获取AQL和检验水平下拉列表')
				this.rankList = res.RetData.AQL_Level
				this.AQLList = res.RetData.AQL_Rank
				this.Rqc_taskBase_Main_task_no_list()
			}).catch((err) => {
				console.error(err);
			})
		},
		getAc(isFirst) {
			if (this.headFrom.check_type.value == 1) return
			if (!this.sampleForm.lot_qty) return !isFirst ? uni.$u.toast(this.$t('common.请先输入批次数量')) : ''
			this.$apis.GetAQLAcRe({
				"level_code": this.sampleForm.level_code.enum_code,
				"rank_code": this.sampleForm.level_type.enum_code,
				"qty": this.sampleForm.lot_qty
			}).then((res) => {
				console.log(res, '获取ac值')
				this.sampleForm.aql_qty = res.RetData1.sample_qty
				this.sampleForm.acre = res.RetData1.ac_re
				this.sampleForm.ac = res.RetData1.ac
				this.sampleForm.re = res.RetData1.re
				this.getResult()
			}).catch((err) => {
			})
		},
		getResult() {
			this.sampleForm.result = Number(this.sampleForm.bad_qty) >= Number(this.sampleForm.re) ? '1' : '0'
		},
		saveSample() {
			//验证 
			if (!this.sampleForm.lot_qty) return uni.$u.toast(this.$t('common.请先输入批次数量'))
			// if (!this.sampleForm.aql_qty) return uni.$u.toast('请先获取抽检数量')
			this.loading = true
			let data = {
				"task_no": this.query.task_no,
				"lot_qty": this.sampleForm.lot_qty,
				// "level_code": this.sampleForm.level_code.enum_code,
				// "level_type": this.sampleForm.level_type.enum_code,
				// "aql_qty": this.sampleForm.aql_qty,
				// "acre": this.sampleForm.acre,
				// "qty": this.sampleForm.qty || 0,
				// "bad_qty": this.sampleForm.bad_qty || 0,
				// "qty_percent": this.sampleForm.qty_percent || 0,
				"res_remark": this.sampleForm.res_remark,
				"result": this.sampleForm.result
			}
			this.$apis.Rqc_taskBase_Main_Insert_mx(data).then((res) => {
				console.log(data, res, 'RQC保存抽检数据')
				uni.$u.toast(this.$t('common.保存成功'))
			}).catch((err) => {
				console.error(err);
			}).finally(() => {
				this.loading = false
			})
		},
		submitPass(commit_type) {
			this.loading = true
			let data = {
				"task_no": this.query.task_no,
				commit_type,
				"rqc_task_detail_t": this.sampleList
			}
			this.$apis.Rqc_taskBase_jyxm_Add(data).then((res) => {
				console.log(data, res, '合格提交' + commit_type)
				// this.lastSubmit = commit_type
				// commit_type == 0 ? this.sampleForm.qty = this.sampleForm.qty + 1 : this.sampleForm.bad_qty = this.sampleForm.bad_qty + 1
				uni.$u.toast(this.$t('common.提交成功'))
				this.Rqc_taskBase_jyxm_list()
			}).catch((err) => {
				console.error(err);
				this.loading = false
			})
		},
		numberChange(event, item) {
			console.log(event, item);
			if (item.lock) return //改变了图片锁死
			item.checkeds = item.CHECKEDS = event.value == item.oldNum ? 0 : 1
		},
		Rqc_taskBase_recall() {
			this.loading = true
			let data = {
				"task_no": this.query.task_no
			}
			this.$apis.Rqc_taskBase_recall(data).then((res) => {
				console.log(data, res, '撤销一次')
				uni.$u.toast(this.$t('common.撤销成功'))
				this.Rqc_taskBase_jyxm_list()
			}).catch((err) => {
				console.error(err);
			}).finally(() => {
				this.loading = false
			})
		},
		GetWorkshop_SectIon() {
			let data = {
				"task_no": this.query.task_no
			}
			this.$apis.GetWorkshop_SectIon(data).then((res) => {
				this.runCheckList = res.RetData1
			}).catch((err) => {
				console.error(err);
			})
		},
		getRunCheckHistory() {
			console.log(this.runSearchForm.date);
			let data = {
				"task_no": this.query.task_no,
				"eq_info_no": this.runSearchForm.eq_info_no,
				"putin_date": this.runSearchForm.date[0] || '',
				"end_date": this.runSearchForm.date[1] || '',
				"param_item_no": this.runSearchForm.param_item_no,
				"page": this.runSearchForm.page,
				"pageRow": this.runSearchForm.pageRow
			}
			this.$apis.Rqc_taskBase_xxview(data).then((res) => {
				console.log(data, res, 'RQC获取巡检历史记录')
				res.RetData1 = res.RetData1 || res.RetData
				this.runCheckHistoryList = res.RetData1.Data
				this.runSearchForm.total = +res.RetData1.total

			}).catch((err) => {
				console.error(err);
			})
		},
		showRunHistory(item) {
			this.runSearchForm.eq_info_no = item.eq_info_no || ''
			this.runSearchForm.param_item_no = item.param_item_no || ''
			this.runCheckHistoryShow = true
			this.getRunCheckHistory()
		},
		dateChange() {
			setTimeout(() => {
				this.getRunCheckHistory()
			}, 0);
		},
		getNewList() {
			let data = {
				"eq_no": this.getNewForm.eq_no,
				"task_no": this.query.task_no
			}
			this.$apis.GetWorkshop_Sect(data).then((res) => {
				console.log(data, res, 'RQC获取机台数据')
				res.RetData1 = res.RetData1 || res.RetData
				this.NewList = res.RetData1
				if (!this.NewList.length && this.getNewForm.eq_no) return uni.$u.toast(this.$t('common.查无数据'))
				this.NewList.forEach((e, i) => {
					e.imginfo_list = e.imginfo_list || []
					e.sop_standard2 = ""
					this.$set(e, 'isTime', false)
					this.$set(e, 'show1', false)
					this.$set(e, 'show2', false)
					this.$set(e, 'show3', false)
				})

			}).catch((err) => {
				console.error(err);
			})
		},
		saveNew() {
			if (!this.getNewForm.eq_no) return uni.$u.toast(this.$t('common.请先输入机台序列号'))
			this.NewList.forEach((e, i) => {
				if (e.sop_standard == undefined) e.sop_standard = ""
				if (e.sop_standard2 == undefined) e.sop_standard2 = ""
				e.sop_standard = e.sop_standard + ' - ' + e.sop_standard2
			})
			let data = {
				list: this.NewList || [],
				task_no: this.query.task_no,
				eq_info_no: this.getNewForm.eq_no,
			}
			this.$apis.Rqc_taskBase_xxadd(data).then((res) => {
				console.log(data, res, '保存机台数据')
				uni.$u.toast(this.$t('common.保存成功'))
				this.getNewShow = false
				this.GetWorkshop_SectIon()
			}).catch((err) => {
				console.error(err);
			}).finally(() => {
				this.NewList = []
			})
		},
		deletePic(event) {
			console.log(event);
			let data = {
				"guid": event.file.guid
			}
			this.$apis.Rqc_taskBase_deleteguid(data).then((res) => {
				uni.$u.toast(this.$t('common.删除成功'))
			}).catch((err) => {
				uni.$u.toast(err || '删除失败')
				console.error(err);
			})
		},
		timeConfirm(time, item, data, show) {
			console.log(time, item, data, show)
			item[data] = time.value
			if (time.value == '00:aN') {
				this.$nextTick(() => {
					item[data] = "00:00"
				})
			}
			if (show == "show1") {
				item.sop_standard = time.value
			}
			if (show == "show2") {
				item.sop_standard2 = time.value
			}
			if (show == "show3") {
				item.actual_standard = time.value
			}
			item[show] = false
		}
	},
	onShow() {
	},
	onLoad(query) {
		this.query = query
		this.isFinish = this.query.type == 'see'
		if (this.query.type == 'edit' || this.query.type == 'see') {
			this.GetAQLEnum()
			this.Rqc_taskBase_jyxm_list()
			this.GetWorkshop_SectIon()
		}
	}
}
</script>
<style lang='scss' scoped>
.RQCDetail {
	// padding: 15rpx;
	padding-bottom: 100rpx;

	/deep/ .u-collapse {
		background: #fff;
	}

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

	.myList {
		.label {
			width: 120rpx;
		}

		.value {
			.num {
				margin-left: 5px;
			}
		}
	}

	.saveBtn {
		position: fixed;
		z-index: 5;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.DQA,
	.history {
		padding: 15rpx;

		.myList {
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

	.sample {
		.btnList {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 1;
			display: flex;
			width: 100%;

			// margin: 15rpx;
			.u-button {
				margin: 5px;
			}
		}
	}

	.runCheck {
		padding: 15rpx;

		.myList {
			background: #abec53;
			margin: 15rpx 0;
			padding: 15rpx;
			color: #000;
			border-radius: 10rpx;

			.value {
				color: #000;
			}
		}

		.noData {
			background: #ec7453;
		}
	}

	.runCheckHistory {
		padding: 15rpx;

		.yyds {
			display: flex;

			.u-button {
				margin-left: 5rpx;
				width: 30%;
			}
		}

		.inputList {
			display: flex;
			align-items: center;
			justify-content: space-around;

			// .u-input {
			//     width: 100px;
			// }
			.line {
				margin: 5rpx;
			}
		}
	}

	.resultTxt {
		font-size: 18px;
		font-weight: 600;
	}
}

// /deep/.picker-time[data-v-16c42f82]{
// 	width:300px !important;
// }
// /deep/.picker-modal[data-v-16c42f82]{
// 	top:60%;
// 	left: 20% !important;
// }
/deep/.uni-picker-view-indicator {
	line-height: 38px;
	height: 38px;
}

/deep/.picker-modal-time[data-v-16c42f82] {
	line-height: 38px;
}
</style>