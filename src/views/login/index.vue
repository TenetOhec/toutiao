<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登陆" >
       <van-icon
        slot="left"
        name="cross"
        @click="$router.back()"
      />
    </van-nav-bar>
    
    <!-- 导航栏 -->

    <!-- 登陆表单 -->

    <!--
      表单验证：
        1、给 van-field 组件配置 rules 验证规则
          参考文档：https://youzan.github.io/vant/#/zh-CN/form#rule-shu-ju-jie-gou
        2、当表单提交的时候会自动触发表单验证
           如果验证通过，会触发 submit 事件
           如果验证失败，不会触发 submit
     -->

    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        name="phonenumber"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>

      <van-field
        name="code"
        placeholder="请输入验证码"
        class="page-van-filed_body"
        v-model="user.code"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>

        <!--发送验证码按钮 -->
        <template #button>
          <!-- 倒计时显示 -->
          <van-count-down
            v-if="vanCountIsShow"
            :time="5 * 1000"
            format="ss 秒"
            @finish="vanCountIsShow = false"
          />

          <van-button
            v-else
            native-type="button"
            class="sent-sms-btn"
            size="small"
            round
            type="default"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>

      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登陆</van-button
        >
      </div>
    </van-form>

    <!-- 登陆表单 -->
  </div>
</template>

<script>
import { login, sendSms } from "@/api/user";

export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: "", //手机号
        code: "246810", //验证码
      },

      //表单校验规则，每一个校验规则都是一个数组，其中可以包含多个校验对象
      userFormRules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
      //控制倒计时显示
      vanCountIsShow: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      this.$toast.loading({
        message: "登陆中",
        forbidClick: true,
        duration: 0,
      });
      //1.获取表单数据
      const user = this.user;
      //2.表单验证

      //3.提交表单请求登陆
      try {
        const res = await login(user);
        // console.log('登陆成功',res)
        // res.data.data => { token: 'xxx', refresh_token: 'xxx' }
        this.$store.commit("setUser", res.data.data);
        // 提示 success 或者 fail 的时候，会先把其它的 toast 先清除
        this.$toast.success("登陆成功");
         // 登录成功，跳转回原来页面
        // back 的方式不严谨，后面讲功能优化的时候再说
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          // console.log('手机号或者验证码输入错误')
          this.$toast.fail("手机号或者验证码输入错误");
        } else {
          // console.log('登陆失败',err)
          this.$toast.fail("登陆失败，稍候再试");
        }
      }
      //4.根据请求响应结果处理后续操作
    },
    async onSendSms() {
      // console.log('点击了发送验证码')

      //1.仅验证手机号是否填写正确，通过ref  refs拿到组件对象
      try {
        await this.$refs.loginForm.validate("phonenumber");
        console.log("验证成功");
      } catch (err) {
        return console.log("验证失败", err);
      }
      // console.log('验证成功才会执行到这里')；
      //2.验证通过，显示倒计时
      this.vanCountIsShow = true;

      //3.请求发送验证码
      try {
        await sendSms(this.user.mobile);
        this.$toast("发送成功");
      } catch (err) {
        //  console.log(err)
        //发送失败，关闭倒计时
        this.vanCountIsShow = false;
        if (err.response.status === 429) {
          this.$toast("请求过于频繁，请稍候再试");
        } else {
          this.$toast("请求失败，请稍候再试");
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  .iconfont {
    font-size: 37px;
  }

  .sent-sms-btn {
    background-color: #ededed;
    // width: 152px;
    height: 46px;
    font-size: 18px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 27px;
    .login-btn {
      width: 694px;
      height: 88px;
      background-color: #6db4fb;
      border-radius: 10px;
      border: none;
    }
  }
}
</style>