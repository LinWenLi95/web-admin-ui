<template>
    <el-container>

        <el-header>
            <MyHeader></MyHeader>
        </el-header>

        <el-container>

            <MyAside></MyAside>

            <el-main>
                <MyBreadcrumb></MyBreadcrumb>
                <router-view />
            </el-main>

        </el-container>
    </el-container>
</template>

<script>
    import MyHeader from '@/components/MyHeader'
    import MyAside from '@/components/MyAside'
    import MyBreadcrumb from '@/components/MyBreadcrumb'

    export default {
        name: "MyLayout",
        components: {
            MyAside,
            MyHeader,
            MyBreadcrumb
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-container {
        margin: 0px;
        height: 100%;
    }

    .el-main {
        padding: 0px;
    }
</style>