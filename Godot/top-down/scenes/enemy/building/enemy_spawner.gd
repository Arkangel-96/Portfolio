extends Node2D

const GOBLIN = preload("res://scenes/Goblin.tscn")
var spawn_points = []

@onready var world = get_node("/root/World")


func _ready() -> void:
	for i in get_children():
		if i is Marker2D:
			spawn_points.append(i)




func _on_timer_timeout() -> void:
	var enemies = get_tree().get_nodes_in_group("enemies")
	if enemies.size() < get_parent().max_enemies:
		var spawn = spawn_points[randi() % spawn_points.size()]
		var goblin = GOBLIN.instantiate()
		goblin.position = spawn.position
		world.add_child(goblin)
		goblin.add_to_group("enemies")
