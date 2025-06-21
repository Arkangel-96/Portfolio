extends CharacterBody2D

@onready var animated_sprite: AnimatedSprite2D = $AnimatedSprite2D
const ARROW = preload("res://scenes/FX/Arrow.tscn")

var attack_damage : int
var targets
var tempArray = []
var pathName
var arrowDamage
var f 

	
func reset():
	f = 0
	tempArray = []
		
func _on_area_body_entered(body: Node2D) -> void:
	
	## AGARRA LO QUE ESTA EN EL CÍRCULO ##
	targets = get_node("Area").get_overlapping_bodies()
	#print(targets)	
		#
	for i in targets:
		
		if body == null :      ## ESTO ESTA BIEN ###
			reset()
			animated_sprite.play("idle")
			
		### TODO GRACIAS A ESTA BELLEZA !!! ###					
		elif body.is_in_group("enemies"):  
		###                              ###	
			tempArray.append(body)
			
			var tempArrow = ARROW.instantiate()
			## COOLDOWN DEL ATAQUE ##
			await get_tree().create_timer(2).timeout
			##                  ###
			get_node("arrowManager").add_child(tempArrow)
			#print(tempArray[f])
			#tempArrow.global_position = $Aim.global_position
			#tempArrow.enemy = tempArray[f]
			if tempArray == []:
				animated_sprite.play("idle")   ## ESTO ESTA BIEN ###
				
				
			elif tempArray[f] != null:
				tempArrow.global_position = $Aim.global_position
				tempArrow.enemy = tempArray[f]    
				if !tempArray[f].alive:
					f = f + 1
					targets = get_node("Area").get_overlapping_bodies()
						
					
			
				#reset()		
			#if tempArray[f] != null:
				#if !tempArray[f].alive:
					#f = f + 1
					#targets = get_node("Area").get_overlapping_bodies()
					#animated_sprite.play("idle")	
				
					#tempArray[i].global_position
					#tempArrow.arrowDamage = arrowDamage
				

		
			
			
		#pathName = target.get_parent().name
		
					
			
			
			
			#tempArrow.pathName = pathName
	#
		#var target = null	
		#
		#for i in tempArray:
			#if target == null:
				#target = i.get_node("../")	
				##print(target)
			#else:
				#if i.get_parent().get_progress() > target.get_progress():
					#target = i.get_node("../")
					##print(target)s

		#atk.play()
		
		#tempArrow.target = tempArray[0].position
	#if body is Enemy:
		#animated_sprite.play("attack_0º")		

func _on_area_body_exited(body: Node2D) -> void:
	
	animated_sprite.play("idle")
	targets = get_node("Area").get_overlapping_bodies()
		


	
	
	


func _on_top_body_entered(body: Node2D) -> void:
	animated_sprite.play("attack_90º")


func _on_mid_body_entered(body: Node2D) -> void:
		animated_sprite.play("attack_0º")


func _on_bot_body_entered(body: Node2D) -> void:
	animated_sprite.play("attack_-90º")





#
#func _on_top_body_exited(body: Node2D) -> void:
	#animated_sprite.play("idle")
#
#
#func _on_mid_body_exited(body: Node2D) -> void:
	#animated_sprite.play("idle")
#
#
#func _on_bot_body_exited(body: Node2D) -> void:
	#animated_sprite.play("idle")
