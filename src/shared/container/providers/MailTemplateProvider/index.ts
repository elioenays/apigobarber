import { container } from 'tsyringe';

import IMailTemplateProvier from './models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';

const providers = {
  handlebars: HandlebarsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvier>(
  'MailTemplateProvider',
  providers.handlebars,
);
