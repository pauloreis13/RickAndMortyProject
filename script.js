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
      console.log(data)
    return data;
   })
   return result;
   
}

const keys = ["name", "status", "species", "gender", "origin", "episode"];

const newKeys = {
   name: "Name",
   status: 'Status',
   species: 'Specie',
   gender: 'Gender',
   origin: "Planet of Origin",
   episode: "Episodes in which appears"
}

const buildResult = (result) => {
  return keys.map((key)=> document.getElementById(key))
   .map((elem)=> {
       if ( elem.checked === true && Array.isArray(result[elem.name]) === true){
      const arrayResult = result[elem.name].join('\r\n');
      console.log(arrayResult);
      const newElem = document.createElement('p');
      newElem.innerHTML = `${newKeys[elem.name]} : ${arrayResult}`;
      //append a "child" into the HTML in this case the new element.
      content.appendChild(newElem)
     }else if ( elem.checked === true &&(elem.name === 'origin') ){
      const newElem = document.createElement('p');
      newElem.innerHTML = `${newKeys[elem.name]} : ${result[elem.name].name}`;
      content.appendChild(newElem)
     }
     else if ( elem.checked === true && typeof (result[elem.name]) !== 'object'){
      const newElem = document.createElement('p');
      newElem.innerHTML = `${newKeys[elem.name]} : ${result[elem.name]}`;
  
      content.appendChild(newElem)
     }
   })

}

btnGo.addEventListener('click', async (event) => {
   // to fix the results on the screen
   event.preventDefault();
   const inputStringToNumber = Number(characterId)
   if (characterId.value > 827) {
   return content.innerHTML = 'You must add a number less than 827 to continue'
   }

   if (characterId.value === '') {
      return content.innerHTML = 'You must add a number to the search.'
   }
   const result = await fetchApi(characterId.value);
   if (content.firstChild === null) {
      containerResult.className = 'result-style';
      image.src = `${result.image}` 
      buildResult(result)
   } else {
      image.src = `${result.image}` 
      content.innerHTML = ''; 
      containerResult.className = 'result-style';
      buildResult(result)
   }
 
});

btnReset.addEventListener ('click', ()=> location.reload())
