"use strict";

//HOME AREA
$( document ).ready(function() {
  //set user input
  $("#submitBtn").on("click", storeUserName);
  $("#resetBtn").on("click", clearUserName);
  
  displayUserName();
});

function storeUserName(){
  //take in user input  
  let userName = document.getElementById("greeting").value;
  localStorage.setItem("greeting", userName);

  displayUserName();
};

function clearUserName(){
  //if user input in localstorage: get it, remove it and then prompt user input and hide personalized message.
  if(localStorage !== null){
    if(localStorage.getItem("greeting")){
      localStorage.removeItem("greeting");
    }
  }
  $("#nameInput").show();
  $("#personalGreeting").hide();
};

//load data from local storage and update screen accordingly
function displayUserName(){
  let localUser = localStorage.getItem("greeting");
  if(localStorage.getItem("greeting")){
    $("#personalGreeting>section").html("Nice to meet you, " + localUser);
    $("#personalGreeting").show();
    $("#nameInput").hide();
    
  }
};



//WORK PAGE
//activate accordion
$( function() {
  $( "#accordion" ).accordion({
    animate: 200,
    collapsible:true,
    active:false
  });
  //force click so that clicking on the picture on the home page will find the anchor on the work details accordion.
  $(location.hash).trigger("click");
});


$("#myBtn").on("click", function(){topFunction()});

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}




//RESUME PAGE

//get json from mock server and add to html
$.get("https://baf2fcde-bca5-4a71-a7bc-d8d1c39e3842.mock.pstmn.io/resume.json", function(data){
  
  // Profile and Contact Info
  $("#column1").append("<section id='basicsSection'></section>");
  $("#basicsSection").append(
    build("Profile &amp; Contact","h2")+"<br />"+
    build(data.basics.name, "h4")+
    build(data.basics.label, "p")+	
    build(data.basics.email, "p")+
    build(data.basics.phone, "p")
    );
  for(let i = 0; i < data.basics.profiles.length; i++){
      $("#basicsSection").append("<section id='basicsProfiles'></section>");
      $("#basicsProfiles").append(
        build(data.basics.profiles[i].network,"h4")+
        build(data.basics.profiles[i].url,"p")
      );
    };

  //Work Experience
  $("#column1").append("<section id='workSection'></section>");
  $("#workSection").append(
    build("Work", "h2")
  );
  for(let i = 0; i < data.work.length; i++){
    $("#workSection").append(
      build(data.work[i].company, "h3")+
      build(data.work[i].position, "h4")+
      build(data.work[i].startDate, "span")+"-"+
      build(data.work[i].endDate,"span")+
      build(data.work[i].summary, "p")
    );
  };

  //Education
  $("#column2").append("<section id='eduSection'></section>");
  $("#eduSection").append(
    build("Education", "h2")
  );
  for(let i = 0; i < data.education.length; i++){
    $("#eduSection").append(
      build(data.education[i].institution, "h3")+
      build(data.education[i].area, "h4")+
      build(data.education[i].studyType, "p")
    );
  };

  //Skills
  $("#column2").append("<section id='skillsSection'></section>");
  $("#skillsSection").append(
    build("Skills","h2")+"<br />"
  );
  for(let i = 0; i < data.skills.length; i++){
    $("#skillsSection").append(
      build(data.skills[i].name,"h4"),
      build(data.skills[i].keywords, "p")
    );
  };

  //Activities
  $("#column2").append("<section id='activitiesSection'></section>");
  $("#activitiesSection").append(
    build("Activities", "h2")
  );
  for(let i = 0; i < data.activities.length; i++){
    $("#activitiesSection").append(
      build(data.activities[i].name, "h3"),
      build(data.activities[i].keywords, "p")
    );
  };
  


//Error message if issue with mock server
}, "json").fail(function(jqXHR){
  $("#resume").append("<section>There was an error while trying to contact the server</section>");
});


//Makes it easier to concatenate html tags to JSON
function build(content, tag){
  return "<"+tag+">"+content+"</"+tag+">";
}

