$(document).ready(function(){
    // converts hex colors to an rgb array
    // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    function hexToRgb(hex) {
        hex = hex.replace(/[^A-Za-z0-9\s]/g,'')
        var bigint = parseInt(hex, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        return [r,g,b];
    }
    
    // converts rgb colors to hex #
    // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    function rgbToHex(r, g, b) {
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
        var newBlend = blendColors(hexToRgb(color1.val()), hexToRgb(color2.val()));
        $('#color-return').attr('style', 'background-color: ' + newBlend);
        var rgb = newBlend.replace(/[^0-9,]/g, "").split(',').map(x => parseInt(x));
        $('#hex-blend').html(rgbToHex(rgb[0], rgb[1], rgb[2]));
    }
    
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
});