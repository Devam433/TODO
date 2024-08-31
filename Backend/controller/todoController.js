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

// get all todos
// GET api/todos
export const getAllTodos = (req, res) => {
  try {
    // Read the file
    const allTodos = fs.readFileSync('./Data/todos.json', 'utf-8');
    const data = JSON.parse(allTodos);
    // Send the response
    res.status(200).json({ message: "All Todos", data: data });
  } catch (error) {
    console.error("Error reading the file:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// add(create) a todo
// CREATE api/todos/id
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

// update a todo
// PUT api/todos/id
export const updateTodo = (req,res)=>{
  const {id} = req.body;
  if(!id || typeof id!=='number') {
    res.status(400)
    throw error('id invalid')
  }
  const allTodos = getAllTodosUtil();

  res.status(200).json({meaage:`Update Todo id ${req.params.id}`});
}

// delete a todo
// DETELE api/todos/id
export const deleteTodo = (req,res)=>{
  const id = req.params.id;
  console.log('del todo id',id);
  if(!id) {
    res.status(400)
    throw Error('id invalid')
  }

  const allTodos = getAllTodosUtil();
  const newAllTodos = allTodos.filter(todo=>{
    if(todo.id!=id){
      return todo;
    }
  })
  saveTodos(newAllTodos);
  
  res.status(200).json({meaage:`Delete Todo id ${req.params.id}`, data:newAllTodos});
}
