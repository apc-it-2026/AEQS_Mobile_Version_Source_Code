<template>
    <div class='login'>
        <div class="logo">
            <u--image class="logo" src="/static/logo_page.png" width='200rpx' height="200rpx" mode='scaleToFill'></u--image>
        </div>
        <u-button class="langBtn" @click="languageSelectShow=true" shape="circle" size="small" icon="arrow-down" hairline color="#3ec4ad" type="primary" :text="$t('login.语言切换')"></u-button>
        <languageSelect v-model="languageSelectShow"></languageSelect>

        <div class="wel">Welcome</div>
        <div class="content">
            <div class="form">
                <u-input class="item" placeholderStyle="color: #fff" prefixIcon="list" suffixIconStyle="color: #fff" prefixIconStyle="color: #fff" color="#fff" :placeholder="$t('login.请选择账套')" v-model="org.orgname" suffixIcon="arrow-down" readonly @click.native="orgShow=true" shape="circle"></u-input>
                <u-action-sheet :cancelText="$t('common.取消')" @select="selectClick" @close="orgShow=false" closeOnClickOverlay closeOnClickAction :actions="orgArr" :title="$t('login.选择账套')" :show="orgShow"></u-action-sheet>
                <u--input class="item" placeholderStyle="color: #fff" v-model="user" prefixIconStyle="color: #fff" color="#fff" clearable shape="circle" :placeholder="$t('login.请输入用户名')" prefixIcon="account"></u--input>
                <u-input class="item" placeholderStyle="color: #fff" v-model="password" prefixIconStyle="color: #fff" color="#fff" :password="!show" shape="circle" :placeholder="$t('login.请输入密码')" prefixIcon="lock">
                    <template slot="suffix">
                        <u-icon :name="!show?'eye-off':'eye-fill'" color="#fff" @click="show=!show"></u-icon>
                    </template>
                </u-input>
                <u-button class="item" @click="userLogin" :disabled="!user||!password||!org.org" :loading="loading" shape="circle" :text="$t('login.登录')" color="linear-gradient(to right, #30aebe, #009ad6)"></u-button>
                <div class="remember">
                    <u-checkbox-group @change="change">
                        <u-checkbox activeColor="#19be6b" labelColor="#fff" :checked="checked" :customStyle="{margin: '8px'}" :label="$t('login.记住密码')"> </u-checkbox>
                    </u-checkbox-group>
                </div>
            </div>
            <!-- <div class="tip">
                <div class="txt" @click="doing">忘记密码?</div>
                <div class="txt" @click="doing">快速注册</div>
            </div> -->
        </div>
    </div>
</template>
<script>
import md5 from "@/util/md5";

export default {
    name: 'login',
    data() {
        return {
            show: false,
            loading: false,
            user: "",
            password: "",
            checked: false,
            orgShow: false,
            languageSelectShow: false,
            orgArr: [],
            org: {}
        }
    },
    methods: {
        doing() {
            uni.$u.toast('开发中...')
        },
        change() {
            this.checked = !this.checked
            console.log(this.checked);
        },
        selectClick(row) {
            this.org = row
        },
        GetOrg() {
            this.$apis.GetOrg().then((res) => {
                console.log(res, '获取账套')
                this.orgArr = res.RetData
                this.orgArr.forEach((e, i) => {
                    e.name = e.orgname
                })
                try {
                    if (this.checked && uni.getStorageSync('org')) {
                        this.org = uni.getStorageSync('org') || {}
                    } else {
                        this.org = this.orgArr[0]
                    }
                } catch (error) {
                }
            }).catch((err) => {
                uni.$u.toast(this.$t('common.网络错误'))
            })
        },
        userLogin() {
            this.loading = true
            this.$apis.Login({
                "CompanyCode": this.org.org,
                "CompanyName": this.org.orgname,
                "UserCode": this.user,
                "UserPassword": md5.hex_md5(this.password).toUpperCase()
            }).then(res => {
                console.log(res, '登录');
                uni.setStorageSync('org', this.org || { org: '', orgname: '' })
                uni.setStorageSync('checked', this.checked || false)

                //是否记住密码
                if (this.checked) {
                    uni.setStorageSync('user', this.user || '')
                    uni.setStorageSync('password', this.password || '')
                } else {
                    uni.setStorageSync('user', "")
                    uni.setStorageSync('password', "")
                }
                uni.setStorageSync('UserToken', res.RetData.UserToken)
                uni.setStorageSync('imgUrl', res.RetData.uploadurl.replace('/api/commoncall', ''))
                uni.reLaunch({ url: '../index/index' })
            }).catch(err => {
                uni.$u.toast('出错了' + err)
            }).finally(() => {
                this.loading = false
            })
        }
    },
    onShow() {
    },

    onLoad() {
        this.user = uni.getStorageSync('user') || ''
        this.password = uni.getStorageSync('password') || ''
        this.checked = uni.getStorageSync('checked') || false
        this.GetOrg()
    },
}
</script>
<style lang='scss' scoped>
.login {
    background: url('~@/static/login.png') no-repeat;
    background-size: 100% 100%;
    // padding: 15rpx;
    color: #fff;
    min-height: 100vh;
    .langBtn {
        width: 200rpx;
        position: fixed;
        left: 5%;
        top: 5%;
    }
    // overflow: hidden;
    .logo {
        margin: 0 auto;
        // margin-top: 10vh;
        width: 200rpx;
        height: 200rpx;
        padding-top: 5vh;
    }
    .wel {
        font-size: 50rpx;
        width: 500rpx;
        margin: 0 auto;
        margin-top: 15vh;
        margin-bottom: 10rpx;
    }
    .content {
        width: 500rpx;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .form {
            width: 100%;
            margin-top: 20rpx;
            .item {
                margin-bottom: 30px;
            }
        }
        .tip {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 50rpx;
        }
    }
}
</style>