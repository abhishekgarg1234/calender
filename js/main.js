(function(config, app){
	app.setCurrentYearId(config.currentYearId);
	app.setNextWeekButtonId(config.nextWeekButtonId);
	app.setPrevWeekButtonId(config.prevWeekButtonId);
	app.setNextMonthButtonId(config.nextMonthButtonId);
	app.setPrevMonthButtonId(config.prevMonthButtonId);
	app.setDaysOfWeekId(config.daysOfWeekId);
	app.setCurrentMonthId(config.currentMonthId);
	app.setTimeDisplayId(config.timeDisplayId);
	app.setEventDisplayId(config.eventDisplayId);
	app.setDatesId(config.datesId);
    app.bindForm();
})(window.config, window.app);