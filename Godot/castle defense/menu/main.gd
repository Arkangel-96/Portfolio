extends Control



func _on_play_pressed() -> void:
	get_tree().change_scene_to_file("res://scenes/World.tscn")


func _on_options_pressed() -> void:
	get_tree().change_scene_to_file("res://menu/Options.tscn")



func _on_credits_pressed() -> void:	
	get_tree().change_scene_to_file("res://menu/Credits.tscn")


func _on_exit_pressed() -> void:
	get_tree().quit()
