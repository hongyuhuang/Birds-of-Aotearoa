function loadAllBirds() {
    let fetchPromise = fetch("./data/nzbird.json");

    fetchPromise.then(function (response) {
        return response.json();
    }).then(function (birds) {
        birds.forEach(bird => {
            // get a reference to the template
            const template = document.querySelector("#cardTemplate");

            // clone the template
            const item = template.content.cloneNode(true);

            item.querySelector('.primaryName').textContent = bird.primary_name;
            item.querySelector('.englishName').textContent = bird.english_name;
            item.querySelector('.scientificName').textContent = bird.scientific_name;
            item.querySelector('.order').textContent = bird.order;
            item.querySelector('.family').textContent = bird.family;
            item.querySelector('.conservationStatus').textContent = bird.status;
            item.querySelector('.photo').src = bird.photo.source;
            item.querySelector('.photo').alt = bird.english_name;
            item.querySelector('.credit').textContent = "Photo by: " + bird.photo.credit;
            item.querySelector('.length').textContent = JSON.stringify(bird.size.length.value) + " cm";
            item.querySelector('.weight').textContent = JSON.stringify(bird.size.weight.value) + " g";

            if (bird.status.toLowerCase().localeCompare("not threatened") === 0) {
                item.querySelector('.conservationColour').style.backgroundColor = "#02a028";
            }
            else if (bird.status.toLowerCase().localeCompare("naturally uncommon") === 0) {
                item.querySelector('.conservationColour').style.backgroundColor = "#649a31";
            }
            else if (bird.status.toLowerCase().localeCompare("relict") === 0) {
                item.querySelector('.conservationColour').style.backgroundColor = "#99cb68";
            }
            else if (bird.status.toLowerCase().localeCompare("recovering") === 0) {
                item.querySelector('.conservationColour').style.backgroundColor = "#02a028";
            }
            else if (bird.status.toLowerCase().localeCompare("declining") === 0) {
                item.querySelector('.conservationColour').style.backgroundColor = "#fe9a01";
            }
            else if (bird.status.toLowerCase().localeCompare("nationally increasing") === 0) {
                item.querySelector('.conservationColour').style.backgroundColor = "#c26967";
            }
            else if (bird.status.toLowerCase().localeCompare("nationally vulnerable") === 0) {
                item.querySelector('.conservationColour').style.backgroundColor = "#9b0000";
            }
            else if (bird.status.toLowerCase().localeCompare("nationally endangered") === 0) {
                item.querySelector('.conservationColour').style.backgroundColor = "#660032";
            }
            else if (bird.status.toLowerCase().localeCompare("nationally critical") === 0) {
                item.querySelector('.conservationColour').style.backgroundColor = "#320033";
            }
            else if (bird.status.toLowerCase().localeCompare("extinct") === 0) {
                item.querySelector('.conservationColour').style.backgroundColor = "black";
            }
            else if (bird.status.toLowerCase().localeCompare("data deficient") === 0) {
                item.querySelector('.conservationColour').style.backgroundColor = "black";
            }
            document.querySelector('main.listClass').append(item);

            document.querySelector('main.listClass').appendChild(item);
        });
    }).catch(function (error) {
        console.error("Error."); // failure
    });
}

loadAllBirds();

function myEventHandler(eventData) {

    let searchRef = document.querySelector("#search");
    let search = searchRef.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    console.log("Search: " + search);

    let conservationStatusRef = document.querySelector("#conservation-status");
    let conservationStatus = conservationStatusRef.value.toLowerCase();
    console.log("Conservation Status: " + conservationStatus);

    let sortByRef = document.querySelector("#sort-by");
    let sortBy = sortByRef.value.toLowerCase();
    console.log("Sort By: " + sortBy);

    let e = document.querySelector("main.listClass");
    e.innerHTML = '';

    let fetchPromise = fetch("./data/nzbird.json");

    fetchPromise.then(function (response) {
        return response.json();
    }).then(function (birds) {
        const searchedBirds = birds.filter(bird => {
            return bird.english_name.toLowerCase().includes(search) ||
                bird.primary_name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(search) ||
                bird.scientific_name.toLowerCase().includes(search) ||
                bird.family.toLowerCase().includes(search) ||
                bird.order.toLowerCase().includes(search) || 
                bird.photo.credit.toLowerCase().includes(search) || 
                bird.other_names.toString().toLowerCase().includes(search) 
        });

        let statusBirds = new Array();

        if (conservationStatus.toLowerCase().localeCompare("all") === 0) {
            statusBirds = searchedBirds;
        }
        else {
            statusBirds = searchedBirds.filter(bird => {
                return bird.status.toLowerCase().includes(conservationStatus)
            });
        }
        if (sortBy.includes("alphabetical-english")) {
            statusBirds.sort((a, b) => a.english_name.localeCompare(b.english_name))
        }
        else if (sortBy.includes("alphabetical-maori")) {
            statusBirds.sort((a, b) => a.primary_name.localeCompare(b.primary_name))
        }
        else if (sortBy.includes("alphabetical-scientific")) {
            statusBirds.sort((a, b) => a.scientific_name.localeCompare(b.scientific_name))
        }
        else if (sortBy.includes("family")) {
            statusBirds.sort((a, b) => a.family.localeCompare(b.family))
        }
        else if (sortBy.includes("order")) {
            statusBirds.sort((a, b) => a.order.localeCompare(b.order))
        }
        else if (sortBy.includes("lighest-heaviest")) {
            statusBirds.sort((a, b) => a.size.weight.value - b.size.weight.value)
        }
        else if (sortBy.includes("heaviest-lighest")) {
            statusBirds.sort((a, b) => b.size.weight.value - a.size.weight.value)
        }
        else if (sortBy.includes("smallest-largest")) {
            statusBirds.sort((a, b) => a.size.length.value - b.size.length.value)
        }
        else if (sortBy.includes("largest-smallest")) {
            statusBirds.sort((a, b) => b.size.length.value - a.size.length.value)
        }
        statusBirds.forEach(bird => {
            // get a reference to the template
            const template = document.querySelector("#cardTemplate");

            // clone the template
            const item = template.content.cloneNode(true);

            item.querySelector('.primaryName').textContent = bird.primary_name;
            item.querySelector('.englishName').textContent = bird.english_name;
            item.querySelector('.scientificName').textContent = bird.scientific_name;
            item.querySelector('.order').textContent = bird.order;
            item.querySelector('.family').textContent = bird.family;
            item.querySelector('.conservationStatus').textContent = bird.status;
            item.querySelector('.photo').src = bird.photo.source;
            item.querySelector('.photo').alt = bird.english_name;
            item.querySelector('.credit').textContent = "Photo by: " + bird.photo.credit;
            item.querySelector('.length').textContent = JSON.stringify(bird.size.length.value) + " cm";
            item.querySelector('.weight').textContent = JSON.stringify(bird.size.weight.value) + " g";

            if (bird.status.toLowerCase().localeCompare("not threatened") === 0) {
                item.querySelector('.conservationColour').style.backgroundColor = "#02a028";
            }
            else if (bird.status.toLowerCase().localeCompare("naturally uncommon") === 0) {
                item.querySelector('.conservationColour').style.backgroundColor = "#649a31";
            }
            else if (bird.status.toLowerCase().localeCompare("relict") === 0) {
                item.querySelector('.conservationColour').style.backgroundColor = "#99cb68";
            }
            else if (bird.status.toLowerCase().localeCompare("recovering") === 0) {
                item.querySelector('.conservationColour').style.backgroundColor = "#02a028";
            }
            else if (bird.status.toLowerCase().localeCompare("declining") === 0) {
                item.querySelector('.conservationColour').style.backgroundColor = "#fe9a01";
            }
            else if (bird.status.toLowerCase().localeCompare("nationally increasing") === 0) {
                item.querySelector('.conservationColour').style.backgroundColor = "#c26967";
            }
            else if (bird.status.toLowerCase().localeCompare("nationally vulnerable") === 0) {
                item.querySelector('.conservationColour').style.backgroundColor = "#9b0000";
            }
            else if (bird.status.toLowerCase().localeCompare("nationally endangered") === 0) {
                item.querySelector('.conservationColour').style.backgroundColor = "#660032";
            }
            else if (bird.status.toLowerCase().localeCompare("nationally critical") === 0) {
                item.querySelector('.conservationColour').style.backgroundColor = "#320033";
            }
            else if (bird.status.toLowerCase().localeCompare("extinct") === 0) {
                item.querySelector('.conservationColour').style.backgroundColor = "black";
            }
            else if (bird.status.toLowerCase().localeCompare("data deficient") === 0) {
                item.querySelector('.conservationColour').style.backgroundColor = "black";
            }
            document.querySelector('main.listClass').append(item);
        });
    }).catch(function (error) {
        console.error("Error."); // failure
    });
    eventData.preventDefault();
}

let btnRef = document.querySelector("#filter-result");
btnRef.addEventListener('click', myEventHandler);

function myFunction() {
    const x = document.getElementById("sidebar");
    console.log(x);
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }