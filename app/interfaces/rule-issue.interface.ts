import { $auditRuleNodeSkipReason } from '../constants/accessibility';
import { IASLintRuleContrast } from '../interfaces/aslint-report.interface';

export interface IIssueReport {
  contrastData?: IASLintRuleContrast;
  expected?: any;
  message: string;
  node: Element | null;
  ruleId: string;
  skipReason?: $auditRuleNodeSkipReason;
}
