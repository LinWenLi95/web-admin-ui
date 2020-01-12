<template>
  <div style="width: 100%;height: 100%;">
    <el-tree :data="treeData" node-key="id" :props="treeProps" @node-drag-end="handleDragEnd" @node-drop="handleDrop"
             draggable="draggable" :allow-drop="allowDrop" :default-expand-all="defaultExpandAll" :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }" @mouseenter="mouseenter(data)" @mouseleave="mouseleave()">
                <span>{{ node.label }}</span>
                <span v-show="data.id===mouseIn">
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

    <!--CRU对话框-->
    <el-dialog :title="operateTitle" :visible.sync="formDialogVisible" @close="formClean" :width="dialogWidth">
      <span v-if="operateType !== operateTypes.REMOVE">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="id">
              <el-input v-model="form.id"></el-input>
          </el-form-item>
          <el-form-item label="父节点id">
              <el-input v-model="form.parentId"></el-input>
          </el-form-item>
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
      <!--删除确认对话框-->
      <span v-if="operateType === operateTypes.REMOVE">
        确认删除所选数据？
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit"
                   v-if="operateType != operateTypes.INFO">{{confirmName}}</el-button>
        <el-button @click="formDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        treeData: [],
        // 树节点属性对应data的属性
        treeProps: {
          label: 'name',
          children: 'children'
        },
        // 开启节点拖拽功能
        draggable: true,
        // 默认展开所有节点
        defaultExpandAll: true,
        mouseIn:0,

        // CRU对话框
        dialogWidth: '',
        formDialogVisible: false,
        operateTitle: '标题',
        operateType: 0,
        // 操作类型： INFO 详情 ADD 新增 EDIT 更新 REMOVE 删除
        operateTypes: {
          INFO: 0,
          ADD: 1,
          EDIT: 2,
          REMOVE: 3
        },
        confirmName: '确认按钮名称',
        // form表单
        form: {
          /**id*/
          id: 0,
          parentId: 0,
          /**菜单名*/
          name: '',
          enname: '',
          /**路由url*/
          url: '',
          /**菜单图标样式*/
          icon: '',
          /**状态 0禁用,1启动*/
          state: 0,
          /**备注*/
          description: ''
        },
      };
    },
    created: function () {
      this.initTree();
    },
    methods: {
      // 初始化树结构数据
      initTree() {
        var that = this;
        //this代表vue对象，之前在入口文件中把axios挂载到了vue中，所以这里直接用this.$axios调用axios对象
        that.$axios({
          method: 'get',
          url: "/api/menus/menuTrees",
          data: {}
        }).then(function (res) {
          if (res.data.code === 200) {
            that.treeData = res.data.data;
            that.$message.success("获取菜单节点成功");
          }
        }).catch(function (err) {
          that.$message.error('发生错误');
        })
      },
      // 拖拽结束时执行的操作
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        // 1.父节点不能为null
        // 2.父节点不能是自身
        // 3.dropType不能为none
        if (dropNode != null && draggingNode.data.id !== dropNode.data.id && dropType !== 'none') {
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
      // 拖拽时同级不可放置
      allowDrop(draggingNode, dropNode, type) {
        // 同级不可放置
        var sameLevel = draggingNode.data.parentId === dropNode.data.parentId;
        return !(sameLevel && type !== 'inner');
      },
      /*数据列表操作*/
      // 详情
      info(node, data) {
        this.edit(node, data);
        this.operateTitle = "详情";
        this.operateType = this.operateTypes.INFO;
      },
      // 新增
      append(data) {
        this.dialogWidth = '50%';
        this.operateTitle = "新增";
        this.confirmName = "新增";
        this.operateType = this.operateTypes.ADD;
        this.formDialogVisible = true;
        this.form.parentId = data.parentId;
      },
      // 编辑
      edit(node, data) {
        this.dialogWidth = '50%';
        this.operateTitle = "编辑";
        this.confirmName = "保存更新";
        this.operateType = this.operateTypes.EDIT;
        this.formDialogVisible = true;
        // 树节点id
        this.form.id = data.id;
        var that = this;
        that.$axios({
          method: 'get',
          url: "/api/menus/" + data.id,
          data: {}
        }).then(function (res) {
          that.form = res.data.data;
        }).catch(function (err) {
          console.log(err);
          that.$message({
            showClose: true,
            message: err.data.msg,
            type: 'error'
          });
        });
      },
      // 移除单行
      remove(node, data) {
        this.dialogWidth = '20%';
        this.operateTitle = "提示";
        this.confirmName = "删除";
        this.operateType = this.operateTypes.REMOVE;
        this.form.id = data.id;
        this.formDialogVisible = true;
      },
      /*CUD对话框*/
      onSubmit() {
        // 确认请求类型
        var $method = 'GET';
        var $url = "/api/menus/";
        switch (this.operateType) {
          case this.operateTypes.INFO:
            $method = "GET";
            $url = $url + this.form.id;
            break;
          case this.operateTypes.ADD:
            $method = "POST";
            break;
          case this.operateTypes.EDIT:
            $method = "PUT";
            break;
          case this.operateTypes.REMOVE:
            $method = "DELETE";
            $url = $url + this.form.id;
            break;
        }
        // 发起请求
        var that = this;
        that.$axios({
          method: $method,
          url: $url,
          data: this.form
        }).then(function (res) {
          console.log(res);
          that.initTree();
          that.$message.success("操作成功");
        }).catch(function (err) {
          console.log(err);
          that.$message.error("操作失败");
        });
        that.formDialogVisible = false;
      },
      // 清空form数据
      formClean() {
        this.form = {
          /**id*/
          id: 0,
          /**用户名*/
          username: '',
          password: '',
          /**手机号*/
          telephone: '',
          /**邮箱*/
          email: '',
          /**状态 0禁用,1启动*/
          state: 0,
          /**备注*/
          description: ''
        }
      },
      mouseenter(data){
        this.mouseIn = data.id;
      },
      mouseleave(){
        this.mouseIn = 0;
      }
    },
    watch: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
