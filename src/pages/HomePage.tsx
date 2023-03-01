import { Box, Button, Heading, Input } from "@chakra-ui/react";
import React, { useState, useEffect, FormEvent } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

interface Item {
  id: number;
  name: string;
}

const HomePage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const baseUrl = process.env.REACT_APP_API;

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response: AxiosResponse<Item[]> = await axios.get(`${baseUrl}`);
      setItems(response.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  // Handle form submit for adding new item
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post(`${baseUrl}`, {
        name: inputValue,
      });
      fetchData();
      setInputValue("");
    } catch (error: any) {
      console.log(error);
    }
  };

  // Handle form submit for deleting item
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${baseUrl}/${id}`);
      fetchData();
    } catch (error: any) {
      console.log(error);
    }
  };

  // Handle form submit for updating item
  const handleEdit = async () => {
    try {
      await axios.put(`${baseUrl}/${selectedItem!.id}`, {
        name: selectedItem!.name,
      });
      fetchData();
      setSelectedItem(null);
    } catch (error: any) {
      console.log(error);
    }
  };

  // Handle Selected item
  const handleSelect = (item: Item) => {
    setSelectedItem(item);
    setInputValue(item.name);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="center" p="10px 0">
        <Heading as="h1">Basic CRUD App</Heading>
      </Box>

      <Box display="flex" justifyContent="center" p="10px 0">
        <form
          style={{
            display: "flex",
            gap: "10px",
          }}
          onSubmit={handleSubmit}
        >
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button colorScheme="teal" width="300px" type="submit">
            Add
          </Button>
        </form>
      </Box>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {selectedItem?.id === item.id ? (
              <>
                <Input
                  type="text"
                  value={selectedItem.name}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, name: e.target.value })
                  }
                />
                <Button
                  colorScheme={
                    selectedItem.name === item.name ? "gray" : "teal"
                  }
                  onClick={handleEdit}
                >
                  Save
                </Button>
              </>
            ) : (
              <Box>
                {item.name}
                <Button onClick={() => handleSelect(item)}>Edit</Button>
                <Button
                  colorScheme={"red"}
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </Box>
            )}
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default HomePage;
