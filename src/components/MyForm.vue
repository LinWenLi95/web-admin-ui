<template>
    <div>
        <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

        <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" @open="handleOpen"
            :before-close="handleClose" @close="hideDialog">
            <span>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="中文名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="英文名称">
                        <el-input v-model="form.enname"></el-input>
                    </el-form-item>
                    <el-form-item label="url地址">
                        <el-input v-model="form.url"></el-input>
                    </el-form-item>
                    <el-form-item label="图标样式">
                        <el-input v-model="form.icon"></el-input>
                    </el-form-item>
                    <el-form-item label="是否启用">
                        <el-select v-model="form.state" placeholder="请选择是否启用">
                            <el-option label="启动" value="1"></el-option>
                            <el-option label="禁用" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="form.description"></el-input>
                    </el-form-item>
                </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button v-if="type!=1" type="primary" @click="onSubmit">确 定</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        props: {
            // 节点id
            nodeId: Number,
            // 节点父id
            nodeParentId: Number,
            // 弹窗类型：0create 1read 2update
            type: Number,
            // 是否显示
            visible: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                form: {
                    id: null,
                    parentId: null,
                    name: '',
                    enname: '',
                    url: '',
                    icon: '',
                    state: null,
                    description: ''
                },
                // dialog
                title: '',
                dialogVisible: false
            }
        },
        watch: {
            visible(newName, oldName) {
                this.dialogVisible = newName;
            }
        },
        methods: {
            // 开启时判断是否查询
            handleOpen() {
                switch (this.type) {
                    case 0:
                        this.title = "新增菜单";
                        this.form.parentId = this.nodeId;
                        break;
                    case 1:
                        this.title = "菜单详情"
                        break;
                    case 2:
                        this.title = "编辑菜单";
                        this.form.id = this.nodeId;
                        this.form.parentId = this.nodeParentId;
                        break;
                }
                if (this.type === 1) {
                    var $url = "/api/menus/" + this.nodeId;
                    var $method = 'get';
                    var $optName = '查询';
                    this.axios($url, $method, null, $optName);
                }
            },
            // 新增/更新
            onSubmit() {
                var $url = "/api/menus/";
                // 请求方式
                var $method = '';
                // 操作名称
                var $optName;
                this.form.parentId = this.form.id;
                var $data = this.form;
                // create
                if (this.type === 0) {
                    $method = 'post';
                    $optName = '新增'
                } else
                    // update
                    if (this.type === 2) {
                        $method = 'put';
                        $optName = '更新'
                    }
                // 有匹配项时发起请求
                if ($method != '') {
                    this.axios($url, $method, $data, $optName);
                }
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => { });
            },
            // 关闭对话框的回调函数
            hideDialog: function () {
                // 使用$emit触发父组件的自定义事件
                this.$emit('hideDialog', false)
            },
            // 请求
            axios(url, method, data, optName) {
                var that = this;
                //this代表vue对象，之前在入口文件中把axios挂载到了vue中，所以这里直接用this.$axios调用axios对象
                that.$axios({
                    method: method,
                    url: url,
                    data: data
                }).then(function (res) {
                    if (res.data.code == 200) {
                        that.$message({
                            message: optName + '成功',
                            type: 'success'
                        });
                        // that.form = res.data.data;
                        that.dialogVisible = false;
                    }
                }).catch(function (err) {
                    that.$message.error(optName + '操作发生错误');
                })
            }
        }
    }
</script>

<style scoped>
</style>