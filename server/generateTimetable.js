const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const DAY_DURATION = 12;
const STARTING_TIME = 8;

module.exports = {
    /**JSON FORMAT:
     * timetable = {
     *      "monday": 
     *      [
     *          {
     *              time: 8,
     *              classes = [] (array of class instances)
     *          }
     *      ]
     * }
     */
    generateRandomTimetable(db_connect) {
        var timetable = {}
        //Instantiate Empty Timetable Array with 1 Hour slot for each day
        for (i in DAYS) {
            console.log(DAYS[i]);
            timetable[DAYS[i]] = []
            for (var j = 0; j < DAY_DURATION; j++){
                timetable[DAYS[i]][j] = { time: STARTING_TIME+j, classes: []}
            }
        }

        /**1. Go through each unit
         * 2. For each unit, go through room type
         * 3. For each room type, create class instance of that duration
         * 4. Find a random building of that roomtype and add building information to class instance
         * 5. Choose random time and day, add it corresponding field in timetable object
         */
        
        
        return timetable;
    }
}