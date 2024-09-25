

export class DepositsFetcherService {
  constructor(options) {
    this.depositsRepository = options.depositsRepository;
  }

  async getDeposits(props) {
    return await this.depositsRepository.getDeposits(props);
  }
}
