var nowdate = new Date(); // 获取当前时间

var formatNowDate = getDateTime(nowdate)

var year = nowdate.getFullYear();
var month = nowdate.getMonth();

var calcDate = new Date(year, month)
templateDate(calcDate)

function showDate() {
  templateDate(calcDate)
  $('.date').removeClass('hide')
}

function templateDate (date) {
  $('.current-data-year').html(date.getFullYear())
  $('.current-data-month').html(getMonth(date))
  var oldDate = $('.travel-date').html() ? $('.travel-date').html().split('(')[0].trim(): $('.travel-date').html()
  if (date.getMonth() === nowdate.getMonth()) {
    $('.data-left').addClass('disable')
  }else {
    $('.data-left').removeClass('disable')
  }
  $('.action').empty()
  // 填充日历面板
  var template = '<ul class=\'week border-bottom\'><li>\u65E5</li><li>\u4E00</li><li>\u4E8C</li><li>\u4E09</li><li>\u56DB</li><li>\u4E94</li><li>\u516D</li></ul><ul class="day f-small"></ul>';
  // var template = `<div class="action mt10"><div class="title tac c-blue"><div class="y">${calcDate.getFullYear()}</div><div class="m">${(calcDate.getMonth() + 1)}</div></div>`;
  $('.action').append(template)
  var days = getDays(date); // 当月天数
  var nowweek = date.getDay(); // 当月1号是星期几
  for (var i = 0; i < days + nowweek; i++) {
    var template = '';
    // 空白填充
    if (i < nowweek) {
      template = '<li></li>';
    } else if (i < nowdate.getDate() + nowweek - 1 && date.getMonth() === nowdate.getMonth()) {
      // 当月已经过去的日期 不能点击
      template = `<li class="disable">${(i - nowweek + 1)}</li>`;
    } else {
      var day = (i - nowweek + 1)
      day = day >= 10 ? day : `0${day}`
      var current = `${date.getFullYear()}-${getMonth(date)}-${day}`
      if (current == oldDate) {
        template = `<li date-date="${current}" class="active">${(i - nowweek + 1)}</li>`;
      }else {
        template = `<li date-date="${current}">${(i - nowweek + 1)}</li>`;
      }
      // template = '<li date-date="' + date.getFullYear() + '-' + getMonth(date) + '-' + day + '">' + (i - nowweek + 1) + '</li>';
    }
    $('.action').find('.day').append(template);
    $('.date .day li[date-date]').click(function() {
      $('.date').addClass('hide')
      var value = $(this).attr('date-date').trim()
      if (value == formatNowDate) {
        $('.travel-date').html(`${formatNowDate}   (今天)`)
      } else {
        $('.travel-date').html(value)
      }
    })
  }
}

  
// 获取当月天数
function getDays(date) {
  //构造当前日期对象
  var date = date;
  //获取年份
  var year = date.getFullYear();
  //获取当前月份
  var mouth = date.getMonth() + 1;
  //定义当月的天数；
  var days;
  //当月份为二月时，根据闰年还是非闰年判断天数
  if (mouth == 2) {
    days = year % 4 == 0 ? 29 : 28;
  } else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
    //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
    days = 31;
  } else {
    //其他月份，天数为：30.
    days = 30;
  }
  return days;
}
// 获取num个月的时间数据
function getNextMonth(num) {

  var year =  $('.current-data-year').html()
  var month =  $('.current-data-month').html() -1
  month += num
  if (month == 12) {
    year ++
    month = 0
  }else if (month == -1) {
    month = 11
    year--
  }
  var data = new Date(year, month);
  return data
}
$('.data-left').click(function() {
  if($(this).hasClass('disable')) return
  var newDate = getNextMonth(-1)
  templateDate(newDate)
 
})
$('.data-right').click(function() {
  if($(this).hasClass('disable')) return
  var newDate = getNextMonth(1)
  templateDate(newDate)
})
