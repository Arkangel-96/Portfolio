extends CanvasLayer

@onready var dialog: CanvasLayer = $"../Dialog"
@onready var price: Label = %Price
@onready var world = get_node("/root/World")


func _process(delta: float) -> void:
	print(world.shop)
	%Gold.text = "Gold: " + str(world.gold)
	%Wood.text = "Wood: " + str(world.wood)

func _on_close_pressed() -> void:
	hide()
