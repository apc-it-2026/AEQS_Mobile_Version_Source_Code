<template>
    <div class='print p15'>
        <u-navbar border :title="$t('common.打印')" :leftText="$t('common.返回')" placeholder autoBack></u-navbar>
        <div class="currentDevice">
            <uni-card margin="15rpx 0" :title="$t('common.打印机信息')">
                <div class="myList">
                    <div class="item">
                        <div class="label">{{$t('common.打印机名称')}}:</div>
                        <div class="value">
                            {{[bluetoothInfo.name,bluetoothInfo.name,bluetoothInfo.name][printType]}}
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">{{$t('common.打印机地址')}}:</div>
                        <div class="value">
                            {{[bluetoothInfo.deviceId,bluetoothInfo.deviceId,bluetoothInfo.deviceId][printType]}}
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">{{$t('common.连接种类')}}:</div>
                        <div class="value">
                            {{[$t('common.蓝牙'),'wifi','USB'][printType]}}
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">{{$t('common.连接状态')}}:</div>
                        <div class="value" :class="isPrintConnectIng?'suc':'err'">
                            {{isPrintConnectIng? $t('common.已连接') : $t('common.未连接') }}
                        </div>
                    </div>
                </div>
            </uni-card>
        </div>
        <u-subsection :list="list" :current="current" @change="e=>current=e"></u-subsection>
        <!-- 蓝牙打印 -->
        <div class="Bluetooth" v-if="current==0">
            <button class="btn" type="primary" :loading="isSearching" v-if="!isSearching" @tap="startSearch">{{$t('common.开始搜索打印机')}} </button>
            <button class="btn" type="warn" v-if="isSearching" @tap="stopSearch">{{$t('common.正在搜索')}}...</button>
            <u-button class="btn" color="#0ab99c" @tap="printDemo" v-if="bluetoothInfo.deviceId&&isPrintConnectIng">{{$t('common.打印测试')}}({{$t('common.当前连接')}}:{{bluetoothInfo.name}}) </u-button>
            <view v-for="(item) in deviceList" :data-deviceId="item.deviceId" :data-name="item.name" :data-advertisData="item.advertisServiceUUIDs" :key="item.deviceId" @tap="bindViewTap(item)">
                <view class="item" :class="{current:(item.deviceId==bluetoothInfo.deviceId)&&isPrintConnectIng}">
                    <view class="name block">{{item.name}}</view>
                    <view class="deviceId block">{{item.deviceId}}</view>
                </view>
            </view>
        </div>
    </div>
</template>
<script>
import print from '@/util/ble/print.js'
export default {
    name: 'print',
    data() {
        return {
            list: [this.$t('common.蓝牙打印')],
            current: 0,
            printType: 0,//0蓝牙打印 1 wifi打印
            isSearching: false, //是否正在搜索中
            isPrintConnectIng: false, //是否已连接打印机
            deviceList: [],//设备列表
            services: [],
            serviceId: 0,
            writeCharacter: false,
            readCharacter: false,
            notifyCharacter: false,
            bluetoothInfo: {//蓝牙信息
                platform: "",
                deviceId: "",
                name: "",
                writeCharaterId: "",
                writeServiceId: "",
                notifyCharaterId: "",
                notifyServiceId: "",
                readCharaterId: "",
                readServiceId: "",
            },
        }
    },
    methods: {
        printDemo() {//打印测试
            var command = print.jpPrinter.createNew()
            command.init()
            command.setStoreQRCodeData(this.$t('common.我是二维码的内容'));//二维码内容
            command.setSelectSizeOfModuleForQRCode(5);//二维码大小
            command.setPrintQRCode();//打印二维码
            command.setText(this.$t('common.测试打印成功'));//文字
            command.setText(this.$t('common.测试换行'));//文字
            // command.setPrintAndFeedRow(2);//打印并换n行
            command.printToLine();//打印到分割线
            print.starPrint(command.getData())
            // let command = print.jpPrinter2.createNew()
            // command.init()
            // command.setSize(48, 40)
            // command.setGap(0)
            // command.setCls()
            // command.setText(0, 30, "TSS24.BF2", 1, 1, "图片")
            // command.setQR(40, 120, "L", 5, "A", "www.smarnet.cc佳博智汇")
            // command.setText(60, 90, "TSS24.BF2", 1, 1, "佳博智汇")
            // command.setText(170, 50, "TSS24.BF2", 1, 1, "小程序测试")
            // command.setText(170, 90, "TSS24.BF2", 1, 1, "测试数字12345678")
            // command.setText(170, 120, "TSS24.BF2", 1, 1, "测试英文abcdefg")
            // command.setText(170, 150, "TSS24.BF2", 1, 1, "测试符号/*-+!@#$")
            // command.setBarCode(170, 180, "EAN8", 64, 1, 3, 3, "1234567")
            // command.setPagePrint()
            // print.starPrint(command.getData())



        },
        startSearch() {   //开始搜索蓝牙
            let that = this
            uni.openBluetoothAdapter({//初始化蓝牙
                success(res) {
                    uni.getBluetoothAdapterState({//获取本机蓝牙适配器状态。
                        success(res2) {
                            console.log(res2, '获取本机蓝牙适配器状态。');

                            if (res2.available) {
                                that.isSearching = true;
                                if (res2.discovering) {
                                    uni.showToast({
                                        title: that.$t('common.正在搜索附近打印机设备'),
                                        icon: "none"
                                    })
                                    return;
                                }
                                //获取蓝牙设备信息
                                that.getBluetoothDevices()
                            } else {
                                uni.showModal({
                confirmText:this.$t('common.确定'),
                cancelText:this.$t('common.取消'),
                                    title: that.$t('common.提示'),
                                    content: that.$t('common.本机蓝牙不可用'),
                                })
                            }
                        }
                    });
                },
                fail(err) {
                    console.log(err);
                    uni.showModal({
                confirmText:this.$t('common.确定'),
                cancelText:this.$t('common.取消'),
                        title: that.$t('common.提示'),
                        content: that.$t('common.蓝牙初始化失败请打开蓝牙'),
                    })
                }
            })
        },
        stopSearch() {//停止搜索
            uni.stopBluetoothDevicesDiscovery({
                success: (res) => {
                    this.isSearching = false;
                },
                fail: (e) => {
                    console.log('stop:', e)
                    this.errorCodeTip(e.errCode);
                }
            })
        },
        getBluetoothDevices() {    //获取蓝牙设备信息
            let that = this
            that.deviceList = [];
            uni.startBluetoothDevicesDiscovery({//开始搜寻附近的蓝牙外围设备
                powerLevel: "high",
                success(res) {
                    console.log(res, '开始搜寻附近的蓝牙外围设备');

                    plus.bluetooth.onBluetoothDeviceFound((result) => {  //蓝牙设备监听 uni.onBluetoothDeviceFound
                        console.log(result.devices, '获取到设备');
                        let arr = that.deviceList;
                        let devices = [];
                        let deviceList = result.devices;

                        for (let i = 0; i < deviceList.length; ++i) {
                            if (deviceList[i].name && deviceList[i].name != "未知设备") {
                                let arrNew = arr.filter((item) => {
                                    return item.deviceId == deviceList[i].deviceId;
                                });
                                // console.log('arrNew:',arrNew.length)
                                if (arrNew.length == 0) {
                                    devices.push(deviceList[i]);
                                }
                            }
                        }
                        that.deviceList = arr.concat(devices);

                    });
                    that.time = setTimeout(() => {
                        // uni.getBluetoothDevices
                        plus.bluetooth.getBluetoothDevices({
                            success(res2) {
                                console.log(res2, 'setTimeout getBluetoothDevices');

                                let devices = [];
                                let deviceList = res2.devices;
                                for (let i = 0; i < deviceList.length; ++i) {
                                    if (deviceList[i].name && deviceList[i].name != "未知设备") {
                                        devices.push(deviceList[i]);
                                    }
                                }

                                that.deviceList = devices;
                            },
                        })

                        clearTimeout(that.time);
                    }, 3000);
                }
            });

        },
        bindViewTap(item) {    //绑定蓝牙
            if (this.bluetoothInfo.deviceId == item.deviceId && this.isPrintConnectIng) return
            let that = this;
            let {
                deviceId,
                name
            } = item;
            this.stopSearch();

            that.serviceId = 0;
            that.writeCharacter = false;
            that.readCharacter = false;
            that.notifyCharacter = false;
            uni.showLoading({
                title: this.$t('common.正在连接'),
            })
            // uni.createBLEConnection
            console.log(deviceId);
            plus.bluetooth.createBLEConnection({
                deviceId,
                success(res) {
                    console.log('createBLEConnection success:', res)
                    that.getSeviceId(deviceId, name)
                },
                fail(e) {
                    console.log('e', e);
                    uni.hideLoading()
                    that.errorCodeTip(e.errCode);
                }
            })

        },
        getSeviceId(deviceId, name) {        //获取蓝牙设备所有服务(service)。
            let that = this;
            let t = setTimeout(() => {
                plus.bluetooth.getBLEDeviceServices({
                    deviceId,
                    success(res) {
                        console.log('getBLEDeviceServices success:', res)
                        that.services = res.services;
                        that.getCharacteristics(deviceId, name)
                    },
                    fail: function (e) {
                        that.errorCodeTip(e.code);
                        console.log('getBLEDeviceServices fail:', e)
                        uni.hideLoading()
                    }
                })
                clearTimeout(t);
            }, 1500)
        },
        getCharacteristics(deviceId, name) {  //获取蓝牙设备特性
            uni.hideLoading()
            var that = this
            let {
                services: list,
                serviceId: num,
                writeCharacter: write,
                readCharacter: read,
                notifyCharacter: notify
            } = that;
            let BLEInformation = that.bluetoothInfo;
            // uni.getBLEDeviceCharacteristics
            plus.bluetooth.getBLEDeviceCharacteristics({
                deviceId,
                serviceId: list[num].uuid,
                success(res) {
                    // console.log(res)
                    for (var i = 0; i < res.characteristics.length; ++i) {
                        var properties = res.characteristics[i].properties
                        var item = res.characteristics[i].uuid
                        if (!notify) {
                            if (properties.notify) {
                                BLEInformation.notifyCharaterId = item;
                                BLEInformation.notifyServiceId = list[num].uuid;
                                // that.$store.commit('BLEInformationSet', BLEInformation);
                                notify = true
                            }
                        }
                        if (!write) {
                            if (properties.write) {
                                BLEInformation.writeCharaterId = item;
                                BLEInformation.writeServiceId = list[num].uuid;
                                // that.$store.commit('BLEInformationSet', BLEInformation);
                                write = true
                            }
                        }
                        if (!read) {
                            if (properties.read) {
                                BLEInformation.readCharaterId = item;
                                BLEInformation.readServiceId = list[num].uuid;
                                // that.$store.commit('BLEInformationSet', BLEInformation);
                                read = true
                            }
                        }
                    }
                    if (!write || !notify || !read) {
                        num++
                        that.writeCharacter = write;
                        that.readCharacter = read;
                        that.notifyCharacter = notify;
                        that.serviceId = num;
                        if (num == list.length) {
                            uni.showModal({
                confirmText:this.$t('common.确定'),
                cancelText:this.$t('common.取消'),
                                title:that.$t('common.提示'),
                                content: that.$t('common.找不到该读写的特征值'),
                            })
                        } else {
                            that.getCharacteristics(deviceId, name)
                        }
                    } else {
                        BLEInformation.deviceId = deviceId;
                        BLEInformation.name = name;
                        uni.$u.toast(that.$t('common.连接成功'))
                        uni.setStorageSync('bluetoothInfo', that.bluetoothInfo)
                        uni.setStorageSync('printType', 0)//0蓝牙打印 1 wifi打印 2 usb打印
                        that.init()
                    }
                },
                fail: function (e) {
                    uni.hideLoading()
                    console.log("getBLEDeviceCharacteristics fail：", e);
                    that.errorCodeTip(e.errCode);
                }
            })
        },
        errorCodeTip(code) {  //错误码提示
            if (code == 0) {
                //正常
            } else if (code == 10000) {
                uni.showToast({
                    title: '未初始化蓝牙适配器',
                    icon: 'none'
                })
            } else if (code == 10001) {
                uni.showToast({
                    title: '当前蓝牙适配器不可用',
                    icon: 'none'
                })
            } else if (code == 10002) {
                uni.showToast({
                    title: '没有找到指定设备',
                    icon: 'none'
                })
            } else if (code == 10003) {
                uni.showToast({
                    title: '连接失败',
                    icon: 'none'
                })
            } else if (code == 10004) {
                uni.showToast({
                    title: '没有找到指定服务',
                    icon: 'none'
                })
            } else if (code == 10005) {
                uni.showToast({
                    title: '没有找到指定特征值',
                    icon: 'none'
                })
            } else if (code == 10006) {
                uni.showToast({
                    title: '当前连接已断开',
                    icon: 'none'
                })
            } else if (code == 10007) {
                uni.showToast({
                    title: '当前特征值不支持此操作',
                    icon: 'none'
                })
            } else if (code == 10008) {
                uni.showToast({
                    title: '其余所有系统上报的异常',
                    icon: 'none'
                })
            } else if (code == 10009) {
                uni.showToast({
                    title: 'Android 系统特有，系统版本低于 4.3 不支持 BLE',
                    icon: 'none'
                })
            }
        },
        init() {//刷新打印机信息
            this.bluetoothInfo = uni.getStorageSync('bluetoothInfo') || this.bluetoothInfo
            this.printType = uni.getStorageSync('printType') || this.printType || 0//0蓝牙打印 1 wifi打印 2 usb打印
            print.isPrintConnectIng().then((res) => {
                console.log(res, 'isPrintConnectIng');
                this.isPrintConnectIng = res
            }).catch((err) => {
                console.log(err);
            })
        },
        autoConnect() {//开发环境自动连接打印机方便测试
            this.isSearching || this.startSearch()
            let item = this.deviceList.find(e => e.deviceId == this.bluetoothInfo.deviceId)
            console.log(item);
            if (item) {
                this.bindViewTap(item)
            } else {
                setTimeout(() => {
                    this.autoConnect(true)
                }, 1000);
            }
        }
    },
    onShow() {
        this.init()
        this.current = this.printType
        if (process.env.NODE_ENV === 'development') {//开发环境自动连接
            // this.autoConnect()
        }

    },
    onUnload() {
        //停止搜索蓝牙设备
        if (this.isSearching) {
            uni.stopBluetoothDevicesDiscovery();
        }
    },
    onLoad(query) {
    }
}
</script>
<style lang='scss' scoped>
.print {
    .Bluetooth {
        .btn {
            margin-top: 50rpx;
            height: 40px;
            width: 600rpx;
            line-height: 40px;
        }

        .item {
            display: block;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 14px;
            margin: 0 30px;
            margin-top: 10px;
            background-color: #ffa850;
            border-radius: 5px;
            border-bottom: 2px solid #68baea;
        }
        .current {
            background-color: #42b983;
        }

        .block {
            display: block;
            color: #ffffff;
            padding: 5px;
        }
    }
}
</style>