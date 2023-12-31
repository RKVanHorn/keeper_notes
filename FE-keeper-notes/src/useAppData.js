import React from "react";

export const useAppData = () => {
  const [keepers, setKeepers] = React.useState([]);
  const [animals, setAnimals] = React.useState([]);
  const [showError, setShowError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [notes, setNotes] = React.useState([]);

  const URL = "http://localhost:8080/keeper_notes";

  const fetchAllKeepers = async () => {
    try {
      const res = await fetch(`${URL}/keeper`);
      const data = await res.json();
      setKeepers(data);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  const addNewKeeper = async (newKeeper) => {
    try {
      const response = await fetch(`${URL}/keeper`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newKeeper),
      });
      const newKeeperWithId = await response.json();
      setKeepers([...keepers, newKeeperWithId]);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  const deleteKeeper = async (idToDelete) => {
    try {
      await fetch(`${URL}/keeper/${idToDelete}`, {
        method: "DELETE",
      });
      setKeepers(keepers.filter((keeper) => keeper.keeperId !== idToDelete));
      fetchAllAnimals();
      fetchAllNotes();
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  const updateKeeper = async (updatedKeeper) => {
    try {
      const response = await fetch(`${URL}/keeper/${updatedKeeper.keeperId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedKeeper),
      });
      const updated = await response.json();
      const updatedKeeperArray = keepers.map((keeper) => {
        return keeper.keeperId === updated.keeperId ? updated : keeper;
      });
      setKeepers(updatedKeeperArray);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  const assignAnimal = async (keeperId, animalId) => {
    try {
      const res = await fetch(
        `${URL}/assign/keeper${keeperId}/animal${animalId}`,
        {
          method: "PUT",
        }
      );
      if (res.ok) {
        fetchAllKeepers();
        fetchAllAnimals();
      } else {
        const message = await res.json();
        console.log(message);
        setErrorMessage(message.message);
        setShowError(true);
      }
    } catch (error) {
      //console.log(error);
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  const dischargeAnimal = async (keeperId, animalId) => {
    try {
      const res = await fetch(
        `${URL}/remove/keeper${keeperId}/animal${animalId}`,
        {
          method: "PUT",
        }
      );
      if (res.ok) {
        fetchAllKeepers();
        fetchAllAnimals();
      } else {
        const message = await res.json();
        console.log(message);
        setErrorMessage(message.message);
        setShowError(true);
      }
    } catch (error) {
      //console.log(error);
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  const fetchAllAnimals = async () => {
    try {
      const res = await fetch(`${URL}/animal`);
      const data = await res.json();
      setAnimals(data);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  const addNewAnimal = async (newAnimal) => {
    try {
      const response = await fetch(`${URL}/animal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAnimal),
      });
      const newAnimalWithId = await response.json();
      setAnimals([...animals, newAnimalWithId]);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  const deleteAnimal = async (idToDelete) => {
    try {
      await fetch(`${URL}/animal/${idToDelete}`, {
        method: "DELETE",
      });
      setAnimals(animals.filter((animal) => animal.animalId !== idToDelete));
      fetchAllKeepers();
      fetchAllNotes();
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  const updateAnimal = async (updatedAnimal) => {
    try {
      const response = await fetch(`${URL}/animal/${updatedAnimal.animalId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAnimal),
      });
      const updated = await response.json();
      const updatedAnimalArray = animals.map((animal) => {
        return animal.animalId === updated.animalId ? updated : animal;
      });
      setAnimals(updatedAnimalArray);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  const addNote = async (newNote) => {
    const textObject = { noteText: newNote.noteText };
    try {
      const response = await fetch(
        `${URL}/note/keeper${newNote.keeperId}/animal${newNote.animalId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(textObject),
        }
      );
      const data = await response.json();
      setNotes([...notes, data]);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  const fetchAllNotes = async () => {
    try {
      const res = await fetch(URL);
      const data = await res.json();
      setNotes(data);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  const updateNote = async (updatedNote) => {
    const textObject = {
      noteText: updatedNote.noteText,
    };
    try {
      const res = await fetch(
        `${URL}/note/keeper${updatedNote.keeperId}/animal${updatedNote.animalId}/note${updatedNote.noteId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(textObject),
        }
      );
      if (res.ok) {
        fetchAllNotes();
      } else {
        const message = await res.json();
        console.log(message);
        setErrorMessage(message.message);
        setShowError(true);
      }
      //const updated = await res.json();
      // const updatedNotesArray = notes.map((note) => {
      //   return note.noteId === updated.noteId ? updated : note;
      // });
      // setNotes(updatedNotesArray);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      setShowError(true);
    }
  };
  return {
    keepers,
    setKeepers,
    animals,
    setAnimals,
    showError,
    setShowError,
    errorMessage,
    setErrorMessage,
    notes,
    setNotes,
    fetchAllKeepers,
    addNewKeeper,
    deleteKeeper,
    updateKeeper,
    assignAnimal,
    dischargeAnimal,
    fetchAllAnimals,
    addNewAnimal,
    deleteAnimal,
    updateAnimal,
    addNote,
    fetchAllNotes,
    updateNote,
  };
};
