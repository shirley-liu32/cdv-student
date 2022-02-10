function showSquares(){
    //get number of squares/value that user inputs
    let userNum = document.getElementById('num').value;
    let cont = document.getElementById('sqContainer')
    cont.innerHTML = '';

    //make the number of squares based on user input and add a class to style them
    for (let i = 1; i <= userNum; i++){
      let newSquare = document.createElement('div');
      document.getElementById("sqContainer").appendChild(newSquare);
      newSquare.className = "square";
    }
  }