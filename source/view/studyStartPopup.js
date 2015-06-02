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

var startPopupDOM = document.getElementById( "ssp_screen" );
var startPopupTitle = document.getElementById( "ssp_title" );
var startPopupContent = document.getElementById( "ssp_content" );
var startPopupImage = document.getElementById( "ssp_image" );
var defaultImage = "../../assets/images/briefBG.png";

startPopupDOM.onclick = hidestartPopup;

function showStudyStartPopup() {

    startPopupDOM.style.display = "block";
}

function hideStudyStartPopup() {

    startPopupDOM.style.display = "none";
    vwf_view.kernel.fireEvent( "startPopupClosed" );
}

function setStartPopupInfo( title, content, imageSrc ) {

    startPopupTitle.innerHTML = title;
    startPopupContent.innerHTML = content;
    // TODO: Allow each brief to display it's own image to the left of the brief content.
    // imageSrc = imageSrc || defaultImage;
    // startPopupImage.style.backgroundImage = "url(\"" + imageSrc + "\")";
}

//@ sourceURL=source/view/studyStartPopup.js