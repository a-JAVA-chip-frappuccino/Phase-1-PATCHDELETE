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

        form.addEventListener('submit', (e) => handleUpdateChar(e))

        function handleUpdateChar(e) {
            e.preventDefault()

            const newCharObj = {
                name : e.target.name.value // updates just name key:value pair
            }

            // fires PATCH to individual object
            fetch("http://localhost:3000/characters/" + charObj.id, {
                method : 'PATCH',
                headers : {
                    'Content-type' : 'application/json'
                },
                body : JSON.stringify(newCharObj)
            })
                .then((resp) => resp.json())
                .then((data) => {
                    const newCharArr = charArr.map((eachCharObj) => {
                        if (eachCharObj.id !== charObj.id) {
                            return eachCharObj
                        }
                        else {
                            return data
                        }
                    })
                    renderCharacters(newCharArr)
                }) // immediately rerenders new array with updated object
                // .then((data) => renderCharacters(charArr.map((eachCharObj) => eachCharObj.id !== charObj.id ? eachCharObj : data)))
        }

        li.appendChild(form)

        /* ----------------------------------------------------- 
            DELETE REQUEST
        ----------------------------------------------------- */

        const btn2 = document.createElement('button')
        btn2.innerText = "Delete"

        li.appendChild(btn2)

        btn2.addEventListener('click', handleDeleteChar)

        // fires DELETE to individual object
        function handleDeleteChar() {
            fetch(`http://localhost:3000/characters/${charObj.id}`, {
                method : 'DELETE'
            })
                .then((resp) => resp.json())
                .then((data) => {
                    const newCharArr = charArr.filter((eachCharObj) => {
                        if (eachCharObj.id !== data.id) {
                            return true
                        }
                        else {
                            return false
                        }
                    })
                    renderCharacters(newCharArr)
                }) // immediately rerenders new array without removed object
                // .then((data) => renderCharacters(charArr.filter((eachCharObj) => eachCharObj.id !== data.id)))
        }

        ul.append(li)
        
    })
}