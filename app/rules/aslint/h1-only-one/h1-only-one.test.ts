import { H1OnlyOne } from './h1-only-one';
import { Validator } from '../../../validator';
import { DomUtility } from '../../../utils/dom';

describe('Rules', () => {

  describe('H1OnlyOne', () => {

    let fakeDom;

    new H1OnlyOne().registerValidator();

    beforeEach(() => {
      fakeDom = document.createElement('div');
      fakeDom.id = 'fakedom';
      document.body.appendChild(fakeDom);

      Validator.reset();
    });

    afterEach(() => {
      DomUtility.remove(document.getElementById('fakedom'));
      fakeDom = undefined;
    });

    it('should return 1 report when there is more than 1 h1 element', () => {
      fakeDom.innerHTML = '<h1>Text 1</h1><h1>Text 2</h1>';
      const nodes = DomUtility.querySelectorAllExclude('h1', fakeDom);

      new H1OnlyOne().validate(nodes);

      expect(Object.keys(Validator.getReports()).length).toBe(2);
      expect(Validator.getReport('report_0').message).toBe('Expected only one heading element <code>&lt;h1&gt;</code>. You have 2 total.');
      expect(Validator.getReport('report_0').node.nodeName.toLowerCase()).toBe('h1');
      expect(Validator.getReport('report_0').ruleId).toBe('h1-only-one');
      expect(Validator.getReport('report_1').message).toBe('Expected only one heading element <code>&lt;h1&gt;</code>. You have 2 total.');
      expect(Validator.getReport('report_1').node.nodeName.toLowerCase()).toBe('h1');
      expect(Validator.getReport('report_1').ruleId).toBe('h1-only-one');
    });

    it('should return no reports when there is 1 h1 element', () => {
      fakeDom.innerHTML = '<h1>Text 1</h1><h2>Text 2</h2>';
      const nodes = DomUtility.querySelectorAllExclude('h1', fakeDom);

      new H1OnlyOne().validate(nodes);

      expect(Object.keys(Validator.getReports()).length).toBe(0);
    });

    it('should return no reports when there is no h1 element', () => {
      fakeDom.innerHTML = '<h2>Text 2</h2>';
      const nodes = DomUtility.querySelectorAllExclude('h1', fakeDom);

      new H1OnlyOne().validate(nodes);

      expect(Object.keys(Validator.getReports()).length).toBe(0);
    });

  });
});
