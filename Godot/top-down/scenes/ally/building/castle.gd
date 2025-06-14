class_name Castle extends Info 

const FIRE = preload("res://scenes/FX/Fire.tscn")
var flames
@onready var nodo: Node2D = $Flames

func _physics_process(delta: float) -> void:
	flames = [get_node("Flames").get_children()]
	in_flames()
		
func in_flames():
	for x in get_node("Flames").get_child_count():
		if world.hp == 0 or world.hp >=75 :
			nodo.visible= false
			get_node("Flames").get_child(x).visible= false
			get_node("Flames").get_child(x).process_mode = Node.PROCESS_MODE_DISABLED
		elif world.hp <=50:
			nodo.visible= true
			await get_tree().create_timer(12).timeout
			get_node("Flames").get_child(x).process_mode = Node.PROCESS_MODE_INHERIT
			get_node("Flames").get_child(x).visible= true
			#print(get_node("Flames").get_child(x))
		
		
			
	#var fire = FIRE.instantiate()
	#var random_angle: float = randf() * PI * 2
	#var spawn_distance: float = randf_range(0,30)
	#var spawn_offset: Vector2 = Vector2(cos(random_angle),sin(random_angle)) * spawn_distance
	#fire.global_position = position + spawn_offset
	#
##await get_tree().create_timer(3).timeout
	#fire.add_to_group("items")
	#add_sibling(fire)  #world.call_deferred("add_child", MUSHROOM)
