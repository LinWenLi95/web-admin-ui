<template>
  <div class="div-main" style="width: 80%;margin-left: 5%;margin-top:2%;height: 90%;">
    <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="餐厅名" value="1"></el-option>
        <el-option label="订单号" value="2"></el-option>
        <el-option label="用户电话" value="3"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>

    <el-table :data="tableData" max-height="80%">
      <el-table-column prop="id" label="id" width="150">
      </el-table-column>
      <el-table-column prop="parentId" label="父ID" width="120"></el-table-column>
      <el-table-column prop="name" label="菜单名称" width="120"></el-table-column>
      <el-table-column prop="enname" label="英文名称" width="120"></el-table-column>
      <el-table-column prop="url" label="url" width="120"></el-table-column>
      <el-table-column prop="icon" label="icon" width="120"></el-table-column>
      <el-table-column prop="state" label="state" width="120"></el-table-column>
      <el-table-column prop="isDel" label="isDel" width="120"></el-table-column>
      <el-table-column prop="description" label="description" width="120"></el-table-column>
      <el-table-column prop="creatorId" label="创建人" width="120">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="120">
      </el-table-column>
      <el-table-column prop="updaterId" label="更新人" width="300">
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
            移除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        // 搜索框
        input1: '',
        input2: '',
        input3: '',
        select: '',
        // 分页
        total: 0,
        pageSize: 10,
        currentPage: 1,
        // table
        tableData: []
      }
    },
    created: function () {
      this.handleCurrentChange(1);
    },
    methods: {
      // table
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      // 分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.handleCurrentChange(1);
      },
      handleCurrentChange(val) {
        var that = this;
        //this代表vue对象，之前在入口文件中把axios挂载到了vue中，所以这里直接用this.$axios调用axios对象
        that.$axios({
          method: 'get',
          url: "/api/menus/?pageSize=" + that.pageSize + "&currentPage=" + that.currentPage,
          data: {}
        }).then(function (res) {
          var pageData = res.data.data;
          that.tableData = pageData.records;
          that.total = pageData.total;
          console.log(res);
        }).catch(function (err) {
          console.log(err);
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* 搜索框 */
  .el-select .el-input {
    width: 130px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .input-with-select {
    width: 30%;
  }
</style>