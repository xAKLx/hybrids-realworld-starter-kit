import { routeEditor } from './routeEditor';
import { renderHelper } from '../../tests/helpers';

describe('route editor', () => {
  it('Should Render', () => {
    const host = document.createElement('div');

    const target = renderHelper(routeEditor, host);
    expect(target.childNodes.length).toBeGreaterThan(0);
  });
});
