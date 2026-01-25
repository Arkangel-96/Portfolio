extends CanvasLayer

@onready var anim: AnimationPlayer = $AnimationPlayer
@onready var buttons := $VBoxContainer
@onready var label: Label = $Label
@onready var color_rect: ColorRect = $ColorRect
@onready var player = get_node("/root/World/Player")
var is_paused := false

func _ready():
	visible = false
	buttons.modulate.a = 0.0

func _input(event):
	if event.is_action_pressed("ESC"):
		toggle_pause()

func toggle_pause():
	is_paused = not is_paused
	get_tree().paused = is_paused
	player.inventory_ui.hide()

	if is_paused:
		show_menu()
	else:
		hide_menu()

func show_menu():
	color_rect.visible = true
	visible = true
	anim.play("fade_in")


func hide_menu():
	anim.play("fade_out")
	color_rect.visible = false
	visible = false
	
	# al terminar fade_out ocultar
	#await anim.animation_finished
	


func _on_button_resume_pressed() -> void:
	toggle_pause()



func _on_button_quit_pressed() -> void:
	get_tree().change_scene_to_file("res://UI/Main.tscn")


func _on_button_exit_game_pressed() -> void:
	get_tree().quit()
