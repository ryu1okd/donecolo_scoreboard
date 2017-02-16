
riot.tag2('player', '<table> <thead> <th>name</th> <th>wins</th> <th>adv</th> <th>continuing</th> <th>set</th> </thead> <tbody> <tr> <td>{p1.name}</td> <td>{p1.wins}</td> <td> <span show="{p1.adv}">ADV</span></td> <td>{p1.continuing}</td> <td>{p1.set}</td> </tr> <tr> <td>{p2.name}</td> <td>{p2.wins}</td> <td><span show="{p2.adv}">ADV</span></td> <td>{p2.continuing}</td> <td>{p2.set}</td> </tr> </tbody> </table>', '', '', function(opts) {
var ref$, map, filter, last, this$ = this;
ref$ = require('prelude-ls'), map = ref$.map, filter = ref$.filter, last = ref$.last;
this.on('before-mount', function(){
  this.game_results = [];
  this.p1 = {
    name: 'Player1',
    adv: false,
    game_logs: [],
    wins: 0,
    continuing: 0,
    set: 0
  };
  return this.p2 = {
    name: 'Player2',
    adv: false,
    game_logs: [],
    wins: 0,
    continuing: 0,
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
  p.continuing = p.adv && (function(it){
    return it === 'win';
  })(
  last(
  p.game_logs)) ? p.continuing + 1 : 0;
  if (p.continuing === 3) {
    p.set += 1;
    p.continuing = 0;
  }
  console.log(JSON.stringify(p));
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