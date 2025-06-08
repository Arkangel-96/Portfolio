class_name Player extends Info

@onready var sprite_animation : AnimatedSprite2D = $AnimatedSprite2D

@onready var player: Player = $"."

@onready var game_score: CanvasLayer = $"../GameScore"

@onready var atk_1 = $"AudioStreamPlayerATK-1"
@onready var atk_2 = $"AudioStreamPlayerATK-2"


signal shoot
signal attack_finished

var disable_mouse:bool = false
var move_speed 
var attack_damage
var is_attack = false
var down = false
var up = false

var gold = 0
var exp = 0

const START_SPEED = 200
const BOOST_SPEED = 400

var screen_size

func _ready() -> void:
	#health_component.death.connect(on_death)
	screen_size = get_viewport_rect().size
	reset()

func reset():
	position = screen_size * 2.5
	move_speed = START_SPEED
	
			
func _physics_process(delta: float) -> void:
	movement()
	
func movement():	
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
	
	if event is InputEventMouseButton and !disable_mouse:
		if event.button_index == MOUSE_BUTTON_LEFT:
			if event.pressed:
				attack_1()
				
		if event.button_index == MOUSE_BUTTON_RIGHT: 
			if event.pressed:
				attack_2()		
				

				#var dir = get_global_mouse_position() - position
				#shoot.emit(position,dir)

	
		
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

 




	
		




func on_death():
	print("GAME OVER")
	get_tree().paused = true
	game_score.show()
	#$GameScore/Title.text = "hola"
	
func _on_animated_sprite_2d_animation_finished() -> void:
	is_attack = false 
	attack_finished.emit()
	
	if sprite_animation.animation == "attack_1":
		sprite_animation.play("idle_L&R")
		atk_1.play()
	if sprite_animation.animation == "attack_down_1":
		sprite_animation.play("idle_down")
		atk_1.play()
	if sprite_animation.animation == "attack_up_1":
		sprite_animation.play("idle_up")
		atk_1.play()
	if sprite_animation.animation == "attack_2":
		sprite_animation.play("idle_L&R")
		atk_2.play()
	if sprite_animation.animation == "attack_down_2":
		sprite_animation.play("idle_down")
		atk_2.play()
	if sprite_animation.animation == "attack_up_2":
		sprite_animation.play("idle_up")
		atk_2.play()
		
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
