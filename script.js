const characterId = document.getElementById('characterId');
const btnGo = document.getElementById('btn-go');
const btnReset = document.getElementById('btn-reset');
const content = document.getElementById('content');
const containerResult =document.getElementById('result-style');
const image = document.getElementById('img');

const fetchApi = (value) => {
   const result = fetch(`https://rickandmortyapi.com/api/character/${value}`)
   .then((res) => res.json())
   .then ((data) => {
    return data;
   })
   return result;
   
}

const keys = ["name", "status", "species", "gender", "origin", "episode"];

const buildResult = (result) => {
  return keys.map((key)=> document.getElementById(key))
   .map((elem)=> {
     if ( elem.checked && typeof (result[elem.name]) !== 'object'){
      const newElem = document.createElement('h1');
      newElem.innerHTML = `${elem.name} : ${result[elem.name]}`;
      //append a "child" into the HTML in this case the new element.
      content.appendChild(newElem)
     }
   })

}

btnGo.addEventListener('click', async (event) => {
   // to fix the results on the screen
   event.preventDefault();

   if (characterId.value === '') {
      return content.innerHTML = 'You need to add a number to the search.'
   }
   const result = await fetchApi(characterId.value);
   buildResult(result)
   image.src = `${result.image}` 
});
