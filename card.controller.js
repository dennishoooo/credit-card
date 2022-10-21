export class CardController {
  constructor(cardService) {
    this.cardService = cardService;
  }
  getUUID(req, res) {
    let uuid = this.cardService.getUUID();
    res.json({ uuid });
  }
}
