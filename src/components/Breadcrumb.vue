<template>
    <el-breadcrumb>
        <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in list" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    name: "Breadcrumb",
    props: {
        list: [],
    }
}
</script>