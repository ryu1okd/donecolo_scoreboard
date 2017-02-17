
riot.tag2('game_logs', '<div> <div class="row"> <div class="col s12 center-align"> <button class="waves-effect waves-light btn-large red" onclick="{win}" value="1">P1 WIN</button> <button class="waves-effect waves-light btn-large blue" onclick="{win}" value="2">P2 WIN</button> </div> </div> <div class="row"> <div class="col s10"> <h5>GAME LOGS</h5> </div> <div class="col s2"><a class="waves-effect btn-floating secondary-content white" onclick="location.reload();"> <i class="small material-icons grey-text">clear_all</i></a></div> <div class="col s12"> <table> <thead> <th>game</th> <th>p1</th> <th>p2</th> </thead> <tbody> <tr each="{game_result, i in game_results_desc()}"> <td>{game_results.length - i} </td> <td>{game_result.p1} </td> <td>{game_result.p2}</td> </tr> </tbody> </table> </div> </div> </div>', '', '', function(opts) {
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