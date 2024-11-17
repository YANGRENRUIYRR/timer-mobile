function validateInput2(event)
{
    if(!/^\d{0,2}$/.test(event.target.value)) event.target.value=event.target.value.replace(/[^\d]/g,'').substring(0,2);
}
function validateInput3(event)
{
    if(!/^\d{0,3}$/.test(event.target.value)) event.target.value=event.target.value.replace(/[^\d]/g,'').substring(0,3);
}
