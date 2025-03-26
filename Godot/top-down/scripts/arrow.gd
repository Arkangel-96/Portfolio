extends CharacterBody2D

@onready var health_component: HealthComponent = $Components/HealthComponent

var target : Vector2 
var speed = 500
var pathName = ""
var arrowDamage

func _physics_process(delta):
	

#
	#var pathSpawnerNode = get_tree().get_root().get_node("World/EnemySpawner")
		#
	#for i in pathSpawnerNode.get_child_count():
		#print(pathSpawnerNode.get_child_count())         # 17¿?¿
		#if pathSpawnerNode.get_child(i).name == pathName:
			#target = pathSpawnerNode.get_child(i).get_child(0).get_child(0).global_position
	
	
	#

	velocity = global_position.direction_to(target) * speed  
	#
	look_at(target)
	
	
	move_and_slide()
	
	


func _on_area_2d_body_entered(body: Node2D) -> void:
	if "Goblin" in body.name:
		body.health_component.receive_damage(arrowDamage)
		queue_free()
