$(function () {
    $(window).scroll(function () {
        if (document.documentElement.scrollTop > 0 || document.body.scrollTop > 0) {
            $('#logo').addClass('animation');
        } else {
            $('#logo').removeClass('animation');
        }
    });

    $('#menu-btn').click(function () {
        $('#menu').toggleClass('show');
    });

    $.ajax({
        url: "https://www.zhangtt.cn/oi/getCoursesExhibitionList?pagesize=50&pagenum=0", //json文件位置
        type: "GET", //请求方式为get
        dataType: "json", //返回数据格式为json
        success: function (data) { //请求成功完成后要执行的方法 
            //each循环 使用$.each方法遍历返回的数据date
            var html = '';
            $.each(data, function (i, item) {
                html += '<a href="detail.html?id=' + item._id + '" class="list">'
                html += '<img src="' + item.head_image + '" />'
                html += '<div class="info">'
                html += '<div class="title">'
                html += item.name
                html += '</div>'
                html += '<div class="details">'
                html += item.brief
                html += ' </div>'
                html += '<div class="time">'
                html += item.time
                html += '</div>'
                html += '<div class="author">'
                html += item.teamname
                html += '</div>'
                html += '</div>'
                html += '</a>'
            });
            $('.list-container').html(html);
        }
    })
})