<template>
    <div class="login-container">
        <div class="login-box">
            <div class="avatar_box">
                <img src="../assets/img/logo/logo.png" alt="">
            </div>
            <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForm">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" >
                        <img class="icon" slot="prefix" src="../assets/img/login/user.svg" alt="">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" show-password>
                        <img class="icon" slot="prefix" src="../assets/img/login/password.svg" alt="">
                    </el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login('loginForm')">登录</el-button>
                    <el-button type="info" @click="reset('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- <el-button>默认按钮</el-button> -->
    </div>
</template>

<script>
import {loginRequest} from '../network/login'
export default {
    name: "login",
    data() {
        return {
            loginForm: {
                username: "",
                password: ""
            },
            rules: {
                username: [
                    {required: true, message: "请输入账号", trigger: 'blur'},
                ],
                password: [
                    {required: true, message: "请输入密码", trigger: "blur"},
                    {min: 6, message: "密码长度至少6位", trigger: 'blur'}
                ],
            }
        }
    },
    methods: {
        reset(formName) {
            this.$refs[formName].resetFields();
        },
        login(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    const url = new URLSearchParams(this.loginForm)
                    const {data: res, meta} = await loginRequest(url.toString())

                    if (meta.status === 200) {
                        sessionStorage.token = res.token
                        this.$message.success(meta.msg)
                        this.$router.push('/home')
                    } else {
                        this.$message.error(meta.msg)
                    }
                }
            })
        }
    }
}
</script>

<style scoped>
.login-container {
    height: 100%;
    background-color: #2b4b6b;
}
.login-box {
    width: 450px;
    height: 300px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 3px;
    background-color: #fff;
}
.avatar_box {
    width: 130px;
    height: 130px;
    padding: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #eee;
    border-radius: 50%;
    box-shadow: 0 0 10px #ddd;
    background-color: #fff;
}
.avatar_box > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
}
.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
}
.icon {
    width: 1.5em;
    height: 1.5em;
    vertical-align: middle;
}
.btns {
    display: flex;
    justify-content: flex-end;
}
</style>