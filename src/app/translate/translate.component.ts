import { Component, OnInit } from '@angular/core';
import {Headers, Http, Jsonp} from "@angular/http";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import $ from 'jquery';
import 'rxjs/Rx';


declare var require: any;
@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {
  query: string;
  result: any;
  zhORen = 'en';
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
  onsubmit() {
    this.query = this.query.replace(/\n/g, ' ');
    const key = 'MXSkjejs2nZ8Tj_WwtjU';
    const md5 = require('A:/Users/Lcoder/Desktop/translationTool/node_modules/md5/md5.js');
    const salt = (new Date).getTime();
    const appid = '20171105000092856';
    const sign = md5(appid + this.query + salt + key);
    console.log(sign);

    const data = {
      q: encodeURI(this.query),
      appid: appid,
      salt: salt,
      from: 'auto',
      to: 'zh',
      sign: sign
    };
    const params = new URLSearchParams();
    params.set('callback', 'JSONP_CALLBACK');
    const last = '?q=' + this.query + '&from=auto&to=' + this.zhORen + '&appid=20171105000092856&salt=' + salt + '&sign=' + sign;
    this.http.get('http://api.fanyi.baidu.com/api/trans/vip/translate' + last + '&callback=JSONP_CALLBACK',
      {params: params})
      .map(res => res.json()).subscribe(
      (d) => {
        this.result = d['trans_result'][0].dst;
      }
    );
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

