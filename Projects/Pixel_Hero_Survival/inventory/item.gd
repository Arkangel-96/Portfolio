@tool
class_name Item extends Area2D

#d

@export var type: ItemType

		

enum ItemType {MUSHROOM, GEM, COCA, PUMPKIN, GOLD, WOOD}


func collect_item():
	queue_free()

func get_texture() -> CompressedTexture2D:
	return $Sprite2D.texture
	
