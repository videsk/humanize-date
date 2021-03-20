class HumanizeDate {

    constructor() {
        this.from = new Date();
        this.to = new Date();
        this.units = {
            seconds: this.seconds,
            minutes: this.minutes,
            hours: this.hours,
            days: this.days,
            weeks: this.weeks,
            months: this.months,
            years: this.years,
            quarters: this.quarters,
        }
    }

    /**
    * Convert date to human readable
    * @param date {String|Number|Date} - Date want format
    * @param options {Object} - Check options here: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    */
    toLocale(date = new Date(), options = { year: 'numeric', month: 'long', day: 'numeric' }) {
        return new Date(date).toLocaleDateString(navigator.language, options);
    }

    /**
     * Set dates
     * @param dateA {String|Number|Date|Array|Object}
     * @param dateB= {String|Number|Date}
     * @returns {HumanizeDate}
     */
    dates(dateA= new Date(), dateB = new Date()) {
        const { from, to } = this.constructor.getDates(dateA, dateB);
        this.from = new Date(from);
        this.to = new Date(to);
        return this;
    }

    /**
     * Convert difference of two dates in relative time human readable
     * @param unit {String} - Unit as seconds, minutes, hours, weeks, months, years
     * @param options {Object} - Check options here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat
     * @returns {string}
     */
    within(unit = 'seconds', options = { numeric: 'auto' }) {
        if (!(unit in this.units)) throw new Error(`The available units are ${Object.keys(this.units)}`);
        return new Intl.RelativeTimeFormat(navigator.language, options).format(this.units[unit](this.from, this.to), unit);
    }

    /**
     * Convert difference of two dates in relative time human readable
     * @param unit {String} - Unit as seconds, minutes, hours, weeks, months, years
     * @param options {Object} - Check options here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat
     * @returns {string}
     */
    ago(unit = 'seconds', options = { numeric: 'auto' }) {
        if (!(unit in this.units)) throw new Error(`The available units are ${Object.keys(this.units)}`);
        return new Intl.RelativeTimeFormat(navigator.language, options).format(this.units[unit](this.from, this.to) * -1, unit);
    }

    /**
     * Get difference between dates in seconds
     * @param from= {String|Number|Date} - The older date
     * @param to= {String|Number|Date} - The newer date
     * @returns {number}
     */
    seconds(from, to) {
        return Math.abs(new Date(to || this.to) - new Date(from || this.from)) / 1000;
    }

    /**
     * Get difference between dates in minutes
     * @param from= {String|Number|Date} - The older date
     * @param to= {String|Number|Date} - The newer date
     * @returns {number}
     */
    minutes(from, to) {
        return Math.abs(new Date(to || this.to) - new Date(from || this.from)) / (1000 * 60);
    }

    /**
     * Get difference between dates in hours
     * @param from= {String|Number|Date} - The older date
     * @param to= {String|Number|Date} - The newer date
     * @returns {number}
     */
    hours(from, to) {
        return Math.abs(new Date(to || this.to) - new Date(from || this.from)) / (1000 * 60 * 60);
    }

    /**
     * Get difference between dates in days
     * @param from= {String|Number|Date} - The older date
     * @param to= {String|Number|Date} - The newer date
     * @returns {number}
     */
    days(from, to) {
        return Math.abs(new Date(to || this.to) - new Date(from || this.from)) / (1000 * 60 * 60 * 24);
    }

    /**
     * Get difference between dates in weeks
     * @param from= {String|Number|Date} - The older date
     * @param to= {String|Number|Date} - The newer date
     * @returns {number}
     */
    weeks(from, to) {
        return Math.abs(new Date(to || this.to) - new Date(from || this.from)) / (1000 * 60 * 60 * 24 * 7 * 4);
    }

    /**
     * Get difference between dates in months
     * @param from= {String|Number|Date} - The older date
     * @param to= {String|Number|Date} - The newer date
     * @returns {number}
     */
    months(from, to) {
        return Math.abs((this.years(from, to) * 12) + (new Date(to || this.to).getMonth() - new Date(from || this.from).getMonth()));
    }

    /**
     * Get difference between dates in years
     * @param from= {String|Number|Date} - The older date
     * @param to= {String|Number|Date} - The newer date
     * @returns {number}
     */
    years(from, to) {
        return Math.abs(new Date(to || this.to).getFullYear() - new Date(from || this.from).getFullYear());
    }

    /**
     * Get difference between dates in quarters
     * @param from= {String|Number|Date} - The older date
     * @param to= {String|Number|Date} - The newer date
     * @returns {number}
     */
    quarters(from, to) {
        return Math.abs(this.months(from, to) / 4);
    }


    /**
     * Get dates based on parameters
     * @param from {String|Number|Date|Array|Object}
     * @param to {String|Number|Date}
     * @returns {{from: *, to: *}|{from: (string|number), to}}
     */
    static getDates(from, to) {
        if (!(Array.isArray(from) || typeof from === 'object') || (typeof from === 'object' && 'getTime' in from)) return {from, to};
        else if (Array.isArray(from)) return {from: from[0], to: from[1]};
        else if (typeof from === 'object') return {from: from[Object.keys(from)[0]], to: from[Object.keys(from)[1]]};
    }
}

if (typeof define === 'function' && define.amd) {
    define('HumanizeDate', [], function() {
        return HumanizeDate;
    });
}

if (typeof module !== 'undefined') {
    module.exports = HumanizeDate;
}
