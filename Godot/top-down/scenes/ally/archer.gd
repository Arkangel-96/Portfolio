extends CharacterBody2D

@onready var animated_sprite: AnimatedSprite2D = $AnimatedSprite2D

var attack_damage : int

func _ready() -> void:
	attack_damage = 100
	
func _on_area_body_entered(body: Node2D) -> void:
	if body is Enemy:
		animated_sprite.play("attack_0º")
		body.in_attack_Player_range = true

func _on_area_body_exited(body: Node2D) -> void:
	if body is Enemy:
		animated_sprite.play("idle")
		body.in_attack_Player_range = false
