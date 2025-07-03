
class_name InventoryUI extends Control

const INVENTORY_SLOT = preload("res://final_inventory/InventorySlot.tscn")

@export var data: InventoryData

func _ready() -> void:
	update_inv()
	
func clear_inv():
	for c in get_children():
		c.queue_free()
		
func update_inv():
	for s in data.slots:
		var new_slot = INVENTORY_SLOT.instantiate()
		add_child(new_slot)
		new_slot.slot_data = s
	#get_child(0).grab_focus()
