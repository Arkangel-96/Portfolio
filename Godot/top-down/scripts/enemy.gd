
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
			$AreaAttack.scale.x = 1 if move_direction.x < 0 else -1
		
		move_and_slide()
	
	
		
func attack():
	sprite_animation.play("attack")
	is_attack = true 
	

func _on_area_attack_body_entered(body: Node2D) -> void:
	if body is Player:
		attack()


func _on_area_attack_body_exited(body: Node2D) -> void:
	if body is Player:
		is_attack = false
		
		
		



func _on_animated_sprite_2d_animation_finished() -> void:
	if sprite_animation.animation == "attack":
		if is_attack:
			attack()
			
