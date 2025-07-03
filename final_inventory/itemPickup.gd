

@tool

class_name ItemPickup extends Node2D

@export var item_data :ItemData: set = _set_item_data

@onready var sprite_2d: Sprite2D = $Sprite2D
@onready var area_2d: Area2D = $Area2D
@onready var audio_stream_player_2d: AudioStreamPlayer2D = $AudioStreamPlayer2D
@onready var player = get_node("/root/World/Player")

func _ready() -> void:
	_update_texture()
	if Engine.is_editor_hint(): 
		return
	#area_2d.body_entered.connect(_on_area_2d_body_entered)

func _on_area_2d_body_entered(body) -> void:
	if body is Player:
		if item_data:
			if player.PLAYER_INV.add_item(item_data) == true:
				player.PLAYER_INV.add_item(item_data)
				item_picked_up()

func item_picked_up():
	#area_2d.body_entered.disconnect(_on_area_2d_body_entered)
	audio_stream_player_2d.play()
	visible= false
	await audio_stream_player_2d.finished
	queue_free()

func _set_item_data(value : ItemData):
	item_data = value
	_update_texture()
	pass
	

	
func _update_texture():
	if item_data and sprite_2d:
		sprite_2d.texture = item_data.texture
	
