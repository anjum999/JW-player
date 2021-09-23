import React from "react";

const ReadOnlyRow = ({ data, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.name}</td>
      <td>{data.date}</td>
      <td>{data.video}</td>
      <td>
        <button type="button" onClick={(event) => handleEditClick(event, data)}>
        Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;