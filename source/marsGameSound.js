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

"use strict";

this.initialize = function() {
    //Load sounds defined in yaml file
    var soundSet = this.soundSet;
    for ( var i = 0; i < soundSet.length; ++i ) {
        this.loadSound( soundSet[i] );
    }
    this.future( 0.01 ).setUpSubtitles();
}

this.setUpSubtitles = function() {
    var scene = this.find( "/" )[ 0 ];
    if ( scene && this.setUpOnce ) {
        this.setUpOnce = false;
        this.soundStarted = this.events.add( function( instanceHandle ) { this.startSubtitle( instanceHandle ); }, this );
        this.soundFinished = this.events.add( function( instanceHandle ) { this.stopSubtitle( instanceHandle ); }, this );
    }
}

this.startSubtitle = function( instanceHandle ) {
    var scene = this.find( "/" )[ 0 ];
    if ( this.hasSubtitle( instanceHandle ) ) {
        var subtitle = this.getSubtitle( instanceHandle );
        //Get the time in seconds
        var time = this.getDuration( instanceHandle );
        scene.addSubtitle( subtitle, time );
        //Parse subtitle to find the character image to display
        var character = subtitle.split( ":" )[ 0 ];
        if ( character ) {
            character = character.slice( 1, character.length - 1 );
            var imagePath = "";
            if ( character === "MANNY" ) {
                var imagePath = "assets/images/hud/portrait_rover_communicator.png";
            } else if ( character === "MISSION CONTROL" ) {
                var imagePath = "assets/images/hud/comms_missioncontrol.png";
            } else if ( character === "PERRY" ) {
                var imagePath = "assets/images/hud/portrait_scout_large.png";
            }
            scene.hud.comms.addCharacterImage( imagePath );
        }
    }
}

this.stopSubtitle = function( instanceHandle ) {
    var scene = this.find( "/" )[ 0 ];
    if ( this.hasSubtitle( instanceHandle ) ) {
        scene.hud.comms.removeCharacterImage();
    }
}

//@ sourceURL=source/marsGameSound.js