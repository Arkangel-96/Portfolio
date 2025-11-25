extends CanvasLayer

func update_aura(aura_name: String, remaining: float, max_time: float) -> void:
	var aura_node = find_child(aura_name, true, false)

	if aura_node == null:
		push_warning("HUD: No encontré el aura llamada: " + aura_name)
		return

	var bar = aura_node.find_child("Bar", true, false)
	var label = aura_node.find_child("Label", true, false)

	if bar == null:
		push_warning("HUD: No encontré 'Bar' dentro de " + aura_name)
		return
	if label == null:
		push_warning("HUD: No encontré 'Label' dentro de " + aura_name)
		return

	var percent = 0.0
	if max_time > 0:
		percent = remaining / max_time

	bar.value = percent * 100.0
	label.text = str(round(remaining))
