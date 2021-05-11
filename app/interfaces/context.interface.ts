export interface IContextElement {
  element: Element | Document | DocumentFragment | null;
  error: Error | null;
}

export interface IHtmlInfo {
  htmlSize: number;
  nodesNum: number;
}
