# WaveManager.gd
extends Node

@export var enemy_scene: PackedScene
var current_wave: int = 1

# Multiplicadores por oleada
@export var health_growth: float = 1.2
@export var damage_growth: float = 1.15

func start_wave():
	print("Comenzando oleada %d" % current_wave)
	var enemies_to_spawn = 5 + (current_wave - 1) * 2
	for i in range(enemies_to_spawn):
		spawn_enemy()

func spawn_enemy():
	var enemy = enemy_scene.instantiate()
	# Calculamos multiplicadores
	var health_multiplier = pow(health_growth, current_wave - 1)
	var damage_multiplier = pow(damage_growth, current_wave - 1)
	enemy.scale_stats(health_multiplier, damage_multiplier)
	add_child(enemy)

func next_wave():
	current_wave += 1
	start_wave()
