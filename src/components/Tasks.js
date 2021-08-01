import React, { useState } from 'react';



export default function Tasks() {
    const [showAddTask, setShowAddTask] = useState(false);
    const [tasks,setTasks]=useState([]);

    const addNewTask=(text)=>{
        setTasks((prevState)=> [...prevState,text]);
    };

    return (
        <div className="tasks">
            <h1>Inbox</h1>
            <div className="add-task-btn" onClick={()=>setShowAddTask((prevState)=>!prevState)} >
                <span className="plus">+</span>
                <span className="add-task-text">Add Task</span>
            </div>
            {showAddTask && <AddTask onAddTask={addNewTask} oncancel={()=>setShowAddTask(false)} />}
            {
                tasks.length>0? tasks.map((task,i)=>{
                    return <p key={i}>{task}</p>
                })
                : <p>No Tasks Yet</p>
            }
        </div>
    )
}


const AddTask=({oncancel,onAddTask})=>{
    const [task,setTask]=useState("")
    return(
        <div className="add-task-dialogue">
            <input value={task} onChange={(e)=>{setTask(e.target.value)}} />
            <div className="add-task-actions-container">
                <div className="btns-container">
                    <button 
                        className="add-btn" 
                        onClick={()=>{
                            onAddTask(task);
                            oncancel();
                            setTask("");
                        }}
                    >
                        Add Task
                    </button>
                    <button 
                        className="cancel-btn" 
                        onClick={()=>{
                            oncancel();
                            setTask("");
                        }} 
                    >
                        Cancel
                    </button>
                </div> 
                <div className="icon-container"></div>
            </div>
        </div>
    )
}
