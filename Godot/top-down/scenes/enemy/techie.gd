class_name Techie extends Enemy

const TNT = preload("res://prototypes/1/TNT.tscn")
var targets

func _ready() -> void:
	attack_damage= 3
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
	var tnt = TNT.instantiate()
	tnt.dir= $shooting_point.rotation
	tnt.pos=$shooting_point.global_position
	tnt.rota= global_rotation
	get_parent().add_child(tnt)
	
	

	
