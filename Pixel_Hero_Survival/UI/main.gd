extends Control

# ===================== NODOS =====================
@onready var main_panel = $Main
@onready var options_panel = $Options
@onready var credits_panel = $Credits
@onready var volume_panel = $Volume
@onready var resolution_panel = $Resolution


@onready var resolution_button: OptionButton = $Resolution/ResolutionButton
@onready var fullscreen_check: CheckBox = $Resolution/FullscreenCheck
@onready var apply_button: Button = $Resolution/ApplyButton

@onready var apply_button_vol: Button = $Volume/ApplyButtonVOL
@onready var restore_button_vol: Button = $Volume/RestoreButtonVOL

@onready var music_slider: HSlider = $Volume/Music
@onready var sfx_slider: HSlider = $Volume/SFX
@onready var sfx_test: AudioStreamPlayer = $"Volume/SFX TEST/AudioStreamPlayer"



# ===================== CONFIG =====================
var config_path := "user://config.cfg"

# ===================== ESCALA / RESOLUCIÓN =====================
# Resoluciones "falsas" → escala real (funciona en web)


var pending_scale := 1.0
var pending_fullscreen := false

# ===================== AUDIO =====================
var pending_music := 1.0
var pending_sfx := 1.0

# ===================== READY =====================
func _ready():


	#MusicManager.fade_in()
	show_main()

	# Llenar OptionButton de resolución (escala)


	load_vol_settings()



	# Señales AUDIO
	apply_button_vol.pressed.connect(_apply_vol_changes)
	restore_button_vol.pressed.connect(_restore_vol_defaults)

# =================================================
# ===================== RESOLUCIÓN =================
# =================================================
var music_started := false




# =================================================
# ===================== AUDIO ======================
# =================================================

func _on_music_value_changed(value: float):
	pending_music = value / 100.0
	set_bus_volume("Music", pending_music)

func _on_sfx_value_changed(value: float):
	pending_sfx = value / 100.0
	set_bus_volume("SFX", pending_sfx)

func _apply_vol_changes():
	set_bus_volume("Music", pending_music)
	set_bus_volume("SFX", pending_sfx)
	save_vol_settings()

func _restore_vol_defaults():
	pending_music = 1.0
	pending_sfx = 1.0
	music_slider.value = 100
	sfx_slider.value = 100
	set_bus_volume("Music", pending_music)
	set_bus_volume("SFX", pending_sfx)

func set_bus_volume(bus_name: String, value: float):
	var bus := AudioServer.get_bus_index(bus_name)

	if value <= 0.001:
		AudioServer.set_bus_mute(bus, true)
		return

	AudioServer.set_bus_mute(bus, false)

	# curva perceptual correcta
	var db := linear_to_db(value)
	AudioServer.set_bus_volume_db(bus, db)


# =================================================
# ===================== GUARDADO ===================
# =================================================


func save_vol_settings():
	var cfg = ConfigFile.new()
	cfg.load(config_path)
	cfg.set_value("audio", "music", pending_music)
	cfg.set_value("audio", "sfx", pending_sfx)
	cfg.save(config_path)

func load_vol_settings():
	var cfg = ConfigFile.new()
	if cfg.load(config_path) == OK:
		pending_music = cfg.get_value("audio", "music", 1.0)
		pending_sfx = cfg.get_value("audio", "sfx", 1.0)

	music_slider.value = pending_music * 100
	sfx_slider.value = pending_sfx * 100
	set_bus_volume("Music", pending_music)
	set_bus_volume("SFX", pending_sfx)

# =================================================
# ===================== MENÚ =======================
# =================================================

func show_main():
	main_panel.visible = true

	credits_panel.visible = false
	volume_panel.visible = false
	


func show_credits():
	main_panel.visible = false

	credits_panel.visible = true
	volume_panel.visible = false


func show_volume():
	main_panel.visible = false

	credits_panel.visible = false
	volume_panel.visible = true




# =================================================
# ===================== BOTONES ====================
# =================================================

func _on_play_pressed():
	if OS.has_feature("web"):
		DisplayServer.window_set_mode(DisplayServer.WINDOW_MODE_FULLSCREEN)

	get_tree().change_scene_to_file("res://scenes/World.tscn")
	



func _on_volume_pressed():
	show_volume()


func _on_credits_pressed():
	show_credits()


func _on_credits_back_pressed():
	show_main()

func _on_sfx_test_pressed():
	sfx_test.play()


func _on_volume_back_pressed() -> void:
	show_main()


func _on_fullscreen_button_pressed():
	var mode := DisplayServer.window_get_mode()

	if mode == DisplayServer.WINDOW_MODE_FULLSCREEN:
		DisplayServer.window_set_mode(DisplayServer.WINDOW_MODE_WINDOWED)
	else:
		DisplayServer.window_set_mode(DisplayServer.WINDOW_MODE_FULLSCREEN)
