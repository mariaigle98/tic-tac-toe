//Componente para cada cuadrado
const Square = ({ children, updateBoard, index, isSelected }) => {
    //Cuando la prop isSelected sea true, le añadimos una clase para que se vea seleccionado
    const className = `square ${isSelected}`;
  
    //Al hacer click se ejecuta el cambio de turno
    const handleClick = () => {
      updateBoard(index);
    };
    return (
      <div className={className} onClick={handleClick}>
        {children}
      </div>
    );
  };

  export default Square