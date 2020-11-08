let times = [];
let fps;
let counter = 0;
let max = 0;
let divisor = 0;

function refreshLoop() {
    window.requestAnimationFrame(function () {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) {
            times.shift();
        }
        times.push(now);
        fps = times.length;
        max = Math.max(fps, max);

        divisor = Math.floor(max / 14);

        document.getElementById("fps").innerHTML = fps + " fps";

        if (counter > 10000) counter = 0;
        counter++;
        refreshLoop();
    });
}

refreshLoop();
