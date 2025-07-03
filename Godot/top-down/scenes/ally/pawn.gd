class_name Pawn extends Info 


@onready var player = get_node("/root/World/Player")
@onready var sprite_animation : AnimatedSprite2D = $AnimatedSprite2D
@onready var atk = $AudioStreamPlayerREP



func _on_area_body_entered(body: Node2D) -> void:
	if body is Castle:
		sprite_animation.play("repair")	
	


func _on_area_body_exited(body: Node2D) -> void:
	if body is Castle:
		sprite_animation.play("idle")	
		
