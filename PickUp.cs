using UnityEngine;
using System.Collections;

public class PickUp : MonoBehaviour {

	// Use this for initialization
	void Picked(GameObject newItem)
	{
		Debug.Log(newItem);
	}
	// Update is called once per frame
	void Update () {
	
		if( Input.GetKey( KeyCode.F ) ) 
		{ 
			Picked(this.gameObject);
		} 
	}
}
