<template>
<div class="box">
    <!-- 添加按钮 -->
   <el-button type="primary" size="medium" class="btn" @click="Add">添加</el-button>   
  
   <!-- 表格 table  list -->
   <v-list :list='list'  @init="init" @edit='edit($event)'
   ></v-list>

   <!-- 弹框 -->
   <!-- 3.传递info -->
   <v-form :info='info' :list='list' @init="init" ref="form"></v-form>
</div>
</template> 
<script>
import vList from './components/list'
import vForm from './components/form'
import { mapGetters, mapActions } from "vuex"
import {reqMenuList} from '../../../utils/http'
export default {
  data() {
    return {
      // 1.info弹框的状态
      info:{
        isshow:false,
        title:'添加菜单'
      },
      list:[]
    }
  },
  components:{
    vList,
    vForm
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
   ...mapActions({}),
  //  2.点了添加按钮
  Add(){
    this.info.isshow = true
    this.info.title ='添加菜单'
  },
  // 处理刷新页面
  init(){
      reqMenuList().then(res=>{
      this.list = res.data.list
    })
  },
  // edit编辑事件
  edit(id){
    this.info.isshow =true
    this.info.title ='编辑菜单'

    // 调用子组件的方法  from中的getOne
    this.$refs.form.getOne(id)
  }
  },
  mounted() {
    //  进来就要请求数据 axios
      this.init()
  },

};
</script> 


<style scoped>
.btn{
margin-bottom: 10px;
}
</style>