

var tabla = document.getElementById('dataTable-1');
var tablDom = `
<thead>
    <tr>
        <th>ID</th>
        <th scope="col-3">Nombre</th>
        <th scope="col-4">Precio</th>
        <th scope="col-4">Rating Steam</th>
        <th scope="col-4">Metacritic Score</th>
    </tr>
</thead>
<tbody>

</tbody> 
`


let loading =`
<thead>
    <tr>
        <th>ID</th>
        <th scope="col-3">Nombre</th>
        <th scope="col-4">Precio</th>
        <th scope="col-4">Rating Steam</th>
        <th scope="col-4">Metacritic Score</th>
    </tr>
</thead>
<tbody>
<div class="pong">
      <div></div>
      <div></div>
      <div></div>
    </div>
</tbody> 

`





function clickG(id) {
    tabla.innerHTML=tablDom;

    let url = "https://www.cheapshark.com/api/1.0/deals?storeID="+id;
    loadTable(url)
}



async function loadTable(url) {
    const response = await fetch(url);
    const data = await response.json();
    var temp = "";
    tabla.innerHTML = loading;
    for (var i in data) {
        
        temp += "<tr>";
        temp += "<td>" + data[i].gameID + "</td>";
        temp += "<td>" + data[i].title + "</td>";
        temp += "<td>" + data[i].salePrice + "</td>";
        temp += "<td>" + data[i].steamRatingPercent + "</td>";
        temp += "<td>" + data[i].metacriticScore + "</td>";
        temp += `<td></tr>`;
        


    }
    
    
    setTimeout(function timer() {
        tabla.innerHTML = tablDom;
        return tabla.innerHTML += temp;
    }, 400);
    




}