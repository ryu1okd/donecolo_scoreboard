require! \prelude-ls : {map, filter, last}

@on \before-mount, ->
  @game_results = []
  @p1 =
    name: \Player1
    adv: false
    game_logs: []
    wins: 0
    continuing: 0
    set: 0
  @p2 =
    name: \Player2
    adv: false
    game_logs: []
    wins: 0
    continuing: 0
    set: 0

@update_info = (p) !->
  p.wins = p.game_logs |> filter (is \win) |> ( .length)
  p.adv = p.game_logs |> last |> ( is \win)

  p.continuing = if p.adv and (p.game_logs |> last |> ( is \win)) then p.continuing + 1 else 0
  if p.continuing is 3
    p.set += 1
    p.continuing = 0
  console.log JSON.stringify p

@on \update, !->
  @update_info @p1
  @update_info @p2

obs.on \progress, (game_results) ~>
  @p1.game_logs = game_results |> map ( .p1)
  @p2.game_logs = game_results |> map ( .p2)
  @update!
