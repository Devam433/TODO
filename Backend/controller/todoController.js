import fs from 'fs';


const getAllTodosUtil = ()=>{
  const allTodos = fs.readFileSync('./Data/todos.json',"utf-8")
  console.log(allTodos);
  return JSON.parse(allTodos)
}
const saveTodos = (todos)=>{
  try {
    fs.writeFileSync('./Data/todos.json', JSON.stringify(todos), 'utf8');
  } catch (err) {
    res.status(500)
    throw Error('Unexpected Error')
  }
}


//@desc get all todos
//@route GET api/todos
//@access public
// export const getAllTodos = (req,res)=>{
//   const allTodos = fs.readFileSync('./Data/todos.json',"utf-8") 
//   const data = JSON.parse(allTodos)
//   console.log("data",data)
//   res.status(200).json({message:"All Todos",data:data});
// }

export const getAllTodos = (req, res) => {
  try {
    // Read the file
    const allTodos = fs.readFileSync('./Data/todos.json', 'utf-8');
    
    // Log the raw file content to debug
    console.log("Raw file content:", allTodos);
    
    // Parse the JSON content
    const data = JSON.parse(allTodos);
    console.log("Parsed data:", data);
    
    // Send the response
    res.status(200).json({ message: "All Todos", data: data });
  } catch (error) {
    console.error("Error reading the file:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//@desc add(create) a todo
//@route CREATE api/todos/id
//@access public
export const createTodo = (req,res)=>{
  console.log(req.body)
  const {title,isCompleted} = req.body;

  if(!title || typeof isCompleted !== 'boolean'){ 
    res.status(400)
    throw Error('All fields are required!') 
  }

  const data = {id: Date.now(),title,isCompleted}
  const allPreviousTodos = getAllTodosUtil();

  const newData = [...allPreviousTodos,data];

  //writing file
  try {
    fs.writeFileSync('./Data/todos.json', JSON.stringify(newData), 'utf8');
  } catch (err) {
    res.status(500)
    throw Error('Unexpected Error')
  }

  res.status(201).json({message:`Todo Created`,data:data});
}

//@desc update a todo
//@route PUT api/todos/id
//@access public
export const updateTodo = (req,res)=>{
  const {id} = req.body;
  if(!id || typeof id!=='number') {
    res.status(400)
    throw error('id invalid')
  }

  const allTodos = getAllTodosUtil();

  res.status(200).json({meaage:`Update Todo id ${req.params.id}`});
}

//@desc delete a todo
//@route DETELE api/todos/id
//@access public
export const deleteTodo = (req,res)=>{
  const id = req.params.id;
  console.log('del todo id',id);
  if(!id) {
    res.status(400)
    throw Error('id invalid')
  }

  const allTodos = getAllTodosUtil();
console.log('del todo all todo', allTodos)
  const newAllTodos = allTodos.filter(todo=>{
    if(todo.id!=id){
      console.log(todo)
      return todo;
    }
  })
  saveTodos(newAllTodos);
console.log('new all todos',newAllTodos)
  res.status(200).json({meaage:`Delete Todo id ${req.params.id}`, data:newAllTodos});
}
