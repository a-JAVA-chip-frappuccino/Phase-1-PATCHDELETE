/* ----------------------------------------------------- 
    VOCABULARY TERMS
----------------------------------------------------- */

/*

    - PATCH request: a `fetch` call to update existing data
    - DELETE request: a `fetch` call to remove existing data

*/

fetch("http://localhost:3000/characters")
    .then((resp) => resp.json())
    .then((data) => renderCharacters(data))

function renderCharacters(charArr) {

    const ul = document.querySelector('ul')

    ul.textContent = ""

    charArr.forEach((charObj) => {

        const li = document.createElement('li')

        const p = document.createElement('p')
        let name = charObj.name
        p.textContent = name
        p.style.color = '#7a2d96'

        const img = document.createElement('img')
        let imgURL = charObj.image
        img.src = imgURL
        img.style.margin = '5px'
        img.style.border = 'solid 2px #7a2d96'

        li.appendChild(p)
        li.appendChild(img)

        
        /* ----------------------------------------------------- 
            PATCH REQUEST
        ----------------------------------------------------- */

        const form = document.createElement('form')
        const btn = document.createElement('button')
        const input = document.createElement('input')
        input.placeholder = "character name"
        input.name = "name"
        btn.innerText = "Submit"

        form.append(input, btn)
        // form.appendChild(input)
        // form.appendChild(btn)

        

        li.appendChild(form)

        /* ----------------------------------------------------- 
            DELETE REQUEST
        ----------------------------------------------------- */

        const btn2 = document.createElement('button')
        btn2.innerText = "Delete"

        li.appendChild(btn2)

        

        ul.append(li)
        
    })
}