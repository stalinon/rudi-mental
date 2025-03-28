export const getUserExercises = () => {
    const data = localStorage.getItem('userExercises');
    return data ? JSON.parse(data) : [];
  };
  
export const saveUserExercise = (exercise, local = true) => {
  const exercises = getUserExercises();

  // Проставляем флаг
  exercise.local = local;

  // Фильтруем старые дубли
  const updated = exercises.filter(e => e.link !== exercise.link);

  // Добавляем новое
  updated.push(exercise);

  // Сохраняем
  localStorage.setItem('userExercises', JSON.stringify(updated));
};
  