const survey = document.querySelector('#survey');
const loadinggif = document.querySelector('#loadinggif')
loadinggif.style.display = 'none';

const display = document.querySelector("#items");

survey.addEventListener('submit', function(event){
    event.preventDefault();
    var name = document.getElementById('name').value;
    var order = document.getElementById('order').value;
    var receipt = {
        name,
        order
    }
    loadinggif.style.display = '';
    survey.style.display = 'none';
    const response = fetch(new URL('http:localhost:3000/'), {
        method: 'POST',
        body: JSON.stringify(receipt),
        headers: {
            'content-type': 'application/json'
          }
        }).then(response => response.json()).then(receipt1 => {
            while (display.firstChild){
                display.removeChild(display.firstChild);
            }
            receipt1.reverse().forEach(receipt => {
                const div = document.createElement('div');
                const header = document.createElement('h4');
                const order = document.createElement('p');
                header.textContent = receipt.name;
                order.textContent = receipt.order;
                div.appendChild(header);
                div.appendChild(order);
                display.appendChild(div);
        }
        )});
    loadinggif.style.display = 'none';
    survey.style.display = '';
    survey.reset();
})