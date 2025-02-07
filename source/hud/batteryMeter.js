// Copyright 2014 Lockheed Martin Corporation
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may 
// not use this file except in compliance with the License. You may obtain 
// a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software 
// distributed under the License is distributed on an "AS IS" BASIS, 
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and 
// limitations under the License.

this.initialize = function() {
    this.future( 0 ).setUpListeners();
}

this.draw = function( context, position ) {
    var battery = this.rovers[ this.activeRover ].battery;
    var maxBattery = this.rovers[ this.activeRover ].maxBattery;
    var arcWidth = ( this.height + this.width ) / 4 ;
    var centerX = position.x + this.width / 2;
    var centerY = position.y + this.height / 2;
    var start = Math.PI * 1.5;
    var end = start - battery / maxBattery * Math.PI * 2;
    var tilePosition = this.rovers[ this.activeRover ].position;
    var readoutString, positionString;
    context.beginPath();
    context.arc( centerX, centerY, arcWidth / 2, start, end, true );
    context.lineWidth = arcWidth - 1;
    context.strokeStyle = "rgb(0,0,0)";
    context.stroke();
    context.globalCompositeOperation = "source-in";
    context.drawImage( this.ring, position.x, position.y );
    context.globalCompositeOperation = "source-over";
    if ( this[ this.activeRover ] ) {
        context.drawImage( this[ this.activeRover ], position.x, position.y );
    }
    if ( this.frame ) {
        context.drawImage( this.frame, position.x, position.y );
    }
    context.textBaseline = "top";
    context.font = 'bold 8pt Arial';
    context.fillStyle = "rgb(215,248,255)";
    context.textAlign = "center";
    readoutString = "BATTERY: " + Math.round( battery ) + " / " + maxBattery;
    positionString = "POSITION: ( " + tilePosition[ 0 ] + ", " + tilePosition[ 1 ] + " )";
    context.fillText( readoutString, position.x + this.width / 2, position.y + this.height );
    context.fillText( positionString, position.x + this.width / 2, position.y + this.height + 12 );
}

this.setUpListeners = function() {
    var scene = this.parent.scene;
    var rover = scene.player.rover;
    var rover2 = scene.player.rover2;
    this.rovers.rover.battery = rover.battery;
    this.rovers.rover.maxBattery = rover.batteryMax;
    this.rovers.rover.position = rover.getTileCoord();
    this.rovers.rover2.battery = rover2.battery;
    this.rovers.rover2.maxBattery = rover2.batteryMax;
    this.rovers.rover2.position = rover2.getTileCoord();
    rover.batteryChanged = this.events.add( function( value ) {
        this.rovers.rover.battery = value;
    }, this );
    rover.batteryMaxChanged = this.events.add( function( value ) {
        this.rovers.rover.maxBattery = value;
    }, this );
    rover.transformChanged = this.events.add( function( transform ) {
        var scene = this.parent.scene;
        var tileMap = scene.tileMap;
        var tileCoord = tileMap.getTileCoordFromWorld( transform[ 12 ], transform[ 13 ] );
        var position = scene.removeAxisOffset( tileCoord );
        this.rovers.rover.position = position;
    }, this );
    rover2.batteryChanged = this.events.add( function( value ) {
        this.rovers.rover2.battery = value;
    }, this );
    rover2.batteryMaxChanged = this.events.add( function( value ) {
        this.rovers.rover2.maxBattery = value;
    }, this );
    rover2.transformChanged = this.events.add( function( transform ) {
        var scene = this.parent.scene;
        var tileMap = scene.tileMap;
        var tileCoord = tileMap.getTileCoordFromWorld( transform[ 12 ], transform[ 13 ] );
        var position = scene.removeAxisOffset( tileCoord );
        this.rovers.rover2.position = position;
    }, this );
    scene.gridAxesChanged = this.events.add( function() {
        var scene = this.parent.scene;
        var tileMap = scene.tileMap;
        var rover = scene.player.rover;
        var rover2 = scene.player.rover2;
        function getPos( node ) {
            var wt = node.worldTransform.slice();
            var tile = tileMap.getTileCoordFromWorld( wt[ 12 ], wt[ 13 ] );
            var pos = scene.removeAxisOffset( tile );
            return pos;
        }
        this.rovers.rover.position = getPos( rover );
        this.rovers.rover2.position = getPos( rover2 );
    }, this );
}

this.setActiveRover = function( roverName ) {
    var rover = this.rovers[ roverName ];
    if ( rover ) {
        this.activeRover = roverName;
    }
}

//@ sourceURL=source/hud/batteryMeter.js