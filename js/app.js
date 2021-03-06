(function(window) {
    var app = (function(document) {
        var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        var months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
        var dates = [''];
        var gap = 60;
        var currentCountryDate = new Date();
        var setCountry = $("#changeCountry").val();
        var timeZoneCountries = ["america", "india", "pakistan", "srilanka", "iran", "iraq", "utc"];
        var timeZoneOffsets = ["-6", "+5.5", "+5", "+5.5", "+3.5", "+3.2", "0"];

        var nextWeekButtonId, prevWeekButtonid, daysOfWeekId, currentMonthId, datesId, timeDisplayId, eventDisplayId, currentYearId, moveUpButtonId, moveDownButtonId, nextMonthButtonId, prevMonthButtonId;

        var setNextWeekButtonId = function(nextWeekButtonIdPar) {
            nextWeekButtonId = nextWeekButtonIdPar;
        };

        var setPrevWeekButtonId = function(prevWeekButtonIdPar) {
            prevWeekButtonId = prevWeekButtonIdPar;
        };

        var setNextMonthButtonId = function(nextMonthButtonIdPar) {
            nextMonthButtonId = nextMonthButtonIdPar;
        };

        var setPrevMonthButtonId = function(prevMonthButtonIdPar) {
            prevMonthButtonId = prevMonthButtonIdPar;
        };

        var setMoveUpButtonId = function(moveUpButtonIdPar) {
            moveUpButtonId = moveUpButtonIdPar;
        };

        var setMoveDownButtonId = function(moveDownButtonIdPar) {
            moveDownButtonId = moveDownButtonIdPar;
        };

        var setDaysOfWeekId = function(daysOfWeekIdPar) {
            daysOfWeekId = daysOfWeekIdPar;
        };

        var setDatesId = function(datesIdPar) {
            datesId = datesIdPar;
        };

        var setCurrentYearId = function(currentYearIdPar) {
            currentYearId = currentYearIdPar;
        };

        var setCurrentMonthId = function(currentMonthIdPar) {
            currentMonthId = currentMonthIdPar;
        };

        var setTimeDisplayId = function(timeDisplayIdPar) {
            timeDisplayId = timeDisplayIdPar;
        };

        var setEventDisplayId = function(eventDisplayIdPar) {
            eventDisplayId = eventDisplayIdPar;
        };

        var convertUtcToThis = function(time1, country) {
            var offset;
            var j = 0;
            for (var key in timeZoneCountries) {
                if (timeZoneCountries[key] == country) {
                    offset = timeZoneOffsets[j];
                } else {
                    j++;
                }
            }
            return parseInt(parseInt(time1) + parseInt((offset * 3600000)));
        };

        var convertThisToUtc = function(time, country) {
            var offset;
            var j = 0;
            for (var key in timeZoneCountries) {
                if (timeZoneCountries[key] == country) {
                    offset = timeZoneOffsets[j];
                } else {
                    j++;
                }
            }
            return parseInt(time) - parseInt((offset * 3600000));
        };

        var getCurrentUtcTime = function() {
            var x = new Date();
            var y = parseInt(x.getTimezoneOffset());
            var ans = Number(x) + (60 * y);
            return ans;
        };

        var setLocalStorage = function() {
            if (localStorage.getItem("calenderEvents")) {} else {
                localStorage.setItem('calenderEvents', '{"data":[]}');
            }
        };

        var addEvent = function(evnt, elem, func) {
            if (elem.addEventListener) // W3C DOM
                elem.addEventListener(evnt, func, false);
            else if (elem.attachEvent) { // IE DOM
                elem.attachEvent("on" + evnt, func);
            } else { // No much to do
                elem[evnt] = func;
            }
        };

        var createDaysOfWeeks = function() {
            var tempi = 0;
            var d = document.createDocumentFragment();
            for (var key in days) {
                var dayContainer = document.createElement('div');
                dayContainer.className = 'daysOfWeek';
                if (tempi == 6) {
                    dayContainer.className = 'daysOfWeek sunday';
                }
                var dayContainerEle = document.createElement('strong');
                dayContainerEle.innerHTML = days[key];
                dayContainer.appendChild(dayContainerEle);
                d.appendChild(dayContainer);
                tempi++;
            }
            return d;
        };

        var createDates = function(dateNumber, setCountry) {
            var adjustedTime = convertUtcToThis(dateNumber, setCountry);
            var d = new Date(adjustedTime);
            var date = d.getDate();
            var day = d.getDay();
            var year = d.getFullYear();
            var month = d.getMonth();

            var todayDate = new Date();

            var fr = document.createDocumentFragment();
            if (date >= day) {
                var startDate = date - day + 1;
                var temp = 0;
                var st = startDate;
                for (var i = 0; i < 7; i++) {
                    var dateContainer = document.createElement("div");
                    dateContainer.className = "dates";
                    if (i == 6) {
                        dateContainer.className = "dates lastdate";
                    }
                    // dateContainer.setAttribute("id","");
                    var textEle = document.createTextNode(startDate);
                    dateContainer.appendChild(textEle);
                    if (todayDate.getDate() == st && todayDate.getMonth() == month && todayDate.getFullYear() == year) {
                        dateContainer.setAttribute("style", "font-weight:bold");
                    }
                    if (temp == 0) {
                        //dateContainer.setAttribute("style","font-weight:bold"); 
                    } else {
                        dateContainer.setAttribute("style", "opacity:0.6");
                    }
                    fr.appendChild(dateContainer);
                    startDate++;
                    var x2 = new Date(year, month + 1, 0).getDate();
                    if (startDate > x2) {
                        temp = 1;
                        dateContainer.setAttribute("style", "opacity:0.6");
                        startDate = 1;
                    }
                    st++;
                }
            } else {
                var difference = day - date;
                var x2 = new Date(year, month, 0).getDate();
                var startDate2 = x2 - difference + 1;
                for (var i = 0; i < difference; i++) {
                    var dateContainer = document.createElement("div");
                    dateContainer.className = "dates";
                    // dateContainer.setAttribute("id","");
                    var textEle = document.createTextNode(startDate2);
                    dateContainer.setAttribute("style", "opacity:0.6");
                    dateContainer.appendChild(textEle);
                    fr.appendChild(dateContainer);
                    startDate2++;
                }
                var startDate = 1;
                for (var i = 0; i < 7 - difference; i++) {
                    var dateContainer = document.createElement("div");
                    dateContainer.className = "dates";
                    if (i == (6 - difference)) {
                        dateContainer.className = "dates lastdate";
                    }
                    // dateContainer.setAttribute("id","");
                    var textEle = document.createTextNode(startDate);
                    dateContainer.appendChild(textEle);
                    //dateContainer.setAttribute("style","font-weight:bold");
                    fr.appendChild(dateContainer);
                    startDate++;
                }
            }
            return fr;
        };

        var ifPresentEvent = function(frTime, edTime) {
            var check = 0;
            var x = JSON.parse(localStorage.getItem("calenderEvents"));
            for (var key in x.data) {
                var tempfr = convertUtcToThis(x.data[key].frTime, setCountry);
                var temped = convertUtcToThis(x.data[key].edTime, setCountry);
                if ((tempfr >= frTime && tempfr < edTime) || (temped > frTime && temped < edTime)) {
                    check = x.data[key].value;
                }
            }
            return check;
        };

        var createEventBoxesColumn = function(dateNumber, columnDate, country) {
            var boxesInOneColumn = parseInt(1440 / gap);
            var intervalInMilliSeconds = gap * 60 * 1000;
            var adjustedTime = convertUtcToThis(dateNumber, setCountry);
            var d1 = new Date(adjustedTime);
            var year = d1.getFullYear();
            var month = d1.getMonth();
            var tempDate = new Date(year, month, columnDate);
            var tempDateTime = Number(tempDate);
            tempDateTime = parseInt(convertUtcToThis(tempDateTime, setCountry));
            var prevTempDateTime = tempDateTime;

            while (1) {
                var c = new Date(tempDateTime);
                var str = c.toString();
                var strArr = str.split(" ");
                var timeText = strArr[4];

                var c3 = new Date(prevTempDateTime);
                var str3 = c3.toString();
                var strArr3 = str3.split(" ");
                var timeText3 = strArr3[4];

                if ((parseInt(timeText) == 23 && parseInt(timeText3) == 0) || (parseInt(timeText) == 0 && parseInt(timeText3) == 23)) {
                    if (timeText3 == "00:00:00") {
                        tempDateTime = parseInt(tempDateTime) + parseInt(intervalInMilliSeconds);
                    }
                    break;
                }
                prevTempDateTime = tempDateTime;
                var tempi = 0;
                for (var key in timeZoneCountries) {
                    if (timeZoneCountries[key] == country) {
                        if (timeZoneOffsets[tempi] > 0) {
                            tempDateTime = parseInt(tempDateTime) - parseInt(intervalInMilliSeconds);
                        } else {
                            tempDateTime = parseInt(tempDateTime) + parseInt(intervalInMilliSeconds);
                        }
                        break;
                    } else {
                        tempi++;
                    }
                }
            }
            var fr = document.createDocumentFragment();
            for (var i = 0; i < boxesInOneColumn; i++) {
                var checkPresence = 0;
                var sp;
                var spEdit;
                var eventId = columnDate + "-" + month + "-" + year + "-" + i + "hrs";
                var eventContainer = document.createElement('div');

                eventContainer.setAttribute("id", eventId);
                eventContainer.className = 'event';

                var frTime = parseInt(tempDateTime);
                var edTime = parseInt(tempDateTime) + parseInt(intervalInMilliSeconds);
                tempDateTime = tempDateTime + parseInt(intervalInMilliSeconds);

                eventContainer.setAttribute("from-time", frTime);
                eventContainer.setAttribute("end-time", edTime);

                var eventContainerEle = document.createElement('strong');
                eventContainerEle.setAttribute("contenteditable", "true");

                var value = ifPresentEvent(frTime, edTime);

                if (value) {
                    eventContainerEle.innerHTML = value;
                    eventContainerEle.setAttribute("class", "textOfEvent");
                    eventContainerEle.setAttribute("id", "te" + eventId);

                    sp = document.createElement("span");
                    sp.innerHTML = "&#x2718;";
                    sp.setAttribute("class", "cross");
                    sp.setAttribute("id", eventId);
                    checkPresence = 1;
                    eventContainer.setAttribute("style", "background-color:LightSteelBlue");
                } else {
                    eventContainer.setAttribute("style", "background-image: url('images/plus2.jpg')");
                    eventContainerEle.className = "blankTextOfEvent";
                    eventContainerEle.innerHTML = "";
                    eventContainerEle.setAttribute("id", "te" + eventId);
                }
                eventContainer.appendChild(eventContainerEle);
                if (checkPresence == 1) {
                    eventContainer.appendChild(sp);
                }
                fr.appendChild(eventContainer);
            }
            return fr;
        };

        var createTimeBoxes = function(dateNumber, columnDate, country) {
            var boxesInOneColumn = parseInt(1440 / gap);
            var adjustedTime = convertUtcToThis(dateNumber, setCountry);
            var d1 = new Date(adjustedTime);
            var year = d1.getFullYear();
            var month = d1.getMonth();
            var intervalInMilliSeconds = gap * 60 * 1000;
            var tempDate = new Date(year, month, columnDate);
            var tempDateTime = Number(tempDate);
            tempDateTime = parseInt(convertUtcToThis(tempDateTime, setCountry));
            var prevTempDateTime = tempDateTime;
            while (1) {
                var c = new Date(tempDateTime);
                var str = c.toString();
                var strArr = str.split(" ");
                var timeText = strArr[4];
                var c3 = new Date(prevTempDateTime);
                var str3 = c3.toString();
                var strArr3 = str3.split(" ");
                var timeText3 = strArr3[4];
                if ((parseInt(timeText) == 23 && parseInt(timeText3) == 0) || (parseInt(timeText) == 0 && parseInt(timeText3) == 23)) {
                    if (timeText3 == "00:00:00") {
                        tempDateTime = parseInt(tempDateTime) + parseInt(intervalInMilliSeconds);
                    }
                    break;
                }
                prevTempDateTime = tempDateTime;
                var tempi = 0;
                for (var key in timeZoneCountries) {
                    if (timeZoneCountries[key] == country) {
                        if (timeZoneOffsets[tempi] > 0) {
                            tempDateTime = parseInt(tempDateTime) - parseInt(intervalInMilliSeconds);
                            break;
                        } else {
                            tempDateTime = parseInt(tempDateTime) + parseInt(intervalInMilliSeconds);
                            break;
                        }
                    }
                    tempi++;
                }
            }
            var fr = document.createDocumentFragment();
            for (var i = 0; i < boxesInOneColumn; i++) {
                var c = new Date(tempDateTime);
                var timeContainer = document.createElement("div");
                timeContainer.className = "time";
                var id1 = "time" + i;
                timeContainer.setAttribute("id", id1);
                var timeContainerEle = document.createElement("strong");

                var str = c.toString();
                var strArr = str.split(" ");
                var timeText = strArr[4];

                var c1 = new Date(tempDateTime + parseInt(intervalInMilliSeconds));
                var str1 = c1.toString();
                var strArr1 = str1.split(" ");
                timeText = timeText + "-" + strArr1[4];
                timeContainerEle.innerHTML = timeText;
                timeContainer.appendChild(timeContainerEle);
                fr.appendChild(timeContainer);
                tempDateTime = parseInt(tempDateTime) + parseInt(intervalInMilliSeconds);
            }
            return fr;
        };

        var changeCurrentYear = function(id) {
            var d = new Date(parseInt(id));
            return d.getFullYear();
        };

        var changeCurrentMonth = function(id) {
            var d = new Date(parseInt(id));
            return months[d.getMonth()];
        };

        var bindForm = function(country) {
            var currentUtcTime = getCurrentUtcTime();
            setCountry = country;

            var prevWeekButtonInstance = document.getElementById(prevWeekButtonId);
            var nextWeekButtonInstance = document.getElementById(nextWeekButtonId);
            var prevMonthButtonInstance = document.getElementById(prevMonthButtonId);
            var nextMonthButtonInstance = document.getElementById(nextMonthButtonId);
            var moveUpButtonInstance = document.getElementById(moveUpButtonId);
            var moveDownButtonInstance = document.getElementById(moveDownButtonId);
            var daysOfWeekInstance = document.getElementById(daysOfWeekId);
            var currentYearValue = document.getElementById(currentYearId);
            var currentMonthValue = document.getElementById(currentMonthId);
            var timeDisplayInstance = document.getElementById(timeDisplayId);
            var eventDisplayInstance = document.getElementById(eventDisplayId);
            var datesInstance = document.getElementById(datesId);

            daysOfWeekInstance.innerHTML = "";
            daysOfWeekInstance.appendChild(createDaysOfWeeks());

            datesInstance.innerHTML = "";
            datesInstance.appendChild(createDates(currentUtcTime, setCountry));
            currentMonthValue.innerHTML = changeCurrentMonth(currentUtcTime);
            currentYearValue.innerHTML = changeCurrentYear(currentUtcTime);

            timeDisplayInstance.innerHTML = "";;
            timeDisplayInstance.appendChild(createTimeBoxes(currentUtcTime, 6, setCountry));

            eventDisplayInstance.innerHTML = "";
            for (var i = 0; i < 7; i++) {
                var columnDate = document.getElementById("dates").children[i].innerHTML;
                eventDisplayInstance.appendChild(createEventBoxesColumn(currentUtcTime, columnDate, setCountry));
            }

            addEvent('click', prevWeekButtonInstance, function(e) {
                currentUtcTime = currentUtcTime - 604800000;
                displayChange(currentUtcTime);
            });

            addEvent('click', nextWeekButtonInstance, function(e) {
                currentUtcTime = currentUtcTime + 604800000;
                displayChange(currentUtcTime);
            });

            addEvent('click', prevMonthButtonInstance, function(e) {
                var da = new Date(currentUtcTime);
                var year = da.getFullYear();
                var mon = da.getMonth();
                mon = mon - 1;
                if (mon < 0) {
                    year = year - 1;
                    mon = 11;
                }
                var ds = new Date(year, mon, 1);
                currentUtcTime = Number(ds);
                displayChange(currentUtcTime);
            });

            addEvent('click', nextMonthButtonInstance, function(e) {
                var da = new Date(currentUtcTime);
                var year = da.getFullYear();
                var mon = da.getMonth();
                mon = mon + 1;
                if (mon > 12) {
                    year = year + 1;
                }
                var ds = new Date(year, mon, 1);
                currentUtcTime = Number(ds);
                displayChange(currentUtcTime);
            });

            function displayChange(dd) {
                datesInstance.innerHTML = "";
                datesInstance.appendChild(createDates(dd, setCountry));
                var newMonth = new Date(dd);
                currentMonthValue.innerHTML = changeCurrentMonth(Number(dd));
                currentYearValue.innerHTML = changeCurrentYear(Number(dd));
                eventDisplayInstance.innerHTML = "";
                for (var i = 0; i < 7; i++) {
                    var xxx = document.getElementById("dates").children[i].innerHTML;
                    eventDisplayInstance.appendChild(createEventBoxesColumn(currentUtcTime, xxx, setCountry));
                }
                temp();
            }

            var deleteEvent = function(e) {
                var r = confirm("Are you sure you want to delete");
                var tempOffset = 0;
                if (r == true) {
                    var id1 = e.target.id;
                    var frTime1 = $("#" + e.target.id).attr("from-time");
                    var adjustedFrTime = convertThisToUtc(frTime1, setCountry);
                    var edTime1 = $("#" + e.target.id).attr("end-time");
                    var adjustedEdTime = convertThisToUtc(edTime1, setCountry);

                    $("#" + id1).css("background-image", "url('images/plus2.jpg')");
                    var x = JSON.parse(localStorage.getItem("calenderEvents"));
                    var ij = 0;
                    for (var key in x.data) {
                        if ((x.data[key].frTime >= adjustedFrTime && x.data[key].frTime < adjustedEdTime) || (x.data[key].edTime > adjustedFrTime && x.data[key].edTime <= adjustedEdTime)) {
                            if (x.data[key].frTime != adjustedFrTime) {
                                if ((x.data[key].frTime > adjustedFrTime && x.data[key].frTime < adjustedEdTime)) {
                                    tempFrTime = parseInt($("#" + e.target.id).attr("from-time")) + parseInt((60 * 60 * 1000));
                                    var x1 = "div[from-time='" + tempFrTime + "']";
                                    var tt = $(x1).children();
                                    $(tt[0]).html("");
                                    $(tt[0]).attr("class", "blankTextOfEvent");
                                    $(tt[1]).remove();
                                    $(x1).attr("style", "background-image: url('images/plus2.jpg')");
                                } else {
                                    tempFrTime = parseInt($("#" + e.target.id).attr("from-time")) - parseInt((60 * 60 * 1000));
                                    var x1 = "div[from-time='" + tempFrTime + "']";

                                    var tt = $(x1).children();

                                    $(tt[0]).html("");
                                    $(tt[0]).attr("class", "blankTextOfEvent");
                                    $(tt[1]).remove();
                                    $(x1).attr("style", "background-image: url('images/plus2.jpg')");
                                }
                            }
                            x.data.splice(ij, 1);
                            localStorage.setItem("calenderEvents", JSON.stringify(x));
                            document.getElementById(id1).children[0].innerHTML = "";
                            document.getElementById(id1).children[0].setAttribute("class", "blankTextOfEvent");
                            var ch = document.getElementById(id1);
                            ch.removeChild(ch.childNodes[1]);
                            break;
                        } else {
                            ij++;
                        }
                    }
                } else {}
            };

            var editEvent = function(e) {
                var text = $("#" + e.target.id).text();
                var frTime1 = $("#" + e.target.id).parent().attr("from-time");
                var adjustedFrTime = convertThisToUtc(frTime1, setCountry);
                var edTime1 = $("#" + e.target.id).parent().attr("end-time");
                var adjustedEdTime = convertThisToUtc(edTime1, setCountry);
                var x = JSON.parse(localStorage.getItem("calenderEvents"));
                var ij = 0;
                for (var key in x.data) {
                    if ((x.data[key].frTime >= adjustedFrTime && x.data[key].frTime < adjustedEdTime) || (x.data[key].edTime > adjustedFrTime && x.data[key].edTime <= adjustedEdTime)) {
                        if (x.data[key].frTime != adjustedFrTime) {
                            if ((x.data[key].frTime > adjustedFrTime && x.data[key].frTime < adjustedEdTime)) {
                                tempFrTime = parseInt($("#" + e.target.id).parent().attr("from-time")) + parseInt((60 * 60 * 1000));
                                var x1 = "div[from-time='" + tempFrTime + "']";
                                var tt = $(x1).children();
                                $(tt[0]).html(text);
                            } else {
                                tempFrTime = parseInt($("#" + e.target.id).parent().attr("from-time")) - parseInt((60 * 60 * 1000));
                                var x1 = "div[from-time='" + tempFrTime + "']";
                                var tt = $(x1).children();
                                $(tt[0]).html(text);
                            }
                        }
                        x.data[key].value = text;
                        localStorage.setItem("calenderEvents", JSON.stringify(x));
                        break;
                    } else {
                        ij++;
                    }
                }
            }

            var addNewEvent = function(e) {
                var text = $("#" + e.target.id).text();
                var id1 = e.target.id.split("te");
                var id = id1[1];
                if (text != "") {
                    $("#" + id).css("background-image", "");
                    var x = JSON.parse(localStorage.getItem("calenderEvents"));
                    var endTime = "";

                    var frTime = $("#" + id).attr("from-Time");
                    var edTime = $("#" + id).attr("end-Time");
                    var adjustedFrTime = convertThisToUtc(frTime, setCountry);
                    var adjustedEdTime = convertThisToUtc(edTime, setCountry);

                    var string = '{ "id":"' + id + '" , "value":"' + text + '" , "duration":"' + endTime + '" , "frTime":"' + adjustedFrTime + '" , "edTime":"' + adjustedEdTime + '"}';
                    x.data.push(JSON.parse(string));
                    localStorage.setItem("calenderEvents", JSON.stringify(x));

                    document.getElementById(id).children[0].innerHTML = text;
                    $("#" + id).css("background-image", "");
                    $("#" + id).css("background-color", "LightSteelBlue");

                    var sp = document.createElement("span");
                    sp.innerHTML = "&#x2718;";
                    sp.setAttribute("id", id);
                    sp.setAttribute("class", "cross");
                    $("#" + id).append(sp);
                    $("#" + e.target.id).removeClass("blankTextOfEvent").addClass("textOfEvent");
                } else {
                    $("#" + id).css("background-color", "");
                }
            };

            var showEventTime = function(e) {
                var frTime1 = $("#" + e.target.id).parent().attr("from-time");
                var edTime1 = $("#" + e.target.id).parent().attr("end-time");
                var x = JSON.parse(localStorage.getItem("calenderEvents"));
                for (var key in x.data) {
                    var adjustedFrTime = convertUtcToThis(x.data[key].frTime, setCountry);
                    var adjustedEdTime = convertUtcToThis(x.data[key].edTime, setCountry);
                    if ((adjustedFrTime >= frTime1 && adjustedFrTime < edTime1) || (adjustedEdTime > frTime1 && adjustedEdTime <= edTime1)) {
                        var datt1 = parseInt(adjustedFrTime);
                        var dat1 = new Date(parseInt(datt1));
                        var hours1 = dat1.getHours();
                        if (hours1 > 12) {
                            hours1 = hours1 - 12;
                        }
                        var min1 = dat1.getMinutes();
                        var datt2 = parseInt(adjustedEdTime);
                        var dat2 = new Date(parseInt(datt2));
                        var hours2 = dat2.getHours();
                        if (hours2 > 12) {
                            hours2 = hours2 - 12;
                        }
                        var min2 = dat2.getMinutes();
                        var ans = hours1 + ":" + min1 + "-" + hours2 + ":" + min2;
                        $("#currEvent1").show();
                        $("#currEvent2").show();
                        $("#currEvent2").html(ans);
                        break;
                    }
                }
            };

            var hideEventTime = function(e) {
                $("#currEvent1").hide();
                $("#currEvent2").hide();
                $("#currEvent2").html("");
            };

            $('#' + eventDisplayId).off().on('click', '.cross', deleteEvent);
            $('#' + eventDisplayId).on('blur', '.textOfEvent', editEvent);
            $("#" + eventDisplayId).on('blur', '.blankTextOfEvent', addNewEvent);
            $("#" + eventDisplayId).on('mouseenter', '.textOfEvent', showEventTime);
            $("#" + eventDisplayId).on('mouseleave', '.textOfEvent', hideEventTime);

            (function() {
                $("#nextWeekButton").mouseenter(function() {
                    $("#nextWeekButton").css("box-shadow", "10px 10px 5px #888888");
                });
                $("#nextWeekButton").mouseleave(function() {
                    $("#nextWeekButton").css("box-shadow", "initial");
                });
                $("#prevWeekButton").mouseenter(function() {
                    $("#prevWeekButton").css("box-shadow", "10px 10px 5px #888888");
                });
                $("#prevWeekButton").mouseleave(function() {
                    $("#prevWeekButton").css("box-shadow", "initial");
                });
                $("#nextMonthButton").mouseenter(function() {
                    $("#nextMonthButton").css("box-shadow", "10px 10px 5px #888888");
                });
                $("#nextMonthButton").mouseleave(function() {
                    $("#nextMonthButton").css("box-shadow", "initial");
                });
                $("#prevMonthButton").mouseenter(function() {
                    $("#prevMonthButton").css("box-shadow", "10px 10px 5px #888888");
                });
                $("#prevMonthButton").mouseleave(function() {
                    $("#prevMonthButton").css("box-shadow", "initial");
                });
            })();

            function displayCases(caseNumber) {
                var boxesInOneColumn = parseInt(1440 / gap);
                var totalBoxes = parseInt(boxesInOneColumn * 7);
                var startDisplay = 6 * (caseNumber);
                var tt = $("#eventDisplay").children();
                for (i = 0; i < totalBoxes; i++) {
                    if (i >= (startDisplay + (boxesInOneColumn * 0)) && i <= (startDisplay + (boxesInOneColumn * 0) + 5)) {
                        $(tt[i]).removeClass("eventHide").addClass("eventShow");
                    } else if (i >= (startDisplay + (boxesInOneColumn * 1)) && i <= (startDisplay + (boxesInOneColumn * 1) + 5)) {
                        $(tt[i]).removeClass("eventHide").addClass("eventShow");
                    } else if (i >= (startDisplay + (boxesInOneColumn * 2)) && i <= (startDisplay + (boxesInOneColumn * 2) + 5)) {
                        $(tt[i]).removeClass("eventHide").addClass("eventShow");
                    } else if (i >= (startDisplay + (boxesInOneColumn * 3)) && i <= (startDisplay + (boxesInOneColumn * 3) + 5)) {
                        $(tt[i]).removeClass("eventHide").addClass("eventShow");
                    } else if (i >= (startDisplay + (boxesInOneColumn * 4)) && i <= (startDisplay + (boxesInOneColumn * 4) + 5)) {
                        $(tt[i]).removeClass("eventHide").addClass("eventShow");
                    } else if (i >= (startDisplay + (boxesInOneColumn * 5)) && i <= (startDisplay + (boxesInOneColumn * 5) + 5)) {
                        $(tt[i]).removeClass("eventHide").addClass("eventShow");
                    } else if (i >= (startDisplay + (boxesInOneColumn * 6)) && i <= (startDisplay + (boxesInOneColumn * 6) + 5)) {
                        $(tt[i]).removeClass("eventHide").addClass("eventShow");
                    } else {
                        $(tt[i]).removeClass("eventShow").addClass("eventHide");
                    }
                }

                var tt2 = $("#timeDisplay").children();
                for (i = 0; i < boxesInOneColumn; i++) {
                    if (i >= startDisplay && i <= startDisplay + 5) {
                        $(tt2[i]).removeClass("eventHide").addClass("eventShow");
                    } else {
                        $(tt2[i]).removeClass("eventShow").addClass("eventHide");
                    }
                }
            }

            function changeShowHide() {
                $(".eventShow").show();
                $(".eventHide").hide();
            }
            var clickCount = 0;

            addEvent("click", moveDownButtonInstance, function() {
                clickCount = clickCount + 1;
                var numberOfSpans = ((1440 / gap) / 6);
                if (clickCount >= numberOfSpans - 1) {
                    $("#moveDownButton").css("cursor", "not-allowed");
                    clickCount = numberOfSpans - 1;
                } else {
                    $("#moveDownButton").css("cursor", "pointer");
                    $("#moveUpButton").css("cursor", "pointer");
                }
                displayCases(clickCount);
                changeShowHide();
            });

            addEvent("click", moveUpButtonInstance, function() {
                clickCount = clickCount - 1;
                if (clickCount <= 0) {
                    clickCount = 0;
                    $("#moveUpButton").css("cursor", "not-allowed");
                } else {
                    $("#moveUpButton").css("cursor", "pointer");
                    $("#moveDownButton").css("cursor", "pointer");
                }
                displayCases(clickCount);
                changeShowHide();
            });

            $("#changeCountry").on("change", function() {
                setCountry = this.value;
                app.bindForm(setCountry);
            });

            function displaycasestemp(caseNumber) {
                var boxesInOneColumn = parseInt(1440 / gap);
                var totalBoxes = boxesInOneColumn * 7;
                var startDisplay = 6 * (caseNumber);
                var tt = $("#eventDisplay").children();
                for (i = 0; i < totalBoxes; i++) {
                    if (i >= (startDisplay + (boxesInOneColumn * 0)) && i <= (startDisplay + (boxesInOneColumn * 0) + 5)) {
                        $(tt[i]).attr("class", "event eventShow");
                    } else if (i >= (startDisplay + (boxesInOneColumn * 1)) && i <= (startDisplay + (boxesInOneColumn * 1) + 5)) {
                        $(tt[i]).attr("class", "event eventShow");
                    } else if (i >= (startDisplay + (boxesInOneColumn * 2)) && i <= (startDisplay + (boxesInOneColumn * 2) + 5)) {
                        $(tt[i]).attr("class", "event eventShow");
                    } else if (i >= (startDisplay + (boxesInOneColumn * 3)) && i <= (startDisplay + (boxesInOneColumn * 3) + 5)) {
                        $(tt[i]).attr("class", "event eventShow");
                    } else if (i >= (startDisplay + (boxesInOneColumn * 4)) && i <= (startDisplay + (boxesInOneColumn * 4) + 5)) {
                        $(tt[i]).attr("class", "event eventShow");
                    } else if (i >= (startDisplay + (boxesInOneColumn * 5)) && i <= (startDisplay + (boxesInOneColumn * 5) + 5)) {
                        $(tt[i]).attr("class", "event eventShow");
                    } else if (i >= (startDisplay + (boxesInOneColumn * 6)) && i <= (startDisplay + (boxesInOneColumn * 6) + 5)) {
                        $(tt[i]).attr("class", "event eventShow");
                    } else {
                        $(tt[i]).attr("class", "event eventHide");
                    }
                }
                var tt2 = $("#timeDisplay").children();
                for (i = 0; i < boxesInOneColumn; i++) {
                    if (i >= startDisplay && i <= startDisplay + 5) {
                        $(tt2[i]).attr("class", "time eventShow");
                    } else {
                        $(tt2[i]).attr("class", "time eventHide");
                    }
                }
            }

            function temp() {
                var x = currentUtcTime;
                // var y=convertUtcToThis(x,setCountry);
                var tempdd = x;
                var tttt = new Date(tempdd);
                var temphour = tttt.getHours();
                var tempmin = tttt.getMinutes();
                if (temphour >= 0 && temphour < 6) {
                    clickCount = 0;
                    displaycasestemp(0);
                } else if (temphour >= 6 && temphour < 12) {
                    clickCount = 1;
                    displaycasestemp(1);
                } else if (temphour >= 12 && temphour < 18) {
                    clickCount = 2;
                    displaycasestemp(2);
                } else if (temphour >= 18 && temphour < 24) {
                    clickCount = 3;
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
            setPrevWeekButtonId: setPrevWeekButtonId,
            setNextWeekButtonId: setNextWeekButtonId,
            setPrevMonthButtonId: setPrevMonthButtonId,
            setNextMonthButtonId: setNextMonthButtonId,
            setMoveUpButtonId: setMoveUpButtonId,
            setMoveDownButtonId: setMoveDownButtonId,
            setDaysOfWeekId: setDaysOfWeekId,
            setCurrentYearId: setCurrentYearId,
            setCurrentMonthId: setCurrentMonthId,
            setEventDisplayId: setEventDisplayId,
            setTimeDisplayId: setTimeDisplayId,
            setDatesId: setDatesId,
            bindForm: bindForm,
            setLocalStorage: setLocalStorage
        };
    })(window.document);
    window.app = app;
})(window)
