class_name Player extends Info

@onready var sprite_animation : AnimatedSprite2D = $AnimatedSprite2D

@onready var player: Player = $"."

@onready var canvas_layer: CanvasLayer = $CanvasLayer
@onready var inventory_ui: PanelContainer = $CanvasLayer/InventoryUI



@onready var shop_menu: CanvasLayer = $"../ShopMenu"

@onready var trade_menu: TradeMenu = $"../TradeMenu"


@onready var worker = get_node("/root/World/Worker")


@onready var atk_1 = $"AudioStreamPlayerATK-1"
@onready var atk_2 = $"AudioStreamPlayerATK-2"
@onready var player_dash: AudioStreamPlayer = $AudioStreamPlayerDASH
@onready var player_shout: AudioStreamPlayer = $AudioStreamPlayerSHOUT

@onready var dash_cooldown: Timer = $DashCooldown
@onready var shout_cooldown: Timer = $ShoutCooldown


var screen_size


var dash_ready : bool 
var shout_ready : bool 

func _ready() -> void:
	
	shout_ready = true	
	dash_ready = true
	move_speed = 500
	#health_component.death.connect(on_death)
	screen_size = get_viewport_rect().size
	reset()
	#get_global_mouse_position()
	
	#canvas_layer.hide()
	
func reset():
	#position = screen_size * 2.5
	pass
	
			
func _physics_process(_delta: float) -> void:
	movement()
	
	#print(dash_cooldown.wait_time)
	
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
	
	if Input.is_action_just_pressed("Space") and dash_ready == true:
		dash()
	
	if Input.is_action_just_pressed("Q") and shout_ready == true:
		shout()	
		
	if Input.is_action_just_pressed("E"):
		inventory_ui.show()
	if Input.is_action_just_pressed("V"):
		inventory_ui.hide()
	
	if event is InputEventMouseButton and !world.shop:
		if event.button_index == MOUSE_BUTTON_LEFT and !world.shop:
			if event.pressed:
				attack_1()							
		elif event.button_index == MOUSE_BUTTON_RIGHT and !world.shop:
			if event.pressed:
				attack_2()	

							
func attack_1():
	
	attack_damage = 50
	get_node("SHOUT").process_mode = Node.PROCESS_MODE_DISABLED
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
	
	attack_damage = 50
	get_node("SHOUT").process_mode = Node.PROCESS_MODE_DISABLED
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

 


func dash():
	
	attack_damage = 100
	dash_ready = false
	get_node("SHOUT").process_mode = Node.PROCESS_MODE_DISABLED
	dash_cooldown.start()
	sprite_animation.play("dash_L&R")
	is_attack = true
	if velocity.x > 0:
		velocity = velocity.move_toward(Vector2(1000,0), move_speed)	
	if velocity.x < 0:
		velocity = velocity.move_toward(Vector2(-1000,0), move_speed)
					
	if Input.is_action_pressed("ui_down") or down == true:
		sprite_animation.play("dash_DOWN")
		is_attack = true
		if velocity.y > 0:
			velocity = velocity.move_toward(Vector2(0,1000), move_speed)
	if Input.is_action_pressed("ui_up") or up == true :
		sprite_animation.play("dash_UP")
		is_attack = true
		if velocity.y < 0:
			velocity = velocity.move_toward(Vector2(0,-1000), move_speed)

func _on_dash_cooldown_timeout() -> void:
	dash_ready = true

func shout():
	
	attack_damage = 100
	shout_ready = false	
	get_node("SHOUT").process_mode = Node.PROCESS_MODE_INHERIT
	shout_cooldown.start()
	sprite_animation.play("shout_L&R")
	is_attack = true
	velocity = velocity.move_toward(Vector2.ZERO, move_speed)	
			
	if Input.is_action_pressed("ui_down") or down == true:
		sprite_animation.play("shout_DOWN")
		is_attack = true
		velocity = velocity.move_toward(Vector2.ZERO, move_speed)
	if Input.is_action_pressed("ui_up") or up == true :
		sprite_animation.play("shout_UP")
		is_attack = true
		velocity = velocity.move_toward(Vector2.ZERO, move_speed)

func _on_shout_cooldown_timeout() -> void:
	shout_ready = true

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
		
	if sprite_animation.animation == "dash_L&R":
		sprite_animation.play("idle_L&R")	
		player_dash.play()
	if sprite_animation.animation == "dash_DOWN":
		sprite_animation.play("idle_down")	
		player_dash.play()
	if sprite_animation.animation == "dash_UP":
		sprite_animation.play("idle_up")	
		player_dash.play()
		
	if sprite_animation.animation == "shout_L&R":
		sprite_animation.play("idle_L&R")	
		player_shout.play()
	if sprite_animation.animation == "shout_DOWN":
		sprite_animation.play("idle_down")	
		player_shout.play()
	if sprite_animation.animation == "shout_UP":
		sprite_animation.play("idle_up")	
		player_shout.play()
		
func _on_area_lr_body_entered(body: Node2D) -> void:
	print(body.name)
	if body is Enemy:
		body.in_attack_Player_range = true
		
	elif body is Worker:
		print("olaaa")	
		shop_menu.show()
		inventory_ui.show()
		world.shop = true
	elif body is Trader:
		print("olaaa")	
		trade_menu.show()
		world.shop = true	

func _on_area_lr_body_exited(body: Node2D) -> void:
	if body is Enemy:
		body.in_attack_Player_range = false
		
	elif body is Worker:
		shop_menu.hide()
		inventory_ui.hide()
		world.shop = false
	elif body is Trader:
		trade_menu.hide()
		world.shop = false
		
func _on_area_ud_body_entered(body: Node2D) -> void:
	
	if body is Enemy:
		body.in_attack_Player_range = true
		


func _on_area_ud_body_exited(body: Node2D) -> void:
	if body is Enemy:
		body.in_attack_Player_range = false

func _on_shout_body_entered(body: Node2D) -> void:
	if body is Enemy:
		body.in_attack_Player_shout = true
		body.in_attack_Player_range = false
		
func _on_shout_body_exited(body: Node2D) -> void:
	if body is Enemy:
		body.in_attack_Player_shout = false
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

## PROJECTILES ##
			
	#shooting_point.look_at(get_global_mouse_position())
	#fire()
#func fire():	
	#var tnt = TNT.instantiate()
	#tnt.dir= %shooting_point.rotation
	#tnt.pos= %shooting_point.global_position
	#tnt.rota= global_rotation
	#get_parent().add_child(tnt)
#	


#func _on_area_body_exited(body: Node2D) -> void:
	#if body is Castle or Player:
		#sprite_animation.play("idle")	
		#dialog.hide()
		#shop_menu.hide()
		#player.inventory_ui.hide()	
