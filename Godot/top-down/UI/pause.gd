extends CanvasLayer

@onready var player: Player = $"../Player"

func _physics_process(delta):
	if Input.is_action_just_released("ESC"):
		var paused := not get_tree().paused
		get_tree().paused = paused

		$ColorRect.visible = paused
		$Label.visible = paused
