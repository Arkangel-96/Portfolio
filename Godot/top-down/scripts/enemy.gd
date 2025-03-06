
class_name Enemy extends CharacterBody2D

var move_speed:= 20
var attack_damage:= 10
var is_attack:= false
<<<<<<< HEAD
var in_attack_Player_range := false

@onready var player: Player = $"../Player"
@onready var health_component: HealthComponent = $Components/HealthComponent
@onready var sprite_animation : AnimatedSprite2D = $AnimatedSprite2D

func _ready() -> void:
	health_component.death.connect(on_death)
	if player:
		player.attack_finished.connect(verify_receive_damage)
	
	
func _physics_process(delta: float) -> void: 
=======

@onready var player: Player = $"../Player"
@onready var sprite_animation : AnimatedSprite2D = $AnimatedSprite2D

func _physics_process(delta: float) -> void:
>>>>>>> 53be36379b6dfe47ef1291cc522357ea9346c58a
	if !is_attack and player:
		sprite_animation.play("run")
	
	var move_direction = (player.position - position).normalized()
	if move_direction:
		velocity = move_direction * move_speed
		if move_direction.x !=0:
			sprite_animation.flip_h = move_direction.x < 0
<<<<<<< HEAD
			$AreaAttack.scale.x = 1 if move_direction.x < 0 else -1
=======
>>>>>>> 53be36379b6dfe47ef1291cc522357ea9346c58a
		
		move_and_slide()
	
	
		
<<<<<<< HEAD
func attack():
	sprite_animation.play("attack")
	is_attack = true 

func verify_receive_damage():
	if in_attack_Player_range:
		health_component.receive_damage(player.attack_damage)
		

func on_death():
	queue_free()

func _on_area_attack_body_entered(body: Node2D) -> void:
	if body is Player:
		attack()


func _on_area_attack_body_exited(body: Node2D) -> void:
	if body is Player:
		is_attack = false
		
		
		



func _on_animated_sprite_2d_animation_finished() -> void:
	if sprite_animation.animation == "attack":
		player.health_component.receive_damage(attack_damage)
		if is_attack:
			attack()
			
=======
>>>>>>> 53be36379b6dfe47ef1291cc522357ea9346c58a
