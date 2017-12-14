import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

export function getSingersList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    needNewCode: 0,
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    g_tk: 5381,
    hostUin: 0
  })
  return jsonp(url, data, options)
}

export function getSingerDetail (singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    needNewCode: 0,
    hostUin: 0,
    num: 100,
    songstatus: 1,
    begin: 0,
    order: 'listen',
    singermid: singerId,
    g_tk: 735683546
  })
  return jsonp(url, data, options)
}
