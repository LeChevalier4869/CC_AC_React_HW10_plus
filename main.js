let ul = document.querySelector('.user-list');
let pl = document.querySelector('.post-list');

function makeElement(tag, atrName, atrValue, content) {
    let output = document.createElement(tag);
    (!!atrName) && output.setAttribute(atrName, atrValue);
    output.textContent = content;
    return output;
}

function postArticle(id) {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then( res => res.json() )
        .then( data => {
            // console.log('data post -> ', data);
            const allLi = pl.querySelectorAll('li');

            for(let li of allLi) {
                li.remove();
            }

            for(let el of data) {
                if(id === el.userId) {
                    const li = makeElement('li', 'class', `postID`, `${el.title}, ${el.body}`);
                    pl.append(li);
                }
            }
        })
}

fetch('https://jsonplaceholder.typicode.com/users')
    .then( res => res.json() )
    .then( data => {
        console.log('data user -> ', data)
        
        for(let el of data) {
            let li = makeElement('li', '', '', `Name: ${el.name}, Email: ${el.email}`);
            li.addEventListener('click', ()=>postArticle(el.id));
            ul.append(li);
        }    
    })


