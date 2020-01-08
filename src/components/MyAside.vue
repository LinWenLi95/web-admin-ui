<template>

        <el-aside>
            <!-- <i class="el-icon-s-promotion" @click="collapseStatus"></i> -->
            <el-menu class="aside-menu" :collapse="isCollapse" :unique-opened="uniqueOpened"
                :collapse-transition="collapseTransition" router>

                <el-submenu v-for="(item,index) in menuList" :key="index" v-if="item.parentId==0" :index="item.url">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span slot="title">{{item.name}}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item v-for="(item1,index1) in menuList" :key="index1" v-if="item1.parentId==item.id"
                            :index="item1.url" :route="item1.url">
                            {{item1.name}}
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>

        </el-aside>

</template>

<script>
    export default {
        name: "MyAside",
        data() {
            return {
                menuList: [
                    {
                        id: "1",
                        parentId: "0",
                        icon: "el-icon-s-promotion",
                        name: "权限管理",
                        url: "/1"
                    }
                ],
                isCollapse: false,
                uniqueOpened: true,
                collapseTransition: true,
                collapseBtnClick: true
            };
        },
        methods: {
            collapseStatus() {
                this.collapseBtnClick = this.isCollapse;
                this.isCollapse = !this.isCollapse;
            },
            collapseOpen() {
                if (this.collapseBtnClick) return;
                this.isCollapse = false;
            },
            collapseClose() {
                if (this.collapseBtnClick) return;
                this.isCollapse = true;
            }
        },
        created: function () {
            // 初始化菜单
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
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .aside-menu:not(.el-menu--collapse) {
        width: 200px;
        height: 100%;
        min-height: 400px;
    }
</style>