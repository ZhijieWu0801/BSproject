const newYear = ['再无往事',',', '皆是当下'];
let out = ''
let i = 0;
let j = 0;
const interval = setInterval(() => {
    if (j < newYear[i].length) {
        console.clear()
        out += newYear[i][j]
        console.log(out);
        
        j++;
    } else if (i < newYear.length - 1) {
        i++;
        j = 0;
    } else {
        clearInterval(interval)
    }
}, 500);
