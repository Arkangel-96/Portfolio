extends CanvasLayer


@onready var shop_menu: CanvasLayer = $"../ShopMenu"
@onready var world = get_node("/root/World")
@onready var player = get_node("/root/Player")

func _on_trade_pressed() -> void:
		shop_menu.show()
		#player.inventory_ui.show()
		world.shop = true
		hide()
		
func _on_close_pressed() -> void:
		hide()
		#player.inventory_ui.hide()
