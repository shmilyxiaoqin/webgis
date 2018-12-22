<template>
  <div class="login-containar">
    <el-form :model="reluForm2" :rules="rules2"
             status-icon
             ref="reluForm2"
             label-positon="left"
             label-width="0"
             class="demo-reluForm login-page">
      <h3 class="title">系统登录</h3>
      <!--用户名输入组件-->
      <el-form-item prop="username">
        <el-input type="text"
                  v-model="reluForm2.username"
                  auto-complate="off"
                  placeholder="用户名"
        ></el-input>
      </el-form-item>
      <!--密码框输入组件-->
      <el-form-item prop="password">
        <el-input type="password" v-model="reluForm2.password"
                  auto-complate="off"
                  placeholder="密码">
        </el-input>
      </el-form-item>
      <!--功能按钮-->
      <el-checkbox
        v-model="checked"
        class="rememberme">记住密码
      </el-checkbox>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;" @click="handleSubmit('reluForm2')" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      logining: false,
      reluForm2: {
        username: 'admin',
        password: '123456'
      },
      rules2: {
        username: [
          {required: true, message: '请输入你的账号', triangle: 'blur'}
        ],
        password: [{
          required: true,
          message: '请输入你的密码',
          trigger: 'blur'
        }]
      },
      checked: false
    }
  },
  methods: {
    handleSubmit (reluForm2) {
      // 验证表单的方法
      this.$refs[reluForm2].validate((valid) => {
        if (valid) {
          this.logining = true
          if (this.reluForm2.username === 'admin' &&
            this.reluForm2.password === '123456') {
            this.logining = false
            sessionStorage.setItem('user', this.reluForm2.username)
            this.$router.push({path: '/layout'})
          } else {
            this.logining = false
            this.$alert('用户名或者密码错误！', 'info', {
              confirmButtonText: 'ok'
            })
          }
        } else {
          console.log('错误提交！')
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
  .login-containar {
    width: 100%;
    height: 100%;
  }

  .login-page {
    -webit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  label.el-checkbox.rememberme {
    margin: 0 0 15px;
    text-align: left;
  }
</style>
