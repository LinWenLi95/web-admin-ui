<template>
  <div>
    <el-tree :data="data" node-key="id" :props="treeProps" @node-drag-end="handleDragEnd" @node-drop="handleDrop"
             draggable="draggable" :allow-drop="allowDrop">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <el-tooltip class="item" effect="dark" content="查看节点详情" placement="top">
                      <el-button type="text" size="mini" @click="() => info(node, data)">
                          详情
                      </el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="编辑节点" placement="top">
                      <el-button type="text" size="mini" @click="() => edit(node, data)">
                          编辑
                      </el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="删除节点" placement="top">
                      <el-button type="text" size="mini" @click="() => remove(node, data)">
                          删除
                      </el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="新增节点" placement="top">
                      <el-button type="text" size="mini" @click="() => append(data)">
                          新增
                      </el-button>
                  </el-tooltip>
                </span>
            </span>
    </el-tree>
    <MyForm :nodeId="nodeId" :nodeParentId="nodeParentId" :type="optType" :visible="dialogVisible"
            @hideDialog="hideDialog"></MyForm>
  </div>
</template>

<script>
    import MyForm from '@/components/MyForm'

    export default {
        data() {
            return {
                /*tree variable*/
                data: [],
                // 树节点属性对应data的属性
                treeProps: {
                    label: 'name',
                    children: 'children'
                },
                // 开启节点拖拽功能
                draggable: true,
                // 默认展开所有节点
                defaultExpandAll: true,
                /*dialog variable*/
                // 是否显示dialog
                dialogVisible: false,
                // 树节点id
                nodeId: 1,
                // 树节点父id
                nodeParentId: 0,
                // 操作类型：0create 1read 2update 3del
                TYPES: {
                    CREATE: 0,
                    READ: 1,
                    UPDATE: 2,
                    DELETE: 3
                },
                // 当前操作类型
                optType: 1

            };
        },
        components: {
            MyForm
        },
        methods: {
            // 拖拽结束时执行的操作
            handleDragEnd(draggingNode, dropNode, dropType, ev) {
                // 1.父节点不能为null
                // 2.父节点不能是自身
                // 3.dropType不能为none
                if (dropNode != null && draggingNode.data.id != dropNode.data.id && dropType != 'none') {
                    // 获取节点的parentId
                    var parentId;
                    switch (dropType) {
                        case 'before':
                        case 'after':
                            parentId = dropNode.data.parentId;
                            break;
                        case 'inner':
                            parentId = dropNode.data.id;
                            break;
                        default:
                            parentId = dropNode.data.id;
                            break;
                    }
                    // 更新节点的parentId
                    var that = this;
                    that.$axios({
                        method: 'put',
                        url: "/api/menus/menuTrees",
                        data: {"id": draggingNode.data.id, "parentId": parentId}
                    }).then(function (res) {
                        if (res.data.code == 200) {
                            that.$message({
                                message: '更新菜单节点成功',
                                type: 'success'
                            });
                        }
                    }).catch(function (err) {
                        that.$message.error('发生错误', err);
                    })
                    console.log("父id：", parentId);
                    console.log('tree drag end: ', dropNode && dropNode.label, dropType);
                }
            },
            // 拖拽成功 被拖拽节点对应的 Node、结束拖拽时最后进入的节点、被拖拽节点的放置位置（before、after、inner）、event
            handleDrop(draggingNode, dropNode, dropType, ev) {
                console.log('tree drop: ', dropNode.label, dropType);
            },
            // 拖拽时是否可放置
            allowDrop(draggingNode, dropNode, type) {
                // 同级不可放置
                var sameLevel = draggingNode.data.parentId === dropNode.data.parentId;
                return !(sameLevel && type != 'inner');
            },
            // 新增
            append(data) {
                // 树节点id
                this.nodeId = data.id;
                // 树节点父id
                this.nodeParentId = data.parentId;
                // 操作类型：0create 1read 2update
                this.optType = this.TYPES.CREATE;
                // 显示dialog
                this.dialogVisible = true;
                // const newChild = { id: id++, label: 'testtest', children: [] };
                // if (!data.children) {
                //     this.$set(data, 'children', []);
                // }
                // data.children.push(newChild);
            },
            edit(node, data) {
                this.nodeId = data.id;
                this.nodeParentId = data.parentId;
                this.optType = this.TYPES.UPDATE;
                this.dialogVisible = true;
            },
            remove(node, data) {
                this.nodeId = data.id;
                this.optType = this.TYPES.DELETE;
                // TODO 删除
            },
            info(node, data) {
                this.nodeId = data.id;
                this.optType = this.TYPES.READ;
                this.dialogVisible = true;
            },
            // dialog关闭的回调方法
            hideDialog: function (payLoad) {
                this.dialogVisible = payLoad;
            }
        },
        created: function () {
            var that = this;
            //this代表vue对象，之前在入口文件中把axios挂载到了vue中，所以这里直接用this.$axios调用axios对象
            that.$axios({
                method: 'get',
                url: "/api/menus/menuTrees",
                data: {}
            }).then(function (res) {
                if (res.data.code == 200) {
                    that.$message({
                        message: '获取菜单节点成功',
                        type: 'success'
                    });
                    that.data = res.data.data;
                }
            }).catch(function (err) {
                that.$message.error('发生错误');
            })
        }
    };
</script>

<style scoped>
</style>
