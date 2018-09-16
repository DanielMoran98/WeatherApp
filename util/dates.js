
function dayOfWeek(daysAway) //Takes in a number and returns the name of the day X days away
{
   var date = new Date();
   dayNumber = (date.getDay() + daysAway) % 7 ;
   console.log(dayNumber)

   if(dayNumber == 0)
   {
     return "Sun"
   }else if(dayNumber == 1){
     return "Mon";
   }else if(dayNumber == 2){
     return "Tue";
   }else if(dayNumber == 3){
     return "Wed";
   }else if(dayNumber == 4){
     return "Thur";
   }else if(dayNumber == 5){
     return "Fri";
   }else if(dayNumber == 6){
     return "Sat";
   }
}

module.exports.dayOfWeek = dayOfWeek;
