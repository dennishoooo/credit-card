import { CardService } from "./card.service";

export class CardController {
  constructor(private cardService: CardService) {
    this.cardService = cardService;
  }
  getProcessID(req, res) {
    let uuid = this.cardService.getProcessID();
    res.json({ uuid });
  }
}
