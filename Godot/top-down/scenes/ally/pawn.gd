class_name Pawn extends Info 


@onready var player = get_node("/root/World/Player")
@onready var sprite_animation : AnimatedSprite2D = $AnimatedSprite2D
@onready var atk = $AudioStreamPlayerREP
@onready var dialog: CanvasLayer = $"../Dialog"




func _on_area_body_entered(body: Node2D) -> void:
	if body is Castle:
		sprite_animation.play("repair")	
	elif body is Player:
		dialog.show()
		


func _on_area_body_exited(body: Node2D) -> void:
	if body is Castle or Player:
		sprite_animation.play("idle")	
		dialog.hide()
