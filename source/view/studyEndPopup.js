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

endPopupDOM.onclick = hideendPopup;

function showStudyEndPopup() {

    endPopupDOM.style.display = "block";
}

function hideStudyEndPopup() {

    endPopupDOM.style.display = "none";
    vwf_view.kernel.fireEvent( "endPopupClosed" );
}

function setEndPopupInfo( title, content, imageSrc ) {

    endPopupTitle.innerHTML = title;
    endPopupContent.innerHTML = content;
    // TODO: Allow each brief to display it's own image to the left of the brief content.
    // imageSrc = imageSrc || defaultImage;
    // endPopupImage.style.backgroundImage = "url(\"" + imageSrc + "\")";
}

//@ sourceURL=source/view/studyEndPopup.js