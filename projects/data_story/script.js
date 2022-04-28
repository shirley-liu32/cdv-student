// var audio = new Audio('assets/netflix_intro.mp3');

// function playSound(){
//     audio.play();
// }

// text reveal on scroll https://www.youtube.com/watch?v=FWQSYONeIqk 
let listItems = [...document.querySelectorAll('li')];

let options = {
    rootMargin: '0%',
    threshold: 1.0
}

let observer = new IntersectionObserver(showItem, options);

function showItem(entries){
    entries.forEach(entry=> {
        if(entry.isIntersecting){
            let letters = [...entry.target.querySelectorAll(`span`)];
            letters.forEach((letter,idx) => {
                setTimeout(()=> {
                    letter.classList.add('active');
                    }, idx * 10)
                })
            entry.target.children[0].classList.add('active');
        }
    })
}

listItems.forEach(item =>{

    let newString = '';
    let itemText = item.children[0].innerText.split('');
    console.log(itemText);
    
    itemText.map(letter =>{
        newString += letter == ' ' ? `<span class='gap'></span>` : `<span>${letter}</span>`
        item.innerHTML = newString;
    })
    observer.observe(item);
})