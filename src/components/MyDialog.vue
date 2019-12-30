<template>
    <!-- ElementUI对话框 此处的title是el-dialog的属性，title绑定props里的childTitle(父组件传入的值) -->
    <el-dialog :title="childTitle" :visible.sync="childDialogVisible" @close="hideDialog">
        {{childContent}}
    </el-dialog>
</template>

<script>
    export default {
        // props：父组件传入的值
        props: {
            'childTitle': {
                type: String,
                default: "标题"
            },
            'childContent': {
                type: String,
                default: '内容'
            },
            'childDialogVisible': {
                type: Boolean,
                default: false
            }
        },
        methods: {
            // 关闭对话框的回调函数
            hideDialog: function () {
                // 使用$emit触发父组件的自定义事件
                this.$emit('hideDialog', "这条是关闭对话框触发的回调函数的返回值")
            }
        },
        data() {
            return {
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>