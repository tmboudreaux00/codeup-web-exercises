"use strict";
let h1El, divEl, dlEl, ddEl, dtEl, ulEl, liEl, adjustBtn, highlightBtn;
h1El = $('h1');
divEl = $('div');
dlEl = $('dl');
ddEl = $('dd');
dtEl = $('dt');
ulEl = $('ul');
liEl = $('li');
adjustBtn = $('#adjustBtn');
highlightBtn = $('#hltBtn');


$(document).ready(function() {
    console.log("ready!");
    h1El.addClass('center');
    ddEl.addClass('hidden');
    dtEl.click(function(){
        $(this).toggleClass('highlight');
        $(this).next().toggleClass('hidden');
    });
    adjustBtn.click(function(){
        dlEl.toggleClass('adjustMe');
        dlEl.toggleClass('flexed');
    });
    highlightBtn.click(function(){
        $('.ulClass li:last-child').toggleClass('highlight');
    });
    $('h3').click(function() {
        $(this).next().children().toggleClass('bolded');
    });
    $('li').click(function() {
        $(this).parent().children().first().toggleClass('colorBlue');
        console.log("I'm a list item!");
    });
});