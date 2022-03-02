const DATETIME = () => {

    const FORMAT = (date, locale, options) => new Intl.DateTimeFormat(locale, options).format(date)
    const DATE = new Date()

    return FORMAT(DATE, 'es', {dateStyle: 'long'})

}

module.exports = DATETIME