class_name Pawn extends CharacterBody2D


@onready var player = get_node("/root/World/Player")
@onready var sprite_animation : AnimatedSprite2D = $AnimatedSprite2D
@onready var atk = $AudioStreamPlayerREP
@onready var dialog: CanvasLayer = $"../Dialog"
@onready var shop_menu: CanvasLayer = $"../ShopMenu"


#
#
func _on_area_body_entered(body: Node2D) -> void:
	
	if body is Castle:
		sprite_animation.play("repair")	


#func _on_area_body_exited(body: Node2D) -> void:
	#if body is Castle or Player:
		#sprite_animation.play("idle")	
		#dialog.hide()
		#shop_menu.hide()
		##player.inventory_ui.hide()
