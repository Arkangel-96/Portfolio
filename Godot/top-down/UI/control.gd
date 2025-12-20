extends Control

func _on_button_pressed():
	print("CLICK OK")

	var p := AudioStreamPlayer.new()
	add_child(p)

	p.stream = preload("res://sound/Music/Goblins_Den__Regular_.mp3")
	p.stream.loop = true
	p.bus = "Master"
	p.volume_db = 0

	p.play()
