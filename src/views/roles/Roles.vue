<template>
    <div>
        <breadcrumb :list='["权限管理", "角色列表"]'></breadcrumb>
        <el-card border>
            <el-row>
                <el-col>
                    <el-button type='primary' @click="dialogVisible = true">添加角色</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <roles-table :tableData="d" @update="_get"></roles-table>
                </el-col>
            </el-row>
        </el-card>
        <form-dialog title='添加角色' 
        :prop="addRole" 
        :dialogVisible="dialogVisible" 
        :rules="validateRules"
        @close="dialogVisible = false" 
        @submit="_addRole"></form-dialog>
    </div>
</template>

<script>
import {getRoles, add, get} from 'network/home.js'
import Breadcrumb from 'components/Breadcrumb'
import FormDialog from 'components/FormDialog'
import RolesTable from './rolesComps/RolesTable.vue'
export default {
    name: 'Roles',
    components: {
        Breadcrumb,
        FormDialog,
        RolesTable
    },
    data() {
        return {
            d: [],
            dialogVisible: false,
            addRole: {
                attr: [
                    {label: '角色名称', prop: 'roleName', lw: '100px'},
                    {label: '角色描述', prop: 'roleDesc', lw: '100px'}
                ],
                form: {}
            },
            validateRules: {
                roleName: [
                    {required: true, message: '请输入角色名称', trigger: 'blur'}
                ]
            }
        }
    },
    created() {
        this._get()
    },
    methods: {
        async _get() {
            const {data, meta} = await get('roles')
            this.d = data
        },
        async _addRole(form) {
            const {meta} = await add("roles", form)
            this.dialogVisible = false
            if (meta.status !== 201) return this.$message.error(meta.msg)
            this._get()
            this.$message.success(meta.msg)
        }
    }
}
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
}
</style>