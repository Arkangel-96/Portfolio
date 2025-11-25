class_name Archer extends Enemy


const FLECHA = preload("uid://b4cgqxc2rliq7")

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
		var arrow = FLECHA.instantiate()
		arrow.dir= $shooting_point.rotation
		arrow.pos=$shooting_point.global_position
		arrow.rota= global_rotation
		get_parent().add_child(arrow)
		world.hp -= attack_damage
		#print(world.hp)
		HP_label.text = "HP: " +str(world.hp)
	
		
		if world.hp <= 0:
			world.on_death()	
		elif is_attack:
			attack()
			

	
