class_name Pawn extends CharacterBody2D

@onready var world = get_node("/root/World")
@onready var player = get_node("/root/World/Player")
@onready var sprite_animation : AnimatedSprite2D = $AnimatedSprite2D
@onready var atk = $AudioStreamPlayerREP
@onready var shop_menu: CanvasLayer = $"../ShopMenu"
@onready var dialog: CanvasLayer = $"../Dialog"

func _on_area_body_entered(body: Node2D) -> void:
	if body is Player:
		dialog.show()
		atk.play()
		player.disable_mouse = true
	

func _on_area_body_exited(body: Node2D) -> void:
	if body is Player:
		dialog.hide()
		shop_menu.hide()
		player.disable_mouse = false
		world.shop = false
