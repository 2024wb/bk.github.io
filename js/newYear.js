let newYearTimer = null;

// Function to initialize new year countdown
var newYear = () => {
    clearTimeout(newYearTimer);
    
    // Calculate next New Year's date
    let now = new Date();
    let currentYear = now.getFullYear();
    let nextNewYearDate = new Date(currentYear + 1, 0, 1); // Assuming New Year's Day is on January 1st
    
    // Convert next New Year's date to seconds since epoch
    let newYearInSeconds = nextNewYearDate.getTime() / 1000;

    // Weekday names in Chinese
    let week = { 0: '周日', 1: '周一', 2: '周二', 3: '周三', 4: '周四', 5: '周五', 6: '周六' };

    // Function to add leading zero if needed
    function nol(h) { return h > 9 ? h : '0' + h; }

    // Function to update countdown timer
    function time() {
        let now = new Date();

        // Display today's date
        document.querySelector('#newYear .today').innerHTML = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + week[now.getDay()];

        // Calculate seconds remaining to next New Year
        let second = newYearInSeconds - Math.round(now.getTime() / 1000);

        if (second < 0) {
            // New Year has passed
            document.querySelector('#newYear .title').innerHTML = 'Happy New Year!';
            document.querySelector('#newYear .newYear-time').innerHTML = '<span class="happyNewYear">新年快乐</span>';
        } else {
            // New Year is upcoming
            document.querySelector('#newYear .title').innerHTML = '距离下一个新年：';

            if (second > 86400) {
                // More than a day remaining
                document.querySelector('#newYear .newYear-time').innerHTML = `<span class="day">${Math.ceil(second / 86400)}<span class="unit">天</span></span>`;
            } else {
                // Less than a day remaining, show hours, minutes, seconds
                let h = nol(parseInt(second / 3600));
                second %= 3600;
                let m = nol(parseInt(second / 60));
                second %= 60;
                let s = nol(second);
                document.querySelector('#newYear .newYear-time').innerHTML = `<span class="time">${h}:${m}:${s}</span>`;
                // Schedule next update in 1 second
                newYearTimer = setTimeout(time, 1000);
            }
        }
    }

    // Initial call to start the countdown
    time();

    // Initialize snow effect plugin (assuming it's included separately)
    jQuery(document).ready(function ($) {
        $('#newYear').wpSuperSnow({
            flakes: ['https://tuchuang.voooe.cn/images/2023/01/02/yb1.webp', 'https://tuchuang.voooe.cn/images/2023/01/02/yb2.webp', 'https://tuchuang.voooe.cn/images/2023/01/02/yb3.webp'],
            totalFlakes: '100',
            zIndex: '999999',
            maxSize: '30',
            maxDuration: '20',
            useFlakeTrans: false
        });
    });
}

// Event listeners to trigger new year countdown on page load and pjax complete
document.addEventListener('pjax:complete', newYear);
document.addEventListener('DOMContentLoaded', newYear);