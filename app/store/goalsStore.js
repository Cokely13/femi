import axios from "axios";

// Action Types
const SET_GOALS = "SET_GOALS";
const CREATE_GOAL = "CREATE_GOAL";

// Action Creators
const setGoals = (goals) => ({ type: SET_GOALS, goals });
const createGoal = (goal) => ({ type: CREATE_GOAL, goal });

// Thunks
export const fetchGoals = (userId, BASE_URL) => async (dispatch) => {
  const { data } = await axios.get(`${BASE_URL}/api/goals?userId=${userId}`);
  dispatch(setGoals(data));
};

export const postGoal = (goal, BASE_URL) => async (dispatch) => {
  const { data } = await axios.post(`${BASE_URL}/api/goals`, goal);
  dispatch(createGoal(data));
};

// Reducer
export default function goalsReducer(state = [], action) {
  switch (action.type) {
    case SET_GOALS:
      return action.goals;
    case CREATE_GOAL:
      return [...state, action.goal];
    default:
      return state;
  }
}
