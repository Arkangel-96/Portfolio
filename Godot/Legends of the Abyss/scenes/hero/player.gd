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
@onready var player_shout: AudioStreamPlayer = $AudioStreamPlayerSHOUT

@onready var dash_cooldown: Timer = $DashCooldown
@onready var shout_cooldown: Timer = $ShoutCooldown

@onready var nodo: Node2D = $Flames
@onready var inventory_tween: Tween = create_tween()


@onready var shout_cooldown_timer_node: Timer = $ShoutCooldown            # cooldown de 5s
@onready var shout_duration_timer_node: Timer = $ShoutDuration         # duración del shout (10s)
@onready var tick_damage_timer_node: Timer = $TickDamage  # tick cada 3s (dentro de SHOUT Area2D)

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
	nodo.visible= false
	#position = screen_size * 2.5
	pass
	
			
func _physics_process(_delta: float) -> void:
	update_timers()
	movement()
	
	#print(dash_cooldown.wait_time)
func update_timers():
	# obtener referencia al HUD (ajusta la ruta si tu HUD está en otro lugar)
	var hud = get_tree().root.get_node("World/Auras")  # o la ruta correcta a tu HUD

	# tiempo restante (0 si el timer está parado)
	var tick_remaining = 0.0 if tick_damage_timer_node.is_stopped() else tick_damage_timer_node.time_left
	var tick_max = tick_damage_timer_node.wait_time

	var shout_duration_remaining = 0.0 if shout_duration_timer_node.is_stopped() else shout_duration_timer_node.time_left
	var shout_duration_max = shout_duration_timer_node.wait_time
	
	var shout_cooldown_remaining = 0.0 if shout_cooldown_timer_node.is_stopped() else shout_cooldown_timer_node.time_left
	var shout_cooldown_max = shout_cooldown_timer_node.wait_time

	hud.update_aura("TickDamageAura", tick_remaining, tick_max)
	hud.update_aura("ShoutDurationAura", shout_duration_remaining, shout_duration_max)
	hud.update_aura("ShoutCooldownAura", shout_cooldown_remaining, shout_cooldown_max)
		
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
	
	if Input.is_action_just_pressed("Q") and shout_ready == true:
		shout()	
		
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


func flame():
	var projectile = projectile_scene.instantiate()

	# Posición inicial en el personaje
	projectile.global_position = global_position

	# Dirección hacia el mouse
	var mouse_pos = get_global_mouse_position()
	var direction = (mouse_pos - global_position).normalized()

	# Pasamos la dirección al proyectil
	projectile.direction = direction
	projectile.speed = projectile_speed

	get_tree().current_scene.add_child(projectile)
	
func attack_1():
	attack_ready = false
	var attackLR = ["attack_1","attack_2"]
	var typeLR = randi_range(0,1)
	var attackDOWN = ["attack_down_1","attack_down_2"]
	var typeDOWN = randi_range(0,1)
	var attackUP = ["attack_up_1","attack_up_2"]
	var typeUP= randi_range(0,1)
	flame()	
	get_node("SHOUT").process_mode = Node.PROCESS_MODE_DISABLED
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
	get_node("SHOUT").process_mode = Node.PROCESS_MODE_DISABLED
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
	
func shout():

	# Activar timers
	$TickDamage.start()      # daño cada 3s
	$ShoutDuration.start()         # shout dura 10s
	
	# Habilitar área de daño
	$SHOUT.monitoring = true
	$SHOUT.monitorable = true
	
	for x in get_node("Flames").get_child_count():
		get_node("Flames").get_child(x).process_mode = Node.PROCESS_MODE_INHERIT
		get_node("Flames").get_child(x).visible= true
		
	nodo.visible= true	
	shout_ready = false	
	get_node("SHOUT").process_mode = Node.PROCESS_MODE_INHERIT
	shout_cooldown.start()

	#sprite_animation.play("shout_L&R")
	#is_attack = true
	#velocity = velocity.move_toward(Vector2.ZERO, move_speed)	
			#
	#if Input.is_action_pressed("ui_down") or down == true:
		#sprite_animation.play("shout_DOWN")
		#is_attack = true
		#velocity = velocity.move_toward(Vector2.ZERO, move_speed)
	#if Input.is_action_pressed("ui_up") or up == true :
		#sprite_animation.play("shout_UP")
		#is_attack = true
		#velocity = velocity.move_toward(Vector2.ZERO, move_speed)
		
func _on_tick_damage_timeout() -> void:
	
		for body in $SHOUT.get_overlapping_bodies():
			if body is Enemy and body.alive:
				body.health_component.receive_damage(attack_damage / 3) # multiplicador opcional
	

func _on_shout_duration_timeout() -> void:
	# Ocultamos efecto
	nodo.visible = false

	# Desactivamos el área
	$SHOUT.monitoring = false
	$SHOUT.monitorable = false

	# Cortamos el daño periódico
	$TickDamage.stop()

	# Comienza el cooldown de 5 segundos
	$ShoutCooldown.start()

	if sprite_animation.animation == "shout_L&R":
		sprite_animation.play("idle_L&R")	
		player_shout.play()
		for x in get_node("Flames").get_child_count():
			get_node("Flames").get_child(x).visible= false
			get_node("Flames").get_child(x).process_mode = Node.PROCESS_MODE_DISABLED
	if sprite_animation.animation == "shout_DOWN":
		sprite_animation.play("idle_down")	
		player_shout.play()
		for x in get_node("Flames").get_child_count():
			get_node("Flames").get_child(x).visible= false
			get_node("Flames").get_child(x).process_mode = Node.PROCESS_MODE_DISABLED
	if sprite_animation.animation == "shout_UP":
		sprite_animation.play("idle_up")	
		player_shout.play()
		for x in get_node("Flames").get_child_count():
			get_node("Flames").get_child(x).visible= false
			get_node("Flames").get_child(x).process_mode = Node.PROCESS_MODE_DISABLED



func _on_shout_cooldown_timeout() -> void:
	shout_ready = true

		

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
