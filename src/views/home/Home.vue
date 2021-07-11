<template>
    <el-container class="home-container">
        <el-header>
            <div>
                <img src="~assets/img/logo/logo.png" alt="">
                <span class="title">后台管理系统</span>
            </div>
            <el-button type="danger" @click="loginOut">退出登录</el-button>
        </el-header>
        <el-container>
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <el-button type='info' style="width:100%" @click="collapse">|||</el-button>
                <home-menu-item :menu-list="menuList" :collapse="isCollapse" />
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import HomeMenuItem from "./homeComps/HomeMenuItem.vue"
import {menus} from 'network/home.js'
export default {
    name: 'Home',
    components: {
        HomeMenuItem,
    },
    created() {
        this._getMenu()
    },
    data() {
        return {
            menuList: [],
            isCollapse: false
        }
    },
    methods: {
        loginOut() {
            sessionStorage.clear()
            this.$router.push('/login')
            this.$message.success('登出')
        },
        async _getMenu() {
            const {data, meta} = await menus()
            if (meta.status !== 200) {
                return this.$message.error(meta.msg)
            }
            this.menuList = data
            console.log(data)
        },
        collapse() {
            this.isCollapse = !this.isCollapse
        }
    }
}
</script>

<style scoped>
.el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 25px;
    font-weight: 700;
    color: #fff;
    background-color: #373041;
}
.el-header > div {
    display: flex;
    align-items: center;
}
.el-header img {
    width: 60px;
    height: 60px;
    padding-right: 15px;
}

.el-aside {
    background-color: #333744;
    transition: all .2s ease-out;
}

.el-main {
    background-color: #eaedf1;
}
.home-container {
    height: 100%;
}
</style>