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

var endPopupDOM = document.getElementById( "sep_screen" );
var endPopupTitle = document.getElementById( "sep_title" );
var endPopupContent = document.getElementById( "sep_content" );
var endPopupImage = document.getElementById( "sep_image" );
var defaultImage = "../../assets/images/briefBG.png";

endPopupDOM.onclick = hideStudyEndPopup;

this.initialize = function() {

} 

function showStudyEndPopup() {

    var pathArray = window.location.pathname.split( '/' );

    var appID = vwf_view.kernel.application();
    //var playerId = scene.playerId;
    var version = vwf_view.kernel.getProperty( vwf_view.kernel.application(), 'version' );

    console.log(appID);
    console.log(version);
    var playerHashedName = vwf.getProperty( vwf_view.kernel.application(), 'playerHashedName' );
    console.log(playerHashedName);
    var vwfSession = pathArray[ pathArray.length-2 ];

    var url = 'https://www.surveymonkey.com/s/X3LVQ89?currentVersion='+version+'&hashedID='+playerHashedName+'&sessionID='+vwfSession+'';
    endPopupDOM.style.display = "block";
    endPopupContent.innerHTML = '<p>Thank you for playing our game! Please note you can return and take the survey below at any time.</p>' + 
    '<p><a href="'+url+'" target="_blank">COMPLETE SURVEY NOW!</a></p>';
}

function hideStudyEndPopup() {

    var appID = vwf_view.kernel.application();
    endPopupDOM.style.display = "none";
    vwf_view.kernel.fireEvent( appID, "endPopupClosed" );
}

function setEndPopupInfo( title, content, imageSrc ) {

    endPopupTitle.innerHTML = 'Thanks for playing!';
    endPopupContent.innerHTML = '';
    // TODO: Allow each brief to display it's own image to the left of the brief content.
    // imageSrc = imageSrc || defaultImage;
    // endPopupImage.style.backgroundImage = "url(\"" + imageSrc + "\")";
}

//@ sourceURL=source/view/studyEndPopup.js