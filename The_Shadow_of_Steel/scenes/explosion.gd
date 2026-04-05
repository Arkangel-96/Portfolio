extends CPUParticles2D

var alive = false

func _ready() -> void:
	emitting = true
	
func _process(delta: float) -> void:
	if !emitting:
		queue_free()
