
class_name Enemy extends CharacterBody2D

var move_speed= randi_range(200,250)
var attack_damage:= 0
var is_attack:= false
var in_attack_Player_range := false

var GEM = preload("res://Items/scenes/Item-1-GEM.tscn")
var MUSH = preload("res://Items/scenes/Item-2-MUSH.tscn")
var PUMP = preload("res://Items/scenes/Item-3-PUMP.tscn")
var LEAVES = preload("res://Items/scenes/Item-4-LEAVES.tscn")
var GOLD = preload("res://Items/scenes/Item-5-GOLD.tscn")
var WOOD = preload("res://Items/scenes/Item-6-WOOD.tscn")

var drop = [GEM,MUSH,PUMP,LEAVES,GOLD,WOOD]
var item_type = randi_range(0,5)

var EXPLOSION = preload("res://scenes/Explosion.tscn")

var ITEM = preload("res://Items/Item.tscn")



@onready var world = get_node("/root/World")
@onready var HP_label = get_node("/root/World/HUD/HP_Label")
@onready var EXP_label = get_node("/root/World/HUD/EXP_Label")
@onready var Level_label = get_node("/root/World/HUD/Level_Label")


@onready var sprite_animation : AnimatedSprite2D = $AnimatedSprite2D
@onready var health_component: HealthComponent = $Components/HealthComponent


@onready var castle = get_node("/root/World/Castle")
@onready var player = get_node("/root/World/Player")

@export var item: InvItem
@export var target : Vector2
@onready var atk = $AudioStreamPlayerATK


var	move_direction	
var move
var alive : bool
var	incoming = true

func _ready() -> void:
	alive = true
	health_component.death.connect(on_death)
	if player:
		player.attack_finished.connect(verify_receive_damage)
	

func _process(delta: float) -> void:
	get_parent().set_progress(get_parent().get_progress()+ move_speed*delta)
	if health_component.current_health <= 0:
		alive = false
	else:
		alive = true

	
func _physics_process(delta: float) -> void: 
	if !is_attack and player:
		sprite_animation.play("run")
	
	#var move_direction = path_follow_2d.progress     #(player.position - position).normalized()
	if move_direction:
		velocity = move_direction * move_speed
		if move_direction.x !=0:
			sprite_animation.flip_h = move_direction.x < 0
			$AreaAttack.scale.x = 1 if move_direction.x < 0 else -1
		
		move_and_slide()	
		
func attack():
	sprite_animation.play("attack")
	is_attack = true 

func _on_animated_sprite_2d_animation_finished() -> void:
	if sprite_animation.animation == "attack":
		atk.play()
		world.hp -= attack_damage
		#print(world.hp)
		HP_label.text = "HP: " +str(world.hp)
		castle.health_component.receive_damage(attack_damage) 
		if world.hp <= 0:
			player.on_death()	
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
	queue_free()
	
func drop_item(): 
	
	var item = drop[item_type].instantiate()
	var random_angle: float = randf() * PI * 2
	var spawn_distance: float = randf_range(0,90)
	var spawn_offset: Vector2 = Vector2(cos(random_angle),sin(random_angle)) * spawn_distance
	item.global_position = position + spawn_offset
	
	#await get_tree().create_timer(3).timeout
	item.add_to_group("items")
	add_sibling(item)  #world.call_deferred("add_child", MUSHROOM)
		
	

	#get_parent().get_parent().queue_free()
	

func _on_area_attack_body_entered(body: Node2D) -> void:
	if body is Castle:	
		move_speed =0
		attack()
		incoming = false
	elif body is Hero:
		move_speed =0
		attack()
		


func _on_area_attack_body_exited(body: Node2D) -> void:
	if (body is Hero) and incoming :
		move_speed = 200
		is_attack = false

		
		
