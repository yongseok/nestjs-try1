import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  HelloWorld() {
    console.log('hi');
  }

  async getOrCreate(name: string): Promise<Category> {
    const categoryName = name.trim().toLowerCase();
    const categorySlug = categoryName.replace(/ /g, '-');
    let category = await this.findOne({
      where: {
        slug: categorySlug,
      },
    });
    if (!category) {
      category = await this.save(
        this.create({ slug: categorySlug, name: categoryName }),
      );
    }
    return category;
  }
}
