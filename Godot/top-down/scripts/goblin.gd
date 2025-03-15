
class_name Enemy extends CharacterBody2D

var move_speed:= 20
var attack_damage:= 10
var is_attack:= false
var in_attack_Player_range := false

const ITEM = preload("res://scenes/Item.tscn")
const EXPLOSION = preload("res://scenes/Explosion.tscn")

@onready var world = get_node("/root/World")
@onready var HP_label = get_node("/root/World/HUD/HP_Label")
@onready var EXP_label = get_node("/root/World/HUD/EXP_Label")
@onready var player: Player = $"../Player"
@onready var health_component: HealthComponent = $Components/HealthComponent
@onready var sprite_animation : AnimatedSprite2D = $AnimatedSprite2D

func _ready() -> void:
	health_component.death.connect(on_death)
	if player:
		player.attack_finished.connect(verify_receive_damage)
	
	
func _physics_process(delta: float) -> void: 
	if !is_attack and player:
		sprite_animation.play("run")
	
	var move_direction = (player.position - position).normalized()
	if move_direction:
		velocity = move_direction * move_speed
		if move_direction.x !=0:
			sprite_animation.flip_h = move_direction.x < 0
			$AreaAttack.scale.x = 1 if move_direction.x < 0 else -1
		
		move_and_slide()
	
	
		
func attack():
	sprite_animation.play("attack")
	is_attack = true 

func verify_receive_damage():
	if in_attack_Player_range:
		health_component.receive_damage(player.attack_damage)
		


	
func drop_item():
	var item = ITEM.instantiate()
	item.item_type = randi_range(0,4)
	add_sibling(item) 	 #world.call_deferred("add_child", MUSHROOM)
	item.global_position = position 
	
	

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
		attack()


func _on_area_attack_body_exited(body: Node2D) -> void:
	if body is Player:
		is_attack = false
		
		
		



func _on_animated_sprite_2d_animation_finished() -> void:
	if sprite_animation.animation == "attack":
		world.hp -= attack_damage
		print(world.hp)
		HP_label.text = "HP: " +str(world.hp)
		if world.hp <= 0:
			player.on_death()	
		#player.health_component.receive_damage(attack_damage)
		elif is_attack:
			attack()
			
