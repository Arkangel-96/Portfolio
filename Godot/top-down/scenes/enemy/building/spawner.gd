extends Node2D

const BOOMER = preload("res://scenes/enemy/Boomer.tscn")
const TECHIE = preload("res://scenes/enemy/Techie.tscn")
const GOBLIN = preload("res://scenes/enemy/Goblin.tscn")
var spawn_points = []


@onready var world = get_node("/root/World")
@onready var marker_2d: Marker2D = $Marker2D

var spawn = [GOBLIN, TECHIE,BOOMER]
var type = randi_range(1,1)
var datos

func _on_timer_timeout() -> void:
	var enemies = get_tree().get_nodes_in_group("enemies")
	#print(enemies)
	if enemies.size() < get_parent().max_enemies:
		var enemy = spawn[type].instantiate()
		enemy.position = marker_2d.global_position
		enemy.add_to_group("enemies")
		world.add_child(enemy)
		#datos = world.get_child(enemy)
		#print(datos)
		#nombre.set_name("Goblin")
		
