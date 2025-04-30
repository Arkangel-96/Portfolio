

extends Node2D

@onready var world = get_node("/root/World")

const PATH_SPAWNER = preload("res://scenes/PathSpawner.tscn")

func _on_timer_timeout() -> void:
	var enemies = get_tree().get_nodes_in_group("enemies")
	#print(enemies)
	#print(world.all_dead)
	if enemies.size() < get_parent().max_enemies:
		var tempPath = PATH_SPAWNER.instantiate()
		add_child(tempPath)
		#if world.all_dead == true:
			#world.max_enemies = 0
		
	
	#for enemies.size() in get_paprint(world.all_dead)rent().max_enemies:
		#var tempPath = PATH_SPAWNER.instantiate()
		#add_child(tempPath)
		#print(x)
		
	
	
