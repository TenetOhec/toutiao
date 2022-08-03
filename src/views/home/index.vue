<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 导航栏 -->

    <!-- 频道列表 -->

    <!-- 
    通过 animated 属性可以开启切换标签内容时的转场动画 
    通过 swipeable属性可以开启滑动切换标签页 
    -->

    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab :title="obj.name" v-for="obj in channels" :key="obj.id">
        <!-- 频道的文章列表 -->
        <article-list :channel="obj" />

        <!-- 频道的文章列表 -->
      </van-tab>
      <!-- 添加占位符充当内容区域 使其滚动到合理位置-->
      <div slot="nav-right" class="placeholder"></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isChannelEditShow = true"
      >
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 频道列表 -->

    <!-- 频道编辑弹出层 -->

    <van-popup
      class="edit-channel-popup"
      v-model="isChannelEditShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <channel-edit
        :myChannels="channels"
        :active="active"
        @update-active="onUpdateActive"
      />
    </van-popup>

    <!-- 频道编辑弹出层 -->
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user";
import ArticleList from "./components/article-list.vue";
import ChannelEdit from "./components/channel-edit.vue";
import { mapState } from "vuex";
import {getItem} from '@/utils/storage'

export default {
  name: "HomePage",
  components: {
    ArticleList,
    ChannelEdit,
  },
  props: {},
  data() {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false, // 这里我们先设置为 true 就能看到弹窗的页面了
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {},
  created() {
    this.loadChannels();
  },
  mounted() {},
  methods: {
    async loadChannels() {
      try {
        let channels = [];
        if (this.user) {
          // 已登录，请求获取线上的频道数据
          const { data } = await getUserChannels();
          channels = data.data.channels;
        } else {
          // 未登录
          const localChannels = getItem("TOUTIAO_CHANNELS");
          if (localChannels) {
            // 有本地频道数据，则使用
            channels = localChannels;
          } else {
            // 没有本地频道数据，则请求获取默认推荐的频道列表
            const { data } = await getUserChannels();
            channels = data.data.channels;
          }
        }

        // 将数据更新到组件中
        this.channels = channels;
      } catch (err) {
        console.log(err);
        this.$toast("数据获取失败");
      }
    },
    onUpdateActive(index, isChannelEditShow = true) {
      //更新激活的频道项
      this.active = index;
      //关闭编辑频道弹层
      this.isChannelEditShow = isChannelEditShow;
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;

  // 不加/deep/ 作用不到 因为作用子组件的样式时如果在一个作用域（scoped）中 默认添加的属性默认只能作用到这个组件的跟节点上，若要作用到其后代元素中则需要加上深度操作符
  //有些像 Sass 之类的预处理器无法正确解析 >>>。这种情况下你可以使用 /deep/ 或 ::v-deep 操作符取而代之——两者都是 >>> 的别名，同样可以正常工作
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }

  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }

    // .van-tab__pane{
    //   margin-top: 100px;

    // }

    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }

    .van-tab--active {
      color: #333333;
    }

    .van-tabs__nav {
      padding-bottom: 0;
    }

    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }

    .placeholder {
      //flex-shrink 设置为0可以使其不参与flex布局的计算
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }

    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      background-color: rgba(255, 255, 255, 0.902);
      i.iconfont {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 58px;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>

