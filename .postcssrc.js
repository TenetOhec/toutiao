/**
 * PostCSS 配置文件
 */
// postcss.config.js


module.exports = {
    //配置要使用的.postCSS插件
    plugins: {
        //配置使用 autoprefixer插件
        //作用：生成浏览器css 样式规则前缀
        //VueCLI内部已经配置了autoprefixer插件
        //所以又配置了一次，会产生冲突
        // 'autoprefixer': {//autoprefixer插件的配置
        //      //配置要兼容到的环境信息
        //     browsers: ['Android >= 4.0', 'iOS >= 8']
        //   },
          //配置使用postcss-oxtorem 插件
      'postcss-pxtorem': {
        //lib-flexible的 rem 适配方案：把一份分为10份，每份就是十分之一
        //所以rootValue应该设置为你的设计稿的十分之一
        //我们的设计稿是750，所以应设置为750/10 = 75
        //Vant 建议设置为37.5，因为Vant是基于375写的
        //所以必须设置为37.5，唯一的缺点就是使用本设计稿的尺寸必须 / 2

        //Vant的样式按照37.5，自己的样式按照75
        //解决方案
        //通过查阅文档，我们发现rootValue 支持两种类型：
            //数字：固定的数值
                    // rootValue: 37.5,
            //函数：可以动态处理返回
                    //postcss-pxtorem处理每个css文件的时候都会来调用 这个函数，它会被处理的 css 文件相关的信息通过参数传递给该函数
        rootValue({file}){//{file}参数解构
            // console.log('处理的css文件：',file)
            return file.indexOf('vant') !==-1?37.5:75
        },         

        
        //配置要转换的css属性
        //* 表示所有
        propList: ['*'],
      },
    },
  };