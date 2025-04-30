class_name HealthComponent extends Node2D

@export var alive : bool
@export var progress_bar: ProgressBar 
@export var current_health:= 25
@export var max_health:= 100 

signal death

func _ready() -> void:
	alive = true
	update_health_bar()

func update_health_bar():
	if progress_bar:
		progress_bar.value = current_health
		

func receive_damage(amount: int):
	current_health = clamp(current_health - amount, 0, max_health)
	update_health_bar()
	if current_health<=0:
		alive = false
		on_death()
	
func apply_health(amount: int):
	current_health = clamp(current_health + amount, 0, max_health)
	update_health_bar()
 
func on_death():
	death.emit()
