<template>
     <div>
         <el-dialog :visible.sync="visible" width="50%" :title="title">
            <el-form :model="prop.form" :rules="rules" ref="dialogForm">
                <el-form-item v-for="(item, index) in prop.attr" :key="index"
                :label='item.label' label-width="70px" :prop="item.prop">
                    <el-input v-model="prop.form[item.prop]" :disabled='item.disabled' :type='item.type || "text"'/>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button type="info" @click="close">退出</el-button>
                <el-button type="primary" @click="submit">确定</el-button>
            </span>
        </el-dialog>
     </div>
</template>

<script>
export default {
    name: "CustomDialog",
    props: {
        dialogVisible: false,
        title: "",
        prop: {},
        rules: {}
    },
    methods: {
        close() {
            this.$refs.dialogForm.resetFields()
            this.$emit('close')
        },
        submit() {
            this.$refs.dialogForm.validate((valid) => {
                if (valid) {
                    this.$emit("submit", this.prop.form)
                }
            })
        }
    },
    computed: {
        visible:{
            get() {
                return this.dialogVisible
            },
            set() {
                this.$emit("close")
            }
        }
    }
    
}
</script>