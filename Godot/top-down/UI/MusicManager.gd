extends Node

@onready var music := AudioStreamPlayer.new()

var normal_volume := 6
var low_volume := -30.0
var current_stream: AudioStream

func _ready():
	add_child(music)
	music.bus = "Music"
	music.volume_db = normal_volume

func play(stream: AudioStream):
	if current_stream == stream and music.playing:
		return

	current_stream = stream
	music.stream = stream
	music.play()

func fade_down_and_restore(delay: float, fade_in_time: float = 1.0):
	var tween_down := create_tween()
	tween_down.tween_property(music, "volume_db", low_volume, 0.4)

	await get_tree().create_timer(delay).timeout

	var tween_up := create_tween()
	tween_up.tween_property(music, "volume_db", normal_volume, fade_in_time)
