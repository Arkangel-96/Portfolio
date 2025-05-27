extends CharacterBody2D


@onready var player = get_node("/root/World/Player")
@onready var sprite_animation : AnimatedSprite2D = $AnimatedSprite2D
@onready var atk = $AudioStreamPlayerREP

func _on_area_body_entered(body: Node2D) -> void:
	if body is Player:
		sprite_animation.play("repair")
		atk.play()

func _on_area_body_exited(body: Node2D) -> void:
	if body is Player:
		sprite_animation.play("idle")
		
