var now = new Date();
var weddingDate = new Date(2016, 11, 31);
var daysUntil = Math.floor((weddingDate - now) / 86400000);
var daysUntilText;

if (daysUntil > 1) {
    daysUntilText = daysUntil + ' days to go!';
} else if (daysUntil === 1) {
    daysUntilText = 'One day to go!';
} else if (daysUntil === 0) {
    daysUntilText = '0 days to go - today is the day!';
} else {
    daysUntil = daysUntilText + ' days ago'
}

$('#days-until').html(daysUntilText);