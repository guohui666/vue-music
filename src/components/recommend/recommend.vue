<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommend.length" class="slider-wrapper" ref="sliderWrapper">
          <slider>
            <div v-for="(item,index) in recommend">
              <a :href="item.linkUrl">
                <img @load="loadImage" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item,index) in discList" class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="Loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  // src/components/recommend/recommend.vue
  import Slider from 'base/slider/slider'
  import { getRecommend, getDiscList } from 'api/recommend'
  import { ERR_OK } from 'api/config'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  // import { JsBridge } from 'common/js/jsBridge'
  // const JSBridge = require('jsbridge');
  // import { registerWindow } from 'common/js/app'

  export default {
    components: {
      Slider,
      Scroll,
      Loading
    },
    data () {
      return {
        testMum: 1,
        recommend: [],
        discList: []
      }
    },
    mounted () {
      // JsBridge.registerHandler(
      //   'nativeCall',//注册的方法名，供原生调用
      //   (data, responseCallback) => {
      //     data = JSON.stringify(data) // 收到原生发来的数据
      //     responseCallback('js say: got it!')//处理完成后返回给原生
      //   })
    },
    created () {
      setTimeout(() => {
        this._getRecommend()
      }, 20)
      this._getDiscList()
    },
    methods: {
      // nativeCall () {
      //   console.log(this.recommend)
      // },
      // testClick (event, index) {
      //   // JsBridge.init('jsbridge', 'localhost')
      //   registerWindow('nativeCall', this.nativeCall())
      //   console.log(window)
      //   window.nativeCall()
      //   let command = {
      //     'action': 'test'
      //   }
      //   JsBridge.callHandler(
      //     command,//原生声明的函数名称
      //     {data: command},//发送给原生的数据
      //     (res) => {
      //       res = JSON.parse(res) //  原生处理完成后返回的数据
      //     }
      //   )
      //  createdEwm:function(id,name,token){
      //    var ewmUrl="bind|"+id+"|"+name//+"|"+token
      //    var ewmPath=''
      //    jsbridge.callMethod({
      //      methodName:"qrGenerate",
      //      params:{url:ewmUrl,size:150},
      //      complete:function(data){
      //        let obj = JSON.parse(data);
      //        if(obj.errCode=='0'){
      //          ewmPath=obj.path
      //        }else{
      //          alert(obj.errMsg)
      //          ewmPath=''
      //        }
      //        alert(ewmPath)
      //        return ewmPath
      //      }
      //    })
      //  }
      //   latte.event(JSON.stringify(command))
      // },
      _getRecommend () {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommend = res.data.slider
          }
        })
      },
      _getDiscList () {
        getDiscList().then((res) => {
          this.discList = res.data.list
        })
      },
      loadImage () {
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh()
          this.checkLoaded = true
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl";
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
