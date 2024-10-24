export class Tag {
  constructor(
    public id: number,
    public name: string
  ) {
    this.validate();
  }

  validate() {
    if (!this.name) {
      throw new Error('Tag name is required.');
    }
    if (this.name.length > 30) {
      throw new Error('Tag name cannot exceed 30 characters');
    }
  }
}
