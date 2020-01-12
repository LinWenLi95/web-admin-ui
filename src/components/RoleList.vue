<template>
  <div class="div-main" style="width: 100%;height: 100%;">
    <!--搜索框-->
    <div>
      <el-input placeholder="请输入内容" v-model="conditionContent" class="input-with-select">
        <el-select v-model="conditionSelect" slot="prepend" placeholder="请选择">
          <el-option label="用户名" value="1"></el-option>
          <el-option label="手机号" value="2"></el-option>
          <el-option label="邮箱" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button @click="handleCurrentChange(1)">刷新</el-button>
      <el-button @click="addRow">新增</el-button>
    </div>
    <!--数据表-->
    <el-table :data="tableData" max-height="80%" border resizable stripe height="600">
      <el-table-column prop="id" label="角色id"></el-table-column>
      <el-table-column prop="name" label="中文名称"></el-table-column>
      <el-table-column prop="enname" label="英文名称"></el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state===1" type="success">启用</el-tag>
          <el-tag v-if="scope.row.state===0" type="info">未启用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="备注"></el-table-column>
      <el-table-column prop="createTime" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.createTime | dateformat()}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click.native.prevent="editRow(scope.$index, tableData)" type="text" size="small">
            编辑
          </el-button>
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
            移除
          </el-button>
          <el-button @click.native.prevent="editRow(scope.$index, tableData)" type="text" size="small">
            分配权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页控件-->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :total="total" :page-size="pageSize" :current-page="currentPage"
                   :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>

    <!--CRU对话框-->
    <el-dialog :title="operateTitle" :visible.sync="formDialogVisible" @close="formClean" :width="dialogWidth">
      <span v-if="operateType !== operateTypes.REMOVE">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="角色名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="英文名称">
            <el-input v-model="form.enname"></el-input>
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
                   v-if="operateType !== operateTypes.INFO">{{confirmName}}</el-button>
        <el-button @click="formDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        // 搜索框
        conditionContent: '',
        conditionSelect: '',
        // 分页
        total: 0,
        pageSize: 10,
        currentPage: 1,
        // 数据表
        tableData: [],
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
          /**角色中文名称*/
          name: '',
          enname: '',
          /**状态 0禁用,1启动*/
          state: 0,
          /**备注*/
          description: ''
        },
      };
    },
    created: function () {
      this.handleCurrentChange(this.currentPage);
    },
    methods: {
      // 对话框显示步骤
      // 1.获取渲染数据
      // 2.进行页面渲染
      // 3.显示对话框

      /*数据列表操作*/
      // 查看详情
      infoRow(index, rows) {
        this.dialogWidth = '50%';
        this.operateTitle = "详情";
        this.operateType = this.operateTypes.INFO;
        this.formDialogVisible = true;
      },
      // 新增
      addRow() {
        this.dialogWidth = '50%';
        this.operateTitle = "新增";
        this.confirmName = "新增";
        this.operateType = this.operateTypes.ADD;
        this.formDialogVisible = true;
      },
      // 编辑
      editRow(index, rows) {
        this.dialogWidth = '50%';
        this.operateTitle = "编辑";
        this.confirmName = "保存更新";
        this.operateType = this.operateTypes.EDIT;
        this.formDialogVisible = true;
        var that = this;
        that.$axios({
          method: 'get',
          url: "/api/roles/" + rows[index].id,
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
      deleteRow(index, rows) {
        this.dialogWidth = '20%';
        this.operateTitle = "提示";
        this.confirmName = "删除";
        this.operateType = this.operateTypes.REMOVE;
        this.form.id = rows[index].id;
        this.formDialogVisible = true;
      },
      /*分页*/
      // 单页数量变更
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.currentPage = 1;
        this.handleCurrentChange(this.currentPage);
      },
      // 当前页码变更
      handleCurrentChange(currentPage) {
        this.tableLoading = true;
        this.currentPage = currentPage;
        var that = this;
        //this代表vue对象，之前在入口文件中把axios挂载到了vue中，所以这里直接用this.$axios调用axios对象
        that.$axios({
          method: 'get',
          url: "/api/roles/?pageSize=" + that.pageSize + "&currentPage=" + currentPage,
          data: {}
        }).then(function (res) {
          var pageData = res.data.data;
          that.tableData = pageData.records;
          that.total = pageData.total;
          console.log(res);
        }).catch(function (err) {
          console.log(err);
        })
        this.tableLoading = false;
      },
      /*CUD对话框*/
      onSubmit() {
        // 确认请求类型
        var $method = 'GET';
        var $url = "/api/roles/";
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
          that.handleCurrentChange(that.currentPage);
          that.$message.success("操作成功");
        }).catch(function (err) {
          console.log(err);
          that.$message.error("操作成功");
        });
        that.formDialogVisible = false;
      },
      // 清空form数据
      formClean() {
        this.form = {
          /**id*/
          id: 0,
            /**角色中文名称*/
            name: '',
            enname: '',
            /**状态 0禁用,1启动*/
            state: 0,
            /**备注*/
            description: ''
        }
      }
    },
    watch: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* 搜索框 */
  .el-select {
    width: 100px;
  }

  .input-with-select {
    width: 400px;

  }

  /* 数据表 */
  .el-table {
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
