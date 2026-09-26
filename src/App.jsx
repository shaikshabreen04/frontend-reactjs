import React from 'react'; 
 import './App.css';
/*class App extends React.Component { 
  constructor() { 
    super(); 
    this.state = { 
      data: [ 
        { name: 'Sai' }, 
        { name: 'gana' }, 
        { name: 'seetha' } 
      ] 
    }; 
  } 
 
  render() { 
    return ( 
      <div> 
        <StudentName /> 
        <ul> 
          {this.state.data.map((item, index) => ( 
            <List key={index} data={item} /> 
          ))} 
        </ul>

        <div className="app">
          <h1>Projects</h1>

          <div className="project-list">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        </div>
      </div> 
    ); 
  } 
} 
 
class StudentName extends React.Component { 
  render() { 
    return ( 
      <div> 
        <h1>Student Name Detail</h1> 
      </div> 
    ); 
  } 
} 
 
class List extends React.Component { 
  render() { 
    return <li>{this.props.data.name}</li>; 
  } 
}

const projects = [
  {
    id: 1,
    name: 'E-Commerce Website',
    client: 'ABC Technologies',
    status: 'In Progress',
    owner: 'Sai',
    startDate: '2026-08-01',
    endDate: '2026-09-30',
    hours: 240,
    finalCost: 530332
  },
  {
    id: 2,
    name: 'Banking Application',
    client: 'XYZ Bank',
    status: 'Completed',
    owner: 'Gana',
    startDate: '2026-06-15',
    endDate: '2026-08-20',
    hours: 320,
    finalCost: 750000
  },
  {
    id: 3,
    name: 'Mobile Application',
    client: 'Tech Solutions',
    status: 'Planned',
    owner: 'Seetha',
    startDate: '2026-09-10',
    endDate: '2026-11-30',
    hours: 180,
    finalCost: 0
  }
];

function formatCurrency(amount) {
  if (amount === 0 || amount === null || amount === undefined) {
    return 'Not estimated';
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

function StatusBadge({ status }) {
  const statusStyles = {
    Completed: 'green',
    'In Progress': 'orange',
    Planned: 'blue'
  };

  const style = statusStyles[status] || 'gray';

  return (
    <span className={`status-badge ${style}`}>
      {status}
    </span>
  );
}

function Detail({ label, value }) {
  return (
    <div className="detail">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value}</span>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-header">
        <div>
          <h2>{project.name}</h2>
          <p>{project.client}</p>
        </div>

        <StatusBadge status={project.status} />
      </div>

      <div className="project-details">
        <Detail
          label="Owner"
          value={project.owner}
        />

        <Detail
          label="Date Range"
          value={`${formatDate(project.startDate)} - ${formatDate(project.endDate)}`}
        />

        <Detail
          label="Total Hours"
          value={`${project.hours} hrs`}
        />

        <Detail
          label="Final Estimated Cost"
          value={formatCurrency(project.finalCost)}
        />
      </div>
    </div>
  );
}

export default App;*/




const roles = {
  developer: {
    id: 'developer',
    name: 'Developer',
    rate: 1000
  },
  designer: {
    id: 'designer',
    name: 'Designer',          
    rate: 800
  },
  tester: {
    id: 'tester',
    name: 'Tester',
    rate: 600
  }
};

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tasks: [
        {
          id: crypto.randomUUID(),
          name: '',
          roleId: 'developer',
          hours: ''
        }
      ]
    };
  }

  createEmptyTask = () => ({
    id: crypto.randomUUID(),
    name: '',
    roleId: 'developer',
    hours: ''
  });

  addTask = () => {
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, this.createEmptyTask()]
    }));
  };

  handleTaskChange = (taskId, field, value) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === taskId
          ? { ...task, [field]: value }
          : task
      )
    }));
  };

  deleteTask = (taskId) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== taskId)
    }));
  };

  getTaskCost = (task) => {
    const role = roles[task.roleId];
    return (Number(task.hours) || 0) * role.rate;
  };

  getTotalHours = () => {
    return this.state.tasks.reduce(
      (total, task) => total + (Number(task.hours) || 0),
      0
    );
  };

  getTotalCost = () => {
    return this.state.tasks.reduce(
      (total, task) => total + this.getTaskCost(task),
      0
    );
  };

  render() {
    const { tasks } = this.state;

    return (
      <div className="app">
        <div className="header">
          <div>
            <h1>Estimation</h1>
            <p>Build your project estimate</p>
          </div>

          <button className="add-button" onClick={this.addTask}>
            + Add Task
          </button>
        </div>

        {tasks.length === 0 ? (
          <div className="empty">
            <h2>No tasks added</h2>
            <p>Add a task to start your estimate.</p>
          </div>
        ) : (
          <TaskTable
            tasks={tasks}
            roles={roles}
            onTaskChange={this.handleTaskChange}
            onDelete={this.deleteTask}
            getTaskCost={this.getTaskCost}
          />
        )}

        <Summary
          totalTasks={tasks.length}
          totalHours={this.getTotalHours()}
          totalCost={this.getTotalCost()}
        />
      </div>
    );
  }
}

class TaskTable extends React.Component {
  render() {
    const {
      tasks,
      roles,
      onTaskChange,
      onDelete,
      getTaskCost
    } = this.props;

    return (
      <div className="table-container">
        <div className="table-header">
          <span>Task</span>
          <span>Role</span>
          <span>Hours</span>
          <span>Cost</span>
          <span>Action</span>
        </div>

        {tasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            roles={roles}
            onTaskChange={onTaskChange}
            onDelete={onDelete}
            getTaskCost={getTaskCost}
          />
        ))}
      </div>
    );
  }
}

class TaskRow extends React.Component {
  render() {
    const {
      task,
      roles,
      onTaskChange,
      onDelete,
      getTaskCost
    } = this.props;

    return (
      <div className="task-row">
        <input
          type="text"
          placeholder="Enter task name"
          value={task.name}
          onChange={(e) =>
            onTaskChange(task.id, 'name', e.target.value)
          }
        />

        <select
          value={task.roleId}
          onChange={(e) =>
            onTaskChange(task.id, 'roleId', e.target.value)
          }
        >
          {Object.values(roles).map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="0"
          value={task.hours}
          onChange={(e) =>
            onTaskChange(task.id, 'hours', e.target.value)
          }
        />

        <div className="cost">
          {formatCurrency(getTaskCost(task))}
        </div>

        <button
          className="delete-button"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    );
  }
}

class Summary extends React.Component {
  render() {
    const {
      totalTasks,
      totalHours,
      totalCost
    } = this.props;

    return (
      <div className="summary">
        <div>
          <span>Total Tasks</span>
          <strong>{totalTasks}</strong>
        </div>

        <div>
          <span>Total Hours</span>
          <strong>{totalHours}</strong>
        </div>

        <div>
          <span>Total Cost</span>
          <strong>{formatCurrency(totalCost)}</strong>
        </div>
      </div>
    );
  }
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export default App;