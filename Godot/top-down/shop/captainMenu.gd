extends CanvasLayer


@onready var world = get_node("/root/World")
@onready var player = get_node("/root/World/Player")
@onready var audio_stream: AudioStreamPlayer = $AudioStreamPlayer

func _ready() -> void:
	pass


func _on_close_pressed() -> void:
		hide()


func _on_hp_button_pressed() -> void:
	if world.gold >= 50:
		world.gold -= 50	
		world.hpMax  += 25
		world.hp += 25		
		audio_stream.play()


func _on_attack_button_pressed() -> void:
	if world.gold >= 100:
		world.gold -= 100	
		player.attack_damage += 50	
		audio_stream.play()
