
class_name Enemy extends CharacterBody2D

var move_speed:= 100
var attack_damage:= 1
var is_attack:= false
var in_attack_Player_range := false

var ITEM_1_GEM = preload("res://inventory/items/scenes/Item-1-GEM.tscn")
var ITEM_2_MUSH = preload("res://inventory/items/scenes/Item-2-MUSH.tscn")
var ITEM_3_PUMP = preload("res://inventory/items/scenes/Item-3-PUMP.tscn")
var ITEM_4_LEAVES = preload("res://inventory/items/scenes/Item-4-LEAVES.tscn")
var ITEM_5_GOLD = preload("res://inventory/items/scenes/Item-5-GOLD.tscn")
var ITEM_6_WOOD = preload("res://inventory/items/scenes/Item-6-WOOD.tscn")
var ITEM = preload("res://scenes/Item.tscn")
var EXPLOSION = preload("res://scenes/Explosion.tscn")


var drop = [ITEM_1_GEM,ITEM_2_MUSH,ITEM_3_PUMP,ITEM_4_LEAVES,ITEM_5_GOLD,ITEM_6_WOOD]
var item_type = randi_range(0,5)

@onready var world = get_node("/root/World")
@onready var HP_label = get_node("/root/World/HUD/HP_Label")
@onready var EXP_label = get_node("/root/World/HUD/EXP_Label")
@onready var player: Player = $"../Player"
@onready var castle: StaticBody2D = $"../Castle"
@onready var tower: StaticBody2D = $"../Tower"

@onready var sprite_animation : AnimatedSprite2D = $AnimatedSprite2D
@onready var health_component: HealthComponent = $Components/HealthComponent

@export var item: InvItem


 


func _ready() -> void:
	health_component.death.connect(on_death)
	if player:
		player.attack_finished.connect(verify_receive_damage)
	

	
func _physics_process(delta: float) -> void: 
	if !is_attack and player:
		sprite_animation.play("run")
	
	var move_direction = (tower.position - position).normalized()
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
		#world.hp -= attack_damage
		#print(world.hp)
		#HP_label.text = "HP: " +str(world.hp)
		
		tower.health_component.receive_damage(attack_damage)
		if world.hp <= 0:
			player.on_death()	
		elif is_attack:
			attack()
			

func verify_receive_damage():
	if in_attack_Player_range:
		health_component.receive_damage(player.attack_damage)
		


	
func drop_item(): 
	var item = drop[item_type].instantiate()
	add_sibling(item) 	 #world.call_deferred("add_child", MUSHROOM)
	item.global_position = position 
	
	#var item = ITEM.instantiate()
	#item.item_type = randi_range(0,4)
	#add_sibling(item) 	 #world.call_deferred("add_child", MUSHROOM)
	#item.global_position = position 
	
	

func on_death():
	## drop exp ;D ##
	world.exp += 20
	print(world.exp)
	EXP_label.text = "EXP: " +str(world.exp)
	player.level_up()
	
	
	var effect = EXPLOSION.instantiate()
	effect.global_position = position # primero posiciono el efecto, porque si no se va al 0,0 del world
	add_sibling(effect)
	effect.process_mode = Node.PROCESS_MODE_ALWAYS
	drop_item()
	queue_free()

func _on_area_attack_body_entered(body: Node2D) -> void:
	if body is Player:	
		move_speed =0 
		attack()
		
		


func _on_area_attack_body_exited(body: Node2D) -> void:
	if body is  Player:
		move_speed = 200
		is_attack = false
		
		
		
		
