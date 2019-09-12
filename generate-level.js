// GENERATE WORLD

// globals
const GRID_SIZE = 6;
const TILE_SIZE = 10;

let chooseRobotLocation;

AFRAME.registerComponent("generate-level", {
    init: function () {
    
        "use strict";

        const BUILDING_COUNT = 12;
        const DOOR_SIZE = 3;
        const WALL_DEPTH = 0.3;
        const STOREY_HEIGHT = 3;
        const ROBOT_COUNT = 13;

        let chosenRobotLocations = [];
        (function () {

            // these are outside chooseRobotLocation to avoid garbage collection after each regen
            let okay,
                rndX,
                rndZ;

            chooseRobotLocation = function (removeExistingLocation) {
                okay = false;

                // if robot regenerating, need to remove previous location from array
                if (removeExistingLocation) {
                    chosenRobotLocations.splice( chosenRobotLocations.indexOf(removeExistingLocation), 1);
                }

                while (!okay) {
                    rndX = Math.floor(Math.random() * GRID_SIZE);
                    rndZ = Math.floor(Math.random() * GRID_SIZE);
                    if (chosenRobotLocations.indexOf(rndX + "-" + rndZ) === -1) {
                        okay = true;
                    }
                }
                chosenRobotLocations.push(rndX + "-" + rndZ);
                return {
                    x: rndX,
                    z: rndZ
                }
            };
        }());


        let chosenBuildingLocations = [];
        let keepEmpty = [];
        const chooseBuildingLocation = function (rotationIndex) {
            let okay = false;
            let rndX;
            let rndZ;
            let doorFacingSpace;
            while (!okay) {
                rndX = Math.floor(Math.random() * GRID_SIZE);
                rndZ = Math.floor(Math.random() * GRID_SIZE);
                if (chosenBuildingLocations.indexOf(rndX + "-" + rndZ) === -1) {
                    if (rotationIndex === 0) { // South
                        doorFacingSpace = rndX + "-" + (rndZ + 1);
                    } else if (rotationIndex === 1) { // West
                        doorFacingSpace = (rndX - 1) + "-" + rndZ;
                    } else if (rotationIndex === 2) { // North
                        doorFacingSpace = rndX + "-" + (rndZ - 1);  
                    } else if (rotationIndex === 3) { // East
                        doorFacingSpace = (rndX + 1) + "-" + rndZ;
                    }
                    if (chosenBuildingLocations.indexOf(doorFacingSpace) === -1) { // is there space to get out of the door?

                        // keepEmpty spaces can only be surrounded on 3 sides, otherwise we'll be blocked in
                        // TO DO: actually, could still be blocked in by corners, or groups of empty spaces, but this should remove the most likely possibilities
                        let emptySpaceOkay = true;
                        let emptySpaceIndex = -1;
                        keepEmpty.forEach(function (emptySpace, spaceIndex) {
                            if (emptySpace.space === rndX + "-" + rndZ) { // can't place a building here
                                emptySpaceOkay = false;
                            }
                            if (emptySpace.space === doorFacingSpace) {
                                if (emptySpace.timesUsed === 3) {
                                    emptySpaceOkay = false;
                                } else {
                                    emptySpaceIndex = spaceIndex;
                                }
                            }
                        });

                        if (emptySpaceOkay) { // we can use this one
                            okay = true;

                            if (emptySpaceIndex === -1) {
                                keepEmpty.push({space: doorFacingSpace, timesUsed: 1});
                            } else {
                                keepEmpty[emptySpaceIndex].timesUsed++;
                            }

                        }

                    }
                }
            }
            chosenBuildingLocations.push(rndX + "-" + rndZ);

            return {
                x: rndX,
                z: rndZ
            }
        };


        let mergeBuildings = document.createElement("a-entity");
        let mergeWindows = document.createElement("a-entity");

        /* Removed, as they don't disappear in VR when you need them to - though maybe we could do something at the faces level
        let mergeMediKits = document.createElement("a-entity");
            mergeMediKits.setAttribute("geometry-merger", "preserveOriginal: false");
            mergeMediKits.setAttribute("material", "src: #medikit");
            SCENE.appendChild(mergeMediKits);
        */

        for (let buildingIndex = 0; buildingIndex < BUILDING_COUNT; buildingIndex++) {

            let rndRotation;
            if (buildingIndex === 0) { // start position can't have rndRotation 2, otherwise can't start facing screen (unless we rotated camera, but let's keep it simple)
                rndRotation = Math.floor(Math.random() * 3);
                if (rndRotation === 2) {
                    rndRotation = 3;
                }
            } else {
                rndRotation = Math.floor(Math.random() * 4);
            }

            let location = chooseBuildingLocation(rndRotation);

            const xPos = (location.x * TILE_SIZE) - (GRID_SIZE * TILE_SIZE * 0.5) + (TILE_SIZE * 0.5);
            const zPos = (location.z * TILE_SIZE) - (GRID_SIZE * TILE_SIZE * 0.5) + (TILE_SIZE * 0.5);

            if (buildingIndex === 0) { // start position, gun position for easy level

                // move camera to starting position
                let camera = document.querySelector("#camera").object3D;
                camera.position.x = xPos;
                camera.position.z = zPos;

                // we don't want a robot here
                chosenRobotLocations.push(location.x + "-" + location.z);

                // show info screen
                let screen = document.createElement("a-entity");
                screen.setAttribute("geometry", "primitive: plane; width: 6; height: 3");
                screen.setAttribute("material", "src: #welcomescreen; shader: flat");
                screen.object3D.position.x = xPos;
                screen.object3D.position.y = 1.9;
                screen.object3D.position.z = zPos - (TILE_SIZE * 0.5) + WALL_DEPTH + 0.1;
                SCENE.appendChild(screen);

                // settings controls
                let difficultySetting = document.createElement("a-entity");
                difficultySetting.setAttribute("mixin", "settings-control");
                difficultySetting.className = "interact";
                difficultySetting.setAttribute("difficulty", "");
                difficultySetting.object3D.position.x = 0.1;
                difficultySetting.object3D.position.y = -1.31;
                difficultySetting.object3D.position.z = 0.01;
                screen.appendChild(difficultySetting);

                let bgMusicControl = document.createElement("a-entity");
                bgMusicControl.setAttribute("mixin", "settings-control");
                bgMusicControl.className = "interact";
                bgMusicControl.setAttribute("bgmusic", "");
                bgMusicControl.object3D.position.x = 1.8; // 0.2, 1.1 
                bgMusicControl.object3D.position.y = -1.31;
                bgMusicControl.object3D.position.z = 0.01;
                screen.appendChild(bgMusicControl);

            } else if (buildingIndex === 1) { // blue keycard location

                // we don't want a robot here
                chosenRobotLocations.push(location.x + "-" + location.z);

                // create blue keycard
                let plinth = document.createElement("a-entity");
                plinth.setAttribute("geometry", "primitive: cylinder; height: 1; radius: 0.5; segmentsRadial: 6; segmentsHeight: 1; buffer: false");
                plinth.object3D.position.x = xPos;
                plinth.object3D.position.y = 0.5;
                plinth.object3D.position.z = zPos;
                mergeBuildings.appendChild(plinth);
                let keycardBlue = document.createElement("a-entity");
                keycardBlue.setAttribute("geometry", "primitive: box");
                keycardBlue.object3D.scale.x = 0.15;
                keycardBlue.object3D.scale.y = 0.25;
                keycardBlue.object3D.scale.z = 0.03;
                keycardBlue.setAttribute("material", "color: blue; shader: flat")
                SCENE.appendChild(keycardBlue);
                keycardBlue.object3D.position.x = xPos;
                keycardBlue.object3D.position.y = 1.2;
                keycardBlue.object3D.position.z = zPos;
                keycardBlue.setAttribute("keycard", "");
                keycardBlue.setAttribute("animation", "property: object3D.rotation.y; to: 360; loop: true; easing: linear; dur: 2000");

            } else if (buildingIndex === 2) { // teleporter / time-machine location (blue keycard)

                // we don't want a robot here
                chosenRobotLocations.push(location.x + "-" + location.z);

                // computer
                let computer = document.createElement("a-entity");
                computer.setAttribute("geometry", "primitive: plane");
                computer.setAttribute("material", "src: #mat-computer; shader: flat");
                computer.object3D.position.y = 1.5;
                computer.setAttribute("computer", "");
                computer.setAttribute("id", "computer");
                SCENE.appendChild(computer);
                if (rndRotation === 0) {
                    computer.object3D.position.x = xPos - (DOOR_SIZE * 0.8);
                    computer.object3D.position.z = zPos + (TILE_SIZE / 2) + 0.01;
                } else if (rndRotation === 1) {
                    computer.object3D.rotation.y = Math.PI * 1.5;
                    computer.object3D.position.x = xPos - (TILE_SIZE / 2) - 0.01;
                    computer.object3D.position.z = zPos - (DOOR_SIZE * 0.8);
                } else if (rndRotation === 2) {
                    computer.object3D.rotation.y = Math.PI;
                    computer.object3D.position.x = xPos + (DOOR_SIZE * 0.8);
                    computer.object3D.position.z = zPos - (TILE_SIZE / 2) - 0.01;
                } else if (rndRotation === 3) {
                    computer.object3D.rotation.y = Math.PI / 2;
                    computer.object3D.position.x = xPos + (TILE_SIZE / 2) + 0.01;
                    computer.object3D.position.z = zPos + (DOOR_SIZE * 0.8);
                }

                // blue gateway
                let gateway = document.createElement("a-entity");
                gateway.setAttribute("geometry", "primitive: box; width: " + (DOOR_SIZE * 1.2) + "; depth: 0.25; height: " + DOOR_SIZE);
                gateway.setAttribute("material", "src: #mat-gateway; shader: flat; transparent: true");
                gateway.setAttribute("id", "gateway");
                gateway.className = "interact";
                gateway.object3D.position.y = DOOR_SIZE / 2;
                SCENE.appendChild(gateway);
                if (rndRotation === 0) {
                    gateway.object3D.position.x = xPos - (DOOR_SIZE * 0.07);
                    gateway.object3D.position.z = zPos + (TILE_SIZE / 2) - (WALL_DEPTH / 2);
                } else if (rndRotation === 1) {
                    gateway.object3D.rotation.y = Math.PI * 1.5;
                    gateway.object3D.position.x = xPos - (TILE_SIZE / 2) + (WALL_DEPTH / 2);
                    gateway.object3D.position.z = zPos - (DOOR_SIZE * 0.08);
                } else if (rndRotation === 2) {
                    gateway.object3D.rotation.y = Math.PI;
                    gateway.object3D.position.x = xPos + (DOOR_SIZE * 0.08);
                    gateway.object3D.position.z = zPos - (TILE_SIZE / 2) + (WALL_DEPTH / 2);
                } else if (rndRotation === 3) {
                    gateway.object3D.rotation.y = Math.PI / 2;
                    gateway.object3D.position.x = xPos + (TILE_SIZE / 2) - (WALL_DEPTH / 2);
                    gateway.object3D.position.z = zPos + (DOOR_SIZE * 0.1);
                }
                gateway.setAttribute("gateway", "");

                // teleporter
                let mergeTeleporter = document.createElement("a-entity");
                mergeTeleporter.setAttribute("mixin", "teleporter");
                mergeTeleporter.object3D.position.x = xPos;
                mergeTeleporter.object3D.position.z = zPos;
                if (rndRotation === 1) {
                    mergeTeleporter.object3D.rotation.y = Math.PI * 1.5;
                } else if (rndRotation === 2) {
                    mergeTeleporter.object3D.rotation.y = Math.PI;
                } else if (rndRotation === 3) {
                    mergeTeleporter.object3D.rotation.y = Math.PI * 0.5;
                }
                mergeTeleporter.setAttribute("teleporter", "");
                let teleporterBase1 = document.createElement("a-entity");
                teleporterBase1.setAttribute("geometry", "primitive: cylinder; segmentsHeight: 1; segmentsRadial: 25; radius: 1.5; height: 0.2; buffer: false");
                teleporterBase1.object3D.position.y = 0.1;
                teleporterBase1.setAttribute("mixin", "teleporter");
                mergeTeleporter.appendChild(teleporterBase1);
                let teleporterBase2 = document.createElement("a-entity");
                teleporterBase2.setAttribute("geometry", "primitive: cylinder; segmentsHeight: 1; segmentsRadial: 25; radius: 1.2; height: 0.2; buffer: false");
                teleporterBase2.object3D.position.y = 0.3;
                teleporterBase2.setAttribute("mixin", "teleporter");
                mergeTeleporter.appendChild(teleporterBase2);
                let teleporterMain = document.createElement("a-entity");
                teleporterMain.setAttribute("geometry", "primitive: cylinder; segmentsHeight: 1; segmentsRadial: 25; radius: 0.9; height: 3");
                teleporterMain.setAttribute("material", "opacity: 0.5; shader: flat; color: blue; transparent: true");
                teleporterMain.setAttribute("animation", "property: components.material.material.opacity; from: 0.4; to: 0.2; dur: 1500; loop: true; dir: alternate");
                teleporterMain.object3D.position.x = xPos;
                teleporterMain.object3D.position.y = 1.9;
                teleporterMain.object3D.position.z = zPos;
                SCENE.appendChild(teleporterMain);
                let teleporterTop1 = document.createElement("a-entity");
                teleporterTop1.setAttribute("geometry", "primitive: cylinder; segmentsHeight: 1; segmentsRadial: 25; radius: 1.2; height: 0.2; buffer: false");
                teleporterTop1.object3D.position.y = 3.5;
                teleporterTop1.setAttribute("mixin", "teleporter");
                mergeTeleporter.appendChild(teleporterTop1);
                let teleporterSupport = document.createElement("a-entity");
                teleporterSupport.setAttribute("geometry", "primitive: ring; radiusInner: 2; radiusOuter: 2.3; segmentsTheta: 12; segmentsPhi: 1; buffer: false");
                teleporterSupport.object3D.position.y = 1.9;
                teleporterSupport.setAttribute("mixin", "teleporter");
                mergeTeleporter.appendChild(teleporterSupport);
                mergeTeleporter.setAttribute("geometry-merger", "");
                SCENE.appendChild(mergeTeleporter);

            } else { // everywhere else has ammunition or first aid kits or robots

                let rndMediKit = Math.floor(Math.random() * 3);
                if (rndMediKit > 0) { // 2 in 3 chance
                    let mediKit = document.createElement("a-entity");
                    mediKit.setAttribute("geometry", "primitive: box; buffer: false");
                    mediKit.object3D.scale.x = 0.4;
                    mediKit.object3D.scale.y = 0.4;
                    mediKit.object3D.scale.z = 0.4;
                    mediKit.setAttribute("material", "src: #medikit");
                    mediKit.setAttribute("medikit", "");
                    mediKit.object3D.position.x = xPos;
                    mediKit.object3D.position.y = 0.2;
                    mediKit.object3D.position.z = zPos;
                    //mergeMediKits.appendChild(mediKit);
                    SCENE.appendChild(mediKit); // can't merge medikits otherwise they don't get removed in VR
                }

            }
    /*
            let building = document.createElement("a-entity");

            building.setAttribute("width", TILE_SIZE);
            building.setAttribute("depth", TILE_SIZE);
            //building.setAttribute("material", "src: #skyscraper");
            building.setAttribute("material", "color: #eee");
    */
            // base of building
            let width1 = (TILE_SIZE - DOOR_SIZE) / 2;

            let buildingFront1 = document.createElement("a-entity");
            buildingFront1.setAttribute("geometry", "primitive: box; buffer: false");
            buildingFront1.object3D.position.y = DOOR_SIZE / 2;
            buildingFront1.setAttribute("collision-obj", "");
            mergeBuildings.appendChild(buildingFront1);

            let buildingFront2 = document.createElement("a-entity");
            buildingFront2.setAttribute("geometry", "primitive: box; buffer: false");
            buildingFront2.object3D.position.y = DOOR_SIZE / 2;
            buildingFront2.setAttribute("collision-obj", "");
            mergeBuildings.appendChild(buildingFront2);

            let buildingBack = document.createElement("a-entity");
            buildingBack.setAttribute("geometry", "primitive: box; buffer: false");
            buildingBack.object3D.position.y = DOOR_SIZE / 2;
            buildingBack.setAttribute("collision-obj", "");
            mergeBuildings.appendChild(buildingBack);

            let buildingSide1 = document.createElement("a-entity");
            buildingSide1.setAttribute("geometry", "primitive: box; buffer: false");
            buildingSide1.object3D.position.y = DOOR_SIZE / 2;
            buildingSide1.setAttribute("collision-obj", "");
            //buildingSide1.setAttribute("material", "repeat: 2 1");
            mergeBuildings.appendChild(buildingSide1);

            let buildingSide2 = document.createElement("a-entity");
            buildingSide2.setAttribute("geometry", "primitive: box; buffer: false");
            buildingSide2.object3D.position.y = DOOR_SIZE / 2;
            buildingSide2.setAttribute("collision-obj", "");
            //buildingSide2.setAttribute("material", "repeat: 2 1");
            mergeBuildings.appendChild(buildingSide2);

            // Building Rotation
            if (rndRotation === 0 || rndRotation === 2) {
                buildingFront1.object3D.scale.x = width1;
                buildingFront1.object3D.scale.y = DOOR_SIZE;
                buildingFront1.object3D.scale.z = WALL_DEPTH;
                buildingFront1.object3D.position.x = xPos - (width1 / 2) - (DOOR_SIZE / 2);
                buildingFront2.object3D.scale.x = width1;
                buildingFront2.object3D.scale.y = DOOR_SIZE;
                buildingFront2.object3D.scale.z = WALL_DEPTH;
                buildingFront2.object3D.position.x = xPos + (width1 / 2) + (DOOR_SIZE / 2);
                buildingSide1.object3D.scale.x = WALL_DEPTH;
                buildingSide1.object3D.scale.y = DOOR_SIZE;
                buildingSide1.object3D.scale.z = TILE_SIZE;
                buildingSide1.object3D.position.x = xPos - (TILE_SIZE / 2) + (WALL_DEPTH / 2);
                buildingSide1.object3D.position.z = zPos;
                buildingSide2.object3D.scale.x = WALL_DEPTH;
                buildingSide2.object3D.scale.y = DOOR_SIZE;
                buildingSide2.object3D.scale.z = TILE_SIZE;
                buildingSide2.object3D.position.x = xPos + (TILE_SIZE / 2) - (WALL_DEPTH / 2);
                buildingSide2.object3D.position.z = zPos;
                buildingBack.object3D.scale.x = TILE_SIZE;
                buildingBack.object3D.scale.y = DOOR_SIZE;
                buildingBack.object3D.scale.z = WALL_DEPTH;
                buildingBack.object3D.position.x = xPos;
            } else {
                buildingFront1.object3D.scale.x = WALL_DEPTH;
                buildingFront1.object3D.scale.y = DOOR_SIZE;
                buildingFront1.object3D.scale.z = width1;
                buildingFront1.object3D.position.z = zPos - (width1 / 2) - (DOOR_SIZE / 2);
                buildingFront2.object3D.scale.x = WALL_DEPTH;
                buildingFront2.object3D.scale.y = DOOR_SIZE;
                buildingFront2.object3D.scale.z = width1;
                buildingFront2.object3D.position.z = zPos + (width1 / 2) + (DOOR_SIZE / 2);
                buildingSide1.object3D.scale.x = TILE_SIZE;
                buildingSide1.object3D.scale.y = DOOR_SIZE;
                buildingSide1.object3D.scale.z = WALL_DEPTH;
                buildingSide1.object3D.position.x = xPos;
                buildingSide1.object3D.position.z = zPos + (TILE_SIZE / 2) - (WALL_DEPTH / 2);
                buildingSide2.object3D.scale.x = TILE_SIZE;
                buildingSide2.object3D.scale.y = DOOR_SIZE;
                buildingSide2.object3D.scale.z = WALL_DEPTH;
                buildingSide2.object3D.position.x = xPos;
                buildingSide2.object3D.position.z = zPos - (TILE_SIZE / 2) + (WALL_DEPTH / 2);
                buildingBack.object3D.scale.x = WALL_DEPTH;
                buildingBack.object3D.scale.y = DOOR_SIZE;
                buildingBack.object3D.scale.z = TILE_SIZE;
                buildingBack.object3D.position.z = zPos;
            }
            if (rndRotation === 0) { // doors facing South
                buildingFront1.object3D.position.z = zPos + (TILE_SIZE / 2) - (WALL_DEPTH / 2);
                buildingFront2.object3D.position.z = zPos + (TILE_SIZE / 2) - (WALL_DEPTH / 2);
                buildingBack.object3D.position.z = zPos - (TILE_SIZE / 2) + (WALL_DEPTH / 2);
            } else if (rndRotation === 1) { // doors facing West
                buildingFront1.object3D.position.x = xPos - (TILE_SIZE / 2) + (WALL_DEPTH / 2);
                buildingFront2.object3D.position.x = xPos - (TILE_SIZE / 2) + (WALL_DEPTH / 2);
                buildingBack.object3D.position.x = xPos + (TILE_SIZE / 2) - (WALL_DEPTH / 2);
            } else if (rndRotation === 2) { // doors facing North
                buildingFront1.object3D.position.z = zPos - (TILE_SIZE / 2) + (WALL_DEPTH / 2);
                buildingFront2.object3D.position.z = zPos - (TILE_SIZE / 2) + (WALL_DEPTH / 2);
                buildingBack.object3D.position.z = zPos + (TILE_SIZE / 2) - (WALL_DEPTH / 2);
            } else if (rndRotation === 3) { // doors facing East
                buildingFront1.object3D.position.x = xPos + (TILE_SIZE / 2) - (WALL_DEPTH / 2);
                buildingFront2.object3D.position.x = xPos + (TILE_SIZE / 2) - (WALL_DEPTH / 2);
                buildingBack.object3D.position.x = xPos - (TILE_SIZE / 2) + (WALL_DEPTH / 2);
            }

            /*
            const createOpenBox = function (includeSides) {
                let merger = document.createElement("a-entity");
                if (!includeSides || includeSides.indexOf("1") !== -1) {
                    let side1 = document.createElement("a-entity");
                    side1.setAttribute("geometry", "primitive: plane; buffer: false");
                    side1.object3D.position.z = 0.5;
                    merger.appendChild(side1);
                }
                if (!includeSides || includeSides.indexOf("2") !== -1) {
                    let side2 = document.createElement("a-entity");
                    side2.setAttribute("geometry", "primitive: plane; buffer: false");
                    side2.object3D.position.x = 0.5;
                    side2.object3D.rotation.y = Math.PI * 0.5;
                    merger.appendChild(side2);
                }
                if (!includeSides || includeSides.indexOf("3") !== -1) {
                    let side3 = document.createElement("a-entity");
                    side3.setAttribute("geometry", "primitive: plane; buffer: false");
                    side3.object3D.position.z = -0.5;
                    side3.object3D.rotation.y = Math.PI;
                    merger.appendChild(side3);
                }
                if (!includeSides || includeSides.indexOf("4") !== -1) {
                    let side4 = document.createElement("a-entity");
                    side4.setAttribute("geometry", "primitive: plane; buffer: false");
                    side4.object3D.position.x = -0.5;
                    side4.object3D.rotation.y = Math.PI * 1.5;
                    merger.appendChild(side4);
                }
                if (includeSides && includeSides.indexOf("5") !== -1) {
                    let side5 = document.createElement("a-entity");
                    side5.setAttribute("geometry", "primitive: plane; buffer: false");
                    side5.object3D.position.y = -0.5;
                    side5.object3D.rotation.x = Math.PI * 0.5;
                    merger.appendChild(side5);
                }
                if (includeSides && includeSides.indexOf("6") !== -1) {
                    let side6 = document.createElement("a-entity");
                    side6.setAttribute("geometry", "primitive: plane; buffer: false");
                    side6.object3D.position.y = 0.5;
                    side6.object3D.rotation.x = Math.PI * 1.5;
                    merger.appendChild(side6);
                }
                merger.setAttribute("geometry-merger", "");
                return merger;
            }
            */

            // top part of building, windows etc.
            let stories = Math.floor(Math.random() * 9) + 2;

            //let v11 = createOpenBox("134");
            let v11 = document.createElement("a-entity");
            v11.setAttribute("geometry", "primitive: box; buffer: false;");
            v11.object3D.scale.x = TILE_SIZE / 6;
            v11.object3D.scale.y = stories * STOREY_HEIGHT;
            v11.object3D.scale.z = WALL_DEPTH;
            v11.object3D.position.x = xPos + (TILE_SIZE / 2) - (TILE_SIZE / 12);
            v11.object3D.position.y = ((stories * STOREY_HEIGHT) / 2) + DOOR_SIZE;
            v11.object3D.position.z = zPos + (TILE_SIZE / 2) - (WALL_DEPTH / 2);
            mergeBuildings.appendChild(v11);
            
            //let v12 = createOpenBox();
            let v12 = document.createElement("a-entity");
            v12.setAttribute("geometry", "primitive: box; buffer: false");
            v12.object3D.scale.x = TILE_SIZE / 6;
            v12.object3D.scale.y = stories * STOREY_HEIGHT;
            v12.object3D.scale.z = WALL_DEPTH;
            v12.object3D.position.x = xPos;
            v12.object3D.position.y = ((stories * STOREY_HEIGHT) / 2) + DOOR_SIZE;
            v12.object3D.position.z = zPos + (TILE_SIZE / 2) - (WALL_DEPTH / 2);
            mergeBuildings.appendChild(v12);
            
            //let v13 = createOpenBox("123");
            let v13 = document.createElement("a-entity");
            v13.setAttribute("geometry", "primitive: box; buffer: false");
            v13.object3D.scale.x = TILE_SIZE / 6;
            v13.object3D.scale.y = stories * STOREY_HEIGHT;
            v13.object3D.scale.z = WALL_DEPTH;
            v13.object3D.position.x = xPos + (TILE_SIZE / -2) + (TILE_SIZE / 12);
            v13.object3D.position.y = ((stories * STOREY_HEIGHT) / 2) + DOOR_SIZE;
            v13.object3D.position.z = zPos + (TILE_SIZE / 2) - (WALL_DEPTH / 2);
            mergeBuildings.appendChild(v13);

            //let v21 = createOpenBox("1234"); // TO DO: only need 3 sides, just need to work out which
            let v21 = document.createElement("a-entity");
            v21.setAttribute("geometry", "primitive: box; buffer: false");
            v21.object3D.scale.x = WALL_DEPTH;
            v21.object3D.scale.y = stories * STOREY_HEIGHT;
            v21.object3D.scale.z = TILE_SIZE / 6;
            v21.object3D.position.x = xPos + (TILE_SIZE / 2) - (WALL_DEPTH / 2);
            v21.object3D.position.y = ((stories * STOREY_HEIGHT) / 2) + DOOR_SIZE;
            v21.object3D.position.z = zPos + (TILE_SIZE / 2) - (TILE_SIZE / 12);
            mergeBuildings.appendChild(v21);
            
            //let v22 = createOpenBox();
            let v22 = document.createElement("a-entity");
            v22.setAttribute("geometry", "primitive: box; buffer: false");
            v22.object3D.scale.x = WALL_DEPTH;
            v22.object3D.scale.y = stories * STOREY_HEIGHT;
            v22.object3D.scale.z = TILE_SIZE / 6;
            v22.object3D.position.x = xPos + (TILE_SIZE / 2) - (WALL_DEPTH / 2);
            v22.object3D.position.y = ((stories * STOREY_HEIGHT) / 2) + DOOR_SIZE;
            v22.object3D.position.z = zPos;
            mergeBuildings.appendChild(v22);
            
            //let v23 = createOpenBox("1234");
            let v23 = document.createElement("a-entity");
            v23.setAttribute("geometry", "primitive: box; buffer: false");
            v23.object3D.scale.x = WALL_DEPTH;
            v23.object3D.scale.y = stories * STOREY_HEIGHT;
            v23.object3D.scale.z = TILE_SIZE / 6;
            v23.object3D.position.x = xPos + (TILE_SIZE / 2) - (WALL_DEPTH / 2);
            v23.object3D.position.y = ((stories * STOREY_HEIGHT) / 2) + DOOR_SIZE;
            v23.object3D.position.z = zPos + (TILE_SIZE / -2) + (TILE_SIZE / 12);
            mergeBuildings.appendChild(v23);

            //let v31 = createOpenBox("1234");
            let v31 = document.createElement("a-entity");
            v31.setAttribute("geometry", "primitive: box; buffer: false");
            v31.object3D.scale.x = TILE_SIZE / 6;
            v31.object3D.scale.y = stories * STOREY_HEIGHT;
            v31.object3D.scale.z = WALL_DEPTH;
            v31.object3D.position.x = xPos + (TILE_SIZE / 2) - (TILE_SIZE / 12);
            v31.object3D.position.y = ((stories * STOREY_HEIGHT) / 2) + DOOR_SIZE;
            v31.object3D.position.z = zPos + (TILE_SIZE / -2) + (WALL_DEPTH / 2);
            mergeBuildings.appendChild(v31);
            
            //let v32 = createOpenBox();
            let v32 = document.createElement("a-entity");
            v32.setAttribute("geometry", "primitive: box; buffer: false");
            v32.object3D.scale.x = TILE_SIZE / 6;
            v32.object3D.scale.y = stories * STOREY_HEIGHT;
            v32.object3D.scale.z = WALL_DEPTH;
            v32.object3D.position.x = xPos;
            v32.object3D.position.y = ((stories * STOREY_HEIGHT) / 2) + DOOR_SIZE;
            v32.object3D.position.z = zPos + (TILE_SIZE / -2) + (WALL_DEPTH / 2);
            mergeBuildings.appendChild(v32);
            
            //let v33 = createOpenBox("1234");
            let v33 = document.createElement("a-entity");
            v33.setAttribute("geometry", "primitive: box; buffer: false");
            v33.object3D.scale.x = TILE_SIZE / 6;
            v33.object3D.scale.y = stories * STOREY_HEIGHT;
            v33.object3D.scale.z = WALL_DEPTH;
            v33.object3D.position.x = xPos + (TILE_SIZE / -2) + (TILE_SIZE / 12);
            v33.object3D.position.y = ((stories * STOREY_HEIGHT) / 2) + DOOR_SIZE;
            v33.object3D.position.z = zPos + (TILE_SIZE / -2) + (WALL_DEPTH / 2);
            mergeBuildings.appendChild(v33);

            //let v41 = createOpenBox("1234");
            let v41 = document.createElement("a-entity");
            v41.setAttribute("geometry", "primitive: box; buffer: false");
            v41.object3D.scale.x = WALL_DEPTH;
            v41.object3D.scale.y = stories * STOREY_HEIGHT;
            v41.object3D.scale.z = TILE_SIZE / 6;
            v41.object3D.position.x = xPos + (TILE_SIZE / -2) + (WALL_DEPTH / 2);
            v41.object3D.position.y = ((stories * STOREY_HEIGHT) / 2) + DOOR_SIZE;
            v41.object3D.position.z = zPos + (TILE_SIZE / 2) - (TILE_SIZE / 12);
            mergeBuildings.appendChild(v41);
            
            //let v42 = createOpenBox();
            let v42 = document.createElement("a-entity");
            v42.setAttribute("geometry", "primitive: box; buffer: false");
            v42.object3D.scale.x = WALL_DEPTH;
            v42.object3D.scale.y = stories * STOREY_HEIGHT;
            v42.object3D.scale.z = TILE_SIZE / 6;
            v42.object3D.position.x = xPos + (TILE_SIZE / -2) + (WALL_DEPTH / 2);
            v42.object3D.position.y = ((stories * STOREY_HEIGHT) / 2) + DOOR_SIZE;
            v42.object3D.position.z = zPos;
            mergeBuildings.appendChild(v42);
            
            //let v43 = createOpenBox("1234");
            let v43 = document.createElement("a-entity");
            v43.setAttribute("geometry", "primitive: box; buffer: false");
            v43.object3D.scale.x = WALL_DEPTH;
            v43.object3D.scale.y = stories * STOREY_HEIGHT;
            v43.object3D.scale.z = TILE_SIZE / 6;
            v43.object3D.position.x = xPos + (TILE_SIZE / -2) + (WALL_DEPTH / 2);
            v43.object3D.position.y = ((stories * STOREY_HEIGHT) / 2) + DOOR_SIZE;
            v43.object3D.position.z = zPos + (TILE_SIZE / -2) + (TILE_SIZE / 12);
            mergeBuildings.appendChild(v43);

            for (let STOREY = 0; STOREY <= stories; STOREY++) { // <= to create one extra horizontal box at the very top
                
                //let h1 = createOpenBox("135");
                let h1 = document.createElement("a-entity");
                h1.setAttribute("geometry", "primitive: box; buffer: false");
                h1.object3D.scale.x = TILE_SIZE;
                h1.object3D.scale.y = STOREY_HEIGHT / 4;
                h1.object3D.scale.z = WALL_DEPTH;
                h1.object3D.position.x = xPos;
                h1.object3D.position.y = (STOREY_HEIGHT / 8) + DOOR_SIZE + (STOREY * STOREY_HEIGHT);
                h1.object3D.position.z = zPos + (TILE_SIZE / 2) - (WALL_DEPTH / 2);
                //h1.object3D.rotation.x = Math.PI * 0.5;
                mergeBuildings.appendChild(h1);
                
                //let h2 = createOpenBox("245");
                let h2 = document.createElement("a-entity");
                h2.setAttribute("geometry", "primitive: box; buffer: false");
                h2.object3D.scale.x = WALL_DEPTH;
                h2.object3D.scale.y = STOREY_HEIGHT / 4;
                h2.object3D.scale.z = TILE_SIZE;
                h2.object3D.position.x = xPos + (TILE_SIZE / 2) - (WALL_DEPTH / 2);
                h2.object3D.position.y = (STOREY_HEIGHT / 8) + DOOR_SIZE + (STOREY * STOREY_HEIGHT);
                h2.object3D.position.z = zPos;
                mergeBuildings.appendChild(h2);
                
                //let h3 = createOpenBox("135");
                let h3 = document.createElement("a-entity");
                h3.setAttribute("geometry", "primitive: box; buffer: false");
                h3.object3D.scale.x = TILE_SIZE;
                h3.object3D.scale.y = STOREY_HEIGHT / 4;
                h3.object3D.scale.z = WALL_DEPTH;
                h3.object3D.position.x = xPos;
                h3.object3D.position.y = (STOREY_HEIGHT / 8) + DOOR_SIZE + (STOREY * STOREY_HEIGHT);
                h3.object3D.position.z = zPos + (TILE_SIZE / -2) + (WALL_DEPTH / 2);
                mergeBuildings.appendChild(h3);
                
                //let h4 = createOpenBox("245");
                let h4 = document.createElement("a-entity");
                h4.setAttribute("geometry", "primitive: box; buffer: false");
                h4.object3D.scale.x = WALL_DEPTH;
                h4.object3D.scale.y = STOREY_HEIGHT / 4;
                h4.object3D.scale.z = TILE_SIZE;
                h4.object3D.position.x = xPos + (TILE_SIZE / -2) + (WALL_DEPTH / 2);
                h4.object3D.position.y = (STOREY_HEIGHT / 8) + DOOR_SIZE + (STOREY * STOREY_HEIGHT);
                h4.object3D.position.z = zPos;
                mergeBuildings.appendChild(h4);
            }

            // roof
            //let roof = createOpenBox("12345");
            let roof = document.createElement("a-entity");
            roof.setAttribute("geometry", "primitive: box; buffer: false");
            roof.object3D.scale.x = TILE_SIZE;
            roof.object3D.scale.y = STOREY_HEIGHT / 4;
            roof.object3D.scale.z = TILE_SIZE;
            roof.object3D.position.x = xPos;
            roof.object3D.position.y = (stories * STOREY_HEIGHT) + DOOR_SIZE + (STOREY_HEIGHT / 8);
            roof.object3D.position.z = zPos;
            mergeBuildings.appendChild(roof);


            // Building Position
            /*
            building.object3D.position.x = xPos;
            building.object3D.position.z = zPos;
            building.setAttribute("geometry-merger", "preserveOriginal: false");
            mergeBuildings.appendChild(building);
            */

            // WINDOWS
            let window1a = document.createElement("a-entity");
            window1a.setAttribute("mixin", "windows");
            window1a.object3D.scale.x = TILE_SIZE - WALL_DEPTH;
            window1a.object3D.scale.y = STOREY_HEIGHT * stories;
            window1a.object3D.position.x = xPos;
            window1a.object3D.position.y = DOOR_SIZE + (STOREY_HEIGHT * stories * 0.5);
            window1a.object3D.position.z = zPos + (TILE_SIZE / 2) - (WALL_DEPTH / 2);
            mergeWindows.appendChild(window1a);
            let window1b = document.createElement("a-entity");
            window1b.setAttribute("mixin", "windows");
            window1b.object3D.scale.x = TILE_SIZE - WALL_DEPTH;
            window1b.object3D.scale.y = STOREY_HEIGHT * stories;
            window1b.object3D.position.x = xPos;
            window1b.object3D.position.y = DOOR_SIZE + (STOREY_HEIGHT * stories * 0.5);
            window1b.object3D.position.z = zPos + (TILE_SIZE / 2) - (WALL_DEPTH / 2);
            window1b.object3D.rotation.y = Math.PI;
            mergeWindows.appendChild(window1b);

            let window2a = document.createElement("a-entity");
            window2a.setAttribute("mixin", "windows");
            window2a.object3D.scale.x = TILE_SIZE - WALL_DEPTH;
            window2a.object3D.scale.y = STOREY_HEIGHT * stories;
            window2a.object3D.position.x = xPos - (TILE_SIZE / 2) + (WALL_DEPTH / 2);
            window2a.object3D.position.y = DOOR_SIZE + (STOREY_HEIGHT * stories * 0.5);
            window2a.object3D.position.z = zPos;
            window2a.object3D.rotation.y = Math.PI * 0.5;
            mergeWindows.appendChild(window2a);
            let window2b = document.createElement("a-entity");
            window2b.setAttribute("mixin", "windows");
            window2b.object3D.scale.x = TILE_SIZE - WALL_DEPTH;
            window2b.object3D.scale.y = STOREY_HEIGHT * stories;
            window2b.object3D.position.x = xPos - (TILE_SIZE / 2) + (WALL_DEPTH / 2);
            window2b.object3D.position.y = DOOR_SIZE + (STOREY_HEIGHT * stories * 0.5);
            window2b.object3D.position.z = zPos;
            window2b.object3D.rotation.y = Math.PI * 1.5;
            mergeWindows.appendChild(window2b);

            let window3a = document.createElement("a-entity");
            window3a.setAttribute("mixin", "windows");
            window3a.object3D.scale.x = TILE_SIZE - WALL_DEPTH;
            window3a.object3D.scale.y = STOREY_HEIGHT * stories;
            window3a.object3D.position.x = xPos;
            window3a.object3D.position.y = DOOR_SIZE + (STOREY_HEIGHT * stories * 0.5);
            window3a.object3D.position.z = zPos - (TILE_SIZE / 2) + (WALL_DEPTH / 2);
            mergeWindows.appendChild(window3a);
            let window3b = document.createElement("a-entity");
            window3b.setAttribute("mixin", "windows");
            window3b.object3D.scale.x = TILE_SIZE - WALL_DEPTH;
            window3b.object3D.scale.y = STOREY_HEIGHT * stories;
            window3b.object3D.position.x = xPos;
            window3b.object3D.position.y = DOOR_SIZE + (STOREY_HEIGHT * stories * 0.5);
            window3b.object3D.position.z = zPos - (TILE_SIZE / 2) + (WALL_DEPTH / 2);
            window3b.object3D.rotation.y = Math.PI;
            mergeWindows.appendChild(window3b);

            let window4a = document.createElement("a-entity");
            window4a.setAttribute("mixin", "windows");
            window4a.object3D.scale.x = TILE_SIZE - WALL_DEPTH;
            window4a.object3D.scale.y = STOREY_HEIGHT * stories;
            window4a.object3D.position.x = xPos + (TILE_SIZE / 2) - (WALL_DEPTH / 2);
            window4a.object3D.position.y = DOOR_SIZE + (STOREY_HEIGHT * stories * 0.5);
            window4a.object3D.position.z = zPos;
            window4a.object3D.rotation.y = Math.PI * 0.5;
            mergeWindows.appendChild(window4a);
            let window4b = document.createElement("a-entity");
            window4b.setAttribute("mixin", "windows");
            window4b.object3D.scale.x = TILE_SIZE - WALL_DEPTH;
            window4b.object3D.scale.y = STOREY_HEIGHT * stories;
            window4b.object3D.position.x = xPos + (TILE_SIZE / 2) - (WALL_DEPTH / 2);
            window4b.object3D.position.y = DOOR_SIZE + (STOREY_HEIGHT * stories * 0.5);
            window4b.object3D.position.z = zPos;
            window4b.object3D.rotation.y = Math.PI * 1.5;
            mergeWindows.appendChild(window4b);

        } // end buildings loop


        // need to do buildings first, as some buildings can't have robots
        // those buildings are already added to the chosenRobotLocations array
        for (let robotIndex = 0; robotIndex < ROBOT_COUNT; robotIndex++) {
            const pos = chooseRobotLocation();
            let robot = document.createElement("a-entity");
            robot.object3D.position.x = (pos.x * TILE_SIZE) - (GRID_SIZE * TILE_SIZE * 0.5) + (TILE_SIZE * 0.5);
            robot.object3D.position.z = (pos.z * TILE_SIZE) - (GRID_SIZE * TILE_SIZE * 0.5) + (TILE_SIZE * 0.5);
            robot.setAttribute("robot", "xPos: " + pos.x + "; zPos: " + pos.z);
            SCENE.appendChild(robot);
        }


        // create wall around playing grid
        (function () {
            let wall1 = document.createElement("a-entity");
            wall1.setAttribute("geometry", "primitive: plane; buffer: false");
            wall1.object3D.scale.x = (GRID_SIZE + 1) * TILE_SIZE; // +1 to allow a tile width around the outside
            wall1.object3D.scale.y = 3;
            wall1.object3D.scale.z = WALL_DEPTH;
            wall1.object3D.position.y = 1.5;
            wall1.object3D.position.z = (GRID_SIZE + 1) * (TILE_SIZE / 2);
            wall1.object3D.rotation.y = Math.PI;
            wall1.setAttribute("collision-obj", "");
            mergeBuildings.appendChild(wall1);
            let wall2 = document.createElement("a-entity");
            wall2.setAttribute("geometry", "primitive: plane; buffer: false");
            wall2.object3D.scale.x = (GRID_SIZE + 1) * TILE_SIZE;
            wall2.object3D.scale.y = 3;
            wall2.object3D.scale.z = WALL_DEPTH;
            wall2.object3D.position.y = 1.5;
            wall2.object3D.position.x = (GRID_SIZE + 1) * (TILE_SIZE / -2);
            wall2.object3D.rotation.y = Math.PI * 0.5;
            wall2.setAttribute("collision-obj", "");
            mergeBuildings.appendChild(wall2);
            let wall3 = document.createElement("a-entity");
            wall3.setAttribute("geometry", "primitive: plane; buffer: false");
            wall3.object3D.scale.x = (GRID_SIZE + 1) * TILE_SIZE;
            wall3.object3D.scale.y = 3;
            wall3.object3D.scale.z = WALL_DEPTH;
            wall3.object3D.position.y = 1.5;
            wall3.object3D.position.z = (GRID_SIZE + 1) * (TILE_SIZE / -2);
            wall3.setAttribute("collision-obj", "");
            mergeBuildings.appendChild(wall3);
            let wall4 = document.createElement("a-entity");
            wall4.setAttribute("geometry", "primitive: plane; buffer: false");
            wall4.object3D.scale.x = (GRID_SIZE + 1) * TILE_SIZE;
            wall4.object3D.scale.y = 3;
            wall4.object3D.scale.z = WALL_DEPTH;
            wall4.object3D.position.y = 1.5;
            wall4.object3D.position.x = (GRID_SIZE + 1) * (TILE_SIZE / 2);
            wall4.object3D.rotation.y = Math.PI * 1.5;
            wall4.setAttribute("collision-obj", "");
            mergeBuildings.appendChild(wall4);
        }());


        SCENE.appendChild(mergeBuildings);
        mergeBuildings.setAttribute("geometry-merger", "");
        mergeBuildings.setAttribute("material", "color: #eee; src: #skyscraper");
        mergeBuildings.className = "interact";

        mergeWindows.setAttribute("geometry-merger", "");
        mergeWindows.setAttribute("material", "shader: flat; color: #699; fog: false;");
        SCENE.appendChild(mergeWindows);
        
    }

});