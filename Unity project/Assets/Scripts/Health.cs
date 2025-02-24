using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Health : MonoBehaviour

{
    //  ÁREA DE ATAQUE //
    private GameObject attackArea = default;
    private bool attacking = false;
    private float timeToAttack = 0.25f;
    private float timer = 0f;


    // ATRIBUTOS DEL PERSONAJE //

    public int health = 10;
    public int MAX_HEALTH = 100;


    // Start is called before the first frame update
    void Start()
    {
        attackArea = transform.GetChild(0).gameObject;
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetMouseButtonDown(0))
        {
            Damage(10);

        }

        if (Input.GetKeyDown(KeyCode.V))
        {
            Heal(10);

        }

        if (attacking)
        {
            timer += Time.deltaTime;

            if (timer >= timeToAttack)
            {

                timer = 0f;
                attacking = false;
                attackArea.SetActive(attacking);

            }

        }
    }

    public void Damage(int amount)
    {
        if (amount < 0)
        {
            throw new System.ArgumentOutOfRangeException("NO pude tener DAÑO negativo");


        }

        this.health -= amount;

        if (health <= 0)
        {
            Debug.Log("YO ya estoy muerto");
            Destroy(gameObject);
        }
    }


    public void Heal(int amount)
    {
        if (amount < 0)
        {
            throw new System.ArgumentOutOfRangeException("NO pude tener DAÑO negativo");
        }

        if (health + amount > MAX_HEALTH)
        {
            this.health = MAX_HEALTH;
            Debug.Log("SALUD AL MAXIMO");
        }
        else
        {

            this.health += amount;
        }

    }


    private void Attack()
    {

        attacking = true;
        attackArea.SetActive(attacking);



    }

}
