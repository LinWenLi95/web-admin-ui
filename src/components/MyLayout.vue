<template>
    <el-container>

        <el-header>
            <img class="logo" src="../assets/logo.svg" @click="toHome" />
            <i class="el-icon-s-promotion" @click="handleCollapse"></i>
            <el-button @click="show3 = !show3">Click Me</el-button>
            <!-- <div class="private-letter">
                <el-badge :value="3" class="item">
                    <i class="el-icon-chat-line-square"></i>
                </el-badge>
            </div> -->
            <el-dropdown class="person">
                <img src="../assets/avatar.jpg" class="user-avatar" />admin
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人资料</el-dropdown-item>
                    <el-dropdown-item>修改密码</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>

        <el-container>
            <el-aside class="elAside" v-show="show3" ref="elAside">
                <el-menu class="aside-menu" :unique-opened="uniqueOpened" :router="router" @open="collapseOpen"
                    ref="elMenu" @close="collapseClose" :collapse="isCollapse" :default-active="defaultActive"
                    @select="handleSelect">
                    <el-submenu v-for="(item,index) in menuList" :key="index" v-if="item.parentId==0" :index="item.url">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{item.name}}</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item1,index1) in menuList" :key="index1"
                                v-if="item1.parentId==item.id" :index="item1.url" :route="item1.url">
                                {{item1.name}}
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>

                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item @click="toHome" :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index">{{breadcrumb[index]}}
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <label>{{defaultActive}}</label>
                TODO : <br />
                1. 菜单-面包屑 关联显示 √<br />
                2. 菜单缩小，主界面同步变大<br />
                3. 菜单图标跳转首页 √<br />
                4. 个人图标的下选功能 修改密码、退出登录、编辑个人资料、已读未读消息预留位置等<br />
                5. 菜单树完善：拖拽节点（已完成）、编辑节点、新增节点、删除节点<br />
                6. 权限列表crud<br />
                7. 角色列表c（关联权限）ru（修改所关联的权限）d（逻辑删除）<br />
                8. 用户列表crud及用户指定角色 一用户可设置多角色<br />
                9. 登录页面<br />

                <router-view />
            </el-main>

        </el-container>
    </el-container>
</template>

<script>

    export default {
        name: "MyLayout",
        data() {
            return {
                // 菜单数据
                menuList: [
                    {
                        id: "1",
                        parentId: "0",
                        icon: "el-icon-s-promotion",
                        name: "权限管理",
                        url: "/"
                    }
                ],
                // 菜单 开合状态
                isCollapse: false,
                // 菜单 只保持一个子菜单的展开
                uniqueOpened: true,
                // 菜单 在激活导航时以 index 作为 path 进行路由跳转
                router: true,
                // 菜单 当前激活菜单的 index
                defaultActive: '1',
                // 面包屑文字
                breadcrumb: [],
                show3: true
            };
        },
        methods: {
            // 菜单 开合状态控制事件
            handleCollapse() {
                this.isCollapse = !this.isCollapse;
            },
            // 初始化菜单
            asideInit() {
                var that = this;
                that.$axios({
                    method: 'get',
                    url: "/api/menus/",
                    data: {}
                }).then(function (res) {
                    if (res.data.code == 200) {
                        that.menuList = res.data.data.records;
                        that.$message({
                            message: '菜单列表获取成功',
                            type: 'success'
                        });
                    }
                }).catch(function (err) {
                    that.$message.error('发生错误', err);
                })
            },
            // 菜单 激活回调（面包屑文字变更）
            handleSelect(index, indexPath) {
                // 设置count，保证不执行多余循环
                var count = 0;
                this.menuList.forEach(element => {
                    if (count == 2) {
                        return;
                    }
                    if (element.url === indexPath[0]) {
                        this.breadcrumb[0] = element.name;
                        count++;
                    } else if (element.url === indexPath[1]) {
                        this.breadcrumb[1] = element.name;
                        count++;
                    }
                });
            },
            // 路由跳转到/
            toHome() {
                console.log('哈哈1 ', this.$refs.elMenu.$el.clientWidth);
                var $elAside = document.getElementsByClassName('elAside');
                console.log('tag', $elAside.width)
                $elAside.width = this.$refs.elMenu.$el.clientWidth;
                console.log('tag', $elAside.width)
                console.log('哈哈2 ', this.$refs.elAside.$el.clientWidth);
                console.log('哈哈3 ', this.$refs['elAside'].width);
                // this.$refs['elAside'].width = this.$refs['elMenu'].width;
                if (this.$route.path != '/') {
                    this.$router.replace('/');
                }
            },
            // aside开合
            collapseOpen() {
                alert("开");
            },
            collapseClose() {
                alert("闭");
            }
        },
        created: function () {
            this.asideInit();
        },
        watch: {
            '$route.path': function (newVal, oldVal) {
                if (newVal === '/' && oldVal != '/') {
                    this.breadcrumb = [];
                }
            }
        },

    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /* container css start */
    .el-container {
        margin: 0px;
        height: 100%;
    }

    .el-main {
        padding: 0px;
    }

    /* container css end */
    /* header css start */
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

    /* .private-letter {
        position: relative;
        float: right;
    } */

    .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 20px;
    }

    /* header css end */
    /* aside css start */
    .aside-menu:not(.el-menu--collapse) {
        width: 200px;
        height: 100%;
        min-height: 400px;
    }

    /* aside css end */
    /* main css start */
    .el-breadcrumb {
        margin: 20px;
    }

    /* main css end */
</style>