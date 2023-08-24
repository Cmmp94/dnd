import { DragEvent, useState } from 'react'
import './App.css'


interface Image {
  id: number;
  content: number;
}

enum LISTA{
  selected,
  unselected
}

const images = [
{
"id": 1,
"content": 1,
},{
"id": 2,
"content": 2,
},{
"id": 3,
"content": 3,
},{
"id": 4,
"content": 4,
}]

const initialSolution = new Array(4).fill(new Image);

function App() {
  
const [selectedImages, setSelectedImages] = useState<Image[]>(initialSolution);

const [unselectedImages, setUnselectedImages] = useState<Image[]>(images);

let dragingItem: undefined | number;
let dragingList: LISTA
let dropingDestiantion: undefined | number;
let dropingList: undefined | LISTA;

const handleDragStart = (e: DragEvent<HTMLDivElement>, index:number, lista:LISTA) => {
  dragingItem = index;
  dragingList = lista;
}

const handleDragEnd = () => {
    if (dragingItem !== undefined && dropingDestiantion !== undefined) {
      const indexOrigen = dragingItem;
      const indexDestino = dropingDestiantion;
      if(dragingList != undefined && dropingList != undefined && dragingList != dropingList){
        const updatedSelectedImages = [...selectedImages];
        const updatedUnselectedImages = [...unselectedImages];
        if(dropingList === LISTA.selected){ // Drag from unselected to selected
          const temp = updatedSelectedImages[indexDestino];
          updatedSelectedImages[indexDestino] = updatedUnselectedImages[indexOrigen];
          updatedUnselectedImages[indexOrigen] = temp;
        }else{                              //Drag from selected to unselected
          const temp = updatedUnselectedImages[indexDestino];
          updatedUnselectedImages[indexDestino] = updatedSelectedImages[indexOrigen];
          updatedSelectedImages[indexOrigen] = temp;
        }
        setSelectedImages(updatedSelectedImages);
        setUnselectedImages(updatedUnselectedImages);
      }
    }
}

const handleDragOver = (e: DragEvent<HTMLDivElement>, index:number, list:LISTA) => {
  e.preventDefault();
  dropingDestiantion = index;
  dropingList = list;
}

const handleDragLeave = () => {
  dropingDestiantion = undefined;
  dropingList = undefined;
}

  return (
    <div className='container'>
      <div className="upper-container">
      {selectedImages.map((item, index) => (
          <div
            draggable
            className="bucket"
            key={index}
            onDragStart={(e) => handleDragStart(e, index, LISTA.selected)} // Se dispara al comienzo del arrastre
            onDragEnd={handleDragEnd} //Se dispara al finalizar el arrastre
            onDragOver={(e) => handleDragOver(e, index, LISTA.selected)} //Se dispara al pasar por encima de una zona dropeable
            onDragLeave={handleDragLeave} //Se dispara al salir de una zona dropeable
          >
            {item.content}
          </div>
        ))}
      </div>
      <div className="lower-container">
        {unselectedImages.map((item, index) => (
          <div
            draggable
            className="item"
            key={index}
            onDragStart={(e) => handleDragStart(e, index, LISTA.unselected)} // Se dispara al comienzo del arrastre
            onDragEnd={handleDragEnd} //Se dispara al finalizar el arrastre
            onDragOver={(e) => handleDragOver(e, index, LISTA.unselected)} //Se dispara al pasar por encima de una zona dropeable
            onDragLeave={handleDragLeave} //Se dispara al salir de una zona dropeable
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  )
}
export default App
