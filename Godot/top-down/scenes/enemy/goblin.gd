class_name Enemy extends CharacterBody2D

var move_speed= randi_range(200,250)
var attack_damage:= 1
var is_attack:= false
var in_attack_Player_range := false

var GEM = preload("res://inventory/scenes/Item-1-GEM.tscn")
var MUSH = preload("res://inventory/scenes/Item-2-MUSH.tscn")
var PUMP = preload("res://inventory/scenes/Item-3-PUMP.tscn")
var LEAVES = preload("res://inventory/scenes/Item-4-LEAVES.tscn")
var GOLD = preload("res://inventory/scenes/Item-5-GOLD.tscn")
var WOOD = preload("res://inventory/scenes/Item-6-WOOD.tscn")

var drop = [GEM,MUSH,PUMP,LEAVES,GOLD,WOOD]
var item_type = randi_range(0,5)
var EXPLOSION = preload("res://scenes/FX/Explosion.tscn")
var ITEM = preload("res://inventory/Item.tscn")



@onready var world = get_node("/root/World")
@onready var HP_label = get_node("/root/World/HUD/HP_Label")
@onready var EXP_label = get_node("/root/World/HUD/EXP_Label")
@onready var Level_label = get_node("/root/World/HUD/Level_Label")


@onready var nav: NavigationAgent2D = $NavigationAgent2D
@onready var recalc_timer: Timer = $RecalcTimer

@onready var sprite_animation : AnimatedSprite2D = $AnimatedSprite2D
@onready var health_component: HealthComponent = $Components/HealthComponent


@onready var castle = get_node("/root/World/Castle")
@onready var player = get_node("/root/World/Player")
@onready var archer = get_node("/root/World/Archer")
@onready var fortress = get_node("/root/World/Fortress")



@onready var atk = $AudioStreamPlayerATK


var	move_direction	
var move
var alive = true
var	incoming = true

func _ready() -> void:
	
	health_component.death.connect(on_death)
	if player:
		player.attack_finished.connect(verify_receive_damage)
	

#func _process(delta: float) -> void:
	#
	
		
		#on_death()
	#else:
		#alive = true

	
func _physics_process(delta: float) -> void: 
	
	if health_component.current_health <= 0:
		alive = false
		
	if alive:
		if !is_attack and player:
			sprite_animation.play("run")

		move_direction = (fortress.position - global_position).normalized()
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

func _on_animated_sprite_2d_animation_finished() -> void:
	if sprite_animation.animation == "attack":
		#atk.play()
		fortress.health_component.receive_damage(attack_damage) 
		world.hp -= attack_damage
		#print(world.hp)
		HP_label.text = "HP: " +str(world.hp)
		
		if world.hp <= 0:
			world.on_death()	
		elif is_attack:
			attack()
			

func verify_receive_damage():
	if in_attack_Player_range:
		health_component.receive_damage(player.attack_damage)
	

func on_death():
	alive = false
	$ProgressBar.hide()
	$AnimatedSprite2D.process_mode = Node.PROCESS_MODE_ALWAYS
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
		
	

func _on_area_attack_body_entered(body: Node2D) -> void:
	if alive:
		if body is Fortress:	
			move_speed = 0
			attack()
			#incoming = false
	
		elif body is Player:
			pass
			#move_speed =0
			#attack()
		#elif (body is Enemy) and incoming:
			#await get_tree().create_timer(15).timeout
		#
	else:
		pass

#
#func _on_area_attack_body_exited(body: Node2D) -> void:
	#if (body is Player) and incoming :
		#move_speed = 200
		#is_attack = false


		
		
