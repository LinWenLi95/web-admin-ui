<template>
    <div>
        <img class="logo" src="../assets/logo.svg" />
        <div class="private-letter">
            <el-badge :value="3" class="item">
                <i class="el-icon-chat-line-square"></i>
            </el-badge>
        </div>
        <el-dropdown class="person">
            <img src="../assets/avatar.jpg" class="user-avatar" />
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人资料</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
    export default {
        name: "MyHeader"
    }
</script>
<style scoped>
    .logo {
        margin-top: 10px;
        width: 120px;
        height: 40px;
    }

    .person {
        margin-top: 10px;
        position: relative;
        float: right;
    }

    .private-letter {
        position: relative;
        float: right;
    }

    .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 20px;
    }
</style>