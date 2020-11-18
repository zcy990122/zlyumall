<template>
  <div class="box">
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="用户编号"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" size="small"
           v-if="scope.row.status===1">启用</el-button>
          <el-button type="danger" size="small" @confirm="del(scope.row.uid)"
         v-else
          >禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="medium" @click="edit(scope.row.uid)">编辑</el-button>

          <del-btn @confirm="del(scope.row.uid)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqUserDel } from "../../../../utils/http";
import {successAlert} from '../../../../utils/alert'
export default {
  props: ["list"],
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),

    // 删除
    del(uid) {
      reqUserDel(uid).then((res) => {
        // 谈成功
        if(res.data.msg == 200){
           successAlert('删除成功')
        }
        //刷新页面
        this.$emit('init')  
      });

    },

    // 获取一条数据
    edit(uid){
        this.$emit('edit',uid)
    }
  },
};
</script>
<style scoped>
</style>