
riot.tag2('player', '<div class="player1">{p1.name} :: {p1.wins}</div> <div class="player2">{p2.name} :: {p2.wins}</div>', '', '', function(opts) {
var ref$, map, filter, this$ = this;
ref$ = require('prelude-ls'), map = ref$.map, filter = ref$.filter;
this.on('before-mount', function(){
  this.p1 = {
    name: 'Player1',
    wins: 0
  };
  return this.p2 = {
    name: 'Player2',
    wins: 0
  };
});
obs.on('progress', function(game_results){
  this$.p1.wins = function(it){
    return it.length;
  }(
  filter((function(it){
    return it === 'win';
  }))(
  map(function(it){
    return it.player1;
  })(
  game_results)));
  this$.p2.wins = function(it){
    return it.length;
  }(
  filter((function(it){
    return it === 'win';
  }))(
  map(function(it){
    return it.player2;
  })(
  game_results)));
  return this$.update();
});
});