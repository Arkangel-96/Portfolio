extends StaticBody2D

@onready var timer: Timer = $Timer

@onready var health_component: HealthComponent = $Components/HealthComponent
@onready var progress_bar: ProgressBar = $ProgressBar

var ARROW = preload("res://scenes/Arrow.tscn")
var arrowDamage = 100
var targets = []
var current
var pathName



func _on_tower_body_entered(body: Node2D) -> void:
	
	if "Goblin" in body.name:
		var tempArray = []
		targets = get_node("Tower").get_overlapping_bodies()
		print(targets)	
		
		for i in targets:
			if "Goblin" in i.name:
				tempArray.append(i)
				print(tempArray[0].position)	
			
		
		#var target = null	
		#
		#for i in tempArray:
			#if target == null:
				#target = i.get_node("../")	
				#print(target)
			#else:
				#if i.get_parent().get_progress() > target.get_progress():
					#target = i.get_node("../")
					#print(target)
		
		#pathName = target.get_parent().name
		
		var tempArrow = ARROW.instantiate()
		tempArrow.pathName = pathName
		tempArrow.arrowDamage = arrowDamage
		tempArrow.target = tempArray[0].position
		get_node("arrowManager").add_child(tempArrow)
		tempArrow.global_position = $Aim.global_position
	
	
	
func _on_tower_body_exited(body: Node2D) -> void:
	pass # Replace with function body.


func _on_timer_timeout() -> void:
	pass # Replace with function body.
