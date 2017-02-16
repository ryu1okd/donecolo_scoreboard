require! \prelude-ls : {reverse, initial}

@game_results_desc = -> @game_results |> reverse

@win = (e) ->
  @game_results.push if e.target.value is '1' then p1: \win, p2:\lose else p1:\lose, p2:\win
@back = ->
  @game_results = @game_results |> initial
@on \before-mount, ->
  @game_results = []
@on \updated, -> obs.trigger \progress, @game_results

