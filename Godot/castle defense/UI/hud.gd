extends CanvasLayer

@onready var player = get_node("/root/World/Player")
@onready var fortress = get_node("/root/World/Fortress")
@onready var world = get_node("/root/World")



func _process(_delta: float) -> void:
	
	
	%Gold.text =  str(world.gold)


	
