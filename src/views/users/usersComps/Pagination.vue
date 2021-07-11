<template>
    <el-pagination
        :total="usersInfo.total"
        :page-size="5"
        :page-sizes="[2, 5, 10]"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="usersInfo.pagenum"
        @size-change="sizeChange"
        @current-change="change">
    </el-pagination>
</template>

<script>
export default {
    name: "Pagination",
    props: {
        usersInfo: {}
    },
    methods: {
        change(current) {
            this.$emit("change", current)
        },
        sizeChange(size) {
            this.$emit("sizeChange", size)
        },
    }
}
</script>