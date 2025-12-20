extends Node

var player: AudioStreamPlayer
var initialized := false

func _ensure_player():
	if initialized:
		return

	player = AudioStreamPlayer.new()
	add_child(player)

	var stream = preload("res://sound/SFX/04_sack_open_3.wav")
	player.stream = stream
	player.bus = "Music"
	player.volume_db = 0

	# LOOP SEGURO SEGÚN TIPO
	if stream is AudioStreamWAV:
		stream.loop_mode = AudioStreamWAV.LOOP_FORWARD
	elif stream is AudioStreamOggVorbis:
		stream.loop = true

	initialized = true


func play_music():
	_ensure_player()
	if not player.playing:
		player.play()


func stop_music():
	if player and player.playing:
		player.stop()
