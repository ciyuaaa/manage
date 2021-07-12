<template>
    <div>
        <el-table :data="usersInfo.usersList" border>
            <el-table-column label="#" type="index" :index="1" />
            <el-table-column prop="username" label="姓名" />
            <el-table-column prop="email" label="邮箱" />
            <el-table-column prop="mobile" label="手机" />
            <el-table-column prop="role_name" label="角色" />
            <el-table-column type="switch" prop="mg_state" label="状态">
                <template slot-scope="scope">
                    <el-switch
                    @change="_stateChange(scope.row)"
                    v-model="scope.row.mg_state"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="180">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope.row.id)" icon="el-icon-edit"></el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope.row)" icon="el-icon-delete"></el-button>
                    <el-button type="warning" size="small" @click="handleSet(scope.row)" icon="el-icon-setting"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <form-dialog 
        title="修改用户信息"
        :dialogVisible="editVisible" 
        :prop="editDialog"
        :rules="rules"
        @submit="editSubmit"
        @close="editVisible = false" />

        <el-dialog :visible.sync="setUserRoleVisible" title="分配角色" @close="closedSetUser">
            <el-row>
                <el-col>当前的用户: {{setUserRole.username}}</el-col>
            </el-row>
            <el-row>
                <el-col>当前的用户: {{setUserRole.role_name}}</el-col>
            </el-row>
            <el-row>
                <el-col>
                    <span>分配新角色：</span>
                    <el-select v-model="currentSelectRole">
                        <el-option v-for="item in rolesList" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
                    </el-select> 
                </el-col>
            </el-row>
            <span slot="footer">
                <el-button type="info" @click="setUserRoleVisible = false">退出</el-button>
                <el-button type="primary" @click="setRole">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
const Users = "users"
import {updataUsersState, del, edit, get, setUserRole} from "network/home.js"
import FormDialog from "components/FormDialog.vue"
export default {
    name: "UsersListTable",
    components: {
        FormDialog
    },
    props: {
        usersInfo: {},
        rules: {},
    },
    data() {
        return {
            editVisible: false,
            editDialog: {
                attr: [
                    {label: '用户名', prop: "username"},
                    {label: '邮箱', prop: "email"},
                    {label: '手机', prop: "mobile"},
                ],
                form: {},
            },
            setUserRoleVisible: false,
            setUserRole: {},
            rolesList: {},
            currentSelectRole: ""
        }
    },
    methods: {
        async handleEdit(id) {
            this.editVisible = true
            const {data, meta} = await edit(`${Users}/${id}`)
            if (meta.status !== 200) {
                return this.$message.error(meta.msg)
            }
            this.editDialog.form = data
        },
        async handleDelete(user) {
            try {
                await this.$confirm("此操作将永久删除该账户", "提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                const {meta} = await del(`${Users}/${user.id}`)
                this.$emit('update')
                this.$message.success(meta.msg)
            } catch(e) {
                this.$message.info('已取消删除')
            }
            
        },
        async handleSet(user) {
            this.setUserRoleVisible = true
            const {data} = await get('roles')
            this.rolesList = data
            this.setUserRole = user
            
        },
        async setRole() {
            const {data, meta} = await setUserRole(this.setUserRole.id, {
                rid: this.currentSelectRole
            })
            if (meta.status !== 200) return this.$message.error(meta.msg)
            this.$emit("update")
            this.setUserRoleVisible = false
            this.$message.success(meta.msg)
        },
        async _stateChange(user) {
            let {meta} = await updataUsersState(user.id, user.mg_state)
            if (meta.status === 200) {
                this.$message.success(meta.msg)
            } else {
                this.$message.error(meta.msg)
            }
        },
        async editSubmit(form) {
            let {meta} = await edit(`${Users}/${form.id}`, {
                method: "PUT",
                body: JSON.stringify(form)
            })

            if (meta.status !== 200) {
                return this.$message.error(meta.msg)
            }
            this.editVisible = false
            this.$emit('update')
            this.$message.success(meta.msg)
        },
        closedSetUser() {
            this.currentSelectRole = ''
        }
    }
}
</script>