import { CLivePage } from './app.po';

describe('clive App', () => {
  let page: CLivePage;

  beforeEach(() => {
    page = new CLivePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
