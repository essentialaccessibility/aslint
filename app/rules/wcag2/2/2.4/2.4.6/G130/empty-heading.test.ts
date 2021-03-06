import { Validator } from '../../../../../../validator';
import { DomUtility } from '../../../../../../utils/dom';
import { EmptyHeading } from './empty-heading';

describe('Rules', () => {

  describe('EmptyHeading#', () => {

    let fakeDom;
    const selector = 'h1, h2, h3, h4, h5, h6';

    new EmptyHeading().registerValidator();

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

    it('should return one report when there h1 is empty', () => {
      fakeDom.innerHTML = '<h1></h1>';
      const nodes = DomUtility.querySelectorAllExclude(selector, fakeDom);

      new EmptyHeading().validate(nodes);

      expect(Object.keys(Validator.getReports()).length).toBe(1);
      expect(Validator.getReport('report_0').message).toBe('Heading element should not have an empty content.');
      expect(Validator.getReport('report_0').node.nodeName.toLowerCase()).toBe('h1');
      expect(Validator.getReport('report_0').ruleId).toBe('empty-heading');
    });

    it('should return one report when there h1 contains only spaces', () => {
      fakeDom.innerHTML = '<h1>   </h1>';
      const nodes = DomUtility.querySelectorAllExclude(selector, fakeDom);

      new EmptyHeading().validate(nodes);

      expect(Object.keys(Validator.getReports()).length).toBe(1);
      expect(Validator.getReport('report_0').message).toBe('Heading element should not have an empty content.');
      expect(Validator.getReport('report_0').node.nodeName.toLowerCase()).toBe('h1');
      expect(Validator.getReport('report_0').ruleId).toBe('empty-heading');
    });

    it('should return 1 report when there is <h1> that contains white spaces', () => {
      fakeDom.innerHTML = `<h1>


      </h1>`;
      const nodes = DomUtility.querySelectorAllExclude(selector, fakeDom);

      new EmptyHeading().validate(nodes);

      expect(Object.keys(Validator.getReports()).length).toBe(1);
      expect(Validator.getReport('report_0').message).toBe('Heading element should not have an empty content.');
      expect(Validator.getReport('report_0').node.nodeName.toLowerCase()).toBe('h1');
      expect(Validator.getReport('report_0').ruleId).toBe('empty-heading');
    });

    it('should return one report when there h1 has empty content', () => {
      fakeDom.innerHTML = '<h1><p></p></h1>';
      const nodes = DomUtility.querySelectorAllExclude(selector, fakeDom);

      new EmptyHeading().validate(nodes);

      expect(Object.keys(Validator.getReports()).length).toBe(1);
      expect(Validator.getReport('report_0').message).toBe('Heading element should not have an empty content.');
      expect(Validator.getReport('report_0').node.nodeName.toLowerCase()).toBe('h1');
      expect(Validator.getReport('report_0').ruleId).toBe('empty-heading');
    });

    it('should return one report when there h1 that contains only whitespaces', () => {
      fakeDom.innerHTML = '<h1><p>    </p></h1>';
      const nodes = DomUtility.querySelectorAllExclude(selector, fakeDom);

      new EmptyHeading().validate(nodes);

      expect(Object.keys(Validator.getReports()).length).toBe(1);
      expect(Validator.getReport('report_0').message).toBe('Heading element should not have an empty content.');
      expect(Validator.getReport('report_0').node.nodeName.toLowerCase()).toBe('h1');
      expect(Validator.getReport('report_0').ruleId).toBe('empty-heading');
    });

    it('should return 2 reports when there are empty h1 and h2', () => {
      fakeDom.innerHTML = '<h1></h1><h2><p></p></h2><h3>h3</h3><h4>h4</h4><h5>h5</h5><h6>h6</h6>';
      const nodes = DomUtility.querySelectorAllExclude(selector, fakeDom);

      new EmptyHeading().validate(nodes);

      expect(Object.keys(Validator.getReports()).length).toBe(2);
      expect(Validator.getReport('report_0').message).toBe('Heading element should not have an empty content.');
      expect(Validator.getReport('report_0').node.nodeName.toLowerCase()).toBe('h1');
      expect(Validator.getReport('report_0').ruleId).toBe('empty-heading');
      expect(Validator.getReport('report_1').message).toBe('Heading element should not have an empty content.');
      expect(Validator.getReport('report_1').node.nodeName.toLowerCase()).toBe('h2');
      expect(Validator.getReport('report_1').ruleId).toBe('empty-heading');
    });

    it('should return no reports when h1 exists', () => {
      fakeDom.innerHTML = '<h1>H1</h1>';
      const nodes = DomUtility.querySelectorAllExclude(selector, fakeDom);

      new EmptyHeading().validate(nodes);

      expect(Object.keys(Validator.getReports()).length).toBe(0);
    });

    it('should return no reports when h2 exists', () => {
      fakeDom.innerHTML = '<h2>H2</h2>';
      const nodes = DomUtility.querySelectorAllExclude(selector, fakeDom);

      new EmptyHeading().validate(nodes);

      expect(Object.keys(Validator.getReports()).length).toBe(0);
    });

    it('should return no reports when h3 exists', () => {
      fakeDom.innerHTML = '<h3>H3</h3>';
      const nodes = DomUtility.querySelectorAllExclude(selector, fakeDom);

      new EmptyHeading().validate(nodes);

      expect(Object.keys(Validator.getReports()).length).toBe(0);
    });

    it('should return no reports when h4 exists', () => {
      fakeDom.innerHTML = '<h4>H4</h4>';
      const nodes = DomUtility.querySelectorAllExclude(selector, fakeDom);

      new EmptyHeading().validate(nodes);

      expect(Object.keys(Validator.getReports()).length).toBe(0);
    });

    it('should return no reports when h1 exists', () => {
      fakeDom.innerHTML = '<h5>H5</h5>';
      const nodes = DomUtility.querySelectorAllExclude(selector, fakeDom);

      new EmptyHeading().validate(nodes);

      expect(Object.keys(Validator.getReports()).length).toBe(0);
    });

    it('should return no reports when h1 exists', () => {
      fakeDom.innerHTML = '<h6>H6</h6>';
      const nodes = DomUtility.querySelectorAllExclude(selector, fakeDom);

      new EmptyHeading().validate(nodes);

      expect(Object.keys(Validator.getReports()).length).toBe(0);
    });

  });
});
