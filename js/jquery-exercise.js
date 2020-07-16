
//reference code to alert on DOM load
/**
$(document).ready(function() {
    alert( 'The DOM has finished loading!' );
});



*/

$('.all').css({border: '1px solid red'});

$('li').css({fontSize: '20px'});

$('.select').css({color: 'red'});
$('h1, p, li').css({background: 'yellow'});

$('#oneDiv').ready(function(){
    alert($('#oneH1').text());
});