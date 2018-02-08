import {Component, OnInit} from '@angular/core';
import {Jsonp} from "@angular/http";
import {HttpClient} from "@angular/common/http";
import 'rxjs/Rx';
import Clipboard from 'clipboard/dist/clipboard.min.js';
import md5 from 'md5/md5';
import $ from "jquery";

//声明require
declare var require: any;


@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css', '../css/dxy-ui.css']
})
export class TranslateComponent implements OnInit {
  query = '';
  result_dst: any;
  result_src = '';
  zhORen = 'en';
  history = [];
  like = [];

  key = 'MXSkjejs2nZ8Tj_WwtjU';
  salt = (new Date).getTime();
  appid = '20171105000092856';
  constructor(public http: Jsonp, public httpclient: HttpClient) {
  }

  ngOnInit() {
    $.ajax({
      url:"http://www.translatetool.cn",
      type:"get",
      success:()=>{console.log("跨域访问success!")},
      error:()=>{console.log("跨站访问failed!")}
    });
  }


  onSwitch() {
    if (!this.zhORen.localeCompare('en')) {
      this.zhORen = 'zh';
    } else {
      this.zhORen = 'en';
    }
    this.onsubmit();
  }

  on_copy() {
    const copy = new Clipboard('.copy_logo');
    return copy;
  }

  on_like() {
    const fav = [];
    fav.unshift(this.query + ':' + this.result_dst);
    for (let i = 0; i < fav.length; i++) {
      if (this.like.indexOf(fav[i]) < 0) {
        this.like.unshift(fav[i]);
      }
    }
  }

  on_clear() {
    this.like = [];
  }

  on_clear_his() {
    this.history = [];
  }

  on_change() {
    if (this.query !== '') {
      console.log('keyup listener!');
      this.onsubmit();
    }
  }
  onsubmit() {
    this.query = this.query.replace(/\n/g, '');
    const sign = md5(this.appid + this.query + this.salt + this.key);
    console.log(sign);
    const last = '?q=' + this.query + '&from=auto&to=' + this.zhORen +
      '&appid=20171105000092856&salt=' + this.salt + '&sign=' + sign;
    this.http.get('http://api.fanyi.baidu.com/api/trans/vip/translate' + last + '&callback=JSONP_CALLBACK')
      .map(res => res.json()).subscribe(
      (d) => {
        this.result_src = d['trans_result'][0].src;
        this.result_dst = d['trans_result'][0].dst;
      },
      (err) => { console.log(err); },
      () => { console.log('Jsonp excute has done'); }
    );

    // 将数据保存到历史纪录中，去掉重复的数据
    if (this.result_dst) {
      const last_data = [];
      last_data.unshift(this.result_src + ':' + this.result_dst);
      for (let i = 0; i < last_data.length; i++) {
        if (this.history.indexOf(last_data[i]) < 0) {
          this.history.unshift(last_data[i]);
        }
      }
    }
  }
}
// $.ajax({
//   url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
//   type: 'post',
//   dataType: 'jsonp',
//   data: {
//     q: this.query,
//     appid: appid,
//     salt: salt,
//     from: 'auto',
//     to: 'zh',
//     sign: sign
//   },
//   success: function (data) {
//     console.log(data['trans_result'][0].dst);
//   }
// });


// const header = new Headers({
//   data: {
//     q: this.query,
//     appid: '2015063000000001',
//     salt: (new Date).getTime(),
//     from: 'en',
//     to: 'zh',
//     sign: sign1
//   }});
// // header.append('success',  '(data) => {console.log(data);}');
//  this.http.get(encodeURIComponent('http://api.fanyi.baidu.com/api/trans/vip/translate'), {params: {
//    data: {
//      q: this.query,
//      appid: '2015063000000001',
//      salt: (new Date).getTime(),
//      from: 'en',
//      to: 'zh',
//      sign: sign1
//    }}}).subscribe(
//   (data) => {console.log(data['trans_result'][0].dst); }
// );
// }

