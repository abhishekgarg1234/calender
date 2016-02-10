(function(window){
    var app = (function(document){
        var days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
        var months=['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
        var dates=[''];
        var nextWeekButtonId, prevWeekButtonid, daysOfWeekId, currentMonthId, datesId,timeDisplayId, eventDisplayId,currentYearId,moveUpButtonId,moveDownButtonId,nextMonthButtonId,prevMonthButtonId;

        var setNextWeekButtonId = function(nextWeekButtonIdPar){
             nextWeekButtonId   = nextWeekButtonIdPar;
        };

        var setPrevWeekButtonId = function(prevWeekButtonIdPar){
            prevWeekButtonId    = prevWeekButtonIdPar;
        };

        var setNextMonthButtonId = function(nextMonthButtonIdPar){
             nextMonthButtonId   = nextMonthButtonIdPar;
        };

        var setPrevMonthButtonId = function(prevMonthButtonIdPar){
            prevMonthButtonId    = prevMonthButtonIdPar;
        };

        var setMoveUpButtonId = function(moveUpButtonIdPar){
             moveUpButtonId   = moveUpButtonIdPar;
        };

        var setMoveDownButtonId = function(moveDownButtonIdPar){
            moveDownButtonId    = moveDownButtonIdPar;
        };

        var setDaysOfWeekId     = function(daysOfWeekIdPar){
            daysOfWeekId        = daysOfWeekIdPar;
        };

        var setDatesId          = function(datesIdPar){
            datesId             = datesIdPar;
        };

        var setCurrentYearId    = function(currentYearIdPar){
            currentYearId       = currentYearIdPar;
        };

        var setCurrentMonthId   = function(currentMonthIdPar){
            currentMonthId      = currentMonthIdPar;
        };

        var setTimeDisplayId    = function(timeDisplayIdPar){
            timeDisplayId       = timeDisplayIdPar;
        };

        var setEventDisplayId   = function(eventDisplayIdPar){
            eventDisplayId      = eventDisplayIdPar;
        };

        var setLocalStorage=function(){
            if(localStorage.getItem("calenderEvents")){
            }
            else{
                localStorage.setItem('calenderEvents','{"data":[]}');
            }
        }
    
        var addEvent    =   function(evnt, elem, func) {

            if (elem.addEventListener)  // W3C DOM
                elem.addEventListener(evnt,func,false);
            else if (elem.attachEvent) { // IE DOM
                elem.attachEvent("on"+evnt, func);
            }
            else { // No much to do
                elem[evnt] = func;
            }
        };

        var createDaysOfWeeks=function(){
            var d=document.createDocumentFragment();
            for(var key in days){
                var dayContainer            =  document.createElement('div');
                dayContainer.className      = 'daysOfWeek';
                var dayContainerEle         = document.createElement('strong');
                dayContainerEle.innerHTML   = days[key];
                dayContainer.appendChild(dayContainerEle);
                d.appendChild(dayContainer);
            }
           return d;
        };

        var createDates=function(dateNumber){
            var d=new Date(dateNumber);
            var date=d.getDate();
            var day=d.getDay();
            var year=d.getFullYear();
            var month=d.getMonth();

            var todayDate=new Date();


            var fr=document.createDocumentFragment();
            if(date>=day){
                var startDate=date-day+1;
                var temp=0;
                var st=startDate;
                for(var i=0;i<7;i++){

                    var dateContainer=document.createElement("div");
                    dateContainer.className="dates";
                    // dateContainer.setAttribute("id","");
                    var textEle=document.createTextNode(startDate);
                    dateContainer.appendChild(textEle);
                    if(todayDate.getDate()==st && todayDate.getMonth()==month && todayDate.getFullYear()==year){
                        dateContainer.setAttribute("style","font-weight:bold");
                    }

                    if(temp==0){
                       //dateContainer.setAttribute("style","font-weight:bold"); 
                    }
                    else{
                        dateContainer.setAttribute("style","opacity:0.6");
                    }
                    
                    fr.appendChild(dateContainer);
                    startDate++;
                    var x2= new Date(year,month+1,0).getDate();
                    if(startDate>x2){
                        temp=1;
                        dateContainer.setAttribute("style","opacity:0.6");
                        startDate=1;
                    }
                    st++;
                }                
            }
            else{
                var difference=day-date;
                var x2= new Date(year,month,0).getDate();
                var startDate2=x2-difference+1;
                for(var i=0;i<difference;i++){
                     var dateContainer=document.createElement("div");
                     dateContainer.className="dates";
                        // dateContainer.setAttribute("id","");
                     var textEle=document.createTextNode(startDate2);
                     dateContainer.setAttribute("style","opacity:0.6");
                     dateContainer.appendChild(textEle);
                     fr.appendChild(dateContainer);
                     startDate2++;
                }
                var startDate=1;
                for(var i=0;i<7-difference;i++){
                     var dateContainer=document.createElement("div");
                     dateContainer.className="dates";
                     // dateContainer.setAttribute("id","");
                     var textEle=document.createTextNode(startDate);
                     dateContainer.appendChild(textEle);
                     //dateContainer.setAttribute("style","font-weight:bold");
                     fr.appendChild(dateContainer);
                     startDate++;
                }
            }
            return fr;
        };

        var ifPresent=function(eid){
            var check=0;
            var x=JSON.parse(localStorage.getItem("calenderEvents"));
            for(var key in x.data){
                if(x.data[key].id==eid){
                    check=x.data[key].value;
                    if(check==""){
                    }
                }
            }
            
            return check;
        };

        var createEventBoxesColumn=function(time){
            var year=$("#currentYear").html();
            var month=months.indexOf($("#currentMonth").html());
            var date=$("#timeDisplay").children();

            var fr=document.createDocumentFragment();
            for(var i=0;i<24;i++){
                var xxx=0;
                var sp;var spEdit;
                var eventId=time+"-"+month+"-"+year+"-"+i+"hrs";

                var eventContainer          =  document.createElement('div');
                              
                eventContainer.setAttribute("id",eventId);
                eventContainer.className    =  'event';

                var eventContainerEle       =  document.createElement('strong');
                eventContainerEle.setAttribute("contenteditable","true");
                
                var value=ifPresent(eventId);
                if(value){
                    eventContainerEle.innerHTML =  value;
                    eventContainerEle.setAttribute("class","textOfEvent");
                    eventContainerEle.setAttribute("id","te"+eventId);


                    sp=document.createElement("span");
                    sp.innerHTML="&#x2718;";
                    sp.setAttribute("class","cross");
                    sp.setAttribute("id",eventId);
                    xxx=1;

                    eventContainer.setAttribute("style","background-color:LightSteelBlue");
                }
                else{
                    eventContainer.setAttribute("style","background-image: url('images/plus2.jpg')");
                    eventContainerEle.className="blankTextOfEvent";
                    eventContainerEle.innerHTML =  "";
                    eventContainerEle.setAttribute("id","te"+eventId);
                }
                
                eventContainer.appendChild(eventContainerEle);
                if(xxx==1){
                    //eventContainer.appendChild(spEdit);
                    eventContainer.appendChild(sp);
                }
                fr.appendChild(eventContainer);
            }
            return fr;
        };

        var createTimeBoxes=function(interval){
            var diff=60/interval;
            var last=24*diff;
            var fr=document.createDocumentFragment();
            for(var i=0;i<last;i++){
                var timeContainer=document.createElement("div");
                timeContainer.className="time";
                var id1="time"+i;
                timeContainer.setAttribute("id",id1);
                var timeContainerEle=document.createElement("strong");
                var timeText;
                var ii1=i;
                if(ii1<12){
                    var j=ii1+1;
                    if(ii1==0){
                        ii1=12;
                    }
                    if(j==12){
                        timeText=ii1+"am - "+j+"pm";
                    }
                    else{
                        timeText=ii1+"am - "+j+"am";
                    }
                }
                else{
                    ii=ii1-12;
                    var j=ii+1;
                    if(ii==0){
                        ii=12;
                    }
                    if(j==12){
                        timeText=ii+"pm - "+j+"am";
                    }
                    else{
                        timeText=ii+"pm - "+j+"pm";
                    }                    
                }

                //timeContainerEle.innerHTML=i+"hrs";
                timeContainerEle.innerHTML=timeText;
                timeContainer.appendChild(timeContainerEle);
                fr.appendChild(timeContainer);
            }
            return fr;
        };

        var changeCurrentYear=function(id){
            var d=new Date(parseInt(id));
            return d.getFullYear();
        };

        var changeCurrentMonth=function(id){
            var d=new Date(parseInt(id));
            return months[d.getMonth()];
        };

        var createDuration=function(eid){
            var fr=document.createDocumentFragment();
            var arr=eid.split("-");
            var xx=arr[arr.length-1].split("hrs");
            var startTime=parseInt(xx[0]);
            for(var i=startTime+1;i<=24;i++){
                var d=document.createElement("option");
                d.setAttribute("value",i);
                var ht=document.createTextNode(i);
                d.appendChild(ht);
                fr.appendChild(d);
            }
            return fr;
        }
       

        var bindForm    =   function(){

            var prevWeekButtonInstance   =   document.getElementById(prevWeekButtonId);
            var nextWeekButtonInstance   =   document.getElementById(nextWeekButtonId);
            var prevMonthButtonInstance  =   document.getElementById(prevMonthButtonId);
            var nextMonthButtonInstance  =   document.getElementById(nextMonthButtonId);
            var moveUpButtonInstance     =   document.getElementById(moveUpButtonId);
            var moveDownButtonInstance   =   document.getElementById(moveDownButtonId);
            var daysOfWeekInstance       =   document.getElementById(daysOfWeekId);
            var currentYearValue         =   document.getElementById(currentYearId);
            var currentMonthValue        =   document.getElementById(currentMonthId);
            var timeDisplayInstance      =   document.getElementById(timeDisplayId);
            var eventDisplayInstance     =   document.getElementById(eventDisplayId);
            var datesInstance            =   document.getElementById(datesId);

            $("#top").hide();
            $("#top2").hide();
            var dd=new Date();

            daysOfWeekInstance.appendChild(createDaysOfWeeks());
            datesInstance.appendChild(createDates(Number(dd)));
            currentMonthValue.innerHTML = changeCurrentMonth(Number(dd));
            currentYearValue.innerHTML=changeCurrentYear(Number(dd));            
            //passing interval as a argument in function to create time boxes
            timeDisplayInstance.appendChild(createTimeBoxes(60));

            for(var i=0;i<7;i++){
                var xxx=document.getElementById("dates").children[i].innerHTML;
                eventDisplayInstance.appendChild(createEventBoxesColumn(xxx));
            }

            addEvent('click',prevWeekButtonInstance,function(e){
               datesInstance.innerHTML="";
               datesInstance.appendChild(createDates(Number(dd)-604800000));
               dd=Number(dd)-604800000;
               displayChange(dd);
            }); 

            addEvent('click',nextWeekButtonInstance,function(e){
               datesInstance.innerHTML="";
               dd=Number(dd)+604800000;
               displayChange(dd);
            });

            addEvent('click',prevMonthButtonInstance,function(e){
                var da=new Date(dd);
                var year=da.getFullYear();
                var mon=da.getMonth();
                mon=mon-1;
                if(mon<0){
                    year=year-1;
                    mon=11;
                }
                var ds=new Date(year,mon,1);
                dd=Number(ds);
               datesInstance.innerHTML="";
               displayChange(dd);
            }); 

            addEvent('click',nextMonthButtonInstance,function(e){
                var da=new Date(dd);
                var year=da.getFullYear();
                var mon=da.getMonth();
                mon=mon+1;
                if(mon>12){    
                    year=year+1;
                }
                var ds=new Date(year,mon,1);
                dd=Number(ds);
               datesInstance.innerHTML="";
               displayChange(dd);
            });

            function displayChange(dd){
                datesInstance.innerHTML="";
                datesInstance.appendChild(createDates(dd));
                var newMonth=new Date(dd);
                currentMonthValue.innerHTML = changeCurrentMonth(Number(dd));
                currentYearValue.innerHTML  = changeCurrentYear(Number(dd));
                eventDisplayInstance.innerHTML="";
                for(var i=0;i<7;i++){
                var xxx=document.getElementById("dates").children[i].innerHTML;
                eventDisplayInstance.appendChild(createEventBoxesColumn(xxx));
                
                }
                temp();
            }

            var handle2=function(e){
                console.log("handle2");
                console.log(e.target.id);
                var r=confirm("Are you sure you want to delete");
                if(r==true){
                    var id1=e.target.id;
                    $("#"+id1).css("background-image","url('images/plus2.jpg')");
                    var x=JSON.parse(localStorage.getItem("calenderEvents"));
                    var ij=0;
                    for(var key in x.data){                        
                        if(x.data[key].id==id1){
                            x.data.splice(ij,1);
                            localStorage.setItem("calenderEvents",JSON.stringify(x));
                            document.getElementById(id1).children[0].innerHTML="";
                            document.getElementById(id1).children[0].setAttribute("class","blankTextOfEvent");
                            var ch=document.getElementById(id1);
                            ch.removeChild(ch.childNodes[1]);
                            break;
                        }
                        else{
                            ij++;
                        }
                    }
                    $("#"+id1).css("background-color","");
                }
                else{

                }
            };
            
            var handle4=function(e){
                var text=$("#"+e.target.id).text();
                var x=JSON.parse(localStorage.getItem("calenderEvents"));
                var ttt=e.target.id.split("te");
                var id=ttt[1];
                for(var key in x.data){
                            if(x.data[key].id==id){
                                x.data[key].value=text;
                            }
                        }
                localStorage.setItem("calenderEvents",JSON.stringify(x));
            }

            var handle5=function(e){
                var text=$("#"+e.target.id).text();
                var id1=e.target.id.split("te");
                var id=id1[1];
                if(text != ""){
                    $("#"+id).css("background-image","");
                    var x=JSON.parse(localStorage.getItem("calenderEvents"));                      
                    var endTime="";
                    var string='{ "id":"'+id+'","value":"'+text+'","duration":"'+endTime+'"}';
                    x.data.push(JSON.parse(string));
                    localStorage.setItem("calenderEvents",JSON.stringify(x));

                    document.getElementById(id).children[0].innerHTML = text;
                    $("#"+id).css("background-image","");
                    $("#"+id).css("background-color","LightSteelBlue");

                    var sp=document.createElement("span");
                    sp.innerHTML="&#x2718;";
                    sp.setAttribute("id",id);
                    sp.setAttribute("class","cross");
                    $("#"+id).append(sp);
                    $("#"+e.target.id).removeClass("blankTextOfEvent").addClass("textOfEvent");
                }
                else{
                    $("#"+id).css("background-color","");
                }
            }

            $('#'+eventDisplayId).on('click','.cross',handle2);
            $('#'+eventDisplayId).on('blur' ,'.textOfEvent',handle4);
            $("#"+eventDisplayId).on('blur','.blankTextOfEvent',handle5);

            (function (){
                $("#nextWeekButton").mouseenter(function(){
                $("#nextWeekButton").css("box-shadow","10px 10px 5px #888888");});

                $("#nextWeekButton").mouseleave(function(){
                $("#nextWeekButton").css("box-shadow", "initial");});

                $("#prevWeekButton").mouseenter(function(){
                $("#prevWeekButton").css("box-shadow","10px 10px 5px #888888");});

                $("#prevWeekButton").mouseleave(function(){
                $("#prevWeekButton").css("box-shadow", "initial");});

                $("#nextMonthButton").mouseenter(function(){
                $("#nextMonthButton").css("box-shadow","10px 10px 5px #888888");});
                
                $("#nextMonthButton").mouseleave(function(){
                $("#nextMonthButton").css("box-shadow", "initial");});

                $("#prevMonthButton").mouseenter(function(){
                $("#prevMonthButton").css("box-shadow","10px 10px 5px #888888");});

                $("#prevMonthButton").mouseleave(function(){
                $("#prevMonthButton").css("box-shadow", "initial");});
            })();







            /*
            function setIntervalData(gap){
                boxesInOneColomn=(60*24)/gap;
                totalBoxes=boxesInOneColomn*7;
            }
            //setIntervalData(60);
            function displayCases(caseNumber){
                var startDisplay=6*(caseNumber);

                for(i=0;i<totalBoxes;i++){
                    var tt=$("#eventDisplay").children();
                    if( i>=(startDisplay+(boxesInOneColomn*0)) && i<=(startDisplay+(boxesInOneColomn*0)+5) ){
                        $(tt[i]).removeClass("eventHide").addClass("eventShow");
                    }
                    else if( i>=(startDisplay+(boxesInOneColomn*1)) && i<=(startDisplay+(boxesInOneColomn*1)+5) ){
                        $(tt[i]).removeClass("eventHide").addClass("eventShow");
                    }
                    else if( i>=(startDisplay+(boxesInOneColomn*2)) && i<=(startDisplay+(boxesInOneColomn*2)+5) ){
                        $(tt[i]).removeClass("eventHide").addClass("eventShow");
                    }
                    else if( i>=(startDisplay+(boxesInOneColomn*3)) && i<=(startDisplay+(boxesInOneColomn*3)+5) ){
                        $(tt[i]).removeClass("eventHide").addClass("eventShow");
                    }
                    else if( i>=(startDisplay+(boxesInOneColomn*4)) && i<=(startDisplay+(boxesInOneColomn*4)+5) ){
                        $(tt[i]).removeClass("eventHide").addClass("eventShow");
                    }
                    else if( i>=(startDisplay+(boxesInOneColomn*5)) && i<=(startDisplay+(boxesInOneColomn*5)+5) ){
                        $(tt[i]).removeClass("eventHide").addClass("eventShow");
                    }
                    else if( i>=(startDisplay+(boxesInOneColomn*6)) && i<=(startDisplay+(boxesInOneColomn*6)+5) ){
                        $(tt[i]).removeClass("eventHide").addClass("eventShow");
                    }
                    else{
                        $(tt[i]).removeClass("eventShow").addClass("eventHide");
                    }
                    $(".eventHide").hide();
                    $(".eventShow").show();
                }
            }
            //displayCases();
            */





            function displayCase0(){
                        for(i=0;i<168;i++){
                            var tt=$("#eventDisplay").children();
                            if(i>=0 && i<=5){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else if(i>=24 && i<=29){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else if(i>=48 && i<=53){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else if(i>=72 && i<=77){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else if(i>=96 && i<=101){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else if(i>=120 && i<=125){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else if(i>=144 && i<=149){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else{
                                $(tt[i]).removeClass("eventShow").addClass("eventHide");
                            }
                        }
                        for(i=0;i<24;i++){
                            var tt=$("#timeDisplay").children();
                            if(i>=0 && i<=5){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else{
                                $(tt[i]).removeClass("eventShow").addClass("eventHide");
                            }
                        }
            }
            function displayCase1(){

                        for(i=0;i<168;i++){
                            var tt=$("#eventDisplay").children();
                            if(i>=6 && i<=11){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else if(i>=30 && i<=35){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else if(i>=54 && i<=59){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else if(i>=78 && i<=83){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else if(i>=102 && i<=107){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else if(i>=126 && i<=131){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else if(i>=150 && i<=155){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else{
                                $(tt[i]).removeClass("eventShow").addClass("eventHide");
                            }
                        }
                        for(i=0;i<24;i++){
                            var tt=$("#timeDisplay").children();
                            if(i>=6 && i<=11){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else{
                                $(tt[i]).removeClass("eventShow").addClass("eventHide");
                            }
                        }
            }
            function displayCase2(){
    for(i=0;i<168;i++){
                            var tt=$("#eventDisplay").children();
                            if(i>=12 && i<=17){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else if(i>=36 && i<=41){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else if(i>=60 && i<=65){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else if(i>=84 && i<=89){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else if(i>=108 && i<=113){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else if(i>=132 && i<=137){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else if(i>=156 && i<=161){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else{
                                $(tt[i]).removeClass("eventShow").addClass("eventHide");
                            }
                        }
                        for(i=0;i<24;i++){
                            var tt=$("#timeDisplay").children();
                            if(i>=12 && i<=17){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else{
                                $(tt[i]).removeClass("eventShow").addClass("eventHide");
                            }
                        }
            }
            function displayCase3(){
    
                        for(i=0;i<168;i++){
                            var tt=$("#eventDisplay").children();
                            if(i>=18 && i<=23){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else if(i>=42 && i<=47){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else if(i>=66 && i<=71){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else if(i>=90 && i<=95){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else if(i>=114 && i<=119){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else if(i>=138 && i<=143){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else if(i>=162 && i<=167){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else{
                                $(tt[i]).removeClass("eventShow").addClass("eventHide");
                            }
                        }
                        for(i=0;i<24;i++){
                            var tt=$("#timeDisplay").children();
                            if(i>=18 && i<=23){
                                $(tt[i]).removeClass("eventHide").addClass("eventShow");
                            }
                            else{
                                $(tt[i]).removeClass("eventShow").addClass("eventHide");
                            }
                        }
            }
            function changeShowHide(){
                $(".eventShow").show();
                $(".eventHide").hide();
            }
            var clickCount=0;

            addEvent("click",moveDownButtonInstance,function(){
                clickCount=clickCount+1;
                if(clickCount>3){
                    clickCount=3;
                }
                switch(clickCount){
                    case 0:
                        displayCase0();
                        changeShowHide();                            
                        break;
                    case 1:
                        displayCase1();
                        changeShowHide();
                        break;
                    case 2:
                        displayCase2();
                        changeShowHide();
                        break;
                    case 3:
                        displayCase3();
                        changeShowHide();
                        break;
                    default:
                }
            });

            addEvent("click",moveUpButtonInstance,function(){
                clickCount=clickCount-1;
                if(clickCount<0){
                    clickCount=0;
                }
                switch(clickCount){
                    case 0:
                        displayCase0();
                        changeShowHide();
                        break;
                    case 1:
                        displayCase1();
                        changeShowHide();
                        break;
                    case 2:
                        displayCase2();
                        changeShowHide();
                        break;
                    case 3:
                        displayCase3();                       
                        changeShowHide();
                        break;
                    default:
                }
            });
            function temp(){
                for(i=0;i<168;i++){
                    var tt=$("#eventDisplay").children();
                    if(i>=0 && i<=5){
                        $(tt[i]).attr("class","event eventShow");
                    }
                    else if(i>=24 && i<=29){
                        $(tt[i]).attr("class","event eventShow");
                    }
                    else if(i>=48 && i<=53){
                        $(tt[i]).attr("class","event eventShow");
                    }
                    else if(i>=72 && i<=77){
                        $(tt[i]).attr("class","event eventShow");
                    }
                    else if(i>=96 && i<=101){
                        $(tt[i]).attr("class","event eventShow");
                    }
                    else if(i>=120 && i<=125){
                        $(tt[i]).attr("class","event eventShow");
                    }
                    else if(i>=144 && i<=149){
                        $(tt[i]).attr("class","event eventShow");
                    }
                    else{
                        $(tt[i]).attr("class","event eventHide");
                    }
                }
                for(i=0;i<24;i++){
                    var tt=$("#timeDisplay").children();
                    if(i>=0 && i<=5){
                        $(tt[i]).attr("class","time eventShow");
                    }
                    else{
                        $(tt[i]).attr("class","time eventHide");
                    }
                }
                changeShowHide();
            }
            temp();
        };
                
        return {
            setPrevWeekButtonId  : setPrevWeekButtonId,
            setNextWeekButtonId  : setNextWeekButtonId,
            setPrevMonthButtonId : setPrevMonthButtonId,
            setNextMonthButtonId : setNextMonthButtonId,
            setMoveUpButtonId    : setMoveUpButtonId,
            setMoveDownButtonId  : setMoveDownButtonId,
            setDaysOfWeekId      : setDaysOfWeekId,
            setCurrentYearId     : setCurrentYearId,
            setCurrentMonthId    : setCurrentMonthId,
            setEventDisplayId    : setEventDisplayId,
            setTimeDisplayId     : setTimeDisplayId,
            setDatesId           : setDatesId,
            bindForm             : bindForm,
            setLocalStorage      : setLocalStorage
        };

    })(window.document);

    window.app =   app;
})(window)