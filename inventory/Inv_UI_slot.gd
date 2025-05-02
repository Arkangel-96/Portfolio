

extends Panel

@onready var item_display: Sprite2D = $CenterContainer/Panel/item_display
@onready var amount_text :Label  = $CenterContainer/Panel/Label


func update(slot: InvSlot):
	if !slot.item:
		item_display.visible = false
		amount_text.visible = false
	else:
		item_display.visible = true 
		item_display.texture = slot.item.texture 
		if slot.amount > 1 :
			amount_text.visible = true
			amount_text.text = str(slot.amount)
	pass
