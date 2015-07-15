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

var self;

this.initialize = function() {
    
    self = this;
    
    if ( this.enabled === true ) {
        this.future( 0 ).registerGameStartedListener();
        this.future( 0 ).registerScenarioStartedListener();
        this.future( 0 ).registerScenarioSucceededListener();
        this.future( 0 ).registerScenarioFailedListener();
        this.future( 0 ).registerScenarioResetListener();
        this.future( 0 ).registerTilesListener();
        this.future( 0 ).registerGraphListener();
        this.future( 0 ).registerBriefListener();
        this.future( 0 ).registerBlocklyListeners();
    }
}

this.registerGameStartedListener = function() {
    var scene = this.find( "/" )[ 0 ];
    scene.gameStarted = ( function( ) {
        this.broadcastEvent( 'gameStarted', '' );
    } ).bind( this );
}

this.registerScenarioStartedListener = function() {
    var scene = this.find( "/" )[ 0 ];
    scene.scenarioStarted = ( function( ) {
        this.broadcastEvent( 'scenarioStarted', scene.activeScenarioPath );
    } ).bind( this );
}

this.registerScenarioSucceededListener = function() {
    var scene = this.find( "/" )[ 0 ];
    scene.scenarioSucceeded = ( function( ) {
        this.broadcastEvent( 'scenarioSucceeded', scene.activeScenarioPath );
    } ).bind( this );
}

this.registerScenarioFailedListener = function() {
    var scene = this.find( "/" )[ 0 ];
    scene.scenarioFailed = ( function( ) {
        this.broadcastEvent( 'scenarioFailed', scene.activeScenarioPath );
    } ).bind( this );
}

this.registerScenarioResetListener = function() {
    var scene = this.find( "/" )[ 0 ];
    scene.scenarioReset = ( function( scenarioName ) {
        this.broadcastEvent( 'scenarioReset', scenarioName );
    } ).bind( this );
}

this.registerTilesListener = function() {
    var scene = this.find( "/" )[ 0 ];
    scene.displayTiles = ( function( value ) {
        this.broadcastEvent( 'toggledTiles', value );
    } ).bind( this );
}

this.registerGraphListener = function() {
    var scene = this.find( "/" )[ 0 ];
    scene.displayGraph = ( function( value ) {
        this.broadcastEvent( 'toggledGraph', value );
    } ).bind( this );
}

this.registerBriefListener = function() {
    var scene = this.find( "/" )[ 0 ];
    scene.openMissionBrief = ( function( value ) {
        this.broadcastEvent( 'openedMissionBrief', value );
    } ).bind( this );
}

this.registerBlocklyListeners = function() {
    var scene = this.find( "/" )[ 0 ];

    scene.player.rover.blocklyStarted = ( function( ) {
        this.broadcastEvent( 'mannyBlocklyStarted', '' );
    } ).bind( this );
    scene.player.rover2.blocklyStarted = ( function( ) {
        this.broadcastEvent( 'perryBlocklyStarted', '' );
    } ).bind( this );
    scene.player.rover3.blocklyStarted = ( function( ) {
        this.broadcastEvent( 'rosieBlocklyStarted', '');
    } ).bind( this );

    scene.blocklyContentChanged = ( function( ) {
        this.broadcastEvent( 'blocklyContentChanged', '' );
    } ).bind( this );

}

this.broadcastEvent = function( event, value ) {
    var params = [ event, value ];
    this.createRequest ( 'logEvent', params );
}

this.logPlayerInfo = function( name ) {
    this.createRequest ( 'logPlayerInfo', [ name ] );
    this.createRequest ( 'logPlayerInfo' );
}

this.createRequest = function( type, params ) {
    
    var scene = this.find( "/" )[ 0 ];
    
    var pathArray = window.location.pathname.split( '/' );

    //var playerId = scene.playerId;
    var version = scene.version;
    var vwfSession = pathArray[ pathArray.length-2 ];
    var playerId = vwfSession;
    var playerName = scene.playerName;
    console.log('scenename:'+playerName);
    var playerSaltedName = '436zpym' + scene.playerName + 'df53cat';
    var playerHashedName = playerSaltedName.hashLarge();
    scene.playerHashedName = playerHashedName;
    
    if ( type === 'logEvent' ) {
        if ( !params || ( params.length !== 2 ) ) {
            self.logger.warnx( "createRequest", "The logEvent request takes 2 parameters:" +
                               " an event name and a value associated with the event." );
        }
        var event = params[ 0 ];
        var value = params[ 1 ];
        var scenarioTime = scene.activeScenarioTime;
        var scenario = scene.activeScenarioPath;

        var xhr = new XMLHttpRequest();
        xhr.open( "POST", this.logEventUrl, true );
        xhr.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );
        xhr.send("vwf_session=" + vwfSession + "&player_id=" + playerId + "&action=" + 
                event + "$&value="+value+"$&version="+version+"$&scenarioTime="+scenarioTime+"$&scenario="+scenario);
        
    } else if ( type === 'logPlayerInfo' ) {

        var scenarioTime = scene.activeScenarioTime;
        var scenario = scene.activeScenarioPath;

        if ( params ) {
            playerName = params;
            console.log('paramsname:'+playerName);
            playerSaltedName = '436zpym' + playerName + 'df53cat';
            playerHashedName = playerSaltedName.hashLarge();
            scene.playerHashedName = playerHashedName;
        }
          

        var xhr = new XMLHttpRequest();
        xhr.open( "POST", this.logAssentUrl, true );
        xhr.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );
        xhr.send("vwf_session=" + vwfSession + "&student_name=" + playerName + "&student_hash=" + playerHashedName + "$&version="+version+"$&scenarioTime="+scenarioTime+"$&scenario="+scenario);
        
        var xhr2 = new XMLHttpRequest();
        xhr2.open( "POST", this.logPlayerHashUrl, true );
        xhr2.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );
        xhr2.send("vwf_session=" + vwfSession + "&student_name=" + playerName + "&student_hash=" + playerHashedName + "$&version="+version+"$&scenarioTime="+scenarioTime+"$&scenario="+scenario);
        
    }
}

this.getRequest = function( type, params ) {
    var scene = this.find( "/" )[ 0 ];
    
    var playerId = scene.playerId;
    var version = scene.version;
    
    var pathArray = window.location.pathname.split( '/' );
    var vwfSession = pathArray[ pathArray.length-2 ];
    
    var xhr = new XMLHttpRequest();
    
    if ( type == 'getPlayerState' ) {
        if ( params && ( params.length > 0 ) ) {
            self.logger.warnx( "getRequest", "The getPlayerState request takes no parameters." );
        }
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if ( xhr.readyState === 4 && xhr.status === 200 ) {
                var scenarioName = xhr.responseText;
                if ( scenarioName.lastIndexOf( "$" ) === scenarioName.length - 1 ) {
                    scenarioName = scenarioName.substr( 0, scenarioName.length - 1 );
                }
                scene.progressFound( ( scene[ scenarioName ] && scenarioName !== "mainMenuScenario" ), scenarioName );
                return xhr.responseText;
            }
        }
        
        xhr.open( "POST", this.getPlayerStateUrl, true );
        xhr.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );
        xhr.send( "player_id="+playerId );
    }
    
}

String.prototype.hashLarge = function() {
  var self = this, range = Array(this.length);
  for(var i = 0; i < this.length; i++) {
    range[i] = i;
  }
  return Array.prototype.reduce.call(range, function(sum, i) {
    return sum + self.charCodeAt(i);
  }, 0).toString(16);
}

//@ sourceURL=source/instrumentationManager.js