let min=5;
let second=0;
let millisecond=0;
let totalMillisecond=300000;
let running=false;
let startTime=0;
let isSetStartTime=0;
let setStartTime=0;
let t1=[5,0,0];
let timeOuted=0;

function sleep(milliseconds)
{
    return new Promise(resolve=>setTimeout(resolve,milliseconds));
}

async function dynamicUpdateDisplayIncreasing(now1,now2,now3,goto1,goto2,goto3)
{
    let tt1=now1,tt2=now2,tt3=now3,cnt=0;
    while(tt1!=goto1||tt2!=goto2||tt3!=goto3)
    {
        // console.log([tt1,tt2,tt3]);
        ++tt3;
        if(tt3>999) tt3=0,++tt2;
        if(tt2>59) tt2=0,++tt1;
        ++cnt;
    }
    let ocnt=cnt;
    tt1=now1,tt2=now2,tt3=now3,cnt=Math.floor(cnt/4000)*200,cntt=0;
    if(cnt<1e-5) cnt=Math.floor(ocnt/10);
    while(tt1!=goto1||tt2!=goto2||tt3!=goto3)
    {
        ++tt3;
        if(tt3>999) tt3=0,++tt2;
        if(tt2>59) tt2=0,++tt1;
        ++cntt;
        // console.log([cnt,cntt]);
        if(Math.abs(cntt-cnt)<1e-5)
        {
            cntt=0;
            cntt=0;
            await sleep(1);
            updateInitDisplay(tt1,tt2,tt3);
        }
    }
    await sleep(1);
    updateInitDisplay(goto1,goto2,goto3);
}

async function dynamicUpdateDisplayDecreasing(now1,now2,now3,goto1,goto2,goto3)
{
    let tt1=now1,tt2=now2,tt3=now3,cnt=0;
    while(tt1!=goto1||tt2!=goto2||tt3!=goto3)
    {
        // console.log([tt1,tt2,tt3]);
        --tt3;
        if(tt3<0) tt3=999,--tt2;
        if(tt2<0) tt2=59,--tt1;
        ++cnt;
    }
    let ocnt=cnt;
    tt1=now1,tt2=now2,tt3=now3,cnt=Math.floor(cnt/4000)*200,cntt=0;
    if(cnt<1e-5) cnt=Math.floor(ocnt/10);
    while(tt1!=goto1||tt2!=goto2||tt3!=goto3)
    {
        --tt3;
        if(tt3<0) tt3=999,--tt2;
        if(tt2<0) tt2=59,--tt1;
        ++cntt;
        // console.log([cnt,cntt]);
        if(Math.abs(cntt-cnt)<1e-5)
        {
            cntt=0;
            cntt=0;
            await sleep(1);
            updateInitDisplay(tt1,tt2,tt3);
        }
    }
    await sleep(1);
    updateInitDisplay(goto1,goto2,goto3);
}

async function setText(text)
{
    await sleep(1);
    document.getElementById('status').innerText=text;
}

async function init()
{
    document.getElementById('startButton').disabled=true;
    document.getElementById('stopButton').disabled=true;
    document.getElementById('renewButton').disabled=true;
    setText('未开始计时');
    if(timeOuted)
    {
        dynamicUpdateDisplayIncreasing(0,0,0,min,second,millisecond);
    }
    else
    {
        dynamicUpdateDisplayIncreasing(t1[0],t1[1],t1[2],min,second,millisecond);
    }
    document.getElementById('modifyButton').disabled=false;
    document.getElementById('minuteInput').disabled=false;
    document.getElementById('secondInput').disabled=false;
    document.getElementById('millisecondInput').disabled=false;
    document.getElementById('timer').style.color='#71c9ce';
    startTime=Number(new Date());
    isSetStartTime=0;
    document.getElementById('status').style.color='#71c9ce';
    FirstDisplay();
    document.getElementById('startButton').disabled=false;
    stop();
}

function timeLower(now1,now2,now3,goto1,goto2,goto3)
{
    if(now1<goto1) return 1;
    if(now1>goto1) return 0;
    if(now2<goto2) return 1;
    if(now2>goto2) return 0;
    if(now3<goto3) return 1;
    return 0;
}

function modifyTimer()
{
    let nmin=document.getElementById('minuteInput').value;
    let nsecond=document.getElementById('secondInput').value;
    let nmillisecond=document.getElementById('millisecondInput').value;
    if(nmin=="") {nmin="5";}
    if(nsecond=="") {nsecond="0";}
    if(nmillisecond=="") {nmillisecond="0";}
    nmin=parseInt(nmin);
    nsecond=parseInt(nsecond);
    nmillisecond=parseInt(nmillisecond);
    if(nsecond<0||nsecond>59)
    {
        if(nowlang!='en') alert('秒数只能介于 0 和 59 之间！');
        else alert('Seconds can only be between 0 and 59!');
        return;
    }
    min=nmin;
    second=nsecond;
    millisecond=nmillisecond;
    totalMillisecond=min*60000+second*1000+millisecond;
    let originalText=document.getElementById('status').innerText;
    if(timeLower(t1[0],t1[1],t1[2],min,second,millisecond)) dynamicUpdateDisplayIncreasing(t1[0],t1[1],t1[2],min,second,millisecond);
    else dynamicUpdateDisplayDecreasing(t1[0],t1[1],t1[2],min,second,millisecond);
    t1=[min,second,millisecond];
    document.getElementById('status').innerText=originalText;
    // FirstDisplay();
}

function getTwo(x)
{
    return x<10?'0'+x:x;
}

function FirstDisplay()
{
    document.getElementById('timer').innerText=getTwo(min)+':'+getTwo(second)+'.'+millisecond.toString().padStart(3,'0');
}

function updateTimerDisplay()
{
    let now=Number(new Date());
    let elapsedMilliseconds=now-startTime;
    if(elapsedMilliseconds>totalMillisecond)
    {
        timeOuted=1;
        elapsedMilliseconds=totalMillisecond*2-elapsedMilliseconds;
        if(document.getElementById('timer').style.color!=='#e74c3c'&&document.getElementById('timer').style.color!=='rgb(231, 76, 60)')
        {
            console.log(document.getElementById('timer').style.color);
            document.getElementById('timer').style.color='#e74c3c';
            document.getElementById('status').innerText='超时';
            document.getElementById('status').style.color='#e74c3c';
        }
    }
    else
    {
        timeOuted=0;
        document.getElementById('timer').style.color='#71c9ce';
    }
    const remainingMilliseconds=totalMillisecond-elapsedMilliseconds;
    const remainingMinutes=Math.floor(remainingMilliseconds/(60*1000));
    const remainingSeconds=Math.floor((remainingMilliseconds%(60*1000))/1000);
    const remainingMillisecondsToShow=remainingMilliseconds%1000;
    document.getElementById('timer').innerText=getTwo(remainingMinutes)+':'+getTwo(remainingSeconds)+'.'+remainingMillisecondsToShow.toString().padStart(3,'0');
    return [remainingMinutes,remainingSeconds,remainingMillisecondsToShow];
}

function updateInitDisplay(remainingMinutes,remainingSeconds,remainingMillisecondsToShow)
{
    document.getElementById('timer').innerText=getTwo(remainingMinutes)+':'+getTwo(remainingSeconds)+'.'+remainingMillisecondsToShow.toString().padStart(3,'0');
}

const go=()=>
{
    document.getElementById('renewButton').disabled=true;
    document.getElementById('stopButton').disabled=false;
    running=true;
    document.getElementById('startButton').disabled=true;
    document.getElementById('modifyButton').disabled=true;
    document.getElementById('status').innerText='正在计时';
    document.getElementById('status').style.color='#71c9ce';
    document.getElementById('minuteInput').disabled=true;
    document.getElementById('secondInput').disabled=true;
    document.getElementById('millisecondInput').disabled=true;
    
    if(isSetStartTime)
    {
        startTime+=Number(new Date())-setStartTime;
    }
    else
    {
        startTime=Number(new Date());
    }
    const timerInterval=setInterval(()=>
    {
        if(!running)
        {
            clearInterval(timerInterval);
            return;
        }
        updateTimerDisplay();
    },5);
}

function stop()
{
    running=false;
    isSetStartTime=1;
    setStartTime=Number(new Date());
    t1=updateTimerDisplay();
    document.getElementById('status').innerText='停止计时';
    document.getElementById('status').style.color='#71c9ce';
    document.getElementById('startButton').disabled=false;
    document.getElementById('stopButton').disabled=true;
    document.getElementById('renewButton').disabled=false;
}
document.getElementById('stopButton').disabled=true;
alert("这是手机版计时器，请用手机使用此网站。");
