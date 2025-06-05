class_name Pawn extends CharacterBody2D

@onready var world = get_node("/root/World")
@onready var player = get_node("/root/World/Player")
@onready var sprite_animation : AnimatedSprite2D = $AnimatedSprite2D
@onready var atk = $AudioStreamPlayerREP
@onready var shop_menu: CanvasLayer = $"../ShopMenu"
@onready var dialog: CanvasLayer = $"../Dialog"

@export var shop_inventory : Array [InvItem]


var GEM = preload("res://inventory/scenes/Item-1-GEM.tscn")
var MUSH = preload("res://inventory/scenes/Item-2-MUSH.tscn")
var PUMP = preload("res://inventory/scenes/Item-3-PUMP.tscn")
var LEAVES = preload("res://inventory/scenes/Item-4-LEAVES.tscn")
var GOLD = preload("res://inventory/scenes/Item-5-GOLD.tscn")
var WOOD = preload("res://inventory/scenes/Item-6-WOOD.tscn")

var drop = [GEM,MUSH,PUMP,LEAVES,GOLD,WOOD]
var item_type = randi_range(0,5)

var SHOP_ITEM_BUTTON = preload("res://UI/Shop_Item_Button.tscn")



func drop_item(): 
	
	var item = drop[SHOP_ITEM_BUTTON.ID].instantiate()
	print(item_type)
	var random_angle: float = randf() * PI * 2
	var spawn_distance: float = randf_range(45,90)
	var spawn_offset: Vector2 = Vector2(cos(random_angle),sin(random_angle)) * spawn_distance
	
	item.global_position = position + spawn_offset

	item.add_to_group("items")
	add_sibling(item) 

func _on_area_body_entered(body: Node2D) -> void:
	if body is Player:
		dialog.show()
		atk.play()
		player.disable_mouse = true
	

func _on_area_body_exited(body: Node2D) -> void:
	if body is Player:
		dialog.hide()
		shop_menu.hide()
		player.disable_mouse = false
		world.shop = false
