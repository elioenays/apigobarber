import IMailTemplateProvier from '../models/IMailTemplateProvider';

export default class FakeMailTemplateProvider implements IMailTemplateProvier {
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}
