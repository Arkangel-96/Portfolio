class_name Info extends CharacterBody2D


@onready var health_component: HealthComponent = $Components/HealthComponent
@onready var world = get_node("/root/World")
@onready var HP_label = get_node("/root/World/HUD/HP_Label")
@onready var Level_label = get_node("/root/World/HUD/Level_Label")
@onready var EXP_label = get_node("/root/World/HUD/EXP_Label")
@onready var gold_label = get_node("/root/World/HUD/gold_Label")
@onready var wood_label = get_node("/root/World/HUD/wood_Label")


signal shoot
signal attack_finished

var disable_mouse:bool = false
var move_speed 
var attack_damage
var is_attack = false
var down = false
var up = false

var gold = 0
var exp = 0

const START_SPEED = 200
const BOOST_SPEED = 400
#@export var item :InvItem
