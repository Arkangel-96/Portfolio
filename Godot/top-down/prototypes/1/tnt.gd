extends CharacterBody2D

var pos:Vector2
var rota:float
var dir:float
var speed=750
var target

@onready var animated_sprite: AnimatedSprite2D = $AnimatedSprite2D

@onready var fortress = get_node("/root/World/Fortress")
@onready var player = get_node("/root/World/Player")

func _ready() -> void:
	global_position=pos
	global_rotation=rota

func _physics_process(delta: float) -> void:
	#velocity=Vector2(speed,0).rotated(dir)
	#move_and_slide()
	target = fortress.global_position
	velocity = global_position.direction_to(target) * speed  
	look_at(target)
	move_and_slide()
	await get_tree().create_timer(3).timeout
	animated_sprite.play("boom")
	await get_tree().create_timer(2).timeout
	queue_free()
