 (function () {
    let canvas = document.querySelector("#groundmat");
    canvas.width = 16;
    canvas.height = 16;
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "#10454A"; // outside blocks
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#111";
    ctx.fillRect(1, 1, canvas.width - 1, canvas.height - 1);
}());

(function () {
    let canvas = document.querySelector("#medikit");
    canvas.width = 8;
    canvas.height = 8;
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFF"; // outside blocks
    ctx.fillRect(0, 0, 8, 8);
    ctx.fillStyle = "#F00";
    ctx.fillRect(3, 1, 2, 6);
    ctx.fillRect(1, 3, 6, 2);
}());


(function () {
    let canvas = document.querySelector("#skyscraper");
    canvas.width = 128;
    canvas.height = 64;
    let ctx = canvas.getContext("2d");
    let rndColour;
    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            rndColour = 205 + Math.floor(Math.random() * 30);
            ctx.fillStyle = "rgb(" + rndColour + "," + rndColour + "," + rndColour + ")";
            ctx.fillRect(x, y, 1, 1);
        }   
    }
}());


(function () {
    let canvas = document.querySelector("#welcomescreen");
    canvas.width = 512;
    canvas.height = 256;
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000"; // black border around outside
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#222";
    /*
    ctx.fillRect(1, 1, (canvas.width / 3) - 4, canvas.height - 2);
    ctx.fillRect((canvas.width / 3) - 2, 1, (canvas.width / 3) - 4, canvas.height - 2);
    ctx.fillRect(((canvas.width / 3) * 2) - 5, 1, (canvas.width / 3) - 4, canvas.height - 2);
    */
    ctx.fillRect(2, 2, canvas.width - 4, canvas.height - 4);
    //ctx.fillStyle = "#000";
    //ctx.fillRect(canvas.width / 3, 1, 1, canvas.height - 2);
    //ctx.fillRect((canvas.width / 3) * 2, 1, 1, canvas.height - 2);
    ctx.font = "italic 13.5px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "#EED";
    ctx.fillText("What is this place? A teleporter experiment you were part of went very wrong.", canvas.width / 2, 20);
    ctx.fillText("There are robots everywhere, and they are trying to attack you. You must:", canvas.width / 2, 40);
    //ctx.font = "bold italic 15px Courier";
    ctx.font = "bold 15px Arial";
    ctx.fillText("GET BACK FROM ROBOT CITY", canvas.width / 2, 63);
    ctx.font = "italic 13.5px Arial";
    ctx.fillText("They took the teleporter, but it must be around here somewhere. You are armed", canvas.width / 2, 84);
    ctx.fillText("with a laser blaster, which should help against the robots while you search for it.", canvas.width / 2, 104);
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "left";
    ctx.fillText("VR CONTROLS:", 10, 130);
    ctx.fillText("DESKTOP CONTROLS:", (canvas.width / 2) + 10, 130);
    ctx.font = "12px Arial";
    ctx.fillRect(10, 146, 3, 3);
    ctx.fillText("Press the touch-sensitive button to move", 18, 153);
    ctx.fillRect(10, 173, 3, 3);
    ctx.fillText("OR Select a nearby point to teleport there", 18, 179);
    ctx.fillRect(10, 197, 3, 3);
    ctx.fillText("Press the trigger to shoot", 18, 203);
    ctx.fillRect(10, 221, 3, 3);
    ctx.fillText("Move next to objects to pick up / interact", 18, 227);
    ctx.fillRect((canvas.width / 2) + 10, 146, 3, 3);
    ctx.fillText("Arrow keys to move (or WASD)", (canvas.width / 2) + 18, 153);
    ctx.fillRect((canvas.width / 2) + 10, 173, 3, 3);
    ctx.fillText("Left mouse click to shoot", (canvas.width / 2) + 18, 179);
    ctx.fillRect((canvas.width / 2) + 10, 198, 3, 3);
    ctx.fillText("Walk up to objects to pick up / interact", (canvas.width / 2) + 18, 203);
    
    // settings:
    ctx.font = "8px Arial";
    ctx.fillText("Easy", 258, 230);
    ctx.fillText("Medium", 310, 230);
    ctx.fillText("Difficult", 364, 230);
    ctx.fillRect(258, 240, 130, 1);
    ctx.fillRect(258, 235, 1, 10);
    ctx.fillRect(322, 235, 1, 10);
    ctx.fillRect(388, 235, 1, 10);
    ctx.fillText("Music On", 410, 230);
    ctx.fillText("Music Off", 460, 230);
    ctx.fillRect(410, 240, 85, 1);
    ctx.fillRect(410, 235, 1, 10);
    ctx.fillRect(495, 235, 1, 10);
}());

(function () {
    let canvas = document.querySelector("#mat-gateway");
    canvas.width = 8;
    canvas.height = 8;
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "#00F";
    // vertical bars:
    ctx.fillRect(2, 0, 1, canvas.height);
    ctx.fillRect(4, 0, 1, canvas.height);
    ctx.fillRect(6, 0, 1, canvas.height);
    // horizontal bars:
    ctx.fillRect(0, 2, canvas.width, 1);
    ctx.fillRect(0, 5, canvas.width, 1);
}());

let updateComputer;
let hasKeycard = false;
(function () {
    let canvas = document.querySelector("#mat-computer");
    canvas.width = 128;
    canvas.height = 128;
    let ctx = canvas.getContext("2d");
    // screen:
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#EEE";
    ctx.fillRect(2, 2, canvas.width - 4, canvas.height / 2);
    // keyboard:
    ctx.fillStyle = "#EEE";
    for (let rows = 0; rows < 5; rows++) {
        for (let columns = 0; columns < 10; columns++) {
            ctx.fillRect((columns * 12) + 6, (rows * 10) + 74, 8, 7);
        }
    }
    updateComputer = function () {
        ctx.font = "10px Arial";
        if (hasKeycard) {
            ctx.fillStyle = "#0A0";
            ctx.fillText("Access Granted...", 6, 40);
        } else {
            ctx.fillStyle = "#000";
            ctx.fillText("You need a keycard to get", 6, 15);
            ctx.fillText("through this door...", 6, 25);
        }
        document.querySelector("#computer").object3D.children[0].material.map.needsUpdate = true; // to update material - see A-Frame issue #3936 on github
    }
}());


const endGame = function () {
    
    // create end-game message
    (function () {
        let canvas = document.querySelector("#mat-endgame");
        canvas.width = 256;
        canvas.height = 128;
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#FFF";
        ctx.textAlign = "center";
        if (PLAYER_HEALTH <= 0) { // game lost
            ctx.font = "bold 28px Arial";
            ctx.fillText("GAME OVER!", canvas.width / 2, 30);
            ctx.font = "13px Arial";
            ctx.fillText("You were shot too many times", canvas.width / 2, 50);
        } else { // game won
            ctx.font = "bold 28px Arial";
            ctx.fillText("WELL DONE!", canvas.width / 2, 30);
            ctx.font = "13px Arial";
            ctx.fillText("You managed to Get Back From Robot City", canvas.width / 2, 50);
        }
        //document.querySelector("#end-game-text").object3D.children[4].material.map.needsUpdate = true;
    }());
    
    // create end-game credits
    (function () {
        let canvas = document.querySelector("#mat-credits");
        canvas.width = 256;
        canvas.height = 128;
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#FFF";
        ctx.textAlign = "center";
        ctx.font = "bold 17px Arial";
        ctx.fillText("GET BACK FROM ROBOT CITY", canvas.width / 2, 20);
        ctx.font = "11px Arial";
        ctx.fillText("Created by:", canvas.width / 2, 40);
        ctx.fillText("Thanks to:", canvas.width / 2, 77);
        ctx.font="14px Arial";
        ctx.fillText("Kevin Etchells", canvas.width / 2, 55);
        ctx.fillText("Caleb & Beth", canvas.width / 2, 93);
        ctx.fillText("Paul S", canvas.width / 2, 109);
        ctx.fillText("Craig W", canvas.width / 2, 125);
    }());
    
    // create geometry
    /*
    let container = document.createElement("a-entity");
    container.setAttribute("geometry", "primitive: box; width: 100; height: 100; depth: 100");
    container.setAttribute("material", "color: #000; shader: flat; side: double");
    container.object3D.position.x = 50;
    container.object3D.position.y = -60;
    container.object3D.position.z = 50;
    SCENE.appendChild(container);
    */
    
    let mainScene = document.querySelector("a-scene");
    
    let mergeEndgameText1 = document.createElement("a-entity");
    let mergeEndgameText2 = document.createElement("a-entity");
    let text1 = document.createElement("a-entity");
    text1.setAttribute("geometry", "primitive: plane; width: 6; height: 3; buffer: false");
    text1.object3D.position.y = 2;
    text1.object3D.position.z = -6.2;
    mergeEndgameText1.appendChild(text1);
    let text2 = document.createElement("a-entity");
    text2.setAttribute("geometry", "primitive: plane; width: 6; height: 3; buffer: false");
    text2.object3D.position.x = -6.2;
    text2.object3D.position.y = 2;
    text2.object3D.rotation.y = Math.PI * 0.5;
    mergeEndgameText2.appendChild(text2);
    let text3 = document.createElement("a-entity");
    text3.setAttribute("geometry", "primitive: plane; width: 6; height: 3; buffer: false");
    text3.object3D.position.y = 2;
    text3.object3D.position.z = 6.2;
    text3.object3D.rotation.y = Math.PI;
    mergeEndgameText1.appendChild(text3);
    let text4 = document.createElement("a-entity");
    text4.setAttribute("geometry", "primitive: plane; width: 6; height: 3; buffer: false");
    text4.object3D.position.x = 6.2;
    text4.object3D.position.y = 2;
    text4.object3D.rotation.y = Math.PI * 1.5;
    mergeEndgameText2.appendChild(text4);
    mergeEndgameText1.setAttribute("geometry-merger", "");
    mergeEndgameText2.setAttribute("geometry-merger", "");
    mergeEndgameText1.setAttribute("material", "src: #mat-endgame; shader: flat; transparent: true; fog: false");
    mergeEndgameText2.setAttribute("material", "src: #mat-credits; shader: flat; transparent: true; fog: false");
    mainScene.appendChild(mergeEndgameText1);
    mainScene.appendChild(mergeEndgameText2);
    
    let playAgain1 = document.createElement("a-entity");
    playAgain1.setAttribute("geometry", "primitive: plane; width: 1.8; height: 0.9");
    playAgain1.setAttribute("material", "src: #mat-playagain; shader: flat; fog: false");
    playAgain1.object3D.position.y = 1.2;
    playAgain1.object3D.position.z = -6.1;
    playAgain1.className = "interact";
    playAgain1.setAttribute("playagain", "");
    playAgain1.setAttribute("animation", "property: components.material.material.opacity; from: 1; to: 0.7; dur: 1500; loop: true; dir: alternate");
    mainScene.appendChild(playAgain1);

    let playAgain3 = document.createElement("a-entity");
    playAgain3.setAttribute("geometry", "primitive: plane; width: 1.8; height: 0.9");
    playAgain3.setAttribute("material", "src: #mat-playagain; shader: flat; fog: false");
    playAgain3.object3D.position.y = 1.2;
    playAgain3.object3D.position.z = 6.1;
    playAgain3.object3D.rotation.y = Math.PI;
    playAgain3.className = "interact";
    playAgain3.setAttribute("playagain", "");
    playAgain3.setAttribute("animation", "property: components.material.material.opacity; from: 1; to: 0.7; dur: 1500; loop: true; dir: alternate");
    mainScene.appendChild(playAgain3);
    
    document.querySelector("#hud-display").remove();
    SCENE.remove();
    collisionObjects = []; // otherwise collision objects can prevent player position from being set to 0
    //let player = document.querySelector("#camera").object3D;
    player.position.x = 0;
    //player.position.y = -30;
    player.position.z = 0;
};

(function () {
    let canvas = document.querySelector("#mat-playagain");
    canvas.width = 64;
    canvas.height = 32;
    let ctx = canvas.getContext("2d");
    ctx.textAlign = "center";
    ctx.fillStyle = "#F00";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FFF";
    ctx.font = "10px Arial";
    ctx.fillText("Play Again", canvas.width / 2, 20);
}());


let updateHUD;
(function () {    
    let hudDisplay = document.querySelector("#hud-display");
    let canvas = document.querySelector("#hud");
    canvas.width = 256;
    canvas.height = 128;
    let ctx = canvas.getContext("2d");
    updateHUD = function () {
        if (hudDisplay) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#FFF";
            ctx.textAlign = "center";
            ctx.font = "14px Arial";
            ctx.fillText("HEALTH", 70, 15);
            ctx.fillText("KEYCARD", 200, 15);
            ctx.font = "32px Arial";
            ctx.fillText(PLAYER_HEALTH, 70, 45);
            ctx.fillText(hasKeycard ? "YES" : "NO", 200, 45);
            hudDisplay.object3D.children[0].material.map.needsUpdate = true; // to update material - see A-Frame issue #3936 on github
        }
    };
    updateHUD();
}());

(function () {
    let canvas= document.querySelector("#mat-teleport-symbol");
    canvas.width = 32;
    canvas.height = 32;
    let ctx = canvas.getContext("2d");
    let img = new Image();
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src="feet.png";
}());
