
extends CharacterBody2D


var target : Vector2
var speed = 1000
var pathName = ""
var arrowDamage = 20
var enemy
var direction: Vector2

	
func _physics_process(delta):
	
	var enemy
	if enemy != null:
		target = enemy.global_position	
		velocity = global_position.direction_to(target) * speed  
		look_at(target)
		move_and_slide()
		if enemy is Area2D:
			queue_free()
					#await get_tree().create_timer(1).timeout
					
					#
		elif enemy == null:  #
			queue_free()
	#var pathSpawnerNode = get_tree().get_root().get_node("World/PathSpawner")
	#
	#for i in pathSpawnerNode.get_child_count():
		#if pathSpawnerNode.get_child(i).name == pathName:
			#enemy = pathSpawnerNode.get_child(i).get_child(0).get_child(0)
			#print(enemy)
			
			#for x in get_node("arrowManager").get_child_count():
				#get_node("arrowManager").get_child(x).queue_free()
				
				
func _on_area_2d_body_entered(body: Node2D) -> void:
	if "Castle" in body.name: 
		body.health_component.receive_damage(arrowDamage)
		queue_free()
	
	


	
	#else:
		#pass
		#
