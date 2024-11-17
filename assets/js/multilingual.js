let nowlang='zh';

var langText=
{
    'en':
    {
        '倒计时': '倒计时',
        '未开始计时': '未开始计时',
        '分钟（默认 5）': '分钟（默认 5）',
        '秒（默认 0）': '秒（默认 0）',
        '毫秒（默认 0）': '毫秒（默认 0）',
        '开始计时': '开始计时',
        '重置计时器': '重置计时器',
        '停止计时': '停止计时',
        '保存': '保存',
        '正在计时': '正在计时',
        '超时': '超时'
    },
    'zh':
    {
        'Countdown Timer': '倒计时',
        'Not Started': '未开始计时',
        'Minutes (Default 5)': '分钟（默认 5）',
        'Seconds (Default 0)': '秒（默认 0）',
        'Milliseconds (Default 0)': '毫秒（默认 0）',
        'Got a bug? Use a version with no bugs found yet: ': '有 bug？使用暂无发现 bug 的',
        'Click here': '旧版',
        'Start Timing': '开始计时',
        'Reset Timer': '重置计时器',
        'Stop Timing': '停止计时',
        'Save': '保存',
        'Now Timing': '正在计时',
        'Time Out': '超时',
    }
};

function translatePage(language)
{
    var currentLangText=langText[language];
    function translateNode(node)
    {
        if(node.nodeType===Node.TEXT_NODE)
        {
            Object.keys(currentLangText).forEach(function(key)
            {
                if(node.textContent.includes(key))
                {
                    node.textContent=node.textContent.replace(key,currentLangText[key]);
                }
            });
        }
        else if(node.nodeType===Node.ELEMENT_NODE)
        {
            if(node.tagName.toLowerCase()==='input')
            {
                var placeholder=node.getAttribute('placeholder');
                if(placeholder)
                {
                    Object.keys(currentLangText).forEach(function(key)
                    {
                        if(placeholder.includes(key)) node.setAttribute('placeholder',placeholder.replace(key,currentLangText[key]));
                    });
                }
            }
            else if(node.childNodes&&node.childNodes.length>0) for(var i=0;i<node.childNodes.length;i++) translateNode(node.childNodes[i]);
        }
    }
    translateNode(document.body);
}

setInterval(function()
{
    translatePage(nowlang);
},10);

document.addEventListener('DOMContentLoaded',function()
{
    var languageSwitch=document.getElementById('language-switch');
    var languageOptions=document.getElementById('language-options');
    var englishOption=document.getElementById('english');
    var chineseOption=document.getElementById('chinese');
    var userLanguage=navigator.language||navigator.userLanguage;
    var defaultLanguage=userLanguage.startsWith('zh')?'zh':'en';
    nowlang=defaultLanguage;
    languageOptions.style.display='none';
    languageSwitch.addEventListener('click',function()
    {
        if(languageOptions.style.display==='none') languageOptions.style.display='block';
        else languageOptions.style.display='none';
    });
    englishOption.addEventListener('click',function(event)
    {
        event.preventDefault();
        nowlang='en';
        languageOptions.style.display='none';
    });
    chineseOption.addEventListener('click',function(event)
    {
        event.preventDefault();
        nowlang='zh';
        languageOptions.style.display='none';
    });
});

