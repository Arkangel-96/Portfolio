using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NewBehaviourScript : MonoBehaviour
{

    public float moveSpeed = 0.5f;
    private Rigidbody2D rb;
    public Vector2 input;

    public Animator anim;
    public Vector2 lastMoveDirection;
    public Transform Aim;
    bool isWalking = false;

    // Start is called before the first frame update
    void Start()
    {
        anim = GetComponent<Animator>();
        rb = GetComponent<Rigidbody2D>();


    }


    // Update is called once per frame
    void Update()
    {
        ProcessInputs();
        Animate();

    }

    void FixedUpdate()
    {

        rb.velocity = input * moveSpeed ;

        if (isWalking)
        {
            Vector3 vector3 = Vector3.left * input.x + Vector3.down * input.y;
            Aim.rotation = Quaternion.LookRotation(Vector3.forward , vector3);

        }

    }

    void ProcessInputs()
    {

        // Almacena la última dirección, cuando se deja de mover
        float moveX = Input.GetAxisRaw("Horizontal");
        float moveY = Input.GetAxisRaw("Vertical");

        if ((moveX == 0 && moveY == 0) && (input.x != 0 || input.y != 0)) 
        {
            isWalking = false;
            lastMoveDirection = input;
            Vector3 vector3 = Vector3.left * lastMoveDirection.x + Vector3.down * lastMoveDirection.y;
            Aim.rotation = Quaternion.LookRotation(Vector3.forward, vector3);

        }
        else if (moveX != 0 || moveY != 0)
        {

            isWalking = true;
        }
        
      

        input.x = Input.GetAxisRaw("Horizontal");
        input.y = Input.GetAxisRaw("Vertical");

        input.Normalize(); //Sin esto los movimientos diagonales serían mas rápidos

    }

    void Animate()
    {



        anim.SetFloat("MoveX", input.x);
        anim.SetFloat("MoveY", input.y);
        anim.SetFloat("MoveMagnitude", input.magnitude);
        anim.SetFloat("lastMoveX", lastMoveDirection.x);
        anim.SetFloat("lastMoveY", lastMoveDirection.y);




        // ATAQUES CON MOUSE !!

        if (Input.GetMouseButtonDown(0))

        {
            anim.SetBool("attack_1", true);
            anim.SetBool("attack_2", false);


        }

        if (Input.GetMouseButtonDown(1))

        {
            anim.SetBool("attack_2", true);
            anim.SetBool("attack_1", false);


        }

        else if (Input.GetKeyDown(KeyCode.Space))
        {
            anim.SetBool("attack_1", false);
            anim.SetBool("attack_2", false);
        }
    }


   
}
