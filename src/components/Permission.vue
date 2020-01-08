<template>
    <div class="custom-tree-container">
        <el-tree :data="nodeList" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false">
            <span slot-scope="{ node, data }">
                <!-- 自定义内容 -->
                <span>{{ node.label }}
                        <el-button type="text" size="mini" @click="() => insertAfter(data, node)">
                                <span class="el-icon-circle-plus-outline"></span>
                            </el-button>
                    <el-button type="text" size="mini" @click="() => append(data)">
                        <span class="el-icon-circle-plus-outline"></span>
                    </el-button>
                    <el-button type="text" size="mini" @click="() => remove(node, data)">
                        <span class="el-icon-remove-outline"></span>
                    </el-button>
                </span>

            </span>
        </el-tree>
    </div>
</template>


<script>
    var id = 1000;
    var nodeData = new Array();
    nodeData[0] = {
        id: 1,
        label: '一级 1',
        children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
                id: 9,
                label: '三级 1-1-1'
            }, {
                id: 10,
                label: '三级 1-1-2'
            }]
        }]
    };
    nodeData[1] = {
        id: 2,
        label: '一级 2',
        children: [{
            id: 5,
            label: '二级 2-1'
        }, {
            id: 6,
            label: '二级 2-2'
        }]
    };
    nodeData[2] = {
        id: 3,
        label: '一级 3',
        children: [{
            id: 7,
            label: '二级 3-1'
        }, {
            id: 8,
            label: '二级 3-2'
        }]
    };
    export default {
        data() {
            return {
                nodeList: nodeData
            }
        },

        methods: {
            insertAfter(data, refNode) {
                var child = { id: 16, label: 'newNode', children: [] };
                refNode.insertAfter(data);
            },
            append(data) {
                var newChild = { id: id++, label: 'testtest', children: [] };
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                data.children.push(newChild);
            },

            remove(node, data) {
                var parent = node.parent;
                var children = parent.data.children || parent.data;
                var index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            }
        }
    };
</script>

<style>

</style>