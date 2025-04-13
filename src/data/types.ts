// Type definition for each individual question
export interface Question {
    id: number;
    sentence: string;
    options: string[];
    answer: string[];
  }
  
  // Type definition for the state that holds all the questions
  export interface QuestionData {
    questions: Question[];
  }
  