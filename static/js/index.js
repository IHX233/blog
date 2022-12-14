//背景canvas
(function() {
    //变量
    let canvas = document.getElementById("bg-canvas"),
        cxt = canvas.getContext("2d"),
        w, //canvas宽
        h, //canvas高
        num = 50, //生成的粒子数量
        data = [], //存储坐标
        move = {} //存储鼠标坐标
    ;

    init();

    //初始化
    function init() {
        reSize();
        createAllDot();
        draw();
        mousePos();

        let timer = null;
        window.addEventListener("resize", function() {
            clearTimeout(timer);
            timer = setTimeout(reSize, 500);
        });
    }
    //生成num个粒子
    function createAllDot() {
        for (let i = 0; i < num; i++) {
            data[i] = {
                x: Math.random() * w,
                y: Math.random() * h,
                cX: (Math.random() - 0.5) / 1.2,
                cY: (Math.random() - 0.5) / 1.2,
                color: randomColor()
            };
            drawDot(data[i].x, data[i].y, data[i].color);
        }
    }
    //获取浏览器宽高并设置
    function reSize() {
        w = canvas.width = document.documentElement.clientWidth;
        h = canvas.height = 350;
    }
    //画粒子
    function drawDot(x, y, c) {
        cxt.save();
        cxt.fillStyle = c;
        cxt.beginPath();
        cxt.arc(x, y, 1.5, 0, 2 * Math.PI, true);
        cxt.closePath();
        cxt.fill();
        cxt.restore();
    }
    //随机颜色
    function randomColor() {
        let r = Math.floor(Math.random() * 256),
            g = Math.floor(Math.random() * 256),
            b = Math.floor(Math.random() * 256),
            a = Math.floor(Math.random() * 11) / 10;
        return `rgba(${r},${g},${b},${a})`;
    }
    //mousemove 鼠标位置
    function mousePos() {
        document.addEventListener("mousemove", function(e) {
            move = { x: e.clientX, y: e.clientY };
        });
    }
    //连线
    function drawLine(data1, data2, isMove, d) {
        cxt.save();
        let [x1, y1, x2, y2] = [data1.x, data1.y, data2.x, data2.y];
        let lin = cxt.createLinearGradient(x1, y1, x2, y2);
        let max = isMove ? 4000 : 12000;
        let alpha = (max - d) / max;
        if (isMove) {
            lin.addColorStop(0, "rgba(150,150,150," + alpha + ")");
            lin.addColorStop(1, "rgba(150,150,150,0)");
        } else {
            lin.addColorStop(0, "rgba(234,104,97," + alpha + ")");
            lin.addColorStop(1, "rgba(234,104,97,0.2)");
        }
        cxt.strokeStyle = lin;
        cxt.beginPath();
        cxt.moveTo(x1, y1);
        cxt.lineTo(x2, y2);
        cxt.stroke();
        cxt.restore();
    }
    //绘制
    function draw() {
        //清屏
        cxt.clearRect(0, 0, w, h);

        //重绘
        for (let i = 0; i < num; i++) {
            data[i].x += data[i].cX;
            data[i].y += data[i].cY;
            if (data[i].x > w || data[i].x < 0) data[i].cX = -data[i].cX;
            if (data[i].y > h || data[i].y < 0) data[i].cY = -data[i].cY;
            drawDot(data[i].x, data[i].y, data[i].color);

            //点点连线
            for (let j = i + 1; j < num; j++) {
                let d = (data[i].x - data[j].x) ** 2 + (data[i].y - data[j].y) ** 2;
                if (d < 60 ** 2) {
                    drawLine(data[i], data[j], true, d);
                }
            }

            //鼠标与点连线
            if (move.x && move.y) {
                let d = (data[i].x - move.x) ** 2 + (data[i].y - move.y) ** 2;
                if (d < 100 ** 2) {
                    drawLine(data[i], move, false, d);
                }
            }
        }

        //动画
        requestAnimationFrame(draw);
    }
})();

//标题皮一下~
(function() {
    let title = document.title;
    window.addEventListener("focus", () => {
        document.title = title;
    });
    window.addEventListener("blur", () => {
        document.title = "快回来！汉堡被偷吃了！！";
    });
})();