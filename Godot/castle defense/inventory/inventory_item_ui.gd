class_name InventoryItemUI extends Panel

signal inventory_item_used(item_type:Item.ItemType)

var item_type:Item.ItemType

var pick: bool = false

@onready var world = get_node("/root/World")

func initialize(type:Item.ItemType, texture:CompressedTexture2D, quantity:int):
	item_type = type
	$TextureRect.texture = texture
	$Label.text = str(quantity)
	
func set_quantity(quantity:int):
	$Label.text = str(quantity)

func _input(event: InputEvent) -> void:
	if event is InputEventMouseButton and event.button_index == MOUSE_BUTTON_RIGHT and event.is_released():
		if pick and world.shop:
			inventory_item_used.emit(item_type)



func _on_mouse_entered() -> void:
	pick = true
	var tween = get_tree().create_tween()
	tween.tween_property($NinePatchRect,"modulate", Color.PURPLE, 0.3)
	
func _on_mouse_exited() -> void:
	pick = false
	var tween = get_tree().create_tween()
	tween.tween_property($NinePatchRect,"modulate", Color.WHITE, 0.3)
