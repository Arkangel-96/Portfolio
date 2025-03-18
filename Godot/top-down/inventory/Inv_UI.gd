extends Control

var is_open = false

@onready var inv: Inv = preload("res://inventory/player_Inv.tres")
@onready var slots: Array = $NinePatchRect/GridContainer.get_children()

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	update_slots()
	close()

func update_slots():
	for i in range(min(inv.items.size(),slots.size())):
		slots[i].update(inv.items[i])
	
# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	if Input.is_action_just_pressed("v"):
		if is_open:
			close()
		else:
			open()

func open():
	self.visible = true
	is_open = true
	
func close():
	visible = false
	is_open = false
