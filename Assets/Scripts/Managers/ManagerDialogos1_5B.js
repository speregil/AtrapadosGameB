#pragma strict

private var dialogosActivos : boolean;
private var enOpcion: boolean = false;
private var conversacionActual : ArbolConversacion;
private var conversacionDiana : ArbolConversacion;
private var conversacionDario : ArbolConversacion;
private var conversacionFrancisco : ArbolConversacion;
private var conversacionMario : ArbolConversacion;
private var conversacionCristina : ArbolConversacion;
private var conversacionArmario1 : ArbolConversacion;
private var conversacionArmario2 : ArbolConversacion;


private var ventana : Rect = Rect(0,(Screen.height/2)+50, Screen.width,(Screen.height/3));
private var textoActivo: String;
private var textoOpcion1: String;
private var textoOpcion2: String;
private var textoOpcion3: String;

private var texturaActual1 : Texture2D;
private var texturaActual2 : Texture2D;


//Conexión con el LevelManager
var manager : GameObject;


var customSkin: GUISkin;
var texturaDiana : Texture2D;
var texturaCristina : Texture2D;
var texturaDario: Texture2D;
var texturaMario: Texture2D;
var texturaFrancisco: Texture2D;
var texturaFabio: Texture2D;

var texturaDianaSombreada : Texture2D;
var texturaCristinaSombreada : Texture2D;
var texturaDarioSombreada: Texture2D;
var texturaMarioSombreada: Texture2D;
var texturaFranciscoSombreada: Texture2D;
var texturaFabioSombreada: Texture2D;



public static final var CONVERSACION_DIANA  :int= 0;
public static final var CONVERSACION_FABIO :int = 1;
public static final var CONVERSACION_DARIO :int = 2;
public static final var CONVERSACION_MARIO : int = 3;
public static final var CONVERSACION_CRISTINA :int = 4;
public static final var CONVERSACION_FRANCISCO  :int= 5;
public static final var CONVERSACION_ARMARIO1  :int= 6;
public static final var CONVERSACION_ARMARIO2  :int= 7;


public static final var NEGACION = 0;

public static final var ACEPTACION_DIANA = 1;

public static final var ACEPTACION_MARIO = 2;

public static final var ACEPTACION_FRANCISCO = 3;

public static final var DIALOGO_ARMARIO1 = 4;

public static final var DIALOGO_ARMARIO2 = 5;



// ================================================================================
// OnCreate
// ================================================================================

function Start(){

 inicializarConversacionDiana();
 inicializarConversacionCristina();
 inicializarConversacionDario();
 inicializarConversacionFrancisco();
 inicializarConversacionMario();
 inicializarConversacionArmario1();
 inicializarConversacionArmario2();
}


// ================================================================================
// OnGui
// ================================================================================

function OnGUI () {
var pausa : boolean = GetComponent(MenuScript).estaPausado();
if(!pausa){
GUI.skin = customSkin;
	if(dialogosActivos){
		ventana = GUI.Window(0,ventana , WindowFunction,"");
		GUI.Box(Rect(0,50,Screen.width/2,Screen.height/2),texturaActual1);
		GUI.Box(Rect(Screen.width/2,50,Screen.width/2,Screen.height/2),texturaActual2);		
	}
	
	}
}

function WindowFunction (windowID : int) {


	if(enOpcion){
	
	
	if(GUI.Button(Rect (10, 20, ventana.width, 75), textoOpcion1)){
	print("Escogio Opcion 1:");
	conversacionActual.setNodoActual(conversacionActual.getNodoActual().getHijo1());
	dibujarDialogo();
	enOpcion = false;
	textoOpcion1 = "";
	textoOpcion2 = "";
	
	}
	if(GUI.Button(Rect (10, 95, ventana.width, 75), textoOpcion2)){
		print("Escogio Opcion 2:");
	conversacionActual.setNodoActual(conversacionActual.getNodoActual().getHijo2());
	dibujarDialogo();
	enOpcion = false;
	textoOpcion1 = "";
	textoOpcion2 = "";
	}
	if(conversacionActual.getNodoActual().getHijo3()){
	
	if(GUI.Button(Rect (10, 170, ventana.width, 75), textoOpcion3)){
		print("Escogio Opcion 2:");
	conversacionActual.setNodoActual(conversacionActual.getNodoActual().getHijo3());
	dibujarDialogo();
	enOpcion = false;
	textoOpcion1 = "";
	textoOpcion2 = "";
	}
	
	
	
	}
	
	}
	else{
	GUI.Label (Rect (10, 30, ventana.width, ventana.height), textoActivo);
	}
}


// ================================================================================
// OnMouseDown
// ================================================================================
function Update(){
var pausa : boolean = GetComponent(MenuScript).estaPausado();
if(!pausa){
if(dialogosActivos && Input.GetKeyDown(KeyCode.Mouse0) && !enOpcion){

	print("OnMouseDown");
		
	print("Tiene hijos?: " +conversacionActual.getNodoActual().tieneHijos());
	
	if(!conversacionActual.getNodoActual().estaTerminado()){
	print("Dialogo:");
		dibujarDialogo();
	}
	else if(conversacionActual.getNodoActual().estaTerminado()&&conversacionActual.getNodoActual().tieneHijos()){
		print("Opciones:");
		enOpcion = true;
		dibujarOpcion();
	}
	else if(conversacionActual.getNodoActual().estaTerminado() && !conversacionActual.getNodoActual().tieneHijos()){
		print("Fin dialogo");
		dialogosActivos = false;
		GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOn();
		manager.GetComponent(IEvent_manager).DialogSwitch(conversacionActual.getResultado());
		
	}
}

}

}

// ================================================================================
// Metodos
// ================================================================================


function empezarDialogos(idConversacion:int ){
print("empezarDialogos");

switch(idConversacion){

case CONVERSACION_DIANA:

conversacionActual = conversacionDiana;

break;
case CONVERSACION_DARIO:

conversacionActual = conversacionDario;

break;
case CONVERSACION_MARIO:

conversacionActual = conversacionMario;

break;
case CONVERSACION_CRISTINA:

conversacionActual = conversacionCristina;

break;
case CONVERSACION_FRANCISCO:

conversacionActual = conversacionFrancisco;

break;
case CONVERSACION_ARMARIO1:

conversacionActual = conversacionArmario1;

break;
case CONVERSACION_ARMARIO2:

conversacionActual = conversacionArmario2;

break;
}

GetComponent(Player_Manager).getCurrentPlayer().getGameObject().GetComponent(MoverClick).MoverOff();

dialogosActivos = true;


}

function dibujarDialogo(){


if(conversacionActual.getNodoActual().getQuienLinea() == 1){
texturaActual1 = conversacionActual.getTexturaPj1();
texturaActual2 = conversacionActual.getTexturaPj2Sombreada();
}
else if (conversacionActual.getNodoActual().getQuienLinea() == 2){
texturaActual1 = conversacionActual.getTexturaPj1Sombreada();
texturaActual2 = conversacionActual.getTexturaPj2();
}

textoActivo = conversacionActual.getNodoActual().getTextoLinea();



}


function dibujarOpcion(){
textoOpcion1 = conversacionActual.getNodoActual().getHijo1().getTextoLinea();
textoOpcion2 = conversacionActual.getNodoActual().getHijo2().getTextoLinea();
textoActivo = "";
if(conversacionActual.getNodoActual().getHijo3()){
	textoOpcion3 = conversacionActual.getNodoActual().getHijo3().getTextoLinea();
}


texturaActual1 = conversacionActual.getTexturaPj1();
texturaActual2 = conversacionActual.getTexturaPj2Sombreada();




}





// ================================================================================
// Inicializacion de Arboles
// ================================================================================

//Conversacion con Diana
function inicializarConversacionDiana(){
print("Inicializa la conversacion");
conversacionDiana = new ArbolConversacion(texturaFabio,texturaDiana,texturaFabioSombreada,texturaDianaSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Usted fue de gran ayuda.",1);
dialogos.Push(l);
l = new LineaDialogo("Hice lo que tenía que hacer, gracias a que usted nos ayudó a salir de los escombros.",2);
dialogos.Push(l);
l = new LineaDialogo("Pura cuestión de supervivencia, ahora hay que salir lo más pronto posible, ya escuchó al anciano, esto está a punto de colapsar.",1);
dialogos.Push(l);
l = new LineaDialogo("Si, pero lo que dijo el muchacho nos obliga a ir al rescate de la gente de las oficinas.",2);
dialogos.Push(l);
l = new LineaDialogo("No creo que eso nos obligue a nada, la primera responsabilidad es con nosotros, con nuestras familias, debemos bajar inmediatamente.",1);
dialogos.Push(l);
l = new LineaDialogo("¿Y qué pasará con la demás gente?",2);
dialogos.Push(l);
  
var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionDiana.setRaiz(nodoRaiz);

/**
* Nodo Opcion 1
* 
**/
dialogos = new Array();
l = new LineaDialogo("A lo mejor abajo hay gente que pueda ayudar más que nosotros.",1);
dialogos.Push(l);
l = new LineaDialogo("¿Sabe que tiene razón? Debe haber rescatistas profesionales que pueden ayudar más que nosotros. Voy a bajar con usted.",2);
dialogos.Push(l);

var nodo1: NodoDialogo = new NodoDialogo(dialogos, NEGACION );

nodoRaiz.setHijo1(nodo1);



/**
* Nodo Opcion 2
* 
*/

dialogos = new Array();
l = new LineaDialogo("Si no nos apuramos terminaremos aplastados y ya no podremos ayudar\n ni a nuestras familias, bajemos.",1);
dialogos.Push(l);
l = new LineaDialogo("No sé por qué, pero me siento obligada a subir, voy a acompañar al médico y usted debería ayudarnos.",2);
dialogos.Push(l);

var nodo2: NodoDialogo = new NodoDialogo(dialogos);

nodoRaiz.setHijo2(nodo2);


/**
* Nodo Opcion 2.1
* 
*/

dialogos = new Array();
l = new LineaDialogo("Si por salvar a unos morimos todos, no estamos haciendo nada.",1);
dialogos.Push(l);
l = new LineaDialogo("Está bien, bajo. Pero sólo para conseguir refuerzos y vuelvo a colaborar.",2);
dialogos.Push(l);

var nodo21 : NodoDialogo= new NodoDialogo(dialogos, ACEPTACION_DIANA);

nodo2.setHijo1(nodo21);


/**
* Nodo Opcion 2.2
* 
*/

dialogos = new Array();
l = new LineaDialogo("No la veo muy convencida de eso, se le nota en los ojos el miedo.",1);
dialogos.Push(l);
l = new LineaDialogo("Lo siento, dejarse amedrentar por el miedo nunca es una opción. Voy a subir, me sentiré mejor conmigo misma.",2);
dialogos.Push(l);

var nodo22: NodoDialogo = new NodoDialogo(dialogos, NEGACION);

nodo2.setHijo2(nodo22);
}

//Conversacion con Dario
function inicializarConversacionDario(){
conversacionDario = new ArbolConversacion(texturaFabio,texturaDario,texturaFabioSombreada,texturaDarioSombreada);

/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("El anciano parece un hombre práctico ¿No cree? ",1);
dialogos.Push(l);
l = new LineaDialogo("Creo que más bien es un egoísta, sabiendo que hay otra gente a la que podemos ayudar, debemos darle prioridad al rescate.",2);
dialogos.Push(l);
  
var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionDario.setRaiz(nodoRaiz);

/**
* Nodo Opcion 1
* 
**/
dialogos = new Array();
l = new LineaDialogo("No hay tiempo, y no creo que tengamos los recursos para hacerlo.\n Es mejor bajar y buscar ayuda, ¿no cree?",1);
dialogos.Push(l);
l = new LineaDialogo("Insisto en que debemos subir. Ya tuvimos éxito gracias a que los cuatro nos unimos, deberíamos poner esa capacidad al servicio de otros que lo necesitan.",2);
dialogos.Push(l);
l = new LineaDialogo("Entiendo su mística por salvar la vida de otros, pero ¿Qué sacaría usted si se muere? Ni unos ni otros se salvarían.",1);
dialogos.Push(l);
l = new LineaDialogo("Creo que no vamos a llegar a ningún acuerdo. Yo subo, usted haga lo que crea que mejor le conviene.",2);
dialogos.Push(l);

var nodo1: NodoDialogo = new NodoDialogo(dialogos, NEGACION);

nodoRaiz.setHijo1(nodo1);

/**
* Nodo Opcion 2
* 
*/

dialogos = new Array();
l = new LineaDialogo("Tuvimos la suerte de sobrevivir al colapso del piso donde estábamos, no malogremos\n la oportunidad de salir, si no nos apuramos, podemos terminar aplastados.",1);
dialogos.Push(l);
l = new LineaDialogo("¡No puedo creerlo! Creí que usted tenía mejores sentimientos. Yo me rehusó a abandonar a la gente que nos necesita, voy a subir.",2);
dialogos.Push(l);

var nodo2: NodoDialogo = new NodoDialogo(dialogos, NEGACION);

nodoRaiz.setHijo2(nodo2);
}

//Conversacion con Francisco
function inicializarConversacionFrancisco(){
conversacionFrancisco = new ArbolConversacion(texturaFabio,texturaFrancisco,texturaFabioSombreada,texturaFranciscoSombreada);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("¿Cómo ve usted la cosa arriba?",1);
dialogos.Push(l);
l = new LineaDialogo("Pues lo que dije, hay gente que no quiere salvarse, están locos, no creo que tenga mucho sentido subir.",2);
dialogos.Push(l);
l = new LineaDialogo("Entonces hay que bajar lo más pronto posible",1);
dialogos.Push(l);
l = new LineaDialogo("Si, claro, es lo que vengo a decirles.",2);
dialogos.Push(l);
  
var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos, ACEPTACION_FRANCISCO);

conversacionFrancisco.setRaiz(nodoRaiz);
}

//Conversación con Mario
function inicializarConversacionMario(){
conversacionMario = new ArbolConversacion(texturaFabio,texturaMario,texturaFabioSombreada,texturaMarioSombreada);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Muchacho, es muy importante la información que nos has dado, pero creo que hay que salvarse, hay que bajar",1);
dialogos.Push(l);
l = new LineaDialogo("Pero la gente de arriba ¿Qué?",2);
dialogos.Push(l);
  
var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos);

conversacionMario.setRaiz(nodoRaiz);


/**
* Nodo Opcion 1
* 
**/
dialogos = new Array();
l = new LineaDialogo("No lo piense más, tenemos que bajar inmediatamente, ya oyó a su jefe.",1);
dialogos.Push(l);
l = new LineaDialogo("El anciano no es mi jefe, lo encontré husmeando los archivos y los estantes",2);
dialogos.Push(l);
l = new LineaDialogo("De cualquier forma, hay que bajar ¿No?",1);
dialogos.Push(l);
l = new LineaDialogo("Si, pero me preocupan los de arriba. Bajé a buscar ayuda, y ahora que los encuentro a ustedes, estoy un poco confundido.",2);
dialogos.Push(l);
l = new LineaDialogo("No creo que sea tan difícil: o bajamos ya o morimos todos, ¡Vámos!",1);
dialogos.Push(l);
l = new LineaDialogo("No, no, voy a ayudarle al médico, es lo que voy a hacer ",2);
dialogos.Push(l);

var nodo1: NodoDialogo = new NodoDialogo(dialogos, NEGACION);

nodoRaiz.setHijo1(nodo1);

/**
* Nodo Opcion 2
* 
*/

dialogos = new Array();
l = new LineaDialogo("Si subimos todos lo que hacemos es estorbo, bajemos y avísanos a la gente\n que sabe de esto.",1);
dialogos.Push(l);
l = new LineaDialogo("No hay seguridad de que haya gente afuera que nos ayude",2);
dialogos.Push(l);
l = new LineaDialogo("No sé, es que vi gente atrapada y queda muy poco tiempo para salvarlos.",1);
dialogos.Push(l);

var nodo2: NodoDialogo = new NodoDialogo(dialogos);

nodoRaiz.setHijo2(nodo2);

/**
* Nodo Opcion 2.1
* 
*/

dialogos = new Array();
l = new LineaDialogo("Y nosotros aquí perdiéndolo con discusiones.",1);
dialogos.Push(l);
l = new LineaDialogo("Tiene razón, vamos a conseguir ayuda.",2);
dialogos.Push(l);

var nodo21 : NodoDialogo= new NodoDialogo(dialogos,ACEPTACION_MARIO);

nodo2.setHijo1(nodo21);

/**
* Nodo Opcion 2.2
* 
*/

dialogos = new Array();
l = new LineaDialogo("Las cosas se pueden complicar, se nos cae el edificio ¿De qué sirve actuar de héroes?",1);
dialogos.Push(l);
l = new LineaDialogo("Es cierto, pero creo que la vida se puede hacer insoportable si después nos damos cuenta que tuvimos la oportunidad de salvar a otros y no lo hicimos",2);
dialogos.Push(l);
l = new LineaDialogo("Pero usted mismo lo dice: la vida, la vida es lo más importante, en este caso, la nuestra.",1);
dialogos.Push(l);
l = new LineaDialogo("No, voy a subir, es lo que voy a hacer. Subo a ayudar a esa gente, qué pena.",2);
dialogos.Push(l);

var nodo22: NodoDialogo = new NodoDialogo(dialogos,NEGACION);

nodo2.setHijo2(nodo22);

/**
* Nodo Opcion 3
* 
*/

dialogos = new Array();
l = new LineaDialogo("No hay tiempo, no estamos seguros de cómo ayudar a nadie, y además creo que ya\n no pensamos muy bien, baje usted conmigo.",1);
dialogos.Push(l);
l = new LineaDialogo("No, definitivamente me quedo. Tengo que ayudar, al fin y al cabo, a eso bajé, a conseguir ayuda. Yo puedo colaborar con información del edificio. Subo, definitivamente subo.",2);
dialogos.Push(l);

var nodo3: NodoDialogo = new NodoDialogo(dialogos, NEGACION);

nodoRaiz.setHijo3(nodo3);
}

//Conversacion Cristina
function inicializarConversacionCristina(){
conversacionCristina = new ArbolConversacion(texturaFabio,texturaCristina,texturaFabioSombreada,texturaCristinaSombreada);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("¿Cómo sigue de su brazo?",1);
dialogos.Push(l);
l = new LineaDialogo("Un poco mejor, aunque me sigue doliendo.",2);
dialogos.Push(l);
l = new LineaDialogo("Tenemos que bajar lo más pronto posible, hay que hacerle caso al anciano, afuera la podrán atender.",1);
dialogos.Push(l);
l = new LineaDialogo("Yo tengo que quedarme a ayudar a los seres.",2);
dialogos.Push(l);
l = new LineaDialogo("¿No me dirá que va a subir? ",1);
dialogos.Push(l);
l = new LineaDialogo("No.",2);
dialogos.Push(l);
l = new LineaDialogo("Entonces baje conmigo.",1);
dialogos.Push(l);
l = new LineaDialogo("Tampoco",2);
dialogos.Push(l);
l = new LineaDialogo("No la entiendo ¿Qué va a hacer entonces?",1);
dialogos.Push(l);
l = new LineaDialogo("Voy al otro lado a cuidar de los seres.",2);
dialogos.Push(l);
l = new LineaDialogo("Aquí están todos locos, haga usted lo que quiera.",1);
dialogos.Push(l);
  
var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos, NEGACION);

conversacionCristina.setRaiz(nodoRaiz);
}

//Monólogo en los armarios
function inicializarConversacionArmario1(){
conversacionArmario1 = new ArbolConversacion(texturaFabio,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Hay varios objetos que pueden llegar a ser útiles aquí",1);
dialogos.Push(l);
l = new LineaDialogo("Pero tengo que decidir bien, solo puedo cargar cuatro objetos",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos, DIALOGO_ARMARIO1);

conversacionArmario1.setRaiz(nodoRaiz);
}

function inicializarConversacionArmario2(){
conversacionArmario2 = new ArbolConversacion(texturaFabio,null,null,null);
/**
* Nodo Raiz
* 
*/
var dialogos : Array = new Array();
var l: LineaDialogo = new LineaDialogo("Hay varios objetos que pueden llegar a ser útiles aquí",1);
dialogos.Push(l);
l = new LineaDialogo("Pero tengo que decidir bien, solo puedo cargar cuatro objetos",1);
dialogos.Push(l);

var nodoRaiz:NodoDialogo = new NodoDialogo(dialogos, DIALOGO_ARMARIO2);

conversacionArmario2.setRaiz(nodoRaiz);
}