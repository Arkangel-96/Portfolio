extends Node2D


@export var arrow_scene : PackedScene


func _on_player_shoot(pos,dir):
	var arrow = arrow_scene.instantiate()
	add_child(arrow)
	arrow.position = pos
	arrow.direction = dir.normalized()
	arrow.add_to_group("arrows")
