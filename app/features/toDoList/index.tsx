"use client";
import { useEffect, useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import { Box, Delete, FileInput, Lock, Save } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import { GridItem } from "../../../components/gridcard";
import { Boxes } from "../../../components/ui/background-boxes";
import { Input } from "../../../components/ui/input";
import { PlaceholdersAndVanishInput } from "../../../components/ui/placeholders-and-vanish-input";
import { cn } from "../../../lib/utils";

type ToDo = {
  key: string;
  value: string;
  status: boolean;
  edit: boolean;
};

export default function ToDoListReder() {
  const placeholders = [
    "What do you want to do today?",
    "What do you want to do tomorrow?",
    "What do you want to do next?",
  ];

  const [todos, setTodos] = useState<ToDo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [inputValueEdit, setInputValueEdit] = useState<string>("");

  // Load todos from localStorage
  useEffect(() => {
    const storedTodos = localStorage.getItem("toDoList");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueEdit(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    const newTodo = {
      key: uuidv4(),
      value: inputValue,
      status: false,
      edit: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const onSubmitEdit = (key: string) => {
    if (inputValueEdit !== "") {
      setTodos(
        todos.map((todo) =>
          todo.key === key
            ? { ...todo, value: inputValueEdit, edit: false }
            : todo,
        ),
      );
      setInputValueEdit("");
    }
  };

  const handleDelete = (key: string) => {
    setTodos(todos.filter((todo) => todo.key !== key));
  };

  const handleChangeStateEdit = (key: string, value: string, edit: boolean) => {
    setInputValueEdit(value);
    setTodos(
      todos.map((todo) => (todo.key === key ? { ...todo, edit: !edit } : todo)),
    );
  };

  const handleStatus = (key: string) => {
    setTodos(
      todos.map((todo) =>
        todo.key === key ? { ...todo, status: !todo.status } : todo,
      ),
    );
  };

  const handleSave = (key: string) => {
    setTodos(
      todos.map((todo) =>
        todo.key === key ? { ...todo, edit: !todo.edit } : todo,
      ),
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black dark:bg-white">
      <h1 className="text-3xl font-bold mb-4 text-white dark:text-white flex justify-center">
        To Do List
      </h1>
      <div className="grid grid-cols-1 gap-4 relative">
        <GridItem
          area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
          icon={
            <FileInput className="h-4 w-4 dark:text-neutral-400 text-white" />
          }
        >
          {/* เพิ่ม PlaceholdersAndVanishInput ลงใน GridItem */}
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />

          {todos.map((item) => (
            <div key={item.key} className="flex justify-between items-center">
              {item.edit ? (
                <Input
                  type="text"
                  value={inputValueEdit}
                  onChange={handleChangeEdit}
                  onSubmit={() => onSubmitEdit(item.key)}
                  autoFocus
                />
              ) : (
                <p
                  className={cn(
                    "text-lg font-medium",
                    item.status ? "line-through text-gray-400" : "text-white",
                  )}
                >
                  {item.value}
                </p>
              )}
              <div className="flex gap-4">
                <button
                  onClick={() => handleStatus(item.key)}
                  className="text-white dark:text-white"
                >
                  {item.status ? (
                    <Lock />
                  ) : (
                    <MdOutlineDone className="h-6 w-6 text-bold" />
                  )}
                </button>
                <button
                  onClick={() =>
                    handleChangeStateEdit(item.key, item.value, item.edit)
                  }
                  className="text-white dark:text-white"
                >
                  <Save />
                </button>
                <button
                  onClick={() => handleDelete(item.key)}
                  className="text-white dark:text-white"
                >
                  <Delete />
                </button>
              </div>
            </div>
          ))}
        </GridItem>
      </div>
    </div>
  );
}
