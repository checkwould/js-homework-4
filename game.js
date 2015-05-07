var colors = ['black', 'silver', 'gray', 'maroon', 'red', 'purple', 'fuchsia',
    'green', 'lime', 'olive', 'yellow', 'navy', 'blue', 'teal', 'aqua',
    'blueviolet', 'chocolate', 'crimson', 'indigo', 'khaki'];

var removed = 0;
var time; // null by default
var gameEnded = false;

window.onload = function () {
    // there are two methods to get height and width, but offsetHeight
    // offsetWidth include borders, and it's not comfort for use
    var parentHeight = document.getElementById('game_place').clientHeight;
    var parentWidth = document.getElementById('game_place').clientWidth;

    for (var i = 0; i < colors.length; i++) {
        var rectangle = document.createElement('div');

        // set's id for checking end of game
        rectangle.id = colors[i];

        rectangle.style.background = colors[i];
        rectangle.style.border = '1px black solid';
        rectangle.style.position = 'absolute';

        var marginTop = Math.floor(Math.random() * parentHeight * 0.90);
        var marginLeft = Math.floor(Math.random() * parentWidth * 0.90);
        // width and height + margin must be less, than parent width and height
        var width = Math.floor(Math.random() * (parentWidth - marginLeft));
        var height = Math.floor(Math.random() * (parentHeight - marginTop));

        // width and height of rectangle must be between 10% and 20%
        // of parent width and height for comfort game
        width = (width > parentWidth * 0.1) ? width : parentWidth * 0.1;
        height = (height > parentHeight * 0.1) ? height : parentHeight * 0.1;
        width = (width < parentWidth * 0.2) ? width : parentWidth * 0.2;
        height = (height < parentHeight * 0.2) ? height : parentHeight * 0.2;

        // write to style
        rectangle.style.marginTop = marginTop + 'px';
        rectangle.style.marginLeft = marginLeft + 'px';
        rectangle.style.width = width + 'px';
        rectangle.style.height = height + 'px';

        // adding remove event onclick
        rectangle.onclick = function () {
            if (gameEnded)
                return;
            
            // this.remove() not supported in IE
            this.parentNode.removeChild(this);
            removed++;

            if (time === undefined)
                time = new Date().getTime();

            if (checkEndOfGame())
                endOfGame();
        };

        document.getElementById('game_place').appendChild(rectangle);
    }
};

function checkEndOfGame() {
    for (var i = 0; i < colors.length; i++) {
        for (var j = i + 1; j < colors.length; j++) {
            var first = document.getElementById(colors[i]);
            var second = document.getElementById(colors[j]);

            if ((first === null) || (second === null))
                continue;

            var x = [first.offsetLeft, first.offsetLeft + first.offsetWidth,
                second.offsetLeft, second.offsetLeft + second.offsetWidth];

            var y = [first.offsetTop, first.offsetTop + first.offsetHeight,
                second.offsetTop, second.offsetTop + second.offsetHeight];

            var distanceX = Math.abs((x[0] + x[1]) - (x[2] + x[3])) / 2;
            var distanceY = Math.abs((y[0] + y[1]) - (y[2] + y[3])) / 2;
            var coverityX = (x[1] - x[0]) / 2 + (x[3] - x[2]) / 2;
            var coverityY = (y[1] - y[0]) / 2 + (y[3] - y[2]) / 2;

            if ((distanceX < coverityX) && (distanceY < coverityY))
                return false;
        }
    }

    return true;
}

function endOfGame() {
    time = new Date().getTime() - time;
    alert('Game over\nRemoved: '
            + removed
            + '\nSolution time: '
            + time / 1000 + 's');
    
    gameEnded = true;
}
