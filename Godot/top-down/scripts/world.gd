extends Node2D

const GOBLIN = preload("res://scenes/Goblin.tscn")



## variables del jugador ##
var hp : int
var level : int
var exp : int
var gold : int
var wave : int
var sec : int
var min : int
var max_enemies: int
var deaths : int
var difficulty : float
const DIFF_MULTIPLIER: float = 1.2
var enemy


@onready var castle: CharacterBody2D = $Castle
@onready var Seconds: Timer = $Seconds
@onready var EnemySpawner: Timer = $EnemySpawnerTimer
@onready var player: Player = $Player

func _on_seconds_timeout() -> void:
	sec += 1
	if sec >= 60:
		sec = 0
		min += 1
	#print("Min:" + str(min)," ", "Sec:" + str(sec))
	$HUD/Minutes.text = "Min:" + str(min)
	$HUD/Seconds.text = "Sec:" + str(sec)
	#print(player.position)
	
func _ready() -> void:
	new_game()
	$GameOver/Button.pressed.connect(new_game)

func new_game():	
	castle.health_component.apply_health(100)
	hp = 100
	level = 1
	exp = 0
	gold = 0
	wave = 1
	difficulty = 5.0
	#$EnemySpawnerTimer/Timer.wait_time = 1.0
	min = 0
	sec = 0
	player.reset()
	reset()

func is_wave_completed():
	var all_dead = true
	var enemies = get_tree().get_nodes_in_group("enemies")
	
	if enemies.size() == max_enemies:
		for e in enemies:
			if e.get_child(0).get_child(0):
				#wprint(e.get_child(0).get_child(0))
				all_dead = false		
			#elif e.get_child(0).get_child(0):
				#print(e.get_child(0).get_child(0))
			elif e == null:
				all_dead = true
				
				
		return all_dead
	else:
		return false
	

func _process(delta: float):
	
	$HUD/gold_Label.text = "Gold: " + str(gold)			
	if is_wave_completed():
		wave += 1
		difficulty *= DIFF_MULTIPLIER
		#if $EnemySpawnerTimer/Timer.wait_time > 0.25:
			#$EnemySpawnerTimer/Timer.wait_time -= 0.05
		reset()
		#get_tree().paused = true
		#$WaveOverTimer.start()
		#
#func _on_wave_over_timer_timeout() -> void:
	#reset()

func reset():
	max_enemies = int(difficulty)
	get_tree().call_group("enemies", "queue_free")
	#get_tree().call_group("items", "queue_free")  ## ESTAN DENTRO DE ENEMIES ##
	$HUD/HP_Label.text = "HP: " + str(hp)
	$HUD/Level_Label.text = "Level: " + str(level)
	$HUD/EXP_Label.text = "EXP: " + str(exp)
	$HUD/wave_Label.text = "Wave: " + str(wave)
	$HUD/enemies_Label.text = "Enemies: " + str(max_enemies)
	$HUD/gold_Label.text = "Gold: " + str(gold)
	$HUD/Minutes.text = "Min:" + str(min)
	$HUD/Seconds.text = "Sec:" + str(sec)
	$GameOver.hide()	
	get_tree().paused = false
	
	










## SE SPAWNEAN EN UN CIRCULO ALREDEDOR DEL PLAYER##

#func _on_enemy_spawner_timer_timeout() -> void:
	#EnemySpawner.wait_time = 3
	#EnemySpawner.start()
	#EnemySpawner.timeout.connect(spawn_enemy)
#
#func spawn_enemy():
#
	#var enemy = GOBLIN.instantiate()
	#var random_angle: float = randf() * PI *2
	#var spawn_distance: float = randf_range(270,300)
	#var spawn_offset: Vector2 = Vector2(cos(random_angle),sin(random_angle)) * spawn_distance
	#
	#enemy.position =spawn_offset + player.position
	#
	#add_child(enemy)
	#enemy.add_to_group("enemies")
