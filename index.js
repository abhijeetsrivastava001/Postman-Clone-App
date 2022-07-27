// INITIALLY HIDE THE PARAMETER BOX
let parameterBox = document.getElementById('parameterBox');
let addedParams= document.getElementById('addedParams')
parameterBox.style.display = 'none';
let userResponse = document.getElementById('userResponse');
userResponse.style.display = 'none';
// document.getElementById('outerResponse').style.display = 'none';

//UTILITY FUNCTION
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// IF USER CLICKS ON CUSTOM PARAMETER THEN HIDE JSON FIELD
let customField = document.getElementById('customField');
customField.addEventListener('click', () => {
    parameterBox.style.display = 'block';
    addedParams.style.display = 'block';
    document.getElementById('JsonBox').style.display = 'none';
});

// IF USER CLICKS ON JSON THEN HIDE CUSTOM PARAMETER FIELD
let jsonField = document.getElementById('jsonField');
jsonField.addEventListener('click', () => {
    document.getElementById('JsonBox').style.display = 'block';
    parameterBox.style.display = 'none';
    addedParams.style.display = 'none';
});

// IF USER CLICKS ON + BUTTON THEN ADD MORE PARAMETERS.
let addParams = document.getElementById('addParams');
let i = 1;
addParams.addEventListener('click', () => {
    i++;
    let addedParams = document.getElementById('addedParams');
    let html = `<div class="mb-3 row mx-3">
                    <label for="inputEmail4" class="col-sm-2 col-label">Parameter ${i}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="paramKey${i}" placeholder="Key${i}">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="paramValue${i}" placeholder="Value${i}">
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-primary removeParam"> - </button>
                     </div>
                </div>`;

    let paramElement = getElementFromString(html);
    // console.log(paramElement);
    addedParams.appendChild(paramElement);

    let removeParam = document.getElementsByClassName('removeParam');
    for (const iterator of removeParam) {
        iterator.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.remove();
            i++;
            console.log('inner i', i)
        })
    }
    console.log('outer i', i)
})

let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    let userResponse = document.getElementById('userResponse');
    let outerResponse = document.getElementById('outerResponse');
    let responsePrism = document.getElementById('responsePrism');

    let url = document.getElementById('urlField').value;
    console.log(typeof url);

    if (url != '') {
        console.log(url);
        console.log('In if block')
        outerResponse.style.display = 'none';
        userResponse.style.display = 'block';
        userResponse.style = "overflow-y:scroll; height:400px;"
        responsePrism.innerHTML = "Please wait!  Fetching data...";

    let requestType = document.querySelector("input[name = 'requestField']:checked").value;
    let contentType = document.querySelector("input[name = 'contentField']:checked").value;

    if (contentType == 'customField') {
        data = {};
        for (let count = 1; count <= i; count++) {
            if (document.getElementById('paramKey' + (count)) != undefined) {
                let key = document.getElementById('paramKey' + (count)).value;
                let value = document.getElementById('paramValue' + (count)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    } else {
        data = document.getElementById('requestJsonField').value;
    }

    // console.log('url is',url)
    // console.log('requestType is',requestType)
    // console.log('contentType is',contentType)
    // console.log('data is',data);

    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                responsePrism.innerHTML = text;
                Prism.highlightAll();
            })
    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.text())
            .then((text) => {
                responsePrism.innerHTML = text;
                Prism.highlightAll();
            })
    }

} else {
    console.log(url);
    console.log('In else block');
    userResponse.style.display = 'none';
    outerResponse.style.display = 'block';
    outerResponse.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Empty URL: </strong> Please! enter the url above..
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;
}
})


