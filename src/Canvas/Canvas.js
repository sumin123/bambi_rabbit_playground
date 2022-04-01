import React, { useRef, useEffect } from "react";
import rightImage from "../images/bambi_right.png";
import leftImage from "../images/bambi_left.png";
import mapImage1 from "../images/map1.png";
import mapImage2 from "../images/map2.jpg";
import mapImage3 from "../images/map3.jpg";
import mapImage4 from "../images/map4.jpg";
import mapImage5 from "../images/map5.jpg";
import moveImage9 from "../images/frame_09.png";
import moveImage10 from "../images/frame_10.png";
import moveImage11 from "../images/frame_11.png";
import moveImage12 from "../images/frame_12.png";
import moveImage13 from "../images/frame_13.png";
import moveImage14 from "../images/frame_14.png";
import moveImage15 from "../images/frame_15.png";
import moveImageLeft1 from "../images/frame_09_left.png";
import moveImageLeft2 from "../images/frame_10_left.png";
import moveImageLeft3 from "../images/frame_11_left.png";
import moveImageLeft4 from "../images/frame_12_left.png";
import moveImageLeft5 from "../images/frame_13_left.png";
import moveImageLeft6 from "../images/frame_14_left.png";
import moveImageLeft7 from "../images/frame_15_left.png";

let maps = [];
maps.push(mapImage1);
maps.push(mapImage2);
maps.push(mapImage3);
maps.push(mapImage4);
maps.push(mapImage5);

const max = 4;
const min = 0;
let n = Math.floor(Math.random() * (max - min)) + min;
let mapImage = maps[n];

let images_right = [];
images_right.push(moveImage9);
images_right.push(moveImage10);
images_right.push(moveImage11);
images_right.push(moveImage12);
images_right.push(moveImage13);
images_right.push(moveImage14);
images_right.push(moveImage15);

let images_left = [];
images_left.push(moveImageLeft1);
images_left.push(moveImageLeft2);
images_left.push(moveImageLeft3);
images_left.push(moveImageLeft4);
images_left.push(moveImageLeft5);
images_left.push(moveImageLeft6);
images_left.push(moveImageLeft7);

function User(id) {
  this.id = id;
  this.x = 100;
  this.y = 500;
  this.dir = "right";
  this.frame = 0;
}

let user = new User(0);
let delay = 5;

const Canvas = () => {
  const canvasRef = useRef(null);
  let canvas;
  let context;

  let imageChar = new Image();
  imageChar.src = rightImage;
  let imageBackground = new Image();
  imageBackground.src = mapImage;
  const vel = 2;
  let dx = 0;
  let dy = 0;
  let dxHalf = 50;
  let dyHalf = 80;

  window.addEventListener("keydown", (event) => {
    const key = event.key;
    let curUser = user;
    curUser.frame = (curUser.frame + 1) % (delay * 6);
    if (key === "ArrowUp") {
      event.preventDefault();
      dy = -vel;
    } else if (key === "ArrowDown") {
      event.preventDefault();
      dy = vel;
    } else if (key === "ArrowRight") {
      event.preventDefault();
      dx = vel;
      curUser.dir = "right";
    } else if (key === "ArrowLeft") {
      event.preventDefault();
      dx = -vel;
      curUser.dir = "left";
    } else {
      dx = 0;
      dy = 0;
      curUser.frame = 0;
    }
  });

  window.addEventListener("keyup", (event) => {
    const key = event.key;
    if (key === "ArrowUp" || key === "ArrowDown") {
      dy = 0;
    } else if (key === "ArrowRight" || key === "ArrowLeft") {
      dx = 0;
    }
    if (dx === 0 && dy === 0) {
      user.frame = 0;
    }
  });

  function loaded() {
    canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas?.getContext("2d");
    run();
    setInterval(run, 16);
  }

  function run() {
    draw();
    renderUser();
    move();
  }

  function move() {
    let curUser = user;
    curUser.x += dx;
    curUser.y += dy;
  }

  function renderUser() {
    let userImage = new Image();
    console.log(user.dir);
    if (dx !== 0 || dy !== 0) {
      if (user.dir === "right") {
        userImage.src = images_right[Math.floor(user.frame / delay)];
      } else if (user.dir === "left") {
        userImage.src = images_left[Math.floor(user.frame / delay)];
      }
    } else if (user.dir === "right") userImage.src = rightImage;
    else if (user.dir === "left") userImage.src = leftImage;
    context.drawImage(userImage, user.x, user.y, dxHalf * 2, dyHalf * 2);
  }

  function draw() {
    context.drawImage(imageBackground, 0, 0, window.innerWidth, window.innerHeight);
  }

  useEffect(() => {
    loaded();
  }, []);

  return (
    <div className="canvas_wrap">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Canvas;
