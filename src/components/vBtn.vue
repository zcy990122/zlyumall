
<template>
  <!-- 29.封装删除组件 -->
  <el-button type="danger" @click="del"
  size="small"
  >删除</el-button>
</template>

<script>
export default {
  methods: {
    del() {
      this.$confirm("你确定要删除吗？", "删除提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //31.通知父组件，点了确定
          this.$emit("confirm");
        })
        .catch(() => {
          console.log("未知错误");
        });
    }
  }
};
</script>

<style>
</style>