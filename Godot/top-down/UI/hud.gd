extends CanvasLayer

@onready var player = get_node("/root/World/Player")
@onready var fortress = get_node("/root/World/Fortress")
@onready var world = get_node("/root/World")


func _process(delta: float) -> void:
	
	%Gold.text =  str(world.gold)
	%Wood.text =  str(world.wood)
	
func _on_repair_pressed() -> void:
	if world.gold >= 200 and world.wood >= 100:
		world.hp +=  70
		fortress.health_component.current_health +=70
		fortress.audio.play()
		world.gold -= 200
		world.wood -= 100
	else:
		pass
