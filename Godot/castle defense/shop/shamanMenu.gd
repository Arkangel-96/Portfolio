extends CanvasLayer

@onready var player = get_node("/root/World/Player")
@onready var world = get_node("/root/World")



func _process(_delta: float) -> void:
	
	

	%Amount.text  = "Healing cost:  " +str((world.hpDmg*2)) + " Gold & Wood"


func _on_heal_pressed() -> void:
	if (world.gold > (world.hpDmg*2))  and (world.wood > (world.hpDmg*2)) :
		world.hp +=  world.hpDmg
		world.gold -= (world.hpDmg*2)
		world.wood -= (world.hpDmg*2)
	else:
		pass
