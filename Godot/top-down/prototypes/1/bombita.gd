extends CharacterBody2D

const TNT = preload("res://prototypes/1/TNT.tscn")
@onready var animated_sprite: AnimatedSprite2D = $AnimatedSprite2D
@onready var shooting_point: Node2D = $shooting_point

func _physics_process(delta: float) -> void:
	shooting_point.look_at(get_global_mouse_position())
	if Input.is_action_just_pressed("v"):
		animated_sprite.play("attack")
		fire()
		
func fire():
	
	var tnt = TNT.instantiate()
	tnt.dir= $shooting_point.rotation
	tnt.pos=$shooting_point.global_position
	tnt.rota= global_rotation
	get_parent().add_child(tnt)
