

extends Node2D


const PATH_SPAWNER = preload("res://scenes/PathSpawner.tscn")

func _on_timer_timeout() -> void:
	var enemies = get_tree().get_nodes_in_group("enemies")
	print(enemies)
	if enemies.size() < get_parent().max_enemies:
		var tempPath = PATH_SPAWNER.instantiate()
		add_child(tempPath)
		#tempPath.add_to_group("enemies")
	
