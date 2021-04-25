import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, Panel, withAdaptivity, PanelHeader } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

const walls = [
	{
		points: [
			{
				x: 50,
				y: 50
			}, 
			{
				x: 50,
				y: 110
			},
			{
				x:90,
				y: 11
			}
		]
	}
]


class App extends React.Component  {


	state = {
		activePanel: "home",
		xo: 20, 
		yo: 20
	}

	componentDidMount() {
		let speed = 1	;
		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = "green";
		bridge.subscribe((e) => {
			// console.log(e.detail)
			if("VKWebAppAccelerometerChanged") {
				const { x, y } = e.detail.data;
				this.setState({ xi : x,  yi: y })
			}
		})
		//bridge.send("VKWebAppDeviceMotionStart");
		bridge.send("VKWebAppAccelerometerStart");
		// var canvas = document.getElementById("canvas");
		// var ctx = canvas.getctx("2d");
		// ctx.fillStyle = "green";
		
		setInterval(() => {
				const { xo, yo, xi, yi } = this.state;
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				var xop = (Number(xo + -Math.round(xi)*speed));
				if(xop > canvas.width || xop <= 0) {
					xop = xo; 
				}
				var yop = Number(yo + Math.round(yi)*speed);
				if(yop < 0 || yop > canvas.height) {
					yop = yo; 
				}
				ctx.beginPath();
				ctx.arc(xop, yop, 4, 0, 2 * Math.PI, false);
				ctx.fillStyle = 'black';
				ctx.fill();
				ctx.lineWidth = 1;
				ctx.strokeStyle = '#003300';
				ctx.stroke();
				this.setState({ xo: Number(xop), yo: Number(yop)})
		}, 100)
	}

	render() {
		return (
			<AdaptivityProvider>
				<AppRoot>
					<View activePanel="home">
						<Panel id="home">
							<canvas style={{ width: window.innerWidth - 30, height: window.innerHeight - 40, borderWidth: "2px", borderStyle: "solid", borderColor: "red" }} id="canvas" className="canvas"/>
						</Panel>
					</View>
				</AppRoot>
			</AdaptivityProvider>
		);
	}
	
}

export default withAdaptivity(App, { sizeX: true, sizeY: true, viewHeight: true, viewWidth: true,  });
