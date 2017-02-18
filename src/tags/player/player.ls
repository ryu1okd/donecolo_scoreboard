require! \prelude-ls : {map, filter, last}

@on \before-mount, ->
  @game_results = []
  @p1 =
    name: \Player1
    adv: false
    game_logs: []
    wins: 0
    continuous: 0
    point: 0
    set: 0
  @p2 =
    name: \Player2
    adv: false
    game_logs: []
    wins: 0
    continuous: 0
    point: 0
    set: 0

@update_info = (p) !->
  p.wins = p.game_logs |> filter (is \win) |> ( .length)
  p.adv = p.game_logs |> last |> ( is \win)

  p.continuous = if p.adv and (p.game_logs |> last |> ( is \win)) then p.continuous + 1 else 0
  if p.continuous is 3
    p.point += 1
  if p.continuous is 2
    p.point += 1
  if p.point is 2
    @add_set p
  #console.log JSON.stringify p

@add_set = (p) !->
  p.set += 1
  @p1.continuous = @p2.continuous = 0
  @p1.point = @p2.point = 0
  console.log \ADDPOINT

@on \update, !->
  @update_info @p1
  @update_info @p2

obs.on \progress, (game_results) ~>
  @p1.game_logs = game_results |> map ( .p1)
  @p2.game_logs = game_results |> map ( .p2)
  @update!
