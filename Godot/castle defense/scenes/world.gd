extends Node2D


const GOBLIN = preload("res://scenes/enemy/Goblin.tscn")

@onready var game_score: CanvasLayer = $"../GameScore"


## variables del jugador ##
var hp : int
var hpMax : int
var hpDmg : int
var level : int
var exp : int
var gold : int
var wood: int
var wave : int
var sec : int
var min : int
var wave_cc :int
var max_enemies: int
var deaths : int
var difficulty : float
const DIFF_MULTIPLIER: float = 1.2
var shop: bool = false

@onready var castle: CharacterBody2D = $Castle
@onready var Seconds: Timer = $Seconds
@onready var EnemySpawner: Timer = $EnemySpawnerTimer
@onready var player = get_node("/root/World/Player")
@onready var fortress = get_node("/root/World/Fortress")
@onready var watch_tower: CharacterBody2D = $Watch_Tower
@onready var watch_tower_2: CharacterBody2D = $Watch_Tower_2
@onready var watch_tower_3: CharacterBody2D = $Watch_Tower_3
@onready var wave_cooldown: Timer = $Wave_Cooldown






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
	hpMax = 100
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
	wave_cc = 20
	fortress.reset()
	player.reset()
	watch_tower.reset()
	watch_tower_2.reset()
	watch_tower_3.reset()
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
	
	hpDmg = (hpMax -hp) 
	$HUD/HP_Label.text = "HP: " + str(hp)
	$HUD/EXP_Label.text = "EXP: " + str(exp)
	
	if is_wave_completed():
		get_node("Wave_Cooldown").process_mode = Node.PROCESS_MODE_INHERIT
		
	if wave == 5:
		victory()
		#get_tree().paused = true
		#$WaveOverTimer.start()
		#
#func _on_wave_over_timer_timeout() -> void:
	#reset()
	
func _on_wave_cooldown_timeout() -> void:

	wave_cc -= 1
	$HUD/Wave_Cooldown.text = " Next wave: " + str(wave_cc)+ " s"
	$HUD/TOP.visible= true 
	if wave_cc == 0 :
		wave += 1
		difficulty *= DIFF_MULTIPLIER
		watch_tower.reset()
		watch_tower_2.reset()
		#if $EnemySpawnerTimer/Timer.wait_time > 0.25:
			#$EnemySpawnerTimer/Timer.wait_time -= 0.05
		reset()
		wave_cc = 20
		$HUD/Wave_Cooldown.text = ""
		$HUD/TOP.visible= false
		get_node("Wave_Cooldown").process_mode = Node.PROCESS_MODE_DISABLED
	

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
