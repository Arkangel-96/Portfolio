extends CanvasLayer


@onready var world = get_node("/root/World")
@onready var player = get_node("/root/World/Player")
@onready var music_player: AudioStreamPlayer = $AudioStreamPlayer



func _ready() -> void:
	visible = true


func _on_gold_button_pressed() -> void:
	world.gold += 200
	_start_game()

func _on_hp_button_pressed() -> void:
	world.hp += 50
	world.hpMax += 50
	_start_game()

func _on_atk_button_pressed() -> void:
	player.attack_damage += 25
	_start_game()

func _start_game():
	# 🔥 ESTO ES LO IMPORTANTE
	if not music_player.playing:
		music_player.play()

	visible = false
	get_tree().paused = false
