<template>
  <div>{{out}}</div>
</template>

<script>
export default {
data(){
    return{
        out:''
    }
},
created(){
    const newYear = ['再无往事',',', '皆是当下'];
let i = 0;
let j = 0;
const interval = setInterval(() => {
    if (j < newYear[i].length) {
        console.clear()
        this.out += newYear[i][j]
        console.log(this.out);
        
        j++;
    } else if (i < newYear.length - 1) {
        i++;
        j = 0;
    } else {
        clearInterval(interval)
    }
}, 500);
}
}
</script>

<style>

</style>