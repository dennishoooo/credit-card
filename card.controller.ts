import { Request, Response } from "express";
import { CardService } from "./card.service";

export class CardController {
  constructor(private cardService: CardService) {}

  getProcessID = async (req: Request, res: Response) => {
    let processID = await this.cardService.getProcessID();
    res.json({ processID });
  };

  genUUID = async (req: Request, res: Response) => {
    let uuid = await this.cardService.genUUID();
    res.json({ uuid });
  };

  createProcess = async (req: Request, res: Response) => {
    console.log(req.body);

    let result = await this.cardService.createProcess(req.body);
    res.json(result);
  };
}
