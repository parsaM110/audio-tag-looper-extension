async function fetchData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments');
  const data = await response.json();
  console.log(data);
//   document.getElementById('concerts').innerHTML = JSON.stringify(data);
// document.getElementById('concerts').innerHTML = data.map(item => item.email).join('<br>');
document.getElementById('concerts').innerHTML = data.map(item => `<li>${item.email}</li>`).join('');
}
fetchData();