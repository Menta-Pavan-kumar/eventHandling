import React from 'react';
import "./App.css";
const TableComponent = ({ tableData = [], toEdit, toDelete }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Event Name</th>
          <th>Event Date</th>
          <th>Event Description</th>
          
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((ele, rowIndex) => {
          return (
            <tr key={`tr-${rowIndex}`}>
              <td>{ele.eventname}</td>
              <td>{ele.eventdate}</td>
              <td>{ele.description}</td>
              
              <td>
                <button style={{ backgroundColor:"blue",color:"white"}} onClick={(e) => toEdit(e, ele, rowIndex,ele.id)}>
                  Edit
                </button>{' '}
                <button
                 style={{ backgroundColor:"red",color:"white"}}
                  onClick={(e) => {
                    toDelete(e, ele.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableComponent;
