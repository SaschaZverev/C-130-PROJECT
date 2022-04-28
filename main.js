song_1 = "";
song_2 = "";
leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = ""; 
scoreLeftWrist = 0;
scoreRightWrist = 0;
song_status = "";
song_status_2 = "";

function preload()
{
    song_1 = loadSound("m1.mp3");
    song_2 = loadSound("m2.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.position(300,200);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet is Intialized !");
}

function draw()
{
    image(video ,0 ,0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    song_status = song_1.isPlaying();

    if(scoreLeftWrist > 0.1)
    {
        circle(leftWristX, leftWristY, 20);
        song_2.stop();
        
        if(song_status == false)
        {
            song_1.play();
            document.getElementById("song_name").innerHTML = "Song = music_1";
        }
    }    
    song_status = song_2.isPlaying();

    if(scoreRightWrist > 0.1)
    {
        circle(rightWristX, rightWristYs, 20);
        song_1.stop();

        if(song_status_2 == false)
        {
            song_2.play();
            document.getElementById("song_name").innerHTML = "Song = music_2";
        }
    }
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

function play()
{
    song.play();
    song.setVolume(0.8);
    song.setRate(1);
}