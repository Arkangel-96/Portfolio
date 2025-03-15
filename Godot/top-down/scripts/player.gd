class_name Player extends CharacterBody2D

@onready var sprite_animation : AnimatedSprite2D = $AnimatedSprite2D
@onready var health_component: HealthComponent = $Components/HealthComponent
@onready var world = get_node("/root/World")
@onready var Level_label = get_node("/root/World/HUD/Level_Label")
@onready var EXP_label = get_node("/root/World/HUD/EXP_Label")

signal attack_finished

var move_speed 
var attack_damage
var is_attack = false
var down = false
var up = false

var gold = 0
var exp = 0

const START_SPEED = 200
const BOOST_SPEED = 400

func _ready() -> void:
	#health_component.death.connect(on_death)
	move_speed = START_SPEED

				
func _physics_process(delta: float) -> void:
	var move_direction := Input.get_vector("ui_left","ui_right","ui_up","ui_down")	
	
	if !is_attack:
		if move_direction:
			down = false
			up = false
			velocity = move_direction * move_speed
			sprite_animation.play("run")
			if move_direction.x != 0 :
				sprite_animation.flip_h = move_direction.x < 0
				$"Area_L&R".scale.x = -1 if move_direction.x < 0 else 1
		elif !down and !up and (Input.is_action_just_released("ui_left") or Input.is_action_just_released("ui_right")): 
			velocity = velocity.move_toward(Vector2.ZERO, move_speed)
			sprite_animation.play("idle_L&R")
			
		elif Input.is_action_just_released("ui_down"):
			velocity = velocity.move_toward(Vector2.ZERO, move_speed)
			sprite_animation.play("idle_down")
			$"Area_U&D".scale.y = 1 if move_direction.y < 0 else -1
			down = true
		elif Input.is_action_just_released("ui_up"):
			velocity = velocity.move_toward(Vector2.ZERO, move_speed)
			sprite_animation.play("idle_up")
			$"Area_U&D".scale.y = -1 if move_direction.y < 0 else 1
			up = true
			
		
	move_and_slide()
	
func _input(event: InputEvent) -> void:
	if event is InputEventMouseButton :
		if event.button_index == MOUSE_BUTTON_LEFT:
			if event.pressed:
				attack_1()
		if event.button_index == MOUSE_BUTTON_RIGHT:
			if event.pressed:
				attack_2()		
		
func attack_1():
	attack_damage = 100
	sprite_animation.play("attack_1")
	is_attack = true
	velocity = velocity.move_toward(Vector2.ZERO, move_speed)	
			
	if Input.is_action_pressed("ui_down") or down == true:
		sprite_animation.play("attack_down_1")
		is_attack = true
		velocity = velocity.move_toward(Vector2.ZERO, move_speed)
	if Input.is_action_pressed("ui_up") or up == true :
		sprite_animation.play("attack_up_1")
		is_attack = true
		velocity = velocity.move_toward(Vector2.ZERO, move_speed)
	
	
	
	
func attack_2():
	attack_damage = 100
	sprite_animation.play("attack_2")
	is_attack = true
	velocity = velocity.move_toward(Vector2.ZERO, move_speed)			

	if Input.is_action_pressed("ui_down") or down == true:
		sprite_animation.play("attack_down_2")
		is_attack = true
		velocity = velocity.move_toward(Vector2.ZERO, move_speed)
	if Input.is_action_pressed("ui_up") or up == true :
		sprite_animation.play("attack_up_2")
		is_attack = true
		velocity = velocity.move_toward(Vector2.ZERO, move_speed)

func level_up():
	if world.exp >= 100:
		world.exp = 0
		EXP_label.text = "EXP: " +str(world.exp)
		world.level += 1
		Level_label.text = "Level: " +str(world.level)
		
	

func on_death():
	print("GAME OVER")
	get_tree().paused = true
	
func _on_animated_sprite_2d_animation_finished() -> void:
	is_attack = false 
	attack_finished.emit()
	
	if sprite_animation.animation == "attack_1":
		sprite_animation.play("idle_L&R")
	
	if sprite_animation.animation == "attack_down_1":
		sprite_animation.play("idle_down")
	
	if sprite_animation.animation == "attack_up_1":
		sprite_animation.play("idle_up")
	
	if sprite_animation.animation == "attack_2":
		sprite_animation.play("idle_L&R")
		
	if sprite_animation.animation == "attack_down_2":
		sprite_animation.play("idle_down")
	
	if sprite_animation.animation == "attack_up_2":
		sprite_animation.play("idle_up")

func boost():
	$BoostTimer.start()
	move_speed = BOOST_SPEED
	
func _on_boost_timer_timeout() -> void:
	move_speed = START_SPEED	


func _on_area_lr_body_entered(body: Node2D) -> void:
	if body is Enemy:
		body.in_attack_Player_range = true


func _on_area_lr_body_exited(body: Node2D) -> void:
	if body is Enemy:
		body.in_attack_Player_range = false


func _on_area_ud_body_entered(body: Node2D) -> void:
	if body is Enemy:
		body.in_attack_Player_range = true
		


func _on_area_ud_body_exited(body: Node2D) -> void:
	if body is Enemy:
		body.in_attack_Player_range = false


## EXTRA CODE, 4 directions ##

#var input_vector = Vector2.ZERO
	#input_vector.x = Input.get_action_strength("ui_right")-Input.get_action_strength("ui_left")
	#input_vector.y = Input.get_action_strength("ui_down")-Input.get_action_strength("ui_up")
			
		#if Input.is_action_pressed("ui_left"):
			#input_vector.y -= 1
			#sprite_animation.play("run")
			#sprite_animation.flip_h = move_direction.x < 0
			#$"Area_L&R".scale.x = -1 if move_direction.x < 0 else 1	
		#if Input.is_action_pressed("ui_right"):
			#input_vector.y += 1
			#sprite_animation.play("run")
			#sprite_animation.flip_h = move_direction.x < 0
			#$"Area_L&R".scale.x = -1 if move_direction.x < 0 else 1
		#if Input.is_action_pressed("ui_up"):
			#input_vector.y -= 1
			#sprite_animation.play("run_up")
			#$"Area_U&D".scale.y = 1 if move_direction.y < 0 else -1
			#
		#if Input.is_action_pressed("ui_down"):# or input_vector == (-1.0, 1.0): #or input_vector==(1.0, 3.0):
			#input_vector.y += 1
			#sprite_animation.play("run_down")
			#
			#$"Area_U&D".scale.y = 1 if move_direction.y < 0 else -1
		#velocity = move_direction * move_speed	
