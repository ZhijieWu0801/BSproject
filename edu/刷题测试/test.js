/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    for(let i = 0 ;i< needle.length ;i++) {
        const tmp  =  needle.slice(0,i+needle.length);
        if(tmp.indexOf(haystack)>-1){
            continue;
        }
        return needle.slice(0,i).indexOf(haystack)

    }
};
console.log(strStr("sadbutsad","sad"));