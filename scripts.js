// Get nexcessary canvas related items for use in the drawing functions
var canvas = document.getElementById("myCanvas");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var ctx = canvas.getContext("2d");
var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
var clear_cavnas = canvasData.data;

// Get the location to dynamically add the input boxes
var xy_inputs_row = document.getElementById('inputs');

var current_draw_type = '';

// Strings containing the html to add the proper input boxes for either a line or circle/ellipse ---------------------------------
var line_input_boxes_html = "<input type=\"text\" id=\"x1-input\" class=\"input-box\" name=\"x1\" placeholder=\"x1 value...\">\n<input type=\"text\" id=\"y1-input\" class=\"input-box\" name=\"y1\" placeholder=\"y1 value...\">\n<input type=\"text\" id=\"x2-input\" class=\"input-box\" name=\"x2\" placeholder=\"x2 value...\">\n<input type=\"text\" id=\"y2-input\" class=\"input-box\" name=\"y2\" placeholder=\"y2 value...\">\n<button type=\"button\" id=\"generate-button\" class=\"ui-button\">Generate</button>"

var circle_input_boxes_html = "<input type=\"text\" id=\"x-input\" class=\"input-box\" name=\"x\" placeholder=\"x value...\">\n<input type=\"text\" id=\"y-input\" class=\"input-box\" name=\"y\" placeholder=\"y value...\">\n<input type=\"text\" id=\"r-input\" class=\"input-box\" name=\"r\" placeholder=\"radius...\">\n<button type=\"button\" id=\"generate-button\" class=\"ui-button\">Generate</button>"

var ellipse_input_boxes_html = "<input type=\"text\" id=\"x-input\" class=\"input-box\" name=\"x\" placeholder=\"x pos...\">\n<input type=\"text\" id=\"y-input\" class=\"input-box\" name=\"y\" placeholder=\"y pos...\">\n<input type=\"text\" id=\"a-input\" class=\"input-box\" name=\"a\" placeholder=\"a value...\">\n<input type=\"text\" id=\"b-input\" class=\"input-box\" name=\"b\" placeholder=\"b value...\">\n<button type=\"button\" id=\"generate-button\" class=\"ui-button\">Generate</button>"
// -------------------------------------------------------------------------------------------------------------------------------

// Event listeners for line related buttons
document.getElementById('DDA-button').addEventListener("click", add_input_boxes_line);
document.getElementById('midline-button').addEventListener("click", add_input_boxes_line);

// Event listeners for circular related buttons
document.getElementById('midcircle-button').addEventListener("click", add_input_boxes_circle);
document.getElementById('midellipse-button').addEventListener("click", add_input_boxes_ellipse);


function add_input_boxes_line(){
    clear_canvas();
    current_draw_type = this.id;

    // Clear any current html and replace it with the html for the proper input boxes
    xy_inputs_row.innerHTML = '';
    xy_inputs_row.innerHTML = line_input_boxes_html;

    document.addEventListener("keyup", check_enter_press);
    document.getElementById('generate-button').addEventListener("click", check_enter_press);
}

function add_input_boxes_circle(){
    clear_canvas();
    current_draw_type = this.id;

    // Clear any current html and replace it with the html for the proper input boxes
    xy_inputs_row.innerHTML = '';
    xy_inputs_row.innerHTML = circle_input_boxes_html;

    document.addEventListener("keyup", check_enter_press);
    document.getElementById('generate-button').addEventListener("click", check_enter_press);
}

function add_input_boxes_ellipse(){
    clear_canvas();
    current_draw_type = this.id;

    // Clear any current html and replace it with the html for the proper input boxes
    xy_inputs_row.innerHTML = '';
    xy_inputs_row.innerHTML = ellipse_input_boxes_html;

    document.addEventListener("keyup", check_enter_press);
    document.getElementById('generate-button').addEventListener("click", check_enter_press);
}

function generate(){
    clear_canvas();
    if(current_draw_type == 'DDA-button' || current_draw_type == 'midline-button'){
        var x1 = document.getElementById('x1-input').value;
        var y1 = document.getElementById('y1-input').value;
        var x2 = document.getElementById('x2-input').value;
        var y2 = document.getElementById('y2-input').value;

        if(x1 == '' || y1 == '' || x2 == '' || y2 == ''){ alert('ERROR: Not all values have been entered.\n\nCannot generate shape'); }
        else{
            switch(current_draw_type){
                case 'DDA-button':
                    draw_DDA(x1, y1, x2, y2);
                    break;
                case 'midline-button':
                    draw_midline(x1, y1, x2, y2);
                    break;
            }
        }
    }
    else if(current_draw_type == 'midcircle-button'){
        var x = document.getElementById('x-input').value;
        var y = document.getElementById('y-input').value;
        var r = document.getElementById('r-input').value;

        if(x == '' || y == '' || r == ''){ alert('ERROR: Not all values have been entered.\n\nCannot generate shape'); }
        else{ draw_midcircle(x, y, r); }
    }
    else if(current_draw_type == 'midellipse-button'){
        var x = document.getElementById('x-input').value;
        var y = document.getElementById('y-input').value;
        var a = document.getElementById('a-input').value;
        var b = document.getElementById('b-input').value;

        if(x == '' || y == '' || a == '' || b == ''){ alert('ERROR: Not all values have been entered.\n\nCannot generate shape'); }
        else{ draw_midellipse(a, b, x, y); }
    }
    else{ alert('ERROR: NO DRAW TYPE HAS BEEN SELECTED');}
}

function draw_DDA(x1, y1, x2, y2){
    clear_canvas();
    x1 = parseFloat(x1);
    y1 = parseFloat(y1);
    x2 = parseFloat(x2);
    y2 = parseFloat(y2);

    ///*
    var dy = y2 - y1;
    var dx = x2 - x1;
    var steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);

    var x_inc = dx/steps;
    var y_inc = dy/steps;

    var x = x1;
    var y = y1;

    for(var i = 0; i <= steps; i++){
        draw_pixel_simple(Math.round(x), Math.round(y), 'rgb(255, 0, 0)');
        x += x_inc;
        y += y_inc;
    }
    //*/
}

function draw_midline(x1, y1, x2, y2){
    clear_canvas();
    x1 = parseInt(x1);
    y1 = parseInt(y1);
    x2 = parseInt(x2);
    y2 = parseInt(y2);

    if (Math.abs(y2 - y1) < Math.abs(x2 - x1)){
        if(x1 > x2){
            plotLow(x2, y2, x1, y1);
        }else{
            plotLow(x1, y1, x2, y2);
        }
    }else{
        if(y1 > y2){
            plotHigh(x2, y2, x1, y1);
        }else{
            plotHigh(x1, y1, x2, y2);
        }
    }
}

function plotLow(x1, y1, x2, y2){
    var dx = x2 - x1;
    var dy = y2 - y1;
    var yi = 1;

    if(dy < 0){
        yi = -1;
        dy = -dy;
    }

    var d = 2*dy - dx;
    var y = y1;

    for(var x = x1; x <= x2; x++){
        draw_pixel_simple(x, y, 'rgb(255, 0, 0)');
        if(d > 0){
            y += yi;
            d -= 2*dx;
        }
        d += 2*dy;
    }
}

function plotHigh(x1, y1, x2, y2){
    var dx = x2 - x1;
    var dy = y2 - y1;
    var xi = 1;
    if(dx < 0){
        xi = -1;
        dx = -dx;
    }
    d = 2*dx - dy;
    x = x1;

    for(var y = y1; y <= y2; y++){
        draw_pixel_simple(x, y, 'rgb(255, 0, 0)');
        if(d > 0){
            x += xi;
            d -= 2*dy;
        }
        d += 2*dx
    }
}

function draw_midcircle(x_pos, y_pos, r){
    //alert(current_draw_type + '\nx = ' + x + '\ny = ' + y + '\nr = ' + r);
    x_pos = parseFloat(x_pos);
    y_pos = parseFloat(y_pos);
    r = parseInt(r);
    var x = parseInt(0);
    var y = r;
    var d = parseInt(1 - r);
    circle_points(x, y, x_pos, y_pos);

    while(y > x){
        if(d < 0){
            d = d + 2*x + 3;
        }else{
            d = d + 2*(x - y) + 5;
            y--;
        }
        x++;
        circle_points(x, y, x_pos, y_pos);
    }
}

function circle_points(x, y, x_pos, y_pos){
    draw_pixel_simple((x + x_pos), (y + y_pos), 'rgb(255, 0, 0)');
    draw_pixel_simple((y + x_pos), (x + y_pos), 'rgb(255, 0, 0)');
    draw_pixel_simple((y + x_pos), (-x + y_pos), 'rgb(255, 0, 0)');
    draw_pixel_simple((x + x_pos), (-y + y_pos), 'rgb(255, 0, 0)');
    draw_pixel_simple((-x + x_pos), (-y + y_pos), 'rgb(255, 0, 0)');
    draw_pixel_simple((-y + x_pos), (-x + y_pos), 'rgb(255, 0, 0)');
    draw_pixel_simple((-y + x_pos), (x + y_pos), 'rgb(255, 0, 0)');
    draw_pixel_simple((-x + x_pos), (y + y_pos), 'rgb(255, 0, 0)');
}

function draw_midellipse(a, b, x_pos, y_pos){
    a = parseInt(a);
    b = parseInt(b);
    x_pos = parseInt(x_pos);
    y_pos = parseInt(y_pos);

    var d2;
    var x = 0;
    var y = b;
    var d1 = (b*b) - (a*a*b) + (0.25*a*a);

    ellipse_points(x, y, x_pos, y_pos);

    while(((a*a) * (y - 0.5)) > ((b*b) * (x + 1))){
        if(d1 < 0){
            d1 = d1 + ((b*b) * (2*x+3));
        }else{
            d1 = d1 + ((b*b) * (2*x+3)) + ((a*a) * (-2*y+2));
            y--;
        }
        x++;
        ellipse_points(x, y, x_pos, y_pos);
    }

    d2 = ((b*b) * (x + 0.5) * (x + 0.5)) + ((a*a) * (y - 1) * (y - 1)) - (a*a*b*b);
    while(y > 0){
        if(d2 < 0){
            d2 = d2 + ((b*b) * (2*x+2)) + ((a*a) * (-2*y+3));
            x++;
        }else{
            d2 = d2 + ((a*a) * (-2*y+3));
        }
        y--;
        ellipse_points(x, y, x_pos, y_pos);
    }
}

function ellipse_points(x, y, x_pos, y_pos){
    draw_pixel_simple(x + x_pos, y + y_pos, 'rgb(255, 0, 0)');
    draw_pixel_simple(-x + x_pos, y + y_pos, 'rgb(255, 0, 0)');
    draw_pixel_simple(x + x_pos, -y + y_pos, 'rgb(255, 0, 0)');
    draw_pixel_simple(-x + x_pos, -y + y_pos, 'rgb(255, 0, 0)');
}

// Function to allow for pressing enter instead of clicking the generate button
function check_enter_press(event){
    if(event.type === 'click'){
        generate();
    }
    else if(event.type === 'keyup'){
        var code = event.keyCode;
        if(code === 13){
            generate();
        }
    }
}

// A simpler function to draw a single pixel at a single point on the canvas
function draw_pixel_simple(x, y, rgb){
    ctx.fillStyle = rgb;
    ctx.fillRect(x, y, 1, 1);
}

// Clear any of the shapes drawn to the canvas
function clear_canvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
