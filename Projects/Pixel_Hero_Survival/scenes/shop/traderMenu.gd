extends CanvasLayer


@onready var item_name: Label = %ItemName
@onready var item_description: Label = %ItemDescription
@onready var item_price: Label = %ItemPrice
@onready var item_held_count: Label = %ItemHeldCount
@onready var item_image: TextureRect = %ItemImage

@onready var dialog: CanvasLayer = $"../Dialog"
@onready var price: Label = %Price

@onready var player = get_node("/root/Player")
@onready var world = get_node("/root/World")
@onready var pawn = get_node("/root/World/Pawn")
@onready var shop = get_node("%ShopItemContainer")

@onready var audio_stream: AudioStreamPlayer = $AudioStreamPlayer


func _process(_delta: float) -> void:
	

	%Gold.text = "Gold: " + str(world.gold)

	


func _on_close_pressed() -> void:
	
	hide()
	
	
