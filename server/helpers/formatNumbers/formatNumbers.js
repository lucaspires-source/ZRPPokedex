const formatNumbers = function (id) {
    let number
    if (id < 10){
        number = `00${id}`
    } else if (id < 100) {
        number = `0${id}`
    } else {
        number = `${id}`
    }
    return number
  }


module.exports = formatNumbers

