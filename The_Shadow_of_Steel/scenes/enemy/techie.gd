class_name Techie extends Enemy

const TNT = preload("uid://5661u4kogfhe")

var targets

func _ready() -> void:
	attack_damage= 1
	is_attack= false
	in_attack_Player_range = false
	move_speed = randi_range(200,250)
	incoming = true
	alive = true
	health_component.death.connect(on_death)
	if player:
		player.attack_finished.connect(verify_receive_damage)
	

func attack():
	sprite_animation.play("attack")
	is_attack = true 
	
	
	
func _on_animated_sprite_2d_animation_finished() -> void:
	if sprite_animation.animation == "attack":
		var tnt = TNT.instantiate()
		tnt.dir= $shooting_point.rotation
		tnt.pos=$shooting_point.global_position
		tnt.rota= global_rotation
		get_parent().add_child(tnt)
		world.hp -= attack_damage
		#print(world.hp)
		HP_label.text = "HP: " +str(world.hp)
	
		
		if world.hp <= 0:
			world.on_death()	
		elif is_attack:
			attack()
			

	
