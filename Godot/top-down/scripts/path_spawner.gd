extends Node2D

const PATH_SPAWNER = preload("res://scenes/PathSpawner.tscn")



func _on_timer_timeout() -> void:
	var tempPath = PATH_SPAWNER.instantiate()
	add_child(tempPath)
	
