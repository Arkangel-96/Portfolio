class_name ShopItemButton extends Button

var item: InvItem

@onready var world = get_node("/root/World")
@onready var pawn = get_node("/root/World/Pawn")
@onready var audio_stream: AudioStreamPlayer = $AudioStreamPlayer



func setup_item( _item:InvItem) -> void:
	item = _item
	$Label.text = item.name
	$TextureRect.texture = item.texture
	$Price.text = str(item.cost)
	$ID.text = str(item.ID)
	
func _on_pressed() -> void:
	purchase_item(item)
	
func purchase_item(item : InvItem):
	var can_purchase : bool = world.gold >= item.cost
	if can_purchase:
		pawn.drop_item()
	else:
		audio_stream.play()
