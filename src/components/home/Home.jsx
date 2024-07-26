import AddToDo from "../add-to-do/AddToDo"
import ToDoList from "../to-do-list/ToDoList"

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-[800px] h-[500px] w-full flex flex-col items-center shadow-todo rounded-lg p-8">
        <h2 className="text-3xl">To do List</h2>
        <AddToDo />
        <ToDoList />
      </div>
    </div>
  )
}

export default Home
