<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
    export default {
        name: 'MyBreadcrumb',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-breadcrumb{
        margin: 20px;
    }
</style>