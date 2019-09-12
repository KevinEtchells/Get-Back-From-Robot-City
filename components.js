let player;
let difficulty = 1; // 1 = easy, 2 = medium, 3 = difficult
let PLAYER_HEALTH = 100;
//let hasKeycard = false;


AFRAME.registerComponent("player", {
    init: function () {
        player = this.el.object3D;
    }
});

AFRAME.registerComponent("playagain", {
    init: function () {
        this.el.addEventListener("click", function () {
            window.location.reload(); 
        });
    }
});


const SETTINGS_INTERACT_TOLERANCE = 1.1;

AFRAME.registerComponent("difficulty", {
    init: function () {
        
        let self = this;
        
        this.trigger = function () {
            if (difficulty === 3) {
                difficulty = 1;
            } else {
                difficulty ++;
            }
            if (difficulty === 1) {
                self.el.object3D.position.x = 0.1;
            } else if (difficulty === 2) {
                self.el.object3D.position.x = 0.8;
            } else {
                self.el.object3D.position.x = 1.5;
            }
        };
        
        this.el.addEventListener("click", function (evt) {
            self.trigger();
        });
        /*
        this.minX = this.el.object3D.position.x - SETTINGS_INTERACT_TOLERANCE;
        this.maxX = this.el.object3D.position.x + SETTINGS_INTERACT_TOLERANCE;
        this.minZ = this.el.object3D.position.z - SETTINGS_INTERACT_TOLERANCE;
        this.maxZ = this.el.object3D.position.z + SETTINGS_INTERACT_TOLERANCE;
        
        this.tick = AFRAME.utils.throttleTick(this.tick, 2000, this);
        */
    }
    /*
    tick: function () {
        if ((player.position.x + PLAYER_RADIUS) > this.minX && (player.position.x - PLAYER_RADIUS) < this.maxX) {
            if ((player.position.z + PLAYER_RADIUS) > this.minZ && (player.position.z - PLAYER_RADIUS) < this.maxZ) {                   this.trigger();
            }
        }
    }
    */
});

AFRAME.registerComponent("bgmusic", {
    init: function () {
        
        let self = this;
        
        this.trigger = function () {
            bgMusicOn = !bgMusicOn;
            if (bgMusicOn) {
                self.el.object3D.position.x = 1.8;
                if (audio_bgMusic.readyState > 0) {
                    audio_bgMusic.play();
                }
            } else {
                self.el.object3D.position.x = 2.8;
                if (audio_bgMusic.readyState > 0) {
                    audio_bgMusic.pause();
                }
            }
        }
        
        this.el.addEventListener("click", function (evt) {
            self.trigger();
        });
        /*
        this.minX = this.el.object3D.position.x - SETTINGS_INTERACT_TOLERANCE;
        this.maxX = this.el.object3D.position.x + SETTINGS_INTERACT_TOLERANCE;
        this.minZ = this.el.object3D.position.z - SETTINGS_INTERACT_TOLERANCE;
        this.maxZ = this.el.object3D.position.z + SETTINGS_INTERACT_TOLERANCE;
        
        this.tick = AFRAME.utils.throttleTick(this.tick, 2000, this);
        */
    }
    /*
    tick: function () {
        if ((player.position.x + PLAYER_RADIUS) > this.minX && (player.position.x - PLAYER_RADIUS) < this.maxX) {
            if ((player.position.z + PLAYER_RADIUS) > this.minZ && (player.position.z - PLAYER_RADIUS) < this.maxZ) {                   this.trigger();
            }
        }
    }
    */
});

let ground;
AFRAME.registerComponent("ground", {
    init: function () {
        
        let self = this;
        
        ground = this.el; // used in click handler
        
        // required for click handler:
        //this.vector = new THREE.Vector3();

        this.el.addEventListener("click", function (evt) {

            if (evt.detail.intersection.distance < MAX_TELEPORT_DISTANCE) { // only allow teleporting a certain distance
                
                // check this doesn't go through any walls / doors
                
                //self.angle = Math.atan2(evt.detail.intersection.point.x - camera.object3D.position.x, evt.detail.intersection.point.z - camera.object3D.position.z);
                //self.lineOfSight = true;
                /*
                for (self.i = 0.2; self.i < evt.detail.intersection.distance; self.i += 0.3) {
                    self.checkPointX = camera.object3D.position.x + (self.i * Math.sin(self.angle));
                    self.checkPointZ = camera.object3D.position.z + (self.i * Math.cos(self.angle));
                    // check all objects for collisions

                    for (self.ii = 0; self.ii < collisionObjects.length; self.ii ++) {
                        //if (collisionObjects[self.ii].gateway) {
                        self.vector.setFromMatrixPosition(collisionObjects[self.ii].matrixWorld);
                        self.minX = self.vector.x - (collisionObjects[self.ii].scale.x / 2);
                        self.maxX = self.vector.x + (collisionObjects[self.ii].scale.x / 2);
                        self.minZ = self.vector.z - (collisionObjects[self.ii].scale.z / 2);
                        self.maxZ = self.vector.z + (collisionObjects[self.ii].scale.z / 2);

                        if (self.checkPointX > self.minX && self.checkPointX < self.maxX) {
                            if (self.checkPointZ > self.minZ && self.checkPointZ < self.maxZ) {
                                self.lineOfSight = false;
                                console.log(self.i);
                                console.log(collisionObjects[self.ii]);
                                break;
                            }
                        }
                    }
                    if (!self.lineOfSight) {
                        break;
                    }
                }
                */
                //if (self.lineOfSight) {
                    //self.targetPos = evt.detail.intersection.point;
                    camera.object3D.position.x = evt.detail.intersection.point.x;
                    camera.object3D.position.z = evt.detail.intersection.point.z;
                //}

            }
        });
        
        //this.raycaster = document.querySelector("#controller").components.raycaster;
        this.teleportSymbol = document.querySelector("#teleport-symbol").object3D;

        this.el.addEventListener("raycaster-intersected", evt => {
            self.intersected = true;
        });
        this.el.addEventListener("raycaster-intersected-cleared", evt => {
            self.intersected = false;
            self.teleportSymbol.visible = false;
        });
        
        this.tick = AFRAME.utils.throttleTick(this.tick, 100, this);

    },
    tick: function () {
        if (this.intersected) {
            this.distance = raycaster.getIntersection(this.el).distance;
            if (this.distance < MAX_TELEPORT_DISTANCE) {
                /*
                this.teleportSymbol.position.z = (this.distance * -1) + 0.4;
                this.teleportSymbol.rotation.x = this.distance * -0.2;
                this.teleportSymbol.scale.x = (this.distance * 0.1) + 1;
                this.teleportSymbol.scale.y = (this.distance * 0.1);
                */
                this.teleportSymbol.visible = true;
            } else {
                this.teleportSymbol.visible = false;
            }
        }
        
    }
});


const PICKUP_TOLERANCE = 1;

AFRAME.registerComponent("medikit", {
    init: function () {
        this.minX = this.el.object3D.position.x - PICKUP_TOLERANCE;
        this.maxX = this.el.object3D.position.x + PICKUP_TOLERANCE;
        this.minZ = this.el.object3D.position.z - PICKUP_TOLERANCE;
        this.maxZ = this.el.object3D.position.z + PICKUP_TOLERANCE;
        this.active = true;

        this.tick = AFRAME.utils.throttleTick(this.tick, 500, this);
    },
    tick: function () {
        if (this.active) {
            if (player && (player.position.x + PLAYER_RADIUS) > this.minX && (player.position.x - PLAYER_RADIUS) < this.maxX) {
                if ((player.position.z + PLAYER_RADIUS) > this.minZ && (player.position.z - PLAYER_RADIUS) < this.maxZ) {                 
                    audioPickup.play();
                    if (difficulty == 3) {
                        PLAYER_HEALTH += 5;
                    } else {
                        PLAYER_HEALTH += 10;
                    }
                    if (PLAYER_HEALTH > 100) { // can't go over 100
                        PLAYER_HEALTH = 100;
                    }
                    updateHUD();
                    this.el.remove();
                    this.active = false;
                }
            }
        }
    }
});

AFRAME.registerComponent("keycard", {
    init: function () {
        this.vector = new THREE.Vector3();
        this.active = true;
        this.tick = AFRAME.utils.throttleTick(this.tick, 500, this);
    },
    tick: function () {
        if (this.active) {
            if (!this.minX) { // so we only set this once, can't be in init though as vector is 0
                this.vector.setFromMatrixPosition(this.el.object3D.matrixWorld);
                if (this.vector.x !== 0) {
                    this.minX = this.vector.x - PICKUP_TOLERANCE;
                    this.maxX = this.vector.x + PICKUP_TOLERANCE;
                    this.minZ = this.vector.z - PICKUP_TOLERANCE;
                    this.maxZ = this.vector.z + PICKUP_TOLERANCE;
                }
            }

            if (player && player.position.x > this.minX && player.position.x < this.maxX) {
                if (player.position.z > this.minZ && player.position.z < this.maxZ) {
                    hasKeycard = true;
                    audioPickup.play();
                    // remove keycard from scene
                    this.el.remove();
                    this.active = false;
                    
                    updateHUD();
                }
            }
        }
    }
});

AFRAME.registerComponent("computer", {
    init: function () {
        this.vector = new THREE.Vector3();
        this.active = true;
        this.tick = AFRAME.utils.throttleTick(this.tick, 500, this);
        this.firstTime = true;
    },
    tick: function () {
        if (this.active) {
            if (!this.minX) { // so we only set this once, can't be in init though as vector is 0
                this.vector.setFromMatrixPosition(this.el.object3D.matrixWorld);
                if (this.vector.x !== 0) {
                    this.minX = this.vector.x - (PICKUP_TOLERANCE * 2);
                    this.maxX = this.vector.x + (PICKUP_TOLERANCE * 2);
                    this.minZ = this.vector.z - (PICKUP_TOLERANCE * 2);
                    this.maxZ = this.vector.z + (PICKUP_TOLERANCE * 2);
                }
            }

            if (player && player.position.x > this.minX && player.position.x < this.maxX) {
                if (player.position.z > this.minZ && player.position.z < this.maxZ) {
                    if (this.firstTime) {
                        updateComputer(); // updates texture
                        this.firstTime = false;
                    }
                    // remove gateway from collisionObjects array
                    if (hasKeycard) {
                        updateComputer(); // updates texture
                        this.active = false;
                        // remove gateway from colision objects:
                        this.length = collisionObjects.length;
                        for (this.i = 0; this.i < this.length; this.i++) {
                            if (collisionObjects[this.i].gateway) {
                                collisionObjects.splice(this.i, 1);
                                break;
                            }
                        }
                        //document.querySelector("#gateway").object3D.visible = false;
                        document.querySelector("#gateway").remove(); // remove so can teleport through it
                    }
                }
            }
        }
    }
});

AFRAME.registerComponent("teleporter", {
    init: function () {
        this.vector = new THREE.Vector3();
        this.tick = AFRAME.utils.throttleTick(this.tick, 1000, this);
    },
    tick: function () {
        if (hasKeycard) { // no point in checking further otherwise
            if (!this.minX) { // so we only set this once, can't be in init though as vector is 0
                this.vector.setFromMatrixPosition(this.el.object3D.matrixWorld);
                if (this.vector.x !== 0) {
                    this.minX = this.vector.x - (PICKUP_TOLERANCE * 2);
                    this.maxX = this.vector.x + (PICKUP_TOLERANCE * 2);
                    this.minZ = this.vector.z - (PICKUP_TOLERANCE * 2);
                    this.maxZ = this.vector.z + (PICKUP_TOLERANCE * 2);
                }
            }

            if (player && player.position.x > this.minX && player.position.x < this.maxX) {
                if (player.position.z > this.minZ && player.position.z < this.maxZ) {
                    endGame();
                }
            }
        }
    }
});


const SPEED = 0.1;

AFRAME.registerComponent("key-controls", {
    init: function () {
        this.camera = document.querySelector("a-camera").object3D;
        let self = this;
        document.body.addEventListener("keydown", function (evt) {
            if (evt.key.toLowerCase() === "w" || evt.key === "ArrowUp") {
                self.up = true;
            } else if (evt.key.toLowerCase() === "s" || evt.key === "ArrowDown") {
                self.down = true;
            } else if (evt.key.toLowerCase() === "a" || evt.key === "ArrowLeft") {
                self.left = true;
            } else if (evt.key.toLowerCase() === "d" || evt.key === "ArrowRight") {
                self.right = true;
            }
        });
        document.body.addEventListener("keyup", function (evt) {
            if (evt.key.toLowerCase() === "w" || evt.key === "ArrowUp") {
                self.up = false;
            } else if (evt.key.toLowerCase() === "s" || evt.key === "ArrowDown") {
                self.down = false;
            } else if (evt.key.toLowerCase() === "a" || evt.key === "ArrowLeft") {
                self.left = false;
            } else if (evt.key.toLowerCase() === "d" || evt.key === "ArrowRight") {
                self.right = false;
            }
        });
    },
    tick: function () {
        if (this.up) {
            this.el.object3D.position.x -= SPEED * Math.sin(this.camera.rotation.y);
            this.el.object3D.position.z -= SPEED * Math.cos(this.camera.rotation.y);
        } // don't use "else if", because 2 keys may be pressed at once
        if (this.down) {
            this.el.object3D.position.x += SPEED * Math.sin(this.camera.rotation.y);
            this.el.object3D.position.z += SPEED * Math.cos(this.camera.rotation.y);
        }
        if (this.left) {
            this.el.object3D.position.x -= SPEED * Math.sin(this.camera.rotation.y + (Math.PI / 2));
            this.el.object3D.position.z -= SPEED * Math.cos(this.camera.rotation.y + (Math.PI / 2));
        } 
        if (this.right) {
            this.el.object3D.position.x += SPEED * Math.sin(this.camera.rotation.y + (Math.PI / 2));
            this.el.object3D.position.z += SPEED * Math.cos(this.camera.rotation.y + (Math.PI / 2));
        }
    }
});

AFRAME.registerComponent("alt-movement", {
    init: function () {
        let self = this;
        this.camera = document.querySelector("a-camera").object3D;
        /* // this fires even if finger just slightly over touch-sensitive button
        this.el.addEventListener("axismove", function () {
            console.log("axis move"); 
        });
        */         
        this.el.addEventListener("buttondown", function (evt) {
            if (evt.detail.id === 0) { // back button is id === 1
                self.moving = true;
            }
        });
        this.el.addEventListener("buttonup", function (evt) {
            if (evt.detail.id === 0) {
                self.moving = false;
            }
        });
    },
    tick: function () {
        if (this.moving) {
            player.position.x -= (SPEED * 2) * Math.sin(this.camera.rotation.y); // SPEED * 2 as movement feels much slower than using keys
            player.position.z -= (SPEED * 2) * Math.cos(this.camera.rotation.y);
        }
    }
});


const PLAYER_RADIUS = 0.7;
let collisionObjects = [];
AFRAME.registerComponent("collision-obj", {
    init: function () {
        collisionObjects.push(this.el.object3D);
    }
});
AFRAME.registerComponent("gateway", {
    init: function () {
        this.el.object3D.gateway = true;
        collisionObjects.push(this.el.object3D);
    }
});
AFRAME.registerComponent("collision-cam", {
    init: function () {
        this.camera = this.el.object3D;
        this.vector = new THREE.Vector3();
    },
    tick: function () { // can't throttle this, as it creates a shaking effect when not running every frame

        this.collision = false;
        
        // check all objects for collisions
        for (this.i = 0; this.i < collisionObjects.length; this.i++) {

            if (!collisionObjects[this.i].minX) { // so we only set this once, can't be in init though as vector is 0 there
                
                // get world coordinates (rather than local)
                this.vector.setFromMatrixPosition(collisionObjects[this.i].matrixWorld);
                
                // this allows for rotated geometries (e.g. can't avoid this when using planes rather than boxes)
                this.scaleX = (collisionObjects[this.i].rotation.y === 0 || collisionObjects[this.i].rotation.y === Math.PI) ? collisionObjects[this.i].scale.x : collisionObjects[this.i].scale.z;
                this.scaleZ = (collisionObjects[this.i].rotation.y === 0 || collisionObjects[this.i].rotation.y === Math.PI) ? collisionObjects[this.i].scale.z : collisionObjects[this.i].scale.x;
                
                collisionObjects[this.i].minX = this.vector.x - (this.scaleX / 2);
                collisionObjects[this.i].maxX = this.vector.x + (this.scaleX / 2);
                collisionObjects[this.i].minZ = this.vector.z - (this.scaleZ / 2);
                collisionObjects[this.i].maxZ = this.vector.z + (this.scaleZ / 2);
            }
            
            if ((this.camera.position.x + PLAYER_RADIUS) > collisionObjects[this.i].minX && (this.camera.position.x - PLAYER_RADIUS) < collisionObjects[this.i].maxX) {
                if ((this.camera.position.z + PLAYER_RADIUS) > collisionObjects[this.i].minZ && (this.camera.position.z - PLAYER_RADIUS) < collisionObjects[this.i].maxZ) {
                    this.collision = true;
                    if (collisionObjects[this.i].gateway) {
                        PLAYER_HEALTH -= 1;
                        updateHUD();
                        if (PLAYER_HEALTH <= 0) {
                            endGame();
                        }
                    }
                }
            }
        }

        if (this.collision && this.lastGoodPos) { // revert to lastGoodPos
            this.camera.position.x = this.lastGoodPos.x;
            this.camera.position.z = this.lastGoodPos.z;
        } else { // update lastGoodPos
            this.lastGoodPos = {
                x: this.camera.position.x,
                z: this.camera.position.z
            };
        }

    }
});


/*
AFRAME.registerGeometry('openbox', {
    schema: {
        depth: {default: 1, min: 0},
        height: {default: 1, min: 0},
        width: {default: 1, min: 0}
    },
    init: function (data) {
      
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        console.log(this.geometry);
/*
      let mesh1 = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 1, 1));
      let mesh2 = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 1, 1));
      let mesh3 = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 1, 1));
      let mesh4 = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 1, 1));
      console.log(mesh1);
      mesh2.geometry.rotateY = Math.PI * 0.5;
      mesh3.geometry.rotateY = Math.PI * 0.5;
      mesh4.geometry.rotateY = Math.PI * 0.5;
      mesh1.geometry.translate({x: 0, y: 0, z: 0.5});
      mesh2.geometry.translate({x: 0.5, y: 0, z: 0});
      mesh3.geometry.translate({x: 0, y: 0, z: -0.5});
      mesh4.geometry.translate({x: -0.5, y: 0, z: 0});
      
      this.geometry = new THREE.Geometry();
      this.mesh = new THREE.Mesh(this.geometry);
      this.geometry.merge(mesh1.geometry, mesh1.matrix);
      this.geometry.merge(mesh2.geometry, mesh2.matrix);
      this.geometry.merge(mesh3.geometry, mesh3.matrix);
      this.geometry.merge(mesh4.geometry, mesh4.matrix);
      
    }
});
*/