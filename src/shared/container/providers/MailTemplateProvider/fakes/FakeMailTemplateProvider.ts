import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvier from '../models/IMailTemplateProvider';

export default class FakeMailTemplateProvider implements IMailTemplateProvier {
  public async parse({ template }: IParseMailTemplateDTO): Promise<string> {
    return template;
  }
}
