extends Node

@onready var music := AudioStreamPlayer.new()

var normal_volume := 6.0
var low_volume := -30.0
var current_stream: AudioStream
var audio_unlocked := false

func _ready():
	add_child(music)
	music.bus = "Music"
	music.volume_db = normal_volume

	if OS.has_feature("web"):
		music.autoplay = false

func unlock_audio():
	if audio_unlocked:
		return
	audio_unlocked = true
	print("AUDIO DESBLOQUEADO")
	
func play(stream: AudioStream):
	print("PLAY LLAMADO | unlocked =", audio_unlocked)

	if OS.has_feature("web") and not audio_unlocked:
		print("BLOQUEADO POR WEB")
		return

	current_stream = stream
	music.stream = stream
	music.play()
	print("MUSICA PLAY")


func fade_down_and_restore(delay: float, fade_in_time: float = 1.0):
	var tween_down := create_tween()
	tween_down.tween_property(music, "volume_db", low_volume, 0.4)

	await get_tree().create_timer(delay).timeout

	var tween_up := create_tween()
	tween_up.tween_property(music, "volume_db", normal_volume, fade_in_time)
