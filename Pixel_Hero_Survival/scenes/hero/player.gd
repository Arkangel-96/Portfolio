class_name Player extends Info

@onready var sprite_animation : AnimatedSprite2D = $AnimatedSprite2D

@onready var player: Player = $"."

@onready var canvas_layer: CanvasLayer = $CanvasLayer
@onready var inventory_ui: PanelContainer = $CanvasLayer/InventoryUI

@export var projectile_scene: PackedScene
@export var projectile_speed: float = 400.0


@onready var trader_menu: CanvasLayer = $"../TraderMenu"
@onready var shaman_menu: CanvasLayer = $"../ShamanMenu"
@onready var captain_menu: CanvasLayer = $"../CaptainMenu"


@onready var worker = get_node("/root/World/Worker")


@onready var atk_1 = $"AudioStreamPlayerATK-1"
@onready var atk_2 = $"AudioStreamPlayerATK-2"
@onready var player_dash: AudioStreamPlayer = $AudioStreamPlayerDASH


@onready var dash_cooldown: Timer = $DashCooldown



@onready var nodo: Node2D = $Flames
@onready var inventory_tween: Tween = create_tween()




var inventory_open: bool = false

var screen_size


var dash_ready : bool 
var shout_ready : bool 
var attack_ready : bool
#var shout_damage = attack_damage *= 2

func _ready() -> void:
	attack_damage = 100
	attack_ready = true
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
	
	#if Input.is_action_just_pressed("Space") and dash_ready == true:
		#dash()
	

		
	if Input.is_action_just_pressed("E") and !world.shop:
		toggle_inventory()

	
	if event is InputEventMouseButton and !world.shop:
		if event.button_index == MOUSE_BUTTON_LEFT and !world.shop and attack_ready:
			if event.pressed:
				attack_1()
										
		elif event.button_index == MOUSE_BUTTON_RIGHT and !world.shop and dash_ready:
			if event.pressed :
				attack_2()	

func toggle_inventory() -> void:
	# Si ya hay una animación corriendo, la detiene
	if inventory_tween and inventory_tween.is_running():
		inventory_tween.kill()

	inventory_open = !inventory_open

	# Guardamos la escala original solo una vez (por si el nodo tiene escala custom en el editor)
	var original_scale := Vector2.ONE
	if not inventory_ui.has_meta("original_scale"):
		inventory_ui.set_meta("original_scale", inventory_ui.scale)
	original_scale = inventory_ui.get_meta("original_scale")

	inventory_tween = create_tween()

	if inventory_open:
		inventory_ui.show()
		inventory_ui.modulate.a = 0.0
		inventory_ui.scale = original_scale * 1.1  # un poquito más grande al abrir

		inventory_tween.tween_property(inventory_ui, "modulate:a", 1.0, 0.2).set_trans(Tween.TRANS_SINE)
		inventory_tween.tween_property(inventory_ui, "scale", original_scale, 0.2).set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_OUT)
	else:
		inventory_tween.tween_property(inventory_ui, "modulate:a", 0.0, 0.2).set_trans(Tween.TRANS_SINE)
		inventory_tween.tween_property(inventory_ui, "scale", original_scale * 1.1, 0.2).set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_IN)
		inventory_tween.finished.connect(func():
			inventory_ui.hide()
			inventory_ui.scale = original_scale
		)



	
func attack_1():
	attack_ready = false
	var attackLR = ["attack_1","attack_2"]
	var typeLR = randi_range(0,1)
	var attackDOWN = ["attack_down_1","attack_down_2"]
	var typeDOWN = randi_range(0,1)
	var attackUP = ["attack_up_1","attack_up_2"]
	var typeUP= randi_range(0,1)
	

	sprite_animation.play(attackLR[typeLR])
	is_attack = true
	velocity = velocity.move_toward(Vector2.ZERO, move_speed)	
			
	if Input.is_action_pressed("ui_down") or down == true:
		sprite_animation.play(attackDOWN[typeDOWN])
		is_attack = true
		velocity = velocity.move_toward(Vector2.ZERO, move_speed)
	if Input.is_action_pressed("ui_up") or up == true :
		sprite_animation.play(attackUP[typeUP])
		is_attack = true
		velocity = velocity.move_toward(Vector2.ZERO, move_speed)
		
	
	
	
func attack_2():
	
	
	dash_ready = false

	dash_cooldown.start()
	sprite_animation.play("dash_L&R")
	is_attack = true
	if velocity.x > 0 :
		velocity = velocity.move_toward(Vector2(1000,0), move_speed)
		await get_tree().create_timer(0.25).timeout	
		velocity = Vector2.ZERO
		#move_speed = 1000	
		
	if velocity.x < 0 :
		velocity = velocity.move_toward(Vector2(-1000,0), move_speed)
		await get_tree().create_timer(0.25).timeout	
		velocity = Vector2.ZERO
		#move_speed = 1000
		
					
	if Input.is_action_pressed("ui_down") == true:
		sprite_animation.play("dash_DOWN")
		is_attack = true
		if velocity.y > 0:
			velocity = velocity.move_toward(Vector2(0,1000), move_speed)
			await get_tree().create_timer(0.25).timeout	
			velocity = Vector2.ZERO
			
	if Input.is_action_pressed("ui_up") == true :
		sprite_animation.play("dash_UP")
		is_attack = true
		if velocity.y < 0:
			velocity = velocity.move_toward(Vector2(0,-1000), move_speed)
			await get_tree().create_timer(0.25).timeout	
			velocity = Vector2.ZERO
 

func _on_dash_cooldown_timeout() -> void:
	dash_ready = true
	move_speed = 500

func _on_animated_sprite_2d_animation_finished() -> void:
	is_attack = false 
	attack_ready = true
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
		
	
		
func _on_area_lr_body_entered(body: Node2D) -> void:
	print(body.name)
	if body is Enemy:
		body.in_attack_Player_range = true
		
	elif body is Trader:	
		trader_menu.show()
		inventory_open= false
		toggle_inventory()
		world.shop = true
			
	elif body is Shaman:
		shaman_menu.show()
		world.shop = true	
		
	elif body is Captain:
		captain_menu.show()
		world.shop = true	

func _on_area_lr_body_exited(body: Node2D) -> void:
	if body is Enemy:
		body.in_attack_Player_range = false
		
	elif body is Trader:
		trader_menu.hide()
		inventory_open= true
		toggle_inventory()
		world.shop = false

	elif body is Shaman:
		shaman_menu.hide()
		world.shop = false
		
	elif body is Captain:
		captain_menu.hide()
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
