<template>
    <el-menu :unique-opened="true" 
    background-color="#333744" 
    text-color="#fff"
    :collapse="collapse"
    :collapse-transition='false'
    :router="true"
    :default-active="activePath"
    >
        <el-submenu 
        v-for="(item, index) in menuList" 
        :index='`${index}`' 
        :key="index">
            <template slot="title">
                <i :class="iconfontClass[index]"></i>
                <span>{{item.authName}}</span>
            </template>
            <el-menu-item 
            :index="subItem.path" 
            v-for="(subItem, subIndex) in item.children" 
            :key="subIndex"
            @click="saveActive(subItem.path)">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>{{subItem.authName}}</span>
                    </template>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>
<script>
export default {
    name: "HomeMenuItem",
    props: {
        menuList: [],
        collapse: false,
    },
    created() {
        this.activePath = sessionStorage.activePath
        window.addEventListener('popstate', (e) => {
            let isActive = this.menuList.some((item) => {
                return item.children.some((subItem) => {
                    if (location.href.includes(subItem.path)) {
                        sessionStorage.activePath = subItem.path
                        this.activePath = subItem.path
                        return true
                    } 
                })
            })
            if (!isActive) {
                this.activePath = ""
            }
        })
    },
    data() {
        return {
            iconfontClass: [
                "iconfont icon-user-manage",
                "iconfont icon-guanli0127yihuifu-48",
                "iconfont icon-goods",
                "iconfont icon-tongji",
                "iconfont icon-tuceng",
            ],
            activePath: ''
        }
    },
    methods: {
        saveActive(activePath) {
            sessionStorage.activePath = activePath
        }
    }
}
</script>
<style scoped>
.el-menu {
    border: none;
}
.el-menu-item {
    display: flex;
    align-items: center;
}
.iconfont {
    margin-right: 10px;
}
</style>