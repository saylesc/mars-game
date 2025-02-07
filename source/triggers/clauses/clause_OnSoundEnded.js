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

this.onGenerated = function( params, generator, payload ) {
    if ( !params || ( params.length < 1 ) || params.length > 2 ) {
        this.logger.errorx( "onGenerated", 
                            "This clause takes one required argument: " +
                            "the name of the sound to stop. In addition, it " +
                            "can take an optional timeout threshold.");
        return false;
    }

    if ( !this.initOnEvent( params, generator, payload, params[ 1 ] ) ) {
        return false;
    }

    this.soundName = params[ 0 ];
    var soundMgr = this.scene.soundManager;

    soundMgr.soundFinished = this.events.add( function() { this.onEndedEvent(); }, this );
    return true;
}

this.onEndedEvent = function( soundName ) {
    if ( this.soundName === soundName ) {
        this.onEvent();
    }
}


//@ sourceURL=source/triggers/clauses/clause_OnSoundEnded.js
