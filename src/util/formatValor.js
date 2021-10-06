import moment from 'moment';

export default (value, type) => {
    switch (type) {
        case 'fecha':
            return moment(value).format('DD/MM/yyyy')
        case 'hora':
            return moment(value).format('HH:mm')
        case 'texto':
        default:
            return value;
    }
}