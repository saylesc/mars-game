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

var playingVideo;
var supportedFormats = [".webm", ".mp4"];
var mediaManagerName = "mediaManager";

//TODO: Make document.onkeypress go to another function, which loops 
//over all jPlayer instances and hides them. 
//We can do this by looping over all children of mediaManager

//(Commented out for now)
//document.onkeypress = removeVideoOnEvent;

//TODO: Rename "videoManager" to "videoManagerName"
function playVideo( src, videoManager ) {
    if ( src ) {
        playingVideo = src;
        var videoManagerID = vwf_view.kernel.find( "", "//" + videoManager )[ 0 ];
        vwf_view.kernel.callMethod( videoManagerID, "show" );

        var videoURLBase = "assets/video/" + src;

        var redactedURLBase = ( videoURLBase ).replace( new RegExp("/(.*)/.*/assets" ), 
            function( str, group1 ){ 
                return group1 + "/assets" 
            } );
        
        var fileList = [];
        for( var i = 0; i < supportedFormats.length; i++ ){
            fileList.push( redactedURLBase + supportedFormats[i] );
        }
        vwf_view.kernel.setProperty( videoManagerID, "url", fileList );
        vwf_view.kernel.callMethod( videoManagerID, "play" );
    }
}

function removeAllVideos( event ){ 
    //TODO: Look at children of mediaManager, and remove each of them. 
    var videoInstanceIDList = vwf_view.kernel.find( "", "//" + mediaManagerName );   
    for ( var i = 0; i < videoInstanceIDList.length; i++ ) {
        var videoManagerID = videoInstanceIDList[ i ]; 
          
    }
}

function removeVideoOnEvent( videoManagerName ) {
    if ( !playingVideo ) {
        return;
    }
    
    // 32 = space bar character code
    if ( event && event.type === "keypress" && event.which !== 32 ) {
        return;
    }
    //var videoManagerID = vwf_view.kernel.find( "", "//videoManager" )[ 0 ];
    var videoManagerID = vwf_view.kernel.find( "", "//" + videoManagerName )[ 0 ];
    vwf_view.kernel.callMethod( videoManagerID, "clearMedia" );

    if( playingVideo ){
        vwf_view.kernel.fireEvent( vwf_view.kernel.application(), "videoPlayed", [ playingVideo ] );
        //TODO: This needs to be generalized such that it is per-video instance.
        playingVideo = undefined;
    }
}

function removeVideo( videoManagerName ) {
    //var videoManagerID = vwf_view.kernel.find( "", "//videoManager" )[ 0 ];
    //vwf_view.kernel.callMethod( videoManagerID, "hide" );
    if( videoManagerName ) {
        var videoManagerID = vwf_view.kernel.find( "", "//" + videoManagerName )[ 0 ];
        vwf_view.kernel.callMethod( videoManagerID, "hide" );
    } else {
        console.log("Removing nonexistent video!");
    }
}

//@ sourceURL=source/videoController.js
