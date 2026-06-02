

export const TODO_ACTIONS = {
  // Fetch operations
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FILTER_ERROR: "FETCH_FILTER_ERROR",
  FETCH_ERROR: "FETCH_ERROR",

  // Add todo operations
  ADD_TODO_START: "ADD_TODO_START",
  ADD_TODO_SUCCESS: "ADD_TODO_SUCCESS",
  ADD_TODO_ERROR: "ADD_TODO_ERROR",

  COMPLETE_TODO_START: "COMPLETE_TODO_START",
  COMPLETE_TODO_SUCCESS: "COMPLETE_TODO_SUCCESS",
  COMPLETE_TODO_ERROR: "COMPLETE_TODO_ERROR",

  UPDATE_TODO_START: "UPDATE_TODO_START",
  UPDATE_TODO_SUCCESS: "UPDATE_TODO_SUCCESS",
  UPDATE_TODO_ERROR: "UPDATE_TODO_ERROR",


  // UI OPERATIONS
  SET_SORT: "SET_SORT",
  SET_FILTER: "SET_FILTER",
  CLEAR_ERROR: "CLEAR_ERROR",
  CLEAR_FILTER_ERROR: "CLEAR_FILTER_ERROR",
  RESET_FILTERS: "RESET_FILTERS"
}

export const initialTodoState = {
  todoList: [],
  error: "",
  filterError: "",
  isTodoListLoading: false,
  sortBy: "createdAt",
  sortDirection: "desc",
  filterTerm: '',
  dataVersion: 0,
}

export function todoReducer(state, action) {
  switch(action.type) {
    case TODO_ACTIONS.FETCH_START:
      return {
        ...state,
        isTodoListLoading: true,
        error: "",
        filterError: ""
      }
    
    case TODO_ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        todoList: [...action.payload.todoList],
        isTodoListLoading: false,
        error: "",
        filterError: ""
      }

    case TODO_ACTIONS.ADD_TODO_FILTER_ERROR:
      return {
        ...state,
        isTodoListLoading: false,
        filterError: action.payload.filterError
      }
      // Need to complete this one
    case TODO_ACTIONS.FETCH_ERROR:
      return {
        ...state,
        error: action.payload.error,
        isTodoListLoading: false,
      }
      
    case TODO_ACTIONS.ADD_TODO_START:
      return {
        ...state,
        todoList: [action.payload.newTodo, ...state.todoList]
      }

    case TODO_ACTIONS.ADD_TODO_SUCCESS:
      return {
        ...state,
        todoList: [action.payload.newTodo, ...action.payload.originalTodos],
        dataVersion: state.dataVersion + 1
      }

    case TODO_ACTIONS.ADD_TODO_ERROR:
      return {
        ...state,
        error: action.payload.error,
        todoList: [...action.payload.originalTodos]
      }

    case TODO_ACTIONS.COMPLETE_TODO_START:
      return {
        ...state,
        todoList: [...action.payload.updatedTodos]
      }

    case TODO_ACTIONS.COMPLETE_TODO_SUCCESS: 
      return {
        ...state,
        dataVersion: state.dataVersion + 1
      }
    
    case TODO_ACTIONS.COMPLETE_TODO_ERROR:
      return {
        ...state,
        todoList: [...action.payload.originalTodos],
        error: action.payload.error
      }

    case TODO_ACTIONS.UPDATE_TODO_START:
      return {
        ...state,
        todoList: [...action.payload.updatedTodos]
      }

    case TODO_ACTIONS.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        dataVersion: state.dataVersion + 1
      }


    case TODO_ACTIONS.UPDATE_TODO_ERROR:
      return {
        ...state,
        todoList: [...action.payload.originalTodos]
      }
    
    case TODO_ACTIONS.SET_SORT:
      console.log(state.sortBy);
      console.log(state.sortDirection);
      return {
        ...state,
        sortBy: action.payload.newSortBy,
        sortDirection: action.payload.newSortDirection
      }

    case TODO_ACTIONS.SET_FILTER:
      return {
        ...state,
        filterTerm: action.payload.newFilterTerm
      }
    
    case TODO_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: ""
      }

    case TODO_ACTIONS.CLEAR_FILTER_ERROR:
      return {
        ...state,
        filterError: "",
      }
    
    case TODO_ACTIONS.RESET_FILTERS:
      return {
        ...state,
        filterError: "",
        filterTerm: "",
        sortBy: "createdAt",
        sortDirection: "desc"
      }
    

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}