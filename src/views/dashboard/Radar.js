import React from "react";
import Sketch from "react-p5";
import { useState, useEffect } from 'react';
import PropTypes from "prop-types";


const width = 900;
const height = 900;
const startW = width/2;
const startH = height/2;

const Radar = (props) => { 

    const [iAngle, setIAngle] = useState(props.iAngle || 0);
    useEffect(() => {
        setIAngle(props.iAngle);
    }, [props.iAngle]);

    const [iDistance, setIDistance] = useState(props.iDistance || 0);
    useEffect(() => {
        setIAngle(props.iDistance);
    }, [props.iDistance]);

	const setup = (p, canvasParentRef) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
        p.clear();
		p.createCanvas(width, height*2).parent(canvasParentRef);
	};

	const drawRadar = (p) => {
		p.push();
        p.translate(0, 50);
        p.fill(0, 0, 0);
        p.rect(0,startH, width, 100);
        p.push();
        p.fill(0, 0, 0);
        p.translate(startW, startH);
        
        // p.noFill();
        // p.fill(0, 0, 0);
        p.strokeWeight(2);
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

    const drawLine = (p, iAngle) => {
        p.push();
        p.strokeWeight(9);
        p.stroke(30,250,60);
        p.translate(startW,startH+50); // moves the starting coordinats to new location
        p.line(0,0,950*p.cos(p.radians(iAngle)),-950*p.sin(p.radians(iAngle))); // draws the line according to the angle
        p.pop();
    }

    const drawObject = (p, iAngle, iDistance) => {
        p.push();
        p.translate(startW,startH+50); // moves the starting coordinats to new location
        p.strokeWeight(9);
        p.stroke(255,10,10); // red color
        let pixsDistance = iDistance*22.5; // covers the distance from the sensor from cm to pixels
        // limiting the range to 40 cms
        if (iDistance < 40) {
            // draws the object according to the angle and the distance
            p.line(pixsDistance*p.cos(p.radians(iAngle)),-pixsDistance*p.sin(p.radians(iAngle)),950*p.cos(p.radians(iAngle)),-950*p.sin(p.radians(iAngle)));
        }
        p.pop();
    }

    const drawText = (p) => { // draws the texts on the screen
        
        let textRowHeight = startH+25;
        p.push();
        p.translate(0,50);
        p.push();
        // p.translate(startW, startH);

        // p.fill(0, 0, 0);
        // p.rect(0,startH+100, width, 100);
        
        p.fill(0,0,0);
        p.noStroke();
        // p.rect(0, 0, startW, startH);
        p.fill(98,245,31);
        p.textSize(15);
        p.text("10cm",startW+10,textRowHeight);
        p.text("20cm",startW+200,textRowHeight);
        p.text("30cm",startW+400,textRowHeight);
        p.text("40cm",startW+600,textRowHeight);
        p.textSize(25);

        // p.text("Object: " + noObject, 240, 1050);
        // p.text("Angle: " + iAngle +" °", startW, textRowHeight+30);
        p.text("Distance: ", startW-200, textRowHeight+30);
        if (iDistance < 40) {
            p.text("        " + iDistance +" cm", 1400, 1050);
        }


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

    const test = (p) => {
        // p.push();
        // p.fill(0, 0, 0);
        // p.translate(startW, startH);
        // p.pop();
        p.push();
        p.strokeWeight(21);
        p.point(0,0);
        p.translate(startW,startH); // moves the starting coordinats to new location
        p.stroke(30,250,60);
        p.strokeWeight(14);
        p.point(0,0);
        // p.line(0,0,startH*p.cos(p.radians(90)),-startH*p.sin(p.radians(90)));
        // p.line(0,0,startH*p.cos(p.radians(45)),-startH*p.sin(p.radians(45))); // draws the line according to the angle
        // p.line(0,0,startH*p.cos(p.radians(0)),-startH*p.sin(p.radians(0))); // draws the line according to the angle
        p.pop();
    }

	const draw = (p) => {
        p.fill(0, 0, 0);
        // p.fill(0,0,0);   
        // test(p);       
        p.rect(0,0, height, startH+100)
        drawRadar(p);   
        drawLine(p, iAngle);
        drawObject(p, iAngle, iDistance);
        drawText(p);
        // p.clear();
        // p.stroke(98, 245, 31);
        // p.point(0,0);
        // p.point(450,450);


		// NOTE: Do not use setState in the draw function or in functions that are executed
		// in the draw function...
		// please use normal variables or class properties for these purposes
        
	};

	return <Sketch setup={setup} draw={draw} />;
};

Radar.propTypes = {
    iAngle: PropTypes.number,
    iDistance: PropTypes.number,
};

export default Radar;