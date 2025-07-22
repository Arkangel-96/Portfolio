class_name Build extends CharacterBody2D

@onready var animated_sprite: AnimatedSprite2D = $AnimatedSprite2D
@onready var sprite_animation : AnimatedSprite2D = $AnimatedSprite2D
@onready var atk = $AudioStreamPlayerREP
@onready var dialog: CanvasLayer = $"../Dialog"
@onready var shop_menu: CanvasLayer = $"../ShopMenu"
@onready var world = get_node("/root/World/")
@onready var player = get_node("/root/World/Player")

#
#



func _on_area_body_entered(body: Node2D) -> void:
	print(body.name)
	if body is Fortress:
		sprite_animation.play("repair")	


func _on_area_body_exited(body: Node2D) -> void:
	if body is Fortress:
		sprite_animation.play("idle")	
