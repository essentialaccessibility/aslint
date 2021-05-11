import { TextUtility } from '../../../utils/text';
import { CATEGORY_TYPE } from '../../../constants/categoryType';
import { IIssueReport } from '../../../interfaces/rule-issue.interface';
import { TranslateService } from '../../../services/translate';
import { $severity } from '../../../constants/accessibility';
import { $accessibilityAuditRules } from '../../../constants/accessibility';
import { AbstractRule, IAbstractRuleConfig } from '../../abstract-rule';

export class H1OnlyOne extends AbstractRule {
  protected selector: string = 'h1';

  protected ruleConfig: IAbstractRuleConfig = {
    id: TextUtility.convertUnderscoresToDashes($accessibilityAuditRules.h1_only_one),
    links: [
      {
        content: 'Web Accessibility Tutorials: Headings',
        url: 'https://www.w3.org/WAI/tutorials/page-structure/headings/'
      }
    ],
    recommendations: [],
    severity: $severity.critical,
    type: CATEGORY_TYPE.BEST_PRACTICE
  };

  public validate(elements: Element[]): void {
    const total: number = elements.length;

    const reportIssue = (element: Element): void => {
      const reportMessage: string = TranslateService.instant('h1_only_one_report_message', [TextUtility.escape(`<${element.nodeName.toLowerCase()}>`), total]);

      const report: IIssueReport = {
        message: reportMessage,
        node: element,
        ruleId: this.ruleConfig.id
      };

      this.validator.report(report);
    };

    if (total > 1) {
      elements.forEach(reportIssue);
    }
  }
}
