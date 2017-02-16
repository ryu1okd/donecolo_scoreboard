require! 'prelude-ls': {reverse}

@game_results_desc = -> @game_results |> reverse

@win = (e) ->
  @game_results.push if e.target.value is '1' then player1: \win, player2:\lose else player1:\lose, player2:\win
@on \before-mount, ->
  @game_results = []
@on \update, -> obs.trigger \progress, @game_results

