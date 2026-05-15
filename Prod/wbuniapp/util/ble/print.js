var tsc = require("../../util/ble/tsc.js");
var esc = require("../../util/ble/esc.js");
var encode = require("../../util/ble/encoding.js");
let bluetoothInfo = uni.getStorageSync('bluetoothInfo')
let printType = uni.getStorageSync('printType') || 0 //0蓝牙打印 1 wifi打印
export default {
    jpPrinter: esc.jpPrinter,//esc指令集
    jpPrinter2: tsc.jpPrinter,//tsc指令集
    oneTimeData: 20,//每次打印字节数
    lastData: 0,//最后一次的数据
    looptime: 0,//需要总循环次才能打印完
    currentTime: 1,//当前循环到第几次

    isPrintConnectIng() {//获取打印机连接状态
        return new Promise((resolve, reject) => {
            if (!bluetoothInfo.deviceId) return resolve(false)
            uni.getBLEDeviceRSSI({
                deviceId: bluetoothInfo.deviceId,
                success(res) {
                    console.log(res, '蓝牙设备连接状态成功');
                    resolve(true)
                },
                fail(err) {
                    console.log(err, '蓝牙设备连接状态失败');
                    resolve(false)
                },
            })
        })
    },
    starPrint(buff) {//开始打印
        if (!this.isPrintConnectIng()) return uni.$u.toast(uni.$vue.$t('other.打印失败未连接打印机'))
        if (printType == 0) {//蓝牙
            this.prepareSend(buff)
        }
    },
    //蓝牙打印机部分
    //查询蓝牙打印机连接状态
    queryBlueStatus() {
        return new Promise((resolve, reject) => {
            uni.getBLEDeviceRSSI({
                deviceId: bluetoothInfo.deviceId,
                success(res) {
                    resolve(true)
                },
                fail(err) {
                    resolve(false)
                },
            })
        })
    },
    //准备发送，根据每次发送字节数来处理分包数量
    prepareSend(buff) {
        uni.showLoading({
            title: uni.$vue.$t('other.正在通过蓝牙打印'),
        })
        let that = this
        let time = that.oneTimeData
        let looptime = parseInt(buff.length / time);
        let lastData = parseInt(buff.length % time);
        this.looptime = looptime + 1;
        this.lastData = lastData;
        console.log('需要' + this.looptime + "次打印完")
        this.currentTime = 1;
        that.Send(buff)
    },
    //分包发送
    Send(buff) {
        let that = this
        let { currentTime, looptime: loopTime, lastData, oneTimeData: onTimeData, printerNum: printNum, currentPrint } = that;
        let buf;
        let dataView;
        if (currentTime < loopTime) {
            buf = new ArrayBuffer(onTimeData)
            dataView = new DataView(buf)
            for (var i = 0; i < onTimeData; ++i) {
                dataView.setUint8(i, buff[(currentTime - 1) * onTimeData + i])
            }
        } else {
            buf = new ArrayBuffer(lastData)
            dataView = new DataView(buf)
            for (var i = 0; i < lastData; ++i) {
                dataView.setUint8(i, buff[(currentTime - 1) * onTimeData + i])
            }
        }
        console.log("当前 循环到第" + currentTime + "次")
        let BLEInformation = bluetoothInfo
        plus.bluetooth.writeBLECharacteristicValue({
            deviceId: BLEInformation.deviceId,
            serviceId: BLEInformation.writeServiceId,
            characteristicId: BLEInformation.writeCharaterId,
            value: buf,
            success: function (res) {
                currentTime++
                if (currentTime <= loopTime) {
                    that.currentTime = currentTime;
                    that.Send(buff)
                } else {
                    uni.hideLoading()
                    uni.showToast({
                        title: uni.$vue.$t('other.打印成功'),
                    })
                    that.looptime = 0;
                    that.lastData = 0;
                    that.currentTime = 1;

                }
            },
            fail: function (e) {
                console.log(e)
                if (e.code == 10007) return that.Send(buff)
                uni.hideLoading()
                uni.$u.toast(e.errMsg)
            },
            complete: function () {

            }
        })
    },
    //wifi打印机部分
    //USB打印机部分
}