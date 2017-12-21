import { AngularTodomvcPage } from './app.po';

describe('angular-todomvc App', () => {
  let page: AngularTodomvcPage;

  beforeEach(() => {
    page = new AngularTodomvcPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
