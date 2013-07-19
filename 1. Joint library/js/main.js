function generateModel(modelType){
    /* Fetch data from forms */

    // Height of an object
    var height = parseInt($("#height").val());

    // Width of an object
    var width = parseInt($("#width").val());

    //Number of objects
    var numberOfHorizontalObjects = $("#noOfHorizObj").val();
    var numberOfVerticalObjects  = $("#noOfVerticalObj").val();
    var totalNumberOfObjects = numberOfHorizontalObjects * numberOfVerticalObjects ;


    if(modelType != 0){
        //Number of submodels -> attributes -> for type==2
        var numberOfSubModels = $("#noOfSubModels").val();
        height = height + (numberOfSubModels - 3) * 15;
    }

    //Distance between objects
    var heightBetweenObjects = parseInt($("#horizGap").val()) +height;
    var widthBetweenObjects = parseInt($("#verticalGap").val()) + width;

    // The start coordinates of drawned diagram
    var initialX = 100;
    var initialY = 100;

    // The coordinates that define where we draw the new class
    var currentX = initialX;
    var currentY = initialY;

    //The classes holder
    var paperWidth = widthBetweenObjects * numberOfVerticalObjects;
    var paperHeight = heightBetweenObjects * numberOfHorizontalObjects;
    Joint.paper("main_view", paperWidth + initialX * 2, paperHeight + initialY * 2); // initialX*2 for simulated padding

    // The css modifiers for the containers
    $("#main_view").css("width", paperWidth+initialX * 2);
    $("#main_view").css("height", paperHeight+initialY * 2);

    // Joint.dia.uml -> shortened to obiect
    var obiect = Joint.dia.uml;
    if(modelType != 0){
        var counter = 0;
        var subModels = [];
    }

    // we start populating the drawing paper with classes
    // classes will be filled depending on the type
    //Depending on type , it creates the dummy clases
    //modelType = 0 -> 1 attribute | 1 method
    //modelType = 1 -> numberOfSubModels attributes | 1 method
    //modelType = 2 -> numberOfSubModels attributes | 1 method | and mapped relationships

    for (i = 1; i <= totalNumberOfObjects; i++) {
        //Creating the array with the name of the submodels
        //the array goes from 0 to numberOfSubModels-1
        if (modelType != 0) {
            do {
                subModels[counter % numberOfSubModels] = "subModel " + counter;
                counter = counter +1;

            } while(counter%numberOfSubModels);
        }
        if (modelType == 0)
            var c1 = obiect.Class.create({
                rect: {x: currentX, y: currentY, width: width, height: height},
                label: "MyClass",
                attrs: {
                    fill: "90-#000-yellow:1-#fff"
                },
                attributes: ["-position"],
                methods: ["+createIterator()"]
            });
        else if(modelType == 1){

                var c1 = obiect.Class.create({
                rect: {x: currentX, y: currentY, width: width, height: height},
                label: "MyClass",
                attrs: {
                    fill: "90-#000-yellow:1-#fff"
                },
                attributes: subModels,
                methods: ["+createIterator()"]
            });
        }
             else if(modelType == 2 || modelType == 3){
                    var c1 = obiect.Class.create({
                    rect: {x: currentX, y: currentY, width: width, height: height},
                    label: "MyClass",
                    attrs: {
                        fill: "90-#000-yellow:1-#fff"
                    },
                    attributes: subModels,
                    methods: ["+createIterator()"]
            });
                    if(modelType == 2) {
                        if(currentX == initialX && currentY == initialY)
                        {
                            var c = c1;
                        }
                        else
                            c1.joint(c,obiect.generalizationArrow);
                    }
                    else {
                        console.log(counter);
                        if(currentX == initialX)
                        {
                            var c = c1;
                        }
                        else
                            c1.joint(c,obiect.generalizationArrow);
                    }

        }

        // arrange the elements nicely
        currentX += widthBetweenObjects;

        if(currentX >= paperWidth) {
            currentY += heightBetweenObjects;
            currentX = initialX;
        }


    }
}

