(function () {

    const ROBOT_RANGE = 20;

    const robotData = {
        "asset" : {
            //"generator" : "Khronos glTF Blender I/O v0.9.36",
            "version" : "2.0"
        },
        //"scene" : 0,
        "scenes" : [
            {
                "name" : "Scene",
                "nodes" : [
                    0
                ]
            }
        ],
        "nodes" : [
            {
                "mesh" : 0,
                "name" : "Cube.001"
            }
        ],
        "meshes" : [
            {
                "name" : "Cube.002",
                "primitives" : [
                    {
                        "attributes" : {
                            "POSITION" : 0
                        },
                        "indices" : 1
                    }
                ]
            }
        ],
        "accessors" : [
            {
                "bufferView" : 0,
                "componentType" : 5126,
                "count" : 72,
                "max" : [
                    0.7519344091415405,
                    1.2578765153884888,
                    0.817348837852478
                ],
                "min" : [
                    -0.026826277375221252,
                    1.0526292324066162,
                    -0.828311562538147
                ],
                "type" : "VEC3"
            },
            {
                "bufferView" : 1,
                "componentType" : 5123,
                "count" : 108,
                "type" : "SCALAR"
            }
        ],
        "bufferViews" : [
            {
                "buffer" : 0,
                "byteLength" : 864,
                "byteOffset" : 0
            },
            {
                "buffer" : 0,
                "byteLength" : 216,
                "byteOffset" : 864
            }
        ],
        "buffers" : [
            {
                "byteLength" : 1080,
                "uri" : "data:application/octet-stream;base64,ALsXOmeZmz+6252+J6FzPsSRjj/kl0S/ntiHPqFRjT/Uvj+/yMLbvIvZnD/Zjae+ntiHPqFRjT/Uvj+/MFs2P7L8hz+O0VO/Nl89P4+8hj9/+E6/J6FzPsSRjj/kl0S/tA+APlO6kj+P0kS/0F9RPPbBnz8QUZ6+vheOPi96kT+A+T+/cKFvvBkCoT8vA6i+vheOPi96kT+A+T+/ALsXOmeZmz+6252+ntiHPqFRjT/Uvj+/0F9RPPbBnz8QUZ6+yMLbvIvZnD/Zjae+tA+APlO6kj+P0kS/J6FzPsSRjj/kl0S/cKFvvBkCoT8vA6i+MFs2P7L8hz+O0VO/xn5APx3lij8qM0+/Nl89P4+8hj9/+E6/wHo5P0EljD86DFS/wHo5P0EljD86DFS/vheOPi96kT+A+T+/xn5APx3lij8qM0+/tA+APlO6kj+P0kS/xn5APx3lij8qM0+/ntiHPqFRjT/Uvj+/Nl89P4+8hj9/+E6/vheOPi96kT+A+T+/J6FzPsSRjj/kl0S/wHo5P0EljD86DFS/MFs2P7L8hz+O0VO/tA+APlO6kj+P0kS/J6FzPsSRjj9wyUE/ALsXOmaZmz/SPpg+ntiHPqBRjT9g8Dw/yMLbvIrZnD/x8KE+MFs2P7L8hz8aA1E/ntiHPqBRjT9g8Dw/Nl89P468hj8LKkw/J6FzPsSRjj9wyUE/0F9RPPbBnz8otJg+tA+APlK6kj8bBEI/vheOPi56kT8MKz0/cKFvvBgCoT9HZqI+ALsXOmaZmz/SPpg+vheOPi56kT8MKz0/ntiHPqBRjT9g8Dw/0F9RPPbBnz8otJg+tA+APlK6kj8bBEI/yMLbvIrZnD/x8KE+J6FzPsSRjj9wyUE/cKFvvBgCoT9HZqI+xn5APxzlij+2ZEw/MFs2P7L8hz8aA1E/Nl89P468hj8LKkw/wHo5P0AljD/GPVE/vheOPi56kT8MKz0/wHo5P0AljD/GPVE/xn5APxzlij+2ZEw/tA+APlK6kj8bBEI/ntiHPqBRjT9g8Dw/xn5APxzlij+2ZEw/Nl89P468hj8LKkw/vheOPi56kT8MKz0/wHo5P0AljD/GPVE/J6FzPsSRjj9wyUE/MFs2P7L8hz8aA1E/tA+APlK6kj8bBEI/AAABAAIAAAADAAEABAAFAAYABAAHAAUACAAJAAoACwAJAAgADAANAA4ADwANAAwAEAARABIAEAATABEAFAAVABYAFwAVABQAGAAZABoAGwAZABgAHAAdAB4AHwAdABwAIAAhACIAIAAjACEAJAAlACYAJwAlACQAKAApACoAKwApACgALAAtAC4ALAAvAC0AMAAxADIAMAAzADEANAA1ADYANwA1ADQAOAA5ADoAOAA7ADkAPAA9AD4APAA/AD0AQABBAEIAQABDAEEARABFAEYARwBFAEQA"
            }
        ]
    };

    const COLLISION_TOLERANCE = 0.1;
    AFRAME.registerComponent("robot", {
        schema: {
            xPos: {type: "number", default: 0},
            zPos: {type: "number", default: 0}
        },
        init: function () {

            this.container = document.createElement("a-entity");
            this.container.object3D.position.x = -4;
            this.container.object3D.position.z = -4;
            this.container.setAttribute("animation", "property: object3D.position.x; from: -4; to: 4; dir: alternate; dur: 12000; loop: true");
            this.container.setAttribute("animation__2", "property: object3D.position.z; from: -4; to: 4; dir: alternate; dur: 12000; loop: true");

            // click event on this.container wasn't working too well, so created separate target box
            let target = document.createElement("a-entity");
            target.setAttribute("geometry", "primitive: box");
            target.object3D.scale.y = 2;
            target.object3D.position.y = 1;
            target.className = "interact";
            target.object3D.visible = false;
            this.container.appendChild(target);
            
            this.ring = document.createElement("a-entity");
            this.ring.setAttribute("mixin", "robot-ring");
            this.container.appendChild(this.ring);

            let mergeRobot = document.createElement("a-entity");
            mergeRobot.setAttribute("mixin", "metal");
            mergeRobot.setAttribute("geometry-merger", "");
            this.container.appendChild(mergeRobot);

            let body = document.createElement("a-entity");
            body.setAttribute("geometry", "primitive: cone; segmentsRadial: 8; segmentsHeight: 1; radiusBottom: 0.5; radiusTop: 0.3; height: 1.2; buffer: false");
            body.object3D.position.y = 0.9;
            mergeRobot.appendChild(body);

            let neck = document.createElement("a-entity");
            neck.setAttribute("geometry", "primitive: cylinder; segmentsRadial: 4; segmentsHeight: 1; radius: 0.05; height: 0.2; openEnded: true; buffer: false");
            neck.object3D.position.y = 1.6;
            neck.object3D.rotation.x = Math.PI;
            mergeRobot.appendChild(neck);

            let arms = document.createElement("a-entity");
            arms.setAttribute("gltf-model", URL.createObjectURL(new Blob([JSON.stringify(robotData)])));
            arms.object3D.rotation.y = Math.PI * 1.5;
            arms.object3D.rotation.x = Math.PI * 0.1;
            arms.object3D.position.y = 0.2;
            arms.object3D.position.z = -0.5;
            arms.setAttribute("mixin", "metal");
            this.container.appendChild(arms);
         
            let head = document.createElement("a-entity");
            head.setAttribute("geometry", "primitive: sphere; radius: 0.4; segmentsWidth: 8; segmentsHeight: 4; phiLength: 180; buffer: false");
            head.object3D.rotation.x = Math.PI * 1.5;
            head.object3D.position.y = 1.55;
            //head.setAttribute("mixin", "metal");
            mergeRobot.appendChild(head);

            let headBase = document.createElement("a-entity");
            headBase.setAttribute("geometry", "primitive: circle; radius: 0.4; segments: 8; buffer: false");
            headBase.object3D.position.y = 1.55;
            headBase.object3D.rotation.x = Math.PI * 0.5;
            mergeRobot.appendChild(headBase);

/*
            let arm11 = document.createElement("a-entity");
            arm11.setAttribute("geometry", "primitive: box; width: 0.05; height: 0.5; depth: 0.05; buffer: false");
            arm11.object3D.position.x = -0.5;
            arm11.object3D.position.y = 1.5;
            arm11.object3D.rotation.z = Math.PI / 4;
            mergeRobot.appendChild(arm11);

            let arm12 = document.createElement("a-entity");
            arm12.setAttribute("geometry", "primitive: box; width: 0.05; height: 0.5; depth: 0.05; buffer: false");
            arm12.object3D.position.x = -0.8;
            arm12.object3D.position.y = 1.5;
            arm12.object3D.position.z = -0.1;
            arm12.object3D.rotation.x = Math.PI / -4;
            arm12.object3D.rotation.z = Math.PI / -4;
            mergeRobot.appendChild(arm12);

            let arm21 = document.createElement("a-entity");
            arm21.setAttribute("geometry", "primitive: box; width: 0.05; height: 0.5; depth: 0.05; buffer: false");
            arm21.object3D.position.x = 0.5;
            arm21.object3D.position.y = 1.5;
            arm21.object3D.rotation.z = Math.PI / -4;
            mergeRobot.appendChild(arm21);

            let arm22 = document.createElement("a-entity");
            arm22.setAttribute("geometry", "primitive: box; width: 0.05; height: 0.5; depth: 0.05; buffer: false");
            arm22.object3D.position.x = 0.8;
            arm22.object3D.position.y = 1.5;
            arm22.object3D.position.z = 0.1;
            arm22.object3D.rotation.x = Math.PI / -4;
            arm22.object3D.rotation.z = Math.PI / 4;
            mergeRobot.appendChild(arm22);
*/

            this.mergeRobotEyes = document.createElement("a-entity");
            //this.mergeRobotEyes.object3D.position.x = head.object3D.position.x;
            this.mergeRobotEyes.object3D.rotation.x = Math.PI * 1.5;
            this.mergeRobotEyes.object3D.position.y = 1.7;
            //this.mergeRobotEyes.object3D.position.z = 0.22;
            this.mergeRobotEyes.setAttribute("mixin", "robot-eyes");
            this.mergeRobotEyes.setAttribute("geometry-merger", "");
            this.container.appendChild(this.mergeRobotEyes);

            let eye1 = document.createElement("a-entity");
            eye1.setAttribute("geometry", "primitive: cylinder; segmentsRadial: 6; segmentsHeight: 1; radius: 0.06; height: 0.15; buffer: false");
            eye1.object3D.position.x = -0.12;
            eye1.object3D.position.y = -0.25;
            this.mergeRobotEyes.appendChild(eye1);

            let eye2 = document.createElement("a-entity");
            eye2.setAttribute("geometry", "primitive: cylinder; segmentsRadial: 6; segmentsHeight: 1; radius: 0.06; height: 0.15; buffer: false");
            eye2.object3D.position.x = 0.12;
            eye2.object3D.position.y = -0.25;
            this.mergeRobotEyes.appendChild(eye2);

            this.laser1 = document.createElement("a-entity");
            this.laser1.object3D.visible = false;
            this.mergeRobotEyes.appendChild(this.laser1);
            this.laser2 = document.createElement("a-entity");
            this.laser2.object3D.visible = false;
            this.mergeRobotEyes.appendChild(this.laser2);

            this.el.appendChild(this.container);

            this.robotPos = new THREE.Vector3();
            this.vector = new THREE.Vector3();
            this.active = true; // robot working, not been shot yet


            // allow robots to be shot
            let self = this;
            target.addEventListener("click" ,function (evt) {

                //audioShootRobot.currentTime = 0;
                //audioShootRobot.play();
                if (self.audio2Set) {
                    self.mergeRobotEyes.components.sound.playSound();
                }

                self.container.components.animation.pauseAnimation();
                self.container.components.animation__2.pauseAnimation();
                self.container.object3D.rotation.x = Math.PI / 2;
                self.container.object3D.position.y = 0.4;
                self.ring.object3D.visible = false;
                self.active = false;
                // re-generate robots
                window.setTimeout(function () {
                    let newLocation = chooseRobotLocation(self.data.xPos + "-" + self.data.zPos);
                    self.data.xPos = newLocation.x;
                    self.data.zPos = newLocation.z;
                    self.el.object3D.position.x = (newLocation.x * TILE_SIZE) - (GRID_SIZE * TILE_SIZE * 0.5) + (TILE_SIZE * 0.5);
                    self.el.object3D.position.z = (newLocation.z * TILE_SIZE) - (GRID_SIZE * TILE_SIZE * 0.5) + (TILE_SIZE * 0.5);
                    self.container.object3D.rotation.x = 0;
                    self.container.object3D.position.y = 0;
                    self.container.components.animation.resumeAnimation();
                    self.container.components.animation__2.resumeAnimation();
                    self.ring.object3D.visible = true;
                    self.active = true;
                }, difficulty === 1 ? 20000 : difficulty === 2 ? 18000 : 16000);
            });


            this.tick = AFRAME.utils.throttleTick(this.tick, 3000, this);
        },
        tick: function () { // This has been throttled

            if (this.active) { // robot not been shot

                // setup audio once it is ready - set it as early as possible, otherwise we get a "sound not loaded yet" warning
                if (!this.audio1Set) {
                    if (audioRobotLaser.readyState === 4) {
                        this.el.setAttribute("sound", "src: #audio-robot-laser");
                        this.audio1Set = true;
                    }
                }
                if (!this.audio2Set) {
                    if (audioShootRobot.readyState === 4) {
                        this.mergeRobotEyes.setAttribute("sound", "src: #audio-shoot-robot"); // already have sound attached to self.el, so using target for 2nd sound
                        this.audio2Set = true;
                    }
                }

                // get global position of robot
                this.robotPos.setFromMatrixPosition(this.container.object3D.matrixWorld);
                //this.robotPos.x = this.data.xPos + this.container.object3D.position.x;
                //this.robotPos.z = this.data.zPos + this.container.object3D.position.z;

                // only continue if robot is within 20 metres of player
                this.distance = Math.hypot(this.robotPos.x - player.position.x, this.robotPos.z - player.position.z);
                if (this.distance < ROBOT_RANGE) {

                    //console.log("robot in range");

                    this.angle = Math.atan2(player.position.x - this.robotPos.x, player.position.z - this.robotPos.z);
                    this.lineOfSight = true;
                    
                    /*
                    this.lineOfSight = lineOfSight()
                    let lineOfSight;
                    (function () {
                        const COLLISION_TOLERANCE = 0.1;
                        let result,
                            checkPointX,
                            checkPointZ,
                            i,
                            ii,
                            vector,
                            minX,
                            maxX,
                            minZ,
                            maxZ;
                        lineOfSight = function (startX, startZ, angle, distance) {
                            result = true;
                            for (i = 0; i < distance; i += 0.3) {
                                checkPointX = startX + (i * Math.sin(angle));
                                checkPointZ = startZ + (i * Math.cos(angle));
                                
                                // check all objects for collisions
                                for (ii = 0; ii < collisionObjects.length; ii ++) {
                                    vector.setFromMatrixPosition(collisionObjects[ii].matrixWorld);
                                    minX = vector.x - (collisionObjects[ii].scale.x / 2) - COLLISION_TOLERANCE;
                                    maxX = vector.x + (collisionObjects[ii].scale.x / 2) + COLLISION_TOLERANCE;
                                    minZ = vector.z - (collisionObjects[ii].scale.z / 2) - COLLISION_TOLERANCE;
                                    maxZ = vector.z + (collisionObjects[ii].scale.z / 2) + COLLISION_TOLERANCE;

                                    if (checkPointX > minX && checkPointX < maxX) {
                                        if (checkPointZ > minZ && checkPointZ < maxZ) {
                                            result = false;
                                            break;
                                        }
                                    }
                                }
                                if (!result) {
                                    break;
                                }
                            }
                            return result;
                        }
                    }());
                    */

                    for (this.i = 0.3; this.i < this.distance; this.i += 0.3) {
                        this.checkPointX = this.robotPos.x + (this.i * Math.sin(this.angle));
                        this.checkPointZ = this.robotPos.z + (this.i * Math.cos(this.angle));
                        // check all objects for collisions
                        
                        for (this.ii = 0; this.ii < collisionObjects.length; this.ii ++) {
                            this.vector.setFromMatrixPosition(collisionObjects[this.ii].matrixWorld);
                            this.minX = this.vector.x - (collisionObjects[this.ii].scale.x / 2) - COLLISION_TOLERANCE;
                            this.maxX = this.vector.x + (collisionObjects[this.ii].scale.x / 2) + COLLISION_TOLERANCE;
                            this.minZ = this.vector.z - (collisionObjects[this.ii].scale.z / 2) - COLLISION_TOLERANCE;
                            this.maxZ = this.vector.z + (collisionObjects[this.ii].scale.z / 2) + COLLISION_TOLERANCE;

                            if (this.checkPointX > this.minX && this.checkPointX < this.maxX) {
                                if (this.checkPointZ > this.minZ && this.checkPointZ < this.maxZ) {
                                    this.lineOfSight = false;
                                    break;
                                }
                            }
                        }
                        if (!this.lineOfSight) {
                            break;
                        }
                    }


                    // turn to face player if robot has line-of-sight
                    if (this.lineOfSight) {

                        //this.mergeRobotEyes.object3D.rotation.z = this.angle;
                        this.container.object3D.rotation.y = this.angle;

                        let self = this;

                        // create delay between robots looking and shooting, so it's more obvious what they're doing
                        window.setTimeout(function () {

                            self.laser1.setAttribute("line", "start: 0.13, 0.22, 0.05; end: 0.1 " + ((self.distance * -1) + 0.5) + " -0.5; color: red");
                            self.laser1.object3D.visible = true;
                            self.laser2.setAttribute("line", "start: -0.13, 0.22, 0.05; end: -0.1 " + ((self.distance * -1) + 0.5) + " -0.5; color: red");
                            self.laser2.object3D.visible = true;

                            /*
                            if (audioRobotLaser.readyState == 4) {
                                audioRobotLaser.currentTime = 0;
                                audioRobotLaser.play();
                            }
                            */

                            if (self.audio1Set) {
                                self.el.components.sound.playSound(); 
                            }

                            window.setTimeout(function () {
                                playerShot.visible = true;
                                window.setTimeout(function () {
                                    playerShot.visible = false;
                                }, 250);
                            }, 150);

                            window.setTimeout(function () {
                                self.laser1.object3D.visible = false;
                                self.laser2.object3D.visible = false;
                            }, 250);

                            if (difficulty === 1) {
                                PLAYER_HEALTH -= 5;
                            } else {
                                PLAYER_HEALTH -= 10;
                            }

                            updateHUD();

                            if (PLAYER_HEALTH <= 0) {
                                endGame();
                            }

                        }, 250);

                    }

                }

            }
        }
    });

}());
