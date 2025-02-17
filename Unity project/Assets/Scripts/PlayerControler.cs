using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NewBehaviourScript : MonoBehaviour
{

    private Rigidbody2D rb;
    private Animator animator;
    public float moveSpeed = 100;
    public Vector2 input;

    private bool attacking = false; 
    private GameObject attackArea = default;
    private float timeToAttack = 0.25f;
    private float timer = 0f;

    // Start is called before the first frame update
    void Start()
    {
        rb = GetComponent <Rigidbody2D> ();
        animator = GetComponent <Animator> ();

        attackArea = transform.GetChild(0).gameObject;
    }
    void FixedUpdate() {

        //if (input.x !=0 ) input.y = 0;
        rb.velocity = new Vector2(input.x * moveSpeed * Time.deltaTime, input.y * moveSpeed * Time.deltaTime);
        
        if (rb.velocity != Vector2.zero){

            animator.SetFloat("moveX", input.x);
            animator.SetFloat("moveY", input.y);
            animator.SetBool("moving", true);

        } 
        else {

            animator.SetBool("moving", false);

        }
    }

    private void Attack()
    {
        
        attacking = true;
        attackArea.SetActive(attacking);
        

    }



    // Update is called once per frame
    void Update()
    {
        input.x = Input.GetAxisRaw("Horizontal");
        input.y = Input.GetAxisRaw("Vertical");

        if (Input.GetMouseButtonDown(0))  

        {
            animator.SetBool("attack_1", true);
            animator.SetBool("attack_2", false);


        }

        if (Input.GetMouseButtonDown(1))  

        {
            animator.SetBool("attack_2", true);
            animator.SetBool("attack_1", false);


        }

        else if (Input.GetKeyDown(KeyCode.Space))
        {
            animator.SetBool("attack_1", false);
            animator.SetBool("attack_2", false);
        }




        if (attacking) {

            timer += Time.deltaTime;

            if (timer >= timeToAttack) {

                timer = 0;
                attacking = false;
                attackArea.SetActive(attacking);

            }
        } 


    }

}
