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
var appID = vwf_view.kernel.application();
startPopupButton.onclick = advancePopup;

$("#ssp_name").bind('keyup', function(event){ 
  if(event.keyCode == 13){ 
    event.preventDefault();
    //$("#buttonSrch").click(); 

    advancePopup();
  }
});

function showStudyStartPopup() {

    startPopupDOM.style.display = "block";
}

function hideStudyStartPopup() {

    startPopupDOM.style.display = "none";
    vwf_view.kernel.fireEvent( appID, "startPopupClosed" );
}

function advancePopup() {
    if ( agreementPage === 1 ) {
        agreementPage = 2;
        startPopupTextInput.style.display = "block";
        startPopupScroll.style.display = "block";
        setScrollContent( 2 );
        setContent( 2 );
        var name = startPopupTextInput.value;
        vwf_view.kernel.callMethod( appID, "logPlayerInfo", name );
        startPopupButton.innerHTML = 'I agree and have signed!';
    } else if ( agreementPage === 2 ){
        startPopupTextInput.style.display = "none";
        startPopupScroll.style.display = "none";
        agreementPage = 3;
        setContent( 3 );
        startPopupButton.innerHTML = 'Got it - let me play!';
    } else {
        agreementPage = 1;
        setContent( 1 );
        var name = startPopupTextInput.value;
        vwf_view.kernel.setProperty( appID, "playerName", name );
        vwf_view.kernel.setProperty( appID, "playerHashedName", name );
        vwf_view.kernel.callMethod( appID, "logPlayerInfo", name );
        startPopupDOM.style.display = "none";
        startPopupTextInput.style.display = "none";
        startPopupScroll.style.display = "inherit";
        vwf_view.kernel.fireEvent( appID, "startPopupClosed" );

        setScrollContent( 1 );
        startPopupButton.innerHTML = 'Ok I showed my parents.';
    }
}

function setScrollContent( page ) {
    if ( page === 1 ) {
        startPopupScroll.innerHTML = '<p>Parental Passive Consent Letter for Online Study</p>' +
        '<p>Title of Research: True Game Based Solution, Applications for STEM Education Evaluation Study</p>' +
'<p>Funding Agency/Sponsor:  Department of Defense, Advanced Distributed Learning (ADL) Colab</p>' +
'<p>Study Investigators: Dr. Freeman (Principal Investigator), Dr. Oden (Researcher)</p>' +
'<p>What is the purpose of the research? We are studying whether a new web-based educational game, called True Game,' + 
'is easy to use, engaging, and whether it helps students learn math, programming, and problem-solving skills.' +
'How many children will take part in this study? Up to 8,600 ninth- and tenth-grade students nationwide.' +
'What is my child’s involvement for taking part in this study? Your child will be asked to participate in an evaluation ' +
'of an educational game, called True Game. Your child will be asked to answer a few demographic and background questions ' +
'for example, what grade he or she is in and if he or she likes math. The survey takes approximately 5 minutes to complete.' + 
    'Your child will then play the True Game for as long as he or she wishes to participate. When your child exits the game,' +
    ' we will ask a few more questions about his or her experience playing the game and about the game itself. ' +
     'Your child is helping us develop a new educational game and test results are being used only for research purposes. ' +
     'Your child is not required to take these tests or answer any of these questions asked. </p>' +
'<p><p>For how long is my child expected to be in this study, and how much of my child’s time is required?</p> <p>' +
'The study will take place during the months of March to September. The amount of time your child chooses to ' +
'spend on the educational game is up to him or her.' +
'<p><p>What are the risks of taking part in this study and how will they be minimized? <p> Risks are minimal, however, ' +
'your child may feel some anxiety about participating, and to try to lessen that stress the researchers will ' +
'let your child know that they are not being graded, but rather they are helping us with our research. Your ' +
'child will receive a letter of assent to this study and will be informed that his or her participation is ' +
'voluntary and he or she can stop at any time without consequences. Your child also will be informed that ' +
'they may speak with the researchers or teacher, if they wish to stop and will be provided with phone numbers ' +
'and emails if you have any concerns.</p>' +
'<p>What are the benefits for taking part in the study? Your child will get extra practice in math, programming, ' +
'and problem solving and may find being part of this study to be a learning experience. The information ' +
'gathered will be used to improve True Game and to contribute to research in online games and education. ' +
'This could benefit other students like your child and teachers who may use True Game in the future.' +
'Will my child be compensated for taking part in the study? Prizes such as gift cards will be awarded ' +
'randomly to participants.</p>' +
'<p>What is an alternate procedure(s) that I can choose instead of having my child take part in this study? </p>' +
'<p><p>Participation is purely voluntary, on your child’s own time.</p>' +
'<p>Will the sessions be recorded? No, your child will not be recorded.' + 
'Will data be collected about my child? Data will be collected from the True Game program logs, including the' + 
'number of minutes that students are logged into the game and the various parts of the game they used. Data ' +
'will not be associated with any individual student. ' +
'How will my child’s confidentiality be protected? We will not ask for your child’s name. Your child will ' +
'have a special ID for the survey and data will not be associated with any individual student. Once analyzed,' + 
'the data will be published in educational journals and presented at national conferences, but these data ' +
'will be presented in the absence of any identifying student or school information. You may request a copy' +
' of all publications and presentations.' +

'Is my child’s participation voluntary? Yes. ' +
'Can my child stop taking part in this research? Yes, either before or during the study without any penalty.' +
'What are the procedures for withdrawal? Your child may simply stop playing. Alternatively, you or your child ' +
'may inform the principal or Dr. Barbara Freeman, Principal Investigator, at 970-379-4234 or ' +
'barbarafreeman1@comcast.net or Leslye Arsht, Principal StandardsWork, at (703) 525-9317.' +
'Will I be given a copy of the permission document to keep? Yes, it will be available online and you can ' +
'print a hard copy or request a copy from the researchers for your records.' +

'Will I be able to view surveys, assessments, and instructional materials used in this research? Yes.' +
'Who should I contact if I have questions regarding the study? Please contact Barbara Freeman with any ' +
'questions at 970-379-4234 or barbarafreeman1@comcast.net. ' +
'Who should I contact if I have concerns regarding my child’s rights as a study participant?' +
'Ethical & Independent (E&I) Review Services, an Institutional Review Board who reviewed the study for ' +
'subject safety, by phone 800-472-3241 or by email at subject@eandireview.com' +

'Parent please be aware that under the Protection of Pupil Rights Act. 20 U.S.C. Section 1232 (c)(1)(A),' + 
'you have the right to review a copy of the questions asked of or materials that will be used with ' +
'your students. If you would like to do so, you should contact, Dr. Freeman at (970) 379-4234.';
startPopupScroll.scrollTop = 0;
    } else {
        startPopupScroll.innerHTML = 'Student Assent Letter for Online Study' +
'STUDENT’S PERMISSION TO PARTICIPATE IN RESEARCH' +
'Title of Research: True Game Based Solution, Applications for STEM Education Evaluation Study' +
'Funding Agency/Sponsor: Department of Defense, Advanced Distributed Learning (ADL) Colab' +
'Study Investigators: Dr. Freeman (Principal Investigator), Dr. Oden (Researcher)' +
'What is the purpose of the research? We are studying whether a new web-based educational game, called True Game, ' +
'is easy to use, fun to use, and whether it helps you learn math, programming and problem-solving. You are ' +
'helping us study the online game. If many students find the game hard to use, we will probably make changes to the game.' +
'How many children will take part in this study? Up to 8,600 ninth- and tenth-grade students nationwide.' +
'What do I need to do? You will be asked to participate in a study of an educational game called True Game.' + 
'If you choose to participate, you will sign-in to the True Game website. You will be asked to answer a few ' +
'demographic and background questions about yourself for example, what grade are you in and do you like math. ' +
'The survey takes approximately 5 minutes to complete. You will then play the True Game for as long as ' +
'they wish to participate. When you exit the game, we will ask you a few more questions about your ' +
'experience playing the game and about the game itself. Please know that your answers to the questions ' +
'asked before or after the test do not count. You are helping us develop a new educational game and we ' +
'will only use your results for research purposes. You are not required to answer any of the questions asked.' +
'How long will it take? The study will take place during the months of March to September. The amount ' +
'of time you spend on the game is up to you.' +
'What are my risks? You may feel some anxiety about participating and worry about how well you play or' + 
'answer the questions. But, you are helping us, we are not grading you. If you have any questions you ' +
'can ask now or any time during the session. ' +
'How might I benefit? You will get extra practice in math, programming, and problem solving and may ' +
'find being part of this study to be a learning experience. The information gathered will be used ' +
'to improve True Game and to contribute to research in online games and education. This could ' +
'benefit other students like you and teachers who may use True Game in the future. ' +
'Will I get anything for participating? Prizes such as gift cards will be awarded randomly to participants.' +
'What would I do if I didn’t do this study? Participation is purely voluntary, on your own time.' +
'Will the sessions be recorded? No, you will not be recorded. ' +
'Will data be collected? Data will be collected from the True Game program logs, including ' +
'the number of minutes that students are logged into the game and the various parts of the' +
 'game they used. Data will not be associated with any individual student.' +
'How will my name be used? Or, in other words, how will you keep my information ' +
'confidential? We will not ask for your name. You will have a special ID for the ' +
'survey and we will not know your name and will not be able to tell anyone how you did. ' +
'Do I have to participate? Or, in other words, is my participation voluntary? Your ' +
'participation is voluntary. You do not have to participate. ' +
'Can I stop if I don’t want to do it anymore? In other words, what are the withdrawal ' +
'procedures? You can stop at any time without any consequences. ' +
'Will I get a copy of this letter? Yes, it will be available online and you can print a' +
 'hard copy or request a copy from the researchers.' +
'Who do I talk to if I have questions regarding this study? You can talk to your teacher ' +
'or one of the researchers before, during, or after the session time. Or you can speak with ' +
'me, Barbara Freeman, Principal Investigator, Telephone: (970) 379-4234 or Leslye Arsht, ' +
'Principal StandardsWork at (703) 525-9317.' +
'Who should I contact if I have concerns regarding my rights as a study participant? ' +
'Ethical & Independent (E&I) Review Services, an Institutional Review Board who reviewed ' +
'the study for your safety, by phone at (800) 472-3241 or by email at subject@eandireview.com.' +
'--------------' +
'Your signature below indicates that you have read or been read the information ' +
'provided above, you have received answers to all of your questions and have been ' +
'told who to call if you have any more questions, you have freely decided to ' +
'participate in this research, and you have been told that you are not giving ' +
'up any of your legal rights.';
startPopupScroll.scrollTop = 0;
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