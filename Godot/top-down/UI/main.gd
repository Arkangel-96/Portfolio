extends Control

@onready var main_panel = $Main
@onready var options_panel = $Options
@onready var credits_panel = $Credits
@onready var volume_panel = $Volume
@onready var resolution_panel = $Resolution

@onready var resolution_button: OptionButton = $Resolution/ResolutionButton
@onready var fullscreen_check: CheckBox = $Resolution/FullscreenCheck

@onready var apply_button: Button = $Resolution/ApplyButton
@onready var restore_button: Button = $Resolution/RestoreButton

@onready var apply_button_vol: Button = $Volume/ApplyButtonVOL
@onready var restore_button_vol: Button = $Volume/RestoreButtonVOL

@onready var music_slider: HSlider = $Volume/Music
@onready var sfx_slider: HSlider = $Volume/SFX
@onready var sfx_test: AudioStreamPlayer = $"Volume/SFX TEST/AudioStreamPlayer"



@onready var anim = $AnimationPlayer

var config_path := "user://config.cfg"

# Variables temporales (hasta que se aplique)
var pending_resolution : Vector2i
var pending_fullscreen : bool

# Valores temporales (solo se guardan al aplicar)
var pending_music : float
var pending_sfx : float

var resolutions = [
	Vector2i(800, 600),
	Vector2i(1280, 720),
	Vector2i(1600, 900),
	Vector2i(1920, 1080)
]



func _ready():
	
	
	show_main()
	  # Cargar opciones en el OptionButton
	for r in resolutions:
		resolution_button.add_item("%sx%s" % [r.x, r.y])
	
	 # Cargar configuración guardada
	load_settings()
	load_vol_settings()
	
	# Conectar señales RES
	
	resolution_button.item_selected.connect(_on_resolution_button_item_selected)
	fullscreen_check.toggled.connect(_on_fullscreen_check_toggled)
	apply_button.pressed.connect(_apply_changes)
	restore_button.pressed.connect(_restore_defaults)
	
	# Conectar señales VOL
	
	music_slider.value_changed.connect(_on_music_value_changed)
	sfx_slider.value_changed.connect(_on_sfx_value_changed)
	apply_button_vol.pressed.connect(_apply_vol_changes)
	restore_button_vol.pressed.connect(_restore_vol_defaults)

## ======  GUARDAR VOLUMEN (MUSIC/SFX) ====== ##

func load_vol_settings():
	var cfg = ConfigFile.new()
	var err = cfg.load(config_path)

	if err == OK:
		pending_music = cfg.get_value("audio", "music", 1)
		pending_sfx = cfg.get_value("audio", "sfx", 1)
	else:
		pending_music = 1
		pending_sfx = 1
	# Actualizar sliders con lo cargado
	music_slider.value = pending_music * 100
	sfx_slider.value = pending_sfx * 100
	
	set_bus_volume("Music", pending_music)
	set_bus_volume("SFX", pending_sfx)
	

	
# ====== Aplicar ======
func _apply_vol_changes():
	set_bus_volume("Music", pending_music)
	set_bus_volume("SFX", pending_sfx)
	save_vol_settings()
	
func _restore_vol_defaults():
	pending_music = 1
	pending_sfx = 1

	music_slider.value = 100
	sfx_slider.value = 100
	
func save_vol_settings():
	var cfg = ConfigFile.new()

	cfg.set_value("audio", "music", pending_music)
	cfg.set_value("audio", "sfx", pending_sfx)

	cfg.save(config_path)
	
	# ====== Manejo temporal mientras el usuario mueve los sliders ======
func _on_music_changed(v):
	pending_music = v

func _on_sfx_changed(v):
	pending_sfx = v

	## ====== RANGOS DE VOLUMEN  ====== ##
func set_bus_volume(bus_name: String, value: float):
	# value: 0.0 → 1.0
	var bus = AudioServer.get_bus_index(bus_name)

	if value <= 0.001:
		AudioServer.set_bus_mute(bus, true)
		return

	AudioServer.set_bus_mute(bus, false)

	var min_db := -30.0
	var max_db := -6.0

	var db = lerp(min_db, max_db, value)

	AudioServer.set_bus_volume_db(bus, db)

	
func _on_music_value_changed(value: float) -> void:
	pending_music = value / 100.0
	set_bus_volume("Music", pending_music)

func _on_sfx_value_changed(value: float) -> void:
	pending_sfx = value / 100.0
	set_bus_volume("SFX", pending_sfx)


func _on_apply_button_vol_pressed() -> void:
	_apply_vol_changes()


func _on_restore_button_vol_pressed() -> void:
	_restore_vol_defaults()

## ======  GUARDAR RESOLUCIÓN (720p / 1080p) ====== ##

func load_settings():
	var cfg = ConfigFile.new()
	var err = cfg.load(config_path)

	if err == OK:
		var x = cfg.get_value("video", "resolution_x", 1280)
		var y = cfg.get_value("video", "resolution_y", 720)
		var fs = cfg.get_value("video", "fullscreen", false)

		pending_resolution = Vector2i(x, y)
		pending_fullscreen = fs

		# Actualizar UI
		var index = resolutions.find(pending_resolution)
		if index != -1:
			resolution_button.select(index)
		else:
			resolution_button.select(1)

		fullscreen_check.button_pressed = fs

	else:
		# No existe el archivo → usar valores por defecto
		pending_resolution = Vector2i(1280, 720)
		pending_fullscreen = false
		resolution_button.select(1)
		fullscreen_check.button_pressed = false

func _apply_changes():
	# Aplicar resolución
	DisplayServer.window_set_size(pending_resolution)

	# Aplicar fullscreen
	if pending_fullscreen:
		DisplayServer.window_set_mode(DisplayServer.WINDOW_MODE_FULLSCREEN)
	else:
		DisplayServer.window_set_mode(DisplayServer.WINDOW_MODE_WINDOWED)

	save_settings()

func _restore_defaults():
	# Valores por defecto
	pending_resolution = Vector2i(1280, 720)
	pending_fullscreen = false

	# Refrescar UI
	resolution_button.select(1) # índice de 1280x720
	fullscreen_check.button_pressed = false
	

func save_settings():
	var cfg = ConfigFile.new()
	cfg.set_value("video", "resolution_x", pending_resolution.x)
	cfg.set_value("video", "resolution_y", pending_resolution.y)
	cfg.set_value("video", "fullscreen", pending_fullscreen)
	cfg.save(config_path)

func _on_resolution_button_item_selected(index) -> void:
	pending_resolution = resolutions[index]

func _on_fullscreen_check_toggled(checked) -> void:
	pending_fullscreen = checked
	
func _on_apply_button_pressed() -> void:
	_apply_changes()
	
func _on_restore_button_pressed() -> void:
	_restore_defaults()


## ======  CONTROL GENERAL DEL MAIN MENU ====== ##

func show_main():
	main_panel.visible = true
	options_panel.visible = false
	credits_panel.visible = false
	volume_panel.visible = false
	resolution_panel.visible = false
	anim.play("fade_in") # opcional

func show_options():
	main_panel.visible = false
	options_panel.visible = true
	credits_panel.visible = false
	volume_panel.visible = false
	resolution_panel.visible = false
	anim.play("slide_left") # o cualquier transición

func show_credits():
	main_panel.visible = false
	options_panel.visible = false
	credits_panel.visible = true
	volume_panel.visible = false
	resolution_panel.visible = false
	anim.play("slide_left")

func show_volume():
	volume_panel.visible = true
	main_panel.visible = false
	options_panel.visible = false
	credits_panel.visible = false
	resolution_panel.visible = false
	
func show_resolutions():	
	main_panel.visible = false
	options_panel.visible = false
	credits_panel.visible = false
	volume_panel.visible = false
	resolution_panel.visible = true
	
func _on_play_pressed() -> void:
	get_tree().change_scene_to_file("res://scenes/World.tscn")

func _on_options_pressed() -> void:
	show_options()


func _on_credits_pressed() -> void:
	show_credits()


func _on_exit_pressed() -> void:
	get_tree().quit()


func _on_options_back_pressed() -> void:
	show_main()


func _on_credits_back_pressed() -> void:
	show_main()


	
func _on_volume_pressed() -> void:
	show_volume()
	

func _on_volume_back_pressed() -> void:
	show_options()


func _on_resolution_pressed() -> void:
	show_resolutions()


func _on_resolution_back_pressed() -> void:
	show_options()


func _on_sfx_test_pressed() -> void:
	sfx_test.play()
