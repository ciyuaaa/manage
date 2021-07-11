<template>
    <div>
        <breadcrumb :list='["用户管理", "用户列表"]' />
        
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input
                    clearable
                    placeholder="请输入内容"  
                    class="input-with-select" 
                    v-model="usersInfo.query"
                    @clear="_getUsers">
                        <el-button 
                        slot="append" 
                        icon="el-icon-search" 
                        @click="_getUsers" 
                        />
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" 
                    class="add-user" 
                    @click="dialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <users-list-table 
                    :usersInfo="usersInfo" 
                    :rules="validateRules" 
                    @update="_getUsers" 
                    />
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <pagination 
                    :usersInfo="usersInfo" 
                    @change="change" 
                    @sizeChange="sizeChange" 
                    />
                </el-col>
            </el-row>
        </el-card>
        <custom-dialog
            :dialogVisible="dialogVisible" 
            :prop="addUser"
            title="添加用户"
            :rules="validateRules"
            @submit="_addUser"
            @close="dialogVisible = false"
        />
    </div>
</template>

<script>
import {users, addUser} from "network/home.js"
import Breadcrumb from "components/Breadcrumb.vue"
import Pagination from "./usersComps/Pagination.vue"
import CustomDialog from './usersComps/CustomDialog.vue'
import UsersListTable from "./usersComps/UsersListTable.vue"
export default {
    name: "Users",
    components: {
        Breadcrumb,
        Pagination,
        CustomDialog,
        UsersListTable,
    },
    created() {
        this._getUsers()
    },
    data() {
        const validateEmail = (rule, value, callback) => {
            if (!(value.includes("@") && value.includes('.com'))) {
                callback(new Error("请输入正确邮箱"))
            }
            callback()
        }
        const validateMobile = (rule, value, callback) => {
            if (value.length < 11 || value.length > 11) {
                callback(new Error('请输入11位手机号'))
            }
            callback()
        }
        return { 
            validateRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    {min: 3, max: 10, message: '用户名3~10个字符', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {min: 6, max: 15, message: '密码6~15位', trigger: 'blur'}
                ],
                email: [
                    {required: true, message: '请输入邮箱', trigger: 'blur'},
                    {validator: validateEmail, trigger: 'blur'}
                ],
                mobile: [
                    {required: true, message: '请输入手机号', trigger: 'blur'},
                    {validator: validateMobile, trigger: 'blur'}
                ]
            },
            usersInfo: {
                usersList: [],
                total: 0,
                query: "",
                pagenum: 1,
                pagesize: 5,
            },
            dialogVisible: false,
            addUser: {
                attr: [
                    {label: '用户名', prop: "username"},
                    {label: '密码', prop: "password", type: 'password'},
                    {label: '邮箱', prop: "email"},
                    {label: '手机', prop: "mobile"},
                ],
                form: {},
            }
        }
    },
    methods: {
        async _getUsers() {
            const {pagenum, pagesize, query} = this.usersInfo
            let {data, meta} = await users(pagenum, pagesize, query)
            if (meta.status === 200) {
                this.usersInfo.usersList = data.users
                this.usersInfo.total = data.total
            } else {
                this.$message.error(meta.msg)
            }
        },
         async _addUser(form) {
            let {meta} = await addUser(form)
            if (meta.status !== 201) {
                return this.$message.error(meta.msg)
            }
            this.dialogVisible = false
            this.$message.success(meta.msg)
            this._getUsers()
        },
        change(current) {
            this.usersInfo.pagenum = current
            this._getUsers()
        },
        sizeChange(size) {
            this.usersInfo.pagesize = size
            this._getUsers()
        },
        
    }
}
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
  }
</style>