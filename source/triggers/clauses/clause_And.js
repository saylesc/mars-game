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
    this.children.create( "clauses", "http://vwf.example.com/node.vwf" );
}

this.onGenerated = function( params, generator, payload ) {
    if ( !params || ( params.length < 1 ) ) {
        this.logger.errorx( "onGenerated", "This clause needs to have at " +
                            " least one (and ideally two or more) clauses " +
                            " inside of it." );
        return false;
    } else if ( params.length < 2 ) {
        this.logger.warnx( "onGenerated", "This clause probably ought to " +
                           "have two or more clauses inside of it." );
    }

    if ( !this.initClause( params, generator, payload ) ) {
        return false;
    }

    for ( var i = 0; i < params.length; ++i ) {
        generator.generateObject( params[ i ], this.clauses, payload );
    }

    return true;
}

this.evaluateClause = function() {
    for ( var i = 0; i < this.clauses.children.length; ++i ) {
        if ( !this.clauses.children[ i ].evaluateClause() ) { 
            return false;
        }
    }

    return true;
}

//@ sourceURL=source/triggers/clauses/clause_And.js
