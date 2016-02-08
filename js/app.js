(function(window){
    var app = (function(document){
        var days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
        var months=['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
        var dates=[''];
        var nextWeekButtonId, prevWeekButtonid, daysOfWeekId, currentMonthId, datesId,timeDisplayId, eventDisplayId,currentYearId;

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
            var fr=document.createDocumentFragment();
            if(date>=day){
                var startDate=date-day+1;
                for(var i=0;i<7;i++){
                    var dateContainer=document.createElement("div");
                    dateContainer.className="dates";
                    // dateContainer.setAttribute("id","");
                    var textEle=document.createTextNode(startDate);
                    dateContainer.appendChild(textEle);
                    fr.appendChild(dateContainer);
                    startDate++;
                    var x2= new Date(year,month+1,0).getDate();
                    if(startDate>x2){
                        startDate=1;
                    }
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
                }
            }
            return check;
        };

        var createEventBoxesRow=function(time){
            var year=$("#currentYear").html();
            var month=months.indexOf($("#currentMonth").html());
            var date=$("#dates").children();
            
            var d=document.createDocumentFragment();
            for(var i=0;i<7;i++){
                var eventId=date[i].innerHTML+"-"+month+"-"+year+"-"+time;

                var eventContainer          =  document.createElement('div');              
                eventContainer.setAttribute("id",eventId);
                eventContainer.className    =  'event';

                var eventContainerEle       =  document.createElement('strong');
                var value=ifPresent(eventId);
                if(value){
                    eventContainerEle.innerHTML =  value;
                    eventContainer.setAttribute("style","background-color:LightSteelBlue");
                }
                else{
                    eventContainerEle.innerHTML =  "-";
                }
                eventContainer.appendChild(eventContainerEle);
                d.appendChild(eventContainer);
            }
            return d;
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
                timeContainerEle.innerHTML=i+"hrs";
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
            for(var i=0;i<24;i++){
                var xxx=document.getElementById("timeDisplay").children[i].children[0].innerHTML;
                eventDisplayInstance.appendChild(createEventBoxesRow(xxx));               
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
                datesInstance.appendChild(createDates(dd));
                var newMonth=new Date(dd);
                currentMonthValue.innerHTML = changeCurrentMonth(Number(dd));
                currentYearValue.innerHTML  = changeCurrentYear(Number(dd));
                eventDisplayInstance.innerHTML="";
                for(var i=0;i<24;i++){
                    var xxx=document.getElementById("timeDisplay").children[i].children[0].innerHTML;
                    eventDisplayInstance.appendChild(createEventBoxesRow(xxx));               
                };
            }
           

            $("#eventAdd").bind("click",function(event){
                var id=$("#eventInputText").attr("data-id-val");
                var check=ifPresent(id);
                var x=JSON.parse(localStorage.getItem("calenderEvents"));
                var text=$("#eventInputText").val();
                if(text==""){
                    if(check==0){
                    }
                    else{
                        var ij=0;
                        for(var key in x.data){                        
                            if(x.data[key].id==id){
                                x.data.splice(ij,1);
                                localStorage.setItem("calenderEvents",JSON.stringify(x));
                                document.getElementById(id).children[0].innerHTML="-";
                                $("#"+id).css("background-color","");
                                break;
                            }
                            else{
                                ij++;
                            }
                        }
                    }
                }
                else{
                    if(check==0){
                        var endTime=$( "#endingTime option:selected" ).text();                       
                        var string='{ "id":"'+id+'","value":"'+text+'","duration":"'+endTime+'"}';
                        x.data.push(JSON.parse(string));   
                    }
                    else{        
                        for(var key in x.data){
                            if(x.data[key].id==id){
                                x.data[key].value=text;
                            }
                        }
                    }
                    localStorage.setItem("calenderEvents",JSON.stringify(x));
                    document.getElementById(id).children[0].innerHTML = text;
                    $("#"+id).css("background-color","LightSteelBlue");
                }
                $("#eventInputText").val("");
                $("#top").hide(500);
            });

            $("#deleteEvent").bind("click",function(event){
                var id1=$("#deleteEvent").attr("data-id-val");
                var x=JSON.parse(localStorage.getItem("calenderEvents"));
                    var ij=0;
                    for(var key in x.data){                        
                        if(x.data[key].id==id1){
                            x.data.splice(ij,1);
                            localStorage.setItem("calenderEvents",JSON.stringify(x));
                            document.getElementById(id1).children[0].innerHTML="-";
                            break;
                        }
                        else{
                            ij++;
                        }
                    }
                    $("#"+id1).css("background-color","");
                    $("#top").hide();
            });

            function addEventText(popx){
                $("#eventAdd").html("Create");
                $("#top").show(500);
                $("#deleteEvent").hide();
                $("#eventInputText").attr("data-id-val",popx);
                $("#eventAdd").attr("data-id-ok",popx);
                $("#eventDate").html(popx);
                $("#endingTime").attr("data-id-sel",popx);
                $("#endingTime").empty();
                var xx=createDuration(popx);
                $("#endingTime").append(xx);     
            }

            function deleteEventText(popx2){
                $("#eventAdd").html("Change");
                $("#top").show(500);
                $("#deleteEvent").show(500);
                $("#eventInputText").attr("data-id-val",popx2);
                $("#eventAdd").attr("data-id-ok",popx2);
                $("#deleteEvent").attr("data-id-val",popx2);
                $("#endingTime").attr("data-id-val",popx2);
                $("#endingTime").empty();
                var xx=createDuration(popx2);
                $("#endingTime").append(xx);
                var defText=document.getElementById(popx2).children[0].innerHTML;
                $("#eventInputText").val(defText);
                $("#eventDate").html(popx2);
            }
          
            var handle=function(e){
                if(document.getElementById(e.target.id).children[0].innerHTML == "-"){
                    addEventText(e.target.id);
                }
                else{
                    deleteEventText(e.target.id);  
                }
            };
            addEvent('click',eventDisplayInstance,handle);
 

                };
                
        return {
            setPrevWeekButtonId : setPrevWeekButtonId,
            setNextWeekButtonId : setNextWeekButtonId,
            setPrevMonthButtonId : setPrevMonthButtonId,
            setNextMonthButtonId : setNextMonthButtonId,
            setDaysOfWeekId     : setDaysOfWeekId,
            setCurrentYearId    : setCurrentYearId,
            setCurrentMonthId   : setCurrentMonthId,
            setEventDisplayId    : setEventDisplayId,
            setTimeDisplayId    : setTimeDisplayId,
            setDatesId          : setDatesId,
            bindForm            : bindForm
        };

    })(window.document);

    window.app =   app;
})(window);