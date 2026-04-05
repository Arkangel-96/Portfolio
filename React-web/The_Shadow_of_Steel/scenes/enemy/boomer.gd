


class_name Boomer extends Enemy


func _ready() -> void:

	#attack_damage= 3
	#move_speed = randi_range(100,150)
	health_component.death.connect(on_death)
	if player:
		player.attack_finished.connect(verify_receive_damage)
	#if archer:ad

func attack():
	sprite_animation.play("attack")
	is_attack = true 
	

func _on_animated_sprite_2d_animation_finished() -> void:
	if sprite_animation.animation == "attack":
		#atk.play()
		#fortress.health_component.receive_damage(attack_damage) 
		world.hp -= attack_damage
		print(world.hp)
		HP_label.text = "HP: " +str(world.hp)
		#on_death()
		if world.hp <= 0:
			world.on_death()
	
