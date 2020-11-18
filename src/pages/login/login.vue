<template>
  <div class="box">
    <div class="small">
      <h3>登录</h3>

      <div class="ipt">
        <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
      </div>

      <div class="ipt">
        <el-input v-model="user.password" placeholder="请输入密码"></el-input>
      </div>

      <div class="btn">
        <el-button type="primary"
        @click="Login"
        >登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqUserLogin } from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
export default {
  computed: {
    ...mapGetters({}),
  },

  methods: {
    ...mapActions({
      'changeUser':'changeUser'
    }),

    // 登录
    Login(){
      reqUserLogin(this.user).then(res=>{
        if(res.data.code==200){
          successAlert('登录成功')
         
        //  存入vuex
        this.changeUser(res.data.list)

          this.$router.push('/')
        }

      
      })
    }
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
};
</script>

<style scoped>
.box {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #543444, #403A53, #303D5F);
  position: relative;
}
h3 {
  text-align: center;
  margin-top: 10px;
  color: cyan;
}
.small {
  width: 400px;
  background: #fff;
  position: absolute;
  padding: 20px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  border-radius: 10px;
}
.ipt {
  padding: 15px;
}
.btn {
  text-align: center;
  padding: 10px;
}
</style>