import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    description: schema.string(),
    price: schema.number(),
    image: schema.file.optional({
      size: '2mb',
      extnames: ['jpg', 'gif', 'png'],
    }),
  });

  public messages: CustomMessages = {
    'required': 'The {{ field }} is required to create a new product',
    'file.size': 'The image size must be under {{ options.size }}',
    'file.extname': 'The image must have one of {{ options.extnames }} extension names',
  };
}
