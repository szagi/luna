var skin : GUISkin;
private var buttonOutlineAndTextColor = Color.white;
var achi : String[] = ["Osiągnięcia: "];
var loadMainMenu : String;

private var savedTimeScale : float;
private var pauseFilter;
private var currentPage : Page;
private var toolbarInt : int = 0;
private var toolbarStrings : String[] = ["Dźwięk", "Grafika"];
private var firstPersonControllerCamera;
private var mainCamera;

enum Page 
{
    None, Main, Options, Achi
}

function LateUpdate() 
{
	if (Input.GetKeyDown("escape")) 
	{
        switch (currentPage) 
		{
            case Page.None : PauseGame(); 
			break;
			
            case Page.Main : UnPauseGame(); 
			break;
			
            default : currentPage = Page.Main;
        }
    }
}

function OnGUI() 
{
    if (skin != null) 
	{
		GUI.skin = skin;
	}
		
	if (IsGamePaused()) 
	{
        GUI.color = buttonOutlineAndTextColor;
        
		switch (currentPage) 
		{
            case Page.Main: PauseMenu(); 
			break;
            
			case Page.Options: ShowToolbar(); 
			break;
            
			case Page.Achi: ShowAchi(); 
			break;
        }
    } 
}

function ShowToolbar() 
{
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	
	BeginPage(400, 200);
	
    toolbarInt = GUILayout.Toolbar (toolbarInt, toolbarStrings);
    
	switch (toolbarInt) 
	{
        case 0 : VolumeControl(); 
		break;
        
		case 1 : Qualities(); 
		QualityControl(); 
		break;
    }
	
	if (GUILayout.Button("Wróć")) 
	{
        currentPage = Page.Main;
    }
	
    EndPage();
}

function ShowAchi() 
{
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	
    BeginPage(400, 200);
	
	for (var credit in achi) 
	{
        GUILayout.Label(credit);
    }
	
    
	
	if (GUILayout.Button("Wróć")) 
	{
        currentPage = Page.Main;
    }
	
    EndPage();
}

function Qualities() 
{
    switch (QualitySettings.currentLevel)
	{
        case QualityLevel.Fastest:
		GUILayout.Label("Najszybsze");
		break;
        
		case QualityLevel.Fast:
		GUILayout.Label("Szybkie");
		break;
        
		case QualityLevel.Simple:
		GUILayout.Label("Normalne");
		break;
        
		case QualityLevel.Good:
        GUILayout.Label("Dobre");
		break;
        
		case QualityLevel.Beautiful:
        GUILayout.Label("Bardzo dobre");
		break;
        
		case QualityLevel.Fantastic:
        GUILayout.Label("Fantastyczne");
		break;
    }
}

function QualityControl() 
{
    GUILayout.BeginHorizontal();
	
    if (GUILayout.Button("Zmniejsz")) 
	{
        QualitySettings.DecreaseLevel();
    }
	
    if (GUILayout.Button("Zwiększ")) 
	{
        QualitySettings.IncreaseLevel();
    }
	
    GUILayout.EndHorizontal();
}

function VolumeControl()
{
	GUILayout.Label("Użyj suwaka aby dopasować głośność. Standardowo dźwięk ustawiony jest na 100%.");
    AudioListener.volume = GUILayout.HorizontalSlider(AudioListener.volume, 0.0, 1.0);
}

function BeginPage(width, height) 
{
    GUILayout.BeginArea(Rect((Screen.width - width) / 2, (Screen.height - height) / 2, width, height));
}

function EndPage() 
{
    GUILayout.EndArea();
}

function PauseMenu() 
{
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "");
	
	BeginPage(400, 200);
	
	if (GUILayout.Button ("Kontynuuj"))
	{
        UnPauseGame();
    }
	
	if (GUILayout.Button ("Ustawienia"))
	{
		currentPage = Page.Options;
    }
	
    if (GUILayout.Button ("Osiągnięcia")) 
	{
        currentPage = Page.Achi;
    }
	
	if (GUILayout.Button ("Wyjdź do głównego menu"))
	{
		Application.LoadLevel(loadMainMenu);
	}
	
    EndPage();
}

function PauseGame() 
{
    savedTimeScale = Time.timeScale;
    Time.timeScale = 0;
    AudioListener.pause = true;
	firstPersonControllerCamera = gameObject.Find("First Person Controller").GetComponent("MouseLook");
	mainCamera = gameObject.Find("Main Camera").GetComponent("MouseLook");
	firstPersonControllerCamera.enabled = false;
	mainCamera.enabled = false;
	
	if (pauseFilter) 
	{
		pauseFilter.enabled = true;
	}
	
    currentPage = Page.Main;
}

function UnPauseGame() 
{
    Time.timeScale = savedTimeScale;
    AudioListener.pause = false;
	firstPersonControllerCamera.enabled = true;
	mainCamera.enabled = true;
	
	if (pauseFilter) 
	{
		pauseFilter.enabled = false;
	}
	
    currentPage = Page.None;
}

function IsGamePaused() 
{
    return Time.timeScale == 0;
}

function OnApplicationPause (pause : boolean) 
{
    if (IsGamePaused()) 
	{
		AudioListener.pause = true;
    }
}