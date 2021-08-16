import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query/react";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Define a service using a base URL and expected endpoints
export const todoApi = createApi({
	reducerPath: "todoApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://jsonplaceholder.typicode.com/",
	}),
	endpoints: (builder) => ({
		getTodos: builder.query<Todo[], null>({
			query: () => "todos",
		}),
		getTodo: builder.query<Todo, number>({
			query: (id: number) => `todos/${id}`,
		}),
	}),
});

export const { useGetTodosQuery, useGetTodoQuery } = todoApi;
