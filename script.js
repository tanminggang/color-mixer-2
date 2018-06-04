/* global $ */
$(document).ready(function(){
    // converts hex colors to an rgb array
    function hex2rgb(hex) {
        // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
        hex = hex.replace(/[^A-Za-z0-9\s]/g,'')
        var bigint = parseInt(hex, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        return [r,g,b];
    }
    
    // converts rgb colors to hex #
    function rgb2hex(r, g, b) {
        // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    
    // turns an array into rgb(x,y,z) form
    function rgbify(arr){
        return 'rgb(' + arr.join() + ')';
    }
    
    // blends two colors based on rgb values
    function blendColors(color1, color2){
        var newColor = [];
        for (i = 0; i < 3; i++) {
            newColor[i] = Math.round((color1[i] + color2[i]) / 2)
        }
        return rgbify(newColor);
    }
    
    // creates a new blend
    function createBlend(color1, color2){
        var newBlend = blendColors(hex2rgb(color1.val()), hex2rgb(color2.val()));
        $('#color-return').attr('style', 'background-color: ' + newBlend);
        var rgb = newBlend.replace(/[^0-9,]/g, "").split(',').map(x => parseInt(x));
        $('#hex-blend').html(rgb2hex(rgb[0], rgb[1], rgb[2]));
    }
    
    // customizes the appearance of the "inputs"
    function setFakeInputs(color1, color2){
        $('#input1-fake').attr('style', 'background-color: ' + color1.val());
        $('#input2-fake').attr('style', 'background-color: ' + color2.val());
        $('#hex1').html(color1.val());
        $('#hex2').html(color2.val());
    }
    
    // sets the initial blend
    createBlend($('#input1'), $('#input2'));
    setFakeInputs($('#input1'), $('#input2'))
    
    // changes the blend when a new color is selected
    $('input').change(function(){
        createBlend($('#input1'), $('#input2'));
        setFakeInputs($('#input1'), $('#input2'))
    })
    
    // save a color blend
    $('#save').click(function(){
        if($('h1').hasClass('hidden')) $('h1').removeClass('hidden');
        
        var hex = $('<div>');
        hex.addClass('hex');
        
        var blend = $('<div>');
        blend.addClass('box');
        blend.attr('style', $('#color-return').attr('style'));
        blend.html(hex.html($('#hex-blend').html()))
        blend = $('<td>').html(blend);
        
        $('#saved-blends tr').append(blend);
    });
});