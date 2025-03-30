extends Node2D

const PATH_SPAWNER = preload("res://scenes/PathSpawner.tscn")



func _on_timer_timeout() -> void:
	var tempPath2 = PATH_SPAWNER.instantiate()
	add_child(tempPath2)
	
