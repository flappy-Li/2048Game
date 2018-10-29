var colorMapping = {
	"0": "#ccc0b3",
	"2": "#eee4da",
	"4": "#ede0c8",
	"8": "#f2b179",
	"16": "#f59563",
	"32": "#f67e5f",
	"64": "#f65e3b",
	"128": "#edcf72",
	"256": "#edcc61",
	"512": "#9c0",
	"1024": "#33b5e5",
	"2048": "#09c"
};
var my2048,
	rows = 5,
	cols = 5,
	squareWidth = 100,
	boardSet = [],
	valueMap = [],
	squareSet = [],
	directionEnum = {
		left: {
			x: -1,
			y: 0,
			key: "left"
		},
		right: {
			x: 1,
			y: 0,
			key: "left"
		},
		top: {
			// x: 0,
			// y: -1,
			key: "top"
		},
		down: {
			x: 0,
			y: 1,
			key: "top"
		}
	},
	lock = true,
	isChange = false,
	spacing = 12;
//初始化
function init() {
	my2048 = document.getElementById('my2048');
	//初始化面板
	initBoard();
	//初始化方块
	randGenerateSquare();
	randGenerateSquare();
	//添加事件
	document.addEventListener('keydown', function (event) {
		if (!lock) return;
		switch (event.key) {
			case "ArrowUp":
				move(directionEnum.top);
				break;
			case "ArrowDown":
				move(directionEnum.down);
				break;
			case "ArrowLeft":
				move(directionEnum.left);
				break;
			case "ArrowRight":
				move(directionEnum.right);
				break;
			default:
				{
					lock = true;
				}
		}

	})
}
//创建面板
function initBoard() {
	my2048.style.width = cols * squareWidth + (cols + 1) * spacing + 'px';
	my2048.style.height = rows * squareWidth + (rows + 1) * spacing + 'px';
	// console.log(my2048.style.width + ':' + my2048.style.height)
	for (var i = 0; i < rows; i++) {
		boardSet[i] = [];
		squareSet[i] = [];
		valueMap[i] = [];
		for (var j = 0; j < cols; j++) {
			var tempLeft = j * squareWidth + (j + 1) * spacing;
			var tempTop = i * squareWidth + (i + 1) * spacing;
			squareSet[i][j] = null;
			valueMap[i][j] = 0;
			boardSet[i][j] = createSquare(0, tempLeft, tempTop, i, j);
			my2048.appendChild(boardSet[i][j]);

		}
	}
}
//创建块
function createSquare(value, left, top, row, col) {
	var temp = document.createElement('div');
	temp.style.width = squareWidth + 'px';
	temp.style.height = squareWidth + 'px';
	temp.style.left = left + 'px';
	temp.style.top = top + 'px';
	temp.style.background = colorMapping[value];
	temp.style.lineHeight = squareWidth + 'px';
	temp.style.textAlign = 'center';
	temp.style.fontSize = 0.4 * squareWidth + 'px';
	temp.style.borderRadius = 0.2 * squareWidth + "px";
	temp.num = value;
	temp.cols = col;
	temp.rows = row;
	if (value > 0) {
		temp.innerHTML = "" + value;
	}
	return temp;

}
//随机生成2和4
function randSquareNum() {
	return Math.random() >= 0.5 ? 4 : 2;
}
//随机创建带数字的方块
function randGenerateSquare() {
	for (;;) {
		var randRow = Math.floor(Math.random() * rows);
		var randCol = Math.floor(Math.random() * cols);
		// debugger
		if (valueMap[randRow][randCol] == 0) {
			var tempLeft = randCol * squareWidth + (randCol + 1) * spacing;
			var tempTop = randRow * squareWidth + (randRow + 1) * spacing;
			var temp = createSquare(randSquareNum(), tempLeft, tempTop, randRow, randCol);
			valueMap[randRow][randCol] = temp.num;
			squareSet[randRow][randCol] = temp;
			my2048.appendChild(temp);
			return true;
		}
	}

}
//方块移动事件
function move(driection) {
	if(isOver() {
		alert("游戏结束");
		return
	}
	var newSquareSet = analysisActions(driection);
	setTimeout(function () {
		refresh(newSquareSet);
		if (isChange) {
			randGenerateSquare()
		}
		lock = true;
		isChange = false;
	}, 300)
}

function analysisActions(direction) {
	var newSquareSet = generateNullMap();
	if (direction == directionEnum.left) { //向左
		console.log("向左");
		for (var i = 0; i < squareSet.length; i++) {
			var temp = [];
			for (var j = 0; j < squareSet[i].length; j++) {
				if (squareSet[i][j] != null) {
					temp.push(squareSet[i][j]);
				}
			}
			temp = getNewLocation(temp);
			for (var k = 0; k < newSquareSet[i].length; k++) {
				if (temp[k]) {
					newSquareSet[i][k] = temp[k];
				}
			}
		}
	} else if (direction == directionEnum.right) { //向右
		console.log("向右");
		for (var i = 0; i < squareSet.length; i++) {
			var temp = [];
			for (var j = squareSet[i].length - 1; j >= 0; j--) {
				if (squareSet[i][j] != null) {
					temp.push(squareSet[i][j]);
				}
			}
			temp = getNewLocation(temp);
			for (var k = newSquareSet[i].length - 1; k >= 0; k--) {
				if (temp[newSquareSet[i].length - 1 - k]) {
					newSquareSet[i][k] = temp[newSquareSet[i].length - 1 - k];
				}
			}
		}
	} else if (direction == directionEnum.top) { //向前
		console.log("向前");
		for (var j = 0; j < squareSet[0].length; j++) {
			var temp = [];
			for (var i = 0; i < squareSet.length; i++) {
				if (squareSet[i][j] != null) {
					temp.push(squareSet[i][j]);
				}
			}
			temp = getNewLocation(temp);
			for (var k = 0; k < newSquareSet.length; k++) {
				if (temp[k]) {
					newSquareSet[k][j] = temp[k];
				}
			}
		}
	} else { //向后
		console.log("向后");
		for (var j = 0; j < squareSet[0].length; j++) {
			var temp = [];
			for (var i = squareSet.length - 1; i >= 0; i--) {
				if (squareSet[i][j] != null) {
					temp.push(squareSet[i][j]);
				}
			}
			temp = getNewLocation(temp);
			for (var k = newSquareSet.length - 1; k >= 0; k--) {
				if (temp[newSquareSet.length - 1 - k]) {
					newSquareSet[k][j] = temp[newSquareSet.length - 1 - k];
				}
			}
		}
	}
	//动画
	for (var i = 0; i < newSquareSet.length; i++) {
		for (var j = 0; j < newSquareSet[i].length; j++) {
			if (newSquareSet[i][j] == null) {
				continue;
			}

			newSquareSet[i][j].style.transition = direction.key + " 0.3s";
			newSquareSet[i][j].style.left = (j + 1) * spacing + j * squareWidth + "px";
			newSquareSet[i][j].style.top = (i + 1) * spacing + i * squareWidth + "px";
			if (newSquareSet[i][j].nextSquare) {
				newSquareSet[i][j].nextSquare.style.transition = direction.key + " 0.3s";
				newSquareSet[i][j].nextSquare.style.left = (j + 1) * spacing + j * squareWidth + "px";
				newSquareSet[i][j].nextSquare.style.top = (i + 1) * spacing + i * squareWidth + "px";
			}
			console.log(newSquareSet[i][j].style.transition)
		}
	}
	return newSquareSet;
}

//刷新数据
function refresh(newSquareSet) {
	 squareSet = generateNullMap();
	 var newValueMap = generateNullMap();
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
			if (newSquareSet[i][j]) {
				if (newSquareSet[i][j].nextSquare) {
					var temp = createSquare(newSquareSet[i][j].num * 2, newSquareSet[i][j].offsetLeft, newSquareSet[i][j].offsetTop, i, j);
					squareSet[i][j] = temp;
					my2048.appendChild(temp);
					my2048.removeChild(newSquareSet[i][j].nextSquare);
					my2048.removeChild(newSquareSet[i][j]);
				} else {
					var temp = createSquare(newSquareSet[i][j].num, newSquareSet[i][j].offsetLeft, newSquareSet[i][j].offsetTop, i, j);
					squareSet[i][j] = temp
					my2048.appendChild(temp);
					my2048.removeChild(newSquareSet[i][j]);
				}
				if (valueMap[i][j] != squareSet[i][j].num) {
					isChange = true;
				}
				newValueMap[i][j] = squareSet[i][j].num;
			} else {
				newValueMap[i][j] = 0;
			}
		}
	}
	valueMap = newValueMap;
}
//获取新位置
function getNewLocation(arr) {
	if (arr.length == 0) {
		return [];
	}
	var temp = []; // 返回新的数组 
	temp.push(arr[0]);
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].num == temp[temp.length - 1].num && (!temp[temp.length - 1].nextSquare || temp[temp.length - 1].nextSquare == null)) {
			temp[temp.length - 1].nextSquare = arr[i];
		} else {
			temp.push(arr[i]);
		}
	}
	return temp;
}
//判断结束
function isOver () {
	for(var i = 0; i < squareSet.length; i ++) {
		for(var j = 0; j < squareSet[i].length; j ++) {
			if (squareSet[i][j] == null) {
				return false;
			}
			if(squareSet[i][j + 1] && squareSet[i][j].num == squareSet[i][j + 1].num || squareSet[i + 1] && 
			squareSet[i + 1][j] && squareSet[i][j].num == squareSet[i + 1][j].num) {
				return false;
			}
		}
	}
	return true;
}
//创建一个新的空数字块层
function generateNullMap() {
	var newValueMap = [];
	for (var i = 0; i < rows; i++) {
		newValueMap[i] = [];
		for (var j = 0; j < cols; j++) {
			newValueMap[i][j] = null;
		}
	}
	return newValueMap;
}
window.onload = function () {
	init();
}