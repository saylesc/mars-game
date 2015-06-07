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
var startPopupContentText = document.getElementById( "ssp_contenttext" );
var startPopupScroll = document.getElementById( "ssp_scroll" );
var startPopupTextInput = document.getElementById( "ssp_name" );
var startPopupImage = document.getElementById( "ssp_image" );
var startPopupButton = document.getElementById( "ssp_continue" );

var defaultImage = "../../assets/images/briefBG.png";
var agreementPage = 1;

startPopupButton.onclick = advancePopup;

function showStudyStartPopup() {

    startPopupDOM.style.display = "block";
}

function hideStudyStartPopup() {

    startPopupDOM.style.display = "none";
    vwf_view.kernel.fireEvent( "startPopupClosed" );
}

function advancePopup() {
    if ( agreementPage === 1 ) {
        agreementPage = 2;
        startPopupTextInput.style.display = "block";
        startPopupScroll.style.display = "block";
        setScrollContent( 2 );
        setContent( 2 );
        startPopupButton.innerHTML = 'I agree and have signed.';
    } else if ( agreementPage === 2 ){
        startPopupTextInput.style.display = "none";
        startPopupScroll.style.display = "none";
        agreementPage = 3;
        setContent( 3 );
        startPopupButton.innerHTML = 'Got it - let me play!';
    } else {
        agreementPage = 1;
        setContent( 1 );
        startPopupDOM.style.display = "none";
        startPopupTextInput.style.display = "none";
        startPopupScroll.style.display = "inherit";
        vwf_view.kernel.fireEvent( "startPopupClosed" );
        setScrollContent( 1 );
        startPopupButton.innerHTML = 'Ok I showed my parents.';
    }
}

function setScrollContent( page ) {
    if ( page === 1 ) {
        startPopupScroll.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum erat quis tellus ornare, id maximus sem pulvinar. Phasellus id velit vitae magna efficitur tristique. Proin sollicitudin mi facilisis congue placerat. Donec condimentum tristique lorem, ac dictum risus volutpat ac. Suspendisse sagittis finibus pharetra. Nullam nec eleifend lectus, nec tincidunt risus. Praesent lacinia placerat leo, sed blandit tortor suscipit quis. Sed luctus, nibh nec feugiat facilisis, nulla enim maximus nunc, non commodo enim risus ut enim. Etiam lorem nunc, fermentum vitae porttitor vitae, dictum ac odio. Nam volutpat enim urna, quis egestas dolor sagittis non. Suspendisse lobortis, enim euismod pretium gravida, neque erat ullamcorper ipsum, nec condimentum lectus justo id arcu. Mauris vitae consequat sapien, ac feugiat purus. Mauris vitae fringilla quam, eu facilisis nunc. In hac habitasse platea dictumst. Pellentesque venenatis mauris nec varius porttitor. Aliquam vel libero at velit laoreet fringilla nec ut sem. Aliquam vehicula erat augue, ac placerat mauris dignissim sit amet. Vestibulum consequat gravida diam, a maximus massa posuere nec. Nullam urna ante, aliquet in aliquet sit amet, ultricies quis nisi.';
    } else {
        startPopupScroll.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum erat quis tellus ornare, id maximus sem pulvinar. Phasellus id velit vitae magna efficitur tristique. Proin sollicitudin mi facilisis congue placerat. Donec condimentum tristique lorem, ac dictum risus volutpat ac. Suspendisse sagittis finibus pharetra. Nullam nec eleifend lectus, nec tincidunt risus. Praesent lacinia placerat leo, sed blandit tortor suscipit quis. Sed luctus, nibh nec feugiat facilisis, nulla enim maximus nunc, non commodo enim risus ut enim. Etiam lorem nunc, fermentum vitae porttitor vitae, dictum ac odio. Nam volutpat enim urna, quis egestas dolor sagittis non. Suspendisse lobortis, enim euismod pretium gravida, neque erat ullamcorper ipsum, nec condimentum lectus justo id arcu. Mauris vitae consequat sapien, ac feugiat purus. Mauris vitae fringilla quam, eu facilisis nunc. In hac habitasse platea dictumst. Pellentesque venenatis mauris nec varius porttitor. Aliquam vel libero at velit laoreet fringilla nec ut sem. Aliquam vehicula erat augue, ac placerat mauris dignissim sit amet. Vestibulum consequat gravida diam, a maximus massa posuere nec. Nullam urna ante, aliquet in aliquet sit amet, ultricies quis nisi.';
    }
}

function setContent( page ) {
    if ( page === 1 ) {
        startPopupContentText.innerHTML = 'Hello! Thanks for checking out Mars Game! Before you play we’ll need your parent/guardian to read the text below and then we’ll need you to read/electronically sign an assent form on the next page. Please get your parent/guardian now, have them read the text below and then hit the ‘next’ button.';
    } else if (page === 2 ) {
        startPopupContentText.innerHTML = 'Now, student/player, please read the text below in full. If you, the player, agree to the below and acknowledge you had your parent/guardian read the previous page, please type your full first and last name into the field below and hit submit.';
    } else {
        startPopupContentText.innerHTML = 'Thanks! Almost ready to play! When you’re done playing, instead of closing your browser window, be on the lookout for the big “Done Playing” button. We’d really appreciate your feedback and have prizes available for completing some simple survey questions about your play experience.';
    }
}

//@ sourceURL=source/view/studyStartPopup.js