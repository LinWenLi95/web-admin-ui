<template>
  <div>
    <el-button @click="showDialog">点击显示对话框</el-button>
    <!-- 展示子组件通过事件向父组件传的值 -->
    {{retMsg}}
    <!-- 子组件 -->
    <!-- 子组件的三个属性绑定了父组件的数据（父组件通过props向子组件传值） -->
    <!-- 子组件对话框关闭时的回调函数使用 $emit 触发父组件的自定义事件（子组件通过触发自定义事件向父组件传值） -->
    <MyDialog :childTitle='parentTitle' :childContent="parentContent" :childDialogVisible="parentDialogVisible"
      @hideDialog="hideDialog"></MyDialog>
  </div>
</template>

<script>
  // 导入子组件
  import MyDialog from '@/components/MyDialog'

  export default {
    data() {
      return {
        // 声明变量并赋初值
        parentTitle: '',
        parentContent: '',
        parentDialogVisible: false,
        retMsg: ''
      }
    },
    components: {
      // 声明子组件
      MyDialog
    },
    methods: {
      // 显示对话框
      showDialog: function () {
        this.parentTitle = "哈哈哈哈哈";
        this.parentContent = "嘿嘿嘿嘿";
        this.parentDialogVisible = true;
      },
      // 隐藏对话框
      hideDialog: function (payLoad) {
        this.retMsg = payLoad;
        this.parentDialogVisible = false;
      }
    },
    created: function () {
      this.$axios({  //this代表vue对象，之前在入口文件中把axios挂载到了vue中，所以这里直接用this.$axios调用axios对象
        method: 'get',
        url: "/api/role/",
        data: {}
      }).then(function (res) {
        console.log(res);
      }).catch(function (err) {
        console.log(err);
      })

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>