extends Node2D

const GOBLIN = preload("res://scenes/Goblin.tscn")

@onready var timer_spawn_enemy: Timer = $TimerSpawnEnemy
@onready var player: Player = $Player

func _ready() -> void:
	timer_spawn_enemy.wait_time = 3
	timer_spawn_enemy.start()
	timer_spawn_enemy.timeout.connect(spawn_enemy)


func spawn_enemy():
	var enemy = GOBLIN.instantiate()
	
	var random_angle: float = randf() * PI *2
	var spawn_distance: float = randf_range(270,300)
	var spawn_offset: Vector2 = Vector2(cos(random_angle),sin(random_angle)) * spawn_distance
	
	enemy.position =spawn_offset + player.position
	
	add_child(enemy)
