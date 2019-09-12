const MAX_TELEPORT_DISTANCE = 12;

let SCENE = document.querySelector("#game");
let camera = document.querySelector("#camera");
let raycaster = document.querySelector("#controller").components.raycaster;
let audioRobotLaser = document.querySelector("#audio-robot-laser");
let audioShootRobot = document.querySelector("#audio-shoot-robot");
let playerShot = document.querySelector("#player-shot").object3D;

// DETECT VR MODE
//console.log(AFRAME.utils.device.checkHeadsetConnected()); // not working for Oculus Go
/* (on Oculus go, Entered and Exited are fired at the same time, on enter. Nothing happens on exit.)
document.querySelector('a-scene').addEventListener('enter-vr', function () {
    console.log("ENTERED VR");
});
document.querySelector('a-scene').addEventListener('enter-vr', function () {
    console.log("EXITED VR");
});
*/
document.querySelector("#controller").addEventListener("controllerconnected", function () {
    //console.log("controller detected");

    // enable teleportation - added here as we don't want it if using cursor as it fuses causing random jumps
    document.querySelector("#ground").setAttribute("ground", "");

    // remove cursor
    if (cursor) { // if re-entering VR, cursor won't exist
        cursor.remove();
        cursor = undefined; // so scene click handler knows it's VR
    }

    // reposition HUD
    let hud = document.querySelector("#hud-display");
    hud.object3D.position.y = 0.15;
    hud.object3D.position.z = -0.5; // this seems to be as close as you can get in VR without "seeing double"
    hud.object3D.scale.x = 0.16;
    hud.object3D.scale.y = 0.08;

});
/*
document.querySelector("#controller").addEventListener("controllerdisconnected", function () {
   console.log("controller disconnected");
});
*/

// delay registering collision-cam, as sometimes it fires before camera is initialised
window.setTimeout(function () {
    camera.setAttribute("collision-cam", "");
}, 500);


// Feedback when shooting
let cursor = document.querySelector("#cursor"); // needs to be accessible to controller-connected handler
(function () {
    let controller = document.querySelector("#controller");
    let lines = cursor.querySelectorAll(".line");
    document.addEventListener("mousedown", function (evt) {

        if (cursor) { // desktop mode only
            if (audioShoot.readyState >= 3) {
                audioShoot.currentTime = 0;
                audioShoot.play();
            }
            
            cursor.setAttribute("material", "color: green; shader: flat");
            lines[0].object3D.children[0].material.color.g = 1;
            lines[0].object3D.children[1].material.color.g = 1;
            lines[1].object3D.children[0].material.color.g = 1;
            lines[1].object3D.children[1].material.color.g = 1;
            window.setTimeout(function () {
                if (cursor) { // it may have been removed between calling the setTimeout and now
                    cursor.setAttribute("material", "color: black; shader: flat");
                    lines[0].object3D.children[0].material.color.g = 0;
                    lines[0].object3D.children[1].material.color.g = 0;
                    lines[1].object3D.children[0].material.color.g = 0;
                    lines[1].object3D.children[1].material.color.g = 0;
                }
            }, 500);
        } else { // vr mode
            
            if (raycaster.getIntersection(ground) && evt.detail.intersection.distance < MAX_TELEPORT_DISTANCE) { // teleporting

                //controller.setAttribute("line", "color: green");
                controller.components.line.data.color = "#0F0";

            } else { // shooting

                //controller.setAttribute("line", "color: red");
                controller.components.line.data.color = "#F00";
                
                // play audio for shooting, but not for teleporting
                if (audioShoot.readyState >= 3) { // otherwise it fires a random delayed sound at the very beginning
                    audioShoot.currentTime = 0;
                    audioShoot.play();
                }

            }
            
            window.setTimeout(function () {
                //controller.removeAttribute("line");
                controller.components.line.data.color = "#74BEC1"; // this is the default colour
            }, 500);
        }

    });
}());
