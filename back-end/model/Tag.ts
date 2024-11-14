import { Tag as TagPrisma } from '@prisma/client';

export class Tag {
  private id?: number;
  private name: string;

  constructor(tag: { id?: number; name: string }) {
    this.id = tag.id;
    this.name = tag.name;
    this.validate(tag.name);
  }

  validate(name: string) {
    if (!name) {
      throw new Error('Tag name is required.');
    }
    if (name.length > 30) {
      throw new Error('Tag name cannot exceed 30 characters.');
    }
  }

  getId(): number | undefined {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  static from({id, name}: TagPrisma): Tag {
        return new Tag({
            id,
            name
        });
    }
}
