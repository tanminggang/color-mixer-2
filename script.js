$(document).ready(function(){
    // converts hex colors to an rgb array
    function hexArr(hex) {
        hex = hex.slice(1);
        var bigint = parseInt(hex, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        return [r,g,b];
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
        var newBlend = blendColors(hexArr(color1.val()), hexArr(color2.val()));
        $('#color-return').attr('style', 'background-color: ' + newBlend);
    }
    
    // sets the initial blend
    createBlend($('#input1'), $('#input2'));
    
    // changes the blend when a new color is selected
    $('input').change(function(){
        createBlend($('#input1'), $('#input2'));
    })
});