<template>
    <div>
        <el-button type="danger" @click="loginOut">退出登录</el-button>
    </div>
</template>

<script>
export default {
    name: 'Home',
    methods: {
        loginOut() {
            sessionStorage.clear()
            this.$router.push('/login')
            this.$message.success('登出')
        }
    }
}
</script>