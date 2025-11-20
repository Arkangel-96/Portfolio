extends CanvasLayer

@onready var player: Player = $"../Player"

func _physics_process(delta: float) -> void:
	if Input.is_action_just_released("ESC"):
		print("PAUSE")
		get_tree().paused = not get_tree().paused
		$ColorRect.visible = not $ColorRect.visible
		$Label.visible = not $Label.visible
