<template>
 <!--
    只有 List 在可视范围内才会检查滚动位置触发 onLoad
   -->
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error="error"
    error-text="加载失败，请点击重试"
    :immediate-check="false"
    @load="onLoad"
  >
    <comment-item 
    v-for="(item, index) in list" 
    :key="index" 
    :comment="item" 
    @reply-click="$emit('reply-click', $event)"
    />
  </van-list>
</template>

<script>
import { getComments } from "@/api/comment";
import CommentItem from "./comment-item";

export default {
  name: "CommentList",
  components: {
    CommentItem,
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
    list: {
      type: Array,
      // default :{},       vue中不能直接将数组或对象 给成默认值   普通数字或者字符串可以

      //  default :function (){
      //   return []
      // }
      default: () => []  //简写

    },
    type: {
      type: String,
      // 自定义 Prop 数据验证
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data() {
    return {
      showlist: this.list,
      loading: false,
      finished: false,
      offset: null, // 获取下一页数据的标记
      limit: 10,
      error: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    //次数是为了评论列表还没出现在可视范围之内而获得评论数，手动调了一次
    //造成的问题就是，当它出现在可视范围之后，会请求两次重复数据
    //:immediate-check="false" 解决 vant文档

    //手动初始onload的话，他不会自动loading
    //解决：手动开启初始 loading
    this.loading=true
    this.onLoad();
  },
  mounted() {},
  methods: {
    async onLoad() {
      try {
        // 获取文章的评论和获取评论的回复是同一个接口
        // 唯一的区别是接口参数不一样
        //    type
        //      a 文章的评论
        //      c 评论的回复
        //    source
        //      文章的评论，则传递文章的 ID
        //      评论的回复，则传递评论的 ID
        // 1. 请求获取数据
        const { data } = await getComments({
          type: this.type, //  评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(), // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit, // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        });

        // 2. 将数据添加到列表中
        //total_count: totalCount 数据解构代码格式规范需要小驼峰命名法需重命名
        // total_count: totalCount
        const { results } = data.data;
        this.showlist.push(...results);
        // console.log(this.list);

        // 把文章评论的总数量传递到外部
        this.$emit("onload-success", data.data);
        //把文章列表传递到外部
        // this.$emit("onload-success2", this.list);


        // 3. 将 loading 设置为 false
        this.loading = false;

        // 4. 判断是否还有数据
        if (results.length) {
          // 有就更新获取下一页的数据页码
          this.offset = data.data.last_id;
        } else {
          // 没有就将 finished 设置结束
          this.finished = true;
        }
      } catch (err) {
        this.error = true;
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="less"></style>
