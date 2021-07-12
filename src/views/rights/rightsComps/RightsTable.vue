<template>
    <el-table :data="tableData" border>
        <el-table-column label="#" type="index" :index="1" />
        <el-table-column prop="authName" label="权限名称" />
        <el-table-column prop="path" label="路径" />
        <el-table-column prop="level" label="权限等级">
            <template slot-scope="scope">
                <el-tag v-if="scope.row.level === '0'">一级</el-tag>
                <el-tag type="success" v-else-if="scope.row.level === '1'" >二级</el-tag>
                <el-tag type="warning" v-else>三级</el-tag>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import {getRightsList} from 'network/home.js'
export default {
    name: 'RightsTable',
    data() {
        return {
            tableData: []
        }
    },
    created() {
        getRightsList().then((e) => {
            this.tableData = e.data
        })
    },
    methods: {
    }
}
</script>