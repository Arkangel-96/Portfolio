extends CanvasLayer

@onready var player = get_node("/root/World/Player")
@onready var fortress = get_node("/root/World/Fortress")
@onready var world = get_node("/root/World")



func _process(_delta: float) -> void:
	
	
	%Gold.text =  str(world.gold)


	


func _on_fullscreen_button_pressed():
	var mode := DisplayServer.window_get_mode()

	if mode == DisplayServer.WINDOW_MODE_FULLSCREEN:
		DisplayServer.window_set_mode(DisplayServer.WINDOW_MODE_WINDOWED)
	else:
		DisplayServer.window_set_mode(DisplayServer.WINDOW_MODE_FULLSCREEN)
