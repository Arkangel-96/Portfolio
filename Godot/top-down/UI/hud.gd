extends CanvasLayer

@onready var player = get_node("/root/World/Player")
@onready var fortress = get_node("/root/World/Fortress")
@onready var world = get_node("/root/World")
 

func _process(delta: float) -> void:
	
	%Gold.text =  str(world.gold)
	%Wood.text =  str(world.wood)
	%Amount.text  = "Repair cost:" +str((world.hpDmg*5))
	
func _on_repair_pressed() -> void:
	if (world.gold > (world.hpDmg*5))  and (world.wood > (world.hpDmg*5)) :
		world.hp +=  world.hpDmg
		fortress.health_component.current_health += world.hpDmg
		fortress.audio.play()
		world.gold -= (world.hpDmg*5)
		world.wood -= (world.hpDmg*5)
	else:
		pass
