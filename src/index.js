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

        ul.append(li)
        
    })
}