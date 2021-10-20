noseX = 0;
noseY = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
difference = 0;
shape = "";
text_name = "";
font_family = "";
let kust;
let prakrta;
let creepster;
let bungee;
let zcool;

function preload() {
    kust = loadFont('./kust.otf', submit);
    prakrta = loadFont('./prakrta_.ttf');
    creepster = loadFont('./Creepster-Regular.ttf');
    bungee = loadFont('./Bungee-Regular.ttf');
    zcool = loadFont('./ZCOOLKuaiLe-Regular.ttf');
  }

function setup(){
    video = createCapture(VIDEO);
    video.size(550, 500);
    video.parent("app");
    canvas = createCanvas(550, 400);
    canvas.position(600, 300);
    canvas.parent("app");
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is loaded....");
}

function gotPoses(results){
    if (results.length > 0){
        //console.log(results);
        noseX = (results[0].pose.nose.x)-150;
        noseY = (results[0].pose.nose.y)-100;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        difference = floor(leftWristX - rightWristX);
    }
}

function draw(){
    background("e62595");
    fill("#fc033d");
    textFont(prakrta);
    if (font_family == "Bungee"){
        textFont(bungee);
    } else if (font_family == "Prakrta"){
        textFont(prakrta);
    } else if (font_family == "ZCOOL KuaiLe"){
        textFont(zcool);
        console.log("zcool");
    } else if (font_family == "Creepster"){
        textFont(creepster);
    } else if (font_family == "Kust"){
        textFont(kust);
    }
    textSize(difference);
    if (text_name == ""){
        text('#font.io', noseX, noseY);
    } else {
        text(text_name, noseX, noseY);
    }
}

function submit(){
    text_name = document.getElementById("name_input").value;
    var e = document.getElementById("font");
    font_family = e.options[e.selectedIndex].text;
    console.log(font_family);
}