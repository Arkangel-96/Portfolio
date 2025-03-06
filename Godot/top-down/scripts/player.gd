class_name Player extends CharacterBody2D

@onready var sprite_animation : AnimatedSprite2D = $AnimatedSprite2D
<<<<<<< HEAD
@onready var health_component: HealthComponent = $Components/HealthComponent

signal attack_finished
=======

>>>>>>> 53be36379b6dfe47ef1291cc522357ea9346c58a

var move_speed:= 100
var attack_damage:= 50
var is_attack:= false

<<<<<<< HEAD
func _ready() -> void:
	health_component.death.connect(on_death)
	
	
=======
>>>>>>> 53be36379b6dfe47ef1291cc522357ea9346c58a
func _input(event: InputEvent) -> void:
	if event is InputEventMouseButton :
		if event.button_index == MOUSE_BUTTON_LEFT:
			if event.pressed:
				attack()
<<<<<<< HEAD
	if event is InputEventMouseButton :
		if event.button_index == MOUSE_BUTTON_RIGHT:
			if event.pressed:
				attack_2()		
				
				
				
=======
>>>>>>> 53be36379b6dfe47ef1291cc522357ea9346c58a
				
func _physics_process(delta: float) -> void:
	if is_attack == false:
		var move_direction := Input.get_vector("ui_left","ui_right","ui_up","ui_down")
		
		
		if move_direction:
			velocity = move_direction * move_speed
			sprite_animation.play("run")
			if move_direction.x !=0:
				sprite_animation.flip_h = move_direction.x < 0
<<<<<<< HEAD
				$Area2D.scale.x = -1 if move_direction.x < 0 else 1
=======
				
>>>>>>> 53be36379b6dfe47ef1291cc522357ea9346c58a
	
		else:		
			velocity = velocity.move_toward(Vector2.ZERO, move_speed)
			sprite_animation.play("idle")
			
		print(move_direction)
		
		move_and_slide()



func attack():
	sprite_animation.play("attack")
	is_attack = true
<<<<<<< HEAD
	
func attack_2():
	sprite_animation.play("attack_2")
	is_attack = true

func on_death():
	print("GAME OVER")
	get_tree().paused = true
	
func _on_animated_sprite_2d_animation_finished() -> void:
	if sprite_animation.animation == "attack":
		attack_damage = 50
		is_attack = false 
		attack_finished.emit()
	if sprite_animation.animation == "attack_2":
		attack_damage = 100
		is_attack = false 
		attack_finished.emit()
	


func _on_area_2d_body_entered(body: Node2D) -> void:
	if body is Enemy:
		body.in_attack_Player_range = true
		


func _on_area_2d_body_exited(body: Node2D) -> void:
	if body is Enemy:
		body.in_attack_Player_range = false
		
=======


func _on_animated_sprite_2d_animation_finished() -> void:
	if sprite_animation.animation == "attack":
		is_attack = false 
		
	
>>>>>>> 53be36379b6dfe47ef1291cc522357ea9346c58a
