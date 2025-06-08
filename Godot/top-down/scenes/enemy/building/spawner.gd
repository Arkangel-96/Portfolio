extends Node2D

const GOBLIN = preload("res://scenes/enemy/Goblin.tscn")
var spawn_points = []

@onready var world = get_node("/root/World")
@onready var marker_2d: Marker2D = $Marker2D


func _on_timer_timeout() -> void:
	var enemies = get_tree().get_nodes_in_group("enemies")
	print(enemies)
	if enemies.size() < get_parent().max_enemies:
		var goblin = GOBLIN.instantiate()
		goblin.position = marker_2d.position
		world.add_child(goblin)
		goblin.add_to_group("enemies")
