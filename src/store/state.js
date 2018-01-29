import { playMode } from 'common/js/config'

const state = {
  singer: {},
  playing: false, //  播放状态
  fullScreen: false, // 全屏
  playList: [],     //  播放列表
  sequenceList: [], //  播放顺序列表
  mode: playMode.sequence,
  currentIndex: -1,
  token: '$2a$10$HEVWJWyHDQ4r20t6oVUkG.aw5jFygTI/SKGy.Z48StqI5psWmZPzq'
}
export default state
