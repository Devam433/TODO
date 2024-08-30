import { useEffect, useState } from "react";
import Button from "./components/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

const App=()=>{
  const [inputVlaue,setInputValue] = useState();
  const [todos,setTodos] = useState([]);
  const [loading,setLoading] = useState(true); //this is for add todo
  async function getTodos() {
    try {
      const res = await fetch('/api/todos');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const todos = await res.json();
      setTodos(todos.data);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  }

  function handleAddTodo() {
    setLoading(true);
    axios.post('/api/todos',{
      title:inputVlaue,
      isCompleted:false
    }).then(res=>{
      console.log(res.data);
      getTodos();
    }).catch(err=>{
      console.log(err);
    })
    setInputValue('')
  }

  function handleOnChange(e) {
    const {value} = e.target;
    setInputValue(value);
  }

  function handleDelete(id) {
    console.log(id)
    axios.delete(`/api/todos/${id}`)
    .then(res=>{
      console.log(res);
      getTodos();
    })
  }
  
  useEffect(()=>{
    getTodos();
  },[])

  return(
    <div className="flex h-[100vh] justify-center items-center">
    <div className="flex flex-col gap-3 w-[600px] ">
      <h1 className=" text-2xl font-bold">Todo List</h1>
      <div className=" flex h-[40px] bg-gray-200 rounded-[50px] pl-4">
        <input type="text" placeholder="Add your task here" className=" indent-1 w-[85%] outline-none bg-gray-200" value={inputVlaue} onChange={handleOnChange}/>
        <Button className="h-full bg-orange-300 rounded-[50px] w-[15%] hover:bg-orange-400 hover:transition-colors border border-red-300" onClick={handleAddTodo}>{
          loading ? <FontAwesomeIcon icon={faSpinner} spinPulse /> :'ADD'}</Button>
      </div>
      <div className="flex flex-col gap-2 h-[200px]overflow-scroll"> {/** Todos Container*/}
        {
          todos?.map(todo=>{
            return (
              <div key={todo.id} className="flex gap-2 bg-orange-100 justify-between px-2 py-2 items-center rounded-md">
                <div className="flex gap-3 ">
                  <input type="checkbox" name="" id="" className="w-4"/>
                   <p className={`${'text-gray-950'} text-xl`}>{todo.title}</p>
                </div>
                <FontAwesomeIcon icon={faTrash} color="gray" className="hover:text-red-300 hover:transition-colors hover:cursor-pointer" onClick={()=>{handleDelete(todo.id)}}/>
              </div>
            )
          })
        }
      </div>
    </div>
    </div>
  )
}
export default App
