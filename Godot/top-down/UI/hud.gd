extends CanvasLayer

@onready var player = get_node("/root/World/Player")
@onready var fortress = get_node("/root/World/Fortress")
@onready var world = get_node("/root/World")


func _process(delta: float) -> void:
	
	%Gold.text =  str(world.gold)
	%Wood.text =  str(world.wood)
	%Amount.text  = "Repair cost:" +str(world.hpDmg*10)
func _on_repair_pressed() -> void:
	if (world.gold > world.hpDmg)  and (world.wood > world.hpDmg) :
		world.hp +=  world.hpDmg
		fortress.health_component.current_health += world.hpDmg
		fortress.audio.play()
		world.gold -= world.hpDmg*10
		world.wood -= world.hpDmg*10
	else:
		pass
