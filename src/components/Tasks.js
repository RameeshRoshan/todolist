import React, { useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from 'date-fns/format'; 
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import addDays from 'date-fns/addDays';
import isToday from 'date-fns/isToday';

const TaskHeader={
    INBOX: "Inbox",
    TODAY: "Today",
    NEXT_7: "Next 7 Days"
};

export default function Tasks( {selectedTab}) {
    const [showAddTask, setShowAddTask] = useState(false);
    const [tasks,setTasks]=useState([]);

    const addNewTask=(text,date)=>{
        const newTaskItem={text,date: date || new Date()};
        setTasks((prevState)=> [...prevState,newTaskItem]);
    };

    return (
        <div className="tasks">
            <h1>{TaskHeader[selectedTab]}</h1>
            {
                selectedTab==="INBOX"? 
                <div className="add-task-btn" onClick={()=>setShowAddTask((prevState)=>!prevState)} >
                    <span className="plus">+</span>
                    <span className="add-task-text">Add Task</span>
                </div>
            :null
            }
            {showAddTask && <AddTask onAddTask={addNewTask} oncancel={()=>setShowAddTask(false)} />}
            {
                tasks.length>0? <TaskItems selectedTab={selectedTab} tasks={tasks}/>
                : <p>No Tasks Yet</p>
            }
        </div>
    )
}

const FORMAT='dd/MM/yyyy';
function formatDate(date,format,locale){
    return dateFnsFormat(date,format,{locale});
}

const AddTask=({oncancel,onAddTask})=>{
    const [task,setTask]=useState("");
    const [date,setDate]=useState(null);
    return(
        <div className="add-task-dialogue">
            <input value={task} onChange={(e)=>{setTask(e.target.value)}} />
            <div className="add-task-actions-container">
                <div className="btns-container">
                    <button 
                        disabled={!task}
                        className="add-btn" 
                        onClick={()=>{
                            onAddTask(task,date);
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
                <div className="icon-container">
                    <DayPickerInput 
                        onDayChange={(day)=>{setDate(day)}} 
                        placeholder={`${dateFnsFormat(new Date(),FORMAT)}`}
                        formatDate={formatDate}
                        format={FORMAT}
                        dayPickerProps={{
                            modifiers: {
                                disabled: [{before : new Date()}],
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}


const TaskItems=({selectedTab, tasks})=>{

    let taskToRender=[...tasks];
    if(selectedTab==="NEXT_7"){
        taskToRender=taskToRender.filter((task)=>{
            return isAfter(task.date,new Date()) && isBefore(task.date, addDays(new Date(),7));
        });
    }
    if(selectedTab==="TODAY"){
        taskToRender=taskToRender.filter((task)=>{
            return  isToday(task.date);
        });
    }
    return(
        <div className="task-items-container">{
            taskToRender.map((task,i)=>{
                return <div className="task-item" key={i} >
                    <p>{task.text}</p>
                    <p>{dateFnsFormat(new Date(task.date),FORMAT)}</p>
                </div>
            })
        }</div>
    )
};
