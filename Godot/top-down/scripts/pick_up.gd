extends StaticBody2D



func _on_interactable_area_body_entered(body):
		#player.collect(item)
		if body is Player:
			queue_free()
		pass

#
#const cocaLeaves = preload("res://art/Deco/10.png")
#const mushroom = preload("res://art/Deco/02.png")
#const pumpkin = preload("res://art/Deco/13.png")
#const coca = preload("res://art/Deco/11.png")
#const gold = preload("res://art/Resources/Resources/G_Idle.png")
#const wood = preload("res://art/Resources/Resources/W_Idle.png")
#
#
#var textures = [cocaLeaves,mushroom] #,pumpkin,gold,wood
#var item_type : int
#
#
#
#func _ready() -> void:
	#$Sprite2D.texture = textures[item_type]
#
#func _on_body_entered(body: Node2D) -> void:
	#if item_type == 0:
		#world.exp += 10
		#print(world.exp)
		#EXP_label.text = "EXP: " +str(world.exp)
		#
	#elif item_type == 1:
		#world.hp += 30
		#print(world.hp)
		#HP_label.text = "HP: " +str(world.hp)
		#
		#
	#elif item_type == 2:
		#world.hp += 50
		#print(world.hp)
		#HP_label.text = "HP: " +str(world.hp)
		#
	#elif item_type == 3:
		#world.gold += 20
		#print(world.gold)
		#gold_label.text = "gold: " +str(world.gold)
		#
	#elif item_type == 4:
		#world.wood += 20
		#print(world.wood)
		#wood_label.text = "wood: " +str(world.wood)
	#queue_free()
	#
