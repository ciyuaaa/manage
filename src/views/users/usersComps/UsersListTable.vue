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
        <custom-dialog 
        title="修改用户信息"
        :dialogVisible="editVisible" 
        :prop="editDialog"
        :rules="rules"
        @submit="editSubmit"
        @close="editVisible = false" />
    </div>
</template>

<script>
import {updataUsersState, editUser, deleteUser} from "network/home.js"
import CustomDialog from "./CustomDialog.vue"
export default {
    name: "UsersListTable",
    components: {
        CustomDialog
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
            }
            
        }
    },
    methods: {
        async handleEdit(id) {
            this.editVisible = true
            const {data, meta} = await editUser(id)
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
                const {meta} = await deleteUser(user.id)
                this.$emit('update')
                this.$message.success(meta.msg)
            } catch(e) {
                this.$message.info('已取消删除')
            }
            
        },
        handleSet(user) {
            this.$emit('edit', user)
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
            let {meta} = await editUser(form.id, {
                method: "PUT",
                body: JSON.stringify(form)
            })

            if (meta.status !== 200) {
                return this.$message.error(meta.msg)
            }
            this.editVisible = false
            this.$emit('update')
            this.$message.success(meta.msg)
        }
    }
}
</script>