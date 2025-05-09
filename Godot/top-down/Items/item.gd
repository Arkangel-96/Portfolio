@tool
class_name Item extends Area2D

@export var texture:CompressedTexture2D:
	set(value):
		texture = value
		$Sprite2D.texture = value


enum ItemType {MUSHROOM, GEM, COCA, PUMPKIN, GOLD, WOOD}

@export var type: ItemType

		
func collect_item():
	queue_free()

func get_texture() -> CompressedTexture2D:
	return $Sprite2D.texture
	
