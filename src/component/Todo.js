import React, { useEffect, useState } from 'react'

// to get the data from localstorage
const getLocalItems=()=>{
    let list=localStorage.getItem("list")
    console.log(list);
    if(list){
        return JSON.parse(localStorage.getItem("list"))
    }
    else{
        return []
    }
}
const Todo = () => {

    const [inputData, setInputData] = useState("")
    const [items, setItems] = useState(getLocalItems())
    const [toggleSubmit, setToggleSubmit] = useState(true)
    const [isEditItem, setisEditItem] = useState(null)

    //add data
    const addItem = () => {
        if(!inputData){
           alert("please add some data")
        }
        else if(inputData && !toggleSubmit){
           setItems(
            items.map((elem)=>{
              if(elem.id === isEditItem){
                return {...elem,name:inputData}
              }
              return elem
            })
            )
            setToggleSubmit(true)
            setInputData("")
            setisEditItem(null)
        }
        else{
            const allInputData = {id: new Date().getTime().toString(), name:inputData}
            setItems([...items,allInputData])
            setInputData("")
         }
    }

    //delete data
    const deleteItem = (index) => {
      const updatedItems = items.filter((elem)=>{
         return index !== elem.id
       })
       setItems(updatedItems)
    }

    //edit data
    const editItem = (id) => {
       let newEditItem = items.find((elem)=>{
         return elem.id === id
       })
       console.log(newEditItem);
       setToggleSubmit(false)
       setInputData(newEditItem.name)
       setisEditItem(id)
    }

    const removeAll = () => {
      setItems([])
    }

    // add data to local storage
    useEffect(()=>{
       localStorage.setItem("list",JSON.stringify(items))
    },[items])

  return (
    <>
      <div className="main-div">
        <div className="child-div">
            <figure>
                <img src="./todo.jpeg" alt="todo logo" />
                <figcaption>Add Your List Here</figcaption>
            </figure>

            <div className="addItems">
                <input type="text" placeholder='Add Items...' value={inputData} onChange={(e)=>{setInputData(e.target.value)}} />
                {
                    toggleSubmit ? <i className="fa-solid fa fa-plus add-btn" title='Add Item' onClick={addItem}></i> : <i className="fa-regular  fa-edit fa-trash-alt add-btn" title='Update Item' onClick={addItem}></i>
                }
                
            </div>

            <div className="showItems">

                {
                    items.map((elem)=>{
                       return (
                    <div className="eachItem" key={elem.id}>
                        <h3>{elem.name}</h3>
                        <div className='todo-btn'>
                        <i className="fa-regular  fa-edit fa-trash-alt add-btn" title='Edit Item' onClick={()=>editItem(elem.id)}></i>
                        <i className="fa-regular  fa-trash-can fa-trash-alt add-btn" title='Delete Item' onClick={()=>deleteItem(elem.id)}></i>
                        </div>
                     </div>
                       )
                    })
                }
               
            </div>

            {/* clear all button */}
            <div className="showItems">
                <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Todo