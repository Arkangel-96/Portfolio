extends Node2D 

const GOBLIN = preload("res://scenes/enemy/Goblin.tscn")
const TECHIE = preload("uid://bx4dicnqdyccp")
const KNIGHT = preload("uid://de3hhy02tqefk")
const ARCHER = preload("uid://0g50ua6nypjf")

@onready var game_score: CanvasLayer = $"../GameScore"

## variables del jugador ##
var hp : int
var hpMax : int
var hpDmg : int
var level : int
var exp : int
var gold : int

var wave : int
var sec : int
var min : int
var wave_cc : int
var max_enemies: int
var deaths : int
var difficulty : float
const DIFF_MULTIPLIER: float = 1.15
var shop: bool = false

@onready var castle: CharacterBody2D = $Castle
@onready var Seconds: Timer = $Seconds
@onready var EnemySpawner: Timer = $EnemySpawnerTimer
@onready var player = get_node("/root/World/Player")
@onready var fortress = get_node("/root/World/Fortress")
@onready var wave_cooldown: Timer = $Wave_Cooldown
@onready var watch_tower: CharacterBody2D = $WatchTower
@onready var watch_tower_2: CharacterBody2D = $WatchTower2


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
	wave = 1
	difficulty = 6.0
	min = 0
	sec = 0
	wave_cc = 3
	fortress.reset()
	player.reset()
	reset()


func _on_seconds_timeout() -> void:
	sec += 1
	if sec >= 60:
		sec = 0
		min += 1
	$HUD/Minutes.text = "Min:" + str(min)
	$HUD/Seconds.text = "Sec:" + str(sec)


func is_wave_completed():
	var all_dead = true
	var enemies = get_tree().get_nodes_in_group("enemies")
	
	if enemies.size() == max_enemies:
		for e in enemies:
			if e.alive:
				all_dead = false		
			elif e == null:
				all_dead = true		
		return all_dead
	else:
		return false
	

func _physics_process(_delta: float) -> void:
	hpDmg = (hpMax - hp) 
	$HUD/HP_Label.text = "HP: " + str(hp) + "/" + str(hpMax)
	$HUD/EXP_Label.text = "EXP: " + str(exp)
	$HUD/ATK_Label.text = "ATK: " + str(player.attack_damage)
	if wave == 2:
		victory()
	elif is_wave_completed():
		get_node("Wave_Cooldown").process_mode = Node.PROCESS_MODE_INHERIT
		

func _on_wave_cooldown_timeout() -> void:
	wave_cc -= 1
	$HUD/Wave_Cooldown.text = " Next wave: " + str(wave_cc) + " s"
	$HUD/TOP.visible = true 

	if wave_cc == 0:
		wave += 1
		difficulty *= DIFF_MULTIPLIER
		reset()
		wave_cc = 3
		$HUD/Wave_Cooldown.text = ""
		$HUD/TOP.visible = false
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

	### 🔥 NUEVO → Spawnear enemigos escalados por oleada ###
	spawn_wave_enemies()



### 🔥 Generador de enemigos con spawn seguro ###
func spawn_wave_enemies() -> void:
	# --- CONFIG ---
	var min_distance_from_player: float = 400.0
	var max_distance_from_player: float = 900.0

	# límites del área jugable (ajustalos a tu mapa real)
	var map_min: Vector2 = Vector2(200, 200)
	var map_max: Vector2 = Vector2(5000, 5000)

	# punto central de fallback (en caso de no poder spawnear alrededor del player)
	var center_fallback: Vector2 = (map_min + map_max) * 0.5

	var health_multiplier: float = pow(1.1, wave - 1)
	var damage_multiplier: float = pow(1.25, wave - 1)

	# chequeo básico: que el player exista y tenga posición
	if not player:
		push_error("Player no encontrado; no se pueden spawnear enemigos.")
		return

	for i in range(max_enemies):
		 
		var spawn = [ GOBLIN, TECHIE, KNIGHT , ARCHER ]
		var type = randi_range(0,3)
		var enemy = spawn[type].instantiate()
		enemy.add_to_group("enemies")

		var pos_ok: bool = false
		var spawn_pos: Vector2 = Vector2.ZERO

		# Intentamos varias veces encontrar una posición válida
		for j in range(10):
			var angle: float = randf() * TAU
			var distance: float = randf_range(min_distance_from_player, max_distance_from_player)
			var offset: Vector2 = Vector2(cos(angle), sin(angle)) * distance
			var candidate: Vector2 = player.global_position + offset

			# Chequeamos si está dentro de los límites del mapa
			if candidate.x > map_min.x and candidate.x < map_max.x and candidate.y > map_min.y and candidate.y < map_max.y:
				spawn_pos = candidate
				pos_ok = true
				break

		# Si no encontramos posición válida (player muy al borde), usar fallback
		if not pos_ok:
			spawn_pos = center_fallback

		enemy.global_position = spawn_pos

		# agregar al árbol antes de escalar para que @onready esté inicializado
		add_child(enemy)

		# Escalar vida y daño del enemigo si tiene el método
		if enemy.has_method("scale_stats"):
			enemy.scale_stats(health_multiplier, damage_multiplier)

	print("Oleada %d -> Enemigos: %d | Vida x%.2f | Daño x%.2f" % [
		wave, max_enemies, health_multiplier, damage_multiplier
	])


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
