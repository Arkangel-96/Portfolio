
class_name Enemy extends CharacterBody2D

var move_speed:= 20
var attack_damage:= 10
var is_attack:= false

@onready var player: Player = $"../Player"
@onready var sprite_animation : AnimatedSprite2D = $AnimatedSprite2D

func _physics_process(delta: float) -> void:
	if !is_attack and player:
		sprite_animation.play("run")
	
	var move_direction = (player.position - position).normalized()
	if move_direction:
		velocity = move_direction * move_speed
		if move_direction.x !=0:
			sprite_animation.flip_h = move_direction.x < 0
		
		move_and_slide()
	
	
		
