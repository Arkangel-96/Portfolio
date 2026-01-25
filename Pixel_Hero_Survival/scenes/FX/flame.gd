extends Area2D

var direction: Vector2
var speed: float = 400
var damage: int = 50

func _ready():
	connect("body_entered", Callable(self, "_on_body_entered"))

func _physics_process(delta):
	position += direction * speed * delta


func _on_body_entered(body: Node2D) -> void:
		if body is Enemy and body.alive:
			body.health_component.receive_damage(damage)
			queue_free()
