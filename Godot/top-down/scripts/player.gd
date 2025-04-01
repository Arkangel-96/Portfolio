class_name Player extends CharacterBody2D


@onready var health_component: HealthComponent = $Components/HealthComponent
@onready var world = get_node("/root/World")
@onready var HP_label = get_node("/root/World/HUD/HP_Label")
@onready var Level_label = get_node("/root/World/HUD/Level_Label")
@onready var EXP_label = get_node("/root/World/HUD/EXP_Label")
@onready var gold_label = get_node("/root/World/HUD/gold_Label")
@onready var wood_label = get_node("/root/World/HUD/wood_Label")

#@export var item :InvItem
