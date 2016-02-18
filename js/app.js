(function(window){
    var app = (function(document){
        var days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
        var months=['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
        var dates=[''];
        var dd;
        var currentCountryDate=new Date();


        var setCountry=$("#changeCountry").val();
        // console.log(setCountry);

        var timeZoneCountries=["america", "india" ,"pakistan","srilanka", "iran" ,"iraq","utc"];
        // var timeZoneOffsets  =["+6"   , "-5.5"  ,"-5"     ,"-5.5"     , "-3.5" ,"-3"];
        var timeZoneOffsets  =["-6"   , "+5.5"  ,"+5"     ,"+5.5"     , "+3.5" ,"+3.2", "0"];

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




        var convertUtcToThis=function(time1,country){
            var offset;
            var j=0;
            for(var key in timeZoneCountries){
                if(timeZoneCountries[key]==country){
                    offset=timeZoneOffsets[j];
                }
                else{
                    j++;
                }
            }
            return parseInt( parseInt(time1)+parseInt( (offset*3600000)) );
        };

        var convertThisToUtc=function(time,country){
            var offset;
            var j=0;
            for(var key in timeZoneCountries){
                if(timeZoneCountries[key]==country){
                    offset=timeZoneOffsets[j];
                }
                else{
                    j++;
                }
            }
            return parseInt(time)-parseInt( (offset*3600000));
        };

        var getCurrentUtcTime=function(){
            var x=new Date();
            var y = parseInt( x.getTimezoneOffset() );
            var ans=Number(x)+(60*y);
            return ans;
            // return x.getTime;
        };

        var setLocalStorage=function(){
            if(localStorage.getItem("calenderEvents")){
            }
            else{
                localStorage.setItem('calenderEvents','{"data":[]}');
            }
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
            var tempi=0;
            var d=document.createDocumentFragment();
            for(var key in days){
                var dayContainer            =  document.createElement('div');
                dayContainer.className      = 'daysOfWeek';
                if(tempi==6){
                   dayContainer.className      = 'daysOfWeek sunday'; 
                }
                var dayContainerEle         = document.createElement('strong');
                dayContainerEle.innerHTML   = days[key];
                dayContainer.appendChild(dayContainerEle);
                d.appendChild(dayContainer);
                tempi++;

            }
           return d;
        };

        var createDates=function(dateNumber){

            // if(setCountry!="india"){

            //     var tempi=0;
            //     for(var key in timeZoneCountries){
            //         if(timeZoneCountries[key]==setCountry){
            //             tempOffset=parseFloat(timeZoneOffsets[tempi]) - 5.5;
            //             break;
            //         }
            //         else{
            //             tempi++;
            //         }
            //     }
            //     var tempOffset=tempOffset*60*60*1000;



            //     dateNumber=dateNumber+tempOffset;
            // }

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
                    if(i==6){
                        dateContainer.className="dates lastdate";
                    }
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

                     if(i==(6-difference)){
                        dateContainer.className="dates lastdate";
                    }


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

        var createDates2=function(dateNumber,setCountry){
            var adjustedTime=convertUtcToThis(dateNumber,setCountry);

            var d=new Date(adjustedTime);
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
                    if(i==6){
                        dateContainer.className="dates lastdate";
                    }
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

                     if(i==(6-difference)){
                        dateContainer.className="dates lastdate";
                    }

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

        var ifPresentFromTime=function(frTime,edTime){
            var check=0;
            var x=JSON.parse(localStorage.getItem("calenderEvents"));
            for(var key in x.data){
                // if(x.data[key].frTime==frTime){
                if( (frTime>=x.data[key].frTime && frTime<x.data[key].edTime) || (edTime>x.data[key].frTime && edTime<x.data[key].edTime)  ){
                // if(frTime==x.data[key].frTime || edTime==x.data[key].edTime){
                // if(){
                    // console.log(frTime+"-"+x.data[key].frTime+"-"+x.data[key].edTime);
                    check=x.data[key].value;
                //}
                }
            }
            
            return check;
        };

        var setTimeAccToEvent=function(){

        };

        var ifPresentEvent=function(frTime,edTime){
            var check=0;
            var x=JSON.parse(localStorage.getItem("calenderEvents"));
            for(var key in x.data){
                var tempfr=convertUtcToThis(x.data[key].frTime,setCountry);
                var temped=convertUtcToThis(x.data[key].edTime,setCountry);
                if( (tempfr>=frTime && tempfr<edTime) || (temped>frTime && temped<edTime)    ){
                    check=x.data[key].value;
                }
            }
            return check;
        };

        var createEventBoxesColumn=function(columnDate,country){

            var tempi=0;
            for(var key in timeZoneCountries){
                if(timeZoneCountries[key]==country){
                    tempOffset=parseFloat(timeZoneOffsets[tempi]) - 5.5;
                    break;
                }
                else{
                    tempi++;
                }
            }
            var tempOffset=tempOffset*60*60*1000;

            var ndd=new Date(Number(dd));
            var year=ndd.getFullYear();
            var month=ndd.getMonth();
            var date=ndd.getDate();

            var tempDate = new Date(year, month, columnDate);
            var tempDateTime=Number(tempDate);
            var gap=60;

            var fr=document.createDocumentFragment();
            for(var i=0;i<24;i++){
                var checkPresence=0;
                var sp; var spEdit;
                var eventId=columnDate+"-"+month+"-"+year+"-"+i+"hrs";
                var eventContainer          =  document.createElement('div');
                                  
                eventContainer.setAttribute("id",eventId);
                eventContainer.className    =  'event';

                var frTime=tempDateTime;
                var edTime=tempDateTime+(gap*60000);
                tempDateTime=tempDateTime+(gap*60000);
                eventContainer.setAttribute("from-time",frTime);
                eventContainer.setAttribute("end-time",edTime);

                var eventContainerEle       =  document.createElement('strong');
                eventContainerEle.setAttribute("contenteditable","true");

                //var value=ifPresent(eventId);
                var value=ifPresentFromTime(frTime+tempOffset,edTime+tempOffset);

                if(value){
                    eventContainerEle.innerHTML =  value;
                    eventContainerEle.setAttribute("class","textOfEvent");
                    eventContainerEle.setAttribute("id","te"+eventId);

                    sp=document.createElement("span");
                    sp.innerHTML="&#x2718;";
                    sp.setAttribute("class","cross");
                    sp.setAttribute("id",eventId);
                    checkPresence=1;

                    eventContainer.setAttribute("style","background-color:LightSteelBlue");
                }
                else{
                        eventContainer.setAttribute("style","background-image: url('images/plus2.jpg')");
                        eventContainerEle.className="blankTextOfEvent";
                        eventContainerEle.innerHTML =  "";
                        eventContainerEle.setAttribute("id","te"+eventId);
                }

                    eventContainer.appendChild(eventContainerEle);
                    if(checkPresence==1){
                        eventContainer.appendChild(sp);
                    }
                    fr.appendChild(eventContainer);
                }
                return fr;
        };

        var createEventBoxesColumn2=function(dateNumber,columnDate,country){

            var boxesInOneColumn=24;
            var adjustedTime=convertUtcToThis(dateNumber,setCountry);
            var d1=new Date(adjustedTime);
            var year=d1.getFullYear();
            var month=d1.getMonth();
            // var currentCountryYear=currentCountryDate.getFullYear();
            // var CurrentCountryMonth=currentCountryDate.getMonth();

            // var tempDate = new Date(currentCountryYear, CurrentCountryMonth, columnDate);
            var tempDate=new Date(year,month,columnDate);

            var tempDateTime=Number(tempDate);
            // console.log(tempDateTime);

            tempDateTime=parseInt(convertUtcToThis(tempDateTime,setCountry));

            var prevTempDateTime=tempDateTime;

            while(1){

                var c=new Date(tempDateTime);
                var str=c.toString();
                var strArr=str.split(" ");

                var timeText=strArr[4];



                var c3=new Date(prevTempDateTime);
                var str3=c3.toString();
                var strArr3=str3.split(" ");

                var timeText3=strArr3[4];
                
                // if(parseInt(timeText)>=0 && parseInt(timeText)<1 ){
                if( (parseInt(timeText)==23 && parseInt(timeText3)==0)  || (parseInt(timeText)==0 && parseInt(timeText3)==23)) {
                    break;
                }
                // }


                prevTempDateTime=tempDateTime;
                
                // if(parseInt(timeText)>=0 && parseInt(timeText)<1 ){
                // // if(parseInt(timeText)<0){

                //     break;
                // }
                // tempDateTime=parseInt(tempDateTime)-parseInt((gap*60*1000));
                var tempi=0;
                for(var key in timeZoneCountries){
                    if(timeZoneCountries[key]==country){
                        if(timeZoneOffsets[tempi]>0){
                            tempDateTime=parseInt(tempDateTime)-3600000;
                        }
                        else{
                            tempDateTime=parseInt(tempDateTime)+3600000;
                        }
                        break;
                    }
                    else{
                        tempi++;
                    }
                
                }
            }
            var gap=60;

            var fr=document.createDocumentFragment();
            for(var i=0;i<boxesInOneColumn;i++){
                var checkPresence=0;
                var sp; 
                var spEdit;
                var eventId=columnDate+"-"+month+"-"+year+"-"+i+"hrs";
                var eventContainer          =  document.createElement('div');
                                  
                eventContainer.setAttribute("id",eventId);
                eventContainer.className    =  'event';

                var frTime=parseInt(tempDateTime);
                var edTime=parseInt(tempDateTime)+(gap*60000);
                tempDateTime=tempDateTime+(gap*60000);

                //this frtime is according to the country
                eventContainer.setAttribute("from-time",frTime);
                eventContainer.setAttribute("end-time",edTime);

                var eventContainerEle       =  document.createElement('strong');
                eventContainerEle.setAttribute("contenteditable","true");

                //var value=ifPresent(eventId);
                // var value=ifPresentFromTime(frTime,edTime);

                var value=ifPresentEvent(frTime,edTime);

                if(value){
                    eventContainerEle.innerHTML =  value;
                    eventContainerEle.setAttribute("class","textOfEvent");
                    eventContainerEle.setAttribute("id","te"+eventId);

                    sp=document.createElement("span");
                    sp.innerHTML="&#x2718;";
                    sp.setAttribute("class","cross");
                    sp.setAttribute("id",eventId);
                    checkPresence=1;

                    eventContainer.setAttribute("style","background-color:LightSteelBlue");
                }
                else{
                        eventContainer.setAttribute("style","background-image: url('images/plus2.jpg')");
                        eventContainerEle.className="blankTextOfEvent";
                        eventContainerEle.innerHTML =  "";
                        eventContainerEle.setAttribute("id","te"+eventId);
                }

                    eventContainer.appendChild(eventContainerEle);
                    if(checkPresence==1){
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

        var createTimeBoxes2=function(dateNumber,columnDate,country){
            var boxesInOneColumn=24;
            var adjustedTime=convertUtcToThis(dateNumber,setCountry);
            var d1=new Date(adjustedTime);
            var year=d1.getFullYear();
            var month=d1.getMonth();
            var gap=60;

            var tempDate=new Date(year,month,columnDate);

            var tempDateTime=Number(tempDate);

            tempDateTime=parseInt(convertUtcToThis(tempDateTime,setCountry));

            var prevTempDateTime=tempDateTime;
            // var c=new Date(tempDateTime);

            while(1){
                var c=new Date(tempDateTime);
                var str=c.toString();
                var strArr=str.split(" ");

                var timeText=strArr[4];



                var c3=new Date(prevTempDateTime);
                var str3=c3.toString();
                var strArr3=str3.split(" ");

                var timeText3=strArr3[4];
                
                // if(parseInt(timeText)>=0 && parseInt(timeText)<1 ){
                if( (parseInt(timeText)==23 && parseInt(timeText3)==0)  || (parseInt(timeText)==0 && parseInt(timeText3)==23)) {
                    break;
                }
                // }


                prevTempDateTime=tempDateTime;

                var tempi=0;
                for(var key in timeZoneCountries){
                    if(timeZoneCountries[key]==country){
                        if(timeZoneOffsets[tempi]>0){
                            tempDateTime=parseInt(tempDateTime)-(gap*60*1000);
                            break;
                        }
                        else{
                            tempDateTime=parseInt(tempDateTime)+(gap*60*1000);
                            break;
                        }
                    }
                tempi++;
                }
            }

            var fr=document.createDocumentFragment();
            for(var i=0;i<24;i++){
                var c=new Date(tempDateTime);
                var timeContainer=document.createElement("div");
                timeContainer.className="time";
                var id1="time"+i;
                timeContainer.setAttribute("id",id1);
                var timeContainerEle=document.createElement("strong");
                var str=c.toString();
                var strArr=str.split(" ");

                var timeText=strArr[4];

                var c1=new Date(tempDateTime+3600000);
                var str1=c1.toString();
                var strArr1=str1.split(" ");
                timeText=timeText+"-"+strArr1[4];


                // timeText=;


                timeContainerEle.innerHTML=timeText;
                timeContainer.appendChild(timeContainerEle);
                fr.appendChild(timeContainer);
                tempDateTime=parseInt(tempDateTime)+(gap*60000);


            }

            return fr;
        };

        var getTimeDisplay=function(){

            var fr=document.createDocumentFragment();
            var totalMinutes=24*60;
            var startTimeDisplay=0;
            var endTimeDisplay=startTimeDisplay+gap;
            var st1=0;
            var st2=0;


            var mid=boxesInOneColomn/2;

            for(var i=0;i<boxesInOneColomn;i++){

                var timeContainer=document.createElement("div");
                timeContainer.className="time";
                var id1="time"+i;
                timeContainer.setAttribute("id",id1);
                var timeContainerEle=document.createElement("strong");
                var timeText;
                                
                if(i<mid){
                    if(st2==60){
                        st1++;
                        st2=0;
                    }
                    stTime=st1+":"+st2+"am";
                    

                    if(st2+gap==60){
                        edTime=st1+1+":0am";
                    }
                    else{
                        var st22=st2+gap;
                        edTime=st1+":"+st22+"am";
                    }

                    timeText=stTime+" - "+edTime;
                    st2=st2+gap;
                }
                else{
                }
                

                /*
                var tempi=i;
                if(tempi<mid){
                    if(intervalGap>1){
                        stTime=;
                    }
                    else{
                        stTime=;
                    }
                    stTime=;
                    edTime=;
                    timeText=stTime+" - "+edTime;

                    timeText=x+":"+y+"am - "+j+":"+z+"am";
                    timeText=startTimeDisplay+"am - "+endTimeDisplay+"am";
                }
                else{
                    timeText=startTimeDisplay+"pm - "+endTimeDisplay+"pm";
                }
                */
                //startTimeDisplay=startTimeDisplay+gap;
                //endTimeDisplay=startTimeDisplay+gap;

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
        };

        var calcTime=function(country) {
            // console.log(country);
            var tempi=0;
            for(var key in timeZoneCountries){
                if(timeZoneCountries[key]==country){
                    offset=parseFloat(timeZoneOffsets[tempi]);
                    break;
                }
                else{
                    tempi++;
                }
            }

            d = new Date();

            var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

            var nd = new Date(utc + (3600000*offset));


            return Number(nd);
        };
               

        var bindForm    =   function(country){
            var currentUtcTime=getCurrentUtcTime();
            setCountry=country;

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
            dd=calcTime("india");

            daysOfWeekInstance.innerHTML="";

            daysOfWeekInstance.appendChild(createDaysOfWeeks());
            datesInstance.innerHTML="";
            datesInstance.appendChild(createDates2(currentUtcTime,setCountry));
            currentMonthValue.innerHTML = changeCurrentMonth(Number(dd));
            currentYearValue.innerHTML=changeCurrentYear(Number(dd));

            timeDisplayInstance.innerHTML="";;
            timeDisplayInstance.appendChild(createTimeBoxes2(currentUtcTime,6,setCountry));

            eventDisplayInstance.innerHTML="";
            for(var i=0;i<7;i++){
                var columnDate=document.getElementById("dates").children[i].innerHTML;
                eventDisplayInstance.appendChild(createEventBoxesColumn2(currentUtcTime,columnDate,setCountry));
            }

            addEvent('click',prevWeekButtonInstance,function(e){
               currentUtcTime=currentUtcTime-604800000;
               displayChange(currentUtcTime);

            }); 

            addEvent('click',nextWeekButtonInstance,function(e){
               currentUtcTime=currentUtcTime+604800000;
               displayChange(currentUtcTime);
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
               displayChange(dd);
            });

            function displayChange(dd){
                datesInstance.innerHTML="";
                // datesInstance.appendChild(createDates(dd));
                datesInstance.appendChild(createDates2(dd,setCountry));

                var newMonth=new Date(dd);
                currentMonthValue.innerHTML = changeCurrentMonth(Number(dd));
                currentYearValue.innerHTML  = changeCurrentYear(Number(dd));
                eventDisplayInstance.innerHTML="";
                for(var i=0;i<7;i++){
                var xxx=document.getElementById("dates").children[i].innerHTML;
                eventDisplayInstance.appendChild(createEventBoxesColumn2(currentUtcTime,xxx,setCountry));
                }

                temp();
            }

            var deleteEvent=function(e){
                var r=confirm("Are you sure you want to delete");
                var tempOffset=0;
                if(r==true){
                    var id1=e.target.id;
                    

                    var frTime1=$("#"+e.target.id).attr("from-time");
                    var adjustedFrTime=convertThisToUtc(frTime1,setCountry);
                    var edTime1=$("#"+e.target.id).attr("end-time");
                    var adjustedEdTime=convertThisToUtc(edTime1,setCountry);


                    $("#"+id1).css("background-image","url('images/plus2.jpg')");
                    var x=JSON.parse(localStorage.getItem("calenderEvents"));
                    var ij=0;
                    for(var key in x.data){                        
                        // if(x.data[key].id==id1){
                        // if(x.data[key].frTime==frTime){
                            if( (x.data[key].frTime>=adjustedFrTime && x.data[key].frTime<adjustedEdTime) || (x.data[key].edTime>adjustedFrTime && x.data[key].edTime<=adjustedEdTime)){

                            // if(x.data[key].frTime==adjustedFrTime){

                                if(x.data[key].frTime !=adjustedFrTime){

                                    if((x.data[key].frTime>adjustedFrTime && x.data[key].frTime<adjustedEdTime) ){
                                        console.log("if");
                                        tempFrTime=parseInt($("#"+e.target.id).attr("from-time") )+parseInt((60*60*1000));
                                        var x1="div[from-time='"+tempFrTime+"']";

                                        var tt=$(x1).children();

                                        $(tt[0]).html("");
                                        $(tt[0]).attr("class","blankTextOfEvent");
                                        $(tt[1]).remove();
                                         $(x1).attr("style","background-image: url('images/plus2.jpg')");

                                        
                                        // $(x1).html("");
                                        // $(x1).attr("class","blankTextOfEvent");
                                    }
                                    else{
                                        console.log("else");
                                        tempFrTime=parseInt($("#"+e.target.id).attr("from-time") )-parseInt((60*60*1000));
                                        var x1="div[from-time='"+tempFrTime+"']";

                                        var tt=$(x1).children();

                                        $(tt[0]).html("");
                                        $(tt[0]).attr("class","blankTextOfEvent");
                                        $(tt[1]).remove();
                                        $(x1).attr("style","background-image: url('images/plus2.jpg')");

                                        // $(x1).html("");
                                        // $(x1).attr("class","blankTextOfEvent");
                                    }
                                }

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
                }
                else{

                }
            };
            
            var handle4=function(e){
                /*
                var text=$("#"+e.target.id).text();
                var tempOffset=0;
                var id1=e.target.id;
                var frTime=$("#"+id1).attr("from-Time");
                    
                var tempi=0;
                for(var key in timeZoneCountries){
                    if(timeZoneCountries[key]==setCountry){
                        tempOffset=5.5-parseFloat(timeZoneOffsets[tempi]);
                        break;
                    }
                    else{
                        tempi++;
                    }
                }
                tempOffset=tempOffset*60*60*1000;
                frTime=frTime-tempOffset;

                var frTime1=$("#"+e.target.id).parent().attr("from-time")-tempOffset;
                var edTime1=$("#"+e.target.id).parent().attr("end-time")-tempOffset;


                $("#"+id1).css("background-image","url('images/plus2.jpg')");
                var x=JSON.parse(localStorage.getItem("calenderEvents"));
                var ij=0;
                for(var key in x.data){                        
                    if( (x.data[key].frTime>=frTime1 && x.data[key].frTime<edTime1) || (x.data[key].edTime>frTime1 && x.data[key].edTime<=edTime1)){
                        if(x.data[key].frTime !=frTime1){
                            if((x.data[key].frTime>frTime1 && x.data[key].frTime<edTime1) ){
                                tempFrTime=parseInt($("#"+e.target.id).parent().attr("from-time") )+parseInt((60*60*1000));
                                var x1="div[from-time='"+tempFrTime+"']";
                                var tt=$(x1).children();
                                $(tt[0]).html(text);
                            }
                            else{
                                tempFrTime=parseInt($("#"+e.target.id).parent().attr("from-time") )-parseInt((60*60*1000));
                                var x1="div[from-time='"+tempFrTime+"']";
                                var tt=$(x1).children();
                                $(tt[0]).html(text);
                            }
                        }
                        x.data[ij].value=text;
                        localStorage.setItem("calenderEvents",JSON.stringify(x));
                        break;
                    }
                    else{
                        ij++;
                    }
                } 
               
                */


                ///*
                var text=$("#"+e.target.id).text();
                var tempOffset=0;
                var id1=e.target.id;
                var frTime=$("#"+id1).parent().attr("from-Time");
                // if(setCountry!="india"){
                var tempi=0;
                for(var key in timeZoneCountries){
                    if(timeZoneCountries[key]==setCountry){
                        tempOffset=5.5-parseFloat(timeZoneOffsets[tempi]);
                        break;
                    }
                    else{
                        tempi++;
                    }
                }
                tempOffset=tempOffset*60*60*1000;
                frTime=frTime-tempOffset;

                var frTime1=$("#"+e.target.id).parent().attr("from-time")-tempOffset;
                var edTime1=$("#"+e.target.id).parent().attr("end-time")-tempOffset;
                var x=JSON.parse(localStorage.getItem("calenderEvents"));
                var ij=0;
                for(var key in x.data){
                    // if(x.data[key].id==id1){
                    // if(x.data[key].frTime==frTime){
                    if( (x.data[key].frTime>=frTime1 && x.data[key].frTime<edTime1) || (x.data[key].edTime>frTime1 && x.data[key].edTime<=edTime1)){

                        if(x.data[key].frTime !=frTime1){

                            if((x.data[key].frTime>frTime1 && x.data[key].frTime<edTime1) ){
                                tempFrTime=parseInt($("#"+e.target.id).parent().attr("from-time") )+parseInt((60*60*1000));
                                var x1="div[from-time='"+tempFrTime+"']";
                                var tempchild=$(x1).children();
                                $(tempchild[0]).html(text);
                                console.log("if");
                            }
                            else{
                                tempFrTime=parseInt($("#"+e.target.id).parent().attr("from-time") )-parseInt((60*60*1000));
                                var x1="div[from-time='"+tempFrTime+"']";
                                var tempchild=$(x1).children();
                                $(tempchild[0]).html(text);
                                console.log("else");
                            }
                        }
                        x.data[ij].value=text;
                        localStorage.setItem("calenderEvents",JSON.stringify(x));
                        // displayChange(dd);
                        break;
                    }
                    else{
                        ij++;
                    }
                }   


                //*/




                // $("#"+id1).css("background-color","");
                // displayChange(dd);   

                /*
                console.log("handle4");
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
                */
            };

            var editEvent=function(e){
                var text=$("#"+e.target.id).text();
                    var frTime1=$("#"+e.target.id).parent().attr("from-time");
                    var adjustedFrTime=convertThisToUtc(frTime1,setCountry);
                    var edTime1=$("#"+e.target.id).parent().attr("end-time");
                    var adjustedEdTime=convertThisToUtc(edTime1,setCountry);

                    var x=JSON.parse(localStorage.getItem("calenderEvents"));
                    var ij=0;
                    for(var key in x.data){                        
                            if( (x.data[key].frTime>=adjustedFrTime && x.data[key].frTime<adjustedEdTime) || (x.data[key].edTime>adjustedFrTime && x.data[key].edTime<=adjustedEdTime)){
                                if(x.data[key].frTime !=adjustedFrTime){

                                    if((x.data[key].frTime>adjustedFrTime && x.data[key].frTime<adjustedEdTime) ){
                                        console.log("if");
                                        tempFrTime=parseInt($("#"+e.target.id).parent().attr("from-time") )+parseInt((60*60*1000));
                                        var x1="div[from-time='"+tempFrTime+"']";
                                        var tt=$(x1).children();
                                        $(tt[0]).html(text);
                                    }
                                    else{
                                        console.log("else");
                                        tempFrTime=parseInt($("#"+e.target.id).parent().attr("from-time") )-parseInt((60*60*1000));
                                        var x1="div[from-time='"+tempFrTime+"']";
                                        var tt=$(x1).children();
                                        $(tt[0]).html(text);
                                    }
                                }
                                x.data[key].value=text;

                                localStorage.setItem("calenderEvents",JSON.stringify(x));
                                break;
                            }
                            else{
                                ij++;
                            }
                    }    
            }

            var addNewEventpr=function(e){
                console.log("handle5");
                var text=$("#"+e.target.id).text();
                var id1=e.target.id.split("te");
                var id=id1[1];
                if(text != ""){
                    $("#"+id).css("background-image","");
                    var x=JSON.parse(localStorage.getItem("calenderEvents"));
                    var endTime="";

                    var frTime=$("#"+id).attr("from-Time");
                    var edTime=$("#"+id).attr("end-Time");

                    // if(setCountry!="india"){
                        var tempOffset;
                        var tempi=0;
                        for(var key in timeZoneCountries){
                            if(timeZoneCountries[key]==setCountry){
                                tempOffset=5.5-parseFloat(timeZoneOffsets[tempi]);
                                // console.log(tempOffset);
                                break;
                            }
                            else{
                                tempi++;
                            }
                        }

                        tempOffset=tempOffset*60*60*1000;
                        console.log(tempOffset);


                        frTime=frTime-tempOffset;
                        edTime=edTime-tempOffset;
                    // }

                    var string='{ "id":"'+id+'" , "value":"'+text+'" , "duration":"'+endTime+'" , "frTime":"'+frTime+'" , "edTime":"'+edTime+'"}';
                    console.log(frTime+"-"+edTime);
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
            };

            var addNewEvent=function(e){
                console.log("addNewEvent");
                var text=$("#"+e.target.id).text();
                var id1=e.target.id.split("te");
                var id=id1[1];

                if(text != ""){
                    $("#"+id).css("background-image","");
                    var x=JSON.parse(localStorage.getItem("calenderEvents"));
                    var endTime="";

                    var frTime=$("#"+id).attr("from-Time");
                    var edTime=$("#"+id).attr("end-Time");
                    var adjustedFrTime=convertThisToUtc(frTime,setCountry);
                    var adjustedEdTime=convertThisToUtc(edTime,setCountry);

                    var string='{ "id":"'+id+'" , "value":"'+text+'" , "duration":"'+endTime+'" , "frTime":"'+adjustedFrTime+'" , "edTime":"'+adjustedEdTime+'"}';
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
            };

            var showEventTime=function(e){

                var frTime1=$("#"+e.target.id).parent().attr("from-time");
                
                var edTime1=$("#"+e.target.id).parent().attr("end-time");
                
                var x=JSON.parse(localStorage.getItem("calenderEvents"));
                
                for(var key in x.data){
                    var adjustedFrTime=convertUtcToThis(x.data[key].frTime,setCountry);
                    var adjustedEdTime=convertUtcToThis(x.data[key].edTime,setCountry);
                    if( (adjustedFrTime>=frTime1 && adjustedFrTime<edTime1) || (adjustedEdTime>frTime1 && adjustedEdTime<=edTime1)){

                        var datt1=parseInt(adjustedFrTime);
                        var dat1=new Date(parseInt(datt1));
                        var hours1=dat1.getHours();
                        if(hours1>12){
                            hours1=hours1-12;
                        }
                        var min1=dat1.getMinutes();

                        var datt2=parseInt(adjustedEdTime);
                        var dat2=new Date(parseInt(datt2));
                        var hours2=dat2.getHours();
                        if(hours2>12){
                            hours2=hours2-12;
                        }
                        var min2=dat2.getMinutes();

                        var ans=hours1+":"+min1+"-"+hours2+":"+min2;
                        $("#currEvent1").show();
                        $("#currEvent2").show();
                        $("#currEvent2").html(ans);
                        break;
                    }

                }
            };

            var hideEventTime=function(e){
                 $("#currEvent1").hide();
                        $("#currEvent2").hide();
                        $("#currEvent2").html("");
            };

            $('#'+eventDisplayId).off().on('click','.cross',deleteEvent);
            $('#'+eventDisplayId).on('blur' ,'.textOfEvent',editEvent);
            
            $("#"+eventDisplayId).on('blur','.blankTextOfEvent',addNewEvent);
            $("#"+eventDisplayId).on('mouseenter','.textOfEvent',showEventTime);
            $("#"+eventDisplayId).on('mouseleave','.textOfEvent',hideEventTime);

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
                intervalGap=boxesInOneColumn/24;
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

            function displayCases(caseNumber){
                console.log(caseNumber);
                var boxesInOneColomn=24;
                var totalBoxes=24*7;
                var startDisplay=6*(caseNumber);
                var tt=$("#eventDisplay").children();
                for(i=0;i<totalBoxes;i++){
                    
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
                }

                var tt2=$("#timeDisplay").children();
                for(i=0;i<boxesInOneColomn;i++){
                    if(i>=startDisplay && i<=startDisplay+5){
                        $(tt2[i]).removeClass("eventHide").addClass("eventShow");
                    }
                    else{
                        $(tt2[i]).removeClass("eventShow").addClass("eventHide");
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
                if(clickCount>=3){
                    $("#moveDownButton").css("cursor","not-allowed");
                    clickCount=3;
                }
                else{
                    $("#moveDownButton").css("cursor","pointer");
                    $("#moveUpButton").css("cursor","pointer");
                }
                displayCases(clickCount);
                changeShowHide();
            });

            addEvent("click",moveUpButtonInstance,function(){
                clickCount=clickCount-1;
                if(clickCount<=0){
                    clickCount=0;
                    $("#moveUpButton").css("cursor","not-allowed");
                }
                else{
                    $("#moveUpButton").css("cursor","pointer");
                    $("#moveDownButton").css("cursor","pointer");
                }
                displayCases(clickCount);
                changeShowHide();
            });

            $("#changeCountry").on("change",function(){
                setCountry=this.value;


                app.bindForm(setCountry);
            });



            function displaycasestemp(caseNumber){
                var boxesInOneColomn=24;
                var totalBoxes=24*7;
                var startDisplay=6*(caseNumber);
                var tt=$("#eventDisplay").children();
                for(i=0;i<totalBoxes;i++){
                    
                    if( i>=(startDisplay+(boxesInOneColomn*0)) && i<=(startDisplay+(boxesInOneColomn*0)+5) ){
                        $(tt[i]).attr("class","event eventShow");
                    }
                    else if( i>=(startDisplay+(boxesInOneColomn*1)) && i<=(startDisplay+(boxesInOneColomn*1)+5) ){
                        $(tt[i]).attr("class","event eventShow");
                    }
                    else if( i>=(startDisplay+(boxesInOneColomn*2)) && i<=(startDisplay+(boxesInOneColomn*2)+5) ){
                        $(tt[i]).attr("class","event eventShow");
                    }
                    else if( i>=(startDisplay+(boxesInOneColomn*3)) && i<=(startDisplay+(boxesInOneColomn*3)+5) ){
                        $(tt[i]).attr("class","event eventShow");
                    }
                    else if( i>=(startDisplay+(boxesInOneColomn*4)) && i<=(startDisplay+(boxesInOneColomn*4)+5) ){
                        $(tt[i]).attr("class","event eventShow");
                    }
                    else if( i>=(startDisplay+(boxesInOneColomn*5)) && i<=(startDisplay+(boxesInOneColomn*5)+5) ){
                        $(tt[i]).attr("class","event eventShow");
                    }
                    else if( i>=(startDisplay+(boxesInOneColomn*6)) && i<=(startDisplay+(boxesInOneColomn*6)+5) ){
                        $(tt[i]).attr("class","event eventShow");
                    }
                    else{
                        $(tt[i]).attr("class","event eventHide");
                    }
                }

                var tt2=$("#timeDisplay").children();
                for(i=0;i<boxesInOneColomn;i++){
                    if(i>=startDisplay && i<=startDisplay+5){
                        $(tt2[i]).attr("class","time eventShow");
                    }
                    else{
                        $(tt2[i]).attr("class","time eventHide");
                    }
                }
            }

            function temp(){
               var x=currentUtcTime;
               // var y=convertUtcToThis(x,setCountry);


                var tempdd=x;
                var tttt=new Date(tempdd);
                console.log(tempdd);
                var temphour=tttt.getHours();
                if(temphour>=0 && temphour<6){
                    // console.log("case0");
                    clickCount=0;
                    displaycasestemp(0);

                }
                else if(temphour>=6 && temphour<12){
                    // console.log("case1");
                    clickCount=1;
                    displaycasestemp(1);
                }
                else if(temphour>=12 && temphour<18){
                    // console.log("case2");
                    clickCount=2;
                    displaycasestemp(2);
                }
                else if(temphour>=18 && temphour<24){
                    // console.log("case3");
                    clickCount=3;
                    displaycasestemp(3);
                }
                /*
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
                */
                changeShowHide();
            }
            temp();

            $("#currEvent2").hide();
            $("#currEvent1").hide();
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