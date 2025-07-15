extends CanvasLayer


@onready var shop_menu: CanvasLayer = $"../ShopMenu"
@onready var world = get_node("/root/World")

func _on_trade_pressed() -> void:
		shop_menu.show()
		world.shop = true

func _on_close_pressed() -> void:
		hide()
