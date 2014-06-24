var self;

this.initialize = function() {
    self = this;

    self.functionSets = [];
    self.addFunctionSet(self.actionSet);
}

this.actionSet.scenarioSuccess = function( params, context ) {
    if ( params && ( params.length > 1 ) ) {
        self.logger.warnx( "scenarioSuccess", "This action takes one optional argument: a message to display." );
        return undefined;
    }

    var message = params ? params[ 0 ] : undefined;

    return function() {
        var scenario = getScenario( context );
        scenario && scenario.completed( message );
    }
}

this.actionSet.scenarioFailure = function( params, context ) {
    if ( params && ( params.length > 2 ) ) {
        self.logger.warnx( "scenarioFailure", "This action takes two optional arguments: " +
                            "the type of failure, and a message to display." );
        return undefined;
    }

    var type = params[ 0 ];
    var message = params ? params[ 1 ] : undefined;

    return function() {
        var scenario = getScenario( context );
        scenario && scenario.failed( type, message );
    }
}

this.actionSet.playSound = function( params, context ) {
    if ( !params || ( params.length !== 1 ) ) {
        self.logger.warnx( "playSound", "We need to know the name of the sound to play!" );
        return undefined;
    }

    var soundName = params[ 0 ];
    var soundMgr = getSoundMgr( context );
    
    if ( soundMgr ) {
        return function() {
            // NOTE: I deliberately don't check if the sound is ready.  That 
            //  way, I'll get errors if it's not.
            soundMgr.playSound( soundName );
        };
    } else {
        return undefined;
    }
}

this.actionSet.stopSound = function( params, context ) {
    if ( !params || ( params.length !== 1 ) ) {
        self.logger.warnx( "stopSound", "We need to know the name of the sound to stop!" );
        return undefined;
    }

    var soundName = params[ 0 ];
    var soundMgr = getSoundMgr( context );

    if ( soundMgr ) {
        return function() { soundMgr.stopSoundInstance( soundName ); };
    } else {
        return undefined;
    }
}

this.actionSet.showCommsDisplay = function( params, context ) {
    if ( !params || ( params.length !== 1 ) ) {
        self.logger.warnx( "activateCommDisplay", "We need to know the path of the image to display!" );
    }

    var imagePath = params[ 0 ];
    var scenario = getScenario();

    return function() {
        scenario.showComms( imagePath );
    }
}

this.actionSet.hideCommsDisplay = function( params, context ) {
    if ( params && ( params.length !== 0 ) ) {
        self.logger.warnx( "activateCommDisplay", "This action does not take any parameters." );
    }

    var scenario = getScenario();

    return function() {
        scenario.hideComms();
    }
}

this.actionSet.delay = function( params, context ) {
    if ( params && ( params.length < 2 ) ) {
        self.logger.errorx( "delay", "This action takes two parameters: delay and action(s).");
        return undefined;
    }

    var delay = params[ 0 ];
    if ( delay <= 0 ) {
        self.logger.errorx( "delay", "The delay must be positive." );
        return undefined;
    }

    var actions = [];
    for (var i = 1; i < params.length; ++i ) {
        var action = self.executeFunction( params[ i ], context );
        actions.push( action );
    }

    if ( actions.length === 0 ) {
        return undefined;
    }

    return function() {
        for ( var i = 0; i < actions.length; ++i ) {
            setTimeout( actions[ i ], delay );
        }
    }
}


this.actionSet.writeToBlackboard = function( params, context ) {

    if ( params && ( params.length < 1 ) ) {
        self.logger.errorx( "writeToBlackboard", "This action takes one parameter: variable name.");
        return undefined;
    }

    var blackboard = context.sceneBlackboard;

    return function() {
        blackboard[ params[ 0 ] ] = 1;
    }

}

this.actionSet.incrementBlackboardValue = function( params, context ) {

    if ( params && ( params.length < 1 ) ) {
        self.logger.errorx( "incrementBlackboardValue", "This action takes one parameter: variable name.");
        return undefined;
    }

    var blackboard = context.sceneBlackboard;

    return function() {
        if ( !blackboard[ params[ 0 ] ] ){
            blackboard[ params[ 0 ] ] = 1;
        } else {
            blackboard[ params[ 0 ] ] = blackboard[ params[ 0 ] ] + 1;
        }
        
    }

}



this.actionSet.waitForNode = function ( params, context ) {
    if ( params && ( params.length < 2 ) ) {
        self.logger.errorx( "waitForNode", "This action takes two parameters: The name " +
                            "of the node to wait for and action(s).");
        return undefined;
    }

    var nodeName = params[ 0 ];
    var actions = [];
    for (var i = 1; i < params.length; ++i ) {
        var action = self.executeFunction( params[ i ], context );
        actions.push( action );
    }

    if ( actions.length === 0 ) {
        return undefined;
    }

    var callBack = function() {
        var node = context.find( "//" + nodeName )[ 0 ];

        if ( node ) {
            for ( var i = 0; i < actions.length; ++i ) {
                actions[ i ]();
            }
        } else {
            setTimeout( callBack, 0.1 );
        }
    }

    return callBack;
}

this.actionSet.blinkHUDElement = function( params, context ) {
    if ( params && params.length > 1 ) {
        self.logger.errorx( "blinkHUDElement", "This action takes one parameter: HUD element ID.");
        return undefined;
    }

    var elementID = params[ 0 ];
    return function() {
        context.blinkHUD( elementID );
    }
}

this.actionSet.stopBlinkHUDElement = function( params, context ) {
    if ( params && params.length > 1 ) {
        self.logger.errorx( "stopBlinkHUDElement", "This action takes one parameter: HUD element ID.");
        return undefined;
    }

    var elementID = params[ 0 ];
    return function() {
        context.stopBlinkHUD( elementID );
    }
}

this.actionSet.blinkBlocklyTab = function( params, context ) {
    if ( params && params.length > 1 ) {
        self.logger.errorx( "blinkBlocklyTab", "This action takes one parameter: The name of the " +
                            "blockly node associated with the tab.");
        return undefined;
    }

    var objectName = params[ 0 ];
    
    return function() {
        var object = context.find( "//" + objectName  )[ 0 ];
        context.blinkTab( object.id );
    }
}

this.actionSet.stopBlinkBlocklyTab = function( params, context ) {
    if ( params && params.length > 1 ) {
        self.logger.errorx( "stopBlinkBlocklyTab", "This action takes one parameter: The name of the " +
                            "blockly node associated with the tab.");
        return undefined;
    }

    var objectName = params[ 0 ];
    
    return function() {
        var object = context.find( "//" + objectName  )[ 0 ];
        context.stopBlinkTab( object.id );
    }
}

function getScenario( context ) {
    if ( context.getCurrentScenario ){
        return context.getCurrentScenario();
    } else {
        self.logger.errorx( "getScenario", "context does not have a getCurrentScenario " +
                            "method." );
        return undefined;
    }
}

function getSoundMgr( context ) {
    return self.findTypeInContext( context, "http://vwf.example.com/sound/soundManager.vwf" );
}



//@ sourceURL=source/triggers/actionFactory.js
