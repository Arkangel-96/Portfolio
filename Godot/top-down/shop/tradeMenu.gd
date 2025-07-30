class_name TradeMenu extends CanvasLayer


@onready var world = get_node("/root/World")

@onready var audio_stream: AudioStreamPlayer = $AudioStreamPlayer

func _ready() -> void:
	pass


func _on_close_pressed() -> void:
		hide()




func _on_gold_button_pressed() -> void:
	if world.wood >= 50:
		world.wood -= 50	
		world.gold += 50	
		audio_stream.play()


func _on_wood_button_pressed() -> void:
	if world.gold >= 50:
		world.gold -= 50	
		world.wood += 50	
		audio_stream.play()
