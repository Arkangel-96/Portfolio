extends Node

@onready var player := AudioStreamPlayer.new()

func _ready():
	add_child(player)
	player.bus = "Music"

# SOLO usar desde input
func play_from_user_input(stream: AudioStream):
	player.stream = stream
	player.play()
