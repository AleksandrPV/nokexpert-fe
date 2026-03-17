export class QualificationCouncil {
  constructor(
    public readonly councilId: string,
    public readonly code: string,
    public readonly title: string,
    public readonly description: string | null,
  ) {}

  public toResponse() {
    return {
      councilId: this.councilId,
      code: this.code,
      title: this.title,
      description: this.description,
    };
  }
}
