extends PanelContainer

signal inventory_item_ui_selected(item_type:Item.ItemType)

#@onready var h_box_container: HBoxContainer = $HBoxContainer
@onready var grid_container: GridContainer = $NinePatchRect/GridContainer

const INVENTORY_ITEM_UI = preload("res://Items/Inventory_Item_UI.tscn")

func add_item(type:Item.ItemType, texture:CompressedTexture2D, quantity:int):
	var node_name= "inventory_item_" + str(type)
	if not grid_container.has_node(node_name):
		var inventory_item = INVENTORY_ITEM_UI.instantiate()
		inventory_item.name = node_name
		inventory_item.initialize(type,texture,quantity)
		inventory_item.connect("inventory_item_used", _on_inventory_item_used)
		grid_container.add_child(inventory_item)
	else:
		var existing_node = grid_container.get_node(node_name)
		existing_node.set_quantity(quantity)

func _on_inventory_item_used(item_type: Item.ItemType):
	inventory_item_ui_selected.emit(item_type)
	
		
func _on_inv_item_added(item: Item, quantity: int) -> void:
	add_item(item.type, item.get_texture(), quantity)


func _on_inv_item_consumed(item_type: Item.ItemType, quantity_left: int) -> void:
	var node_name= "inventory_item_" + str(item_type)
	if grid_container.has_node(node_name):
		var existing_node = grid_container.get_node(node_name)
		if quantity_left > 0:
			existing_node.set_quantity(quantity_left)
		else:
			existing_node.queue_free()	
