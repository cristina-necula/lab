/**
 * Created with JetBrains WebStorm.
 * User: Tache Razvan Mihai
 * Date: 7/18/13
 * Time: 10:15 AM
 * To change this template use File | Settings | File Templates.
 */
 /*
var width = 800;
var height = 400;
var div = document.getElementById ("main_window");
div.setAttribute ("class", "ud_diagram_div");
div.style.width = width + 'px';
div.style.height = height + 'px';

var canvas = document.createElement('canvas');
canvas.setAttribute( 'class', 'ud_diagram_canvas' );
canvas.width = width;
canvas.height = height;
var mainContext = canvas.getContext('2d');
div.appendChild( canvas );

canvas = document.createElement('canvas');
canvas.setAttribute( 'class', 'ud_diagram_canvas' );;
canvas.width = this.width;
canvas.height = this.height;
canvas.onmousedown = function () { return false; }
var motionContext = canvas.getContext('2d');


//
//var d1 = new UMLUseCaseDiagram({backgroundNodes: '#ff9900'});
//console.log(d1);
//d1.initialize( 0, div, mainContext, motionContext, width, height );
//d1.draw();
//
//var d2 = new UMLClassDiagram({backgroundNodes: '#ff9900'});
//
//
//d2.initialize( 1, div, mainContext, motionContext, width, height );
//d2.draw();

//Create lifelines
var client = new UMLLifeline({ x:100, y:70 });
var server = new UMLLifeline({ x:320, y:70 });
var userList = new UMLLifeline({ x:500, y:70 });
//Create the block Alternative
var alternative = new UMLAlternative({ x:40, y:290 });
//Create the block Loop
var loop = new UMLLoop({ x:180, y:120 });
//Create messages
var insert = new UMLSendMessage({ a: client, b: server, y: 110 });
var searchUser = new UMLSendMessage({ a: insert.getElementB(), b: userList, y:
    150});
var foundUser = new UMLReplyMessage({ a: searchUser.getElementB(),
    b:insert.getElementB(), y: 180 });
var validatePassword = new UMLSendMessage({ a: insert.getElementB(),
    b:searchUser.getElementB(), y: 210 });
var replyValidate = new UMLReplyMessage({ a: searchUser.getElementB(),
    b:insert.getElementB(), y: 240 });
var permittedAccess = new UMLReplyMessage({ a: insert.getElementB(), b: client,
    y:310 });
var restrictedAccess = new UMLReplyMessage({ a: insert.getElementB(), b: client,y:
    380 });

//Properties of lifelines
client.setName(':Client');
client.notifyChange();
server.setName(':Server');
server.notifyChange();
userList.setName(':userList');
userList.notifyChange();
//Properties of the block Alternative
alternative.setWidth(400);
alternative.getNodeChilds()[0].setGuard('Validation\nOK');
alternative.getNodeChilds()[1].setGuard('else');
alternative.notifyChange();

//Properties of the block Loop
loop.setWidth(400);
loop.setHeight(150);
loop.setGuard('for-each username');
loop.notifyChange();
//Properties of the messages
insert.setName('1: Insert login y password');
insert.notifyChange();
searchUser.setName('2: search for user');
searchUser.notifyChange();
foundUser.setName('3: user found');
foundUser.notifyChange();
validatePassword.setName('4: validate user');
validatePassword.notifyChange();
replyValidate.setName('5: validation info');
replyValidate.notifyChange();
permittedAccess.setName('6: access granted');
permittedAccess.notifyChange();

restrictedAccess.setName('6: access restricted');
restrictedAccess.notifyChange();

var sequenceDiagram = new UMLSequenceDiagram({backgroundNodes: '#ff9900'});
sequenceDiagram.initialize( 0, div, mainContext, motionContext, width, height );


//Add nodes to the diagram

sequenceDiagram.addElement(client);
sequenceDiagram.addElement(server);
sequenceDiagram.addElement(userList);
sequenceDiagram.addElement(alternative);
sequenceDiagram.addElement(loop);
//Add messages to the diagram
sequenceDiagram.addElement(insert);
sequenceDiagram.addElement(searchUser);
sequenceDiagram.addElement(foundUser);
sequenceDiagram.addElement(validatePassword);
sequenceDiagram.addElement(replyValidate);
sequenceDiagram.addElement(permittedAccess);
sequenceDiagram.addElement(restrictedAccess);

sequenceDiagram.draw();


sequenceDiagram.interaction(true);

//sequenceDiagram.setUpdateHeightCanvas(true);      */

var profile = new UMLProfile({id: 'main_window', width: 1000, height: 580 });

var metaclassClass = new UMLMetaclass({ x:500, y:250 });

metaclassClass.setBackgroundColor('#ffffbb');

var vehicleStereotype = new UMLStereotype({x:350, y: 70});
var landVehicleStereotype = new UMLStereotype({ x:350, y:170 });
var airVehicleStereotype = new UMLStereotype({ x:350, y:270 });
var carStereotype = new UMLStereotype({ x:650, y:70 });
var truckStereotype = new UMLStereotype({ x:650, y:170 });
var planeStereotype = new UMLStereotype({ x:650, y:270 });
var helicopterStereotype = new UMLStereotype({ x:650, y:370 });

//Create the extensions
var extension1 = new UMLExtension({ a:vehicleStereotype, b:metaclassClass });
var extension2 = new UMLExtension({ a:landVehicleStereotype, b:metaclassClass });
var extension3 = new UMLExtension({ a:airVehicleStereotype, b:metaclassClass });
var extension4 = new UMLExtension({ a:carStereotype, b:metaclassClass });
var extension5 = new UMLExtension({ a:truckStereotype, b:metaclassClass });
var extension6 = new UMLExtension({ a:planeStereotype, b:metaclassClass });
var extension7 = new UMLExtension({ a:helicopterStereotype, b:metaclassClass });


//Add elements to the profile
profile.addElement(metaclassClass);
profile.addElement(vehicleStereotype);
profile.addElement(landVehicleStereotype);
profile.addElement(airVehicleStereotype);
profile.addElement(carStereotype);
profile.addElement(truckStereotype);
profile.addElement(planeStereotype);
profile.addElement(helicopterStereotype);
//Add extensions
profile.addElement(extension1);
profile.addElement(extension2);
profile.addElement(extension3);
profile.addElement(extension4);
profile.addElement(extension5);
profile.addElement(extension6);
profile.addElement(extension7);


var stereotypes = [ vehicleStereotype, landVehicleStereotype,
    airVehicleStereotype, carStereotype,
    truckStereotype, planeStereotype, helicopterStereotype];


//Changes the name of the elements and notify change
metaclassClass.setName('UMLClass');
metaclassClass.notifyChange();
vehicleStereotype.setName('Vehicle');
vehicleStereotype.notifyChange();
landVehicleStereotype.setName('Ground vehicle');
landVehicleStereotype.notifyChange();
airVehicleStereotype.setName('Air vehicle');
airVehicleStereotype.notifyChange();
carStereotype.setName('Car');
carStereotype.notifyChange();
truckStereotype.setName('Truck');
truckStereotype.notifyChange();
planeStereotype.setName('Airplane');
planeStereotype.notifyChange();
helicopterStereotype.setName('Helicopter');
helicopterStereotype.notifyChange();
//Draw the diagram and all their elements
profile.draw();
//Editable by the users
profile.interaction(true);