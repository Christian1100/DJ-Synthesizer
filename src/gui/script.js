
var turntables = document.querySelectorAll('[id^="turntable"]');
var rotations = [];

turntables.forEach(function(turntable, index) {
    rotations[index] = 0;

    turntable.addEventListener('click', function() {
        rotations[index] += 15;
        turntable.style.transform = 'rotate(' + rotations[index] + 'deg)';
    });
});


var turntables = document.querySelectorAll('[id^="turntable"]');
var rotations = [];

turntables.forEach(function(turntable, index) {
    rotations[index] = 0;
    var isMouseDown = false;

    turntable.addEventListener('mousedown', function() {
        isMouseDown = true;
    });

    turntable.addEventListener('mouseup', function() {
        isMouseDown = false;
    });

    turntable.addEventListener('mousemove', function(event) {
        if (isMouseDown) {

            // Die Mausposition relativ zum Drehknopf erhalten
            var knobRect = turntable.querySelector('#knob-big').getBoundingClientRect();
            var mouseX = event.clientX - knobRect.left;
            var mouseY = event.clientY - knobRect.top;

            // Den Winkel berechnen
            var angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
            rotations[index] = angle;

            // Die Linie drehen
            turntable.querySelector('#line-big').style.transform = 'rotate(' + rotations[index] + 'deg)';
        }
    });
});



