<template>
<div class="box">
        <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="角色编号"></el-table-column>
      <el-table-column prop="rolename" label="角色名称"></el-table-column>
           
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" size="small"
          v-if="scope.row.status == 1"
           >启用</el-button>
          <el-button type="danger" size="small"
          v-else
          >禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="medium"
          @click="edit(scope.row.id)"
          >编辑</el-button>

           <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
      
    </el-table>
</div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
import {reqRoleDel} from '../../../../utils/http'
import {successAlert} from '../../../../utils/alert'
export default {
  props:['list'],
  computed: {
    ...mapGetters({}),
  },
  methods: {
   ...mapActions({}),

  //  删除
  del(id){
    reqRoleDel(id).then(res=>{
      if(res.data.code == 200){
        // 成功的弹框
       successAlert("删除成功")

        // 通知父级组件刷新页面
        this.$emit('init')
      }
    })
  },
  // 修改
  edit(id){
    this.$emit('edit',id)
  }
  },
};
</script>
<style scoped>
.start {
  width: 50px;
  height: 30px;
  text-align: center;
}
</style>