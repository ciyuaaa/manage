<template>
    <div>
        <breadcrumb :list='["权限管理", "权限列表"]' />
        <el-card>
            <rights-table></rights-table>
        </el-card>
    </div>
</template>

<script>
import Breadcrumb from 'components/Breadcrumb'
import RightsTable from './rightsComps/RightsTable.vue'
export default {
    name: "Rights",
    components: {
        Breadcrumb,
        RightsTable,
    }
}
</script>