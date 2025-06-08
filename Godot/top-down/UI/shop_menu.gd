extends CanvasLayer


@onready var item_name: Label = %ItemName
@onready var item_description: Label = %ItemDescription
@onready var item_price: Label = %ItemPrice
@onready var item_held_count: Label = %ItemHeldCount
@onready var item_image: TextureRect = %ItemImage

@onready var dialog: CanvasLayer = $"../Dialog"
@onready var price: Label = %Price


@onready var world = get_node("/root/World")
@onready var pawn = get_node("/root/World/Pawn")
@onready var shop = get_node("%ShopItemContainer")

@onready var audio_stream: AudioStreamPlayer = $AudioStreamPlayer

const SHOP_ITEM_BUTTON = preload("res://UI/Shop_Item_Button.tscn")


func _ready() -> void:
	clear_item_list()
	show_menu(pawn.shop_inventory)
	
func _process(delta: float) -> void:
	%Gold.text = "Gold: " + str(world.gold)
	%Wood.text = "Wood: " + str(world.wood)
	
	#for e in shop.get_children():
		##print(e)
		


func _on_close_pressed() -> void:
	hide()

	
func clear_item_list():
	for c in shop.get_children():
		c.queue_free()

func show_menu(items: Array[InvItem]):
	populate_item_list(items)
	shop.get_child(0).grab_focus()

		
func populate_item_list( items :Array [InvItem]):
	for item in items:
		var shop_item : ShopItemButton = SHOP_ITEM_BUTTON.instantiate()
		shop_item.setup_item(item)
		shop.add_child(shop_item)
		shop_item.focus_entered.connect(update_item_details.bind(item))
		#shop_item.pressed.connect(purchase_item.bind(item))
	
func focused_item_changed(item : InvItem):
	if item:
		update_item_details(item)

func update_item_details(item : InvItem):
	item_image.texture = item.texture
	item_name.text = item.name
	item_description.text = item.description
	item_price.text = str(item.cost)
	item_held_count.text = str(world.gold)


	
	
