using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

// [CreateAssetMenu(fileName = "Data", menuName = "ScriptableObjects/Enemy", order = 1)]

public class Enemy : MonoBehaviour
{
    
    Rigidbody2D rb;
    Vector2 moveDirection;

    public Animator anim;
    private Transform target;

    public int damage = 6;
    public int health = 30;
    public int maxHealth = 100;
    public float speed = 0.5f;



    // Start is called before the first frame update
    void Start()
    {
        anim = GetComponent<Animator>();
        rb = GetComponent<Rigidbody2D>();
        health = maxHealth;

        target = GameObject.Find("Player").transform;

    }

   

    // Update is called once per frame
    void Update()

    {
        Swarm();
      
    }


    private void Swarm()
    {

        anim.SetFloat("moveX", moveDirection.x);
        anim.SetFloat("moveY", moveDirection.y);

        if (target)
        {

            rb.velocity = new Vector2(moveDirection.x, moveDirection.y) * speed;

            Vector3 direction = (target.position - transform.position).normalized;
            moveDirection = direction;
            
        }

    }

    public void OnTriggerEnter2D(Collider2D collider)
    {
        Debug.Log("OLAAAAA");
        if (collider.CompareTag("Player")) {

            Debug.Log("OLAAAAA");
            if (collider.GetComponent<Health>() != null)
            {
                
                collider.GetComponent<Health>().Damage(damage);
                this.GetComponent<Health>().Damage(damage);

            }

        }
    }



}
