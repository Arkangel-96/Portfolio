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
	
	#call_deferred("actor_setup")
	#recalc_timer.timeout.connect(_on_recalc_timer_timeout)	
	#nav.path_desired_distance = 4.0
	#nav.target_desired_distance = 4.0
	#
	#
#func actor_setup():
	#await get_tree().physics_frame
	#set_target_position(castle.position)
	#_on_recalc_timer_timeout(castle.position)
	#
#func set_target_position(target_position: Vector2):
	#nav.target_position = target_position
	#
#func _on_recalc_timer_timeout(target_position: Vector2) -> void:
	#set_target_position(target_position)
	#

func _process(delta: float) -> void:
	#get_parent().set_progress(get_parent().get_progress()+ move_speed*delta)
	if health_component.current_health <= 0:
		alive = false
	#else:
		#alive = true

	
func _physics_process(delta: float) -> void: 
	if alive:
		if !is_attack and player:
			sprite_animation.play("run")
		#if nav.is_navigation_finished():
			#return
			#
		## NAVIGATOR AGENT 2D##
		#var next_path_pos =	nav.get_next_path_position()
		#var cur_agent_pos = global_position
		##move_direction= cur_agent_pos.direction_to(next_path_pos)
		#
		#move_direction = next_path_pos - cur_agent_pos
		#move_direction = move_direction.normalized()
		move_direction = (castle.position - global_position).normalized()
		if move_direction:
			velocity = move_direction * move_speed
			if move_direction.x !=0:
				sprite_animation.flip_h = move_direction.x < 0
				$AreaAttack.scale.x = 1 if move_direction.x < 0 else -1
			
				move_and_slide()	
	else:
		pass
		
func attack():
	sprite_animation.play("attack")
	is_attack = true 
	var tnt = TNT.instantiate()
	tnt.dir= $shooting_point.rotation
	tnt.pos=$shooting_point.global_position
	tnt.rota= global_rotation
	get_parent().add_child(tnt)
	
	
func _on_animated_sprite_2d_animation_finished() -> void:
	if sprite_animation.animation == "attack":
		#atk.play()
		world.hp -= attack_damage
		#print(world.hp)
		HP_label.text = "HP: " +str(world.hp)
		castle.health_component.receive_damage(attack_damage) 
		if world.hp <= 0:
			world.on_death()	
		elif is_attack:
			attack()
			

func verify_receive_damage():
	if in_attack_Player_range:
		health_component.receive_damage(player.attack_damage)
		


	

	
	#var item = ITEM.instantiate()
	#item.item_type = randi_range(0,4)
	#add_sibling(item) 	 #world.call_deferred("add_child", MUSHROOM)
	#item.global_position = position 
	
	

func on_death():
	alive = false
	$ProgressBar.hide()
	$AnimatedSprite2D.animation = "dead"
	$CollisionShape2D.set_deferred("disabled", true)
	$AreaAttack/CollisionShape2D.set_deferred("disabled", true)
	var effect = EXPLOSION.instantiate()
	effect.global_position = position # primero posiciono el efecto, porque si no se va al 0,0 del world
	add_sibling(effect)
	effect.process_mode = Node.PROCESS_MODE_ALWAYS
	
		## drop exp ;D ##
	world.exp += 20
	#print(world.exp)
	EXP_label.text = "EXP: " +str(world.exp)
	if world.exp >= 100:
		world.exp = 0
		EXP_label.text = "EXP: " +str(world.exp)
		world.level += 1
		Level_label.text = "Level: " +str(world.level)
	drop_item()
	
	
func drop_item(): 
	
	var item = drop[item_type].instantiate()
	var random_angle: float = randf() * PI * 2
	var spawn_distance: float = randf_range(0,45)
	var spawn_offset: Vector2 = Vector2(cos(random_angle),sin(random_angle)) * spawn_distance
	item.global_position = position + spawn_offset
	
	#await get_tree().create_timer(3).timeout
	item.add_to_group("items")
	add_sibling(item)  #world.call_deferred("add_child", MUSHROOM)
		
	

	#get_parent().get_parent().queue_free()
	

func _on_area_attack_body_entered(body: Node2D) -> void:
	if alive:
		
		if body is Castle:	
			move_speed =0
			attack()
			incoming = false
	
		elif body is Player:
			move_speed =0
			attack()
		#elif (body is Enemy) and incoming:
			#await get_tree().create_timer(15).timeout
		#
	else:
		pass


func _on_area_attack_body_exited(body: Node2D) -> void:
	if (body is Player) and incoming :
		move_speed = 200
		is_attack = false


		
		
