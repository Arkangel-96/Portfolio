class_name Fortress extends Info


const FIRE = preload("res://scenes/FX/Fire.tscn")
#const WORKER = preload("res://scenes/ally/Worker.tscn")

var flames
@onready var nodo: Node2D = $Flames
@onready var audio: AudioStreamPlayer = $AudioStreamPlayer
@onready var obrero: Node2D = $Worker
@onready var health_component: HealthComponent = $Components/HealthComponent
@onready var progress_bar: ProgressBar = $ProgressBar
#@onready var world = get_node("/root/World/")
#@onready var player = get_node("/root/World/Player")

func _ready() -> void:
	health_component.progress_bar.value = 52

func _process(_delta: float) -> void:
	
	
	flames = [get_node("Flames").get_children()]
	in_flames()
	repair()
	
#func _physics_process(delta: float) -> void:
	
		
func in_flames():
	for x in get_node("Flames").get_child_count():
		if world.hp == 0 or world.hp >=75 :
			nodo.visible= false
			get_node("Flames").get_child(x).visible= false
			get_node("Flames").get_child(x).process_mode = Node.PROCESS_MODE_DISABLED
		elif world.hp <=50:
			nodo.visible= true
			await get_tree().create_timer(12).timeout
			get_node("Flames").get_child(x).process_mode = Node.PROCESS_MODE_INHERIT
			get_node("Flames").get_child(x).visible= true
			#print(get_node("Flames").get_child(x))
		
func repair():			
	if world.hp == 0 or world.hp >=75 :			
		obrero.visible= false
		get_node("Worker").visible= false
		get_node("Worker").process_mode = Node.PROCESS_MODE_DISABLED
	if world.hp <=50:	
		obrero.visible= true
		get_node("Worker").visible= true
		get_node("Worker").process_mode = Node.PROCESS_MODE_INHERIT	
		

func reset():
	progress_bar.value = 100		
###await get_tree().create_timer(3).timeout
 ##world.call_deferred("add_child", MUSHROOM)
