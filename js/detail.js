function menuClick() {
    var menu = document.getElementById('menu');
    menu.classList.toggle('show');
}

$(function () {
    var id = window.location.search.substr(window.location.search.indexOf('=') + 1, window.location.search.length);
    $.ajax({
        url: "https://www.zhangtt.cn/oi/getCoursesExhibitionDetail?id=" + id, //json文件位置
        type: "GET", //请求方式为get
        dataType: "json", //返回数据格式为json
        success: function (data) { //请求成功完成后要执行的方法 
            //each循环 使用$.each方法遍历返回的数据date
            $('#logo').html(data[0].name + " by " + data[0].teamname);
            $('.head-image > img').attr("src", data[0].head_image);
            $('.detail').html(data[0].detail);
            $('.names').html(data[0].members);
            $('.teachers').html(data[0].teacher);
            $('.go').attr('href', data[0].url);
        }
    })
})