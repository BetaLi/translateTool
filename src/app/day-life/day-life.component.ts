import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import $ from 'jquery';

@Component({
  selector: 'app-day-life',
  templateUrl: './day-life.component.html',
  styleUrls: ['./day-life.component.css']
})
export class DayLifeComponent implements OnInit {
  dailySentence = [];
  picUrl = ['http://s.cn.bing.net/az/hprichbg/rb/LeuchtturmWarnemuende_ZH-CN8673593712_1366x768.jpg',
  'http://s.cn.bing.net/az/hprichbg/rb/MudstoneBadlands_ZH-CN9863836503_1366x768.jpg',
  'http://s.cn.bing.net/az/hprichbg/rb/HeronIslandShark_ZH-CN12565902939_1366x768.jpg',
  'http://s.cn.bing.net/az/hprichbg/rb/PointArenaLH_ZH-CN12332642727_1366x768.jpg',
  'http://s.cn.bing.net/az/hprichbg/rb/CRGFerns_ZH-CN13613783251_1366x768.jpg',
  'http://s.cn.bing.net/az/hprichbg/rb/BudaCastle_ZH-CN8740088800_1366x768.jpg',
  'http://s.cn.bing.net/az/hprichbg/rb/FoucaultPendulum_ZH-CN9807228543_1366x768.jpg',
  'http://s.cn.bing.net/az/hprichbg/rb/PrusikPeak_ZH-CN10980657640_1366x768.jpg',
  'http://s.cn.bing.net/az/hprichbg/rb/Cotoneaster_ZH-CN13904488642_1366x768.jpg',
  'http://s.cn.bing.net/az/hprichbg/rb/KyrgyzstanCat_ZH-CN10422392512_1366x768.jpg',
  'http://s.cn.bing.net/az/hprichbg/rb/InspirationPoint_ZH-CN7836594587_1366x768.jpg',
  'http://s.cn.bing.net/az/hprichbg/rb/HauntedGallery_ZH-CN7884856477_1366x768.jpg',
  'http://s.cn.bing.net/az/hprichbg/rb/Uummannaq_ZH-CN11265049839_1366x768.jpg'];
  random = Math.floor(Math.random() * 12 );
  constructor(public http: HttpClient) {
    this.dailySentence = [new DailySentence('Some birds are not meant to be caged; their feathers are just too bright.', '有些鸟儿是注定不会被关在牢笼里，它们的每一片羽毛都闪耀着光辉。'),
      new DailySentence('It is our choices that show what we truly are, far more than our abilities.', '决定我们一生的，不是我们的能力，而是我们的选择。'),
      new DailySentence('Yesterday is history. Tomorrow is mystery. But today is a gift.', '昨日已逝，明天尚远，今天才是老天赐予的礼物。'),
      new DailySentence('Success is the sum of small efforts, repeated day in and day out.', '成功就是日复一日那一点点小小努力的积累。'),
      new DailySentence('A year from now, you will wish you had started today.', '明年今日，你会希望此时此刻自己已经行动了。'),
      new DailySentence('Reserve one meter sunshine and put them in atrium. Elated wind, tap my heart window.', '预定一米阳光，装进心房。欢畅的风，轻敲我的心窗。'),
      new DailySentence('Get outside every day. Miracles are waiting everywhere.', '每天出去走走，奇迹就在身边。'),
      new DailySentence('Smile and silence are two powerful tools. Smile is the way to solve many problems and silence is the way to avoid many problems.', '微笑和沉默是两把利器：微笑解决很多问题，沉默避免许多问题。 '),
      new DailySentence('Life is like riding a bicycle. To keep your balance you must keep moving.', '生活就像骑单车，只有不断前进，才能保持平衡。'),
      new DailySentence('Do not say that opportunities never come. It did come but you just weren’t willing to give up what you had.', '不要说机会从未出现；它曾经来过，只是你舍不得放下已拥有的。'),
      new DailySentence('Face the past with the least regrets, face the present with the least waste and face the future with the most dreams.', '不悔恨过去；不荒废现在；充满梦想，面对未来。'),
      new DailySentence('Live as if you were to die tomorrow. Learn as if you were to live forever. -- Mahatma Gandhi', '如同明日将死那样生活，如同永远不死那样求知。——圣雄甘地'),
      new DailySentence('Instead of complaining that the rosebush is full of thorns, be happy that the thorn bush has roses.', '与其抱怨玫瑰丛长满了刺，还不如感激刺丛里竟生出了玫瑰。')
    ];
  }

  ngOnInit() {
    this.get_pic_url();
  }

  get_pic_url() {
   // this.http.get('http://cn.bing.com/HPImageArchive.aspx?format=json&idx=0&n=1').subscribe(
   //   data => {
   //     console.log(data);
   //   }
   // );
   //  $.ajax({
   //    type: "get",
   //    url: "http://cn.bing.com/HPImageArchive.aspx?format=xml&idx=0&n=8",
   //    dataType: "xml",//告诉jquety返回的数据格式
   //    success: callback//定义交互完成，并且服务端在下返回数据的回调函数
   //  });
   //  function callback(data) {
   //    const jqueryObj = $(data);
   //    //获取message节点
   //    const message = jqueryObj.children();
   //    //获取文本内容
   //    const text = message.text();
   //    console.log(text);
   //  }
  }
}

export class DailySentence {
  constructor(
    public en: string,
    public zh: string
  ) {}
}
