const PersonForm = ({
  newName,
  newNumber,
  handleOnSubmit,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
