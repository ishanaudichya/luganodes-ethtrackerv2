// TODO - would be nice to store which was the last block processed

// NOTE - error handling for fetches to data gateways is missing and it's relative to business logics needs

export class DepositsFetcherService {
  constructor(options) {
    this.depositsRepository = options.depositsRepository;
  }

  async getDeposits(props) {
    return await this.depositsRepository.getDeposits(props);
  }
}
