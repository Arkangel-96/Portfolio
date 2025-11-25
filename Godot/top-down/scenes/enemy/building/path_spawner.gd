

extends Node2D

@onready var world = get_node("/root/World")

  ## TOWER DEFENSE
const PATH_SPAWNER = preload("res://scenes/enemy/building/PathSpawner.tscn")

func _on_timer_timeout() -> void:
	var enemies = get_tree().get_nodes_in_group("enemies")    ## CODE WITH RUSS
										 					 ##
	if enemies.size() < get_parent().max_enemies: 			  ##
		var tempPath = PATH_SPAWNER.instantiate() 
		tempPath.add_to_group("enemies")					 ## TOWER DEFENSE
		add_child(tempPath) 								 ##
		

		
	
	
