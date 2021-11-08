
export class ScreenshotRequest {
  view: string;
  tags: string[];

  constructor(view: string, tags: string[]) {
    this.view = view;
    this.tags = tags;
  }

}
