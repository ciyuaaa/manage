<template>
    <div>
        <el-table :data='tableData' border stripe>
            <el-table-column type='expand'>
                <template slot-scope="scope">
                    <el-row :class='["bdbottom", index === 0 ? "bdtop" : ""]' v-for='(item, index) in scope.row.children' :key="index">
                        <el-col :span="5">
                            <el-tag closable @close="closeTag(scope.row, item.id)">{{item.authName}}</el-tag>
                            <i class="el-icon-caret-right"></i>
                        </el-col>
                        <el-col :span="19">
                            <el-row :class='[subIndex === 0 ? "" : "bdtop"]' v-for='(subItem, subIndex) in item.children' :key="subIndex">
                                <el-col :span="5">
                                    <el-tag type="success" closable @close="closeTag(scope.row, subItem.id)">{{subItem.authName}}</el-tag>
                                    <i class="el-icon-caret-right"></i>
                                </el-col>
                                <el-col :span="19">
                                    <el-tag type='warning' 
                                    v-for='subsItem in subItem.children' 
                                    :key="subsItem.id" closable @close="closeTag(scope.row, subsItem.id)">{{subsItem.authName}}</el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column label='#' type='index' :index='1'></el-table-column>
            <el-table-column label='角色名称' prop="roleName"></el-table-column>
            <el-table-column label='角色描述' prop="roleDesc"></el-table-column>
            <el-table-column label='操作'>
                <template slot-scope='scope'>
                    <el-button size="mini" type='primary' icon='el-icon-eidt' @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button size="mini" type='danger' icon='el-icon-delete' @click="handleDelete(scope.row.id)">删除</el-button>
                    <el-button size="mini" type='warning' icon='el-icon-setting' @click="handleRights(scope.row)">分配权限</el-button>
                </template>
            </el-table-column>
        </el-table>
        <form-dialog :prop='eidtRole'
        :rules="validateRules"
        :dialogVisible="eidtRoleVisible" 
        @close="dialogVisible = false"
        @submit="confirm"></form-dialog>
        
        <el-dialog :visible.sync="rightsSetVisible">
            <el-tree ref="tree"
            :data="rightsSet" 
            :props="defaultProps" 
            :default-checked-keys='defKeys' 
            show-checkbox 
            default-expand-all 
            node-key='id'/>
            <span slot="footer">
                <el-button type="info" @click="rightsSetVisible = false">退出</el-button>
                <el-button type="primary" @click="rightsSetConfirm">确定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import {del, edit,get, setRoleRights} from "network/home.js"
import FormDialog from "components/FormDialog"
export default {
    name: 'RolesTable',
    props: {
        tableData: []
    },
    components: {
        FormDialog,
    },
    data() {
        return {
            eidtRoleVisible: false,
            eidtRole: {
                attr: [
                    {label: "角色名称", prop: "roleName"},
                    {label: "角色描述", prop: "roleDesc"},
                ],
                form: {}
            },
             validateRules: {
                roleName: [
                    {required: true, message: '请输入角色名称', trigger: 'blur'}
                ]
            },
            rightsSetVisible: false,
            rightsSet: {},
            defaultProps: {
                children: "children",
                label: "authName"
            },
            defKeys: [],
            roleId: ""
        }
    },
    methods: {
        async handleDelete(id) {
            try {
                await this.$confirm("此操作将永久删除该角色", "提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                const {meta} = await del(`roles/${id}`)
                this.$emit('update')
                this.$message.success(meta.msg)
            } catch(e) {
                this.$message.info('已取消删除')
            }
        },
        async handleEdit(id) {
            const {data, meta} = await edit(`roles/${id}`)
            if (meta.status !== 200) return this.$message.error(meta.msg)
            this.eidtRole.form = data
            this.dialogVisible = true
        },
        async confirm(form) {
            console.log(form)
            const {meta} = await edit(`roles/${form.roleId}`, {
                method: "PUT",
                body: JSON.stringify(form)
            })
             if (meta.status !== 200) return this.$message.error(meta.msg)
             this.$emit('update')
             this.dialogVisible = false
             this.$message.success(meta.msg)
        },
        async closeTag(role, rightsId) {
            try {
                await this.$confirm("此操作将永久删除该权限", "提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                const {data, meta} = await del(`roles/${role.id}/rights/${rightsId}`)
                role.children = data
                this.$message.success(meta.msg)
            } catch(e) {
                this.$message.info('已取消删除')
            }
        },
        async handleRights(row) {
            this.roleId = row.id
            const {data} = await get("rights/tree")
            this.defKeys = []
            this.rightsSet = data
            this.getKeys(row, this.defKeys)
            this.rightsSetVisible = true
        },
        async rightsSetConfirm() {
            let arr = [
                ...this.$refs.tree.getHalfCheckedKeys(),
                ...this.$refs.tree.getCheckedKeys()
            ]
            const {meta} = await setRoleRights(this.roleId, {
                rids: arr.toString()
            })
            if (meta.status !== 200) return this.$message.error(meta.msg)
            this.$message.success(meta.msg)
            this.$emit('update')
            this.rightsSetVisible = false
        },
        getKeys(node, arr) {
            if (!node.children) {
                return arr.push(node.id)
            }
            node.children.forEach((item) => {
                this.getKeys(item, arr)
            })
        }
    }
}
</script>

<style scoped>
.el-row {
    display: flex;
    align-items: center;
}
.el-tag {
    margin: 7px;
}
.bdtop {
    border-top: 1px solid #eee;
}
.bdbottom {
    border-bottom: 1px solid #eee;
}
</style>