export class ProfessionalQualification {
  constructor(
    public readonly profQualId: string,
    public readonly title: string,
    public readonly code: string,
    public readonly level: number,
    public readonly councilId: string,
    public readonly questionCount: number,
  ) {}

  public toResponse() {
    return {
      profQualId: this.profQualId,
      title: this.title,
      code: this.code,
      level: this.level,
      councilId: this.councilId,
      questionCount: this.questionCount,
    };
  }
}
