
// convert seconds to miliseconds
const SecondsTomiliseconds = (s) => {
  return s*1000
}

const minutesToMiliseconds = (minutes) => {
  return minutes * SecondsTomiliseconds(60)
}

const hourToMiliseconds = (hour) => {
  return hour*minutesToMiliseconds(60)
}

const dayToMiliseconds = (day) => {
  return hourToMiliseconds(24) * day
}

module.exports = {
  SecondsTomiliseconds,
  minutesToMiliseconds,
  hourToMiliseconds,
  dayToMiliseconds
}