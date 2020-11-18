export enum CategoryQuestion {
  Pop = "Pop Question",
  Science = "Science Question",
  Sports = "Sports Question",
  Rock = "Rock Question",
}

export default class Question {
  constructor(protected category: CategoryQuestion, protected value: string) {}
}
