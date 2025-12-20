extends Node

var unlocked := false

func unlock():
	if unlocked:
		return

	unlocked = true

	# Forzar un sonido mínimo
	var p := AudioStreamPlayer.new()
	add_child(p)

	var stream := AudioStreamGenerator.new()
	stream.mix_rate = 44100

	p.stream = stream
	p.play()

	await get_tree().process_frame
	p.stop()
	p.queue_free()
