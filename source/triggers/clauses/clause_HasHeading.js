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
    if ( !params || ( params.length !== 2 ) ) {
        this.logger.errorx( "onGenerated", 
                            "This clause requires two arguments: the object " +
                            "and the heading." );
        return false;
    }

    if ( !this.initClause( params, generator, payload ) ) {
        return false;
    }

    this.object = this.findInScene( params[ 0 ] );
    this.targetHeading = params[ 1 ];

    if ( !this.object.moved ) {
        this.logger.errorx( "onGenerated", "'" + params[ 0 ] + "' doesn't " + 
                            "appear to be capable of movement!" );
        return false;
    }
    this.object.moved = this.events.add( function() { this.parentTrigger.checkFire(); }, this );

    return true;
}

this.evaluateClause = function() {
    var retVal = this.object.heading === this.targetHeading;
    return retVal;
}

//@ sourceURL=source/triggers/clauses/clause_HasHeading.js
