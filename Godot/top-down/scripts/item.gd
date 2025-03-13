extends Area2D

var item_type : int

const gem = preload("res://art/Deco/04.png")
const mushroom = preload("res://art/Deco/01.png")
const pumpkin = preload("res://art/Deco/11.png")
const gold = preload("res://art/Resources/Resources/G_Idle.png")
const wood = preload("res://art/Resources/Resources/W_Idle.png")

var textures = [gem,mushroom,pumpkin,gold,wood]

@onready var health_component: HealthComponent = $Components/HealthComponent

func _ready() -> void:
	$Sprite2D.texture = textures[item_type]

func _on_body_entered(body: Node2D) -> void:
	if item_type == 0:
		print("EXP")
		body.exp += 1
	elif item_type == 1:
		print("+hp")
		body.health_component.current_health += 10
	elif item_type == 2:
		print("cocaine")
		body.boost()
	elif item_type == 3:
		print("gold")
		body.gold += 1
	elif item_type == 4:
		print("wood")
	queue_free()
	
