require! \prelude-ls : {map, filter}

@on \before-mount, ->
  @p1 =
    name: \Player1
    wins: 0
  @p2 =
    name: \Player2
    wins: 0

obs.on \progress, (game_results) ~>
  @p1.wins = game_results |> map ( .player1) |> filter (is \win) |> ( .length)
  @p2.wins = game_results |> map ( .player2) |> filter (is \win) |> ( .length)
  @update!
