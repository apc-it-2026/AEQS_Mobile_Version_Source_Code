<template>
    <div class='list'>
        <scroll-view :scroll-top="scrollTop" @scroll="scroll" scroll-y class="scroll-Y" @scrolltolower="scrolltolower" :style="{height:height||autoHeight}">
            <uni-swipe-action>
                <uni-swipe-action-item :disabled="!option.delName||item.del_show!==undefined&& !item.del_show" v-for="(item, index) in list" :key="index" @click="handleOption($event,item,index)" :right-options="delRight">
                    <u-transition :show="item.transitionShow" mode="fade-up">
                        <view :hover-class="noHover?'':'clickable'" class="listBox u-border " :class="[item.animationName]" :hover-stay-time="250">
                            <slot :item="item" :index="index"></slot>
                        </view>
                    </u-transition>
                </uni-swipe-action-item>
            </uni-swipe-action>
            <u-loadmore :status="status" @loadmore="scrolltolower" :nomoreText="$t('common.没有更多了')" :loadingText="$t('common.加载中')+'...'" :loadmoreText="$t('common.上拉或点击加载更多')" />
            <div class="placeholder"></div>
        </scroll-view>
    </div>
</template>
<script>
export default {
    name: 'list',
    props: {
        option: {//组件配置
            type: Object,
            default: {
                getDataName: '',//获取列表数据的方法名
                delName: '',//删除数据的方法名
                delData: {//删除数据需要的参数
                    prop: '',//删除数据的对应字段名
                    value: '',//删除数据的对应值的字段名
                },
                page: {//page对应的参数
                    page: '',//页码对应字段名
                    pageRow: '',//页尺寸的字段名
                },
            }
        },
        otherData: {//请求数据需要的参数
            type: Object,
            default: () => { return {} }
        },
        handlerItem: {//处理返回的数据
            type: Function,
            default: arr => arr
        },
        noHover: {//不显示点击效果
            type: Boolean,
            default: false
        },
        height: {//传入的高度 没有的话就用自动计算的高度
            type: String,
            default: ''
        }
        //@getData 将数据发射回去
    },
    data() {
        return {
            autoHeight: '100vh',//组件最大高度
            scrollTop: 0,//滚动条位置
            old: {//旧滚动条位置
                scrollTop: 0
            },
            delRight: [{
                text: this.$t('common.删除'),
                style: {
                    backgroundColor: '#f56c6c'
                },
            }],//滑动选项
            status: 'loadmore',//数据加载状态
            page: 1,//当前页码
            pageRow: 10,//每页条数
            list: [],//列表数据
        }
    },
    watch: {
        list: {
            handler: function (newVal, oldVal) {
                this.list.forEach(e => e.transitionShow = true)
                if (!newVal.length) {
                    this.$nextTick(() => {
                        this.scrollTop = this.old.scrollTop
                        this.$nextTick(function () {
                            this.scrollTop = 0
                        });
                    });
                } else {

                }
            }
        },
    },
    methods: {
        scrolltolower() {//触底事件
            this.getData()
        },
        handleOption($event, item, index) {//点击右边选项
            let _this = this
            uni.showModal({
                confirmText:this.$t('common.确定'),
                cancelText:this.$t('common.取消'),
                content: this.$t('common.是否确定删除'),
                success(res) {
                    if (res.confirm) {
                        _this.$apis[_this.option.delName]({
                            [_this.option.delData.prop]: item[_this.option.delData.value]//当前列id
                        }).then((res) => {
                            _this.del(index)
                        }).catch((err) => {
                            _this.$u.toast(err || '删除失败')
                        })
                    }
                },
                fail() {
                }
            })
        },
        scroll: function (e) {//滚动事件
            this.old.scrollTop = e.detail.scrollTop
            this.getHeight()
        },
        del(index) {//删除
            this.list[index].animationName = 'delAni'
            this.list.splice(index, 1, this.list[index])
            setTimeout(() => {
                this.list.splice(index, 1)
                this.$u.toast(this.$t('common.删除成功'))
            }, 500);
        },
        getHeight() {//获取高度
            let _this = this;
            const query = uni.createSelectorQuery().in(this);
            query.select(".list").boundingClientRect((data) => {
                uni.getSystemInfo({
                    success(res) {
                        _this.autoHeight = res.windowHeight - data.top - 5 + 'px';
                    },
                });
            }).exec();
        },
        init() {//初始化数据
            this.page = 1;
            this.list = []
            this.status = 'loadmore';
            setTimeout(() => {
                this.getData()
            }, 0);//拉到js主线程栈
        },
        getData() {//获取列表数据
            if (this.status == 'loading' || this.status == 'nomore') return console.log('被status阻塞:' + this.status);
            this.status = 'loading';
            let data = {
                ...this.otherData,
                [this.option.page.page]: this.page,
                [this.option.page.pageRow]: this.pageRow,
            }
            this.$apis[this.option.getDataName](data).then((res) => {
                console.log(data, res, '获取list列表数据')
                let RetData = res.RetData || res.RetData1 || res
                this.$emit('getData', RetData)
                RetData = RetData?.data || RetData?.ItemData || RetData
                this.handlerItem(RetData)

                if (RetData.length) {
                    this.list.push(...RetData)
					//让父组件获取列表数据
					this.$emit('listData',this.list)
                    this.page++
                    this.status = 'loadmore';
                    if (RetData.length < this.pageRow) this.status = 'nomore';
                } else {
                    this.status = 'nomore';
                }
            }).catch((err) => {
                console.error(err);
                this.list = []
                this.status = 'nomore';
            }).finally(() => {

            })
        },
        // swipeChange(e, item) {
        //     console.log(item.fixedPropTag, e);
        //     item.fixedPropTag = e //修复fixed布局样式乱掉
        // }
    },
    mounted() {

    }
}
</script>
<style lang='scss' scoped>
.list {
    .clickable {
        background-color: #e0e0e0 !important;
        &::before,
        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 2px solid #0ab99c; //909399
            animation: clippath 3s infinite linear;
            border-radius: 10rpx;
        }
        &::after {
            border: 2px solid #0ab99c;
            animation: clippath 3s infinite -1.5s linear;
        }
        @keyframes clippath {
            0%,
            100% {
                clip-path: inset(0 0 98% 0);
            }

            25% {
                clip-path: inset(0 98% 0 0);
            }
            50% {
                clip-path: inset(98% 0 0 0);
            }
            75% {
                clip-path: inset(0 0 0 98%);
            }
        }
    }
    .listBox {
        background: #fff;
        border-radius: 10rpx;
        padding: 15rpx;
    }
    .uni-swipe {
        margin: 15rpx 0;
    }
    .delAni {
        animation: delAni 0.8s;
    }
    @keyframes delAni {
        0% {
            height: 100%;
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: translateX(100%);
        }
    }

    .placeholder {
        height: 80rpx;
    }
}
</style>
