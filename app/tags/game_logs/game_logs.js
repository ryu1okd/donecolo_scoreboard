
riot.tag2('game_logs', '<hr> <h3>GAME LOGS</h3> <div> <button onclick="{win}" value="1">Player1 WIN</button> <button onclick="{win}" value="2">Player2 WIN</button> </div> <table> <thead> <th>game</th> <th>p1</th> <th>p2</th> </thead> <tbody> <tr each="{game_result, i in game_results_desc()}"> <td>{game_results.length - i} </td> <td>{game_result.player1} </td> <td>{game_result.player2}</td> </tr> </tbody> </table>', '', '', function(opts) {
var reverse;
reverse = require('prelude-ls').reverse;
this.game_results_desc = function(){
  return reverse(
  this.game_results);
};
this.win = function(e){
  return this.game_results.push(e.target.value === '1'
    ? {
      player1: 'win',
      player2: 'lose'
    }
    : {
      player1: 'lose',
      player2: 'win'
    });
};
this.on('before-mount', function(){
  return this.game_results = [];
});
this.on('update', function(){
  return obs.trigger('progress', this.game_results);
});
});