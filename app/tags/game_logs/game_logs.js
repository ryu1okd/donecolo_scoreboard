
riot.tag2('game_logs', '<div>GAME LOGS <button onclick="{win}" value="1">Player1 WIN</button> <button onclick="{win}" value="2">Player2 WIN</button> </div> <ul> <li each="{game_result in game_results_desc}">{game_result.player1} : {game_result.player2}</li> </ul>', '', '', function(opts) {
this.game_results = [];
this.game_results_desc = reverse(
this.game_results);
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
});