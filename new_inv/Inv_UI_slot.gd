
extends Button

@onready var background: Sprite2D = $background
@onready var container: CenterContainer = $CenterContainer

var itemStackGUI: ItemStackGUI

func insert(isg: ItemStackGUI):
	itemStackGUI = isg
	background.frame = 1
	container.add_child(itemStackGUI)

func takeItem():
	var item = itemStackGUI
	container.remove_child(itemStackGUI)
	itemStackGUI = null
	background.frame = 0
	
	return item
