import { CATEGORY_TYPE } from '../../../constants/categoryType';
import { IIssueReport } from '../../../interfaces/rule-issue.interface';
import { TextUtility } from '../../../utils/text';
import { TranslateService } from '../../../services/translate';
import { $severity } from '../../../constants/accessibility';
import { $accessibilityAuditRules } from '../../../constants/accessibility';
import { AbstractRule, IAbstractRuleConfig } from '../../abstract-rule';

export class HiddenContent extends AbstractRule {
  protected selector: string = ':root, [aria-expanded]';

  protected ruleConfig: IAbstractRuleConfig = {
    id: TextUtility.convertUnderscoresToDashes($accessibilityAuditRules.hidden_content),
    links: [],
    recommendations: [],
    severity: $severity.info,
    type: CATEGORY_TYPE.BEST_PRACTICE
  };

  public validate(elements: HTMLElement[]): void {
    const reportNode = (element: HTMLElement): void => {
      let report: IIssueReport;

      if (element.getAttribute('aria-expanded') === null) {
        report = {
          message: TranslateService.instant('hidden_content_report_message1'),
          node: element,
          ruleId: this.ruleConfig.id
        };

        this.validator.report(report);

        return;
      }

      report = {
        message: TranslateService.instant('hidden_content_report_message2'),
        node: element,
        ruleId: this.ruleConfig.id
      };

      this.validator.report(report);
    };

    elements.forEach(reportNode);
  }
}
