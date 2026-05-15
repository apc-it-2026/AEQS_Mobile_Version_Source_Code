import api from './api'
let myRequest = api.myRequest
export default {
    GetPainted_Skin_Main_PDA(data = {}) {
        let remark = "//获取画皮数据列表"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_BDMAPI.BDM_Painted_Skin",
            DllName: "SJ_BDMAPI",
            Method: "GetPainted_Skin_Main_PDA",
            Data: data,
        })
    },

    GetOrg(data = {}) {
        let remark = "//获取套号列表"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_SYSAPI.SYS",
            DllName: "SJ_SYSAPI",
            Method: "GetOrg",
            Data: data,
            needParse: true,
            hiddenToken: true,
        })
    },
    Login(data = {}) {
        let remark = "//登录"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_SYSAPI.User",
            DllName: "SJ_SYSAPI",
            Method: "Login",
            Data: data,
            needParse: true,
            hiddenToken: true,
        })
    },
    GetPainted_Skin_Insert_item_PDA(data = {}) {
        let remark = "//获取料号列表"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_BDMAPI.BDM_Painted_Skin",
            DllName: "SJ_BDMAPI",
            Method: "GetPainted_Skin_Insert_item_PDA",
            Data: data,
        })
    },

    InsertPainted_Skin_Insert_PDA(data = {}) {
        let remark = "//新增画皮"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_BDMAPI.BDM_Painted_Skin",
            DllName: "SJ_BDMAPI",
            Method: "InsertPainted_Skin_Insert_PDA",
            Data: data,
        })
    },

    GetPainted_Skin_Main_Delete_PDA(data = {}) {
        let remark = "//删除画皮任务"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_BDMAPI.BDM_Painted_Skin",
            DllName: "SJ_BDMAPI",
            Method: "GetPainted_Skin_Main_Delete_PDA",
            Data: data,
        })
    },

    Painted_Skin_Edit_Delete_PDA(data = {}) {
        let remark = "//删除画皮记录"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_BDMAPI.BDM_Painted_Skin",
            DllName: "SJ_BDMAPI",
            Method: "Painted_Skin_Edit_Delete_PDA",
            Data: data,
        })
    },

    GetPainted_Skin_Edit_HZ_PDA(data = {}) {
        let remark = "//获取个人画皮汇总"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_BDMAPI.BDM_Painted_Skin",
            DllName: "SJ_BDMAPI",
            Method: "GetPainted_Skin_Edit_HZ_PDA",
            Data: data,
        })
    },

    GetPainted_Skin_Edit_JL_PDA(data = {}) {
        let remark = "//获取个人画皮记录"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_BDMAPI.BDM_Painted_Skin",
            DllName: "SJ_BDMAPI",
            Method: "GetPainted_Skin_Edit_JL_PDA",
            Data: data,
        })
    },

    Painted_Skin_Edit_Insert_PDA(data = {}) {
        let remark = "//新增个人画皮记录"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_BDMAPI.BDM_Painted_Skin",
            DllName: "SJ_BDMAPI",
            Method: "Painted_Skin_Edit_Insert_PDA",
            Data: data,
        })
    },

    GetPainted_Skin_List_task_d_PDA(data = {}) {
        let remark = "//获取画皮记录"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_BDMAPI.BDM_Painted_Skin",
            DllName: "SJ_BDMAPI",
            Method: "GetPainted_Skin_List_task_d_PDA",
            Data: data,
        })
    },

    GetPainted_Skin_List_HZ_PDA(data = {}) {
        let remark = "//获取画皮汇总"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_BDMAPI.BDM_Painted_Skin",
            DllName: "SJ_BDMAPI",
            Method: "GetPainted_Skin_List_HZ_PDA",
            Data: data,
        })
    },

    Painted_Skin_List_Complete_PDA(data = {}) {
        let remark = "//完成画皮"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_BDMAPI.BDM_Painted_Skin",
            DllName: "SJ_BDMAPI",
            Method: "Painted_Skin_List_Complete_PDA",
            Data: data,
        })
    },

    GetPainted_Skin_Report_task_d_PDA(data = {}) {
        let remark = "//获取报告信息"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_BDMAPI.BDM_Painted_Skin",
            DllName: "SJ_BDMAPI",
            Method: "GetPainted_Skin_Report_task_d_PDA",
            Data: data,
            notTra: true,
        })
    },

    Painted_Skin_Report_Edit_PDA(data = {}) {
        let remark = "//保存报告"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_BDMAPI.BDM_Painted_Skin",
            DllName: "SJ_BDMAPI",
            Method: "Painted_Skin_Report_Edit_PDA",
            Data: data,
        })
    },

    CheckResultPDAYCLViewA(data = {}) {
        let remark = "//获取原材料列表"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJeMES_IQC.VMaterialinventory",
            DllName: "SJeMES_IQC",
            Method: "CheckResultPDAYCLViewA",
            Data: data,
        })
    },

    CheckResultPDAYCLViewB(data = {}) {
        let remark = "//获取原材料详情数据"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJeMES_IQC.VMaterialinventory",
            DllName: "SJeMES_IQC",
            Method: "CheckResultPDAYCLViewB",
            Data: data,
        })
    },

    GetAQLEnum(data = {}) {
        let remark = "//获取原材料下拉列表"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJeMES_IQC.VMaterialinventory",
            DllName: "SJeMES_IQC",
            Method: "GetAQLEnum",
            Data: data,

            needParse: true,
        })
    },

    GetAQLAcRe(data = {}) {
        let remark = "//获取ACRE"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJeMES_IQC.VMaterialinventory",
            DllName: "SJeMES_IQC",
            Method: "GetAQLAcRe",
            Data: data,
        })
    },

    CheckResultPDAYCLAdd(data = {}) {
        let remark = "//保存原材料数据"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJeMES_IQC.VMaterialinventory",
            DllName: "SJeMES_IQC",
            Method: "CheckResultPDAYCLAdd",
            Data: data,
        })
    },
    getProduction_lineList2(data = {}) {
        let remark = "//获取产线列表"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_BDMAPI.BDM_Needlemanagement",
            Method: "getProduction_lineList2",
            Data: data,
        })
    },
    getProduction_lineList3(data = {}) {
        let remark = "//获取产线列表"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_BDMAPI.BDM_Needlemanagement",
            Method: "getProduction_lineList3",
            Data: data,
        })
    },

    CheckResultPDAYCLViewUser(data = {}) {
        let remark = "//获取检验员信息"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJeMES_IQC.VMaterialinventory",
            DllName: "SJeMES_IQC",
            Method: "CheckResultPDAYCLViewUser",
            Data: data,
        })
    },

    CheckResultBadproblems(data = {}) {
        let remark = "//获取不良列表"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJeMES_IQC.VMaterialinventory",
            DllName: "SJeMES_IQC",
            Method: "CheckResultBadproblems",
            Data: data,
        })
    },

    GetInspectionOrder(data = {}) {
        let remark = "//获取实验室结果检验项列表"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_QCMAPI.Examine",
            DllName: "SJ_QCMAPI",
            Method: "GetInspectionOrder",
            Data: data,
        })
    },

    GetTestItemDetailsData(data = {}) {
        let remark = "//获取检验项详情"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_QCMAPI.Examine",
            DllName: "SJ_QCMAPI",
            Method: "GetTestItemDetailsData",
            Data: data,
        })
    },

    GetEquipmentData(data = {}) {
        let remark = "//获取设备列表"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_QCMAPI.BASE",
            DllName: "SJ_QCMAPI",
            Method: "GetEquipmentData",
            Data: data,
        })
    },

    CalculationFormula(data = {}) {
        let remark = "//计算实验室检验项结果"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_QCMAPI.Examine",
            DllName: "SJ_QCMAPI",
            Method: "CalculationFormula",
            Data: data,
        })
    },

    SubimitInspectionData(data = {}) {
        let remark = "//提交实验室检验结果"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_QCMAPI.Examine",
            DllName: "SJ_QCMAPI",
            Method: "SubimitInspectionData",
            Data: data,
        })
    },

    GetMetalCheckList(data = {}) {
        let remark = "//获取金属检测任务列表"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_QCMAPI.QCM_Insp_Metal",
            DllName: "SJ_QCMAPI",
            Method: "GetMetalCheckList",
            Data: data,
        })
    },

    DelMetalCheck(data = {}) {
        let remark = "//删除金属检测任务"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_QCMAPI.QCM_Insp_Metal",
            DllName: "SJ_QCMAPI",
            Method: "DelMetalCheck",
            Data: data,
        })
    },

    getPoInfo(data = {}) {
        let remark = "//获取po信息"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_QCMAPI.QCM_Insp_Metal",
            DllName: "SJ_QCMAPI",
            Method: "getPoInfo",
            Data: data,
        })
    },

    GetMER_PO(data = {}) {
        let remark = "//获取po列表"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_QCMAPI.QCM_Insp_Metal",
            DllName: "SJ_QCMAPI",
            Method: "GetMER_PO",
            Data: data,
        })
    },

    getSupplierList(data = {}) {
        let remark = "//获取供应商/部门列表"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_QCMAPI.QCM_Insp_Metal",
            DllName: "SJ_QCMAPI",
            Method: "getSupplierList",
            Data: data,
        })
    },

    AddMetalCheck(data = {}) {
        let remark = "//新增金属检测任务"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_QCMAPI.QCM_Insp_Metal",
            DllName: "SJ_QCMAPI",
            Method: "AddMetalCheck",
            Data: data,
        })
    },

    EditMetalCheck(data = {}) {
        let remark = "//编辑金属检测任务"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_QCMAPI.QCM_Insp_Metal",
            DllName: "SJ_QCMAPI",
            Method: "EditMetalCheck",
            Data: data,
        })
    },

    GetMetalCheckDetail(data = {}) {
        let remark = "//获取金属检测任务详情"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_QCMAPI.QCM_Insp_Metal",
            DllName: "SJ_QCMAPI",
            Method: "GetMetalCheckDetail",
            Data: data,
        })
    },

    getOrgList(data = {}) {
        let remark = "//获取厂区列表"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_BDMAPI.BDM_Needlemanagement",
            DllName: "SJ_BDMAPI",
            Method: "getOrgList",
            Data: data,
        })
    },

    getProduction_lineList(data = {}) {
        let remark = "//获取产线列表"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_BDMAPI.BDM_Needlemanagement",
            DllName: "SJ_BDMAPI",
            Method: "getProduction_lineList",
            Data: data,
        })
    },

    getNeedle_categoryList(data = {}) {
        let remark = "//获取车针类型列表"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_BDMAPI.BDM_Needlemanagement",
            DllName: "SJ_BDMAPI",
            Method: "getNeedle_categoryList",
            Data: data,
        })
    },

    getProduction_lineInfoByScan(data = {}) {
        let remark = "//扫码获取产线信息"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_BDMAPI.BDM_Needlemanagement",
            DllName: "SJ_BDMAPI",
            Method: "getProduction_lineInfoByScan",
            Data: data,
        })
    },

    getBurrList(data = {}) {
        let remark = "//获取厂区产线车针信息列表"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_BDMAPI.BDM_Needlemanagement",
            DllName: "SJ_BDMAPI",
            Method: "getBurrList",
            Data: data,
        })
    },

    delBurr(data = {}) {
        let remark = "//删除厂区产线车针信息"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_BDMAPI.BDM_Needlemanagement",
            DllName: "SJ_BDMAPI",
            Method: "BDM_Needlemanagement_delete",
            Data: data,
        })
    },

    addBurr(data = {}) {
        let remark = "//新增厂区产线车针信息"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_BDMAPI.BDM_Needlemanagement",
            DllName: "SJ_BDMAPI",
            Method: "BDM_Needlemanagement_add",
            Data: data,
        })
    },

    addBurrList(data = {}) {
        let remark = "//新增车针记录"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_BDMAPI.BDM_Needlemanagement",
            DllName: "SJ_BDMAPI",
            Method: "BDM_Needlemanagement_PDAadd",
            Data: data,
        })
    },

    delBurrList(data = {}) {
        let remark = "//删除车针记录"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_BDMAPI.BDM_Needlemanagement",
            DllName: "SJ_BDMAPI",
            Method: "BDM_Needlemanagement_PDAdelete",
            Data: data,
        })
    },

    getBurrDetailList(data = {}) {
        let remark = "//获取车针记录"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_BDMAPI.BDM_Needlemanagement",
            DllName: "SJ_BDMAPI",
            Method: "BDM_Needlemanagement_PDAView",
            Data: data,
        })
    },

    Rqc_taskBase_Main_view(data = {}) {
        let remark = "//RQC获取RQC主页列表"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_RQCAPI.Rqc_taskBase",
            Method: "Rqc_taskBase_Main_view",
            Data: data,
        })
    },

    Rqc_taskBase_Main_delete_task_no(data = {}) {
        let remark = "//RQC删除RQC主页列表"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_RQCAPI.Rqc_taskBase",
            Method: "Rqc_taskBase_Main_delete_task_no",
            Data: data,
        })
    },

    Rqc_taskBase_getworkshop_list(data = {}) {
        let remark = "//RQC获取RQC工段工艺列表"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_RQCAPI.Rqc_taskBase",
            Method: "Rqc_taskBase_getworkshop_list",
            Data: data,
        })
    },

    Rqc_taskBase_getpoview(data = {}) {
        let remark = "//RQC根据po带回信息"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_RQCAPI.Rqc_taskBase",
            Method: "Rqc_taskBase_getpoview",
            Data: data,
        })
    },

    Rqc_taskBase_getworkshop_list(data = {}) {
        let remark = "//RQC根据鞋型带回工段工艺"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_RQCAPI.Rqc_taskBase",
            Method: "Rqc_taskBase_getworkshop_list",
            Data: data,
        })
    },

    Rqc_taskBase_production_branch_list(data = {}) {
        let remark = "//RQC获取部门列表"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_RQCAPI.Rqc_taskBase",
            Method: "Rqc_taskBase_production_branch_list2",
            Data: data,
        })
    },

    Rqc_taskBase_getworkshop_mainlist(data = {}) {
        let remark = "//RQC获取主页工段列表"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_RQCAPI.Rqc_taskBase",
            Method: "Rqc_taskBase_getworkshop_mainlist",
            Data: data,
        })
    },

    Rqc_taskBase_getart_mainlist(data = {}) {
        let remark = "//RQC获取主页art列表"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_RQCAPI.Rqc_taskBase",
            Method: "Rqc_taskBase_getart_mainlist",
            Data: data,
        })
    },

    Rqc_taskBase_Main_Insert(data = {}) {
        let remark = "//RQC生产任务"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_RQCAPI.Rqc_taskBase",
            Method: "Rqc_taskBase_Main_Insert",
            Data: data,
        })
    },

    Rqc_taskBase_Main_task_no_list(data = {}) {
        let remark = "//RQC获取任务详情"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_RQCAPI.Rqc_taskBase",
            Method: "Rqc_taskBase_Main_task_no_list",
            Data: data,
        })
    },

    Rqc_taskBase_getdiv_list(data = {}) {
        let remark = "//RQC获取盒子详情"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_RQCAPI.Rqc_taskBase",
            Method: "Rqc_taskBase_getdiv_list",
            Data: data,
        })
    },

    Rqc_taskBase_Main_Insert2(data = {}) {
        let remark = "//RQC保存卡片"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_RQCAPI.Rqc_taskBase",
            Method: "Rqc_taskBase_Main_Insert2",
            Data: data,
        })
    },

    Rqc_taskBasediv_mx(data = {}) {
        let remark = "//RQC卡片表头之盒子录入的最近信息"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_RQCAPI.Rqc_taskBase",
            Method: "Rqc_taskBasediv_mx",
            Data: data,
        })
    },

    over_inspection(data = {}) {
        let remark = "//RQC切换检验任务状态"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_RQCAPI.Rqc_taskBase",
            Method: "over_inspection",
            Data: data,
        })
    },

    Rqc_taskBase_jyxm_list(data = {}) {
        let remark = "//RQC获取抽检项目数据"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_RQCAPI.Rqc_taskBase",
            Method: "Rqc_taskBase_jyxm_list",
            Data: data,
        })
    },

    Rqc_taskBase_Main_Insert_mx(data = {}) {
        let remark = "//RQC保存抽检数据"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_RQCAPI.Rqc_taskBase",
            Method: "Rqc_taskBase_Main_Insert_mx",
            Data: data,
        })
    },

    Rqc_taskBase_jyxm_Add(data = {}) {
        let remark = "//RQC合格/不合格提交"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_RQCAPI.Rqc_taskBase",
            Method: "Rqc_taskBase_jyxm_Add",
            Data: data,
        })
    },

    Rqc_taskBase_recall(data = {}) {
        let remark = "//RQC撤销一次"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_RQCAPI.Rqc_taskBase",
            Method: "Rqc_taskBase_recall",
            Data: data,
        })
    },

    GetWorkshop_SectIon(data = {}) {
        let remark = "//RQC获取巡检列表"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_RQCAPI.Rqc_taskBase",
            Method: "GetWorkshop_SectIon",
            Data: data,
        })
    },

    Rqc_taskBase_xxview(data = {}) {
        let remark = "//RQC获取巡检历史记录"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_RQCAPI.Rqc_taskBase",
            Method: "Rqc_taskBase_xxview",
            Data: data,
        })
    },

    GetWorkshop_Sect(data = {}) {
        let remark = "//RQC获取机台数据"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_RQCAPI.Rqc_taskBase",
            Method: "GetWorkshop_Sect",
            Data: data,
        })
    },

    Rqc_taskBase_xxadd(data = {}) {
        let remark = "//RQC 保存机台数据"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_RQCAPI.Rqc_taskBase",
            Method: "Rqc_taskBase_xxadd",
            Data: data,
        })
    },

    Rqc_taskBase_ex_taskadd(data = {}) {
        let remark = "//RQC 实验室样品编号录入"
        return myRequest({
            notTraRetData: true,
            remark,
            ClassName: "SJ_RQCAPI.Rqc_taskBase",
            Method: "Rqc_taskBase_ex_taskadd",
            Data: data,
        })
    },
    Rqc_taskBase_deleteguid(data = {}) {
        let remark = "//RQC 图片删除"
        return myRequest({
            remark,
            ClassName: "SJ_RQCAPI.Rqc_taskBase",
            Method: "Rqc_taskBase_deleteguid",
            Data: data,
        })
    },
    batchTry_GetPilotRun_Main(data = {}) {
        let remark = "量试 主页查询"
        return myRequest({
            remark,
            ClassName: "SJ_QCMAPI.PilotRun",
            Method: "GetPilotRun_Main",
            Data: data,
        })
    },
    batchTry_GetPilotRun_Insert_art(data = {}) {
        let remark = "量试 新增查询art"
        return myRequest({
            remark,
            ClassName: "SJ_QCMAPI.PilotRun",
            Method: "GetPilotRun_Insert_art",
            Data: data,
        })
    },
    batchTry_GetPilotRun_art_Detail(data = {}) {
        let remark = "量试 新增时根据art查询信息"
        return myRequest({
            remark,
            ClassName: "SJ_QCMAPI.PilotRun",
            Method: "GetPilotRun_art_Detail",
            Data: data,
        })
    },
    batchTry_InsertPilotRun_Main(data = {}) {
        let remark = "量试 新增"
        return myRequest({
            remark,
            ClassName: "SJ_QCMAPI.PilotRun",
            Method: "InsertPilotRun_Main",
            Data: data,
        })
    },
    batchTry_Getchoice(data = {}) {
        let remark = "量试 量试管理查询材料/部件"
        return myRequest({
            remark,
            ClassName: "SJ_QCMAPI.PilotRun",
            Method: "Getchoice",
            Data: data,
        })
    },
    batchTry_GetPilotRun_Edit_Workshop(data = {}) {
        let remark = "量试 量试管理查询工段"
        return myRequest({
            remark,
            ClassName: "SJ_QCMAPI.PilotRun",
            Method: "GetPilotRun_Edit_Workshop",
            Data: data,
        })
    },
    batchTry_Getinspection(data = {}) {
        let remark = "量试 量试管理查询检验项目"
        return myRequest({
            remark,
            ClassName: "SJ_QCMAPI.PilotRun",
            Method: "Getinspection",
            Data: data,
        })
    },
    batchTry_InsertPilotRun_Edit(data = {}) {
        let remark = "量试 量试管理新增"
        return myRequest({
            remark,
            ClassName: "SJ_QCMAPI.PilotRun",
            Method: "InsertPilotRun_Edit",
            Data: data,
        })
    },
    batchTry_GetPilotRun_Edit(data = {}) {
        let remark = "量试 量试管理查询"
        return myRequest({
            remark,
            ClassName: "SJ_QCMAPI.PilotRun",
            Method: "GetPilotRun_Edit",
            Data: data,
        })
    },
    batchTry_DeletePilotRun_Edit(data = {}) {
        let remark = "量试 量试管理删除(只删是量试的)"
        return myRequest({
            remark,
            ClassName: "SJ_QCMAPI.PilotRun",
            Method: "DeletePilotRun_Edit",
            Data: data,
        })
    },
    batchTry_GetPilotRun_Edit_History(data = {}) {
        let remark = "量试 量试管理查看历史"
        return myRequest({
            remark,
            ClassName: "SJ_QCMAPI.PilotRun",
            Method: "GetPilotRun_Edit_History",
            Data: data,
        })
    },
    firstConfirm_OutMaingetlist(data = {}) {
        let remark = "首件确认 首件确认主页列表"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Firstarticleassurance",
            Method: "OutMaingetlist",
            Data: data,
        })
    },
    firstConfirm_Main_task_no_delete(data = {}) {
        let remark = "首件确认 删除主页列表"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Firstarticleassurance",
            Method: "Main_task_no_delete",
            Data: data,
        })
    },
    firstConfirm_Commit_Checkwhetheritpasses(data = {}) {
        let remark = "首件确认 提交检验结果"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Firstarticleassurance",
            Method: "Commit_Checkwhetheritpasses",
            Data: data,
        })
    },
    firstConfirm_Outmer_po_getlist(data = {}) {
        let remark = "首件确认 po扫描"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Firstarticleassurance",
            Method: "Outmer_po_getlist",
            Data: data,
        })
    },
    firstConfirm_Getinspectionitem_recordhois(data = {}) {
        let remark = "首件确认 首件记录的明细"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Firstarticleassurance",
            Method: "Getinspectionitem_recordhois",
            Data: data,
        })
    },
    firstConfirm_Getworkshop_list(data = {}) {
        let remark = "首件确认 工段工艺（根据po扫描鞋型带出）"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Firstarticleassurance",
            Method: "Getworkshop_list",
            Data: data,
        })
    },
    firstConfirm_InputMain_add_task(data = {}) {
        let remark = "首件确认 首件录入基础信息"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Firstarticleassurance",
            Method: "InputMain_add_task",
            Data: data,
        })
    },
    firstConfirm_OutMain_tack_no_list(data = {}) {
        let remark = "首件确认 继续录入带出信息获取基本信息"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Firstarticleassurance",
            Method: "OutMain_tack_no_list",
            Data: data,
        })
    },
    firstConfirm_Outhistory_getList(data = {}) {
        let remark = "首件确认 获取DQA列表"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Firstarticleassurance",
            Method: "Outhistory_getList",
            Data: data,
        })
    },
    firstConfirm_Div_input(data = {}) {
        let remark = "首件确认 DQA保存"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Firstarticleassurance",
            Method: "Div_input",
            Data: data,
        })
    },
    firstConfirm_Outhistory_getList2(data = {}) {
        let remark = "首件确认 获取DQA历史记录"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Firstarticleassurance",
            Method: "Outhistory_getList2",
            Data: data,
        })
    },
    firstConfirm_Getinspectionitem_list(data = {}) {
        let remark = "首件确认 获取常规检验列表"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Firstarticleassurance",
            Method: "Getinspectionitem_list",
            Data: data,
        })
    },
    firstConfirm_Commitinspectionitem(data = {}) {
        let remark = "首件确认 保存常规检验列表"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Firstarticleassurance",
            Method: "Commitinspectionitem",
            Data: data,
        })
    },
    firstConfirm_Getinspectionitem_record(data = {}) {
        let remark = "首件确认 常规检验首件历史记录"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Firstarticleassurance",
            Method: "Getinspectionitem_record",
            Data: data,
        })
    },
    firstConfirm_Out_file_list(data = {}) {
        let remark = "首件确认 获取拍照历史记录"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Firstarticleassurance",
            Method: "Out_file_list",
            Data: data,
        })
    },
    firstConfirm_Input_file_list(data = {}) {
        let remark = "首件确认 上传拍照"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Firstarticleassurance",
            Method: "Input_file_list",
            Data: data,
        })
    },
    firstConfirm_delete_file(data = {}) {
        let remark = "首件确认 删除拍照"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Firstarticleassurance",
            Method: "delete_file",
            Data: data,
        })
    },
    firstConfirm_Get_Thesignaturerecord(data = {}) {
        let remark = "首件确认 签名确认记录"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Firstarticleassurance",
            Method: "Get_Thesignaturerecord",
            Data: data,
        })
    },
    firstConfirm_Get_staff_name(data = {}) {
        let remark = "首件确认 获取姓名通过账号"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Firstarticleassurance",
            Method: "Get_staff_name",
            Data: data,
        })
    },
    firstConfirm_Commit_Signature(data = {}) {
        let remark = "首件确认 保存签名"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Firstarticleassurance",
            Method: "Commit_Signature",
            Data: data,
        })
    },
    firstConfirm_delete_inspectionitem(data = {}) {
        let remark = "首件确认 删除常规"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Firstarticleassurance",
            Method: "delete_inspectionitem",
            Data: data,
        })
    },
    qualityError_Qualityabnormal_Main_getList(data = {}) {
        let remark = "品质异常 获取主页"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Qualityabnormal",
            Method: "Qualityabnormal_Main_getList",
            Data: data,
        })
    },
    qualityError_Get_abnormal_category(data = {}) {
        let remark = "品质异常 异常类别"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Qualityabnormal",
            Method: "Get_abnormal_category",
            Data: data,
        })
    },
    qualityError_GetArt_List(data = {}) {
        let remark = "品质异常 ART扫描"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Qualityabnormal",
            Method: "GetArt_List",
            Data: data,
        })
    },
    qualityError_Get_department(data = {}) {
        let remark = "品质异常 获取责任部门列表"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Qualityabnormal",
            Method: "Get_department",
            Data: data,
        })
    },
    qualityError_Getabnormal_List(data = {}) {
        let remark = "品质异常 获取异常成本类别列表"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Qualityabnormal",
            Method: "Getabnormal_List",
            Data: data,
        })
    },
    qualityError_Input_Main_Data(data = {}) {
        let remark = "品质异常 保存详情数据"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Qualityabnormal",
            Method: "Input_Main_Data",
            Data: data,
        })
    },
    qualityError_deletepzcb(data = {}) {
        let remark = "品质异常 删除品质成本"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Qualityabnormal",
            Method: "deletepzcb",
            Data: data,
        })
    },
    qualityError_GetInput_Datea(data = {}) {
        let remark = "品质异常 获取详情页数据"
        return myRequest({
            remark,
            ClassName: "SJ_QAAPI.Qualityabnormal",
            Method: "GetInput_Datea",
            Data: data,
        })
    },
    RQCcheck_GetRQCAudit_Main(data = {}) {
        let remark = "RQC审核 rqc工厂审核主页查询"
        return myRequest({
            remark,
            ClassName: "SJ_RQCAPI.RQC_Audit",
            Method: "GetRQCAudit_Main",
            Data: data,
        })
    },
    RQCcheck_GetRQCAudit_Edit_suppliers(data = {}) {
        let remark = "RQC审核 rqc工厂审核查询供应商"
        return myRequest({
            remark,
            ClassName: "SJ_RQCAPI.RQC_Audit",
            Method: "GetRQCAudit_Edit_suppliers",
            Data: data,
        })
    },
    RQCcheck_GetRQCAudit_Edit_audit_type(data = {}) {
        let remark = "RQC审核 rqc工厂审核查询审核类型"
        return myRequest({
            remark,
            ClassName: "SJ_RQCAPI.RQC_Audit",
            Method: "GetRQCAudit_Edit_audit_type",
            Data: data,
        })
    },
    RQCcheck_GetRQCAudit_Edit_audit_item_cate(data = {}) {
        let remark = "RQC审核 rqc工厂审核查询审核项目分类"
        return myRequest({
            remark,
            ClassName: "SJ_RQCAPI.RQC_Audit",
            Method: "GetRQCAudit_Edit_audit_item_cate",
            Data: data,
        })
    },
    RQCcheck_InsertRQCAudit_Edit(data = {}) {
        let remark = "RQC审核 rqc工厂审核生成任务"
        return myRequest({
            remark,
            ClassName: "SJ_RQCAPI.RQC_Audit",
            Method: "InsertRQCAudit_Edit",
            Data: data,
        })
    },
    RQCcheck_GetRQCAudit_Edit(data = {}) {
        let remark = "RQC审核 工厂审核编辑页面查询"
        return myRequest({
            remark,
            ClassName: "SJ_RQCAPI.RQC_Audit",
            Method: "GetRQCAudit_Edit",
            Data: data,
        })
    },
    RQCcheck_EditRQCAudit_Edit(data = {}) {
        let remark = "RQC审核 rqc工厂审核编辑页面保存草稿"
        return myRequest({
            remark,
            ClassName: "SJ_RQCAPI.RQC_Audit",
            Method: "EditRQCAudit_Edit",
            Data: data,
        })
    },
    RQCcheck_EditRQCAudit_Edit_sub(data = {}) {
        let remark = "RQC审核 rqc工厂审核编辑页面提交报告"
        return myRequest({
            remark,
            ClassName: "SJ_RQCAPI.RQC_Audit",
            Method: "EditRQCAudit_Edit_sub",
            Data: data,
        })
    },
    RQCcheck_EditRQCAudit_Edit_over(data = {}) {
        let remark = "RQC审核 rqc工厂审核编辑页面结案"
        return myRequest({
            remark,
            ClassName: "SJ_RQCAPI.RQC_Audit",
            Method: "EditRQCAudit_Edit_over",
            Data: data,
        })
    },
    RQCcheck_EditRQCAudit_Edit_gsjg(data = {}) {
        let remark = "RQC审核 rqc工厂审核编辑页面更新改善结果"
        return myRequest({
            remark,
            ClassName: "SJ_RQCAPI.RQC_Audit",
            Method: "EditRQCAudit_Edit_gsjg",
            Data: data,
        })
    },
    RQCcheck_GetRQCAudit_Edit_history(data = {}) {
        let remark = "RQC审核 rqc工厂审核编辑页面查询历史"
        return myRequest({
            remark,
            ClassName: "SJ_RQCAPI.RQC_Audit",
            Method: "GetRQCAudit_Edit_history",
            Data: data,
        })
    },
    RQCcheck_GetRQCAudit_Main_factory(data = {}) {
        let remark = "RQC审核 rqc工厂审核主页查询-工厂端"
        return myRequest({
            remark,
            ClassName: "SJ_RQCAPI.RQC_Audit",
            Method: "GetRQCAudit_Main_factory",
            Data: data,
        })
    },
    RQCcheck_EditRQCAudit_Edit_cancel_over(data = {}) {
        let remark = "RQC审核 rqc工厂审核编辑页取消结案"
        return myRequest({
            remark,
            ClassName: "SJ_RQCAPI.RQC_Audit",
            Method: "EditRQCAudit_Edit_cancel_over",
            Data: data,
        })
    },
    RQCcheck_DeleteRQCAudit(data = {}) {
        let remark = "RQC审核 rqc工厂审核主页删除"
        return myRequest({
            remark,
            ClassName: "SJ_RQCAPI.RQC_Audit",
            Method: "DeleteRQCAudit",
            Data: data,
        })
    },
    RQCcheck_EditRQCAudit_Edit_factory_gsjg(data = {}) {
        let remark = "RQC审核 工厂端提交改善结果"
        return myRequest({
            remark,
            ClassName: "SJ_RQCAPI.RQC_Audit",
            Method: "EditRQCAudit_Edit_factory_gsjg",
            Data: data,
        })
    },
    chemiclaManage_GetContainer_List(data = {}) {
        let remark = "化学品管理 容器二维码扫描"
        return myRequest({
            remark,
            ClassName: "SJ_BDMAPI.BDM_Chemicalkanban",
            Method: "GetContainer_List",
            Data: data,
            needParse: true
        })
    },
    chemiclaManage_GetChemical_List(data = {}) {
        let remark = "化学品管理 胶水二维码扫描"
        return myRequest({
            remark,
            ClassName: "SJ_BDMAPI.BDM_Chemicalkanban",
            Method: "GetChemical_List",
            Data: data,
        })
    },
    chemiclaManage_Commit_data(data = {}) {
        let remark = "化学品管理 化学品配送提交"
        return myRequest({
            remark,
            ClassName: "SJ_BDMAPI.BDM_Chemicalkanban",
            Method: "Commit_data",
            Data: data,
        })
    },
    chemiclaManage_GetPrMain_list(data = {}) {
        let remark = "化学品管理 化学品条码打印信息展示"
        return myRequest({
            remark,
            ClassName: "SJ_BDMAPI.BDM_Chemicalkanban",
            Method: "GetPrMain_list",
            Data: data,
        })
    },
    chemiclaManage_Commit_Printdata(data = {}) {
        let remark = "化学品管理 化学品打印接口"
        return myRequest({
            remark,
            ClassName: "SJ_BDMAPI.BDM_Chemicalkanban",
            Method: "Commit_Printdata",
            Data: data,
        })
    },
    sys_GetAppVersionInfo(data = {}) {
        let remark = "系统 检查更新"
        return myRequest({
            remark,
            ClassName: "SJ_SYSAPI.User",
            Method: "GetAppVersionInfo",
            Data: data,
        })
    },
    THSJ_PDA_MianGetList(data = {}) {
        let remark = "退货数据 主页数据"
        return myRequest({
            remark,
            ClassName: "SJeMES_IQC.Marketfeedback",
            Method: "PDA_MianGetList",
            Data: data,
        })
    },
    THSJ_PoGetList(data = {}) {
        let remark = "退货数据 po带出内容"
        return myRequest({
            remark,
            ClassName: "SJeMES_IQC.Marketfeedback",
            Method: "PoGetList",
            Data: data,
        })
    },
    THSJ_GetCode1(data = {}) {
        let remark = "退货数据 主要退货代码"
        return myRequest({
            remark,
            ClassName: "SJeMES_IQC.Marketfeedback",
            Method: "GetCode1",
            Data: data,
        })
    },
    THSJ_GetCode2(data = {}) {
        let remark = "退货数据 次要退货代码"
        return myRequest({
            remark,
            ClassName: "SJeMES_IQC.Marketfeedback",
            Method: "GetCode2",
            Data: data,
        })
    },
    THSJ_Commithisory(data = {}) {
        let remark = "退货数据 继续录入带出数据"
        return myRequest({
            remark,
            ClassName: "SJeMES_IQC.Marketfeedback",
            Method: "Commithisory",
            Data: data,
        })
    },
    THSJ_Commit_Mian(data = {}) {
        let remark = "退货数据 保存数据"
        return myRequest({
            remark,
            ClassName: "SJeMES_IQC.Marketfeedback",
            Method: "Commit_Mian",
            Data: data,
        })
    },
    THSJ_Delete_Main(data = {}) {
        let remark = "退货数据 删除主页数据"
        return myRequest({
            remark,
            ClassName: "SJeMES_IQC.Marketfeedback",
            Method: "Delete_Main",
            Data: data,
        })
    },
    THSJ_getRegionList(data = {}) {
        let remark = "退货数据 获取国家下拉"
        return myRequest({
            remark,
            ClassName: "SJeMES_IQC.Marketfeedback",
            Method: "getRegionList",
            Data: data,
        })
    },
    QRX_EditConfirmShoes_Store_Confirm(data = {}) {
        let remark = "确认鞋 扫描"
        return myRequest({
            remark,
            ClassName: "SJ_AQLAPI.AQL_ConfirmShoes",
            Method: "EditConfirmShoes_Store_Confirm",
            Data: data,
        })
    },
    GJBY_GetList(data = {}) {
        let remark = "扫描工具条码"
        return myRequest({
            remark,
            ClassName: "SJ_BDMAPI.BDM_Aeqinfom",
            Method: "GetList",
            Data: data,
            notTra: true,
        })
    },
    GJBY_Commitdatalv(data = {}) {
        let remark = "工具保养提交"
        return myRequest({
            remark,
            ClassName: "SJ_BDMAPI.BDM_Aeqinfom",
            Method: "Commitdatalv",
            Data: data,
        })
    },
    JSWF_SearchScrapGlueMagRecord(data = {}) {
        let remark = "获取胶水危废列表"
        return myRequest({
            remark,
            ClassName: "SJ_BDMAPI.SCRAP_GLUE",
            Method: "SearchScrapGlueMagRecord",
            Data: data,
        })
    },
    JSWF_GetDEPARTMENT(data = {}) {
        let remark = "获取胶水危废单位下拉"
        return myRequest({
            remark,
            ClassName: "SJ_BDMAPI.SCRAP_GLUE",
            Method: "GetDEPARTMENT",
            Data: data,
        })
    },
    JSWF_GetScrapGlue(data = {}) {
        let remark = "获取胶水危废名称下拉"
        return myRequest({
            remark,
            ClassName: "SJ_BDMAPI.SCRAP_GLUE",
            Method: "GetScrapGlue",
            Data: data,
        })
    },
    JSWF_GetScrapGlueReason(data = {}) {
        let remark = "获取胶水危废原因下拉"
        return myRequest({
            remark,
            ClassName: "SJ_BDMAPI.SCRAP_GLUE",
            Method: "GetScrapGlueReason",
            Data: data,
        })
    },
    JSWF_GetScrapGlueMagRecordById(data = {}) {
        let remark = "获取胶水危废详情"
        return myRequest({
            remark,
            ClassName: "SJ_BDMAPI.SCRAP_GLUE",
            Method: "GetScrapGlueMagRecordById",
            Data: data,
        })
    },
    JSWF_ScrapGlueMagAutograph(data = {}) {
        let remark = "签名验证"
        return myRequest({
            remark,
            ClassName: "SJ_BDMAPI.SCRAP_GLUE",
            Method: "ScrapGlueMagAutograph",
            Data: data,
        })
    },
    JSWF_AddOrEditScrapGlueMagRecord(data = {}) {
        let remark = "保存胶水危废"
        return myRequest({
            remark,
            ClassName: "SJ_BDMAPI.SCRAP_GLUE",
            Method: "AddOrEditScrapGlueMagRecord",
            Data: data,
        })
    },
    JSWF_DelScrapGlueMagRecordById(data = {}) {
        let remark = "删除胶水危废"
        return myRequest({
            remark,
            ClassName: "SJ_BDMAPI.SCRAP_GLUE",
            Method: "DelScrapGlueMagRecordById",
            Data: data,
        })
    },
    SYS_GetAppLanguageType(data = {}) {
        let remark = "获取语言列表"
        return myRequest({
            remark,
            ClassName: "SJ_BDMAPI.UILAN_APP",
            Method: "GetAppLanguageType",
            Data: data,
        })
    },
    SYS_GetAppLanguageTranslate(data = {}) {
        let remark = "获取语言包"
        return myRequest({
            remark,
            ClassName: "SJ_BDMAPI.UILAN_APP",
            Method: "GetAppLanguageTranslate",
            Data: data,
        })
    },
    UC_SearchContainerUse(data = {}) {
        let remark = "容器使用管控查询"
        return myRequest({
            remark,
            ClassName: "SJ_BDMAPI.BDM_Chemicalkanban",
            Method: "SearchContainerUse",
            Data: data,
        })
    },
    UC_UpdateContainerUse(data = {}) {
        let remark = "更新使用状态"
        return myRequest({
            remark,
            ClassName: "SJ_BDMAPI.BDM_Chemicalkanban",
            Method: "UpdateContainerUse",
            Data: data,
        })
    },
    SendInspectionDataEmail(data = {}) {
        let remark = "单项结果推送"
        return myRequest({
            remark,
            ClassName: "SJ_QCMAPI.Examine",
            Method: "SendInspectionDataEmail",
            Data: data,
        })
    },
	NeedleChange(data = {}) {
	    let remark = "换针"
	    return myRequest({
	        remark,
	        ClassName: "SJ_BDMAPI.BDM_Needlemanagement",
	        Method: "BDM_Needlemanagement_PDAadd",
	        Data: data,
	    })
	},

}
