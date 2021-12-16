/*!
 * author:T-yang
 *
 * Date: 2021/4/24
 */
//时间
    function time() {
        //获取date
        var now = new Date();
	    var utc8DiffMinutes = now.getTimezoneOffset() + 480;
   	    now.setMinutes(now.getMinutes() + utc8DiffMinutes)
        //div内容
        var week = getWeek(now);
	document.getElementById('showtime').innerHTML = checkTime(now.getHours()) + ":" + checkTime(now.getMinutes())+"<br/>";
        document.getElementById('showdate').innerHTML= "<br/>"+checkTime(now.getMonth()+1) + "/" +checkTime(now.getDate())+"    "+week;
        getSht20();
        setTimeout(time,60000);

    }

    function checkTime(i)
    {
        if (i<10)
        {
            i="0" + i;
        }
        return i;
    }
    function getWeek (now) {
						var weekday = new Array(7)
						weekday[0] = "SUN"
						weekday[1] = "Mon"
						weekday[2] = "Tues"
						weekday[3] = "WED"
						weekday[4] = "Thur"
						weekday[5] = "Fri"
						weekday[6] = "SAT"

						return weekday[now.getDay()];
					}
	

	function getEn(){
         	  var apiurl = "/kindle/api/v2/quote/quotes/today/"
          	 $.ajax({
         	      type: "get",
               	url: apiurl,
               dataType: "",

               success: function (d) {
		       t_div = document.getElementById('todayEnglish');
		       t_div.innerHTML=d.data.content+"<br/>"+d.data.translation; 
                   },
               error: function () {
			t_div = document.getElementById('todayEnglish');
		       t_div.innerHTML="If I know what love is,it is because of you.<br/>因为你，我懂得了爱"; 

               }
           });
	}
	function getSht20(){
         	  var apiurl = "/kindle/temp"
          	 $.ajax({
         	      type: "get",
               	url: apiurl,
               dataType: "",

               success: function (d) {
		       var data = eval('('+d+')');
		       console.log(data);
		       temp = document.getElementById('temp');
		       humid = document.getElementById('humid');
		       temp.innerHTML=data.temp+"\u2103"; 
		       humid.innerHTML=data.humid+"%";
                   },
               error: function () {
			   t_div = document.getElementById('temp');
               h_div = document.getElementById('humid');
		       t_div.innerHTML="Null"; 
               h_div.innerHTML="Null";
               }
           }); 
       }
