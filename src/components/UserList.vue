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
      <el-button>刷新</el-button>
      <el-button>新增</el-button>
    </div>
    <!--数据表-->
    <el-table :data="tableData" max-height="80%" border resizable stripe>
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="telephone" label="手机号"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
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
          <el-button @click.native.prevent="infoRow(scope.$index, tableData)" type="text" size="small">
            详情
          </el-button>
          <el-button @click.native.prevent="editRow(scope.$index, tableData)" type="text" size="small">
            编辑
          </el-button>
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
            移除
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
    <el-dialog :title="operateTitle" :visible.sync="formDialogVisible">
      <span>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="form.telephone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email"></el-input>
          </el-form-item>

          <el-form-item label="创建时间">
            <el-col :span="11">
              <el-date-picker type="datetime" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="启用状态">
            <el-switch v-model="form.state"></el-switch>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item>
<!--            <el-button type="primary" @click="onSubmit">立即创建</el-button>-->
            <el-button>取消</el-button>
          </el-form-item>
<!--          <el-form-item label="活动区域">-->
<!--            <el-select v-model="form.region" placeholder="请选择活动区域">-->
<!--              <el-option label="区域一" value="shanghai"></el-option>-->
<!--              <el-option label="区域二" value="beijing"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!--删除确认对话框-->
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
                operateTitle: '标题',
                formDialogVisible: false,
                // form表单
                form:{
                  /**id*/
                  id:0,
                  /**用户名*/
                  username:'',
                  /**手机号*/
                   telephone:'',
                  /**邮箱*/
                   email:'',
                  /**状态 0禁用,1启动*/
                   state:0,
                  /**备注*/
                   description:'',
                  /**创建时间*/
                  createTime:0
                }
            }
        },
        created: function () {
            this.handleCurrentChange(1);
        },
        methods: {
            /*数据列表*/
            addRow(){

            },
            // 查看详情
            infoRow(index, rows) {
                this.operateTitle = "详情";
                this.formDialogVisible = true;
            },
            // 编辑
            editRow(index, rows) {
                this.operateTitle = "编辑";
                this.formDialogVisible = true;
            },
            // 移除单行
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },
            /*分页*/
            // 单页数量变更
            handleSizeChange(val) {
                this.pageSize = val;
                this.handleCurrentChange(1);
            },
            // 当前页码变更
            handleCurrentChange(val) {
                var that = this;
                //this代表vue对象，之前在入口文件中把axios挂载到了vue中，所以这里直接用this.$axios调用axios对象
                that.$axios({
                    method: 'get',
                    url: "/api/users/?pageSize=" + that.pageSize + "&currentPage=" + val,
                    data: {}
                }).then(function (res) {
                    var pageData = res.data.data;
                    that.tableData = pageData.records;
                    that.total = pageData.total;
                    console.log(res);
                }).catch(function (err) {
                    console.log(err);
                })
            },
            /*CRU对话框*/

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
