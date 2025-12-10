extends Control

@onready var main_panel = $Main
@onready var options_panel = $Options
@onready var credits_panel = $Credits
@onready var volume_panel = $Volume
@onready var resolution_panel = $Resolution

@onready var resolution_button: OptionButton = $Resolution/ResolutionButton
@onready var fullscreen_check: CheckBox = $Resolution/FullscreenCheck

@onready var anim = $AnimationPlayer

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

func _on_resolution_button_item_selected(index: int) -> void:
	var res = resolutions[index]
	DisplayServer.window_set_size(res)

func _on_fullscreen_check_toggled(checked) -> void:
	if checked:
		DisplayServer.window_set_mode(DisplayServer.WINDOW_MODE_FULLSCREEN)
	else:
		DisplayServer.window_set_mode(DisplayServer.WINDOW_MODE_WINDOWED)

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
	
func volume(bus_name: String, value: float):
	var db = linear_to_db(value / 100.0)
	AudioServer.set_bus_volume_db(AudioServer.get_bus_index(bus_name), db)

func _on_music_value_changed(value: float) -> void:
	volume("Music",value)


func _on_sfx_value_changed(value: float) -> void:
	volume("SFX",value)


func _on_volume_back_pressed() -> void:
	show_options()


func _on_resolution_pressed() -> void:
	show_resolutions()


func _on_resolution_back_pressed() -> void:
	show_options()
