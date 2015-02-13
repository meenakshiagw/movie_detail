function fun()
{
  var qparts = window.location.href.split('?')[1].split('=');
  alert(qparts[1]);
}
fun();