import React from "react";
import Sketch from "react-p5";
import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import store from '../../store';

const width = 900;
const height = 900;
const startW = width/2;
const startH = height/2;


const Radar = (props) => { 

    const [angles, setAngles] = useState(new Array(180).fill(0));

    const [iAngle, setIAngle] = useState(0);
    const [iDistance, setIDistance] = useState(0);

    const socket = store.getState().socket;

    useEffect(() => {
        socket.on('radar', (data) => {
            angles[parseInt(data.angle)] = parseInt(data.value);
            setIAngle(parseInt(data.angle));
            setIDistance(parseInt(data.value));
        });
    },[]);


	const setup = (p, canvasParentRef) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
        p.clear();
		p.createCanvas(width, height*2).parent(canvasParentRef);

        // give the enitre box black background
        p.fill(0, 0, 0);
        p.rect(0,0, height, startH+100);

        drawRadar(p);   
        drawLabels(p);
	};

	const drawRadar = (p) => {
		p.push();
        p.translate(0, 50);
        p.fill(0, 0, 0);
        p.rect(0,startH, width, 100);
        p.push();
        p.fill(0, 0, 0);
        p.translate(startW, startH);
        
        p.strokeWeight(4);
        p.stroke(98, 245, 31);

        let w = width;
        let h = height;

        while (w >= 0 && h >= 0) {
            p.arc(0, 0, w, h, Math.PI, 2*Math.PI);
            w -= 200;
            h -= 200;
        }
        p.line(-startW, 0, startW, 0);

        p.line(0,0,-startH*p.cos(p.radians(30)),-startH*p.sin(p.radians(30)));
        p.line(0,0,-startH*p.cos(p.radians(60)),-startH*p.sin(p.radians(60)));
        p.line(0,0,-startH*p.cos(p.radians(90)),-startH*p.sin(p.radians(90)));
        p.line(0,0,-startH*p.cos(p.radians(120)),-startH*p.sin(p.radians(120)));
        p.line(0,0,-startH*p.cos(p.radians(150)),-startH*p.sin(p.radians(150)));
        p.line(-startH*p.cos(p.radians(30)),0,startH,0);
        p.point(0,0);
        p.pop();
        p.pop();
	}

    const drawLabels = (p) => { // draws the texts on the screen
        
        let textRowHeight = startH+25;
        p.push();
        p.translate(0,50);

        p.push();
        p.fill(0,0,0);
        p.noStroke();
        p.fill(98,245,31);
        p.textSize(15);
        p.text("150 cm",startW+130,textRowHeight);
        p.text("250 cm",startW+230,textRowHeight);
        p.text("350 cm",startW+330,textRowHeight);
                
        p.textSize(25);
        p.fill(98,245,60);

        p.translate(startH+10+startW*p.cos(p.radians(30)),startH-15-startW*p.sin(p.radians(30)));
        p.rotate(-p.radians(-60));
        p.text("30°",0,0);
        p.resetMatrix();

        p.translate(startH+startW*p.cos(p.radians(60)),startH+30-startW*p.sin(p.radians(60)));
        p.rotate(-p.radians(-30));
        p.text("60°",0,0);
        p.resetMatrix();

        p.translate(startH-10+startW*p.cos(p.radians(90)),startW+35-startH*p.sin(p.radians(90)));
        p.rotate(p.radians(0));
        p.text("90°",0,0);
        p.resetMatrix();

        p.translate(startH-30+startW*p.cos(p.radians(120)),startH+40-startW*p.sin(p.radians(120)));
        p.rotate(p.radians(-30));
        p.text("120°",0,0);
        p.resetMatrix();

        p.translate(startH-30+startW*p.cos(p.radians(150)),70+startW*p.sin(p.radians(150)));
        p.rotate(p.radians(-60));
        p.text("150°",0,0);
        p.pop(); 
        p.pop();
    }

    const drawLine = (p, iAngle) => {
        p.push();
        p.strokeWeight(2);
        p.translate(startW,startH+50); // moves the starting coordinats to new location
        p.stroke(30,250,60);
        p.line(0,0,startH*p.cos(p.radians(iAngle)),-startH*p.sin(p.radians(iAngle))); // draws the line according to the angle
        p.pop();
    }

    const drawObject = (p, iAngle, iDistance) => {
        p.push();
        p.translate(startW,startH+50); // moves the starting coordinats to new location
        p.strokeWeight(2);
        p.stroke(255,10,10); // red color

        let pixsDistance = iDistance*22.5; // covers the distance from the sensor from cm to pixels
        // var dist = startW/iDistance;

        var dist = iDistance;
        p.line(dist*p.cos(p.radians(iAngle)),-dist*p.sin(p.radians(iAngle)), startH*p.cos(p.radians(iAngle)), -startH*p.sin(p.radians(iAngle))); // draws the line according to the angle
        
        p.pop();
    }

    const drawDistanceAndAngle = (p) => {

        // set the height of the text row
        const textRowHeight = startH+25;

        // push coords to correct location
        p.push();
        p.translate(0,50);
        
        // draw black box over the old values to clear out the contents
        p.push();
        p.fill(0,0,0);
        p.rect(0,startH+30,width,50);
        p.pop();

        // Draw the text with the current values
        p.textSize(25);
        p.fill(98,245,31);
        p.text("Distance: "+iDistance, startW-200, textRowHeight+30);
        p.text("Angle: "+iAngle, startW+50, textRowHeight+30);
        
        p.pop();
    } 

	const draw = (p) => {
        // p.fill(0, 0, 0);
        // p.rect(0,0, height, startH+100)
        // drawRadar(p);   

        // Some test values to set the distance labels
        // drawObject(p, 55, 430);
        // drawObject(p, 65, 350);
        // drawObject(p, 75, 250);
        // drawObject(p, 85, 150);
        // drawObject(p, 95, 10);
        // drawObject(p, 105, 50);
        // drawObject(p, 115, 40);

        angles.forEach((dist, angle) => {
            drawLine(p, angle);
            drawObject(p, angle, dist);

            // if (dist > 3) {
            //     // console.log(dist);
            //     drawObject(p, angle, dist);
            // }
        })

        drawDistanceAndAngle(p);
        
        
        // drawLabels(p);
        
		// NOTE: Do not use setState in the draw function or in functions that are executed
		// in the draw function...
		// please use normal variables or class properties for these purposes
        
	};

	return <Sketch setup={setup} draw={draw} />;
};

export default Radar;