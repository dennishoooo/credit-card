import { Request, Response } from "express";
import { CardService } from "./card.service";

export class CardController {
  constructor(private cardService: CardService) {}
  getProcessID = async (req: Request, res: Response) => {
    let uuid = await this.cardService.getProcessID();
    res.json({ uuid });
  };
  genUUID = async (req: Request, res: Response) => {
    let uuid = await this.cardService.genUUID();
    res.json(uuid);
  };
}
