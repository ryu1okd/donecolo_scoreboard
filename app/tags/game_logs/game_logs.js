
riot.tag2('game_logs', '<h3>GAME LOGS</h3> <div> <button onclick="{win}" value="1">Player1 WIN</button> <button onclick="{win}" value="2">Player2 WIN</button> </div> <table> <thead> <th>game</th> <th>p1</th> <th>p2</th> </thead> <tbody> <tr each="{game_result, i in game_results_desc()}"> <td>{game_results.length - i} </td> <td>{game_result.p1} </td> <td>{game_result.p2}</td> </tr> </tbody> </table>', '', '', function(opts) {
var ref$, reverse, initial;
ref$ = require('prelude-ls'), reverse = ref$.reverse, initial = ref$.initial;
this.game_results_desc = function(){
  return reverse(
  this.game_results);
};
this.win = function(e){
  return this.game_results.push(e.target.value === '1'
    ? {
      p1: 'win',
      p2: 'lose'
    }
    : {
      p1: 'lose',
      p2: 'win'
    });
};
this.back = function(){
  return this.game_results = initial(
  this.game_results);
};
this.on('before-mount', function(){
  return this.game_results = [];
});
this.on('updated', function(){
  return obs.trigger('progress', this.game_results);
});
});