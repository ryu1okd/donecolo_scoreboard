
riot.tag2('player', '<div> <table> <thead> <th>name</th> <th>wins</th> <th><span class="truncate">continuous</span></th> <th>point</th> <th>set</th> </thead> <tbody> <tr> <td><span class="new badge red left" show="{p1.adv}" data-badge-caption="ADV"> </span> <input id="p1_name" riot-value="{p1.name}" placeholder="Player1" type="text"> </td> <td>{p1.wins}</td> <td>{p1.continuous}</td> <td>{p1.point}</td> <td>{p1.set}</td> </tr> <tr> <td> <span class="new badge blue left" show="{p2.adv}" data-badge-caption="ADV"> </span> <input id="p2_name" riot-value="{p2.name}" placeholder="Player2" type="text"> </td> <td>{p2.wins}</td> <td>{p2.continuous}</td> <td>{p2.point}</td> <td>{p2.set}</td> </tr> </tbody> </table> </div>', '', '', function(opts) {
var ref$, map, filter, last, this$ = this;
ref$ = require('prelude-ls'), map = ref$.map, filter = ref$.filter, last = ref$.last;
this.on('before-mount', function(){
  this.game_results = [];
  this.p1 = {
    name: 'Player1',
    adv: false,
    game_logs: [],
    wins: 0,
    continuous: 0,
    point: 0,
    set: 0
  };
  return this.p2 = {
    name: 'Player2',
    adv: false,
    game_logs: [],
    wins: 0,
    continuous: 0,
    point: 0,
    set: 0
  };
});
this.update_info = function(p){
  var this$ = this;
  p.wins = function(it){
    return it.length;
  }(
  filter((function(it){
    return it === 'win';
  }))(
  p.game_logs));
  p.adv = (function(it){
    return it === 'win';
  })(
  last(
  p.game_logs));
  p.continuous = p.adv && (function(it){
    return it === 'win';
  })(
  last(
  p.game_logs)) ? p.continuous + 1 : 0;
  if (p.continuous === 3) {
    p.point += 1;
  }
  if (p.continuous === 2) {
    p.point += 1;
  }
  if (p.point === 2) {
    p.set += 1;
    p.continuous = 0;
    p.point = 0;
  }
};
this.on('update', function(){
  this.update_info(this.p1);
  this.update_info(this.p2);
});
obs.on('progress', function(game_results){
  this$.p1.game_logs = map(function(it){
    return it.p1;
  })(
  game_results);
  this$.p2.game_logs = map(function(it){
    return it.p2;
  })(
  game_results);
  return this$.update();
});
});