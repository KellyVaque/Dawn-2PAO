let gameID = 0;

generarOfertas();


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

async function generarOfertas() {
    const response = await fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1");
    const data = await response.json();

    labels = [];
    values = [];
    for (var i in data) {
        labels.push(data[i].title);
        values.push(data[i].salePrice);
    }
    let l = getRandomInt(values.length - 1);
    gameID = data[l].gameID;

    new Chart(document.getElementById("line-chart"), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Precio (dolares)",
                    data: values,
                    fill: false,
                    borderColor: '#36A2EB',
                    backgroundColor: '#9BD0F5'
                }
            ]
        },
        options: {
            legend: { display: false },

        }
    });
    generarPrecioJuego(gameID);

}


async function generarPrecioJuego(gameID) {
    let url = "https://www.cheapshark.com/api/1.0/games?id=";
    const response = await fetch(url+gameID);
    

    const data = await response.json();

    
    labels = [];
    values = [];
    for (var i in data["deals"]) {
        const ed = await getStoreName(data["deals"][i].storeID);
        
        labels.push(ed);
        values.push(data["deals"][i].price);
    }


    new Chart(document.getElementById("bar-chart"), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Precio (dolares)",
                    data: values,
                    fill: false,
                    borderColor: '#36A2EB',
                    backgroundColor: '#9BD0F5'
                }
            ]
        },
        options: {
            indexAxis: 'y',

        }
    });

}





async function getStoreName(storeID) {
    const response = await fetch("https://www.cheapshark.com/api/1.0/stores");


    const data = await response.json();
    
    for (var i in data) {
        if (data[i].storeID == storeID){
            return data[i].storeName;
        }
        
    }


   

}

    
    