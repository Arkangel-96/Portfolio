extends Area2D

var item_type : int

const gem = preload("res://art/Deco/04.png")
const mushroom = preload("res://art/Deco/02.png")
const pumpkin = preload("res://art/Deco/13.png")
const cocaLeaves = preload("res://art/Deco/11.png")
const gold = preload("res://art/Resources/Resources/G_Idle.png")
const wood = preload("res://art/Resources/Resources/W_Idle.png")

var textures = [gem,mushroom,pumpkin,gold,wood]

@onready var world = get_node("/root/World")
@onready var HP_label = get_node("/root/World/HUD/HP_Label")
@onready var Level_label = get_node("/root/World/HUD/Level_Label")
@onready var EXP_label = get_node("/root/World/HUD/EXP_Label")
@onready var gold_label = get_node("/root/World/HUD/gold_Label")
@onready var wood_label = get_node("/root/World/HUD/wood_Label")

@export var item :InvItem

func _ready() -> void:
	$Sprite2D.texture = textures[item_type]

func _on_body_entered(body: Node2D) -> void:
	if item_type == 0:
		world.exp += 10
		print(world.exp)
		EXP_label.text = "EXP: " +str(world.exp)
		
	elif item_type == 1:
		world.hp += 30
		print(world.hp)
		HP_label.text = "HP: " +str(world.hp)
		
		
	elif item_type == 2:
		world.hp += 50
		print(world.hp)
		HP_label.text = "HP: " +str(world.hp)
		
	elif item_type == 3:
		world.gold += 20
		print(world.gold)
		gold_label.text = "gold: " +str(world.gold)
		
	elif item_type == 4:
		world.wood += 20
		print(world.wood)
		wood_label.text = "wood: " +str(world.wood)
	queue_free()
	
