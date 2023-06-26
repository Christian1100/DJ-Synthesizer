
var turntables = document.querySelectorAll('[id^="turntable"]');
var rotations = [];

turntables.forEach(function(turntable, index) {
    rotations[index] = 0;

    turntable.addEventListener('click', function() {
        rotations[index] += 15;
        turntable.style.transform = 'rotate(' + rotations[index] + 'deg)';
    });
});


var playPauseButton = document.getElementById('play-pause');
var triangle = document.getElementById('triangle');

playPauseButton.addEventListener('click', function() {
    triangle.classList.toggle('paused');
});
