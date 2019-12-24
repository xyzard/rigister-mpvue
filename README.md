
# 前言
  现在有一个需求，需要用户进行某些操作的时候检测有没有登陆，没有登陆就进行登陆控制。


## 场景1：
  ### web+vue
  #### 场景分析：在web环境下，为了实现登陆权限的统一控制以及便于团队成员接入，实现的方案应该具有通用性，简洁性。
  
  #### 方案1：依赖后端返回的状态码做控制：直接在axios的响应拦截器那里根据后端返回的401状态码重新调回登陆页就行了;
  点评：
  + 优势：这种控制不需要前端的其他成员增加代码量；
  + 劣势：严重依赖后端的控制，控制不够全面。

  #### 方案2：实现一个v-auth指令，在需要权限控制的地方加上这个指令即可；
  点评：
  + 优势：团队成员只需要在模版代码加入一个指令既可以实现控制；
  + 劣势：登陆权限控制不够灵活

  **综合评价**：实际项目中应该综合应用方案1和方案2，综合前端后端进行保障。
  
### 代码解析-实现v-auth指令
```
Vue.directive('auth', {
  bind: function (el, binding) {
    // 判断是否登陆,没有就跳转到登陆页
    // 判断方法可以判断vuex中有无用户信息，或者本地有没有存储token...
  }
});

```


## 场景2：
  ### 小程序+mpvue

  #### 场景分析：在小程序环境下，要打开登陆授权弹窗必须满足1个前置条件：1：用户必须点击小程序界面的一个```<button open-type="getUserInfo">```。

  #### 方案1：直接沿用场景1的方案，区别在于登陆跳转的时候有2个选择。
  + 选择1：跳转到一个新的登陆页，页面含有```<button open-type="getUserInfo">```;
  + 选择2：直接打开一个模拟的弹窗```<dialog>```，弹窗上面有按钮```<button open-type="getUserInfo">```。
  
  点评：
+ 优势:直接复用了web环境下的方案，统一两端的逻辑，只需加个环境变量即可实现逻辑的复用。
+ 劣势：必须进入到一个中转页，体验差。
  
  #### 方案2：运用slot技术实现一个组件```<register>```，在需要登录的地方用```<register>```组件包裹。
点评：
+ 优势：便于团队成员接入登录逻辑，只需引入组件，包裹标签即可；
+ 劣势：登陆权限控制不够灵活




#### 代码解析-实现<register>组件

```
// register组件源码
<template>
  <div @click="click">
    <slot></slot>
    <button v-if="isShowAuth" open-type="getUserInfo" @getuserinfo="onGotUserInfo" @click.stop></button>
  </div>
</template>

<script>
export default {
  computed: {
    isShowAuth () {
      return this.$store.state.isShowAuth
    }
  },
  methods: {
    onGotUserInfo (e) {
      if (e.mp.detail.errMsg === 'getUserInfo:ok') {
        this.$store.state.isShowAuth = false
        this.$emit('click')
      }
    },
    click () {
      this.$emit('click')
    }
  }
}
</script>
```

```
// 引入组件
  <template>
    <register @click="like">
      <div>点赞</div>
    </register>
  <template>

  import Register from './rigister.vue'
  <script>
  export default {
    components: { Register },
    methods: {
      like () {
        console.log('就很棒')
      }
    }
  }
</script>
```

### github地址-register组件：
https://github.com/xyzard/rigister-mpvue.git


### 下一期 
业务设计-小程序登陆流程
