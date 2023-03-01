import React, { useState, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

interface Item {
  id: number;
  name: string;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response: AxiosResponse<Item[]> = await axios.get(
        "https://my-mockapi-project.com/items"
      );
      setItems(response.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post("https://my-mockapi-project.com/items", {
        name: inputValue,
      });
      fetchData();
      setInputValue("");
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://my-mockapi-project.com/items/${id}`);
      fetchData();
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(
        `https://my-mockapi-project.com/items/${selectedItem!.id}`,
        { name: selectedItem!.name }
      );
      fetchData();
      setSelectedItem(null);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSelect = (item: Item) => {
    setSelectedItem(item);
    setInputValue(item.name);
  };

  return (
    <div>
      <h1>CRUD App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {selectedItem?.id === item.id ? (
              <>
                <input
                  type="text"
                  value={selectedItem.name}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, name: e.target.value })
                  }
                />
                <button onClick={handleEdit}>Save</button>
              </>
            ) : (
              <>
                {item.name}
                <button onClick={() => handleSelect(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
