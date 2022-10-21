import { Request, Response } from "express";
import { CardService } from "./card.service";

export class CardController {
  constructor(private cardService: CardService) {}
  getProcessID(req: Request, res: Response) {
    let uuid = this.cardService.getProcessID();
    res.json({ uuid });
  }
}
