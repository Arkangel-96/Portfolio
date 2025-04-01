extends CharacterBody2D

@onready var health_component: HealthComponent = $Components/HealthComponent
@onready var arrow_manager: Node = $arrowManager
@onready var player: Player = $Player
@onready var goblin: Enemy = $PathFollow2D/Goblin
@onready var path_2d: Path2D = $PathSpawner/Path2D


var target : Vector2
var speed = 1000
var pathName = ""
var arrowDamage = 50
var enemy

func _physics_process(delta):
	var enemy
	var pathSpawnerNode = get_tree().get_root().get_node("World/PathSpawner")
	
	for i in pathSpawnerNode.get_child_count():
		if pathSpawnerNode.get_child(i).name == pathName:
			enemy = pathSpawnerNode.get_child(i).get_child(0).get_child(0)
			#print(enemy)
			if enemy != null:
				target = enemy.global_position	
				velocity = global_position.direction_to(target) * speed  
				look_at(target)
				move_and_slide()
			elif enemy == null:
				queue_free()
			#for x in get_node("arrowManager").get_child_count():
				#get_node("arrowManager").get_child(x).queue_free()
				
				

	
	



func _on_area_2d_body_entered(body: Node2D) -> void:
	print(body.name)
	if "Goblin" in body.name:
		body.health_component.receive_damage(arrowDamage)
		queue_free()
	else:
		pass
		
