// first challenge
function createEmployeeRecord(array) {
return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
    }
}

// second challenge
function createEmployeeRecords(arrays) {
    const arrayOfEmployees = []
    for (let element of arrays) {
    let newEmployee = createEmployeeRecord(element)
    arrayOfEmployees.push(newEmployee)
    }
    return arrayOfEmployees
}

// event creator for challenges 3 & 4

function newEventCreator(dateTimeStamp) {
    const dateTime = dateTimeStamp.split(" ")
    const newEvent = {
        hour: parseInt(dateTime[1]),
        date: dateTime[0]
    }
    return newEvent
}

  // challenge 3

function createTimeInEvent(dateTimeStamp) {
    const newEvent = newEventCreator(dateTimeStamp)
    this.timeInEvents.push(newEvent)
    let eventArray = this.timeInEvents[0]
    eventArray.type = "TimeIn"
    return this
}

// challenge 4

function createTimeOutEvent(dateTimeStamp) {
    const newEvent = newEventCreator(dateTimeStamp)
    this.timeOutEvents.push(newEvent)
    let eventArray = this.timeOutEvents[0]
    eventArray.type = "TimeOut"
    return this
}

// challenge 5

function hoursWorkedOnDate(dateStamp) {
    const timeInEvents = this.timeInEvents
    const timeOutEvents = this.timeOutEvents
    
    let foundInEvent = timeInEvents.find((event) => event.date === dateStamp)
    let foundOutEvent = timeOutEvents.find((event) => event.date === dateStamp)
    return Math.abs((foundInEvent.hour - foundOutEvent.hour) / 100)
}

// challenge 6

function wagesEarnedOnDate(dateStamp) {
    let hours = hoursWorkedOnDate.call(this, dateStamp)
    
    return hours * this.payPerHour
}

/*
We're giving you this function. Take a look at it, you might see some usage
that's new and different. That's because we're avoiding a well-known, but
sneaky bug that we'll cover in the next few lessons!

As a result, the lessons for this function will pass *and* it will be available
for you to use if you need it!
 */

// challenge 7

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

// challenge 8

function findEmployeeByFirstName(array, firstName) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].firstName === firstName) {
            return array[i]
            } else return undefined
        }
}

// challenge 9

function calculatePayroll(arrayOfEmployees) {
    console.log(arrayOfEmployees)
    let sum = 0
    for (let i = 0; i < arrayOfEmployees.length; i++) {
    sum += allWagesFor.call(arrayOfEmployees[i])
    }
    return sum
}

const csvDataEmployees = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300]
]

const csvTimesIn = [
    ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Loki", ["2018-01-01 0700", "2018-01-02 0700", "2018-01-03 0600"]],
    ["Natalia", ["2018-01-03 1700", "2018-01-05 1800", "2018-01-03 1300"]],
    ["Darcey", ["2018-01-01 0700", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Jarvis", ["2018-01-01 0500", "2018-01-02 0500", "2018-01-03 0500"]],
    ["Anthony", ["2018-01-01 1400", "2018-01-02 1400", "2018-01-03 1400"]]
]

const csvTimesOut = [
    ["Thor", ["2018-01-01 1600", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Loki", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Natalia", ["2018-01-03 2300", "2018-01-05 2300", "2018-01-03 2300"]],
    ["Darcey", ["2018-01-01 1300", "2018-01-02 1300", "2018-01-03 1300"]],
    ["Jarvis", ["2018-01-01 1800", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Anthony", ["2018-01-01 1600", "2018-01-02 1600", "2018-01-03 1600"]]
]

let employeeRecords = createEmployeeRecords(csvDataEmployees)
employeeRecords.forEach(function (rec) {
    let timesInRecordRow = csvTimesIn.find(function (row) {
    return rec.firstName === row[0]
    })

    let timesOutRecordRow = csvTimesOut.find(function (row) {
    return rec.firstName === row[0]
    })

    timesInRecordRow[1].forEach(function(timeInStamp){
    createTimeInEvent.call(rec, timeInStamp)
    })

    timesOutRecordRow[1].forEach(function(timeOutStamp){
    createTimeOutEvent.call(rec, timeOutStamp)
    })
}) 

console.log(calculatePayroll(employeeRecords))