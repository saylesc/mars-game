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
    if ( !this.initAction( params, generator, payload ) ) {
        return false;
    }

    if ( !params || ( params.length !== 1 ) ) {
        this.logger.errorx( "onGenerated", 
                            "This action takes one argument: the path of " +
                            "the object to be added" );
        return false;
    }

    this.objectName = params[ 0 ];

    return true;
}

this.executeAction = function() {
    var object = this.findInScene( this.objectName );
    var scenario = this.scenario;
    var soundMgr = this.scene.soundManager;

    this.assert( object, "Object not found!" );
    this.assert( scenario, "Scenario not found!" );
    this.assert( soundMgr, "Sound manager not found!" );

    if ( object && scenario && soundMgr ) {
        object.construct();
        if ( object.deploySound ) {
            soundMgr.future(1).playSound( object.deploySound );
        }
        if ( object.soundOnComplete ) {
            soundMgr.future( object.buildDuration ).playSound( object.soundOnComplete );
        }
    }
}

//@ sourceURL=source/triggers/actions/action_buildBaseComponent.js
