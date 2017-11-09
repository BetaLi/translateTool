import { Component, OnInit } from '@angular/core';
import {Jsonp} from "@angular/http";
import {HttpClient} from "@angular/common/http";
import $ from 'jquery';
import 'rxjs/Rx';
import Clipboard from 'clipboard/dist/clipboard.min.js';
import md5 from 'md5/md5';


declare var require: any;
@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css', '../css/dxy-ui.css']
})
export class TranslateComponent implements OnInit {
  query = '';
  result: any;
  zhORen = 'en';
  history = [];
  like = [];

  key = 'MXSkjejs2nZ8Tj_WwtjU';
  salt = (new Date).getTime();
  appid = '20171105000092856';
  constructor(public http: Jsonp, public httpclient: HttpClient) {
  }

  ngOnInit() {
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
    fav.unshift(this.query + ':' + this.result);
    for (let i = 0; i < fav.length; i++) {
      if (this.like.indexOf(fav[i]) < 0) {
        this.like.unshift(fav[i]);
      }
    }
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
        this.result = d['trans_result'][0].dst;
      },
      (err) => { console.log(err); },
      () => { console.log('Jsonp excute has done'); }
    );
    if ((this.query + ':' + this.result) !== this.history[0] && this.result) {
      this.history.unshift(this.query + ':' + this.result);
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

