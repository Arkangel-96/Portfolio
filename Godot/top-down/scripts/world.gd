extends Node2D

const GOBLIN = preload("res://scenes/Goblin.tscn")

## variables del jugador ##
var hp : int
var level : int
var exp : int
var gold : int
var wood : int
var sec : int
var min : int

var max_enemies: int

@onready var Seconds: Timer = $Seconds
@onready var EnemySpawner: Timer = $EnemySpawnerTimer
@onready var player: Player = $Player

func _ready() -> void:
	max_enemies = 50

	hp = 100
	level = 1
	exp = 0
	gold = 0
	wood = 0
	sec = 0
	min = 0
	$HUD/HP_Label.text = "HP: " + str(hp)
	$HUD/Level_Label.text = "Level: " + str(level)
	$HUD/EXP_Label.text = "EXP: " + str(exp)
	$HUD/gold_Label.text = "gold: " + str(gold)
	$HUD/wood_Label.text = "wood: " + str(wood)
	$HUD/Minutes.text = "Min:" + str(min)
	$HUD/Seconds.text = "Sec:" + str(sec)
	
func _on_seconds_timeout() -> void:
	sec += 1
	if sec >= 60:
		sec = 0
		min += 1
	print("Min:" + str(min)," ", "Sec:" + str(sec))
	$HUD/Minutes.text = "Min:" + str(min)
	$HUD/Seconds.text = "Sec:" + str(sec)
	#print(player.position)


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
