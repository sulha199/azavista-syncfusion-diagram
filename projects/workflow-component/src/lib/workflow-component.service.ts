import { Injectable } from '@angular/core'
import { IEmailCampaignType, IPage, PageType } from '@azavista/servicelib'

@Injectable()
export class EventWorkflowService {
  /**
   * Map the `eventId` to its `IEmailCampaignType`s
   */
  emailCampaigns: Map<string, IEmailCampaignType[]> = new Map();
  /**
  * Map the `eventId` to its `IPage`s
  */
  pages: Map<string, Map<PageType, IPage[]>> = new Map();
}
