Raphael.fn.connection = function (obj1, obj2, line, bg) {
    if (obj1.line && obj1.from && obj1.to) {
        line = obj1;
        obj1 = line.from;
        obj2 = line.to;
    }
    var bb1 = obj1.getBBox(),
        bb2 = obj2.getBBox(),
        p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
            {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
            {x: bb1.x - 1, y: bb1.y + bb1.height / 2},
            {x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
            {x: bb2.x + bb2.width / 2, y: bb2.y - 1},
            {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
            {x: bb2.x - 1, y: bb2.y + bb2.height / 2},
            {x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}],
        d = {}, dis = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 4; j < 8; j++) {
            var dx = Math.abs(p[i].x - p[j].x),
                dy = Math.abs(p[i].y - p[j].y);
            if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                dis.push(dx + dy);
                d[dis[dis.length - 1]] = [i, j];
            }
        }
    }
    if (dis.length == 0) {
        var res = [0, 4];
    } else {
        res = d[Math.min.apply(Math, dis)];
    }
    var x1 = p[res[0]].x,
        y1 = p[res[0]].y,
        x4 = p[res[1]].x,
        y4 = p[res[1]].y;
    dx = Math.max(Math.abs(x1 - x4) / 2, 10);
    dy = Math.max(Math.abs(y1 - y4) / 2, 10);
    var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
        y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
        x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
        y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
    var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
    if (line && line.line) {
        line.bg && line.bg.attr({path: path});
        line.line.attr({path: path});
    } else {
        var color = typeof line == "string" ? line : "#000";
        return {
            bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
            line: this.path(path).attr({stroke: color, fill: "none"}),
            from: obj1,
            to: obj2
        };
    }
};

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
    var paper = Raphael("main_view", paperWidth + initialX * 2, paperHeight + initialY * 2);// initialX*2 for simulated padding

        // The css modifiers for the containers
    $("#main_view").css("width", paperWidth+initialX * 2);
    $("#main_view").css("height", paperHeight+initialY * 2);

    // Joint.dia.uml -> shortened to obiect
    //var obiect = Joint.dia.uml;
    if(modelType != 0){
        var counter = 0;
        var subModels = [];
    }
    //functions for dragging
    var dragger = function () {
            // so the else can handle both rect and text
            this.ox = this.type == "ellipse" ? this.attr("cx") : this.attr("x");
            this.oy = this.type == "ellipse" ? this.attr("cy") : this.attr("y");
            if(this.type != "text") this.animate({"fill-opacity": .2}, 500);

            // now for the pair element
            this.pair.ox = this.pair.type == "ellipse" ? this.pair.attr("cx") : this.pair.attr("x");
            this.pair.oy = this.pair.type == "ellipse" ? this.pair.attr("cy") : this.pair.attr("y");
            if (this.pair.type != "text") this.pair.animate({"fill-opacity": .2}, 500);
        };
    var  move = function (dx, dy) {
            var att = this.type == "ellipse" ? {cx: this.ox + dx, cy: this.oy + dy} : {x: this.ox + dx, y: this.oy + dy};
            this.attr(att);

            att = this.pair.type == "ellipse" ? {cx: this.pair.ox + dx, cy: this.pair.oy + dy} :{x: this.pair.ox + dx, y: this.pair.oy + dy};
             this.pair.attr(att);
            //move connections
            for (var i = connections.length; i--;) {
                paper.connection(connections[i]);
            }
            paper.safari();
        };
    var  up = function () {

        if (this.type != "text") this.animate({"fill-opacity": 1}, 500);

        };
    var connections = [];
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
        if (modelType == 0){
            console.log(i);
            var rect = paper.rect(currentX, currentY, width, height, 10);
            rect.attr({fill : "#f00",stroke: "#fff",cursor : "move", id : "clasa"+ i} )
            var tittle = paper.text(currentX+width/2,currentY+20,"test").attr({cursor : "move" , "font-size" : "20"});

            tittle.drag(move, dragger, up)
            rect.drag(move, dragger, up);

            rect.pair = tittle;
            tittle.pair = rect;


        } /*
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
        }     */
             else if(modelType == 2 || modelType == 3){
                     var rect = paper.rect(currentX, currentY, width, height, 10);
                     rect.attr({fill : "#f00",stroke: "#fff",cursor : "move"} )
                    var tittle = paper.text(currentX+width/2,currentY+20,"test").attr({cursor : "move" , "font-size" : "20"});

                    tittle.drag(move, dragger, up)
                    rect.drag(move, dragger, up);

                    rect.pair = tittle;
                    tittle.pair = rect;

                    if(modelType == 2) {
                        if(currentX == initialX && currentY == initialY)
                        {
                            var rect2 = rect;
                        }
                        else
                            connections.push(paper.connection(rect2,rect,"#fff","#fff|5"));
                    }
                    else {
                        console.log(counter);
                        if(currentX == initialX)
                        {
                            var rect2 = rect;
                        }
                        else
                            connections.push(paper.connection(rect2,rect,"#fff","#fff|3"));
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


     /*
     var rect = paper.rect(40,40,50,50,10);
     rect.attr("fill","#f00");
     rect.attr("stroke","#fff");
     rect.attr("","");  */