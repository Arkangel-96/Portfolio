extends Control

@onready var main_panel = $Main
@onready var options_panel = $Options
@onready var credits_panel = $Credits
@onready var volume_panel = $Volume

@onready var anim = $AnimationPlayer


func _ready():
	show_main()

func show_main():
	main_panel.visible = true
	options_panel.visible = false
	credits_panel.visible = false
	volume_panel.visible = false
	anim.play("fade_in") # opcional

func show_options():
	main_panel.visible = false
	options_panel.visible = true
	credits_panel.visible = false
	volume_panel.visible = false
	anim.play("slide_left") # o cualquier transición

func show_credits():
	main_panel.visible = false
	options_panel.visible = false
	credits_panel.visible = true
	volume_panel.visible = false
	anim.play("slide_left")

func show_volume():
	volume_panel.visible = true
	main_panel.visible = false
	options_panel.visible = false
	credits_panel.visible = false
	
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
