import { OnlineClassroomPage } from './app.po';

describe('online-classroom App', () => {
  let page: OnlineClassroomPage;

  beforeEach(() => {
    page = new OnlineClassroomPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
