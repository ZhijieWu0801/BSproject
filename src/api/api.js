import {findOneByUTel,} from '../../services/adminServes.cjs'
const $BaseUrl = `http://127.0.0.1:3000`
function addAdmin(options){
fetch(`${$BaseUrl}/api/admin/addAdmin`,{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
}).then(r=>{
    return r.json()
}).then(r=>{
    console.log(r);
})
}
function selectBYUTel(options){
    fetch(`${$BaseUrl}/api/admin/addAdmin`,{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
    })
}
const exports = {
    addAdmin,
    selectBYUTel
}
export default exports