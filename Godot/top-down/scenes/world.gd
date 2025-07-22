extends Node2D


const GOBLIN = preload("res://scenes/enemy/Goblin.tscn")

@onready var game_score: CanvasLayer = $"../GameScore"

## variables del jugador ##
var hp : int
var level : int
var exp : int
var gold : int
var wood: int
var wave : int
var sec : int
var min : int
var max_enemies: int
var deaths : int
var difficulty : float
const DIFF_MULTIPLIER: float = 1.2
var shop: bool = false

@onready var castle: CharacterBody2D = $Castle
@onready var Seconds: Timer = $Seconds
@onready var EnemySpawner: Timer = $EnemySpawnerTimer
@onready var player: Player = $Player
@onready var torre: CharacterBody2D = $Torre
@onready var torre_2: CharacterBody2D = $Torre2




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
	$GameScore/Button.pressed.connect(new_game)

func new_game():	
	get_tree().call_group("items", "queue_free") 
	hp = 100
	level = 1
	exp = 0
	gold = 0
	wood = 0
	wave = 1
	difficulty = 10.0
	#$EnemySpawnerTimer/Timer.wait_time = 1.0
	min = 0
	sec = 0
	player.reset()
	torre.reset()
	torre_2.reset()
	reset()

func is_wave_completed():
	var all_dead = true
	var enemies = get_tree().get_nodes_in_group("enemies")
	
	if enemies.size() == max_enemies:
		for e in enemies:
			if e.alive:
				all_dead = false		
			#elif e.get_child(0).get_child(0):
				#print(e.get_child(0).get_child(0))
			elif e == null:
				all_dead = true
				
				
		return all_dead
	else:
		return false
	
func _physics_process(delta: float) -> void:

	$HUD/HP_Label.text = "HP: " + str(hp)
	$HUD/EXP_Label.text = "EXP: " + str(exp)
	if is_wave_completed():
		wave += 1
		difficulty *= DIFF_MULTIPLIER
		torre.reset()
		torre_2.reset()
		#if $EnemySpawnerTimer/Timer.wait_time > 0.25:
			#$EnemySpawnerTimer/Timer.wait_time -= 0.05
		reset()
	if wave == 5:
		victory()
		#get_tree().paused = true
		#$WaveOverTimer.start()
		#
#func _on_wave_over_timer_timeout() -> void:
	#reset()

func reset():
	max_enemies = int(difficulty)
	get_tree().call_group("enemies", "queue_free")
	 
	$HUD/HP_Label.text = "HP: " + str(hp)
	$HUD/Level_Label.text = "Level: " + str(level)
	$HUD/EXP_Label.text = "EXP: " + str(exp)
	$HUD/wave_Label.text = "Wave: " + str(wave)
	$HUD/enemies_Label.text = "Enemies: " + str(max_enemies)
	$HUD/Minutes.text = "Min:" + str(min)
	$HUD/Seconds.text = "Sec:" + str(sec)
	$GameScore.hide()	
	get_tree().paused = false
	
	


func on_death():
	print("GAME OVER")
	get_tree().paused = true
	$GameScore/Title.text = "___ YOU DIED ___ " 
	$GameScore/Waves.text = "WAVES SURVIVE: " + str(wave-1)
	$GameScore.show()
	
	
func victory():
	print("YOU WON")
	get_tree().paused = true
	$GameScore/Title.text = "___ YOU WON ___ " 
	$GameScore/Waves.text = "WAVES SURVIVE: " + str(wave-1)
	$GameScore.show()






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
