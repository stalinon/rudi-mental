export const getUserExercises = () => {
    const data = localStorage.getItem('userExercises');
    return data ? JSON.parse(data) : [];
  };
  
  export const saveUserExercise = (exercise) => {
    const exercises = getUserExercises();
    exercises.push(exercise);
    localStorage.setItem('userExercises', JSON.stringify(exercises));
  };
  