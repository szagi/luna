    using UnityEngine;
    using System.Collections;
     

    public class achi : MonoBehaviour {
     
	
	
	
        GUIStyle bg = new GUIStyle();
//        GUIStyle heading = new GUIStyle();
//       GUIStyle text = new GUIStyle();
     
        public int display_time;
     
        float menu_x;
        float menu_x_target;
        bool moving_in;
        float time;
     
        void Start()
        {
            moving_in = true;
            menu_x_target = Screen.width - 425;
            menu_x = Screen.width;
            SetupStyles();
     
        }
     
        void Update()
        {
            time += Time.deltaTime;
            if (menu_x > menu_x_target && moving_in)
            {
                menu_x -= Time.deltaTime * 400;
            }
            else if (menu_x < Screen.width && time > display_time)
            {
                moving_in = false;
                menu_x += Time.deltaTime * 400;
                if (menu_x > Screen.width)
                {
                    Destroy(GetComponent<achi>());
                }
            }
        }
     
        void SetupStyles()
        {
            bg.normal.background = (Texture2D)Resources.Load("freak")as Texture2D;
       
        }
     
        void OnGUI()
        {
            GUI.BeginGroup(new Rect(menu_x, 5, 420, 150), "", bg);
     
            GUI.EndGroup();
        }
    }